# react 闭包陷阱
- 闭包形成条件
  - 函数组件嵌套了定时器、事件处理函数等
  - useEffect useCallback 依赖项为空 就会产生闭包陷阱 。他的词法作用域链还是第一次的，里面的count指向的是第一次渲染时的count值。