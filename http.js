const http = require('http');
const fs = require('fs');
//     */
// });

// server.listen(3000); // 监听端口

// function getResponseList(obj) {
//   const prototypeList = [];
//   while ((obj = Object.getPrototypeOf(obj))) {
//     //返回给定对象的原型。如果没有继承属 性，则返回 null 。
//     prototypeList.push(obj)
//   }s
//   prototypeList.push(null);
//   return prototypeList;
// }

/*-----------显示一个首页--------*/

const server = http.createServer((request, response) => {
  const { url, method, headers } = request;
  console.log(url, method, headers);
  if (url === '/' && method === 'GET') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        response.writeHead(500, { 'content-type': 'text/palin;charset:utf-8' });
        response.end('出错了 服务器错误');
        return;
      }
      response.statusCode = 200;
      response.setHeader('content-type', 'text/html');
      response.end(data);
    });
  } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
    // 说明请求中含有图片，通过流进行处理
    fs.createReadStream('.' + url).pipe(response); //此时URL= /png
  } else {
    response.statusCode = 404;
    response.setHeader('content-type', 'text/plain');
    response.end('找不到此页面');
  }
});

server.listen(3001);
