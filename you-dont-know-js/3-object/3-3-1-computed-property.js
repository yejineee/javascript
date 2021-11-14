const prefix = 'api_';
const endpoint = {
  [`${prefix}login`]: '/api/login',
  [`${prefix}logout`]: '/api/logout',
};

console.log(endpoint);
// { api_login: '/api/login', api_logout: '/api/logout' }

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

