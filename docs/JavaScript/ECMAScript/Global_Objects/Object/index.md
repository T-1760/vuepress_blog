---
sidebar: auto
title: Object 对象
date: 2023-10-18
tags:
 - Object
 - 对象
categories: 
 - 标准内置对象
---

## Object 的创建
### 对象字面量
  ```js
    let obj = { name: 'Tang', age: 18 }
  ```
### Object 对象\
  ```js
    let obj = Object({ name: 'Tang', age: 18 })
    let strObj = Object('Tang')
  ```
### new Object() 构造函数
  ```js
    let obj = new Object({ name: "Tony", age: 18 })
    // 创建空对象
    const emptyObj_1 = new Object();
    const emptyObj_2 = new Object(undefined);
    const emptyObj_3 = new Object(null);
    // 创建 布尔对象
    const boolObj_1 = new Object(true); // 等价于 new Boolean(true);
    const boolObj_2 = new Object(Boolean()); // 等价于 new Boolean(false);
  ```

## Object 静态方法
### Object.assign()
  - 将一个或多个源对象的所有**可枚举自有属性的值**复制到目标对象中。
### Object.create()
  - 使用指定的原型对象和属性创建一个新对象。
### Object.defineProperty()
  - 向对象**添加一个**由给定描述符描述的命名属性。
### Object.defineProperties()
  - 向对象**添加多个**由给定描述符描述的命名属性。
### Object.freeze()
  - 冻结一个对象。其他代码**不能删除或更改其任何属性**。
### Object.isFrozen()
  - 判断对象**是否已经冻结**。
### Object.keys()
  - 返回一个给定对象包含所有自有可枚举字符串**属性名**的数组。
### Object.values()
  - 返回一个给定对象包含所有自有可枚举字符串**属性值**的数组。
### Object.entries()
  - 返回包含给定对象自有可枚举字符串属性的所有 `[key, value]` 数组。
### Object.fromEntries()
  - 从一个包含 `[key, value]` 对的可迭代对象中返回一个新的对象（`Object.entries` 的反操作）。
### Object.getOwnPropertyDescriptor()
  - 返回一个对象的**已命名属性**的属性描述符。
### Object.getOwnPropertyDescriptors()
  - 返回一个对象包含**所有自有属性**的属性描述符的对象。
### Object.setPrototypeOf()
  - 设置对象的原型（即内部 `[[Prototype]]` 属性）。
### Object.getPrototypeOf()
  - 返回指定对象的原型（内部的 `[[Prototype]]` 属性）。
### Object.getOwnPropertyNames()
  - 返回一个给定对象包含所有自有**可枚举和不可枚举属性名称**的数组。
### Object.getOwnPropertySymbols()
  - 返回一个给定对象包含所有自有 **`symbol` 属性**的数组。
### Object.hasOwn()
  - 如果指定属性是指定对象的自有属性，则返回 `true`，否则返回 `false`。如果该属性是继承的或不存在，则返回 `false`。
### Object.is()
  - 比较两个值是否相同。所有 `NaN` 值都相等（这与 `==` 使用的 `IsLooselyEqual` 和 `===` 使用的 `IsStrictlyEqual` 不同）。
### Object.seal()
  - 防止其他代码删除对象的属性。
### Object.isSealed()
  - 判断对象是否已经封闭。
### Object.isExtensible()
  - 判断对象是否可扩展。
### Object.preventExtensions()
  - 防止对象的任何扩展。

## Object 实例属性
  - 在 `Object.prototype` 上定义的属性，并由所有 obj 实例共享。
    + `Object.prototype.constructor` => `obj 实例.constructor`
    + `Object.prototype.__proto__` => `obj 实例.__proto__`
### Object.prototype.constructor
  - 创建该实例对象的构造函数。
  - 对于普通的 Object 实例，初始值为 Object 构造函数。其它构造函数的实例都会从它们各自的 `Constructor.prototype` 对象中继承 `constructor` 属性。
### Object.prototype.__proto__ 已弃用
  - 指向实例对象在实例化时使用的原型对象。

