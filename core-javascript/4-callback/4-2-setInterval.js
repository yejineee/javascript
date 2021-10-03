let count = 0;
let timer = null;
const cbFunc = function () {
  console.log(count);
  if (++count > 4) {
    clearInterval(timer);
  }
};

timer = setInterval(cbFunc, 300);
