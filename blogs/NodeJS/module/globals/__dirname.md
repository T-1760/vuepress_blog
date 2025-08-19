---
sidebar: auto
title: __dirname
date: 2023-10-18
tags:
 - __dirname
 - 模块作用域
categories: 
 - 全局变量
---

## __dirname 当前模块目录名
  - 功能：当前模块的目录名。 这与 `__filename` 的 `path.dirname()` 相同。
  - 返回值<String 字符串类型>：当前模块目录路径字符串
  - 示例：从 `/Users/mjr` 运行 `node example.js`
  ```js
    console.log(__dirname); // "/Users/mjr"
    
    console.log(path.dirname(__filename)); // "/Users/mjr"
  ```
  
## 参考资料
- [Node.js 中文网](https://nodejs.cn/api/modules.html#__dirname)