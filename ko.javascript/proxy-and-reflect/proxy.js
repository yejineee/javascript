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
