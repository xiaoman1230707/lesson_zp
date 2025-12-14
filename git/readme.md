# git 分布式版本控制软件

- lesson_zp 本地项目文件夹,没有版本控制能力
  文件版本无法回退
  多人协作的 git就是月光宝盒
- 远程仓库
  gitee 码云
- git init
  本地代码仓库 可以存储文件的不同版本
  .git 隐藏目录 仓库
    git配置
    git config --global user.name "liuxiaoman"
    git config --global user.email "liuxiaoman1230707@163.com"

- git add.  添加所有的的修改
  经文件添加到暂存区
- git commit -m '第一次提交' 
  确认提交
- git remote add origin https://gitee.com/liuxiaoman/lesson_zp.git
  添加远程仓库
- git push -u origin "master"
  推送本地代码到远程仓库