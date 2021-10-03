var name = 'global'

var obj = {
  name: 'object',
  vals: [1,2,3],
  logValues(v, i){
    console.log(this);
    console.log(this.name, v, i)
  }
}

obj.logValues(1,2);
/* 
{ name: 'object', vals: [ 1, 2, 3 ], logValues: [Function: logValues] }
object 1 2
*/

[4,5,6].forEach(obj.logValues)
/* 
<ref *1> Object [global]
undefined 4 0 
<ref *1> Object [global]
undefined 5 1
<ref *1> Object [global]
undefined 6 2
*/