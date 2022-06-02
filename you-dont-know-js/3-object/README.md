# CH3. 객체

# 1. 구문

- **리터럴 형식**
    - 한 번에 여러 개의 key/value를 추가할 수 있다.
    
    ```jsx
    const object = {
      key: 'value',
    };
    ```
    
- **생성자 형식**
    - 한 번에 한 프로퍼티만 추가할 할 수 있다.
    - 생성자형식으로 객체를 만드는 일은 거의 없다.
    
    ```jsx
    const object = {
      key: 'value',
    };
    
    const object2 = new Object();
    object2.key = 'value';
    ```
    

# 2. 타입

- 자바스크립트의 주요 타입
    - null
    - undefined
    - boolean
    - number
    - string
    - object
    - symbol (ES6에서 추가)
- Simple Primitive (단순 원시 타입)
    - null, undefined, boolean, number, string
    - `typeof null` 의 반환값은 'object'이지만, 이는 언어 자체의 버그이다. null은 객체가 아니다.
        
        ```jsx
        > typeof null
        'object'
        ```
        
- Complex Primitive (복합 원시 타입)
    - 객체 하위 타입(Sub Type)
    - function이 객체 하위 타입이다.
    - 자바스크립트에서 `함수는 일급객체`이다.
        - 다른 함수에 인자로 전달할 수 있다.
        - 함수의 반환값이 될 수 있다.
        - 함수 자체를 변수에 할당하거나 자료구조에 저장할 수 있다.

## 2.1 내장 객체

- 객체 하위타입
- 내장 객체의 종류
    - String
    - Number
    - Boolean
    - Object
    - Function
    - Array
    - Date
    - RegExp
    - Error
- 내장 객체는 **생성자(Constructor)** 로 사용되어, 하위 타입의 **새 객체**를 생성한다.
    
    `String` 을 예로 들어 보자.
    
    String을 생성자로 호출한 반환값을 저장한 stringObject의 타입은 string이 아닌 "object"임을 알 수 있다. 
    
    ```jsx
    const stringPrimitive = 'string primitive';
    const stringObject = new String('string object');
    
    console.log(typeof stringPrimitive); // string
    console.log(typeof stringObject); // object
    ```
    
    `instanceof` 연산자는 객체의 프로토타입 체인에 생성자의 prototype이 있는지를 확인해주는 연산자이다. 
    
    이 instanceof를 통해, 객체가 해당 프로토타입에 속해있는지를 확인할 수 있다.
    
    ```jsx
    console.log(stringPrimitive instanceof String); // false
    console.log(stringObject instanceof String); // true
    ```
    
    이를 통해, 리터럴 형식으로 만든 stringPrimitive는 String을 생성자로 만든 객체가 아니지만, stringObject는 String을 생성자로 하여 만든 객체임을 알 수 있다. 
    
    실제로 stringPrimitive의 프로토타입 체인은 String 생성자의 prototype과 일치한다.
    
    ```jsx
    stringPrimitive.__proto__ === String.prototype // true
    ```
    
- 자동 강제 변환
    - 리터럴 형식으로 만든 string, boolean, number는 객체가 아니고, 불변(immutable)하다.
        
      하지만, 자바스크립트 엔진이 상황에 맞게 primitive value를 String 객체로 자동변환해주므로, String의 메서드를 사용할 수 있다. 
        
      ```jsx
      const stringPrimitive = 'string primitive';
      
      // String
      console.log(stringPrimitive.substring(6)); // primitive
      console.log(stringPrimitive.length); // 16

      // Number
      console.log(23.123.toFixed(2)); // 23.12

      // Boolean
      const x = false;
      console.log(x.valueOf()) // false
      ```
        
