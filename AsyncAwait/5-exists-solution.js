'use strict';

const fs = require('node:fs');

// Implementation

const toBool = [() => true, () => false];

const fileExists = (name) => fs.promises.access(name).then(...toBool);

// Usage

(async () => {
  const name = 'file-name.ext';
  const exists = await fileExists(name);
  console.log({ name, exists });
})();

(async () => {
  const name = '5-exists-problem.js';
  const exists = await fileExists(name);
  console.log({ name, exists });
})();
