console.log(__filename);
console.log(__dirname +'/app.js');

let relativePath = './index.html';

let path = require('path');
let absolutePath = path.join(__dirname, './index.html');
console.log(absolutePath);