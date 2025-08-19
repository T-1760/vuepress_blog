---
sidebar: auto
title: linux 命令
date: 2023-10-18
tags:
 - linux 命令
categories: 
 - command 命令
---

## linux 命令
### grep 全局正则表达式搜索
  - 功能：全局正则表达式搜索打印（Global Regular Expression Print），从文本文件或管道数据流中筛选匹配的行及数据。
    + 常与 `ps`、`cat` 命令一起使用，`grep` 的输出为其他命令的输入
  - 语法：`grep <options> <pattern> >file>`
  - 选项
    + `-A <n>`：显示匹配字符**后 n 行**
    + `-B <n>`：显示匹配字符**前 n 行**
    + `-C <n>`：显示匹配字符**前后 n 行**
    + `-c`：计算符合样式的列数
    + `-i`：忽略大小写
    + `-n`：显示匹配内容的所在文件中行数
    + `-R`：递归查找文件夹
    + `-v`：反向选择匹配文本行的搜索
    + `-V`：显示软件版本信息
    + `-l`：列出文件内容符合指定的范本样式的文件名称
    + `-E`：扩展 `grep` （即 `egrep`)，可以使用扩展正则表达式
    + `--color=auto`：搜索关键词显示颜色  

### free 内存使用情况
  - 功能：显示内存的使用情况
  - 语法：`free [options]`
  - 参数：
    + `-b`：以 **Byte** 为单位显示内存使用情况
    + `-k`：以 **KB** 为单位显示内存使用情况
    + `-m`：以 **MB** 为单位显示内存使用情况
    + `-h`：以合适的单位（`B` = bytes、 `K` = kilos、 `M` = megas、 `G` = gigas、 `T` = teras）显示内存使用情况, 最大为三位数, 自动计算对应的单位值
    + `-s <n>`：间隔 n 秒数持续观察内存使用状况
    + `-t`：显示内存总和列
    + `-V`：显示版本信息

### top 进程信息
  - 功能：显示当前系统正在执行的进程的相关信息，
    + 包括进程 ID、内存占用率、CPU 占用率等
  - 语法：`top [options]`
  - 选项：
    + `-d`：指定信息刷新的时间间隔
    + `-p`：指定监控进程的 ID
    + `-i`：不显示任何闲置或者僵死进程
    + `-c`：不显示命令

### ps 进程的 pid
  - 功能：查看进程 pid
  - 语法：`ps -ef | grep 进程名`

### vmstat 进程和 CPU 的情况
  - 功能：显示进程和 CPU 的统计信息
  - 语法：
  - 终端显示：
    + `procs` 属性：
      * `r` 值：运行和等待 CPU 时间片的进程数 
      * `b` 值：等待资源的进程数
    + `cpu` 属性：us + sy > 80% 说明 CPU 可能不足
      * `us` 值：**用户进程**消耗 CPU 的时间百分比
      * `sy` 值：**内核进程**消耗 CPU 的时间百分比
      * `id` 值：处于空闲的 CPU 时间百分比
      * `wa` 值：系统等待 IO 的 CPU 时间百分比
      * `st` 值：来自一个虚拟机偷取 CPU 的时间百分比

### pidstat 进程占用资源情况
  - 功能：查看指定进程的 cpu、内存、线程、设备 IO 等系统资源的占用情况
  - 语法：`pidstat [options] [internal [count]]`
    + `-u`：默认的参数，显示各个进程的 CPU 使用统计
    + `-r`：显示各个进程的内存使用统计
    + `-d`：显示各个进程的 IO 使用情况
    + `-p`：指定进程号

### iostat
  - 功能：查看系统设备的 IO 负载情况
  - 语法：`iostat [options] [internal [count]]`
    + `-c`：显示 CPU 使用情况
    + `-d`：显示磁盘使用情况
    + `-k`：以 `KB` 为单位显示
    + `-m`：以 `M` 为单位显示
    + `-x`：显示详细信息

### ifstat
  - 功能：查看设备网络IO负载情况

