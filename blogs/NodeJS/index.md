---
sidebar: auto
title: Node.js
date: 2023-10-18
tags:
 - Node.js
categories: 
 - Node.js
---

## Node.js 介绍
  - Node.js 是一个基于 `Chrome V8` 引擎的 JavaScript 运行时环境（即：`runtime`）。实际上 Node.js 是对 `Google V8` 引擎进行了封装。Node.js 常运行在服务器端，主要用于操作服务器文件、数据库、http 协议等系统底层的功能。
  - 模块是 Node.js 应用程序的基本组成部分，一个 Node.js 文件就是一个模块（即：文件和模块一一对应）
    + Node.js 文件可能是 JavaScript 代码（`.js`）、JSON （`.json`）、编译过的 C/C++ 扩展（`.node`）。
  - 每个 Node.js 文件（即：模块）里定义的变量、函数、类都是私有的。在其内部不需要有命名空间，不需要担心变量的污染
  - 模块可以多次加载，但只会在第一次加载时运行一次，然后运行结果就被缓存

## Node.js 模块机制
  - Node.js 模块主要分为**核心模块**和**文件模块**两大类
    + 核心模块（原生模块 / 内置模块）：在 Node.js 启动时被加载
    + 文件模块：动态加载模块。加载文件模块的工作主要由 `module` 原生模块来实现完成。原生模块在启动时已经被加载，而文件模块则需要通过调用 `require` 方法来加载。
  - 模块的加载优先级（核心模块 > 文件模块）
    + 核心模块： Node.js 源码编译时写入到二进制文件中
    + 文件模块：代码运行时，动态加载
  - 模块缓存优化原则特点
    + 提高模块加载速度
    + 当前模块不存在，则经历一次完整加载流程
    + 模块加载完成后，使用路径作为索引进行缓存
  - Node.js 明确指出在文件模块中，只有 `exports` 对象和 `module.exports` 对象的属性和方法能暴露给外部（通过 `require` 对象进行调用），文件模块中的其他对象外部是无法获取的。
    + `exports` 和 `module.exports` 指向的是同一个对象，最终 `require()` 函数返回的是 `module.exports` 中的数据
  - Node.js 环境和浏览器环境中 javaScript 的区别
    + Node.js 环境 JavaScript 的组成：**ES核心 + 模块 API**
    + 浏览器 环境 JavaScript 的组成：**ES核心 + Web API**

### require() 加载模块函数
  - 功能：用于加载 Node.js 的模块
  - 语法：`const loadModule = require(mod)`
  - 参数：
    + mod<String 字符串类型>：加载外部的 核心模块名称 或 文件模块文件路径
  - 返回值<Object 对象类型>：加载外部模块的 `module.exports` 暴露对象
  ```js
    /* 加载 Node.js 核心模块 */
    const fs = require('fs');
    const http = require('http');
    const os = require('os');
    const path = require('path');
    
    /* 加载 Node.js 文件模块 */
    var data = require('./data.json');
    
    var foo1 = require('./foo');
    var foo2 = require('./foo.js');
    var foo3 = require('/home/user/foo');
    var foo4 = require('/home/user/foo.js');
    // foo1 ~ foo4 中保存的是同一个模块的导出对象。
  ```
  - 使用 `require(mod)` 导入自定义模块时，若 mod 参数省略了文件的扩展名，则 Node.js 会按顺序分别尝试加载以下的文件:
    1. 按照确切的文件名进行加载
    1. 补全 `.js` 扩展名进行加载
    1. 补全 `.json` 扩展名进行加载
    1. 补全 `.node` 扩展名进行加载
    1. 加载失败，终端报错

### 模块加载流程
  - 1、路径分析：确定目标模块位置
    + 路径标识符（常见  `.`、`/`、`..` 等标识符）
    + 非路径标识符（常见于核心模块）
  - 2、文件定位：确定目标模块中的具体文件及文件类型
  - 3、编译执行：采用对应的方式对模块内容进行编译，执行返回可用 `exports` 对象
    + 将某个具体类型的文件按照相应的方式进行编译和执行
    + 创建新对象，按路径载入，完成编译执行
    + JS 文件的编译执行
      1. 使用 `fs` 模块同步读入目标文件内容
      1. 对内容进行语法包装，生成可执行JS函数
      1. 调用函数时传入 `exports`、`module`、`require`等属性值
    + JSON 文件编译执行
      1. 将读取到的内容通过 `JSON.parse()` 进行解析
  - 加载路程示意图
    ```mermaid
      graph TD
      1[开始 require（mod）]-->2{是否存在模块缓存中？}
      2 --是--> 5
      2 --否--> 2.1{是否为核心模块}
      2.1 --是--> 3{是否存在核心模块缓存中？}
      2.1 --否--> 4.1(相对路径) --> 4.2(绝对路径) --> 4.3(补充扩展名) --> 4.4(缓存文件模块)  --> 5 
      3 --是--> 5 
      3 --否--> 3.1(加载核心模块) --> 3.2(缓存核心模块) --> 5[返回 module.exports]

      subgraph 加载文件模块
        4.1
        4.2
        4.3
      end
    ```

