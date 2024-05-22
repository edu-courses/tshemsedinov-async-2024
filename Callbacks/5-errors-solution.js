'use strict';

const MAX_PURCHASE = 2000;

const calculateSubtotal = (goods, callback) => {
  let amount = 0;
  for (const { name, price } of goods) {
    if (typeof name !== 'string') {
      const error = new Error('Noname in item in the bill');
      return void callback(error);
    }
    if (typeof price !== 'number') {
      const error = new Error(`${name} price expected to be number`);
      return void callback(error);
    }
    if (price < 0) {
      const error = new Error(`Negative price for ${name}`);
      return void callback(error);
    }
    amount += price;
  }
  callback(null, amount);
};

const adder = (initial) => ({
  value: initial,
  add(x) { this.value += x; },
});

const calculateTotal = (order, callback) => {
  const expenses = new Map();
  const errors = [];
  const total = adder(0);
  for (const groupName in order) {
    const goods = order[groupName];
    calculateSubtotal(goods, (error, amount) => {
      if (error) return void errors.push(error);
      total.add(amount);
      expenses.set(groupName, amount);
    });
    if (total.value > MAX_PURCHASE) {
      errors.push(new Error('Total is above the limit'));
      break;
    }
  }
  if (errors.length > 0) {
    const cause = new AggregateError(errors, 'Caused by');
    const error = new Error('Can not calculate total', { cause });
    return void callback(error);
  }
  callback(null, { total: total.value, expenses });
};

const purchase = {
  Electronics: [
    { name: 'Laptop', price: 1500 },
    { name: 'Keyboard', price: 100 },
    { name: 'HDMI cable' },
  ],
  Textile: [
    { name: 'Bag', price: 50 },
    { price: 20 },
  ],
};

console.log(purchase);
calculateTotal(purchase, (error, bill) => {
  if (error) {
    console.log('Error detected');
    console.dir(error, { depth: null });
  } else {
    console.log(bill);
  }
});
