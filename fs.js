/*------------------------fs --------------------*/

const fs = require('fs');
const { buffer } = require('stream/consumers');

// 同步执行,会等data 获取数据之后进行下一步
const data = fs.readFileSync('./config.json');
console.log('---', data.toString());

// 异步执行
//回调函数里执行数据读取之后的操作，错误优先的回调
fs.readFile('./config.json', (err, data) => {
  console.log('data', data.toString());
});

console.log('000---end');

// promise 式异步回调

const { promisify } = require('util');
const readFile = promisify(fs.readFile);
readFile('./config.json').then((data) => {
  console.log('promise---data', data.toString());
});
