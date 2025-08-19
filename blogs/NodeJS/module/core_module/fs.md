---
sidebar: auto
title: fs 模块
date: 2023-10-18
tags:
 - fs 模块
 - Node.js 核心模块
categories: 
 - 核心模块
---

## fs 文件系统  
  - fs 模块能够**以标准 POSIX 函数为模型**的方式与文件系统（文件及目录）进行交互。
    + POSIX：可移植操作系统接口（Portable Operating System Interface of UNIX，缩写为 POSIX ），
    +  POSIX 是起初时 Unix 的标准。后来 Linux等操作系统也遵循此标准，并调用系统通用的 API
  - 所有 fs 操作都具有同步、异步（回调形式的 API 和基于 promise API），并且可以使用 CommonJS 语法和 ES6 模块进行访问。
  - Node.js 异步编程的直接体现就是通过回调函数来实现。 
    + **温馨提示**：异步编程依赖于回调来实现，但不代表使用了回调函数程序就异步化了.
  - 同步编程
    + 阻塞的代码是按照顺序依次执行的
  - 异步编程
    + 非阻塞的代码不需要按顺序
    
### 同步示例
  - fs 模块的同步 API 会阻塞 Node.js 事件循环和下一步的 JavaScript 执行，直到操作完成。
  - 使用同步 API 时，异常会被立即地抛出，可以使用 `try…catch` 来处理，也可以允许冒泡
  ```js
    const { unlinkSync } = require('fs');

    try {
      unlinkSync('/tmp/hello');
      console.log('已成功删除 /tmp/hello');
    } catch (err) {
      // 处理错误
    }
  ```
### 回调示例
  - fs 模块的回调形式的 API 将完成回调函数作为其最后一个参数并且异步地调用该操作。 
  - 传给完成回调的参数取决于（错误优先的回调风格的）方法，通常第一个参数始终预留用于异常。 如果操作成功地完成，则第一个参数为 `null` 或 `undefined`。
  - 当需要最大性能（在执行时间和内存分配方面）时，fs 模块基于回调形式的 API 比使用 promise API 更可取。
  ```js
    const { unlink } = require('fs');

    unlink('/tmp/hello', (err) => {
      if (err) throw err;
      console.log('已成功删除 /tmp/hello');
    });
  ```
### Promise 示例
  - 基于 promise API 的操作会返回一个当异步操作完成时被履行的 `promise`。
  ```js
    const { unlink } = require('fs/promises');

    (async function(path) {
      try {
        await unlink(path);
        console.log(`已成功删除 ${path}`);
      } catch (error) {
        console.error('捕获的错误信息：', error.message);
      }
    })('/tmp/hello');
  ```

## fs 常见对象
  - fs.constants 
  - fs.Stats

## fs.constants 对象
  - 用于文件系统操作常用常量的对象
### 文件系统常量
  - 并非所有常量都适用于每个操作系统； 这对于 Windows 尤其重要，因为其中许多 POSIX 特定定义不可用。 对于可移植应用，建议在使用前检查它们的存在
  - 要使用多个常量，请使用按位或 `|` 运算符。
    ```js
      import { open, constants } from 'node:fs';

      const { O_RDWR, O_CREAT, O_EXCL } = constants;      

      open('/path/to/my/file', O_RDWR | O_CREAT | O_EXCL, (err, fd) => {
        // ...
      });
    ```

### 文件访问常量
  - 常用于 `fsPromises.access()`、`fs.access()`、`fs.accessSync()` 的 `mode` 参数。
  | 常量 | 描述 | 备注 |
  |:--|:--|:--|
  | `F_OK` | 指示文件对调用进程**可见**的标志 | 常用于确定文件是否存在，但没有说明 `rwx` 权限。 未指定 `mode` 时的默认值 |
  | `R_OK` | 指示文件被调用进程**读取**的标志 | |
  | `W_OK` | 指示文件被调用进程**写入**的标志 | |
  | `X_OK` | 指示文件被调用进程**执行**的标志 | 表现类似 `F_OK` |

### 文件复制常量
  - 常用于 `fs.copyFile()` 的 `mode` 参数。
  | 常量 | 描述 |
  |:--|:--|
  | `COPYFILE_EXCL` | 如果目标路径已经存在，复制操作将失败并显示错误 |
  | `COPYFILE_FICLONE` | 复制操作将尝试创建写时复制引用链接。若底层平台不支持写时复制，则**使用回退复制机制** |
  | `COPYFILE_FICLONE_FORCE` | 复制操作将尝试创建写时复制引用链接。若底层平台不支持写时复制，则**操作失败并显示错误** |