## Object 实例方法
### obj.hasOwnProperty()
  - 功能：表示一个对象自身是否包含指定的属性，该方法并不会查找原型链上继承来的属性。
    + 温馨提示：浏览器支持 `Object.hasOwn(obj, prop)` 时，请优先予 `obj.hasOwnProperty(prop)` 使用
    + Object.hasOwn() 可解决 “obj 实例对象自定义的 `hasOwnProperty()` 方法” 的问题
      ```js
        const foo = {
          hasOwnProperty() {
            return false;
          },
          bar: "得不到的永远在期待",
        };

        foo.hasOwnProperty("bar"); //  false
        // 解决方案
        Object.hasOwn(foo, "bar"); //  true
        Object.prototype.hasOwnProperty.call(foo, "bar"); //  true
        ({}).hasOwnProperty.call(foo, "bar"); // true

      ```
  - 语法：`obj.hasOwnProperty(prop)`
  - 参数：
    + prop<String 字符串类型 | Symbol 代表类型>：要测试的属性的字符串名称或者 Symbol。
  - 返回值<Boolean 布尔类型>：prop 是自有属性，则返回 `true`；否则返回 `false`
    ```js
      const fruits = ["Apple", "Banana", "Watermelon", "Orange"];
      fruits.hasOwnProperty(3); // true
      fruits.hasOwnProperty(4); // false

      const obj = {};
      obj.hasOwnProperty("prop"); // false
      obj.prop = "exists";
      // 获取 obj 实例的直接属性 hasOwnProperty 返回 true
      obj.hasOwnProperty("prop"); // true
      
      // obj 实例继承 Object 的属性 hasOwnProperty 返回 false
      obj.hasOwnProperty("toString"); // false
      obj.hasOwnProperty("hasOwnProperty"); // false

      // in 关键字不区分继承属性和直接属性
      'prop' in obj // true
      'toString' in obj // true
      'hasOwnProperty' in obj // true
    ```

### Obj.prototype.isPrototypeOf()
  - 功能：表示该方法所调用的对象是否在指定对象的原型链中。简而言之，检查一个（Obj）对象是否存在于另一个（obj）对象的原型链中
  - 语法：`Obj.prototype.isPrototypeOf(obj)`
  - 参数：
    + obj <Object 对象类型>: 检测其原型链的对象。
  - 返回值<Boolean 布尔类型>：Obj 对象（即 this）是否位于 obj 的原型链中。当 obj 不是一个对象（即基本类型）时，直接返回 false
    ```js
      class Foo {}
      class Bar extends Foo {}
      class Baz extends Bar {}
      
      const foo = new Foo(); // 原型链：foo: Foo --> Object
      const bar = new Bar(); // 原型链：bar: Bar --> Foo --> Object
      const baz = new Baz(); // 原型链：baz: Baz --> Bar --> Foo --> Object
      
      console.log(Baz.prototype.isPrototypeOf(baz)); // true
      console.log(Baz.prototype.isPrototypeOf(bar)); // false
      console.log(Baz.prototype.isPrototypeOf(foo)); // false
      console.log(Bar.prototype.isPrototypeOf(baz)); // true
      console.log(Bar.prototype.isPrototypeOf(foo)); // false
      console.log(Foo.prototype.isPrototypeOf(baz)); // true
      console.log(Foo.prototype.isPrototypeOf(bar)); // true
      console.log(Object.prototype.isPrototypeOf(baz)); // true      
    ```
### obj.propertyIsEnumerable()
  - 功能：表示指定属性是否是对象的可枚举自有属性。
    + 大多数内置属性默认情况下是不可枚举的，而用户创建的对象属性通常是可枚举的（除非明确指定为不可枚举）。
      ```js
        const arr = ["是可枚举的"];

        arr.propertyIsEnumerable(0); // true
        arr.propertyIsEnumerable("length"); // false

        Math.propertyIsEnumerable("random"); // false
        globalThis.propertyIsEnumerable("Math"); // false
      ```
  - 语法：`obj.propertyIsEnumerable(prop)`
  - 参数：
    + prop<String 字符串类型 | Symbol 代表类型>：要测试的属性的字符串名称或者 Symbol。
  - 返回值<Boolean 布尔类型>： prop 是可枚举且自有的属性，则返回 `true`；否则返回 `false`
    ```js
      const o = {};
      const a = [];
      o.prop = "是可枚举的";
      a[0] = "是可枚举的";

      o.propertyIsEnumerable("prop"); // true
      a.propertyIsEnumerable(0); // true

      const sym_1 = Symbol("可枚举的");
      const sym_2 = Symbol("不可枚举的");
      const symObj = {
        [sym_1]: "是可枚举的",
      };
      Object.defineProperty(symObj, sym_2, {
        value: "是不可枚举的",
        enumerable: false,
      });

      symObj.propertyIsEnumerable(sym_1); // true
      symObj.propertyIsEnumerable(sym_2); // false
    ```
