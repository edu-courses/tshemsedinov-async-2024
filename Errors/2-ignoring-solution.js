'use strict';

const total = (items, callback) => {
  let result = 0;
  const errors = [];
  for (const item of items) {
    if (item.price < 0) {
      const data = JSON.stringify(item);
      const error = new Error(`Negative price is not allowed: ${data}`);
      errors.push(error);
    }
    result += item.price;
  }
  if (errors.length === 0) return callback(null, result);
  const error = AggregateError(errors, 'Can not calculate total');
  callback(error);
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: -100 },
  { name: 'HDMI cable', price: 10 },
  { name: 'Bag', price: -50 },
];

total(electronics, (error, money) => {
  if (error) console.error(error);
  else console.log({ money });
});