### 文件打开常量
  - 常用于 `fs.open()` 的 `mode` 参数。
  - 在 Windows 操作系统中，仅`O_APPEND`、`O_CREAT`、`O_EXCL`、`O_RDONLY`、`O_RDWR`、`O_TRUNC`、`O_WRONLY `、` UV_FS_O_FILEMAP`可用。
  | 常量 | 描述 |
  |:--|:--|
  | `O_RDONLY` | 指示打开文件以进行**只读**访问的标志 |
  | `O_WRONLY` | 指示打开文件以进行**只写**访问的标志 |
  | `O_RDWR` | 指示打开文件以进行**读写**访问的标志 |
  | `O_CREAT` | 若文件不存在，则指示**创建**文件的标志 |
  | `O_EXCL` | 若设置了 `O_CREAT` 标志并且文件已存在，则表示**打开文件失败**的标志 |
  | `O_NOCTTY` | 如果路径标识一个终端设备，打开路径不应导致该终端成为进程的控制终端（如果进程还没有一个） |
  | `O_TRUNC` | 如果文件存在，还是一个普通文件并且该文件被成功打开以进行写访问，则**其长度应被截断为零** |
  | `O_APPEND` | 指示数据将**追加到**文件末尾的标志 |
  | `O_DIRECTORY` | 如果**路径不是目录**，则表示**打开失败**的标志 |
  | `O_NOATIME` | 指示（仅用在 `Linux` 操作系统）文件系统进行读取访问的标志将不再导致更新与文件关联的 `atime` 信息 |
  | `O_NOFOLLOW` | 如果**路径是符号链接**，则表示**打开失败**的标志 |
  | `O_SYNC` | 指示文件为同步 I/O 打开的标志，写操作等待**文件完整性** |
  | `O_DSYNC` | 指示文件为同步 I/O 打开的标志，写操作等待**数据完整性** |
  | `O_SYMLINK` | 指示**打开符号链接**本身，而非它指向的资源的标志 |
  | `O_DIRECT` | 设置后，将尝试**最小化文件 I/O 的缓存**影响 |
  | `O_NONBLOCK` | 指示在可能的情况下，以**非阻塞模式打开文件**的标志 |
  | `UV_FS_O_FILEMAP` | 将（仅用在 `Windows` 操作系统，其他则忽略）使用**内存文件映射来访问文件** |

### 文件类型常量
  - 常于 `fs.Stats` 文件信息对象的 `mode` 属性使用, 以确定**文件的类型**。
  - 在 Windows 操作系统中，仅 `S_IFCHR`、`S_IFDIR`、`S_IFLNK`、`S_IFMT`、`S_IFREG` 可用。
  | 常量 | 描述 |
  |:--|:--|
  | `S_IFMT` | 用于提取文件类型代码的**位掩码** |
  | `S_IFREG` | 常规**文件**的文件类型常量 |
  | `S_IFDIR` | **目录**的文件类型常量 |
  | `S_IFCHR` | **面向字符的设备文件**的文件类型常量 |
  | `S_IFBLK` | **面向块的设备文件**的文件类型常量 |
  | `S_IFIFO` | **FIFO/管道**的文件类型常量 |
  | `S_IFLNK` | **符号链接**的文件类型常量 |
  | `S_IFSOCK` | **套接字**的文件类型常量 |

### 文件模式常量
  - 常于 `fs.Stats` 文件信息对象的 `mode` 属性使用, 以确定**文件的访问权限**。
  - 在 Windows 操作系统中，仅 `S_IRUSR` 、`S_IWUSR` 可用。
  | 常量 | 描述 |
  |:--|:--|
  | `S_IRWXU` | 文件模式指示【所有者】**可读、可写和可执行** |
  | `S_IRUSR` | 文件模式指示【所有者】**可读** |
  | `S_IWUSR` | 文件模式指示【所有者】**可写** |
  | `S_IXUSR` | 文件模式指示【所有者】**可执行** |
  | `S_IRWXG` | 文件模式指示【群组】**可读、可写和可执行** |
  | `S_IRGRP` | 文件模式指示【群组】**可读** |
  | `S_IWGRP` | 文件模式指示【群组】**可写** |
  | `S_IXGRP` | 文件模式指示【群组】**可执行** |
  | `S_IRWXO` | 文件模式指示【其他人】**可读、可写和可执行** |
  | `S_IROTH` | 文件模式指示【其他人】**可读** |
  | `S_IWOTH` | 文件模式指示【其他人】**可写** |
  | `S_IXOTH` | 文件模式指示【其他人】**可执行** |

## fs.Stats 对象
  - 表示对象提供有关文件的信息
  - 从 `fs.stat()`、`fs.lstat()`、`fs.fstat()` 及其同步对应对象返回的对象属于此类型。
    + 若方法的 `options.bigint` 参数 `true`，则数值将为 `bigint` 而非 `number`，并且该对象将包含额外的以 `Ns` 为后缀的纳秒精度属性。
    + 数值为 number 版本
      ```js
        Stats {
          dev: 2114,
          ino: 48064969,
          mode: 33188,
          nlink: 1,
          uid: 85,
          gid: 100,
          rdev: 0,
          size: 527,
          blksize: 4096,
          blocks: 8,
          atimeMs: 1318289051000.1,
          mtimeMs: 1318289051000.1,
          ctimeMs: 1318289051000.1,
          birthtimeMs: 1318289051000.1,
          atime: Mon, 10 Oct 2011 23:24:11 GMT,
          mtime: Mon, 10 Oct 2011 23:24:11 GMT,
          ctime: Mon, 10 Oct 2011 23:24:11 GMT,
          birthtime: Mon, 10 Oct 2011 23:24:11 GMT 
        }
      ```
    + 数值为 bigint 版本
      ```js
        BigIntStats {
          dev: 2114n,
          ino: 48064969n,
          mode: 33188n,
          nlink: 1n,
          uid: 85n,
          gid: 100n,
          rdev: 0n,
          size: 527n,
          blksize: 4096n,
          blocks: 8n,
          atimeMs: 1318289051000n,
          mtimeMs: 1318289051000n,
          ctimeMs: 1318289051000n,
          birthtimeMs: 1318289051000n,
          atimeNs: 1318289051000000000n,
          mtimeNs: 1318289051000000000n,
          ctimeNs: 1318289051000000000n,
          birthtimeNs: 1318289051000000000n,
          atime: Mon, 10 Oct 2011 23:24:11 GMT,
          mtime: Mon, 10 Oct 2011 23:24:11 GMT,
          ctime: Mon, 10 Oct 2011 23:24:11 GMT,
          birthtime: Mon, 10 Oct 2011 23:24:11 GMT 
        }
      ```
