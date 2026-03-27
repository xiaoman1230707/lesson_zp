const Koa = require('koa'); // commonjs
const websocket = require('koa-websocket');
// 给server app 添加websocket中间件 能力
// server 就可以实时的和用户端通信了
const app = websocket(new Koa());

const clients = new Set(); // 用户端连接集合
// 启动一个中间件
app.use(async (ctx)=>{
    // ctx = req + res
    // 响应内容是 先建立http建立 再转websocket 协议
    ctx.body = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>chat app</title>
    </head>
    <body>
       <div id="messages" style="height:300px;overflow-y:scroll;"></div>
        <input type="text" id="messageInput"/>
        <button onclick="sendMessage()">发送</button>
        <script>
        // html5 websocket 对象
        // ws:// websocket 协议 不是http://
            const ws = new WebSocket('ws://localhost:3000/ws');
            ws.onmessage = function(event){
                const message = document.getElementById('messages');
                message.innerHTML += '<div>' + event.data + '</div>';
            }
            function sendMessage(){
                const input = document.getElementById('messageInput');
                ws.send(input.value);
                input.value = '';
            }
        </script>
    </body>
    </html>
    `
})

// websocket 处理websocket 连接
app.ws.use(async (ctx)=>{
    // console.log('sss')
    clients.add(ctx.websocket);
    // 当服务器接收到消息时
    ctx.websocket.on('message',message=>{
        for(const client of clients){
            client.send(message.toString());
        }
    });
    ctx.websocket.on('close',()=>{
        clients.delete(ctx.websocket);
    });
})

app.listen(3000,()=>{
    console.log('server is running at port 3000');
});