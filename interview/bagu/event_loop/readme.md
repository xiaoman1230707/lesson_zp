
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
  ···
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
  ···
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

##  Event Loop

- 渲染进程的主线程 有太多工作要做  
  消息队列 + Event Loop (js执行机制) 
- 一次工作中
  - js代码执行起始于一个宏任务 script就是第一个宏任务
  - v8引擎 js 线程 只在 渲染进程中运行 同步代码快速执行完 调用栈 
    执行时间不能太长，可能会出现优先级高的任务排队 
  - 耗时性任务 异步的 不能阻塞主线程
  - 当可执行时，如Promise 被resolve时 或 监听到事件 ，就会被放到对应的队列中 等待js轮训 
  - 微任务队列 (promise mutation 等 时机，resolve之后进入) 先执行 清空队列 表示比较紧急 
  - 非队列 页面的渲染(有需要 重绘重排) 动画 掉帧(js线程长时间被霸占) 当被同步代码推移渲染时(比如for一亿次)，就会造成卡顿。 垃圾回收
  - 宏任务队列 (setTimeout setInterval 等) 执行一个  
    new promise 里面的代码是同步的，会立即执行，resolve 后才会去 将.then函数里的代码 放到微任务队列 等待执行

### 练习

- 同步代码
  console.log('同步代码 1');
  console.log('Promise 构造函数');
  console.log('Promise 构造函数内 resolve 后');
  console.log('async 函数同步部分');
  console.log('同步代码 2');
- 微任务
  console.log('Promise.then 1');
  console.log('await 后微任务');
  console.log('queueMicrotask 微任务');
  () => { 监听的元素改变时 此函数会被放到微任务队列 等待执行 
        console.log('MutationObserver 微任务');
    }
- 宏任务
  定时器上 
  定时器下

- 结果
  同步代码 1
  Promise 构造函数
  Promise 构造函数内 resolve 后
  async 函数同步部分
  同步代码 2
  Promise.then 1
  await 后微任务
  queueMicrotask 微任务
  MutationObserver 微任务
  setTimeout 1
  setTimeout 1 内部微任务   
  Promise.then 1 内部 setTimeout
