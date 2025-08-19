---
sidebar: auto
title: path 模块
date: 2023-10-18
tags:
 - path 模块
 - Node.js 核心模块
categories: 
 - 核心模块
---

## path 路径
  - path 模块用于处理文件和目录的路径的实用方法
  - 相对路径
    + `'./node.txt'`：【当前目录】下的 `node.txt` 文件（也可简写：`'/node.txt'`）
    + `'../node.txt'`：【当前目录的上一级目录】下的 `node.txt` 文件
  - 绝对路径
    + `'D:/Program Files'`：Windows 操作系统下的绝对路径
    + `'/usr/bin'`：Linux 操作系统下的绝对路径
  - 注意：相对路径中所谓的“当前目录”，指的是“命令行的工作目录”（即：项目目录），而并非是“文件的所在目录”

### Windows 与 POSIX
  - POSIX（Portable Operating System Interface of UNIX）UNIX可移植操作系统接口，
    + 它定义了一套标准的操作系统接口和工具，
    + 最初由 IEEE 在 1988 年首次发布基于 UNIX 制定的针对操作系统应用接口的国际标准。
  - path 模块会根据运行 Node.js 不同操作系统而进行对应（风格的路径）操作结果
    + Windows 与 POSIX 中，使用 `path.basename('C:\temp\myfile.html')` 函数。 
      ```js
        // 在 POSIX 上：
        path.basename('C:\\temp\\myfile.html'); // 'C:\\temp\\myfile.html'

        // 在 Windows 上：
        path.basename('C:\\temp\\myfile.html'); // 'myfile.html'
      ```
  - 使用 `path.win32` 在任何操作系统上获得 Windows 风格文件路径，可得到一致的结果
  - 使用 `path.posix` 在任何操作系统上获得 POSIX 风格文件路径，可得到一致的结果
    ```js
      path.win32.basename('C:\\temp\\myfile.html'); // 'myfile.html'
      path.posix.basename('/tmp/myfile.html'); // 'myfile.html'
    ```
  - 温馨提示：在 Windows 上 Node.js 遵循单驱动器工作目录的理念。 
    + 当使用驱动器路径且不带反斜杠时就能体验到该特征。
    + 例：`fs.readdirSync('c:\\')` 可能返回与 `fs.readdirSync('c:')` 不同的结果 

## path 属性
  - path.delimiter
  - path.sep
  - path.posix
  - path.win32

### path.delimiter
  - 功能：提供特定于平台的**路径定界符**。
  - 返回值<String\>：
    + Windows 上的路径定界符：`;`
    + POSIX 上的路径定界符：`:`
  ```js
    /* 在 POSIX 上 */
    console.log(process.env.PATH); // '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'
    process.env.PATH.split(path.delimiter);// ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']

    /* 在 Windows 上 */
    console.log(process.env.PATH); // 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'
    process.env.PATH.split(path.delimiter); // ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']
  ```