### netstat 网络状态
  - 功能：显示网络状态
  - 语法：`netstat [options]`
  - 选项：
    + `-r` 或 `--route`：显示 Routing Table
    + `-t` 或 `--tcp`：显示 TCP 传输协议的连线状况
    + `-u` 或 `--udp`：显示 UDP 传输协议的连线状况
  - 案例：
    ```bash
      > netstat -a // 显示详细的网络状况
      > netstat -at // 显示 TCP 端口号的使用情况
      > netstat -apu // 显示 UDP 端口号的使用情况

      > netstat -nap | grep 进程 pid // 通过进程 pid 查看占用端口
      > netstat -nap | grep 端口号 // 通过端口查看进程 pid
    ```

### df
  - 功能：查看文件系统的磁盘空间占用情况
  - 案例： 
    ```bash
      > df -h // 以简易格式输出文件系统大小    
    ```

### ping
  - 功能：检测主机网络
  - 语法：`ping [options] destination`
    + `-c <n>`：设置完成要求回应的 n 次数
    + `-i <s>`：指定收发信息的 s 间隔时间
    + `-R`：记录路由过程

### tar 压缩
  - 功能：用来建立和还原备份（压缩）文件 / 文件夹，不会删除原始的文件
  - 语法：`tar [options] file`
  - 选项：
    + `-A` \ `--catenate` \ `--concatenate`：新增压缩文件到已存在的压缩 
    + `-c` 或 `--create`：创建新的 tar 文件
    + `-f <file>` 或 `--file= <file>`: 指定备份文件
    + `-d` \ `--diff` \ `--compare`：将文件系统里的文件和 tar 文件里的文件进行比较
    + `--delete`：删除 tar 文件里的文件。
      * 注：不能用于已保存在磁带上的 tar 文件。
    + `-l`：文件系统边界设置
    + `-m`：保留文件不被覆盖
	  + `-j` \ `--bzip2`：调用 `bzip2` 执行压缩或解压缩。
      * 注：兼容性推荐使用 `--bzip2`。
	  + `-J` \ `--xz` \ `--lzma`：调用XZ Utils执行压缩或解压缩。依赖 XZ Utils。
    + `-k` \ `--keep-old-files`：不覆盖文件系统上已有的文件。
    + `-P` \ `--absolute-names`：使用绝对路径。
    + `-r` \ `--append`：附加新的文件到 tar 文件中
    + `-t` \ `--list`：列出 tar 文件中包含的文件的信息
	  + `-u` \ `--update`：用已打包的文件的较新版本更新 tar 文件
    + `-v` \ `--verbose`：列出每一步处理涉及的文件的信息，只用一个“v”时，仅列出文件名，使用两个“v”时，列出权限、所有者、大小、时间、文件名等信息。
    + `-w`：确认压缩文件的正确性
    + `-x` \ `--extract` \ `--get`：解压 tar 文件
	  + `-z` \ `--gzip` \ `--gunzip` \ `--ungzip`：调用 gzip 执行压缩或解压缩。
	  + `-Z` \ `--compress` \ `--uncompress`：调用 compress 执行压缩或解压缩。

  - 案例： 
    ```bash
      > tar -cf file.tar file # 压缩为 file.tar
      > tar -jcf file.tar.bz2 file # 压缩打包文件为 file.tar.bz2
      > tar -czf file.tar.gz file # 压缩文件为 file.tar. gz
      > tar -tvf test.tar.gz # 列出压缩文件内容

      > tar -cvf home_backup.tar /home	# 将 /home 目录下的所有文件压缩到 home_backup.tar
      > tar zcvf '指定的压缩包名' file1 dir2  # 将文件 file1 和 dir2 文件夹一起以 gzip 格式压缩，
      > tar jcvf '指定的压缩包名' file1 dir2  # 将文件 file1 和 dir2 文件夹一起以 bZip2 格式压缩.	

      > tar -xvf home_backup.tar 	# 在当前目录下解压 home_back.tar
      > tar -xvf home_backup.tar home/test.c	# 指定解压到 test.c 文件（过程中会自动创建 home 的子目录）
      > tar zxvf '指定的压缩包名'
      > tar jxvf '指定的压缩包名' 
      > tar jxvf a.gz -C test # 解压到 test 文件夹下
    ```

### gzip 压缩文件
  - 功能：以 `.gz` 后缀压缩文件。并删除原始的文件，不能压缩文件夹。
  - 语法：`gzip [options] file`
  - 选项：
    + `-d` 或 `--decompress` 或 `----uncompress`：解开压缩文件
    + `-v` 或 `--verbose`：显示指令执行过程
  - 案例：
    ```bash
      > gzip -dv file.gz // 解压 file 文件并列出详细信息
    ```

