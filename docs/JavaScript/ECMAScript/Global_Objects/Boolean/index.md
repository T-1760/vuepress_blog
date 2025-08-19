---
sidebar: auto
title: Boolean 布尔
date: 2023-10-18
tags:
 - Boolean
 - 布尔
categories: 
 - 标准内置对象
---

## 前言
  - 以下对象参数值具有的布尔初始值为 `false`
    + `0`
    + `-0`
    + `null`
    + `false`
    + `NaN`
    + `undefined`
    + `""` 空字符串
  - 以下对象参数值具有的布尔初始值为 `true`
    + 除以上 7 种情况外的任何对象
    + `{}` 空对象
    + `[]` 空数组
    + `"false"` 字符串
  - 【温馨提示】：基本类型中的布尔值 `true` 和 `false` 不应与值为 true 和 false 的 `Boolean` 对象弄混。
    ```js
      const boolObj = new Boolean(false);
      console.log(typeof boolObj) // 'object'
      if (boolObj) {
        console.log("这里的代码会被执行")
      }
      const bool = false;
      console.log(typeof bool) // 'boolean
      if (bool) {
        console.log("这里的代码不会执行")
      }

    ```
  - 【温馨提示】：将一个非布尔值转化成布尔值时，尽可能使用 双重非`!!`运算符 或 `Boolean` 对象转换函数（不要使用 `Boolean` 构造函数的方式）来处理
    ```js
      const good = Boolean(expression); // use this 
      const very_good = !!expression; // ...or this
      const too_bad = new Boolean(expression); // don't use this!
    ```
  - 【温馨提示】：非严格相等（==）来比较一个对象和布尔原始值时, 注意最终比较的是什么
      + `[]` 是真值，而 `[] == false` 也同时成立的原因是：非严格比较 `[] == false` 会将 `[]` 的原始值和 false 进行比较。
      + `[]` 的原始值时，JavaScript 引擎会首先调用 `[].toString()`。其结果为 `""`，也是最终和 `false` 一起比较的值。
      + `[] == false` 等价于 `[].toString() == false` 等价于 `"" == false` 最终等价于 `true`
    ```js
      if ([]) {
        console.log("[] 逻辑结果 true ！"); //  "[] 逻辑结果 true ！"
      }
      if ([] == false) {
        console.log("[] == false 逻辑结果 true ！"); // "[] == false 逻辑结果 true ！"
      }
      
    ```
 
## Boolean 的创建
### 布尔字面量
  ```js
    let bool = false
  ```
### Boolean 布尔对象
  ```js
    let bool = Boolean('false') // true
    // 不推荐这样创建
    let bool = Boolean(false) // false 
    let bool = Boolean(true) // true
  ```
### new Boolean() 构造函数（不推荐）
  - 创建一个 Boolean 对象，该对象不是一个（`true` 或 `false`）布尔原始值.
  ```js
    console.log(typeof new Boolean(true)) // "object"，
    console.log(typeof true) // "boolean"，
    console.log(new Boolean('false') == true) // true
    console.log(new Boolean(true) === 123) // false
    console.log(Boolean(true) === true) // true 
  ```
## Boolean 的实例方法
### bool.toString()
  - 功能：根据对象的值返回字符串 `'true'` 或 `'false'`
  - 语法：`bool.toString()`
  - 返回值<String 字符串类型>：表示特定 Boolean 对象的字符串
    ```js
      console.log(new Boolean(true).toString(), false.toString()); // 'true' 或 'false'
    ```
### bool.valueOF()
  - 功能：返回 Boolean 对象的原始值
  - 语法：`bool.valueOF()`
  - 返回值<Boolean 布尔类型>：给定 Boolean 对象的原始值
    ```js
      console.log(new Boolean().valueOf(), true.valueOf(), false.valueOf()); // false true false
    ```
## 参考资料
  - [MDN Boolean](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)