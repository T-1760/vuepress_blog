---
sidebar: auto
title: ES 新特性
date: 2023-10-18
tags:
 - new specific
 - 新特性
categories: 
 - ECMAScript
---

### `?.` 可选链 （Optional Chaining）
  - 可选链 （Optional Chaining）是 `ES2020(ES11)` 新增的特性
  -  功能：在查询具有多层级的对象时，不再需要进行冗余的各种前置校验
    + 可选链是一种先检查属性是否存在，再尝试访问该属性的运算符
    ```js
      let age = useruser.info && user.info.getAge && user.info.getAge()
      
      /**
       * 若 user 没有 info 属性或 info 没有 getAge 方法
       * 直接访问 user.info.getAge() 会命中 Uncaught TypeError: Cannot read property... 错误
       */  
      
      // 采用 ?. 可选链，可简化
      let age = user?.info?.getAge?.()
    ```
  - 语法
    + `obj?.prop`
    + `obj?.[expr]`
    + `arr?.[index]`
    + `func?.(args)`

### `??` 空值合并运算符
  - 空值合并运算符 （Nullish coalescing Operator） 是 `ES2021(ES12)` 新增的特性，
  - 功能：当左侧的操作数为 `null` 或 `undefined` 时，返回其右侧操作数，反之返回其左侧操作数。
    + 与 `||` 逻辑或操作符不同，`||` 会在左侧操作数为（隐式为） `falsy` 值时，返回右侧操作数。
    + 使用 `||` 为变量设置默认值时，可能会遇到意料之外的行为
    ```js
      const user = {
        level: 0,
      };
      var level_1 = user.level || '暂无等级' // 暂无等级
      var level_1 = user.level ?? '暂无等级' // 0
      var level_2 = user.other_level ?? '暂无等级' // 暂无等级
    ```
