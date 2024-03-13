const total = (items, callback) => {
  let result = 0;
  let err = null;
  for (const item of items) {
    if (item.price < 0) {
      err = 'Error: price is less 0';
      result = null;
      break;
    }
    result += item.price;
  }
  callback(err, result);
};

const electronics = [
  { name: "Laptop", price: -1500 },
  { name: "Keyboard", price: 100 },
  { name: "HDMI cable", price: 10 },
];

total(electronics, (error, money) => {
  console.log({ error });
  console.log({ money });
});
