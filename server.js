const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const opn = require('opn');

const app = new Koa();

// 配置静态资源
app.use(static(
    path.join(__dirname, './src')
))

opn('http://localhost:3000/');

app.listen(3000);