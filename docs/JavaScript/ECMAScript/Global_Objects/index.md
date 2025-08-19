---
sidebar: auto
title: 标准内置对象
date: 2023-10-18
tags:
 - Global_Objects
 - 标准内置对象
 - ECMAScript 标准内置对象
categories: 
 - 标准内置对象
---

## 前言
  - JavaScript 标准内置对象（Standard_built-in_objects）也可称为 “Global_Objects 全局的对象”（不应与 global 对象混淆），标准内置对象（Global_Objects 全局的对象）是处在全局作用域里的多个对象。
  - 全局作用域中的其他对象则可由用户的脚本创建，或由宿主程序提供。
    + NodeJS 宿主环境的全局对象是 global，浏览器宿主环境的全局对象为 window，
    + ECMAScript 规定全局对象叫做 global，但浏览器环境把 window 作为全局对象。
    + 浏览器环境中还附加提供了宿主内置对象。可查阅 [Web API 接口参考](https://developer.mozilla.org/zh-CN/docs/Web/API)。
  - 而 global 对象以在全局作用域里通过使用 this 访问到（前提是再 ES5 非严格模式下，否则得到 `undefined`）。其实全局作用域包含全局对象中的属性，包括它可能继承来的属性
    + 浏览器把 global 对象作为 window 对象的一部分实现，因此，所有的全局属性和函数都是window 对象的属性和方法。(故此在浏览器环境中，全局作用域里通过使用 this 会访问到 window 对象)
    ```js
      // 非 "use strict" 模式;
      var global = function(){
        return this;
      }();

      // "use strict" 模式;
      var global = function(){
        return this; // undefined
      }();
    ```

## 常见的标准内置对象的分类
### 值属性
  - 这些全局属性返回一个简单值，这些值没有自己的属性和方法。
    + `globalThis`
    + `Infinity`
    + `NaN`
    + `undefined`
### 函数属性
  - 全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者
    + `eval()`
    + `isFinite()`
    + `isNaN()`
    + `parseFloat()`
    + `parseInt()`
    + `decodeURI()`
    + `decodeURIComponent()`
    + `encodeURI()`
    + `encodeURIComponent()`
### 基本对象
  - 基本对象是定义或使用其他对象的基础。
    + `Object`
    + `Function`
    + `Boolean`
    + `Symbol`
### 错误对象
  - 错误对象是一种特殊的基本对象。它们拥有基本的 Error 类型，同时也有多种具体的错误类型。
    + `Error`
    + `AggregateError`
    + `EvalError`
    + `RangeError`
    + `ReferenceError`
    + `SyntaxError`
    + `TypeError`
    + `URIError`
### 数字和日期对象
  - 用来表示数字、日期和执行数学计算的对象。
    + `Number`
    + `BigInt`
    + `Math`
    + `Date`
### 字符串
  - 这些对象表示字符串并支持操作字符串。
    + `String`
    + `RegExp`
### 可索引的集合对象
  - 这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。
    + `Array`
    + `Int8Array`
    + `Uint8Array`
    + `Uint8ClampedArray`
    + `Int16Array (en-US)`
    + `Uint16Array`
    + `Int32Array`
    + `Uint32Array`
    + `BigInt64Array`
    + `BigUint64Array (en-US)`
    + `Float32Array`
    + `Float64Array`
### 使用键的集合对象
  - 这些对象在存储数据时会使用到键，包括可迭代的 Map 和 Set，支持按照插入顺序来迭代元素。
    + `Map`
    + `Set`
    + `WeakMap`
    + `WeakSet`
### 结构化数据
  - 这些对象表示操作结构化的缓冲区数据，或使用 JSON（JavaScript Object Notation）编码的数据。
    + `ArrayBuffer`
    + `SharedArrayBuffer`
    + `Atomics`
    + `DataView`
    + `JSON`
### 内存管理对象
  - 这些对象会与垃圾回收机制产生交互。
    + `WeakRef`
    + `FinalizationRegistry`
### 控制抽象对象
  - 控件抽象对象可以帮助构造代码，尤其是异步代码（例如不使用深度嵌套的回调）。
    + `Iterator`
    + `AsyncIterator`
    + `Promise`
    + `GeneratorFunction`
    + `AsyncGeneratorFunction`
    + `Generator`
    + `AsyncGenerator`
    + `AsyncFunction`
### 反射
  - `Reflect`
  - `Proxy`
### 国际化
  - ECMAScript 核心的附加功能，用于支持多语言处理。
    + `Intl`
    + `Intl.Collator`
    + `Intl.DateTimeFormat`
    + `Intl.DisplayNames`
    + `Intl.DurationFormat`
    + `Intl.ListFormat`
    + `Intl.Locale`
    + `Intl.NumberFormat`
    + `Intl.PluralRules`
    + `Intl.RelativeTimeFormat`
    + `Intl.Segmenter`

## 参考资料
  - [MDN：JavaScript 标准内置对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)
  - [第四章：global 全局变量](https://www.jianshu.com/p/f1306ef5903f)
  - [[JavaScript]JavaScript中的原型和原型链](https://zhuanlan.zhihu.com/p/42432753)
  - [【JS交互基础】几个特殊的对象 Global、Window、Arguments、this](https://blog.csdn.net/qq_39335404/article/details/132444282)