### stats 对象属性
  | 参数 | 描述 |
  |:--|:--|
  | `dev` | 文件或者目录**所在设备ID** |
  | `ino` | 文件或者目录的**索引编号** |
  | `mode` | 使用数值形式代表的文件或目录的**权限标志** |
  | `nlink` | 文件或者目录的**硬连接数量** |
  | `uid` | 文件或者目录的**所有者的用户ID** |
  | `gid` | 文件或目录的**所有者的组ID** |
  | `rdev` | 字符设备文件或块设备文件**所在设备ID** |
  | `size` | **文件尺寸**(即：文件中的字节数) |
  | `atime` | “访问时间” - 文件数据**最近被访问**的时间 |
  | `mtime` | “修改时间” - 文件数据**最近被修改**的时间 |
  | `ctime` | “变化时间” - 文件状态**最近更改**的时间（修改索引节点数据） |
  | `birthtime` | “创建时间” - 文件**创建的时间**。 当文件被创建时设定一次 |

### stats 对象的方法
  - isDirectory()
  - isFile()
  - isSocket()
  - isFIFO()
  - isBlockDevice()
  - isCharacterDevice()
  - isSymbolicLink()
#### stats.isDirectory()
  - 功能：stats 信息对象是否为**文件系统的目录**
  - 语法：`stats.isDirectory`
  - 返回值<Boolean\>：
    + `true` 表示 `stats` 对象是目录，
    + `false` 表示 `stats` 对象不是目录，
  - 提示：若 stats 对象是从 `fs.lstat()` 获得的，则将始终返回 `false`。 
    + 因为 `fs.lstat()` 返回有关符号链接本身的信息，而不是它解析到的路径。

#### stats.isFile()
  - 功能：stats 信息对象是否为**文件系统的文件**
  - 语法：`stats.isFile()`
  - 返回值<Boolean\>：
    + `true` 表示 stats 对象是文件，
    + `false` 表示 stats 对象不是文件，
    
#### stats.isSocket()
  - 功能：stats 信息对象是否为**套接字**
  - 语法：`stats.isSocket()`
  - 返回值<Boolean\>：
    + `true` 表示 stats 对象是套接字，
    + `false` 表示 stats 对象不是套接字，

#### stats.isFIFO()
  - 功能：stats 信息对象是否为**先进先出 (FIFO) 管道**
  - 语法：`stats.isFIFO()`
  - 返回值 <Boolean\>
    + `true` 表示 stats 对象是先进先出 (FIFO) 管道，
    + `false` 表示 stats 对象不是先进先出 (FIFO) 管道，

#### stats.isBlockDevice()
  - 功能：stats 信息对象是否为**块设备**
  - 语法：`stats.isBlockDevice()`
  - 返回值 <Boolean\>
    + `true` 表示 stats 对象是块设备，
    + `false` 表示 stats 对象不是块设备，

#### stats.isCharacterDevice()
  - 功能：stats 信息对象是否为**字符设备**
  - 语法：`stats.isCharacterDevice()`
  - 返回值 <Boolean\>
    + `true` 表示 stats 对象是字符设备，
    + `false` 表示 stats 对象不是字符设备，

#### stats.isSymbolicLink()
  - 功能：stats 信息对象是否为**符号链接**
  - 语法：`stats.isSymbolicLink()`
  - 返回值 <Boolean\>
    + `true` 表示 stats 对象是符号链接，
    + `false` 表示 stats 对象不是符号链接，

