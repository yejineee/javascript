# CH4. 콜백함수

출처: 코어 자바스크립트 - CH4 콜백함수

## 1. 콜백 함수
- 다른 코드의 인자로 넘겨주는 함수
- 다른 코드에게 **인자로 넘겨줌**으로써 **그 제어권도 함께 위임**한 함수
  - 콜백함수를 위임받은 코드는 자체적인 내부 로직에 의해 이 콜백함수를 실행한다.

## 2. 제어권

> var intervalId = scope.setInterval(func, delay[,param1, param2, ...]);

- **예제 4-1**

```javascript
let count = 0;
var timer = setInterval(() => {
  console.log(count);
  if (++count > 4) {
    clearInterval(timer);
  }
}, 300);
/*
0
1
2
3
4
*/

```
setInterval의 반환값은 고유한 ID이고, 이 ID를 `clearInterval` 함수에 넘겨서, setInterval을 종료할 수 있다. 

- **예제 4-2**

```javascript
let count = 0;
let timer = null;
const cbFunc = function () {
  console.log(count);
  if (++count > 4) {
    clearInterval(timer);
  }
};

timer = setInterval(cbFunc, 300);
```
`cbFunc`의 제어권을 넘겨받은 `setInterval`은 300ms마다 콜백함수를 실행하게 된다. 

즉, 콜백함수의 제어권을 넘겨받은 코드가 콜백함수 호출 시점에 대한 제어권을 갖는다.

## 3. 콜백함수는 함수다

- **예제 4-7**

  전역 스코프에는 var 변수인 name과, obj라는 객체가 정의되어있다. 
  
  ```javascript
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
    
  ```

  - 메서드로서 호출

    ```js
    obj.logValues(1,2);
    /* 
    { name: 'object', vals: [ 1, 2, 3 ], logValues: [Function: logValues] }
    object 1 2
    */
    ```

    - `obj.logValues`를 호출하는 것은 obj 객체의 메서드로서 호출되는 것이다. 
    - 메서드로서 호출되었으므로, logValus 함수 내의 this는 obj를 가리키게 된다.

  - 콜백함수로 호출

    - 함수 객체로 넘겨준 logValues 함수
      
      obj.logValues를 forEach문의 콜백 함수로 넘겨주는 것은, 메서드로서 호출한 것이 아니다. 
      
      단지 logValues라는 함수 객체를 넘겨준 것이다. 

    - 콜백 함수 내의 this

      forEach문은 배열을 순회하면서, 이 콜백함수를 호출하게 된다. 
      
      이때, 콜백함수로서의 obj.logValues의 this는 전역 객체를 바라보게 된다. 

      ```javascript
      [4,5,6].forEach(obj.logValues)
      /* node에서 실행 결과 
      <ref *1> Object [global]
      undefined 4 0 
      <ref *1> Object [global]
      undefined 5 1
      <ref *1> Object [global]
      undefined 6 2
      */
      ```

    - node에서의 var와 브라우저에서의 var

      같은 코드를 브라우저에서 동작시키면 다른 결과를 확인할 수 있다.

      **node에서 이 코드를 실행시키면, `this.name`이 `undefined`로 출력**되었다.

      아래는 같은 코드를 브라우저에서 실행시켰을 때의 결과이다.

      **브라우저에서는 전역 스크립트에 선언한 name이 전역 객체의 프로퍼티로 할당이 되어 this.name이 `global`이라고 출력**되었다.

      ```javascript

      [4,5,6].forEach(obj.logValues)
      /* 브라우저에서의 실행 결과
      Window {0: Window, window: Window, self: Window, document: document, name: "global", location: Location, …}
      global 4 0
      Window {0: Window, window: Window, self: Window, document: document, name: "global", location: Location, …}
      global 5 1
      Window {0: Window, window: Window, self: Window, document: document, name: "global", location: Location, …}
      gloabl 6 2
      */
      ```

      왜 이런 차이를 가져온 것일까? 

      

      그 차이는 브라우저와 Node.js 파일의 **top-level scope가 다르다는 점**에 있다.
      
      **브라우저 스크립트에서 top-level scope는 global scope**인 반면, **node.js 파일에서 top-level scope는 module scope**이다. 

      global scope에서는 var로 선언한 변수를 전역객체의 프로퍼티로 추가한다. 따라서 브라우저에서의 `var name='global'은 window객체의 name 프로퍼티로 추가되었던 것이다. 

      <img width="705" alt="스크린샷 2021-10-03 오후 3 51 57" src="https://user-images.githubusercontent.com/43772082/135743398-05ee1987-0d93-4617-8ef1-8c0654183d29.png">


      반면, Node.js의 모듈 스코프에서는 var로 선언한 변수가 모듈 안에 있으므로, 전역 객체의 프로퍼티로 추가되지 않는다. 

      모듈 스코프를 코드로 보면 아래와 같을 것이다.

      ```javascript

      // The wrapper Node.js provides node-style modules
      // This is "module" scope
      (function(){
        var name = 'global'

        var obj = {
          name: 'object',
          vals: [1,2,3],
          logValues(v, i){
            console.log(this);
            console.log(this.name, v, i)
          }
        }

        var arr = [4,5,6];
        arr.forEach(obj.logValues)
      })();
      ```

      node.js에서는 전역 코드에 선언한 `var name`이  모듈 스코프 내에 선언된 것이므로, this.name (global.name)은 undefined를 출력하게 된 것이다. 


## Reference

- https://stackoverflow.com/questions/60298608/difference-between-window-browser-and-global-node-js-objects