// import { randTime } from './randTime.js';

const randTime = val => {
  return new Promise((res, rej) => {
    const random = Math.random() * 3000;
    setTimeout(() => {
      res(val);
    }, random);
  });
};

function MyPromise(cb) {
  const thenFns = [];
  const finalFns = [];

  MyPromise.prototype.then = tcb => {
    if (typeof tcb === 'function') thenFns.push(tcb);
    return this;
  };

  MyPromise.prototype.catch = ccb => {
    if (!MyPromise.prototype.catchFn) {
      MyPromise.prototype.catchFn = ccb;
    }
    return this;
  };

  MyPromise.prototype.finally = fcb => {
    if (typeof fcb === 'function') finalFns.push(fcb);
    return this;
  };

  const finalRunner = () => {
    finalFns.forEach(fn => {
      fn();
    });
  };

  const resolve = succ => {
    const recur = (fn, prevVal) => {
      if (!fn) {
        // 1. then 함수가 없을때!
        this.state = 'resolve';
        return finalRunner();
      }

      const nextFn = thenFns.shift();

      if (prevVal instanceof Promise) {
        // 2. return Promise(randTime) 에서 err가 나왔을 때
        prevVal
          .then(val => {
            recur(nextFn, fn(val));
          })
          .catch(val => {
            this.state = 'reject';
            this.catchFn(val);
            return finalRunner();
          });
      } else {
        recur(nextFn, fn(prevVal));
      }
    };

    recur(thenFns.shift(), succ);
  };

  const reject = fail => {
    this.state = 'reject';

    if (this.catchFn) {
      // 3. reject 됐을 때
      this.catchFn(fail);
      return finalRunner();
    }
  };

  console.log('myPromise!!!!!!!');
  this.state = 'pending';
  cb(resolve, reject);
}

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    const now = Date.now();

    if (now % 2 === 0) resolve(now);
    else reject(new Error('어디로?'));
  }, 1000);
})
p.then(res => {
  console.log('p.then.res11>>>', res);
  return randTime(1);
})
  .then(res => {
    console.log('p.then.res33>>>', res);
    return randTime(2);
  })
  .then(res => {
    console.log('p.then.res55>>>', res);
    return randTime(3);
  })
  .then(res => {
    console.log('p.then.res22>>>', res);
    return 'FiNALLY';
  })
  .then(console.log('p.then.res33!!!'))
  .then(res => res || 'TTT')
  .catch(err => console.error('err-11>>', err))
  .catch(err => console.error('err-22>>', err))
  .finally(() => console.log('finally-11'))
  .finally(() => console.log('finally-22'));