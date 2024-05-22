'use strict';

const sleep = (msec) => new Promise((resolve) => {
  setTimeout(resolve, msec);
});

(async () => {
  console.log({ start: new Date().toISOString() });
  console.log('Wait 3 sec...');
  await sleep(3000);
  console.log({ finish: new Date().toISOString() });
})();
