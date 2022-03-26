# Proxy & Reflect


# Proxy란?

Proxy는 객체를 감싸서, 원래 객체에서 읽기, 쓰기와 같은 작업에 대한 핸들러를 가로채서 커스텀 핸들러를 설정할 수 있게 해준다. 이렇게 기존 작업을 가로채는 작업을 `Trap`이라고 한다.

만약 핸들러를 정하지 않으면, 원래 객체에게 작업이 직접 전달된다.

Proxy가 Trap할 수 있는 [프록시 핸들러](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy)는 아래와 같다. 

| 내부 메서드 | 핸들러 메서드 | 작동 시점 |
| --- | --- | --- |
| [[Get]] | get | 프로퍼티를 읽을 때 |
| [[Set]] | set | 프로퍼티에 쓸 때 |
| [[HasProperty]] | has | in 연산자가 동작할 때 |
| [[Delete]] | deleteProperty | delete 연산자가 동작할 때 |
| [[Call]] | apply | 함수를 호출할 때 |
| [[Construct]] | construct | new 연산자가 동작할 때 |
| [[GetPrototypeOf]] | getPrototypeOf | Object.getPrototypeOf |
| [[SetPrototypeOf]] | setPrototypeOf | Object.setPrototypeOf |
| [[IsExtensible]] | isExtensible | Object.isExtensible |
| [[PreventExtensions]] | preventExtensions | Object.preventExtensions |
| [[DefineOwnProperty]] | defineProperty | Object.defineProperty, Object.defineProperties |
| [[GetOwnProperty]] | getOwnPropertyDescriptor | Object.getOwnPropertyDescriptor, for..in, Object.keys/values/entries |
| [[OwnPropertyKeys]] | ownKeys | Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for..in, Object/keys/values/entries |

```jsx
/* eslint-disable no-param-reassign */
const numbers = [1, 2, 3];

const numbersProxy = new Proxy(numbers, {
  get(target, prop) { // 내부 메서드 : [[Get]], 프로퍼티를 읽을 때
    if (prop in target) {
      return target[prop];
    }
    return 0; // return default value
  },
  set(target, prop, value) { // 내부 메서드 : [[Set]], 프로퍼티를 쓸 때
    console.log(`Set: ${target[prop]} -> ${value}`);
    if (typeof value !== 'number') {
      return false;
    }
    target[prop] = value;
    return true;
  },
  has(target, prop) { // 내부 메서드 : [[HasProperty]], in 연산자가 동작할 때
    if (target[prop]) {
      console.log(`Hit 🥳! ${prop}`);
      return true;
    }
    console.log(`Miss 😥 ${prop}`);
    return false;
  },
});

numbersProxy[0] = 'new value';
console.log(numbersProxy[0]);
console.log(numbersProxy[1]);
console.log(numbersProxy[100]);

/**
* Set: 1 -> new value
* 1
* 2
* 0
*/
```

# 왜 Reflect을 사용하는 것이 더 좋은가?

## 문제 상황 : 한 객체가 다른 객체를 상속받는 상황

```jsx
const user = {
  _name: 'Guest',
  get name() {
    return this._name;
  },
};

const userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop];
  },
});

const admin = {
  __proto__: userProxy,
  _name: 'Admin',
};

console.log(admin.name); // (A) Guest
```

이 예제에서 기대한 결과 (A)구간에서 기대한 결과는 Admin이다. 

그러나 실제 결과는 Guest이다.

이렇게 동작하기까지의 step은

1. admin.name을 했을 때, admin은 name이라는 프로퍼티를 갖고 있지 않으므로, 프로토타입 체인을 타고 올라간다.
2. 프로토타입은 userProxy이다.
3. proxy에서 name을 읽으면, get tarp이 발생하고, target[prop]을 반환한다. 이 때, target[prop]을 호출하는 컨텍스트에서 this=target이고, this._name은 user객체의 _name인 “Guest”를 반환하게 된다.

## 이 때 필요한 것이 Reflect와 receiver

`get trap`의 세 번째 인자인 `receiver` 의 역할이 이때 주요하다.

receiver는 `[[Get]]` 과 `[[Set]]` 에서 받는 인자이다.

[Receiver에 대한 ES6에서의 설명](https://262.ecma-international.org/6.0/#sec-object-internal-methods-and-internal-slots)은 다음과 같다.

> *Receiver* is used as the **this** value when evaluating the code.
> 

Receiver는 이 코드가 실행될 때의 this이다. getter라면, getter가 호출될 떄의 this이다. 

여기서는 admin 객체이다. 

그렇다면 어떻게 getter가 올바른 context의 this를 참조하게 할 수 있을 것인가?

실험삼아 reflect[prop]을 해보았는데, RangeError가 났다.

```jsx
const userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return receiver[prop]; // RangeError: Maximum call stack size exceeded
  },
});
```

일반 함수였다면, `call`/`apply`/`bind`를 사용할 수 있었겠으나, 여기서는  함수가 아닌 getter이다.

이 때 필요한 것이 `Reflect` 이다.

```jsx
const user = {
  _name: 'Guest',
  get name() {
    return this._name;
  },
};

const userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver); // 👈
  },
});

const admin = {
  __proto__: userProxy,
  _name: 'Admin',
};

console.log(admin.name); // Admin
```

receiver가 올바른 this에 대한 참조를 갖고 있으므로, Reflect.get에 `receiver`를 전달할 수 있었다. 

더 간단하게 Reflect에 인자를 전달하는 방식은 `arguments` 를 전달하거나, rest parameter를 사용하는 방식이다.

- arguments 전달
    
    ```jsx
    get(target, prop, receiver) {
      return Reflect.get(...arguments);
    }
    ```
    
- rest parameter로 전달
    
    ```jsx
    get(...args) {
        return Reflect.get(args);
      },
    ```
    

`return Reflect` 를 함으로써, 안전하게 내부 메서드를 호출할 수 있게 된다. Reflect를 사용하지 않았더라면, 직접 예외처리도 해주어야 하는데... 자신 있는가?

# Reference

[Proxy handler - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy)

[Proxy Pattern](https://www.patterns.dev/posts/proxy-pattern/)

[Proxy - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
