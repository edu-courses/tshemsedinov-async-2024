3. Task: rewrite total function to be async with JavaScript timers. Use setInterval and clearInterval to check next item each 1 second. Calculations will be executed asynchronously because of timers. Run total twice (as in example below) but in parallel. Print debug output for each calculation step (each second).

```javascript
// Hint: example output:
// { item: { name: 'Laptop', price: 1500 } }
// { item: { name: 'Laptop', price: 1500 } }
// { item: { name: 'Keyboard', price: 100 } }
// { item: { name: 'Keyboard', price: 100 } }
// { item: { name: 'HDMI cable', price: 10 } }
// { item: { name: 'HDMI cable', price: 10 } }
// { money: 1610 }
// { money: 1610 }

const total = (items, callback) => {
  let result = 0;
  for (const item of items) {
    console.log({ item });
    if (item.price < 0) {
      callback(new Error('Negative price is not allowed'));
      return;
    }
    result += item.price;
  }
  callback(null, result);
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
```