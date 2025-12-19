# AI 应用之冰球

## 前端应用 vue3 
- 活动形的应用
  冰球协会，上传宠物照片，生成冰球运动员的形象照片。
  有趣，分享到朋友圈
- vue 主要收集表单数据，上传图片
- ai能力 通过调用 coze 工作流的api实现

## 数据业务
- 显示上传文件的预览图
  - 好的用户体验,图片可能很大，上传需要时间 ,预览图可以让用户知道在干什么
  - 数据状态(值和改变)
    img :src"imgPreview" 
    ref = "imgPreview"
    filereader readAsDataURL onload 读完了 赋值给 imgPreview.value
    google 推出了base64编码 可以将图片立即转换为字符串