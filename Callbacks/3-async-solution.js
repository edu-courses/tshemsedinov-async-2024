'use strict';

const INTERVAL = 1000;

const total = (items, callback) => {
  let i = 0;
  let result = 0;
  let timer = setInterval(() => {
    if (i >= items.length) {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      callback(null, result);
      return;
    }
    const item = items[i++];
    console.log({ check: { item } });
    if (item.price < 0) {
      clearInterval(timer);
      timer = null;
      callback(new Error('Negative price is not allowed'));
      return;
    }
    result += item.price;
  }, INTERVAL);
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

total(electronics, (error, money) => {
  if (error) console.error({ error });
  else console.log({ money });
});

total(electronics, (error, money) => {
  if (error) console.error({ error });
  else console.log({ money });
});
