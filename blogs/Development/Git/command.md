---
sidebar: auto
title: Git 命令
date: 2023-10-18
tags:
 - command 
 - 命令
categories: 
 - Git
---

## Git 命令
  - `git --version`
    + 查看 Git 版本号
  - `which git`
    + 显示当前 Git 路径

### git help 
  - 功能：查看命令手册页帮助
    + `git help git` // 查看 git 手册页
  - 语法：`git help [option] [command]` 或 `git command --help`
  - 选项
    + `-a` 或 `--all`：列出所有可用的命令。
    + `-g` 或 `--guide`：列出有用的 Git 指南。
  
### git init 
  - 功能：创建一个空的 Git 仓库
    + 还可重新初始化一个已存在的 Git 仓库。
  - 语法：`git init {project-name]`
  - 案例：
    ```shell
      > git init # 在当前目录新建一个 Git 仓库
      > git init [project-name] # 新建一个 project-name 目录，将其初始化为 Git 代码库
    ```

### git clone 
  - 功能：克隆仓库到一个新目录
    + 除支持 http、https 协议外，还对 ssh、git、本地文件协议等多种协议。
    ```shell
      > git clone http[s]:// http://example.com/...
      > git clone ssh://...
      > git clone git://...
      > git clone /opt/git/project.git
      > git clone file:///opt/git/...
      > git clone ftp[s]://http://example.com/...
      > git clone rsync://http://example.com/...    
    ```
  - 语法：`git clone [option] <remoteUrl>`
  - 选项
    - `-o`: 指定远程主机名称（Git 自动默认命名为 `origin`）
    - `-b`：指定远程分支名称
  - 案例：
    ```shell
      > git clone -o jQuery https://github.com/jquery/jquery.git
      > git clone -b [branch] [remote-url] # 下载指定远程仓库的分支
      > git clone [url] [directory] # 下载到指定目录
    ```
### git config
  - 功能：获取和设置仓库的配置信息
    +  Git 仓库的局部配置优先于全局配置
    + `--system` 选项：表示操作系统配置文件, 供所有用户的所有仓库使用，位置 `${git_home}/etc/gitconfig`
    + `--global` 选项：表示操作用户配置文件, 供某一用户的所有仓库使用，位置 `C:/users/${user_home}/.gitconfig`
    + `--local` 选项：表示操作仓库配置文件, 供某一用户的某一仓库使用，位置 `${自己的git仓库}/.git/config`
  - 语法：git config [option]
  - 选项：
    + `-e`：编辑 Git 的配置文件
    + `--list`：查看 Git 的所有配置信息
    + `--add `: 新增指定的 Git 配置信息
    + `--unset <key>`: 删除指定的 Git 配置信息（只针对存在唯一值的情况）
    + `<key>`: 查看 Git 的某项配置信息
  - 案例：
    ```shell
      > git config --list # 列出 当前配置
      > git config --local --list # 列出 Repository 仓库配置
      > git config --global --list # 列出 全局配置
      > git config --system --list # 列出 系统配置
      > git config -e --global  # 编辑 Git 全局配置文件

      > git config --global user.name "yourName" # 配置全局 Git 仓库的用户名：
      > git config --global user.email "yourEmail" # 配置全局 Git 仓库的邮箱

      > git config user.name "yourName" # 配置单个局部 Git 仓库的用户名：
      > git config user.email "yourEmail" # 配置单个局部 Git 仓库的邮箱

      > git config user.name # 查看 user.name 的配置信息
      > git config user.email # 查看 user.email 的配置信息

      > git config --global --unset user.name # 删除全局 Git 仓库的用户名：
      > git config --global --unset user.email # 删除全局 Git 仓库的邮箱
      
      > git config --global color.ui true # 显示颜色
      > git config --global core.autocrlf false # 关闭 CRLF 换行
    ```

