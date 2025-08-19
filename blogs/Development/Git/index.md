---
sidebar: auto
title: Git 分布式版本控制系统
date: 2023-10-18
tags:
 - Git
 - 分布式版本控制系统
categories: 
 - development
 - 开发者
---

## 前言
  - Git 是一个免费和开源 的分布式版本控制系统。
    + 旨在以速度和效率处理从小型到大型项目的所有内容。
  - Git 中用 `HEAD` 表示当前版本。 `HEAD^`表示上一个版本。 `HEAD^^`或`HEAD~2`表示倒数第二个版本。
  - 每次修改提交之后就会有一个 commit 的 id。
    + id 是 SHA1 算法得到的一串数字，具有唯一性。
  - 生成（创建登录密钥）公钥的方法：
    + 使用 `ssh-keygen -t rsa` 建立 id_rsa 私钥和 id_rsa.pub 公钥
    + 将 id_rsa.pub 发送给服务器管理者，将其加入到授权列表中。
    +  `ssh-keygen -t rsa -C "ming.xing@xxx.com.cn"`
  - Git 只关心文件数据的整体是否发生变化，而大多数其他系统则只关心文件内容的具体差异。

### git 特性
  1. 直接记录快照，而非差异比较 
  2. 近乎所有操作都是本地执行
  3. Git保证完整性
    + Git 中所有数据（文件的内容或目录结构）在存储前都计算"校验和"（SHA-1 散列，40 个十六进制字符），然后以"校验和"来引用。
    + 在 Git 中任何更改任何文件内容或目录内容都会被知晓并记录（功能建构在 Git 底层），
    + Git 数据库中保存的信息，都是以“文件内容的哈希值”来索引，而非文件名
  4. Git一般只添加数据
    + 执行的 Git 操作，几乎只往 Git 数据库中增加数据。
    + 一旦提交快照到 Git 中，就难以再丢失数据。