### 核心模块
  - `fs` 模块：用于操作文件
  - `http` 模块：用于操作 HTTP 服务器和客户端
  - `path` 模块：用于处理文件路径和目录路径
  - `os` 模块：用于处理基本的系统操作
  - `crypto` 模块：用于加密和解密功能（包含 OpenSSL 散列、HMAC、加密、解密、签名、以及验证的函数的一整套封装）
  - `querystring` 模块：用于解析和格式化网址查询字符串参数
  - `url` 模块：用于网址处理和解析
  - 

### 文件模块
  - NodeJS 会根据不同文件模块的后缀名来选择加载方法。主要分为三种类型
    + 文件同名优先级： `.js` > `.node` > `.json` 

    | 类型 | 描述 |
    |:--|:--|
    | `.js`   | 通过 `fs` 模块同步读取 javaScript 文件并编译执行。|
    | `.json` | 读取 JSON 文件，通过 `JSON.parse` 解析加载。|
    | `.node` | 通过 C/C++ 进行编写的 Addon。通过 `dlopen` 方法进行加载。|

## Node.js 全局对象和全局变量/内置对象
  - Node.js 中所有全局变量/内置对象（`global`自身除外）都是 `global` 全局对象的属性。
    + 浏览器环境中全局对象是 `window`
    + Node.js 环境中全局对象是 `global`
  - `global` 全局变量对象
  - `__dirname` 全局变量：文件夹路径
  - `__filename` 全局变量：文件路劲
  - `Buffer` 全局变量：缓冲区对象
  - `console` 全局变量：打印对象
  - `module` 全局变量：模块信息对象
  - `exports` 全局变量：创建导出模块对象
  - `require` 全局变量：加载模块对象
  - `process` 全局变量：进程对象
  - `timers`全局变量：定时器对象
    +  `setTimeout()`
    +  `clearTimeout()`
    +  `setInterval()`
    +  `clearInterval()` 
  - 温馨提示：Node.js 环境中 `console` 和 `timers` 与浏览器环境全局变量名称相同，但实现的的和浏览器无关

##  JavaScript 在浏览器与 Node.js 中的区别
  - [Node.js 核心模块（内置模块）](https://juejin.cn/post/7043604543883444260#heading-2)
    | 浏览器环境 | Node 环境 |
    |:--|:--|
    | 客户端技术，在浏览器运行 | 服务器端技术，与Java，PHP，C++等是后端语言（平台环境）|
    | 有多种解析器可以使用 | 只能运行于Chrome的V8引擎下 |
    | 有兼容问题 | 只有一个解析器，不存在兼容问题|
    | ES语法，浏览器API（BOM，DOM）| ES语法，node内置API（模块），第三方API（模块）|
    | 主要用于网页 DOM 操作，实现用户交互效果 | 主要用于实现服务器端的运行逻辑（如：访问数据库，文件读写等）|
  - 如何判断当前脚本运行在浏览器还是 Node.js 环境中？
    + 通过判断 Global 全局对象是否为 `window`，如果不为 `window` 则表示运行在 Node.js环境中。 `this === window ? 'browser' : 'node'`

## 参考资料
  - [Node【初识Node】](https://yifan.blog.csdn.net/article/details/130167773?spm=1001.2014.3001.5502) 
  - [Web 全站体系 Nodejs 简介](https://senior-frontend.pages.dev/node)
  - [Node.js模块的概念](https://codeleading.com/article/86824079299/)
  - [Node.js的学习](https://blog.csdn.net/qq_45549584/article/details/125994589)
  - [Node.js核心模块](https://zhuanlan.zhihu.com/p/559700583)
  - [nodejs 中文网文档](https://nodejs.cn/api/documentation.html)