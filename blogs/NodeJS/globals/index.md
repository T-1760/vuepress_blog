---
sidebar: auto
title: 全局对象和全局变量
date: 2023-10-18
tags:
 - 全局对象
 - 全局变量
categories: 
 - Node.js
---

## 全局对象
  - 这些对象在所有模块中都可用。 
  - 以下变量看似全局的，但实际上不是。 它们只存在于模块作用域内
    + `__dirname`
    + `__filename`
    + `exports`
    + `module`
    + `require()`
  - 由于模块是 Node.js 引用的主要组成，所以也会将这些变量成为 “全局变量”

## global 和 globalThis 
  - `global` （旧版概念）已同步 ECMAScript 规范更名为 `globalThis` ：全局的命名空间对象。
  - 在浏览器中，顶层作用域传统上是全局作用域。 再全局作用域 `var something` 将定义一个新的全局变量，ECMAScript 模块除外。 
  - 在 Node.js 中，顶层作用域并不是全局作用域； 每个模块内的 `var something` 对于该模块而言是本地的，无论是 CommonJS 模块还是 ECMAScript 模块。

## 参考资料
  - [Node.js 中文网](https://nodejs.cn/api/globals.html#global)