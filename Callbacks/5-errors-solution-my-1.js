'use strict';

// Task: rewrite error handling to use callback-last-error-first
// contract to return errors instead of throwing them.
// So remove all try/catch blocks and pass errors to callbacks.
// Hint: You may also use error.cause to wrap escalated errors.
// Extra credit task: use AggregateError to combine escalated errors.
// Extra credit task: fix eslint error: "Function declared in a loop
//   contains unsafe references to variable(s) 'total'  no-loop-func"

const MAX_PURCHASE = 2000;

const calculateSubtotal = (goods, callback) => {
  let amount = 0;
  for (const item of goods) {
    if (typeof item.name !== 'string') {
      return void callback(new Error('Noname in item in the bill'));
    }
    if (typeof item.price !== 'number') {
      return void callback(new Error(`${item.name} price expected to be number`));
    }
    if (item.price < 0) {
      return void callback(new Error(`Negative price for ${item.name}`));
    }
    amount += item.price;
  }
  callback(null, amount);
};

const calculateTotal = (order, callback) => {
  const expenses = new Map();
  const errors = [];
  let total = 0;
  for (const groupName in order) {
    const goods = order[groupName];
    calculateSubtotal(goods, (error, amount) => {
      if (error) return void errors.push(error);
      total += amount;
      expenses.set(groupName, amount);
    });
    if (total > MAX_PURCHASE) {
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
