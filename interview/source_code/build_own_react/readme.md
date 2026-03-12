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