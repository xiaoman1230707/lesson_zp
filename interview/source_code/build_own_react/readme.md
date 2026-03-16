# React
MVVM 现代前端框架 
组件化、响应式、JSX、虚拟DOM、Fiber机制...

- React 底层原理
  最好的方式是手写 Mini React 
  React 只不过是框架名字，Didact，统一的命名空间 

- 搭建源码开发项目
  - npm init -y 
  - pnpm i react-scripts 类似 vite
    修改 package.json
    "scripts": {
      "start": "react-scripts start"
    },
  - npm run start 就能启动项目 挂载 src下的index.js
  
- JSX
  JSX 是在javascript里直接写HTML标签的语法糖。
  底层为 虚拟DOM virtual DOM，是一个JS对象，描述了真实DOM的结构。包括 标签名、属性、子元素等。
  - 优势
  1. 直观且声明式 ，更符合人的思维习惯。
  .vue 三段式
  而JSX 里 函数、标签 和数据、逻辑在一起 
  通过JSX直接看到最终输出的DOM 结构
  ```
  <div>
    <h1>用户列表</h1>
    {user.map(user => <p key={user.id}>{user.name}</p>)}
  </div>
  ```
  UI = jsx(state/props)
  
  JSX不能直接运行，需要通过babel将JSX转换为 React.createElement 函数调用。
  当渲染时 递归调用 createElement 函数，构建出一个完整的虚拟DOM树。
  最后 调用 render 函数，将虚拟DOM渲染到真实DOM 上。

  虚拟DOM 在由V8引擎 运行在内存中，速度非常快

- 源码第一阶段 The CreateElement Function 
  - jsx 作为语法糖 由babel转译成 React.createElement 函数调用。
  - React.createElement 会接受到 type, props, ...children 三个参数。
  - createElement 会返回一个构成虚拟DOM的 element 
  - 递归 直到叶子节点 文本节点，为了统一处理(render) 也返回VDOM
  - 调用 React.createElement 得到了一个虚拟DOM对象 element
    {
      type:'TEXT_ELEMENT | NodeName | ComponentFunction',
      props:{
        ...props,
        children:[]
      }
    }
    开发者只需关注数据业务，dom的打理由react 帮我们做了 (重绘 重排)
  - render 负责将虚拟DOM 渲染到真实DOM 上

- 源码分析第二阶段 render
  - 接受 element , container
  - 创建节点 Node | TextNode
  - isProperty 过滤 children 属性 
  - 添加属性
  - 递归 挂载子元素
  - 挂载
  
## 第三个阶段

### 递归render 的性能问题
- Vdom 数比较巨大，像电商详情页的复杂组件树结构
- 递归 一旦开始 不能中断，直到 render完成为止。
- 而且 js是单线程的，那么这个同步代码 会阻塞页面其他操作，导致 页面卡顿。 一直占据着线程
  那么用户的交互 动画 滚动(更优先的任务) ，就会卡顿 掉帧 

### Fiber 工作机制
react 性能优化的机制 工作机制
VDOM 树 -> Fiber Tree -> render
- 在浏览器不忙时 (没有更优先任务时) 
  cpu的运行 是可被中断 可被调度

  fiber节点 是element render 的工作单元 word unit
  知道下一个work unit在哪里  链表指针指向它 
  当执行一段时间后，就去执行其他更优先任务，完了后 再回来执行下一个work unit 通过链表指针

## 消息队列 时间循环
### Event Loop
事件循环机制

1. 每个页面都有一个渲染进程 启动一个主线程 他负责的任务非常多 而且还是单线程
   v8 JS 引擎(同步异步代码执行 Promise 定时器 事件监听) 和 渲染引擎(进程内部)，都在这个渲染主线程里运行，负责多进程通信，资源由网络进程等 提供。由消息的方式 

2. 多少事要做
  - 处理dom 解析 html 生成dom树
  - 计算样式 合并css规则 与元素默认样式 确认每个dom节点 最终的可视化样式属性值，cssom树
  - dom tree 和 cssom tree 结合 生成渲染树 render tree 
  - 处理布局 盒模型 BFC (弹性 浮动 定位) layout tree dom 节点 在屏幕的精确位置 尺寸 等集合布局信息
  - 合并图层 像洋葱 页面更新时，每次只更新有变化的图层，而不是全部重绘重排。提升性能 .transform animation  来做动画 而不是js
  - 渲染引擎 绘制
  - js执行 
    <script src="" type="module">
      同步代码 尽快的运行结束 
      异步代码 耗时的 未来的 事件的 promise Async await setTimeout setInterval addEventListener ... 
    </script>
  - 消息机制 request idol callback  交替 处理 
  - Event Loop 
    第一个宏任务 script  
    同步代码全部执行 碰到异步代码就放在 Event Queue 进入 宏任务(setTiemout)或微任务(promise) 队列 排队 先进先出 等Event Loop 轮训
    一个轮训 执行完所有同步代码 再执行微任务 再执行宏任务 再进行渲染等 
    执行 微任务 时 一次清空队列中所有
    执行 宏任务 时 一次执行一个 
    优先级 同步代码 > 微任务 > 宏任务

## 程序运行模型 
- 主(单)线程 模型
  按照线程执行的 执行完后 线程会自动退出 进入 idol 状态 
  简单 高效 会被阻塞(异步来解决) 
- 在主线程处理过程中 可能会处理新的任务 来自其他地方 成为 新的任务 更优先 
  比如60帧幻灯片 我们要让他不卡，那么就要在小于 60分之一秒 内再次渲染 js主线程执行时间少于60分之一秒，不会霸占主进程超过60分之一秒，平滑
  IO 读写文件 点击事件 键盘事件 采用事件循环机制 
  单线程机制下 要去响应众多任务 设计出来的执行机制 
  ```
  //GetInput
//等待用户从键盘输入一个数字，并返回该输入的数字
int GetInput(){
    int input_number = 0;
    cout<<"请输入一个数:"; // 会让主线程一直阻塞在输入等待状态
    cin>>input_number;
    return input_number;
}

//主线程(Main Thread)
void MainThread(){
     for(;;){// 死循环
          int first_num = GetInput()； // 事件 不触发 就不执行 
          int second_num = GetInput()；
          result_num = first_num + second_num;
          print("最终计算的值为:%d",result_num)；
      }
}
  ```
  相对于 之前的单线程 有两个改变
  - 循环机制 ，一直检测
  - 引入了事件 
  Event + Loop = EventLoop 线程是活的 ，不会阻塞

  - 处理其他线程 发送过来的任务
    网络进程 只占据资源 启动网络线程 干活  
    浏览器主进程 通知渲染线程 等待网络进程服务(注册)，等到网络进程发送消息来时，就进入接受资源状态
    消息机制 + EventLoop = js执行机制

渲染主线程会频繁接收到来自于 IO 线程的一些任务，接收到这些任务之后，渲染进程就需要着手处理，比如接收到资源加载完成的消息后，渲染进程就要着手进行 DOM 解析了；接收到鼠标点击的消息后，渲染主线程就要开始执行相应的 JavaScript 脚本来处理该点击事件。

js同步代码执行完，没事干，进入轮训状态，到处溜
优先级别 队列搞定 
宏任务队列 一次执行一个  
微任务队列 resolve reject 等  一次全清空 