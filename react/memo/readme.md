# useMemo & useCallback

- react 性能优化 
  - includes 方法 所有字符串都包含""
  - count 改变也会让 filterList 重新执行
  - 应该避免

- useMemo 缓存计算结果
  - 组件中有计算属性的需求 vue给了api computed，react 直接做
    第一个参数是函数封装的过程 
  - 有些计算是比较昂贵的 
  - 依赖项改变时，才会重新计算  第二个参数是依赖项数组
    
## useCallback
- 子组件 他依赖的props没有发生改变时，子组件就不需要重新渲染
  - react 数据流管理思想 父组件负责持有和管理数据，子组件负责展示数据
  - memo
    - 高阶组件
    - 优化函数组件的性能 避免不必要的重新渲染 (通过props) 
    - 传递的函数每次都会重新生成，需要缓冲
  - useCallback
    - 缓存传递的子组件会调用的回调函数
    - 给依赖性