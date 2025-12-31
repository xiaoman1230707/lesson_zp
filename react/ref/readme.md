# useRef hooks函数

- useEffect []
  vue onMounted 生命周期
- 怎么找到input元素
  ref + useRef 可变对象的存储

- 和useState 比较
  - 相同点 都是储存可变对象的容器
  - useState 响应式状态 可变带来状态
  - useRef不是响应式的 可变对象的存储

用 useState 来管理那些你希望“看到变化”的状态；
用 useRef 来保存那些你希望“记住但不影响界面”的值或引用。

## useRef 应用场景
- dom节点的引用
- 可变对象的存储
- 创建的是可持久化的引用对象 