const arr = [, '1'];
console.log(arr[1]); // '1'
console.log(arr.length); // 2
console.log(arr[0] === undefined); // true

/* 배열에 프로퍼티를 추가하는 것도 가능하다. */
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true

/*
배열에 프로퍼티를 추가하는 것도 가능하다.
*/

arr.func = function () {
  return 'func';
};
console.log(arr); // [ <1 empty item>, '1', func: [Function (anonymous)] ]
console.log(arr.length); // 2

/*
배열에 프로퍼티르 추가할 때, 숫자와 유사하면 숫자 인덱스로 잘못 해석되어 배열의 내용이 달라질 수 있다.
*/
const array = ['a', 'b', 'c'];
array['3'] = 'd';
console.log(array.length); // 4
console.log(array[3]); // 'd'
