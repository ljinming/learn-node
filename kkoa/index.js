const http = require('http');
const request = require('./request');
const response = require('./response');
const context = require('./context');
class Kkoa {
  constructor() {
    this.middlewares = [];
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      // const ctx = this.createContext(req, res);
      // this.callback(ctx);

      // 响应
      // res.writeHead(200, { 'content-type': 'text/palin;charset:utf-8' });
      //res.end(JSON.stringify(ctx.body));
      // res.end(ctx.body);

      /*异步处理*/
      const ctx = this.createContext(req, res);

      const fn = this.composeAsny(this.middlewares);
      await fn(ctx);
      res.end(ctx.body);
    });
    server.listen(...args);
  }
  use(callback) {
    this.middlewares.push(callback);
    // this.callback = callback;
  }

  composeAsny(middlewares) {
    return (ctx) => {
      return dispatch(0);
      function dispatch(i) {
        let fn = middlewares[i];
        if (!fn) {
          return Promise.resolve();
        }
        return Promise.resolve(
          fn(ctx, function next() {
            // promise完成后，再执⾏下⼀个
            return dispatch(i + 1);
          })
        );
      }
    };
  }

  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }
}

module.exports = Kkoa;
