# React Hooks

以use开头的函数 都是React Hooks
- react api 最新的语法
- 函数 react风格比较原生js



## react内置的
- useState
  - 初始化时传入一个纯函数
    如果我想在初始化时异步请求数据怎么办
  - setState 也可以传入一个函数，函数的参数是上一次的state
- useEffect
  - effect 副作用
  - 对立面是纯函数
    组件来说输入参数，输出jsx
    useEffect 异步请求数据 并修改状态
  - 请求数据 副作用
  - 第二个参数[]? 依赖项
  - 三种使用情况
    onMounted 组件挂载时执行 []只执行一次
    根据依赖项 [state,...]依赖更新
    return 函数 ，闭包， 在下一次执行effect前调用 或 组件卸载时调用
# 自定义的