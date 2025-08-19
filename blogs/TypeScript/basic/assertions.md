---
sidebar: auto
title: Type Assertions 类型断言
date: 2023-10-18
tags:
 - Type Assertions
 - 类型断言
categories: 
 - TypeScript
---

## 前言
### 类型收窄
 - 类型收窄：从宽类型转换成窄类型的过程
   + 常用于处理联合类型变量的场景。
 - TypeScript 中可收窄变量类型的方法：
   + 类型断言
   + 类型守卫
   + 双重断言

## 类型推断
  - TS 中的类型推断：根据上下文自动推算出变量或方法的类型，而不需要开发者显示去定义。
    + TS 中，具有初始化值的变量、有默认值的函数参数、函数返回的类型都可以根据上下文推断出来。
    + 类型推断，就不需要开发者对每个变量或方法都显示去定义类型，大大提高了开发效率。
    ```ts
      // 若定义时未赋值，无论后续是否赋值，都会被推断成 any 类型而完全不被类型检查
      let flag; // 推断为 any
      let count = 123; // 推断为 number 类型
      let hello = "hello"; // 推断为 string 类型

      // 根据参数的类型，推断出返回值的类型也是 number
      function add(a: number, b: number) { return a + b; }
    ```

## 类型断言
  - 有些情况下 TS 并不能准确得推断类型，此时可能产生不必要的警告或者报错。
    + 由于类型推断，将 person 推断为 `{}` 类型，根本不存在后添加的那些属性，
    + 此写法在 JS 中完全没问题，虽然开发者知晓 person 实际是有属性的，只是初始没有声明而已，但是 TS 不知道，故此需要类型断言
    ```tss
      const person = {};

      person.name = 'Tony'; // Error: 'name' 属性不存在于 ‘{}’
      person.age = 20; // Error: 'age' 属性不存在于 ‘{}’
    ```
  - 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。
    + 它不受运行时的影响，只在编译阶段起作用。（TS 编译器假设开发者已进行了必须的检查）
      * 粗暴理解：“类型断言” 优先级高于 " TS 编译器的类型检查"
  - 对于联合类型的变量，只能访问所有类型中共有的属性或方法。
    + 使用类型断言，可访问联合类型当中某个类型的特有方法或属性
    ```ts
      interface Cat {
        name: string;
        run(): void
      }
      interface Fish {
        name: string;
        swin(): void
      }

      function getName(animal: Cat | Fish):string {
        return animal.name
      }
      
      function isSwim(animal: Cat | Fish):string {
        return typeof animal.swim === "function" 
        // 在 'Cat|Fish' 类型中不存在 swim 属性
        // 在 `Cat` 类型中不存在 swim 属性 
      }
      function isSwim(animal: Cat | Fish):boolean {
        return typeof (animal as Fish).swim === "function" 
      }
    ```
  - 注意：谨慎使用类型断言，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误。
    + 类型断言 “跳过” TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误
    ```ts
      interface Cat {
        name: string;
        run(): void
      }
      interface Fish {
        name: string;
        swin(): void
      }

      function swim(animal: Cat | Fish):void {
        (animal as Fish).swim()
      }

      const tom: Cat = {
        name: "Tom",
        run(){
          console.log("快跑！")
        }
      }
      swim(tom) // 编译时没有编译错误
      // 执行时报错，tom 对象没有 swim 方法， Uncaught TypeError:animal.swim is not a function
    ```

### 类型断言语法：`<类型>值` 
  - 在 tsx 语法（React 的 jsx 语法的 ts 版）中类型断言必须使用 `as` 形式。
  - `<>` 容易跟泛型语法起冲突，故推荐类型断言统一采用 `值 as 类型` 形式语法。
  ```ts
    interface Person {
      name: string;
      age: number;
    }
    const person = <Person>{};

    person.name = 'randy';
    person.age = 20;
  
    let arrowValue: any = "this is a string";
    let arrowStrLength: number = (<string>someValue).length;
  ```

