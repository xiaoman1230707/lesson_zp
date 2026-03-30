import fs from 'fs'; // 用于读取index.html
import path from 'path'; // 用于处理路径
import express from 'express'; // 负责mvc server
import { createServer as createViteServer } from 'vite'; // 脚手架 ssr
// commonjs 超级变量 脚本执行的当前目录物理路径
// esm 不支持 __dirname 
// 参数为空 当前目录
const __dirname = path.resolve();
const app = express();

async function start(){
    console.log('server starting...');
    const vite = await createViteServer({
        // 中间件 vite有很多中间件 
        server: {middlewareMode:true},
        appType:'custom'
    });
    // 使用vite的中间件 请求和响应的中间 
    app.use(vite.middlewares);
    // 中间件 就是express/koa 这些极简框架，在基于请求响应（http）上，利用一堆的中间件函数 添加各种服务的开发模式
    // 鉴权 请求体解析 日志 等服务 ，一个中间件函数提供一个服务，需要就往里加 
    // 洋葱模型 
    // 中间件函数 ctx = req + res
    app.use(async(req,res)=>{
        // 启用一个中间件，手写ssr 
        // 将html + react component -》 html str 返回给用户
        console.log('---')
        try{
            // sync 同步 async 异步 node特点异步无阻塞 
            // 支持同步读取文件 像jsva 方便控制流程
            let template = fs.readFileSync(
                path.resolve(__dirname,'./index.html'),
                'utf-8'
            );
            // 让vite 接管html
            // 处理html模版 返回处理后的html字符串
            template = await vite.transformIndexHtml(req.url,template);
            console.log(template,'///');
            // ssrLoadModule 加载服务端入口文件，返回对象中的render函数
            const {render } = await vite.ssrLoadModule("./src/entry-server.jsx");
            // react在服务器端将组件和数据渲染为完整的html字符串
            const appHtml = await render();
            // 替换html模版中的占位符
            const html = template.replace('<!-- app-html -->',appHtml);
            res.status(200).set({"Content-Type":"text/html"}).end(html);
        }catch(err){
            res.status(500).end(err.message);
        }
    })
}

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})

start();