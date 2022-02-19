# Part 2 비동기와 성능 - 3장 프라미스

# 1. 프라미스란

## 콜백과 프라미스

콜백과 프라미스는 제어권을 누가 쥐고 있느냐의 차이가 있다.

콜백은 제어권이 다른 곳에 있다.

다른 코드에게 실행될 콜백 함수를 인자로 넘겨주고, 그 제어권도 같이 넘겨준 함수이다.

이런 점에서 콜백함수는 제어가 역전되었다고 말할 수 있다.

반면, 프라미스는 그 제어권이 호출부에 있다.

호출한 코드의 실행 결과에 맞춰 개발자가 일을 수행시킬 수 있다.

이를 프라미스는 제어의 역전을 다시 역전시켰다고 볼 수 있다. 

## 이룸과 버림

프라미스는 그 결과가 `이룸(Fulfillment)`아니면 `버림(Rejection)`이다.

이룸값은 반드시 프로그램이 결정짓게 되어있지만, 버림값은 프로그램이 결정지을 수도 있고, 런타임 에러에 의해 결정될 수 있다.

아래 예시가 그러하다.
go 함수 내에서 명시적으로 버림이 이루어질 reject를 호출하지 않는다.
그러나, 인자로 받는 destination에 ceil이라는 함수가 없다면, 런타임 에러가 발생하고, 이는 go라는 함수가 reject를 호출한 것과 동일한 효과가 난다.

```js
function go(destination) {
  return new Promise((resolve, reject) => {
    destination.ceil(10); 
  });
}

go('Home')
  .then(
    // 이룸(Fulfillment)시 실행되는 함수
    () => { 
      console.log('SUCCESS');
    },
    // 버림(Rejection)시 실행되는 함수
    (err) => { 
      console.error('FAIL : ', err);
    },
  );

// FAIL :  TypeError: destination.ceil is not a function

```