### git branch
  - 功能： 列出、创建或删除分支
  - 语法：`git branch [option]`
  - 选项：
    + `-r`或`--remote`：列出所有远程分支
    + `-a`或`--all`：列出所有（本地 + 远程）分支
    + `-d`或`--delete`: 删除分支
    + `-D`：强制删除分支 （`--delete --force` 的快捷键）
    + `-f`或 `--force` ：强制
    + `-m`或 `--move`：移动或重命名分支
    + `-M`：强制移动或强制重命名分支 （`--move --force` 的快捷键）
    + `-v`：列出所有本地分支最后一次的提交信息
  - 案例：
    ```shelL
      > git branch # 列出所有本地分支
      > git branch [branch] [commit] # 从指定 commit 检出新分支，但依然停留在当前分支
      
      > git branch [new-branch] # 从当前分支检出新分支，但依然停留在当前分支
      > git checkout -b [new-branch] # 从当前分支检出新分支，并切换到新分支
      
      > git branch --track [branch] [remote-branch] # 新建一个分支与指定的远程分支建立追踪关系
      > git branch --set-upstream [branch] [remote-branch] # 当前分支与指定的远程分支之间建立追踪关系
      > git checkout -b [branch] origin/[branch] # 从远程分支检出新分支，并切换到新分支。新分支会与远程分支绑定。

      > git checkout -b [branch] [tag] # 从某个 tag 检出新分支
      > git checkout [branch] # 切换到指定分支，并更新工作区

      > git branch -m [old-branch] [new-branch]  # 重命名分支名

      > git branch -d [branch] # 删除本地分支（先切换到其他分支）
      > git branch -D [branch] # 删除未绑定远程分支的本地分支
      > git branch -dr [remote/branch] # 删除远程分支
      > git push origin --delete [branch] # 删除远程分支
    ```

### git checkout
  - 功能：切换分支或恢复工作区文件（即：丢弃工作区中未暂存的修改）
    + 切换分支（并将 HEAD 指向该分支）功能与 `git.switch` （v2.23+）相同
  - 语法：`git checkout [option] <branchName>`
  - 选项：
    + `-b`：切换到创建的新分支上
  - 案例：
    ```shell  
      > git checkout [branch_name] # 切换到已存在的分支上
      > git switch [branch_name] # 切换到已存在的分支上
      
      > git checkout -b [branch_name] # 切换到新建的分支上
      > git checkout -b [branch_name] origin/[branch_name] # 在本地创建和远程分支对应的分支
      > git checkout -b [branch_name] [tag] # 从某个 tag 检出新分支

      > git checkout [file] # 恢复暂存区的指定文件到工作区
      > git checkout [commit] [file] # 恢复某个 commit 的指定文件到暂存区和工作区
      > git checkout . # 恢复暂存区的所有文件到工作区
    ```
### git switch
  - 案例：切换分支
  - 语法：`git switch [option]`
  - 选项：
    + `-c`：切换到创建的新分支上
  - 案例：
    ```shell
      > git switch [branch_name] # 切换分支
      > git switch -c [branch_name] # 创建并切换到该分支

    ```
  
### git cherry-pick
  - 功能：应用一些现存提交引入的修改
    + 用于将指定的 commit 应用到当前分支，允许选择性地将某个提交应用到当前分支，而非进行整个分支的合并。
   
  - 语法：`git cherry-pick [option] <commitID>`
  - 选项：
    + `--abort`：发生代码冲突后，撤销合并操作
    + `--quit`：发生代码冲突后，退出合并操作
    + `--continue`：发生代码冲突后，会停下等您处理完冲突，继续自动执行 Cherry pick 合并操作（类似：回调函数）。
  - 案例：
    ```shell
      > git cherry-pick [commitID] # 将指定提交的更改应用到当前分支
      git cherry-pick commit-hash //提交这次本地更改

      > git cherry-pick <commit_A> <commit_B> // 将 A 和 B 提交应用到当前分支。在当前分支将生成两个对应的新提交
      > git cherry-pick -n <commit_A> <commit_B> // 将 A 和 B 提交合入到当前分支（不提交），后续需要手动 commit

      # 转移一系列的连续提交。书写顺序 A 必须早于 B，否则命令将失败，但不会报错
      > git cherry-pick <commit_A>..<commit_B> //从 (A, B] 区间的所有提交（每个提交都会在当前分支上创建一个 commit）,
      > git cherry-pick <commit_A>^..<commit_B> //从 [A, B] 区间的所有提交（每个提交都会在当前分支上创建一个 commit）

      > git cherry-pick --abort # 撤销当前 cherry-pick 操作
      > git cherry-pick --quit # 清理当前操作状态，不撤销修改强制退出 cherry-pick 操作过程
      > git cherry-pick --continue # 手动处理完冲突后，最后继续执行此操作来完成合并的提交工作
    ```