- Objects, Arrays, Function, RegExps는 리터럴/생성자와 관계없이 모두 `객체`이다.
    
    ```jsx
    const objectLiteral = { num: 1 };
    const object = new Object();
    
    console.log(objectLiteral instanceof Object); // true
    console.log(object instanceof Object); // true
    
    const arrayLiteral = [1, 2, 3];
    const array = new Array();
    
    console.log(arrayLiteral instanceof Object); // true
    console.log(array instanceof Object); // true
    
    const functionLiteral = function () { return 0; };
    function func() {
      return 0;
    }
    
    console.log(functionLiteral instanceof Object); // true
    console.log(func instanceof Object); // true
    
    const regexLiteral = /\d/i;
    const regex = new RegExp('\\d', 'i');
    
    console.log(regexLiteral instanceof Object); // true
    console.log(regex instanceof Object); // true
    ```

- null과 undefined는 객체 래퍼 형식이 없다.
- Date는 리터럴 형식이 없으므로, 반드시 생성자 형식으로 생성해야 한다.
  ```js
  let today = new Date()
  ```

### 정리
- 내장 객체는 생성자로 사용되며, 새 객체를 생성한다.
- 일부 primitive value는 자동 강제 변환이 된다.
  - 자동 강제 변환이 되는 것 : string, number, boolean

# 3. 내용

- 자바스크립트 엔진이 값을 저장하는 방식은, 엔진별로 다르다.
- 프로퍼티 접근 (Property Access) :  `'.'` 연산자로 프로퍼티 접근
    - identifier compatible 프로퍼티명이 와야 한다.
        - 대소문자를 구별
        - 유니코드 글자, $, _, 숫자(0-9)로 구성
        - 숫자로 시작할 수는 없음
        - 공백을 사용할 수 없음.
    
    ```jsx
    /*
    Property Access
    - identifier compatible 프로퍼티명이 와야 한다
      - 대소문자를 구별
      - 유니코드 글자, $, _, 숫자(0-9)로 구성
      - 숫자로 시작할 수는 없음
    */
    
    const propertyObject = {
      _hi: '_hi',
      $hello: '_$hello',
      asdf123: 'asdf123',
      // bl ank: 'bl ank', error !
      // *hi:'12',  // error!
    };
    ```
    
- 키 접근 (Key Access)
    - UTF-8 / 유니코드 호환 문장려은 모두 프로퍼티명으로 쓸 수 있다.
    
    ```jsx
    /*
    Key Access
    - UTF-8/유니코드 호환 문자열이면 모두 프로퍼티명으로 쓸 수 있다.
    */
    
    const keyAccessObject = {};
    keyAccessObject['123'] = '123'; // 숫자로 시작
    keyAccessObject['*hi'] = '*hi'; // $나 _가 아닌 특수문자 사용
    keyAccessObject['bl ank'] = 'bl ank'; // 공백 사용
    ```
    
- 객체 **프로퍼티명은 항상 문자열**이다.
    - 문자열 이외의 다른 primitive 값을 쓰면, 우선 문자열로 변환된다.
        - 아래 예시의 `obj[obj]` 는 obj가 가리키는 `{ }` 를 문자열로 변환한 `[object Object]` 가 프로퍼티명으로 쓰인 것을 알 수 있다.
            
            이는 객체를 문자열 형태로 변환해주는 메서드인 `Object.prototype.toString()` 을 사용하였을 때,  `obj.toString()` 가 `[object Object]` 를 반환한데에 따른 것이다. 
            
    
    ```jsx
    /*
    객체 프로퍼티명은 항상 문자열
    */
    
    const obj = {};
    
    obj.true = 'true';
    obj[100] = '100';
    obj[obj] = 'obj';
    
    console.log(obj['true']); // true
    console.log(obj['100']); // 100
    console.log(obj['[object Object]']); // obj
    ```
    

## 3.1 계산된 프로퍼티명

