# 星物种

- 公司 
  方向 机器人AI 
  A轮 大机构介入 有人投资 人才密度高 有价值的公司
  薪资 150-250 杭州的中等薪资 
  前端团队规模  (有没有人带) 开发流程

## 浏览器的渲染机制
讲对 是第一层 有亮点才能胜出
- 脑海中会有一张图 
- 首先，浏览器拿到url之后 会发起网络请求 开始下载html文件，
  html是流式解析的，也就是边下载边解析。html解析器会把标签逐步解析成DOM Tree。在解析过程中如果遇到Link，style 等css请求，浏览器会发起CSS请求，并交给css解析器生成CssOM树
- 接着，如果在解析html的过程中遇到js，默认情况下会阻塞DOM 构建(js 可能会操作DOM，修改节点，生成 优先级高) 。浏览器会暂停Dom解析，交给v8引擎执行js，执行完后再继续解析html
- 然后，当dom tree和cssom tree 都构建完成后 合并生成render tree (渲染树)
  渲染树只包含需要显示的节点，display：none 的节点不会进入渲染树。 有些操作也是，先下线节点，再操作，最后再上线节点。避免频繁重绘重排
- 接着进入layout(回流重绘) 阶段，浏览器会根据盒模型位置，位置，尺寸等信息，计算每个元素在页面(文档流)中的集合位置和大小，生成布局树，
- 然后是paint(绘制) 阶段，浏览器会根据布局树，把每个节点根据颜色、背景、阴影、边框等 绘制到屏幕上。
  绘制的顺序是从根节点开始，递归绘制每个子节点。 绘制的过程中，会考虑到元素的透明度，遮挡关系等因素。
- 最后进入 Composite(合成) 阶段，浏览器会把页面拆成多个图层，比如transform opacity position fixed、动画等元素可能单独成为合成层，然后交给GPU做图层合并，最终显示到屏幕上。

总结： html -> DOM tree + CSSOM tree -> render tree -> layout tree -> paint tree -> composite tree

- html 优化 
  - 语义化标签，有利于SEO，利于代码的维护，而不是通篇优化、
  - 合理使用Id/class，避免重复选择器，便于样式与脚本维护
  - 懒加载非首屏DOM/资源，降低渲染压力 IntersectionObserver 监听元素是否进入视口，进入后再加载资源  
  - 避免频繁操作DOM，可先缓存节点或用文档碎片批量跟新 document，createDocumentFragment() 等方法
- css优化
  - * 通配符 换成标签选择
  - 小图片（icon）转base64 减少 http请求，大资源任用外链避免css体积过大 
  - 抽离通用样式，减少代码冗余(面向对象)，
  - 合理使用css变量，统一主题样式，便于维护 
  - 避免使用 ！import  因为优先级高 难维护
  - tailwindcss 原子类，很少需要去手写样式
    - 原子类css，组合样式，无需写css
    - 原子类名语义化，减少命名成本
    - 团队风格统一，降低沟通成本
    - 按需翻译，体积可控，适配响应式
- script
  - 放底部 不要阻止dom树生成
  - <script src="" defer> 
    <script src="" async> 
    都不会阻塞DOM生成
    defer 会在DOM 下载完后去下载，等DOM解析完后，再执行js
    async 会在DOM 下载完后，异步下载js文件，下载完后立即执行js，完了后再继续解析html
  - 变量使用let/const 减少全局变量污染
  - 频繁DOM操作先缓存节点，批量更新
  - 函数拆分复用，避免冗长代码
  - 异步逻辑使用async/await 处理，避免 回调地狱
  
- 性能优化
  - 减少回流(重排)，重绘
    回流一定会触发重绘
    回流需要计算几何位置和尺寸，代价非常高
    - 触发方式
    修改 width/height/margin/padding
    修改fontSize
    DOM插入册除
    读取布局属性 el.offsetHeight 
    el.getBoundingClientRect() 得到元素相对视窗的关系


## GET 和 POST 的区别 以及一次HTTP请求包含哪些请求
- 语义不同 restful
- 核心区别
  从restful http语义上来说，get是获取数据，post是提交数据新增资源
- 数据传输方式上
  get的参数一般放在url QueryString里
    /api/user?id=123&name=张三 长度首先 2kb-8kb之间
  post数据一般放在 request body里，长度无限制
    get不是不可以发送请求体，只是服务器和浏览器约定不用
- 安全性
  get/post 都是明文传输 post相对安全一些，安全性是来自于https
- 幂等性
  https 是无状态的协议，每次请求都是独立的，不会记住之前的状态。
  get n次请求 结果是一样的，不会改变服务器状态
  post n次请求 结果是不一样的，会改变服务器状态
- 缓存
  get会缓存
  post 一般不缓存
- 包含的信息
  - 请求行 最开始发送 包含 请求方法，url，http版本，get/post/put/delete/patch/options/head等
  - 请求头 紧接着发送 包含 浏览器信息，接受类型，编码类型，cookie等Authorization: Bearer token，Content-Type
  - 请求体 最后发送 出现在post，put，patch 请求里，包含提交的数据
  
## 为什么TCP需要三次握手
- 确保双方 客户端和服务端都确认了 自己的发送和接收能力。
- 保证数据 能够完整的到达，有序，正确
  syn + ack 
  开始的接收方式在发送应答 ack 消息的同时，可以发送syn消息