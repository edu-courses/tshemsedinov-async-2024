const total = (items, callback) => {
  let result = 0;
  for (const item of items) {
    console.log({ item });
    if (item.price < 0) {
      callback(new Error("Negative price is not allowed"));
      return;
    }
    result += item.price;
  }
  callback(null, result);
};

const electronics = [
  { name: "Laptop", price: 1500 },
  { name: "Keyboard", price: 100 },
  { name: "HDMI cable", price: 10 },
];

total(electronics, (error, money) => {
  if (error) console.error({ error });
  else console.log({ money });
});

total(electronics, (error, money) => {
  if (error) console.error({ error });
  else console.log({ money });
});
