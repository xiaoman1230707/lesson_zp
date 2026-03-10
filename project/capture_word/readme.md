# 拍照记单词

## AI时代
- vibe coding
  代码和项目开发变得快速且靠谱
- opc
  one person company
  活儿都由Agent完成 人只需要提供创意、规划、商业、共情
  会vibe coding的 AI产品经理 

## 单词类学习app
- 市场调研
  需求 竞品
- 百词斩
  学习类 细分领域 背单词 
  把单词和形象的图片结合 
  awkward 尴尬的
  giraffe 长颈鹿
- 扇贝
  智能间隔重复算法
  精确规划复习时间，确保单词在即将遗忘时被强化，长期记忆

## 大模型
- 互联网所有的产品值得用AI重新做一遍。
  - AIGC
  - Agent
- 拍照记单词
  - 多邻国
  - 产品点？
  - 需求 
    跨国生活中的场景，旅游、点餐
  - 改进痛点 更加生活化
    足够痛 强需求 

## 产品原型
最核心功能的表达 是怎么交互的 有哪些页面 
- 上传/拍照图片 
- 调用Kimi接口 解析图片 得到单词和例句
- 点击播放按钮 就能听到发音

### 大模型
  多模态模型 kimi-shot
  moonshot-v1-8k-vision-preview
- tts 文本转语音 text to speech

### 技术栈
- 前端 vue3+ts
- 后端 nestjs


### 产品亮点
- 无障碍访问
  label for + input #id
  帮助使用读屏器的盲人使用
  input[type="file"] 比较难控制样式
  display:none, for id 样式控制
- Prompt 设计
  AIGC 产品里Prompt 设计核心
  - 清晰地指令
    一个单词 A1~A2 级别
  - outputParser 输出格式JSON，有利于业务的持续执行
  - 产品的设计 对齐 大模型的输出格式
  - 多模态模型的接口标准
    content 数组 图片 base64格式 字符编码(HTML5)

- 文件上传体验
  - type="file" input + accept 
  - 上传慢慢长夜 即时显示图片
    - FileReader 
      html5带来 js 运行在浏览器 可以跳到操作系统 在没上传时就可以读取图片文件 、调用摄像头
      浏览器原生的 FileReader 实例。这是 HTML5 提供的 API，专门用于在客户端异步读取用户计算机上的文件内容。
    - readDataAsURL(file)
    - onload base64 图片