- Computed Property Names
    - 객체 리터럴 선언 시, 프로퍼티 이름 부분에 표현식을 넣고 `[ ]` 로 감싸는 것
        
        ```jsx
        const prefix = 'api_';
        const endpoint = {
          [`${prefix}login`]: '/api/login',
          [`${prefix}logout`]: '/api/logout',
        };
        
        console.log(endpoint);
        // { api_login: '/api/login', api_logout: '/api/logout' }
        ```
        
    - ES6의 `Symbol`을 computed property name으로 사용할 수 있다.
        - Symbol 값은 유일한 값이다. ⇒ **Symbol 값을 키로 갖는 프로퍼티는 다른 어떠한 프로퍼티와도 충돌하지 않는다.**
        
        ```jsx
        /*
        ES6 - Symbol
        - symbol은 변경불가능한 primitive 타입이다.
        - symbol 값은 유일하므로, symbol값을 키로 갖는 프로퍼티는 다른 프로퍼티와 충돌하지 않는다.
        */
        
        const symbol1 = Symbol('symbol');
        const symbol2 = Symbol('symbol');
        
        const symbolObject = {
          [symbol1]: 'symbol1',
          [symbol2]: 'symbol2',
        };
        
        console.log(symbol1 === symbol2); // false
        
        console.log(symbolObject); // { [Symbol(symbol)]: 'symbol1', [Symbol(symbol)]: 'symbol2' }
        console.log(symbolObject[symbol1]); // symbol1
        console.log(symbolObject[symbol2]); // symbol2
        ```
        

## 3.2 프로퍼티 vs 메서드

저자는 객체 프로퍼티 값이 함수라고 해서, 그 함수를 '메서드'라고 부르는 것은 지나친 확대 해석이라고 말한다. 

객체의 프로퍼티 값이 함수라는 건, 함수를 가리키는 레퍼런스가 하나 있을 뿐, 그 객체가 '소유한' 함수는 아니라고 얘기한다.

```jsx
function func() {
  console.log('func');
}

const funcVar = func;

const object = {
  funcRef: func,
};

console.log(func); // [Function: func]
console.log(funcVar); // [Function: func]
console.log(object.funcRef); // [Function: func]
```

객체 리터럴로 함수 표현식을 선언하는 또한, 해당 함수 객체를 참조하는 레퍼런스가 생기는 것일 뿐이라고 말한다.

```jsx
const objLiteral = {
  hi() {
    console.log('hi');
  },
};

const hiFuncVar = objLiteral.hi;

console.log(hiFuncVar); // [Function: hi]
console.log(objLiteral.hi); // [Function: hi]
console.log(hiFuncVar === objLiteral.hi); // true
```

## 3.3 배열

- 배열은 `숫자 인덱싱` 이라는 양수로 표기된 위치에 값을 저장한다.
    
    ```jsx
    const arr = [, '1'];
    
    console.log(arr[1]); // '1'
    console.log(arr.length); // 2
    console.log(arr[0] === undefined); // true
    ```
    
- **배열 자체도 객체**이다.
    
    `instanceof` 연산자로 arr의 프로토타입 체인은 Object의 프로토타입을 가리키는지 확인해보면, arr는 Object prototype에 속해있다는 것을 알 수 있다.
    
    ```jsx
    const arr = [, '1'];
    
    console.log(arr instanceof Array); // true
    console.log(arr instanceof Object); // true
    ```
    
- 배열에 프로퍼티를 추가하는 것도 가능하다.
    - 그러나, 배열 길이는 변하지 않는다.
    
    ```jsx
    const arr = [, '1'];
    
    console.log(arr.length); // 2
    
    arr.func = function () {
      return 'func';
    };
    
    console.log(arr); // [ <1 empty item>, '1', func: [Function (anonymous)] ]
    console.log(arr.length); // 2
    ```
    
- 배열에 프로퍼티르 추가할 때, 숫자와 유사하면 숫자 인덱스로 잘못 해석되어 배열의 내용이 달라질 수 있다.
    
    ```jsx
    const array = ['a', 'b', 'c'];
    array['3'] = 'd';
    console.log(array.length); // 4
    console.log(array[3]); // 'd'
    ```