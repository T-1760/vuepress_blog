---
sidebar: auto
title: TypeScript 基础
date: 2023-10-18
tags:
 - TypeScript 基础
categories: 
 - TypeScript
---

## 类型推论（类型推断）
  - 如果没有明确的指定类型，那么 TypeScript 会自动依照类型推论（Type Inference）的规则推断出一个类型。
    ```ts
      /* 原始类型 */
      const str = "abc"; // 推论 => const str: string = "abc";
      const num = 123;// 推论 => const num: number = 123;
      const bol = true;// 推论 => const bol: boolean = true;
      const nu = null;// 推论 => const nu: null = null;
      const un = undefined;// 推论 => const un: undefined = undefined;
      const big  = 123n; // 推论 => const big: bigint = 123n;
      const sym = Symbol("abc"); // 推论 => const sym: symbol = Symbol("abc")
      
      /* 引用类型 */
      // object 类型包含了所有对象、数组和函数
      const badObj= { name: "tony", age: 18 }; // const badObj: object = { name: "tony", age: 18 }; 不推荐
      const badArr = [ 1, 2, 3 ]; // const badArr: object = [ 1, 2, 3 ]; 不推荐
      const badFn = n => n + 1 // const badFn: object = ( n: number ):number => n + 1 不推荐

      interface IObj {
        name: string
        age: number
      }
      const obj: IObj = { name: "tony", age: 18 }
      const nArr: Array<number> = [ 1, 2, 3 ]; // 泛型来定义数组类型
      const sArr: string[] = ["a", "b", "c"];
      const fn: void = ( n: number ) => n + 1
    ```
  - 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
    ```ts
      const anything;  // 推论 => const anything: any;
    ```

## 联合类型
  - 联合类型使用 `|` 符号来表示一个值可以是多种类型之一。
    + 当变量被声明为联合类型时，只能在运行时访问所有联合类型的共有属性或方法。
    + 若访问非共有属性或方法时， TypeScript 在编译时发出错误（类型保护：访问联合类型时，处于程序安全，仅能访问联合类型中交集的部分）。
  ```ts
    let val: string | number = 123
    val = "abc"
    let arr1: Array<string | number> = [1, "a", 2, "b"]
    let arr2: (string | number)[] = [1, "a", 2, "b"]
  ```

## 接口

## 泛型

## TS 数据类型补充
### any（任意值）
  - any 用来表示可以赋予任意类型的值。任何类型都可以赋值给 any 类型的变量
  ```ts
    let num: number = 0
    num = "a" // 报错：不能将类型 “string” 分配给类型 “number”
    let val: any = 0
    val = "a"
    val = false
    val = null
  ```
### unknown（未知） 
  - unknown 类似于 any，不同在于 unknown 会在编译时检查，减少错误。
    + any 可与其他类型互相赋值，但是 unknown 不行，在做类型检查或者类型断言之前（断言会出现在后续文章中，表示类型转换），无法对其类型做修改，
    + 推荐使用 unknown 代替 any，使用 unknown 能够提高代码的类型安全性和可读性
  ```ts
    let str: unknown
    const str1: string = str // 会出现无法赋值的错误

    // 正确使用方式：对类型做判断后再进行赋值
    if (typeof str === "string") {
      const str1: string = str
    }
  ```
### Void（缺少值）
  - void 常表示函数没有返回值，当然也可以使用 null 和 undefined 赋值
    + 在严格模式下，null 不能赋值给 void 类型
  - `void 0` 可看作 `undefined`，一般可以使用 `val === void 0` 判断值是否是 undefined 
    + 因为在 IE8 中 undefined 可被修改为其他值，使用 `void 0` 可保证获得的是一个 undefined 值
  ```ts
    const vo: void = null // 严格模式下会报错
    const vo1: void = undefined
    const fn = (): void => {
        const str: string = 'hello'
        console.log(str)
        return void 0 // 不写这句默认会给提示："fn" doesn't return anything
    }
    const vo2: void = fn()
  ```
### never（永无）
  - never 表示那些永远不会发生的值，常用在函数的返回值或者是永远不可能被执行的代码中（如：死循环）
    + never 与 void 不同的是：never 表示不存在，而 void 表示没有类型
  ```ts
    const wFn = function (): never {
      while (true) {
        console.log("死循环");
      }
    }

    const eFn = function (): never {
      throw Error("抛错")
    }

    let nev: never // 初始化一个不存在的变量
  ```
### tuple（元组）
  - 一种特殊的数组，其中的元素可以是不同类型的，并且每个元素都有自己的类型。
    ```ts
      let x: [string, number] = ["hello", 10]; 
    ```
### enum（枚举）
  - 定义了一组命名的常量。枚举成员默认从 0 开始编号，也可以手动指定成员的数值。
     ```ts
      enum Color {Red, Green, Blue}
      let color: Color = Color.Green;
    ```

## TS 引用类型补充
### 函数类型
  - 函数的声明有两个点：
    + （输入）参数的类型
    + （输出）返回值的类型  
  - 函数声明有两种方法
    + 直接在函数上声明
      ```ts
        function add(x: number, y: number): number {
          return x + y
        }
        const mult: (x: number, y: number) => number = (x, y) => x * y
      ```
    + 自定义接口来声明
      ```ts
        interface IAdd {
          (x: number, y: number):number
        }
        interface IMult {
          (x: number, y: number): number
        }

        const add1: IAdd = (x, y) => x + y
        const add2: IAdd = function(x, y){ 
          return  x + y 
        }
        const mult1: IMult = (x, y) => x * y
        const mult2: IMult = function(x, y){
          return x * y
        }
      ```
### 数组类型 
  - 数组声明的方法
    + `[]` 简写方式
    + 泛型
    + 元组
    + 枚举
    ```ts
      const arr_1: number[] = [1, 2, 3]
      // 泛型
      const arr_2: Array<number> = [1, 2, 3]
      const arr_3: Array<number | string | Record<string, number>> = [1, "2", { age: 18 }]
      // 元组
      const arr_4: [string, string, number, number] = ["a", "b", 0, 1]
      // 枚举
    ```

## 参考资料
  - [TypeScript 入门教程](https://ts.xcatliu.com/basics/type-inference.html)
  - [typeScript 学习笔记](https://juejin.cn/post/7316115845096833059)
  - [TypeScript（二）基本类型和特殊类型](https://blog.csdn.net/time_____/article/details/113991549)
