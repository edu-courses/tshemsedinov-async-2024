const log = (base, n) => Math.log(n) / Math.log(base);

const createLog = base => n => log(base, n);

// Usage

const lg = createLog(10);
const ln = createLog(Math.E);
const log2 = createLog(2);


console.log('lg(5) ' + lg(5));
console.log('ln(5) ' + ln(5));
console.log('log2_64 ' + log2(64));

