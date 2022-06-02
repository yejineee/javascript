const stringPrimitive = 'string primitive';
const stringObject = new String('string object');

console.log(typeof stringPrimitive); // string
console.log(typeof stringObject); // object

console.log(stringPrimitive instanceof String); // false
console.log(stringObject instanceof String); // true


/**
 * 자동 강제 변환 예시
 * - 자바스크립트 엔진이 stringPrimitive를 String 객체로 자동 강제 변환한다.
 */

// String
console.log(stringPrimitive.substring(6)); // primitive
console.log(stringPrimitive.length); // 16

// Number
console.log(23.123.toFixed(2)); // 23.12

// Boolean
const x = false;
console.log(x.valueOf()) // false

/*
Objects, Arrays, Function, RegExps는 리터럴/생성자와 관계없이 모두 객체
*/

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
