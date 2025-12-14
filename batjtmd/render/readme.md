## HTML/CSS/JS 是如何**渲染**页面的

- 浏览器渲染页面有那些流程
  - html/css/js 输入
  - 浏览器(chrome) 
    渲染由那些工作构成?
  - 页面 输出
    一张图
    1s 绘制60次 
- 渲染过程
  - 流程复杂
  - 性能开销
    性能优化
- HTML/CSS/JS 渲染流程
1.构建dom树
- 输入html字符串
  树 -》递归
  标记 节点
  每个标签都有自己的语义
  文本
  浏览器不太好直接处理，字符串
  树状结构
- 输出DOM树
  document.getElementById('app')
  内存中就有了document DOM根节点

- 如何正确使用html
  - 认真把html写好,语义化
  - seo
    搜索殷勤优化  Search Engine Optimization
    在百度输入查询
    百度派出蜘蛛去爬取各家网站
    针对html 进行算法分析
    查询内容和相关网页的相关性

- 结构语义化标签
  herder footer main aside
  section
- 功能语义化标签
  h1-h5
  code
  ul li

- main放在前面 aside放在后面?
  主内容先下载 在下载侧边栏
  flex order -1 

- 浏览器怎么理解css? 字符串文本适不适合的，也用树状结构\
  - cssom树 css Object Model树
    选择器{
        key：value;
    }
  - 找到相应的html节点 ，css节点和html节点进行匹配

- html/css/js -> DOM树构建(input:html字符串  output:dom) -> cssom树  页面
  