### 类型断言语法：`值 as 类型` 
  ```ts
    interface Person {
      name: string;
      age: number;
    }
    const person = {} as Person;

    person.name = 'randy';
    person.age = 20;

    let asValue: any = "this is a string";
    let asStrLength: number = (someValue as string).length;
  ```

## 双重断言
  - 虽然类型断言是有强制性的，但在一些特殊情况下无效
    ```ts
      interface Person {
        name: string;
        age: number;
      }     
      const person = 'Tony' as Person; // Error
    ```
    + 把 string 强制断言为一个 Person 接口报错，可通过使用双重断言解决
      * 先把类型断言为 any 任意类型，再断言为自定义断言的类型，最终实现双重断言，
      * 当然做法肯定说不通的，双重断言也更不建议滥用，值在极少数情境下使用，双重断言了解即可
      ```ts
        interface Person {
          name: string;
          age: number;
        }
        const person = 'Tony' as any as Person; // ok
      ``
  
## 非空断言`
  - 非空断言用 `!` 表示，它用来断定某变量一定不是 `null` 和 `undefined`。
  - 当上下文中，类型检查器无法断定类型时，通过 `!` 后缀表达式操作符用于断言操作对象是非 `null` 和非 `undefined` 类型
    ```ts
      // `value!` 将从 `value` 值域中排除 `null` 和 `undefined`

      let value: null | undefined | number;
      value!.toFixed(); // ok
      value.toFixed(); // Error
    ```

## 确定赋值断言
  - TypeScript 允许在实例属性和变量声明后放置一个 `!` 号，表示该属性会被明确地赋值。
    ```ts
      let x: number;
      initialize();

      // 变量 x 在赋值前被使用 Variable 'x' is used before being assigned.(2454)
      console.log(2 * x); // Error

      function initialize() {
        x = 10;
      }
    ```
  - 通过确定赋值断言，TS 编译器就会知道该属性已被明确地赋值
    ```ts
      let x!: number; // 使用确定赋值断言
      initialize();
      console.log(2 * x); // Ok

      function initialize() {
        x = 10;
      }
    ```

## 类型守卫
  - 类型守卫简单理解为：缩小类型的范围
  - 三种主要的类型守卫：`typeof`、 `instanceof`、 `in`
### typeof
  - 用于判断 `number`，`string`，`boolean`，`symbol` 四种类型；
    + 利用 `typeof` 实现类型收窄和 `never` 类型的特性做全面性检查
    ```ts
      // type types  = string | number
      type types  = string | number | boolean

      function controlFlowAnalysisWithNever(value: types){
        if(typeof value === 'string'){
          // value 被收窄为 string 类型
        }else if(typeof value === 'number'){
          // value 被收窄为 number 类型
        }else{
          // 此时 value 为 never 类型
          const check: never = value
        }
      }
    ```

### instanceof
  - 用于判断一个实例是否属于某个类。通过构造函数来细化类型
    ```ts
      class Man {
        handsome = "handsome"
      }
      class Woman{
        beautiful = "beautiful";
      }
      function Human(arg: Man | Woman){
        if (arg instanceof Man){
          console.log(arg.handsome);
          console.Log(arg.beautiful); // error:  Man 类型上不存在 beautiful 属性
        }else{
          // 此处一定是 Woman
          console.log(arg.beautiful);
        }
      }
    ```

### in
  - 用于判断一个属性/方法是否属于某个对象
    ```ts
      interface A {
        a: string
      }
      interface B {
        b: string
      }
      function fn(obj: A | B):string {
        return ('a' in obj) ? obj.a : obj.b  
      }
    ```

## 参考资料
  - [TypeScirpt 官网](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)
  - [Node.js中文网 TypeScript](https://ts.nodejs.cn/docs/handbook/2/everyday-types.html#类型断言)
  - [TypeScript入门之类型推断、类型断言、双重断言、非空断言、确定赋值断言、类型守卫、类型别名](https://juejin.cn/post/7108724041103441957)
  - [如何在项目中用好 TypeScript 🤔](https://juejin.cn/post/7058868160706904078)