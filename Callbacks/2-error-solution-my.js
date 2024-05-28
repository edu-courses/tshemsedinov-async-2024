'use strict';

const total = (items, callback) => {
  let result = 0;
  for (const item of items) {
      if (item.price <  0) return void callback(new Error('Negative price is not allowed'));
      result += item.price;
  }
  callback(null, result);
};

const electronics = [
  { name: 'Laptop', price: -1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

total(electronics, (err, money) => {
  if(err) console.log({ err });
  else console.log({ money });
});