### path.sep
  - 功能：提供特定于平台的路径**片段分隔符**。
    + 在 Windows 上，`/` 正斜杠和 `\` 反斜杠都被接受为路径段分隔符； 
    + path 方法只认可 Windows 上 `\` 反斜杠的分段分隔符。
  - 返回值<String\>：
    + Windows 上的片段分隔符：`\`
    + POSIX 上的片段分隔符: `/`
  ```js
    /* 在 POSIX 上 */
    'foo/bar/baz'.split(path.sep); // ['foo', 'bar', 'baz']
    
    /* 在 Windows 上 */
    'foo\\bar\\baz'.split(path.sep); // ['foo', 'bar', 'baz']
  ```

### path.posix
  - 功能：POSIX 平台的特定访问
    + 常通过`require('path').posix` 或 `require('path/posix')` 访问
  - 返回值<Object\>：POSIX 平台访问对象

### path.win32
  - 功能：Windows 平台的特定访问
    + 常通过`require('path').win32` 或 `require('path/win32')` 访问
  - 返回值<Object\>：Windows 平台访问对象

## path 方法
  - basename()
  - dirname()
  - extname()
  - format()
  - isAbsolute()
  - join()
  - normalize()
  - parse()
  - relative()
  - resolve()
  - toNamespacedPath()
### path.basename()
  - 功能：返回路径的最后一部分。类似 Unix 中的 `basename` 命令。忽略尾随目录分隔符（即：`path.sep`）。
  - 语法：`path.basename(path[, suffix])`
  - 参数：
    + path <String\>：路径
    + suffix <String\> 要删除的可选后缀
  - 返回值<String\>：
    ```js
      path.basename('/foo/bar/baz/asdf/quux.html'); // 'quux.html'
      path.basename('/foo/bar/baz/asdf/quux.html', '.html'); // 'quux'
    ```
  - Windows 通常以不区分大小写的方式处理文件名（包括文件扩展名）。
    + 在 Windows 上 `C:\\foo.html` 和 `C:\\foo.HTML` 指的是同一个文件，
    + 但 path.basename 方法不会。 它将扩展名视为区分大小写的字符串：
    ```js
      path.win32.basename('C:\\foo.html', '.html'); // 'foo'
      path.win32.basename('C:\\foo.HTML', '.html'); // 'foo.HTML'
    ```

### path.dirname()
  - 功能：返回路径参数的目录名，类似于 Unix 的 `dirname` 命令。忽略尾随目录分隔符（即：`path.sep`）。
  - 语法：`path.dirname(path)`
  - 参数：
    + path <String\>: 路径
  - 返回值<String\>：
    ```js
      path.dirname('/foo/bar/baz/asdf/quux'); // '/foo/bar/baz/asdf'
    ```

### path.extname()
  - 功能：返回路劲参数的扩展名，
  - 语法：`path.extname(path)`
  - 参数：
    + path <String\>：路径 
  - 返回值<String\>：
    + 路径参数的最后一部分中从最后一次出现的 `.` 字符到字符串的结尾。 
    + 若路径参数的最后一部分中没有 `.` 或除了路劲参数的基本名称（即：`path.basename()`）的第一个字符之外没有 `.` 字符，则返回 `''` 空字符串。
    ```js
      path.extname('index.html');// '.html'
      path.extname('index.coffee.md');// '.md'
      path.extname('index.');// '.'
      path.extname('index');// ''
      path.extname('.index');// ''
      path.extname('.index.md');// '.md'
    ```

### path.format()
  - 功能：从对象返回路径字符串，与 `path.parse()` 相反
  - 语法：`path.format(pathObject)`
  - 参数：
    + pathObject <Object\> 具有以下属性的对象：
      * dir <String\>
      * root <String\>
      * base <String\>
      * name <String\>
      * ext <String\>
  - 返回值<String\>：
  - 当向 pathObject 提供属性时，存在一个属性优先于另一个属性的组合：
    + 若 pathObject 对象参数存在 `dir` 属性，则忽略其中的 `root` 属性
    + 若 pathObject 对象参数存在 `base` 属性，则忽略其中的 `ext` 和 `name` 属性
    ```js
      /* 在 POSIX 上 */
      // 若`dir`、`root`、`base`存在，则忽略 `root` 返回 `${dir}${path.sep}${base}`。
      path.format({
        root: '/ignored',
        dir: '/home/user/dir',
        base: 'file.txt',
      }); // '/home/user/dir/file.txt'
      // 若只存在 `root` 或 `dir` 与 `root` 相等，则平台的分隔符不会被包含。忽略 `ext` 。
      path.format({
        root: '/',
        base: 'file.txt',
        ext: 'ignored',
      }); // '/file.txt'      
      // 若为指定 `base`，则使用 `name` + `ext`。
      path.format({
        root: '/',
        name: 'file',
        ext: '.txt',
      }); // '/file.txt'
      // 若 `ext` 未指定 `.`字符，则会自动添加。
      path.format({
        root: '/',
        name: 'file',
        ext: 'txt',
      }); // '/file.txt'

      /* 在 Windows 上 */
      path.format({
        dir: 'C:\\path\\dir',
        base: 'file.txt',
      }); // 'C:\\path\\dir\\file.txt'
    ```

### path.isAbsolute()
  - 功能：路劲参数是否为绝对路径
  - 语法：`path.isAbsolute(path)`
  - 参数：
    + path <String\>：路径
  - 返回值<Boolean\>：true 是绝对路径， false 不是绝对路径
    + `path` 参数为 `‘’` 空字符串是，返回 `false`
    ```js
      /* 在 POSIX 上 */
      path.isAbsolute('/foo/bar'); // true
      path.isAbsolute('/baz/..');  // true
      path.isAbsolute('qux/');     // false
      path.isAbsolute('.');        // false

      /* 在 Windows 上 */
      path.isAbsolute('//server');    // true
      path.isAbsolute('\\\\server');  // true
      path.isAbsolute('C:/foo/..');   // true
      path.isAbsolute('C:\\foo\\..'); // true
      path.isAbsolute('bar\\baz');    // false
      path.isAbsolute('bar/baz');     // false
      path.isAbsolute('.');           // false
    ```

### path.join()
  - 功能：将所有给定的 path 片段（使用特定于平台的分隔符作为定界符）连接在一起，然后规范化生成的路径
  - 语法：`path.join([...paths])`
  - 参数：
    + ...paths <String\> 路径片段的序列
  - 返回值<String\>：
    + 零长度的 path 片段被忽略。 
    + 若连接的路径字符串最终是零长度字符串，则返回 `'.'` 表示**当前工作目录**
    ```js
      path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');// '/foo/bar/baz/asdf'

      path.join('foo', {}, 'bar'); // Throws 'TypeError: Path must be a string. Received {}'
    ```

### path.normalize()
  - 功能：规范化给定的路径参数，解析 `'..'` 和 `'.'` 片段
  - 语法：`path.normalize(path)`
  - 参数：
    + path <String\>：路径
  - 返回值 <String\>：
    + `path` 参数是零长度字符串，则返回 `'.'`，表示**当前工作目录**。
  - 当找到多个连续的（POSIX 上的 `/` 和 Windows 上的 `\` 或 `/`）路径片段分隔符时，则它们将被平台特定（POSIX 上的 `/ `和 Windows 上的 `\`）路径片段分隔符的单个实例替换。 保留尾随的分隔符。
    ```js
      /* 在 POSIX 上 */
      path.normalize('/foo/bar//baz/asdf/quux/..'); // '/foo/bar/baz/asdf'

      /* 在 Windows 上 */
      path.normalize('C:\\temp\\\\foo\\bar\\..\\'); // 'C:\\temp\\foo\\'
    ```
  - 由于 Windows 识别多个路径分隔符，两个分隔符都将被 Windows 首选分隔符 `\` 的实例替换：
    ```js
      path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar'); // 'C:\\temp\\foo\\bar'
    ```

### path.parse()
  - 功能：返回一个其属性表示路径参数重要元素的对象。忽略尾随目录分隔符（即：`path.sep`）。
  - 语法：`path.parse(path)`
  - 参数：
    path <String\>：路径
  - 返回值<Object\>：
    + dir 属性<String\>
    + root 属性<String\>
    + base 属性<String\>
    + name 属性<String\>
    + ext 属性<String\>
    ```js
      /* 在 POSIX 上 */
      path.parse('/home/user/dir/file.txt');
      // { root: '/',
      //   dir: '/home/user/dir',
      //   base: 'file.txt',
      //   ext: '.txt',
      //   name: 'file' }
      ┌─────────────────────┬────────────┐
      │          dir        │    base    │
      ├──────┬              ├──────┬─────┤
      │ root │              │ name │ ext │
      "  /    home/user/dir / file  .txt "
      └──────┴──────────────┴──────┴─────┘
      (请无视 path 字符串中的空格，只为便于布局)

      /* 在 Windows 上 */
      path.parse('C:\\path\\dir\\file.txt');
      // { root: 'C:\\',
      //   dir: 'C:\\path\\dir',
      //   base: 'file.txt',
      //   ext: '.txt',
      //   name: 'file' }
      ┌─────────────────────┬────────────┐
      │          dir        │    base    │
      ├──────┬              ├──────┬─────┤
      │ root │              │ name │ ext │
      " C:\      path\dir   \ file  .txt "
      └──────┴──────────────┴──────┴─────┘
      (请无视 path 字符串中的空格，只为便于布局)
    ```

### path.relative()
  - 功能：根据当前工作目录返回从 from 到 to 的相对路径
  - 语法：`path.relative(from, to)`
  - 参数：
    + from <String\>
    + to <String\>
  - 返回值<String\>：
    + 若 `from` 和 `to` 参数都解析为相同的路径（分别调用 `path.resolve()` 之后），则返回零长度字符串  
    + 若 `from` 或 `to` 参数为零长度字符串，则将使用当前工作目录而不是零长度字符串
    ```js
      /* 在 POSIX 上 */
      path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');// '../../impl/bbb'

      /* 在 Windows 上 */
      path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb'); // '..\\..\\impl\\bbb'
    ```

### path.resolve()
  - 功能：将路径或路径片段的序列解析为绝对路径。
    + 路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径。 
    + 例：路径序列段的顺序： `/foo`、`/bar`、`baz`，`path.resolve('/foo', '/bar', 'baz')` 将返回 `/bar/baz`，
    + 因为 `'baz'` 不是绝对路径，但 `'/bar' + '/' + 'baz'` 是绝对路径。
  - 语法：`path.resolve([...paths])`
  - 参数：
    + ...paths <String\> 路径或路径片段的序列。零长度的路径片段被忽略
  - 返回值<String\>：解析的绝对路径
    + 生成的路径被规范化，并删除尾部斜杠（除非路径解析为根目录）
    + 若 ...paths 为传入，将返回**当前工作目录的绝对路径**
    + 若解析 path 片段序列之后，还没有生成绝对路径，则**使用当前工作目录**
    ```js
      path.resolve('/foo/bar', './baz'); // '/foo/bar/baz'
      path.resolve('/foo/bar', '/tmp/file/'); // '/tmp/file'

      // 假设当前工作目录为 /home/myself/node，
      path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'); // '/home/myself/node/wwwroot/static_files/gif/image.gif'
    ```

### path.toNamespacedPath()
  - 功能：仅适用于 Windows 系统上，返回路径参数的等效**命名空间前缀路径**
  - 语法：`path.toNamespacedPath(path)`
  - 参数：
    + path <String\>：路径
  - 返回值 <String\>：
    + `path` 参数若不是字符串，则不加修改直接返回 `path` 参数。
    + 在 POSIX 系统上，该方法无效并，且始终不加修改直接返回 `path` 参数。
    
## 参考资料
  - [Node.js v20.9.0 中文网](https://nodejs.cn/api/path.html)
  - [3、Node.js------Node的核心模块](https://blog.csdn.net/Ezzbb/article/details/129542912)