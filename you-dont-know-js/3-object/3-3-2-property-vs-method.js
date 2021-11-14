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

const objLiteral = {
  hi() {
    console.log('hi');
  },
};

const hiFuncVar = objLiteral.hi;

console.log(hiFuncVar); // [Function: hi]
console.log(objLiteral.hi); // [Function: hi]
console.log(hiFuncVar === objLiteral.hi); // true
