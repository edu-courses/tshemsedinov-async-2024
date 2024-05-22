'use strict';

const EventEmitter = require('node:events');
const { setImmediate } = require('node:timers/promises');

const ee = new EventEmitter({ captureRejections: true });

ee.on('item', async (price) => {
  if (price < 0) throw new Error('Negative price');
  console.log({ price });
});

ee.on('error', (error) => {
  console.error(error.message);
});

const items = [1500, -100, 10, -2, 70];

(async () => {
  for (const item of items) {
    ee.emit('item', item);
    await setImmediate();
    //await new Promise((resolve) => setImmediate(resolve));
  }
})();