## fs 模块常用方法
  - [flag 文件系统标志](https://nodejs.cn/api/fs.html#file-system-flags)
    | Flag | 描述 |
    |:--|:--|
    | `r`   | 以读取模式打开文件，如果文件不存在抛出异常 |
    | `r+`  | 以读写模式打开文件，如果文件不存在抛出异常 |
    | `rs`  | 以同步的方式读取文件 |
    | `rs+` | 以同步的方式读取和写入文件 |
    | `w`   | 以写入模式打开文件，如果文件不存在则创建 |
    | `wx`  | 类似`’w’`，但是如果文件路径存在，则文件写入失败 |
    | `w+`  | 以读写模式打开文件，如果文件不存在则创建 |
    | `wx+` | 类似`’w+'`，但是如果文件路径存在，则文件读写失败 |
    | `a`   | 以追加模式打开文件，如果文件不存在则创建 |
    | `ax`  | 类似`’a’`，但是如果文件路径存在，则文件追加失败 |
    | `a+`  | 以读取追加模式打开文件，如果文件不存在则创建 |
    | `ax+` | 类似`’a+'`，但是如果文件路径存在，则文件读取追加失败 |

  - fs 模块操作 文件和目录的常见 API
    | 类别 | fs 模块 API | 描述 |
    |:---|:---|:---|
    | 文件操作  | `fs.readFile()`          | 异步读取文件 |
    |           | `fs.readFileSync()`      | 同步读取文件 |
    |           | `fs.writeFile()`         | 异步写入文件 |
    |           | `fs.writeFileSync()`     | 同步写入文件 |
    |           | `fs.createReadStream()`  | 流式读取文件 |  
    |           | `fs.createWriteStream()` | 流式写入文件 |  
    |           | `fs.appendFile()`        | 异步追加写入文件末尾 |
    |           | `fs.appendFileSync()`    | 同步追加写入文件末尾 |
    |           | `fs.unlink()`            | 异步删除文件 |
    |           | `fs.unlinkSync()`        | 同步删除文件 |
    |           | `fs.copyFile()`          | 异步拷贝文件 |
    |           | `fs.copyFileSync()`      | 同步拷贝文件 |
    |           | `fs.rename()`            | 异步重命名文件 |
    |           | `fs.renameSync()`        | 同步重命名文件 |
    | 目录操作  | `fs.mkdir()`             | 异步创建目录(创建目录时，父目录必须存在) |
    |           | `fs.mkdirSync()`         | 同步创建目录 |
    |           | `fs.rmdir()`             | 异步删除目录 |
    |           | `fs.rmdirSync()`         | 同步删除目录 |
    |           | `fs.readdir()`           | 异步读取目录下所有文件 |
    |           | `fs.readdirSync()`       | 同步读取目录下所有文件 |
    | 文件和目录 | `fs.existsSync()`        |	判断文件/目录是否存在 |
    |           | `fs.stat()`              | 异步查看文件或目录状态 |
    |           | `fs.statSync()`          | 同步的查看文件或目录状态 |
    |           | `fs.stats.isFile()`      | 判断是否为文件 |
    |           | `fs.stats.isDirectory()` | 判断是否为目录 |
  
  - fs 文件普通方式和数据流方式区别
    + 程序打开一个文件是需要消耗资源的，stream 流式写入可以减少打开关闭文件的次数。
    + createWriteStream 流式写入方式适用于大文件写入或者频繁写入的场景，
    + writeFile 普通方式适合于写入频率较低的场景

### fs.readFile()
  - 功能：异步地读取文件的全部内容。
  - 语法：`fs.readFile(path[, options], callback)`
  - 参数:
    + path <String\> | <Buffer\> | <URL\> | <integer\>: 文件名或文件描述符
    + options <Object\> | <String\>：字符串时，则为指定 `encoding` 编码
      * encoding <String\> | <null\>: 字符编码，默认值： `null`
      * flag <String\>: 文件系统标志, 默认值： `'r'`。
      * signal <AbortSignal\>: 允许中止正在进行的读取文件
    + callback <Function\>
      * err <Error\> | <AggregateError\>: 操作的回调错误
      * data <String\> | <Buffer\>：文件的内容，未指定 `option.encoding` 编码，则返回原始缓冲区
    ```js
      const { readFile } = require('fs');
      const cb = function(err, data) {
        if (err) throw err;
        console.log(data);
      }

      readFile('/etc/passwd', cb); 
      readFile('/etc/passwd', 'utf8', cb);

      // 使用 AbortSignal 中止正在进行的请求。请求当被中止，回调将被使用 AbortError 调用：
      const controller = new AbortController();
      const signal = controller.signal;
      readFile(fileInfo[0].name, { signal },cb);
      // 终止读取文件请求
      controller.abort(); 
    ```
  - 提示：`fs.readFile()` 在缓冲整个文件时。尽可能优先通过 `fs.createReadStream()` 进行流式传输，从而最小化内存成本。
  - 提示：中止正在进行的请求：中止内部缓冲的 `fs.readFile` 执行，而不会中止单个操作系统请求。

### fs.readFileSync()
  - 功能：同步读取文件的全部内容
  - 语法：`fs.readFileSync(path[, options])`
  - 参数:
    + path <String\> | <Buffer\> | <URL\> | <integer\> 文件名或文件描述符
    + options <Object\> | <String\>
      * encoding <String\> | <null\> 字符编码，默认值： `null`
      * flag <String\> 文件系统标志。 默认值： `'r'`。
  - 返回值：<String\> | <Buffer\>：文件的内容，未指定 `option.encoding` 编码，则返回原始缓冲区
    ```js
      const { readFileSync } = require('fs');
      console.log(readFileSync('/etc/passwd')); 
    ```

### fs.writeFile()
  - 功能：将数据异步地写入文件，文件已存在则替换该文件。
  - 语法：`fs.writeFile(file, data[, options], callback)`
  - 参数:
    + file <String\> | <Buffer\> | <URL\> | <integer\> 文件名或文件描述符
      * `file` 为文件描述符时，其行为类似于直接调用 `fs.write()`
    + data <String\> | <Buffer\> | <TypedArray\> | <DataView\>：文件的内容
      * `data` 为缓冲区时，忽略 `options.encoding` 选项
    + options <Object\> | <String\>：字符串时，则为指定 `encoding` 编码
      * encoding <String\> | <null\> 字符编码，默认值： `'utf8'`
      * mode <integer\> 默认值： `0o666`，仅影响新创建的文件
      * flag <String\> 文件系统标志。 默认值： `'w'`。
      * signal <AbortSignal\> 允许中止正在进行的写入文件
    + callback <Function\>
      * err <Error\> | <AggregateError\>：操作的回调错误
    ```js
      import { writeFile } from 'fs';
      import { Buffer } from 'buffer';

      // 缓冲区数据
      const data = new Uint8Array(Buffer.from('你好 Node.js'));
      writeFile('message.txt', data, (err) => {
        if (err) throw err;
        console.log('已写入到该文件中!');
      });

      // 字符串数据
      writeFile('message.txt', '你好 Node.js', 'utf8', callback); 
    ```
  - 在同一个文件上多次使用 `fs.writeFile()` 而不等待回调是不安全的。 
    + 对于这种情况，建议使用 `fs.createWriteStream()`。
  - `fs.writeFile` 是一个便捷的方法，其在内部执行多次 `write` 调用以写入传给它的缓冲区。 
    + 对于性能敏感的代码，建议使用 `fs.createWriteStream()`。

### fs.writeFileSync()
  - 功能：将数据同步写入文件
  - 语法：`fs.writeFileSync(file, data[, options])`
  - 参数:
    + file <String\> | <Buffer\> | <URL\> | <integer\> 文件名或文件描述符
    + data <String\> | <Buffer\> | <TypedArray\> | <DataView\>：文件的内容
    + options <Object\> | <String\>：字符串时，则为指定 `encoding` 编码
      * encoding <String\> | <null\> 字符编码，默认值： `'utf8'`
      * mode <integer\> 默认值： `0o666`，仅影响新创建的文件
      * flag <String\> 文件系统标志。 默认值： `'w'`。
  - 返回值<undefined\>

### fs.createReadStream() 
  - 功能：流式读取文件
  - 语法：`fs.createReadStream(path[, options])`
  - 参数：
    + path <String\> | <Buffer\> | <URL\>：文件
    + options <String\> | <Object\>
      * flags <String\> 文件系统标志。默认值：`'r'`
      * encoding <String\> 字符编码，默认值：`null`
      * fd <integer\> | <FileHandle\> 默认值：`null`
      * mode <integer\> 默认值：`0o666`
      * autoClose <Boolean\> 默认值：`true`
      * emitClose <Boolean\> 默认值：`true`
      * start <integer\>: 读取文件数据的起始字节，取值 `[0, Number.MAX_SAFE_INTEGER]` 范围
      * end <integer\>：读取文件数据的结束字节， 默认值：`Infinity`
      * highWaterMark <integer\> 默认值：`64 * 1024`
      * fs <Object\> | <null\>：可以覆盖 `open`、`read`、`close` 的相应 fs 操作，默认值：`null`
      * signal <AbortSignal\> | <null\> 默认值：`null`
  - 返回值 <fs.ReadStream\>： 文件数据流
    ```js
      import { createReadStream } from 'fs';
      
      // 读取 100 个字节长的文件的最后 10 个字节的示例：
      createReadStream('sample.txt', { start: 90, end: 99 });

      //创建读取流对象
      const rs = fs.createReadStream('test.txt');
      // 绑定 data 事件, chunk 块、大块
      rs.on('data',chunk=>{
          console.log(chunk.length);// 输出是字节大小,对应 64KB
          console.log(chunk.toString())
      })

      // end 可选事件
      rs.on('end',()=>{
          console.log('读取完成')
      })
    ```
  - `options.fd` 参数指定
    + `options.start` 参数将被省略或 `undefined`，读取则从当前文件位置顺序读取。
    +  `path` 参数将被忽略并使用指定的文件描述符（即：不会触发 `open` 事件）。
  - `options.autoClose` 参数
    + 当为 `true` 时，则在 `'error'` 或 `'end'` 时，文件描述符将自动关闭。
    + 当为 `false` 时：则即使出现错误，文件描述符也不会关闭。关闭它并注意文件描述符泄漏问题 
  - `options.fs` 参数指定
    + 默认必须覆盖 `read` 事件 
    + 若 `options.fd` 参数未提供 ，则需要覆盖 `open` 事件 
    + 若 `options.autoClose` 参数为 `true`，则还需要覆盖 `close` 事件
  - 默认情况下，流将在销毁后触发 `close` 事件。 将 `options.emitClose` 参数设置为 `false` 以更改此行为。

### fs.createWriteStream()
  - 功能：流式写入文件
  - 语法：`fs.createWriteStream(path[, options])`
  - 参数：
    + path <String\> | <Buffer\> | <URL\>：文件
    + options <String\> | <Object\>
      * flags <String\> 文件系统标志。默认值：`'r'`
      * encoding <String\> 字符编码，默认值：`null`
      * fd <integer\> | <FileHandle\> 默认值：`null`
      * mode <integer\> 默认值：`0o666`
      * autoClose <Boolean\> 默认值：`true`
      * emitClose <Boolean\> 默认值：`true`
      * start <integer\>: 读取文件数据的起始字节，取值 `[0, Number.MAX_SAFE_INTEGER]` 范围
      * highWaterMark <Number\> 默认值：`16384`
      * fs <Object\> | <null\>：可以覆盖 `open`、`write`、 `writev`、 `close` 的相应 fs 操作，默认值：`null`
      * signal <AbortSignal\> | <null\> 默认值：`null`
  - 返回值 <fs.WriteStream\>：文件数据流
    ```js
      import { createWriteStream } from 'fs';

      const ws = createWriteStream('./清平调其一.txt')
      ws.write('清平调·其一')
      ws.write('唐·李白')
      ws.write('云想衣裳花想容，')
      ws.write('春风拂槛露华浓。')
      ws.write('若非群玉山头见，')
      ws.write('会向瑶台月下逢。')
      ws.end()
    ```
  - `options.flags` 参数
    + 修改文件而非替换文件时，需将默认的 `w` 值设置为 `r+`
  - `options.fd` 参数指定
    + `options.start` 参数将被省略或 `undefined`，读取则从当前文件位置顺序读取。
    +  `path` 参数将被忽略并使用指定的文件描述符（即：不会触发 `open` 事件）。
  - `options.autoClose` 参数
    + 当为 `true` 时，则在 `'error'` 或 `'finish'` 时，文件描述符将自动关闭。
    + 当为 `false` 时：则即使出现错误，文件描述符也不会关闭。关闭它并注意文件描述符泄漏问题 
  - `options.fs` 参数指定
    + 默认必须覆盖 `write` 事件或 `writev` 事件 (在没有 `writev()` 的情况下覆盖 `write()` 会降低性能，因为某些优化 `_writev()` 将被禁用)。
    + 若 `options.fd` 参数未提供 ，则需要覆盖 `open` 事件 
    + 若 `options.autoClose` 参数为 `true`，则还需要覆盖 `close` 事件
  - 默认情况下，流将在销毁后触发 `close` 事件。 将 `options.emitClose` 参数设置为 `false` 以更改此行为。

### fs.appendFile()
  - 功能：异步地将数据追加到文件，若该文件尚不存在，则创建该文件
  - 语法：`fs.appendFile(path, data[, options], callback)`
  - 参数:
    + path <String\> | <Buffer\> | <URL\> | <Number\> 文件名或文件描述符
    + data <String\> | <Buffer\>：文件的内容
    + options <Object\> | <String\>：字符串时，则为指定 `encoding` 编码
      * encoding <String\> | <null\> 字符编码，默认值：` 'utf8'`
      * mode <integer\> 默认值： `0o666`，仅影响新创建的文件
      * flag <String\> 文件系统标志。 默认值：`'a'`。
    + callback <Function\>
      * err <Error\>： 操作的回调错误
    ```js
      import { appendFile } from 'fs';

      appendFile('message.txt', '追加到文件的数据', (err) => {
        if (err) throw err;
        console.log('已将数据追加到文件中！');
      });
    ```
  - 提示：可将 path 指定为已打开用于追加（使用 `fs.open()` 或 `fs.openSync()`）数字文件描述符。文件描述符不会自动关闭。
    ```js
      import { open, close, appendFile } from 'fs';

      function closeFd(fd) {
        close(fd, (err) => {
          if (err) throw err;
        });
      }

      open('message.txt', 'a', (err, fd) => {
        if (err) throw err;

        try {
          appendFile(fd, '追加的数据', 'utf8', (err) => {
            closeFd(fd);
            if (err) throw err;
          });
        } catch (err) {
          closeFd(fd);
          throw err;
        }
      });
    ```

### fs.appendFileSync()
  - 功能：同步地将数据追加到文件中，若该文件尚不存在，则创建该文件
  - 语法：`fs.appendFileSync(path, data[, options])`
  - 参数:
    + path <String\> | <Buffer\> | <URL\> | <number\> 文件名或文件描述符
    + data <String\> | <Buffer\>：文件的内容
    + options <Object\> | <String\>：字符串时，则为指定 `encoding` 编码
      * encoding <String\> | <null\> 字符编码，默认值：`'utf8'`
      * mode <integer\> 默认值：`0o666`，仅影响新创建的文件
      * flag <String\> 文件系统标志。 默认值：`'a'`。
    ```js
      import { appendFileSync } from 'fs';

      try {
        appendFileSync('message.txt', '追加的数据');
        console.log('数据已追加到了文件中！');
      } catch (err) {
        /* 处理报错 */
      }
      
      appendFileSync('message.txt', '追加的数据', 'utf8'); 
    ```
  - 提示：可将 path 指定为已打开用于追加（使用 `fs.open()` 或 `fs.openSync()`）数字文件描述符。 文件描述符不会自动关闭。
    ```js
      import { openSync, closeSync, appendFileSync } from 'node:fs';

      let fd;

      try {
        fd = openSync('message.txt', 'a');
        appendFileSync(fd, '追加的数据', 'utf8');
      } catch (err) {
        /* 处理报错 */
      } finally {
        if (fd !== undefined)
          closeSync(fd);
      }
    ```

### fs.unlink()
  - 功能：异步地删除文件（或符号链接）
  - 语法：`fs.unlink(path, callback)`
  - 参数:
    + path <String\> | <Buffer\> | <URL\>：删除文件的路径
    + callback <Function\>
      * err <Error\>：操作的回调错误
    ```js
      import { unlink } from 'fs';
     
      unlink('path/file.txt', (err) => {
        if (err) throw err;
        console.log('path/file.txt 文件已删除！');
      });
    ```

### fs.unlinkSync()
  - 功能：同步地删除文件
  - 语法：`fs.unlinkSync(path)`
  - 参数:
    + path <String\> | <Buffer\> | <URL\>：删除文件的路径
  - 返回值<undefined\>

### fs.copyFile()
  - 功能：异步地拷贝文件（将 src 复制到 target），若 target 已经存在，其原内容则会被覆盖
  - 语法：`fs.copyFile(src, target[, mode], callback)`
  - 参数:
    + src <String\> | <Buffer\> | <URL\> 要复制的源文件名
    + target <String\> | <Buffer\> | <URL\> 复制操作的目标文件名
    + mode <integer\> 复制操作的修饰符。 默认值：`0`。
      * 指定复制操作的行为。可以创建由两个或多个值的按位或组成的掩码
      + 例：`fs.constants.COPYFILE_EXCL` | `fs.constants.COPYFILE_FICLONE`。
    + callback <Function\>
    ```js
      import { copyFile, constants } from 'fs';

      function callback(err) {
        if (err) throw err;
        console.log('source.txt 内容已复制到 target.txt 中');
      }

      // target.txt 在默认情况下创建或覆盖。
      copyFile('source.txt', 'target.txt', callback);

      // 通过使用 COPYFILE_EXCL，若 target.txt 存在，则操作将失败。
      copyFile('source.txt', 'target.txt', constants.COPYFILE_EXCL, callback);      
    ```

### fs.copyFileSync()
  - 功能：同步地拷贝文件（将 src 复制到 target），若 target 已经存在，其原内容则会被覆盖
  - 语法：`fs.copyFileSync(src, target[, mode])`
  - 参数:
    + src <String\> | <Buffer\> | <URL\> 要复制的源文件名
    + target <String\> | <Buffer\> | <URL\> 复制操作的目标文件名
    + mode <integer\> 复制操作的修饰符。 默认值： `0`。
    ```js
      import { copyFileSync, constants } from 'node:fs';

      // target.txt 在默认情况下创建或覆盖。
      copyFileSync('source.txt', 'target.txt');
      console.log('source.txt 内容已复制到 target.txt 中');

      // 通过使用 COPYFILE_EXCL，若 target.txt 存在，则操作将失败。
      copyFileSync('source.txt', 'target.txt', constants.COPYFILE_EXCL);
    ```  

### fs.rename()
  - 功能：异步地重命名文件。（将 oldPath 复制到 newPath），若 newPath 已经存在，则会被覆盖）
  - 语法：`fs.rename(oldPath, newPath, callback)`
  - 参数：
    + oldPath <String\> | <Buffer\> | <URL\>：要重命名的源文件
    + newPath <String\> | <Buffer\> | <URL\>：重命名操作的目标文件
    + callback <Function\>
      * err <Error\>：操作的回调错误
    ```js
      import { rename } from 'fs';

      rename('oldFile.txt', 'newFile.txt', (err) => {
        if (err) throw err;
        console.log('文件重命名完成!');
      });
    ```

### fs.renameSync()
  - 功能：同步地重命名文件。（将 oldPath 复制到 newPath），若 newPath 已经存在，则会被覆盖）
  - 语法：`fs.renameSync(oldPath, newPath)`
  - 参数：
    + oldPath <String\> | <Buffer\> | <URL\>：要重命名的源文件
    + newPath <String\> | <Buffer\> | <URL\>：重命名操作的目标文件
  - 返回值<undefined\>

### fs.mkdir()
  - 功能：异步地创建目录。
  - 语法：`fs.mkdir(path[, options], callback)`
  - 参数：
    + path <String\> | <Buffer\> | <URL\>：目录
    + options <Object\> | <integer\>
      * recursive <Boolean\> 是否应创建父目录，默认值：`false` （`false` 时，创建目录父目录必须存在，否则报错）
      * mode <String\> | <integer\> 目录的模式（`Windows` 操作系统中不支持），默认值：`0o777`。
    + callback <Function\>
      * err <Error\>：操作的回调错误
      * path <String\> | <undefined\> 仅当 `recursive` 设置为 `true` 才返回目录路径
    ```js
      import { mkdir } from 'fs';

      // 创建 ./tmp/a/apple 目录，不管 ./tmp 目录中是否存在 ./tmp/a 目录
      mkdir('./tmp/a/apple', { recursive: true }, (err) => {
        if (err) throw err;
      });
    ```
  - 在 Windows 操作系统中，即使使用递归，在根目录上使用 `fs.mkdir()` 也会导致错误：
    ```js
      import { mkdir } from 'fs';

      mkdir('/', { recursive: true }, (err) => {
        // => [Error: EPERM: operation not permitted, mkdir 'C:\']
      });
    ```
 
### fs.mkdirSync()
  - 功能：同步地创建目录。
  - 语法：`fs.mkdirSync(path[, options])`
  - 参数：
    + path <String\> | <Buffer\> | <URL\>：目录
    + options <Object\> | <integer\>
      * recursive <Boolean\> 是否应创建父目录，默认值：`false`（`false` 时，创建目录父目录必须存在，否则报错）
      * mode <String\> | <integer\>：目录的模式（`Windows` 操作系统中不支持）。默认值：`0o777`。
  - 返回值 <String\> | <undefined\>：仅当 `recursive` 设置为 `true` 才返回创建的第一个目录路径

### fs.rmdir()
  - 功能：异步地删除目录。
  - 语法：`fs.rmdir(path[, options], callback)`
  - 参数：
    + path <String\> | <Buffer\> | <URL\>：目录
    + options <Object\>
      * maxRetries <integer\>  表示重试次数（若 `recursive` 为 `true`，则忽略此选项）。 默认值：`0`。
      * recursive <boolean\>（已弃用） 若为 `true`，则执行递归目录删除。 在递归模式下，操作将在失败时重试。 默认值：`false`
      * retryDelay <integer\> 重试之间等待的毫秒为单位时间（若 `recursive` 为 `false`，则忽略此选项）。 默认值： `100`。
    + callback <Function\>
      * err <Error\>：操作的回调错误
  - `options.maxRetries` 参数：若遇到 `EBUSY`、`EMFILE`、`ENFILE`、`ENOTEMPTY `、`EPERM` 错误时，Node.js 将在每次尝试时以 `retryDelay` 毫秒的线性退避等待时间重试该操作。
  - `path` 参数为文件（而非目录）时，则在 `Windows` 上会导致 `ENOENT` 错误，在 `POSIX` 上会导致 `ENOTDIR` 错误。
  - 类似于 `Unix` 命令的 `rm -rf` 操作，则 `options` 选项参数须为 `{ recursive: true, force: true }` 的 `fs.rm()`

### fs.rmdirSync()
  - 功能：同步地删除目录。
  - 语法：`fs.rmdirSync(path[, options])`
  - 参数：
    + path <String\> | <Buffer\> | <URL\>
    + options <Object\>
      * maxRetries <integer\> 表示重试次数（若 `recursive` 为 `true`，则忽略此选项）。 默认值：`0`。
      * recursive <Boolean\>（已弃用） 若为 `true`，则执行递归目录删除。 在递归模式下，操作将在失败时重试。 默认值：`false`
      * retryDelay <integer\> 重试之间等待的毫秒为单位时间（若 `recursive` 为 `false`，则忽略此选项）。 默认值： `100`。
  - 返回值<undefined\>

### fs.readdir()
  - 功能：异步地读取目录的内容
  - 语法：`fs.readdir(path[, options], callback)`
  - 参数：
    + path <String\> | <Buffer\> | <URL\>：目录
    + options <String\> | <Object\>
      * encoding <String\>：指定用于传给回调的文件名的字符编码。默认值：`'utf8'`
      * withFileTypes <Boolean\> 默认值：`false`
      * recursive <Boolean\> 默认值：`false`
    + callback <Function\>
      * err <Error\>：操作的回调错误
      * files <string[]\> | <Buffer[]\> | <fs.Dirent[]\>：目录中文件名的数组，不包括 `.` 和 `..`
  - `options.encoding` 参数为 `'buffer'`，则返回的文件名将作为 `Buffer` 对象传入
  - `options.withFileTypes` 参数为 `true`，则 `files` 数组将包含 `fs.Dirent` 对象。

### fs.readdirSync()
  - 功能：同步地读取目录的内容
  - 语法：`fs.readdirSync(path[, options])`
  - 参数：
    + path <String\> | <Buffer\> | <URL\>：目录
    + options <String\> | <Object\>
      * encoding <String\>：指定用于传给回调的文件名的字符编码。默认值：`'utf8'`
      * withFileTypes <Boolean\> 默认值：`false`
      * recursive <Boolean\> 默认值：`false`
  - 返回值<String[]\> | <Buffer[]\> | <fs.Dirent[]\>：目录中文件名的数组，不包括 `.` 和 `..`

### fs.existsSync()
  - 功能：检测文件或目录是否存在。
  - 语法：`fs.existsSync(path)`
  - 参数：
    + path <String\> | <Buffer\> | <URL\>: 文件路径或目录路径
  - 返回值 <Boolean\>： `true` 存在，`false` 不存在
    ```js
      import { existsSync } from 'fs';

      if (existsSync('/etc/passwd'))
      console.log(' “/etc/passwd” 此路径存在！');
    ```

### fs.stat()
  - 功能：异步地查看文件或文件夹的信息状态
  - 语法：`fs.stat(path[, options], callback)`
  - 参数：
    + path <String\> | <Buffer\> | <URL\>：
    + options <Object\>
      * bigint <Boolean\> 返回的 `fs.Stats` 对象中的数值是否应为 `bigint`。 默认值：`false`。
    + callback <Function\>
      * err <Error\>：操作的回调错误
      * stats <fs.Stats\>：文件或文件夹的信息
    ```js
      /* 目录结构
        |- txtDir
        |-- file.txt
        |- app.js 
      */
      import { stat } from 'fs';

      const pathsToCheck = ['./txtDir', './txtDir/file.txt'];
      for (let i = 0; i < pathsToCheck.length; i++) {
        stat(pathsToCheck[i], (err, stats) => {
          console.log(stats.isDirectory());
          console.log(stats);
        });
      }
      /*
        true
        Stats {
          dev: 16777220,
          mode: 16877,
          nlink: 3,
          uid: 501,
          gid: 20,
          rdev: 0,
          blksize: 4096,
          ino: 14214262,
          size: 96,
          blocks: 0,
          atimeMs: 1561174653071.963,
          mtimeMs: 1561174614583.3518,
          ctimeMs: 1561174626623.5366,
          birthtimeMs: 1561174126937.2893,
          atime: 2019-06-22T03:37:33.072Z,
          mtime: 2019-06-22T03:36:54.583Z,
          ctime: 2019-06-22T03:37:06.624Z,
          birthtime: 2019-06-22T03:28:46.937Z
        }
      */
      /*
        false
        Stats {
          dev: 16777220,
          mode: 33188,
          nlink: 1,
          uid: 501,
          gid: 20,
          rdev: 0,
          blksize: 4096,
          ino: 14214074,
          size: 8,
          blocks: 8,
          atimeMs: 1561174616618.8555,
          mtimeMs: 1561174614584,
          ctimeMs: 1561174614583.8145,
          birthtimeMs: 1561174007710.7478,
          atime: 2019-06-22T03:36:56.619Z,
          mtime: 2019-06-22T03:36:54.584Z,
          ctime: 2019-06-22T03:36:54.584Z,
          birthtime: 2019-06-22T03:26:47.711Z
        }
      */
    ```
  - 不建议在调用 `fs.open()`、`fs.readFile()`、`fs.writeFile()` 之前，使用 `fs.stat()` 检查文件是否存在。
    + 而应该直接打开/读取/写入文件，并在文件不可用时处理引发的错误。
  - 检查文件是否存在而不对其进行操作，推荐使用 `fs.access()`。

### fs.statSync()
  - 功能：同步地查看文件或文件夹的信息状态
  - 语法：`fs.statSync(path[, options])`
  - 参数：
    + path <String\> | <Buffer\> | <URL\>
    + options <Object\>
      * bigint <Boolean\> 返回的 `fs.Stats` 对象中的数值是否应为 `bigint`。 默认值：`false`。
      * throwIfNoEntry <Boolean\> 如果文件系统条目不存在，是否会抛出异常，而不是返回 `undefined`。 默认值：`true`。
  - 返回值<fs.Stats\>：文件或文件夹的信息

## 参考资料
  - [Node.js v20.9.0 中文网](https://nodejs.cn/api/fs.html)
  - [Node基础 【fs模块】](https://blog.csdn.net/qq787203167/article/details/130421714)