### bzip2 压缩文件
  - 功能：以 `.bz2` 后缀压缩文件。并删除原始的文件，不能压缩文件夹。
  - 语法：`bzip2 [options] file`
  - 选项：
    + `-d`：执行解压缩
    + `-f`：在压缩或解压缩时,若输出文件与现有文件名相同,则覆盖现有文件
    + `-k`：在压缩或解压缩后保留源文件 
    + `-v`：压缩或解压缩文件时，显示详细的信息
  - 案例：
    ```bash
      > bzip2 file // 压缩不保留源文件
      > bzip2 -k file // 压缩保留源文件
      > bzip2 -d file // 解压缩
      > bunzip2 file // 解压缩 
    ```

### zip 压缩/ unzip 解压 
  - 功能：以 `.zip` 后缀压缩（解压）文件 / 文件夹，并不会删除原始的文件
  - 语法：`zip [options] file.zip file`
  - 选项：
    + `-m`：压缩文件后删除源文件
    + `-P <pass>`：使用 zip 的 pass 密码选项
    + `-o`：将压缩文件的更改时间设成和该文件相同
    + `-d`：从压缩文件内删除指定的文件
    + `-v`：显示指令执行过程
    + `-q`：不显示指令执行过程
    + `-r`：将指定目录下的所有文件和子目录一并压缩
    + `-x <regex>`：压缩时排除符合（范本样式）条件的文件
  - 语法：`unzip [options] file.zip`
  - 选项：
    + `-n`：解压缩时不要覆盖原有的文件
    + `-P <pass>`：使用 zip 的 pass 密码选项
    + `-d <path>`：指定文件解压后所存储的 path 目录路径
  - 案例：
    ```bash
      zip -P 密码 file.zip file // 压缩文件或文件夹
      zip -dv test.zip test/test.txt // 删除 zip 压缩包中的文件

      unzip file.zip // 解压文件
      unzip -n text.zip -d /tmp // 指定解压到哪个地方并且不覆盖原有文件    
    ```

### sed 批量处理脚本
  - 功能：利用脚本来处理文本文件，自动编辑一个或多个文件、简化对文件的反复操作、编写转换程序等
  - 语法：`sed [options] {script} file`
  - 选项：
    + `-i`：不会修改文件内容
  - 脚本:
    + `a`：新增
    + `c`：取代
    + `d`：删除
    + `i`：插入 
    + `p`：打印
    + `s`：替换（配合正则表达式）
  - 案例：
    ```bash
      sed 'la\1' test.txt  // 在第一行添加一行 "1" 字符串 
      sed '1d' test.txt // 删除第一行
      sed -n '3p' test.txt // 打印第三行
      sed '2iasd' test.txt // 在第二行插入一行 "asd" 字符串
      sed '1,2c?' test.txt // 用 "?" 取代一二行：
      sed -i "s/查找字段/替换字段/g" test.txt
    ```

### find 查找文件
  - 功能：用来在指定目录下查找文件
  - 语法：`find path [options] []`
  - 选项：
    + `-name <name>`：根据 name 文件名查询
      * `iname` 会忽略大小写
    + `-user <user>`：查找所属用户为 user 的所有文件
    + `-type`：根据类型查找
      * `d`：目录
      * `c`：字型装置文件
      * `b`：区块装置文件
      * `p`：管道文件
      * `f`：文件
      * `l`：符号连结
      * `s`：socket

## linux 常用命令
### 命令帮助
#### help
  - 功能： 查看命令帮助
  - 语法：`command [option] --help`
	- 示例： `hostname --help`
#### man
  - 语法：`man command`
	- man 共有 9 种不同卷，但卷可能有相同的函数名
    1. 可执行程序或 shell 命令
    2. 系统调用（内核提供的函数）
    3. 库调用（程序库中的函数）
    4. 特殊文件（通常位于 `/dev`）
    5. 文件格式和规范，如 `/etc/passwd`
    6. 游戏
    7. 杂项（包括宏包和规范，例：`man(7),groff(7)`）
    8. 系统管理命令（通常只针对 root 用户）
    9. 内核例程（非标准）

### Linux 关机
  - 立刻关机
    + `shutdown -h now`
    + `poweroff`
	- 5 分钟后关机 
    + `shutdown -h 5` 