### obj.toLocaleString()
  - 功能：调用 toString() 方法。
  - 语法：`obj.toLocaleString()`
  - 返回值<String 字符串类型>：调用 `this.toString()` 的返回值
    ```js
      const obj = {
        toString() {
          return "My Object";
        },
      };
      console.log(obj.toLocaleString()); // "My Object"
    ```
  - 各内置对象重写`toLocaleString` 方法
    + 此方法是为了给对象一个通用的 `toLocaleString` 方法, 协助内置对象重写了 `toLocaleString` 以提供特定于语言环境的格式
    + 重写 `toLocaleString([locales][,options])` 方法的所有对象最多只能接受 `locales`<String 字符串类型> 和 `options`<Object 对象类型> 两个参数
    + 内置对象 Array 重写 `toLocaleString` 方法：`Array.prototype.toLocaleString()` 返回数组中每个元素，按照指定语言环境的分隔符拼接成的字符串。
      ```js
        const arr = [4, 7, 10];

        const euroPrices = arr.toLocaleString("fr", {
          style: "currency",
          currency: "EUR", // 欧洲地区
        });
        // "4,00 €,7,00 €,10,00 €"        
      ```
    + 内置对象 Number 重写 `toLocaleString` 方法：`Number.prototype.toLocaleString()` 按照指定语言环境的数字（常用数字分隔符）显示
      ```js
        const num = 2901234564;  // "2901234564"

        const zhNumber = num.toLocaleString("zh"); // "2,901,234,564"
        const deNumber = num.toLocaleString("de"); // "2.901.234.564"
        const frNumber = num.toLocaleString("fr"); // "2 901 234 564"
        const frNumber = num.toLocaleString("ar"); // '2,901,234,564'
        const frNumber = num.toLocaleString("ar-EG"); // '٢٬٩٠١٬٢٣٤٬٥٦٤'
      ```
    + 内置对象 Date 重写 `toLocaleString` 方法：`Date.prototype.toLocaleString()`按照指定语言环境的日期显示
      ```js
        const date = new Date(Date.UTC(2023, 9, 25, 10, 10, 10)); 
        // "Mon Sep 25 2023 18:10:10 GMT+0800 (中国标准时间)"
        
        const zhDate = date.toLocaleString("zh"); // '2023/09/25 10:10:10'
        const deDate = date.toLocaleString("de"); // "25.9.2023, 18:10:10"
        const frDate = date.toLocaleString("fr"); // "25/09/2023, 18:10:10"
        const frDate = date.toLocaleString("ar"); // '25‏/10‏/2023 6:10:10 م'
        const frDate = date.toLocaleString("ar-EG"); // '٢٥‏/١٠‏/٢٠٢٣ ٦:١٠:١٠ م'
      ```
    + 内置对象 TypedArray 重写 `toLocaleString` 方法：`TypedArray.prototype.toLocaleString()`
    + 内置对象 BigInt 重写 `toLocaleString` 方法：`BigInt.prototype.toLocaleString()`
