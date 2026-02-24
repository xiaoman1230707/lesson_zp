# learn git
- 同一个项目中不能有多个git仓库
  管理代码，所以不能有多个，不然容易乱
- git加入前
  - 只能叫开发目录
  - 可以升级为代码仓库 git init 
    会添加一个.git 隐藏目录
    默认创建master分支
  帮助我们管理文件的不同版本
  大型项目、多人协作 

- git status
  查看仓库状态 非常基础且重要的命令，在任何决定前建议都用这行命令来了解仓库
  尚未提交 不在仓库
  未跟踪的文件 不在暂存区之中
  - git add readme.txt 添加到暂存区(stage)
  - git commit -m 'wrote a readme file' 确认提交到仓库一定要根据功能，表达好
  - 提交到仓库的默认(master)分支 ，有一个唯一ID(sha算法，唯一的长串) 
    为什么不用自增ID呢
    因为项目是多人协作的，自增ID会导致冲突，所以用sha算法来生成唯一ID
    2 insertions(+) 2行新增
    加入仓库的是文件的修改，生成的是文件的新的版本

- git diff 查看代码和仓库的差异
  重大提交前务必先diff再提交 好习惯
- 6530521 (HEAD -> master) append GPL
  HEAD 指针 指向当前分支的最新提交
  可以移动指针去穿越
- 版本回退
  git reset --hard HEAD^
  HEAD 代表当前指针 ^ 代表回退一个版本
  ^2 回退两个版本
  还可以直接给版本号 回退到指定版本
  git reset --hard 6530521
- 将工作区的修改全部撤销
  git checkout -- readme.txt