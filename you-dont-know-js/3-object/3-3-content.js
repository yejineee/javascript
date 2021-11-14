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

/*
Key Access
- UTF-8/유니코드 호환 문자열이면 모두 프로퍼티명으로 쓸 수 있다.
*/

const keyAccessObject = {};
keyAccessObject['123'] = '123'; // 숫자로 시작
keyAccessObject['*hi'] = '*hi'; // $나 _가 아닌 특수문자 사용
keyAccessObject['bl ank'] = 'bl ank'; // 공백 사용

/*
객체 프로퍼티명은 항상 문자열
*/

const obj = {};
obj.true = 'true';
obj[100] = '100';
obj[obj] = 'obj';

console.log(obj.true); // true
console.log(obj['100']); // 100
console.log(obj['[object Object]']); // obj
