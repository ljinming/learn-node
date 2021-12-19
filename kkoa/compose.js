/*---------函数compose ---------*/
function add(x, y) {
  return x + y;
}

function sq(z) {
  return z * z;
}

function fnCompose(...fns) {
  return (...args) => {
    return fns.reduce((a, b) => {
      return b(a(...args));
    });
  };
}

function fnc(...fns) {
  return (...args) => {
    let nums;
    fns.forEach((fn, index) => {
      if (index === 0) {
        nums = fn(...args);
      } else {
        nums = fn(nums);
      }
    });
    return nums;
  };
}

const compose1 =
  (...[first, ...other]) =>
  (...args) => {
    let ret = first(...args);
    other.forEach((fn) => {
      ret = fn(ret);
    });
    return ret;
  };

const m = fnCompose(add, sq)(1, 2);

/*------------异步compose ------*/
async function fn1(next) {
  console.log('fn1');
  await next();
  console.log('end fn1');
}
async function fn2(next) {
  console.log('fn2');
  await delay();
  await next();
  console.log('end fn2');
}
function fn3(next) {
  console.log('fn3');
}
function delay() {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove();
    }, 2000);
  });
}

function composeAsny(...middlewares) {
  return () => {
    return dispatch(0);
    function dispatch(i) {
      let fn = middlewares[i];
      if (!fn) {
        return Promise.resolve();
      }
      return Promise.resolve(
        fn(function next() {
          // promise完成后，再执⾏下⼀个
          return dispatch(i + 1);
        })
      );
    }
  };
}

function compose2(middlewares) {
  return function () {
    return dispatch(0);
    // 执⾏第0个
    function dispatch(i) {
      let fn = middlewares[i];
      if (!fn) {
        return Promise.resolve();
      }
      return Promise.resolve(
        fn(function next() {
          // promise完成后，再执⾏下⼀个
          return dispatch(i + 1);
        })
      );
    }
  };
}

const mi = composeAsny(fn1, fn2, fn3);
console.log(mi());
