/* eslint-disable no-param-reassign */
const numbers = [1, 2, 3];

const numbersProxy = new Proxy(numbers, {
  get(target, prop, receiver) { // 내부 메서드 : [[Get]], 프로퍼티를 읽을 때
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    }
    return 0; // return default value
  },
  set(target, prop, value, receiver) { // 내부 메서드 : [[Set]], 프로퍼티를 쓸 때
    console.log(`Set: ${target[prop]} -> ${value}`);
    if (typeof value !== 'number') {
      return false;
    }
    return Reflect.set(target, prop, value, receiver);
  },
  has(target, prop) { // 내부 메서드 : [[HasProperty]], in 연산자가 동작할 때
    if (target[prop]) {
      console.log(`Hit 🥳! ${prop}`);
    } else {
      console.log(`Miss 😥 ${prop}`);
    }
    return Reflect.has(target, prop);
  },
});

numbersProxy[0] = 'new value';
console.log(numbersProxy[0]);
console.log(numbersProxy[1]);
console.log(numbersProxy[100]);