### obj.toString()
  - 功能：返回一个代表该对象的字符串。简而言之，将对象转换为一个原始值。
  - 语法：`obj.toString()`
  - 返回值<String 字符串类型>：表示该对象的字符串
    ```js
      const arr = [1, 2, 3];

      arr.toString(); // "1,2,3"
      Object.prototype.toString.call(arr); // "[object Array]"
    ```
  - 各内置对象重写`toString` 方法
    + 内置对象 Number 重写 `toString` 方法：`Number.prototype.toString(radix)` 表示指定 radix 基数（进制, [2, 36]范围，默认为 10 进制）的数字值
    + 内置对象 BigInt 重写 `toString` 方法：`BigInt.prototype.toString(radix)` 表示指定 radix 基数（进制, [2, 36]范围，默认为 10 进制）的数字值
  - `toString` 与 `valueOf` 优先级：大多情况下 `valueOf` 优先于 `toString `。
    + 主要原因是： valueOf() 方法可以返回一个对象，然后结束时调用 `toString()` 
    + **数字的强制转换**和**原始值的强制转换**会优先调用 `valueOf()`
    + **字符串强制转换**优先调用 `toString()` 方法
  - `Object.prototype.toString()` 返回 `"[object Type]"`
    + `Type` 是对象的类型, 在 ES6 以后得新增的（ Map 和 Symbol等）对象，都具有属性 `Symbol.toStringTag` <String 字符串类型>，该值作为 `Type`
    + 还有一些特殊标签名与 `Type` 类型名相同
      1. Array
      1. Function（注意：它的 typeof 返回 "function"）
      1. Error
      1. Boolean
      1. Number
      1. String
      1. Date
      1. RegExp
    + `arguments` 对象调用 `Object.prototype.toString()` 返回 `"[object Arguments]"`
    +  `null` 调用 `Object.prototype.toString()` 返回 `"[object Null]"`
    +  `undefined` 调用 `Object.prototype.toString()` 返回 `"[object Undefined]"`
    +  `Math` 调用 `Object.prototype.toString()` 返回 `"[object Math]"`因 `Math` 对象有它自己的 `Symbol.toStringTag`
    + 自定义  `Symbol.toStringTag` 属性的对象，在调用 `Object.prototype.toString()`时，返回七自定义的值
    ```js
      console.log(Object.prototype.toString.call(new Array)); // "[object Array]"
      console.log(Object.prototype.toString.call(new Array())); // "[object Array]"
      console.log(Object.prototype.toString.call(Array())); // "[object Array]"
      console.log(Object.prototype.toString.call(Array)); // "[object Function]"
      console.log(Object.prototype.toString.call(function(){})); // "[object Function]"
      console.log(Object.prototype.toString.call(new Error)); // "[object Error]"
      console.log(Object.prototype.toString.call(new Boolean)); // "[object Boolean]"
      console.log(Object.prototype.toString.call(new Number)); // "[object Number]"
      console.log(Object.prototype.toString.call(new String)); // "[object String]"
      console.log(Object.prototype.toString.call(new Date)); // "[object Date]"
      console.log(Object.prototype.toString.call(new RegExp)); // "[object RegExp]"

      function fn(){
        console.log(Object.prototype.toString.call(arguments)) // "[object Arguments]"
      }

      console.log(Object.prototype.toString.call(null)); // "[object Null]"
      console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
      console.log(Object.prototype.toString.call(Math)); // "[object Math]"

      const myDate = new Date();
      Object.prototype.toString.call(myDate); // [object Date]

      myDate[Symbol.toStringTag] = "my_date";
      Object.prototype.toString.call(myDate); // [object my_date]

      Date.prototype[Symbol.toStringTag] = "prototype polluted";
      Object.prototype.toString.call(new Date()); // [object prototype polluted]

    ```
### obj.valueOf()
  - 功能：返回指定对象的基本类型值。简而言之， obj 实例的 `valueOf()` 方法将 `this` 值转换成对象
  - 语法：`obj.valueOf()`
  - 返回值<Any 任意类型>：转换成对象的 `this` 值
  - `toString` 与 `valueOf` 优先级：大多情况下 `valueOf` 优先于 `toString`。
    + 主要原因是： valueOf() 方法可以返回一个对象，然后结束时调用 `toString()` 
    + **数字的强制转换**和**原始值的强制转换**会优先调用 `valueOf()`
    + **字符串强制转换**优先调用 `toString()` 方法
    ```js
      const obj = { foo: 1 };
      console.log(obj.valueOf() === obj); // true

      console.log(Object.prototype.valueOf.call("字符串对象")); // [String: '字符串对象']（一个包装对象）
    ```
  - `@@toPrimitive` 方法优先于 `valueOf` 方法优先于 `toString ` 方法
  - 重写 `valueOf` 方法
    ```js
      class Box {
        #value;
        constructor(value) {
          this.#value = value;
        }
        valueOf() {
          return this.#value;
        }
      }
      const box = new Box(123);
      console.log(box + 456); // 579
      console.log(box == 123); // true
    ```
  - 对 obj 对象使用一元加运算符
    + 一元加（+）运算对其操作数进行**强制数字转换**，
    + 大多数没有 `@@toPrimitive` 的对象，这意味着调用其 `valueOf()`。
    + 若对象没有自定义的 `valueOf()` 方法，则忽略 `valueOf()`，而直接使用 `toString()` 的返回值。
    ```js
      +new Date(); // 返回当前时间戳；等同于 new Date().getTime()
      +{}; // NaN（toString() 返回 "[object Object]"）
      +[]; // 0（toString() 返回一个空的字符串列表）
      +[1]; // 1（toString() 返回 "1"）
      +[1, 2]; // NaN（toString() 返回 "1,2"）
      +new Set([1]); // NaN（toString() 返回 "[object Set]"）
      +{ valueOf: () => 42 }; // 42      
    ```  

## 参考资料
  - [MDN Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)