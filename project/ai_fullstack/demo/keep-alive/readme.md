# 手写keep-alive组件

- 缓存组件 keep alive
  ? Map存储 es6 新增的数据结构
  json 区别？ key:value 
  - map的 key可以不为string 用object 作为key也行

- 手写组件KeepAlive
  - children keepalive
    Map
    所有的子组件都要显示
  - props?
    active display:block
## 流程
- cache 状态 缓存组件
- 传入 activeId 需要显示的组件
- 得到 children 所有子组件
- 设置缓存事件
  - 第一次进来 添加缓存
  - activeId更新 切换显示 从缓存中取出组件渲染
  - 依赖项为 activeId,children,cache
- 使用Object.entries变成键值对数组 遍历缓存组件
  - 每个缓存组件 都要判断是否是当前 activeId 匹配的组件
  - 修改 display 属性 匹配 block 不匹配 none 控制显示

