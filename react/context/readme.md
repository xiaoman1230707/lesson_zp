# react 组件学习

## useContext-demo
- 跨层级通信 useContext
  - 用父子组件通信思维去尝试解决跨阶层通信的问题
  - 一路传，性价比不高，麻烦
  - 规矩不变 父组件(外层组件)负责持有和改变数据
  - 大于父子层级，传递的路径太长
- 数据在查找的上下文里，在最外层 提供给里面的任何层级组件 随便用
- 要消费的数据状态的组件拥有找数据的能力(传递是被动接受)


## theme-demo
- 主题切换 白天/夜间
- 主题 全局共享的数据状态
  createContext
  value theme setTheme
  useContext 
