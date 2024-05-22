'use strict';

const { setTimeout } = require('node:timers/promises');

(async () => {
  console.log('Wait 3 sec...');
  await setTimeout(3000);
  console.log('Done');
})();