### git status 
  - 功能：显示工作区状态（即：具体有改动的文件）。
    + `git diff`：查看未暂存的文件和上次提交的区别，
    + `git diff --cached`：查看已经暂存的文件和上次提交的文件的区别
  - 语法：`git status [option]`
  - 选项：
    + `-s`：以简短的结果显示
  - 案例：
    ```shell
      > git status # 显示有变更的文件
      > git status -s # 简洁显示文件
    ```

### git diff
  - 功能：显示提交之间、提交和工作区之间等的差异
    + 显示某次提交的内容变化 `git show [commit]`
    + 显示某次提交变化的文件 `git show --name-only [commit]`
  - 语法：`git dif [option]`
  - 选项：
    + `–cached`：查看已缓存的差异    
    + `–stat`：查看差异摘要
  - 案例：
    ``shell
      > git diff # 显示 工作区和暂存区 的差异
      > git diff HEAD # 显示 工作区与当前分支最新版本库 之间的差异
      > git diff --cached [file] # 显示 暂存区和最新版本库 的差异
      > git diff [first-branch]...[second-branch] # 显示两次提交之间的差异
      > git diff --shortstat "@{0 day ago}" # 显示今天写了多少行代码
        git diff –stat 显示摘要而非整个 diff
    ```

### git show
  - 功能： 显示各种类型的对象
  - 语法：`git show [option]`
  - 选项：
  - 案例：
    ```shell
      > git show [commitID] [filename] # 查看指定提交的文件内容
      > git show HEAD@{5} # 查看索引为 5 的操作记录的详细信息
      > git show HEAD # 查看最近一次提交的修改内容
      > git show --name-only HEAD #查看最近一次提交的文件列表（不显示具体的修改内容）
    ```

### git add 
  - 功能：将工作区文件添加到暂存区
  - 语法：`git add [option]`
  - 选项：
    + `-f`或 `--force` ：强制
  - 案例：
    ```shell
      > git add . # 添加当前目录的所有文件到暂存区
      > git add [file-1] [dir-1] ... [file-N] [dir-N]  # 添加指定文件/目录到暂存区
      > git add *.html # 添加某一类型的文件
      > git add -f [file] # 强制添加
    ```
### git restore 
  - 功能：恢复工作区文件
  - 语法：`git restore [option]`
  - 选项：
  - 案例：
    ```shell
      > git restore [file] # 撤销工作区的修改

      # 撤销暂存区的修改
      > git restore --staged <file>   # 将暂存区的修改撤销到工作区
    ```

### git rm
  - 功能：从工作区和索引中删除文件
  - 语法：`git rm [option]`
  - 选项：
    + `-f`或 `--force`：强制删除，记录此操作放入暂存区
    + `-cached`：只删除缓存区，工作区不变
  - 案例：
    ```shell
      > git rm *.html # 删除某一类型的文件
      > git rm -f [file] # 强制删除工作区文件
      > git rm [file_1] ... [file_N] # 删除工作区文件，并且将这次删除放入暂存区
      > git rm --cached [file_1] ... [file_N] # 停止追踪指定文件，但该文件会保留在工作区
      > 
    ```

### git mv
  - 功能：移动或重命名一个文件、目录或符号链接
  - 语法：`git mv`
  - 案例：
    ```shell
      > git mv [file-name] [file-renamed] # 重命名文件，并将此重命名放入暂存区
    ```

### git reset
  - 功能：重置当前 HEAD 到指定状态
  - 语法：`git reset [option]`
  - 选项：
    + `--soft`：将 HEAD 指向指定的提交，保持暂存区和工作区不变。
    + `--mixed`：将 HEAD 指向指定的提交，暂存区内容随之改变，工作区内容不变（默认选项）
    + `--hard`：重置当前 HEAD（与版本库保持一致），同时重置暂存区和工作区
    + `--keep`：重置当前 HEAD（与版本库保持一致），保持暂存区和工作区不变
  - 案例：
    ```shell
      > git reset [file] # 重置暂存区的指定文件，与上一次 commit 保持一致，但工作区不变
      > git reset [commitID] # 重置当前分支为指定 commitID，同时重置暂存区，但工作区不变
      > git reset --hard  # 重置暂存区与工作区，与上一次 commit 保持一致。等级于 git reset --hard HEAD
      > git reset --hard HEAD^  # 回退上一个版本  有几个^就代表回退上几个版本
      > git reset --hard [commitID] # 重置当前 HEAD 为指定 commit，同时重置暂存区和工作区，与指定 commit 一致，
      > git reset --keep [commitID] # 重置当前 HEAD 为指定 commit，但保持暂存区和工作区不变
      > git reset --merge [commitID] # 在被污染的工作区中回滚 merge 或者 pull

      > git fetch --all && git reset --hard origin/master && git pull # 放弃修改，强制覆盖本地代码
    ```

### git stash
  - 功能：贮藏脏工作区中的修改 / 暂存
  - 语法：`git stash`
  - 案例：
    ```shell
      > git stash # 暂存
      > git stash list # 查看暂存记录
      > git ls-files # 查看暂存区文件

      > git stash pop stash@{index} # 恢复暂存并删除这个记录
      > git stash apply stash@{index} # 恢复暂存并保留这个记录
      > git stash drop stash@{index} # 删除某个暂存记录
      > git stash clear # 删除全部暂存记录
    ```

### git commit
  - 功能：记录变更到仓库
  - 语法：` git commit [option]`
  - 选项：
    + `-a`：将工作区和暂存区中的所有修改提交
    + `-c`：获取指定 commitID 的信息来作为当前提交修改的信息
    + `-m`：提交信息描述
    + `-v`：显示所有的 diff 信息
    + `--amend`：覆盖补充提交
  - 案例：
    ```shell
      > git commit -m [message] # 提交暂存区到仓库区
      > git commit [file-1] [file-2] ... -m [message] # 提交暂存区的指定文件到仓库区
      > git commit -a # 提交工作区自上次 commit 之后的变化，直接到仓库区
      > git commit -v # 提交时显示所有diff信息
      > git commit -c [commitID]

      # 如果代码没有任何新变化，则改写上一次的提交信息
      > git commit --amend -m [message] # 使用本次提交替代上一次提交

      > git commit --amend [file-1] ... [file-N] # 重做上一次提交，并包括指定文件的新变化
    ``` 

### git revert
  - 功能：回退一些现存提交
    + `git revert` **撤销提交**：会创建一个新的提交，以撤销指定提交的更改（用一次新提交来回滚之前的提交，HEAD 会继续前进）
    + `git reset` **回退版本**：会移动 HEAD 指针丢弃部分或全部的提交（把 HEAD 向后移动来删除提交）。
  - 语法：`git revert`
  - 案例：
    ```shell
      # 后者的所有变化都将被前者抵消，并且应用到当前分支
      > git revert [commitID] # 新建一个 commit，用来撤销指定commit

      > git revert -n HEAD~1 # 回滚掉 HEAD~1 处的提交，不自动提交到本地仓库
    ```

### git frtch
  - 功能：从另外一个仓库下载对象和引用
    + fetch 只会拉取数据到本地，但不会自动合并到当前工作分支
    + pull 会自动抓取数据下来，并将远端分支自动合并到当前工作分支。相当于 `fetch + merge`
  - 语法：`git frtch [option]`
  - 选项： 
    + `--all`：所有仓库
  - 案例：
    ```shell
      > git fetch [remote] # 下载远程仓库的所有变动
      > git fetch [remote] [branch] # 获取远程仓库当前分支的最新更改
      > git fetch --all # 同步所有的远端仓库

      > git fetch origin --tags # 从远程仓库拉取所有 tag 到本地（工作区文件不会更新）
      > git fetch --prune # 删除本地仓库上与远程仓库为关联的分支

    ```
### git merge
  - 功能：合并两个或更多开发历史
  - 语法：`git merge [option]`
  - 选项：
    + `--no-ff`：普通模式合并
      * 禁用 `fast forward`，合并后的历史有分支，能看出来曾经做过合并，
      * 而 `fast forward` 合并就看不出来曾经做过合并
    + `--no-commit`：不自动提交
  - 案例：
    ```shell
      > git merge [branch] # 合并指定分支到当前分支
      > git merge --no-commit [branch] # 合并指定分支到当前分支（不自动提交）
      > git merge --no-ff -m "message" [branch] # 合并指定分支到当前分支，并需要提交本次合并信息
      
      > git cherry-pick [commitID] # 指定 commitID 合并进当前分支
    ```

### git pull
  - 功能：获取并整合另外的仓库或一个本地分支
    + 通常避免 `git pull` 会产生一次新的合并提交（提交历史分叉），推荐使用 `git rebase`
  - 语法：`git pull [option]`
  - 选项：
    + `-p`：清除本地中远程分支未追踪的缓存
    + `-r`：rebase 合并
  - 案例：
    ```shell
      > git pull # 将远程分支自动同步到本地

      > git pull [remote] [branch] # 拉取远程仓库的变化，并与本地分支合并 
      > git fetch && git merge [branch] # 先拉取远程仓库的变化，在合并指定分支到当前分支

      > git pull [remote] [remote_branch]:[local_branch]

      > git pull -r [remote] [branch] # 先执行 fetch，然后将远程分支 rebase 合并到本地分支
    ```

### git rebase
  - 功能：在另一个分支上重新应用提交
  - 语法：`git rebase [option]`
  - 选项：
    + `--abort`：终止，撤销
    + `--skip`：强制
    + `--continue`：继续执行
  - 案例：
    ```shell
      > git rebase [branch_name] # 将指定分支合并到当前分支
      > git rebase --continue # 手动处理完冲突后，使用 git add 该文件，最后继续执行
    ```
    
### git push
  - 功能：更新远程引用和相关的对象
  - 语法：`git push [option]`
  - 选项：
    - `-u`: 自动创建远程库分支并关联
  - 案例：
    ```shell
      > git push [remote] [branch] # 推送指定分支到远程仓库（远程库若无此分支则创建，但不关联）
      > git push -u [remote] [branch] # 推送指定分支到远程仓库（远程库若无此分支则创建，并自动关联）
      > git push --set-upstream origin [remote-branch] # 推送指定分支到远程仓库（远程库若无此分支则创建，并自动关联）
      > git push [remote] -f # 强制推送当前分支到远程仓库（本地内容会覆盖线上内容）

      > git push [remote] --all # 推送所有分支到远程仓库
      > git push origin --delete [branch-name] # 删除指定的远程分支
      > git branch -dr [remote/branch] # 删除指定的远程分支

      # 一个本地库可关联多个远程库，推送时需要加上不同的远程库名和分支名
      > git push github master # 推送到 github
      > git push gitee master # 推送到 gitee

      > git push [remote] [tag] # 提交指定 tag 标签
      > git push [remote] --tags # 提交所有 tag 标签
      > git push origin :refs/tags/[tagName] # 删除远程 tag 标签
      > git push origin -d [tagName] # 删除远程 tag 标签

    ```

### git remote
  - 功能：管理已跟踪仓库
  - 语法：`git remote [option]`
  - 选项：
    + `-v`或 `--verbose`：列出详细信息
  - 案例：
    ```shell
      > git remote add origin [remote address] # 将现有仓库与远程仓库建立联系
      > git remote set-url origin [remote address] # 修改.git/config 文件中添加 remote origin 指向的远程仓库 URL
      > git remote rm origin # 删除.git/config 文件中 remote origin 相关的信息
      > git remote remove origin # 取消关联远程仓库

      > git remote # 查看远程仓库名称 常为 `origin`
      > git remote show [remote] # 显示指定远程仓库的信息
      > git remote -v # 显示所有远程仓库（Git 是分布式的，故可能对应多个远程仓库）
      > git remote -ls # 查看远程仓库的 URL 和分支信息      
      > git remote rename [old-remote] [new-remote] # 重命名远程仓库名称

      > git remote prune origin // 清除远程仓库不存在的分支，对应的远程分支 cache
    ```

### git 
  - 功能：基于指定的目录树建立归档（创建文件存档）。
    + 类似 `svn export`，用来从代码库中导出一份干净的代码（没有`.svn` 文件）
  - 语法：`git archive [option​] <commit> [--] [path​]`
  - 参数：
    + `<commit>`：提交的唯一标识。
    + `[--] <path>`：限制路径
      * 如果没有可选的路径参数，当前工作目录的所有文件和子目录都包含在存档中。
      * `--`表明随后的参数是路径（用于文件名与选项有歧义）。
  - option 选项：
    + `-l`或`--list`：列举所有可用的压缩格式。
    + `--format=<格式>`：指定压缩格式
      * 此选项若未指定，但指定了输出文件，则可能从文件名推断格式。
    + `-o <file>` 或 `--output=<file>`：指定输出的压缩包的文件名。
    + `--prefix=<name>/`：添加目录前缀
      * 例：`--prefix=V1.0/` 选项会将文档压缩在 V1.0 文件夹下。
    + `--add-file=<file>`：添加未跟踪文件，将未跟踪的文件添加到存档中。可以重复添加多个文件。
  - 案例：
    ```shell
      > git archive --list # 查看支持的归档格式（tar、tgz、tar.gz、zip）

      > git archive -o [filename] [commitID]
      > git archive -o ../latest.zip HEAD # 导出最新的版本库
      > git archive -o ../git-1.4.0-docs.zip  HEAD:Documentation/  # 导出一个目录
      > git archive -o ../git-1.4.0.tar 8996b47 # 导出指定提交记录
      > git archive  8996b47 | gzip > ../git-1.4.0.tar.gz # 导出为 tar.gz 格式
      > git archive -o ../updated.zip HEAD $(git diff --name-only HEAD^) # 导出最后一次提交修改过的文件 

      # 下载代码仓库中指定子目录/文件
      > git archive --remote=ssh://host/pathto/repo.git HEAD README.md # 导出 README.md 这个文件
      > git archive --remote=ssh://remote_server/remote_repository master subrepository  | tar -x
      > git archive --format=tar --remote=ssh://remote_server/remote_repository master | tar -xf -

      # 打包建议在代码库的根目录下进行
      > git archive --output "./output.tar.gz" master # 若在 master 分支的 mydir 目录下执行, 则只会将 mydir 目录下的内容打包
    ```

### git tag
  - 功能：创建、列出、删除或校验一个 GPG 签名的标签对象
  - 语法：`git tag`
  - 案例：
  ```shell
    > git tag [tagName] # 创建一个 tagName 在当前 commit
    > git tag [tagName] [commit] # 新建一个 tagName 在指定 commit
    > git tag -d [tagName] # 删除本地 tagName

    > git show [tagName] # 查看 tagName 信息

    > git push origin :refs/tags/[tagName] # 删除远程 tagName
    > git push [remote] [tagName] # 提交指定 tagName
    > git push [remote] --tags # 提交所有 tag
  ```
 
### git log
  - 功能：显示提交日志
  - 语法：`git log [<options>] [<since>..<until>] [[--] <path>...]`
  - 选项：
    + `-p` 或 `--patch`；按补丁格式显示每个提交引入的差异。
    + `–stat`；显示每次提交的文件修改统计信息。
    + `–shortstat`；只显示 `--stat` 中最后的行数修改添加移除统计。
    + `–name-only`；仅在提交信息后显示已修改的文件清单。
    + `–name-status`；显示新增、修改、删除的文件清单。
    + `–abbrev-commit`；仅显示 SHA-1 校验和所有 40 个字符中的前几个字符。
    + `–relative-date`；使用较短的相对时间而不是完整格式显示日期。
    + `–graph`；在日志旁以 ASCII 图形显示分支与合并历史。
    + `–pretty`：使用其他格式显示历史提交信息。可选值
      * oneline
      * short
      * full
      * fuller
      * format
    + `–oneline`；`--pretty=oneline` 和 `--abbrev-commit` 的简写。
  - `-–pretty=format` 的常用选项
    | 选项 | 说明 |
    |:--|:--|
    | `%H`  | 提交的完整哈希值 | 
    | `%h`  | 提交的简写哈希值 | 
    | `%T`  | 树的完整哈希值 | 
    | `%t`  | 树的简写哈希值 | 
    | `%P`  | 父提交的完整哈希值 | 
    | `%p`  | 父提交的简写哈希值 | 
    | `%an` | 作者名字 | 
    | `%ae` | 作者的电子邮件地址 | 
    | `%ad` | 作者修订日期 ( `--date=` 选项来定制格式) | 
    | `%ar` | 作者修订日期，按多久以前的方式显示 | 
    | `%cn` | 提交者的名字 | 
    | `%ce` | 提交者的电子邮件地址 | 
    | `%cd` | 提交日期 | 
    | `%cr` | 提交日期 (距今多长时间) | 
    | `%s`  | 提交说明 | 
  - 输出的选项
    + `-n`：显示最近的 n 条提交。
    + `–since` 或 `–after`：显示指定**时间之后**的提交。
    + `–until` 或 `–before`：显示指定**时间之前**的提交。
    + `–author`：显示**作者**匹配指定字符串的提交。
    + `–committer`：显示**提交者**匹配指定字符串的提交。
    + `–grep`：显示**提交说明中**匹配指定字符串的提交。
    + `-S <keyword>`：显示**添加或删除内容**匹配指定字符串的提交。
  - 案例
    ```shell
      > git log  # 显示当前分支的版本历史
      > git log [filepath] # 查看指定文件的提交历史
      > git log [commitID] # 查询包含 commitID 之前的记录
      > git log [commitID_1] [commitID_2]：# 查询包含 commitID_1 和包含 commitID_2 之间的记录
      > git log [commitID_1]..[commitID_2]: # 查询包含 commitID_1 和不包含 commitID_2 之间的记录
      > git log -5 --oneline # 美化日志打印信息，限制日志条数
      > git log remotes/origin/master -3 --oneline # 查看远程分支的提交日志
      > git log --author=xiaoming # 指定用户查询日志
      > git log --merges # 查看所有合并的提交
      > git log --graph --oneline # 查看分支的合并图
      > git log --after="2023-01-01" --oneline # 查询某个日期之后的提交记录
      > git log --before="2023-01-01" --oneline # 查询某个日期之前的提交记录
      > git shortlog -sn --after="2023-01-01" # 显示所有提交过的用户，按提交次数排序
      > git log -1 # 查看最后一次提交
      > git log -p -2 # 显示最近的 2 次提交所引入的差异 diff
      > git log --stat # 查看提交的简略统计信息，文件的改动
      > git log --since=1.day # 相对日期 2 years、1 day、3 minutes ago。
      > git log --pretty=format:"%h - %an，%ar : %s" # 由近到远的自定义展示提交记录

      # 显示指定文件的版本历史，包括文件改名
      > git log --follow [file] 
      > git whatchanged [file]
      
      > git reflog # 查看历史命令（方便查看版本号）
    ```

## 参考资料
  - [Git 官方文档](https://git-scm.com/docs)
  - [W3cSchool Git 文档](https://www.w3cschool.cn/git/dict.html)
  - [易百教程 Git 教程](https://www.yiibai.com/git)
  - [git help](https://zhuanlan.zhihu.com/p/619764913)
  