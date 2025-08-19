---
sidebar: auto
title: __filename
date: 2023-10-18
tags:
 - __filename
 - 模块作用域
categories: 
 - 全局变量
---

## __filename 当前模块文件名名
  - 功能：当前模块的文件名。这是当前模块文件的已解析符号链接的绝对路径。
    + 对于主程序，这不一定与命令行中使用的文件名相同。
  - 返回值<String 字符串类型>：当前模块文件路径字符串
  - 示例：从 `/Users/mjr` 运行 `node example.js`
  ```js
    console.log(__filename); // "/Users/mjr/example.js"

    console.log(__dirname); // "/Users/mjr"
  ```
  - 示例：给定 a（`/Users/mjr/app/a.js`）和 b（`/Users/mjr/app/node_modules/b/b.js`） 两个模块，其中 b 是 a 的依赖
  ```js
    // a.JS
    console.log(__filename); // "/Users/mjr/app/node_modules/b/b.js"

    // b.JS
    console.log(__filename); // "/Users/mjr/app/a.js"
  ```

## 参考资料
- [Node.js 中文网](https://nodejs.cn/api/modules.html#__filename)