# Git

## git pull 和 git fetch 的区别
- 分支 branch 
  独立开发时 一个人 一个默认主分支 只是做了版本的管理 但是也应该做分支的管理
  master/main 主分支 线上在运行的代码，正确的 不能乱改 尊重
  dev 开发分支  开发新功能 
  当如果多人协作时 每个人都会有自己的分支  
  可能同一个文件多人开发 分支不会相互影响 就能避免冲突
  切换到相应的分支 合并内容 
  改bug 很紧急
  git checkout -b bugfix 创建并切换 从主分支创建
  git merge branch_name 合并到目标分支  合并后两个分支依然独立存在，名称也都在，除非删除分支。但是更改依然会保留
  feature 分支 
  最后还可以删除分支 不必管理那么多  
  git diff 查看差异 
  合并 推送 清理 远程清理

### git fetch
- 只拉取 ，安全又不影响当前分支，远程的main,拉取到本地的 origin/main下
- git diff main origin/main 查看差异
- git merge origin/main 
- 本地有自己的修改 不想合并

### git pull
- 拉取远程更新，并自动merge到当前分支 
