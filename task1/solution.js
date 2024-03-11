const total = (items, callback) => {
  let result = 0;
  for (const item of items) {
    result += item.price;
  }
  return callback(result);
};

const electronics = [
  { name: "Laptop", price: 1500 },
  { name: "Keyboard", price: 100 },
  { name: "HDMI cable", price: 10 },
];

// Use new signature total(electronics, (money) => ...)
const money = total(electronics, (result) => {
  return result;
}); 
console.log({ money });
