# 响应式驱动界面的诞生
  - 前后端分离
  - ref 响应式数据,将数据包装成响应式对象
  - 界面由{{}} v-for 进行数据驱动template
  - 聚焦于业务，数据的变化

## 纯后端套模板
- mvc 开发模式 
  - model 数据模型
    mysql数据库抽象的
  - view 视图
    html {{todos}}

  - controller 控制器
    控制器 负责查询model 
    渲染view模板
    http伺服状态
      req.url 
      res.end 相应返回的内容
      - html 静态部分
      - 动态部分，由数据驱动

## 前后端分离 
- 独立的前端
  html/css/js
  ajax/fetch 主动的拉取数据
    http://127.0.0.1:5500/vue/ref/demo2/frontend/index.html
- 独立的后端
  没有返回html
  数据接口 api  
    http://localhost:3000/users
- 优势是开发人员解耦
  - 前端开发人员 只需要关注 用户体验 数据的展示
    大量dom编程 先找节点(不是业务)
    focus业务? 数据驱动的界面
  - 后端开发人员 只需要关注 数据的处理，并发性能

## 响应式数据驱动
  - 响应式数据**驱动**的界面(template)
    {{}}
    跟在后端套模板的业务中来
    不用做DOM API 麻烦，性能差
  - 前后端分离 

