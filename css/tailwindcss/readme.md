# 原子css 
- bad
  样式带有太多业务属性，在一个或少数类名，样式几乎不能复用
- 面向对象css
  - 封装 基类
  - 多态 业务
  - 组合起来
- 将我们的css规则样式拆分成原子css
  - 大量的基类 好复用
  - 组合起来
  - tailwindcss 是一个原子css框架
    几乎不用再写css
  - tailwindcss 原子css类名
    llm 自然语言处理 
    - 生成界面？
      prompt 描述布局、风格 和 更符合语义化的类名
      tailwindcss 更有利于生成 

## tailwindcss 配置
- 安装 tailwindcss 和 vite插件 
- vite.config.js 配置

## Fragment 
文档碎片节点 <>...</>
- 解决react 需要单一根节点问题
  树状节点，好遍历
- 不会渲染到dom上 杜绝了额外且不需要的div节点
react 中 Fragment 组件，唯一的根节点，性能优化
