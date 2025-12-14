//node 服务器端代码
//node内置的http模块
//require 模块化机制 node早期的 commonjs 模块机制 旧的
//在大型项目中 ，分目录(mvc)，分文件(类)，不可能只是一个类
//js前端早期是没有模块化的 esm 2015才有 任务简单 
//import esm 
//no model -> node全栈(commonjs) -> es6(esm 升级版)
const http = require('http');//commonjs 
const url = require('url');//url 

//数据
const users = [{
    id:1,
    name:'张三',
    email:'123@qq.com'
},
{
    id:2,
    name:'李彰',
    email:'456@qq.com'
},
{
    id:3,
    name:'王芳',
    email:'789@qq.com'
}
]

 function generateUsersHTML(users){
    //模版字符串 由数据驱动
    const userRows = users.map(user => `
        <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        </tr>
        `).join('');//数组转字符串
        return `
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User List</title>
        <style>
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
        </style>
    </head>
    <body>
        <h1>Users</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                ${userRows}
            </tbody>
        </table>
    </body>
    </html>
        `
 }
//req 请求对象
//res 响应对象
//http 是基于请求响应的简单协议
const server = http.createServer((req,res)=>{
   const  parsedUrl = url.parse(req.url,true);
//    console.log(parsedUrl);
if(parsedUrl.pathname === '/' ||
    parsedUrl.pathname === '/users'
){
    res.statusCode = 200;//响应码 状态头
    res.setHeader('Content-Type','text/html;charset=utf-8');
    const html = generateUsersHTML(users);
    res.end(html);
}else {
    res.statusCode = 404;
    res.setHeader('Content-Type', "text/plain")
    res.end('Not Found');
  }
//    res.end('hello world');
});
//饲服状态
server.listen(1234 ,()=>{
    console.log('server is running at port 1234');
})




