---
sidebar: auto
title: TypeScript 类型系统的 JS
date: 2023-10-18
tags:
 - TypeScript 语言
categories: 
 - TypeScript
---

## 前言
  - TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发
  - JavaScript 是一门解释型语言，没有编译阶段，所以它是动态类型 
    + 动态类型：指在运行时才会进行类型检查，这种语言的类型错误往往**会导致运行时错误**
    + 而 TypeScript 的类型系统，在很大程度上弥补了 JavaScript 的缺点
  - JavaScript 的类型分为两种：
    + 原始（基本）数据类型（Primitive data types）, 也称为原始值（primitive value)
    + 对象类型（Object types）, 也称为引用值（reference value），是一种非原始（non-primitive）数据类型

### 原始（基本）数据类型
  - Number 表示：数字，包括整数和浮点数。
  - String 表示：文本字符串。
  - Boolean 表示：逻辑上的真或假。
  - undefined 表示：未定义的值。
  - null 表示：空值。
  - Symbol 表示：唯一标识符，常用于对象属性的键名。
  - BigInt 表示：长整数，超出了 Number 类型范围内的整数。

### 对象类型
  - Object 表示: 对象
  - Array 表示: 数组
  - Function 表示: 函数
  - RegExp 表示：正则内置对象
  - Date 表示：日期内置对象
  - Math 表示：数学公式内置对象
  - Set 表示：字典内置对象
  - Map 表示：集合内置对象  
  - ...



## 参考资料
  - [TypeScript 官网](https://www.typescriptlang.org/)
  - [TypeScript 中文网](https://ts.nodejs.cn/)
  - [TypeScript 中文网](https://www.tslang.cn/docs/home.html)
  - [TypeScript 入门教程](https://ts.xcatliu.com/)