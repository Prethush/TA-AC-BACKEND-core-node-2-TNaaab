let path = require('path');
let relativePath = '../client/index.js';
let absolutePath = path.join(__dirname, '..', 'client/index.js');
console.log(absolutePath);