# vue3 流式输出demo

## 初始化项目
- npm init vite
  vite是最近最优秀的前端脚手架
  做项目前要先打个基础
  init 初始化
- 选择
  - Vue3 
  - javascirpt
- 生成项目模版
  src/ 开发目录 主要的代码会在这里 

- vue 的基础语法
  .vue后缀文件
  App.vue是根组件
  三明治 
  script
  template
  css

- 响应式数据
  变量 -> 数据 -> 响应式数据对象  ref
  聚焦于业务 ， 不用去写dom API 了
  js 早期的命令式编程 机械
  - 监听事件
  - 变量的值 +1 
  - 获得dom节点对象
  - 修改dom节点的内容 
  vue focus 于业务,ref 响应式的理念
  - 模板需要消费响应式数据 {{ count }}
  - vue let count = ref(0)
    count.value = 100;
  - 模版会自动更新
