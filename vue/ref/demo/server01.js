// node 服务器端代码
// node 内置的http 模块
// require 模块化机制  node 早期的 commonjs 模块机制 旧的
// 大型项目中，分目录（mvc），分文件(类)，不可能只是一个文件
// js 前端早期是没有模块化的  esm 才有 2015年 任务简单
// import esm 
// no module -> node (全栈, commonjs) -> es6(esm 升级)
const http = require("http"); //commonjs 
const url = require("url"); // url

// 数据
const users = [
  {
    id: 1,
    name: '舒俊',
    email: '123@qq.com'
  },
  {
    id: 2,
    name: '陈俊璋',
    email: '1232@qq.com'
  },
   {
    id: 3,
    name: '徐行',
    email: '121@qq.com'
  },
]
// req 用户请求
// res 响应对象
// http 是基于请求响应的简单协议
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);

  if(parsedUrl.pathname === '/' ||
    parsedUrl.pathname === '/users'
){
    res.statusCode = 200;//响应码 状态头
    res.setHeader('Content-Type','text/html;charset=utf-8');
    const html = `
    <html>
    <body>
    <h1>Hello World</h1>
    </body>
    </html>
    `;
    res.end(html);
}
  
  res.end('hello');
})
// server 伺服状态
server.listen(1234, () => {
  console.log('Server is running on port 1234');
});