### Linux 重启
  - 立刻重启
    + `shutdown -r now`
    + `reboot`
  - 5 分钟后重启
    + `shutdown -r 5`

### 磁盘
  - 显示磁盘大小
    + `du`
	- 查看磁盘使用情况
    + `df`

## 目录和文件相关命令
### ls 
  - 功能：显示当前目录下所有文件及目录
	  + `ls -a`：显示当前目录下所有文件，包含隐藏文件
	  + `ls -l <dirname>` \ `ll` ：显示指定目录下所有文件及文件夹 以及相应权限 
	  + `ls -dl <dirname>`：显示指定目录的详细信息
	  + `ls -R <dirname>`：递归（recursion）显示指定目录的信息。
	  + `ls -Rl <dirname>`：递归显示指定目录的详细信息
		+ `pwd`：显示当前目录
### tree
  - 功能：按树结构显示当前文件夹下目录和文件  
    + 需安装(ubuntu 命令)：`sudo apt-get install tree`
## 目录
### 切换目录
  - 语法：`cd dirpath`
	  ```bash
      > cd .	# 当前目录
	    > cd .. # 回退到上级目录
	    > cd -  # 回退到上次打开的目录
	    > cd ~  # 跳转到当前用户的家目录
    ```
### 移动目录
  - 语法：`cp [option] sourcePath targetPath` 
  - 选项：
    + `-r`：递归
    + `-a`：所有文件  
  - 案例：
    ```bash
      > cp 文件名a  文件名b  # 以  a文件创建 b 文件（与 a 数据相同）
      > cp -r 目录名称 目录拷贝的目标位置  
      > cp -a 目录名称 目录拷贝的目标位置      
    ``` 

### 创建目录
  - 语法：`mkdir dirpath`
    ```bash
      > mkdir aaa            # 在当前目录下创建 aaa 目录
			> mkdir usr/aaa        # 在指定目录下创建 aaa 目录（前提 usr 必须已存在）
			> mkdir -p aaa/bbb/ccc # 创建多及目录  
    ```
### 删除目录
  - 语法：`rmdir [option] dirpath` 	# 删除空目录 非空会报错
  - 选项：
    + `-f`：忽略不存在的文件，强制删除，不给出提示。
		+ `-r`：指示rm将参数中列出的全部目录和子目录均递归地删除。
		+ `-i`：进行交互式删除。
	- 温馨提示：
		+ rm 命令删除文件，无法被恢复的。防止此情况的发生，推荐搭配`i`选项来确认删除。当用户输入`y`，才被确认删除
		+ rm 不仅可以删除目录，也可以删除文件
	- 案例：
    ```bash
      > rmdir -r dirpath # 递归删除当前目录下的指定目录（无论是否为空）
			> rm -rf aaa    	 # 递归删除当前目录下的 aaa 目录（不询问）
			> rm -ri temp   	 # 递归删除当前目录下的 aaa 目录（询问）
    ```
### 修改目录名
  - 语法：`mv oldDirpath newDirpath` 

## 文件

## 用户及用户组
### 增加
	```bash
    sudo adduser wangwu # 添加用户wangwu
		sudo addgroup g8 	# 添加用户组g8
  ```
### 删除
  ```bash
		sudo deluser wangwu # 删除wangwu
		sudo delgroup g8	# 删除用户组g8
  ```
### 修改文件权限
  ```bash
		sudo chown wangwu a.c # 将a.c文件的所有者变为wangwu用户
		sudo chgrp g8 a.c 		# 将文件a.c的组修改为g8
		sudo chown nobody:nogroup a.c # ubuntu 仅限。nobody:nogroup 是系统自带的用户和组 将 a.c 所有者和组改为未知。
  ```
### 切换用户
  ```bash
		su test		# 切换到 test 用户，但是路径还是 /root 目录
		su - test : # 切换到 test 用户，路径变成了 /home/test
		su : 		# 切换到 root 用户，但是路径还是原来的路径
		su - :		# 切换到 root 用户，并且路径是 /root
		su 不足：如果某个用户需要使用 root 权限、则必须要把 root 密码告诉此用户。
  ```
### 退出返回之前的用户
  - `exit`

## 参考资料
  - [Linux--Command](https://blog.csdn.net/qq_37233070/article/details/128879368)
  - [Linux常用命令大全，一篇搞定](https://zhuanlan.zhihu.com/p/442326467)