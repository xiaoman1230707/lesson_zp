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