### 集中式版本控制系统
  - CVCS（Centralized Version Control Systems）集中化的版本控制系统 
    + 此类系统种，将远程仓库集中管理在一个单一的"中央服务器"中，保存所有文件的修订版本，通过客户端连到这台服务器，取出最新的文件或者提交更新进行协同工作。 
    + 缺点：
      * 中央服务器的发生故障或宕机，客户端都无法提交更新，也就无法协同工作；
      * 如果中心数据库所在的磁盘发生损坏，且未做恰当备份，将导致丢失所有数据（项目的整个变更历史），只能在各自客户端机器上保留的单独快照。 
    + ![集中式](https://cdn.jsdelivr.net/gh/T-1760/blog_picture/blog/git/202311292324553.png)
    + 此类系统工具：CVS、Subversion、Perforce、Bazaar 等等
  - 每次记录存储每个文件与初始版本的差异
    + 记录每个提交文件随时间逐步累积的差异 
    + 每次记录有哪些文件作了更新，以及都更新了哪些行的什么内容
    + ![存储每个文件与初始版本的差异](https://cdn.jsdelivr.net/gh/T-1760/blog_picture/blog/git/202312011421389.png)

### 分布式版本控制系统 
  - DVCS（Distributed Version Control System）分布式版本控制系统
    + 此类系统中，没有“中央服务器”，每个客户端都是一个完整的版本库，它把远程仓库完整（包括历史记录）地镜像下来，并非只提取最新版本的文件快照而已。
    + 避免协同工作用的任何服务器发生故障，事后都可用任何一个镜像出来的本地仓库恢复。 因为每一次的克隆操作，实际都是一次对远程仓库的完整备份
    + ![分布式](https://cdn.jsdelivr.net/gh/T-1760/blog_picture/blog/git/202311292324522.png)
    + 此类系统工具：Git、Mercurial、Bazaar、Darcs 等
  - Git 将变动的文件进行快照后，记录在一个微型的文件系统中（并非保存变化文件的差异数据）。
    + 每次提交更新时，Git 会纵览一遍所有文件的指纹信息并对文件作一快照，然后保存一个指向这次快照的索引。
    + 若文件没有变化，Git 不会再次保存，只对上次保存的快照作一链接，以便提高性能
    + ![存储项目随时间改变的快照](https://cdn.jsdelivr.net/gh/T-1760/blog_picture/blog/git/202312011421373.png)

### Git 四个工作区域
  - Workspace：工作区
    + 存放项目代码的地方
  - Index / Stage：暂存区
    + 用于临时存放你的改动
    + 事实上它只是一个文件，保存即将提交到文件列表信息
  - Repository：本地）仓库区 / 版本库
    + 安全存放数据的位置，这里面有你提交到所有版本的数据。其中 HEAD 指向最新放入仓库的版本
  - Remote：远程仓库
    + 托管代码的服务器，可以简单的认为是项目组中的一台电脑用于远程数据交换
  - 四个工作区域之间数据传递
    ```mermaid
      sequenceDiagram
        box rgba(0,0,255,0.3) 本地
          participant A as Workspace 工作区
          participant B as Stage 暂存区
          participant C as Repository 本地仓库
        end
        box rgba(0,255,0,0.3) 远程
          participant D as Remote 远程仓库
        end
        A->> B: add 添加
        B->> C: commit 提交
        C->> B: reset 回滚
        C->> A: checkout 检出
        C->> D: push 推送
        D->> C: fetch 抓取 / clone 克隆
        D->> A: pull 拉取
    ```

### Git 文件的三种状态
  - 工作目录种两种文件状态
    + Tracked 已跟踪状态
    + Untracked 未跟踪状态
#### 已跟踪状态文件的三种类型
  - modified 已修改：表示修改了文件，但还没保存到数据库中。
    + 工作区：简而言之在电脑里能看到的目录，比如自己创建的本地项目目录
  - staged 已暂存：表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。
    + 暂存区：Git 的版本库里存了很多东西（重点有 stage 或称 index 的暂存区、Git 自动创建的 master 分支和指向该 master 的 HEAD 指针）。
  - committed 已提交：表示数据已经安全地保存在本地数据库中。
    + Git 仓库：工作区有一个 `.git` 隐藏目录（即：Git 的版本库，并非属于工作区）
  ```mermaid
    sequenceDiagram 
      box rgba(0,0,255,0.3) 文件状态变化
        participant U as Untracked 未跟踪
        participant A as Unmodified 未修改
        participant B as Modified 已修改
        participant C as Staged 已暂存
      end

      U->> C: 添加文件
      A->> U: 删除文件
      A->> B: 编辑文件
      B->> C: 暂存文件
      C->> A: 提交 
  ```


### 基础术语
  - origin
    + 默认远程版本库名
  - master
    + 默认分支名
  - origin/master
    + 远程默认分支名
  - HEAD
    + 当前分支顶端 Commit 的别名（即：当前分支最近的一个提交的 SHA-1 哈希值）
  - ORIG_HEAD：
    + 上次 HEAD 指针的位置。
    + 注：当执行 `git reset`、`git pull`、`git merge` 命令时，Git 会把老的 HEAD 拷贝到`.git/ORIG_HEAD`文件中，在后续命令中可以使用 ORIG_HEAD 引用这个提交
  - commit：
    + 每个 commit 提交都是全部文件的完整快照，并用一个 commitID 来唯一标志。
    + 从某个角度上来说，Git 就是维护一个 commitID 的有向无环图
    + commitID 标志：基于文件的内容或目录结构计算出来的 40 位十六进制的 SHA-1 散列哈希值


### .git 目录
  - 在版本库中，Git 会维护两个主要的数据结构：object store 对象库和 index 索引，
    + 所有这些版本库数据都存放在工作目录下的 .git 目录中。
    + object store 对象库在复制操作的时候能够进行有效复制。
    +  index 索引是暂时的信息，对版本库来说是私有的，并且可以在需要时，按需求进行创建和修改。
  - Git 对象类型
    + 对象库包含版本库的原始数据文件、所有日志信息、作者信息、日期和其它用于重建项目任意版本或分支的信息。
  - 随项目开发的推进，所有信息在对象库中会变化和增长
    + 项目的编辑、添加和删除都会被跟踪和建模，而为了有效利用磁盘空间，Git会把对象压缩并存储在打包文件(pack file)中置于对象库中。
#### Git 对象库中的对象只有 4 种类型：
  - 块(binary large object, blob)
    + 文件的每一个版本表示为一个块。blob用来指代某些可以包含任意数据的变量或文件，同时其内部结构会被程序忽略。一个blob被认为是一个黑盒，其中存储一个文件的数据，但不包含任何关于该文件的元数据，甚至没有文件名。
  - 目录树(tree)
    + 一个目录树对象代表一层目录信息，其记录blob标识符、路径名和在一个目录里所有文件的一些元数据。其也可以递归引用其它目录树或子树对象，从而建立一个包含文件和子目录的完整层次结构。
  - 提交(commit)
    + 一个提交对象保存版本库中每一次变化的元数据，包括作者、提交者、提交日期和日志消息。每一个提交对象指向一个目录树对象，该目录树对象在一张完整的快照中捕获提交时版本库的状态。除了最初的提交没有父提交，大多数提交都会有一个父提交。
  - 标签(tag)
    + 一个标签对象分配一个任意的且可读的名字给一个特定对象，通常是一个提交对象。

#### index 索引
  - 索引则是临时的，动态的二进制文件，其描述了整个版本库的目录结构。或者可以说，索引捕获项目在某个时刻的整体结构的一个版本，相当于一个快照。项目的状态可以用一个提交和一个目录树来表示，其可以来自项目历史中的任意时刻，或者是正在开发的未来状态。
    + 如：用户可以在索引中暂存变更，之后索引会记录和保存这些变更，直到准备提交。同时也可以删除或替换索引中的变更

#### 目录结构
  - `/hooks` 目录：不同操作时执行的 hook 脚本。
  - `/info/exclude`：与 .gitignore 文件一样用予文件过滤。不同的是该文件不会提交到版本库（过滤只对本地生效，不影响他人）
    +/ .gitignore 文件需放在 .git 文件夹的同级目录中，windows下可通过 `type nul > .gitignore` 来创建
  - `/logs/refs/heads` 目录：各个本地分支的版本 log 记录
  - `/logs/refs/remotes` 目录：各个远程分支 cache 的 log 记录
  - `/logs/refs/stash`：储藏区数据
  - `/logs/HEAD`：git 操作记录
  - `/objects` 目录：2 级文件索引（把 SHA-1 哈希值拆成了：2位 + 38位），存储 commit 数据、blob 文件数据和 tree 目录数据
  - `/objects/pack` 目录：存储 commit、tree 目录及 blob 文件的压缩数据；目录中的 idx 文件为各数据对象的索引
  - `/objects/info/packs`：该文件记录所有 git 库的 pack 文件列表
  - `/refs/heads`：各个本地分支 HEAD
  - `/refs/remotes`：各个远程分支 cache 的 HEAD
  - `/refs/tags`：各个附注标签的信息
  - `COMMIT_EDITMSG`：上一次提交的注释
  - `config`：版本库相关的配置信息
  - `description`：仓库描述信息，供 gitweb 程序使用
  - `index`：暂存区相关的信息
  - `HEAD`：指向当前分支的最近提交（如：`ref: refs/heads/master`）
  - `ORIG_HEAD`：执行`git merge`/`git pull`/`git reset`操作时，记录将调整为新值之前的先前版本 HEAD，用于恢复或回滚之前的状态
  - `FETCH_HEAD`：记录每次 `git fetch` 抓取分支的 HEAD 
  - `MERGEHEAD`：正在合并进 HEAD 的 commitID
  - `packed-refs`：远程版本库 cache 和远程标签 cache

### .gitignore 的忽略文件
  - 作用：忽略一些不需要纳入Git管理(不希望上传到远程仓库的文件或目录)，我们也不希望出现在未跟踪文件列表
    + .gitignore 文件也可被上传到远程仓库（多人协同可使用同一个 .gitignore 文件）。
    + 若本地仓库文件已被跟踪，在 .gitignore 中针对其忽略设置已无效。
    + git 跟踪的是文件，而非目录
  - 格式规范
    + 忽略空行或以 `#` 开头的行。
    + 每行表示一种模式    
    + fileName：忽略所有 fileName 文件。（自动搜索多级目录 `*/*/folderName`）
    + folderName/：忽略所有 folderName 目录（及其下的文件）
      1. 包含当前目录下的 folderName，例：`folderName/`
      2. 包含多级目录下的 folderName，例：`*/*/folderName/`（自动搜索多级目录 `*/*/folderName`）
    + 可使用标准 glob 模式（ shell 使用简化的正则表达式）匹配，它会递归地应用在整个工作区中。
      * `*`：匹配多个字符；
      * `?`：匹配除 `/` 外的任意一个字符
      * `[]`：匹配多个列表中的字符
    + 以 `/` 开头匹配模式，可防止递归。
    + 以 `/` 结尾匹配模式，可指定目录。
    + 以 `!` 开头匹配模式，可取反（排除）指定模式的文件或目录
    + `/**` 表示多级目录

    ```shell
      # 此行为注释 会被 Git 忽略
      # 忽略以 .o 或 .a 结尾的文件（这类对象文件、存档文件常在编译过程中出现）
      *.[oa]
      
      # 忽略以 ~ 波浪符结尾的文件
      *~

      # 忽略 node_modules/ 目录下所有的文件
      node_modules
 
      # 忽略所有 .vscode 结尾的文件
      .vscode

      # 忽略所有 .md 结尾的文件
      *.md

      # 但 README.md 除外
      !README.md

      # 忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
      /TODO
      
      # 忽略任何目录下名为 build 的目录
      build/

      # 会忽略 doc/something.txt 但不会忽略 doc/images/arch.txt
      doc/*.txt

      # 忽略 doc/ 目录下所有扩展名为 txt 文件
      doc/**/*.txt
    ```

## 常见的分支管理策略：
  - 特性分支：对于新功能的开发，可以基于主分支创建一个新的特性分支，进行开发和测试，开发完成后再合并回主分支。
  - 发布分支：用于发布软件版本，可以在主分支的基础上创建一个发布分支，只进行Bug修复和小的改动，不再加入新的功能，确保发布版本的稳定性。
  - 长期支持分支：对于长期维护的版本，可以创建长期支持分支，用于接收重要的Bug修复，确保老版本的稳定性。


## Git 的 Tag 标签
  - Git 与其他 VCS 版本控制系统一样，都可为仓库历史中的某一次提交，打上标记。
    + 常用于标记发布结点（ v1.0 、 v2.0 等等）
  - Git 标签的常见类型：
    + 轻量标签（lightweight）
      + 一个临时或无需保存信息的标签 
      + 一个不会改变的分支，只是某个特定提交的引用
      + `git cat-file -p [tagName]` // 查看指定的轻量标签或附注标签信息
    + 附注标签（annotated）
      * 存储在 Git 数据库中的一个完整对象（标签者的名字、电子邮件地址、日期时间等），可使用 GNU Privacy Guard （GPG）签名并验证。 
      + `git cat-file tag [tagName]` // 查看指定的附注标签信息

## Git 命令
### 配置常用的命令的别名
  - 语法：`git config --global alias.<new_name> <old_name>`
  ```shell
    > git config --global alias.co checkout
    > git config --global alias.br branch
    > git config --global alias.ci commit
    > git config --global alias.st status
  ```

### git 连接新仓库并提交代码步骤
```shell
  > git init # 初始化仓库
  > git add [filepath] # 添加文件到本地仓库
  > git commit -m "first commit" # 添加文件描述信息
  > git remote add [shortname] [remote-url] # 链接远程仓库，创建 shortname（常为：origin） 主分支
  > git pull origin master # 把本地仓库的变化连接到远程仓库主分支
  > git push -f origin master # 把本地仓库的文件推送到远程仓库
```

### 更换 git 远程仓库地址
  - 方法一 ： 通过命令直接修改远程仓库地址
    ```shell
      > git remote # 查看所有远程仓库 
      > git remote xxx # 查看指定远程仓库地址
      > git remote set-url origin [new-remote-url]
    ```
  - 方法二： 先删除在添加你的远程仓库
    ```shell
      > git remote rm origin
      > git remote add origin [new-remote-url]  
    ```

### git 统计项目中各成员代码量
  - 显示所有提交过的用户，按提交次数排序
    ```shell
      > git shortlog -sn
    ```
  - 显示指定文件是什么人在什么时间修改过
    ```shell
      > git blame [file]
    ```
  - 查看 git 上个人代码量
    ```shell
      > git log --author="username" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
    ```
  - 统计每个人的增删行数
    ```shell
      > git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
    ```

### 常用命令
  - `git clone`：从远程主机克隆一个版本库；
  - git remote: 增加远程仓库地址；
    + `git remote add  git://github.com/octocat/Spoon-Knife.git`
  - `git config`： 配置邮箱名和作者名；
    + `git config --global user.email "xxx@163.com"`
  - `git init`：初始化本地git仓库状态；
  - `git add`：是将当前更改或者新增的文件加入到Git的索引中，加入到Git的索引中就表示记入了版本历史中，这也是提交之前所需要执行的一步；
  - `git branch`：对分支的增、删、查等操作；
  - `git checkout`：Git的checkout有两个作用，其一是在不同的branch之间进行切换，另一个功能是还原代码的作用；
  - `git commit`：提交当前工作空间的修改内容；
    + `git commit -m "first commit"`
  - `git diff`：对比不同的commit或者分支的差异；
  - `git reset`：回滚到指定状态；
    `git reset —hard HEAD^` // 回滚到上一次记录
  - `git merge`：合并分支
    + `git merge master`  // 合并当前分支到 master 分支
  - `git rm`：从当前的工作空间中和索引中删除文件；
  - `git log`：查看历史日志；
  - `git status`：查看本地代码情况
  - `git revert`：还原一个版本的修改，必须提供一个具体的Git版本号；
  - `git push`：将本地commit的代码更新到远程版本库中；
  - `git pull`：从其他的版本库（既可以是远程的也可以是本地的）将代码更新到本地；
    + `git pull -r origin patch` // 同步远程到本地并以 rebase 方式合并本地分支
    + `git pull` 就是 `git fetch` + `git merge origin/master`

### SVN 命令对比
  | svn | git | 说明
  | `svn checkout` |  `git clone`             | 检出项目
  | `svn update`   |  `git fetch`、`git pull` | 更新
  | `svn commit`   |  `git commit` + `git push` | 提交
  | `svn add`      |  `git add`     | 添加
  | `svn mv`       |  `git mv`      | 移动
  | `svn rm`       |  `git rm`      | 删除
  | `svn status`   |  `git status`  | 查看状态
  | `svn log`      |  `git log`     | 查看日志
  | `svn diff`     |  `git diff`    | 查看差异
  | `svn revert`   |  `git checkout`、`git reset`、`git revert` | 撤销、丢弃修改
  | `svn copy`     |  `git checkout -b/-B` 、`git branch` | 创建分支
  | `svn switch`   |  `git checkout`            | 切换分支
  | `svn copy`     |  `git tag`                 | 创建tag 
  | `svn merge`    |  `git merge`、`git rebase` | 分支合并

## 实战
### Bug 分支管理
  - 通常修复 bug 时，通过创建新的 bug 分支进行修复，然后合并，最后删除。
  - 当手头工作没有完成时，先把工作现场 `git stash` 一下，然后去修复 bug ，修复完成后，再 `git stash pop` 回到工作现场。
  - 在 master 分支上修复的 bug，想要合并到当前 dev 分支，可以用 `git cherry-pick <commit>` 命令，把 bug 提交的修改“复制”到当前分支，避免重复劳动。
### 解决冲突
  - 当进行分支合并时，可能会发生冲突（即：不同分支对同一部分代码进行了修改）。
    1. 在合并分支之前，先使用 `git fetch` 或 `git pull` 获取远程仓库的最新更改。
    2. 使用 `git merge` 或 `git rebase` 将一个分支合并到当前分支。若发生冲突，Git 会将冲突标记在文件中。
    3. 打开冲突的文件，手动编辑文件（选择保留需要的更改，并删除冲突标记）来解决冲突。冲突部分会被标记为类似的形式：
      ```txt
        code<<<<<<< HEAD
        // 当前分支的修改
        =======
        // 合并分支的修改
        >>>>>>> branch_name
      ```
    4. 解决冲突后，使用 `git add` 将修改的文件标记为已解决状态。
    5. 使用 `git commit` 提交解决冲突的修改。

### git pull 报错
  - git pull 时 `error: cannot lock ref 'xxx': ref xxx is at （一个 commitID） but expected`
    + 使用 git 命令删除相应 refs 文件，`git update-ref -d refs/remotes/origin/git/yousa/feature_01`
    + 然后强制执行 `git pull -p`

## 工作流程
  - DEV 开发环境
    + 此服务环境一般为开发人员进行代码开发，单元自测，以及实验的稳定环境。
  - TEST 测试环境 
    + 开发人员提测（提交测试）后，将相关代码，服务环境部署到此环境，由测试人员对此环境的服务进行专业性的二次测试（基准测试，安全测试，业务逻辑验证等等）。
  - PROD 生产环境 
    + 当测试环境得到充分的验证之后并满足发布生产条件，会将相关代码，服务环境部署到此环境，提供正式服务。
  - 联调 
    + 提交到开发环境进行前后端联调，当联调通过之后，按照约定时间进行前后提测(前后端可分别提测)，
    + 提测时，由开发人员将 dev 开发分支合并到 release 预发分支上，触发测试环境持续集成过程。
  - 提测
    + 提交测试后，测试人员对测试环境进行验证，测试中产生的 bug，
    + 开发人员应该在 feature 功能分支上进行修复，然后统一按批次和时间进行重新联调过程

### 单一功能迭代型分支策略
  - 适用场景: 统一开发迭代版本，统一提测流程，统一上线流程
  - 不适用场景: 多功能并行开发，多功能分别提测
  - 适用人数：3 - 5 人
  - 备注
    + 允许 feature 功能分支、dev 开发分支、test 测试分支之间互相合并
    + 简单理解：feature 分支可看作开发人员熟悉的 local 分支
### 多功能并行迭代型分支策略
  - 适用场景: 多迭代版本并行开发，分别提测流程，分别上线流程，差异化上线
  - 不适用场景: 多并行开发版本中有交叉内容。
  - 适用人数：3 - 5 或 20+ 人
  - 备注
    + dev 作为开发环境公共验证分支，
    + test 作为公共提测分支，
    + feature-xx 分支作为主要并行开发使用分支，
    + 禁止 dev 开发分支和 test 测试分支进行相互合并；
    + 禁止 master 主分支除 feature-xx 功能分支 或 hotfix 修复分支以外内容发起的 Pull Request (PR)
    + 禁止 feature-xx 功能分支之间进行相互合并

### GitFlow 分支包括
  - ![Gitflow 工作流](https://cdn.jsdelivr.net/gh/T-1760/blog_picture/blog/git/202312012158810.png)
  - Master 主分支
    + 正式版本的发布分支，此分支代码对应生产环境。master 分支上的所有提交都会分配一个版本号
    + 禁止直接进行 push 推送操作，需合并应当发起 Pull Request (PR)，由生产环境负责人对此 PR 进行合并（分配一个版本号并打 Tag 标记）。
  - Hotfix 补丁分支
    + 紧急修复线上缺陷的分支。紧急修复分支，俗称救火分支。
    + 当生产环境发生问题需要紧急修改代码时，从 Master 分支创建出来的新分支，在此分支上紧急修改代码后，合并到 Release 预发分支，测试验证通过后，直接发起 Pull Request (PR)提交到 Master 分支。
    + 此分支一般在紧急修复线上问题之后，可将其 merge 合并到 Development 开发分支，再将此分支删除。
  - Release 预发分支
    + 用于测试和缺陷修复的预发布分支。此分支代码对应测试环境。
    + 每次 push 推送代码到此分支时，会触发固定 pipeline 流水线，部署应用到测试环境
  - Development 开发分支
    + 对新（Feature）功能进行集成的分支。此分支代码对应开发环境。
    + 每次 push 推送代码到此分支时，会触发固定 pipeline 流水线，部署应用到开发环境
  - Feature 功能分支
    + 开发功能的特性分支。
    + 每个功能分支：代表每个固定的迭代或开发功能集版本。
    
## 参考资料
  - [Git 官网](https://git-scm.com/)
  - [Git 中文网](https://git.p2hp.com/)
  - [Gitlab 分支策略建议指南](https://baijiahao.baidu.com/s?id=1737642596617193381)
  - [Git版本控制管理——基本Git概念](https://blog.csdn.net/SAKURASANN/article/details/125344997)
  - [Git原理与Git命令大全](https://zhuanlan.zhihu.com/p/86952116)
