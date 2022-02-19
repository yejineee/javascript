/**
 * Promise의 버림(Rejection)은 프로그램의 로직에 따라 직접 세팅될 수 있지만,
 * 런타임 에러에 의해 생겨나기도 한다.
 */
function go(destination) {
  return new Promise((resolve, reject) => {
    destination.ceil(10);
  });
}

go('Home')
  .then(
    () => {
      console.log('SUCCESS');
    },
    (err) => {
      console.error('FAIL : ', err);
    },
  );

// FAIL :  TypeError: destination.ceil is not a function
