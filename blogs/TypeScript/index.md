---
sidebar: auto
title: TypeScript 静态类型检测脚本
date: 2023-10-18
tags:
 - TypeScript
 - 静态类型检测脚本
categories: 
 - TypeScript
---

## 前言
  - TypeScript 通过 TypeScript 编译器或 Babel 转译为 JavaScript 代码
  - TypeScript 的目标是成为 JavaScript 程序的静态类型检查器，
    + 简而言之，一个在代码运行之前运行的工具（静态）并确保程序的类型正确（类型检查）
    + TypeScript 就是把不看重类型的动态语言变成关注类型的动态语言。
    + TypeScript 与 C# 的的作者都是 Anders Hejlsberg（安德斯·海尔斯伯格）
  - TypeScript  是 JavaScript 的超集（扩展集）。
    + 提供了 JavaScript 的所有功能，以及在这些功能之上的附加层（TypeScript 的类型系统）
    + TypeScript 使用后缀类型，例：`name: string` 而非 `string name`。
  - TypeScript 的类型注释是记录函数或变量预期契约的轻量级方法
  - tsc 是 TypeScript 的编译器
    + 全局安装：`npm install -g typescript`
      + 通过 `tsc -v` 检查是否安装成功
      * 执行  `tsc hello.ts` 检查 hello.ts 文件，
      + 类型检查无误后，tsc 编译或转换出一个在同级目录中同名的 javaScript 文件
    + 局部安装：`yarn add typescript --dev`
  - tsc 编辑项目工程
    + `tsc --init` 创建 TypeScript 的 tsconfig.json 配置文件
    + 类似 `npm init` 产生的 package.json 配置文件

### 从类型中创建类型
  - 泛型：带参数的类型 
    + 定义类型时没有明确其类型，而在使用时通过传递的参数来明确其具体的类型

## TypeScript 基础类型
  - TypeScript 支持与 JavaScript 几乎相同的数据类型
    + javaScript 由 7 个基本数据类型：string、number、boolean、null、undefined、BigInt、Symbol
    + TypeScript 扩展的数据类型：tuple、enum、unknown、never、any

    | 类型 | 例子 | 描述 |  
    |:--|:--|:--|
    | boolean   | `true`、`false`    | 布尔值 |
    | string	  | `"hello world"`    | 任意字符串 |
    | number    | `-1`, `0`, `1`     | 任意数字 |
    | bigint    | `Bigint(0)`        | 大数值 |
    | symbol    | `Symbol()`         | 独一无二的值，标识 |
    | null      | `null`             | null |
    | undefined | `undefined`        | undefined |
    | void      | `undefined` 空值    | （一个函数返回  `undefined` 或没有返回值） |
    | object    | `{ name: ’Tong’ }` | 任意 JS 对象 |
    | array     | `[1, 2, 3]`        | 任意 JS 数组 |
    | 字面量    | 其本身              | 限制变量的值就是该字面量的值 |
    | any       | \                  | 任意类型 |
    | unknown	  | \	                 | 类型安全的 any（确保使用这个类型的人声明了这个类型是什么） |
    | never     | \                  | 不能是任何值（这个类型不可能发生） |
    | tuple     | `[4, 5]`           | 元组（固定长度数组），TS 新增类型， |
    | enum	    | `enum{A, B}`       | 枚举，TS 新增类型 |

    ```ts
      let str: string = "jimmy";
      let num: number = 24;
      let bool: boolean = false;
      let u: undefined = undefined;
      let n: null = null;
      let obj: object = {x: 1};
      let big: bigint = 100n;
      let sym: symbol = Symbol("me"); 

      // undefined 和 null 是所有类型的子类型
      let num_un: number = undefined
      let num_null: string = null
      let bool_un: boolean = undefined
    ```

### string 字符串类型
  - TypeScript 里使用 `string` 表示文本的数据类型， 采用 `"` 双引号、 `'` 单引号、 ` 反引号表示字符串。
    ```ts
      let name: string = "Jacky";

      name = "Tom";
      name = 'Mick';
      console.log(`Hello, my name is ${ name }`)
    ```

### number 数字类型
  - TypeScript 中使用 `number`类型：表示数字的数据类型。
    + 与 JavaScript 一样，所有数字都是浮点数
    + 不仅支持十进制和十六进制字面量，还支持（ES2015 中）的二进制和八进制字面量。
    ```ts
      let decLiteral: number = 2023;
      let binaryLiteral: number = 0b11111100111;
      let octalLiteral: number = 0o3747;
      let hexLiteral: number = 0x7e7;
    ```

### boolean 布尔类型
  - TypeScript 中使用 `boolean` 类型：表示布尔值的数据类型，可赋值为 `true` 或 `false`。
    ```ts
      let isDone: boolean = false;
    ```

### null 和 undefined 类型
  - TypeScript 中使用 `null` 和 `undefined` 类型：表示两者分别对应自身的类型
    + 当指定 `--strictNullChecks` 标记，`null` 和 `undefined` 只能赋值给 `void` 或他们自身。
  - 默认情况下 `null` 和 `undefined` 是所有类型的子类型。 
    + 可把 `null` 和 `undefined` 赋值给 `number` 等其他类型的变量
    ```ts
      let n: null = null;
      let u: undefined = undefined;
    ```

### Array 数组类型
  - TypeScrip 有两种方式可以定义数组。 
    + 可以在元素类型后面接上` []`，表示由此类型元素组成的一个数组。
    + 使用数组泛型，`Array<元素类型>`
    ```ts
      let list: number[] = [1, 2, 3];
      let list: Array<number> = [1, 2, 3];
    ```

### 元组类型
  - 元组（Tuple）类型：表示一个已知**数量**和**类型**的数组，各元素的类型不必相同。
    + 如，定义一对值分别为 string 和 number 类型的元组。
    ```ts
      let x: [string, number];
      x = ['hello', 10]; // OK
      x = [10, 'hello']; // Error
      console.log(x[0].substr(1)); // `ello`
      console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
      
      // 当访问一个越界的元素，会使用联合类型替代：
      x[3] = 'world'; // OK, 字符串可以赋值给(string | number) 联合类型
      console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
      x[6] = true; // Error, 布尔不是(string | number)类型
    ```

### object 对象类型
  - TypeScript 中使用 `object` 类型：不仅表示普通对象类型，还泛指所有的非原始类型
    + 原始类型：`number`，`string`，`boolean`，`symbol`，`null`、`undefined`。
    + `object` 类型可以更好的表示像 `Object.create` 这样的 API

    ```ts
      // 注意：object 类型首字母是小写的
      declare function create(o: object | null): void;
      create({ prop: 0 }); // OK
      create(null); // OK

      create(42); // Error
      create("string"); // Error
      create(false); // Error
      create(undefined); // Error

      
      const fn: object = function () {} // 函数      
      const obj: object = {} // 普通对象      
      const arr: object = [] // 数组      
    ```

### enum 枚举类型
  - TypeScript 中使用 `enum` 枚举类型：表示对 JavaScript 标准数据类型的一个补充，（与 C# 等语言一样）枚举类型可以为一组数值赋予友好的名字。
    ```ts
      enum Color {Red, Green, Blue};
      let c: Color = Color.Green;
    ```
  - enum 枚举，默认从 0 开始为元素编号。也可手动的指定成员的数值。
    ```ts
      // 手动改成从 1 开始编号, 
      enum Color {Red = 1, Green, Blue}
      // enum Color {Red = 1, Green = 3, Blue = 2} // 全部都采用手动赋值
      let colorName: string = Color[2];

      console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
    ```

### any 任意类型（动态类型）
  - TypeScript 中使用 `any` 任意类型：表示对前期编程阶段暂不确定变量类型的指定类型，（不限制变量的行为）
    + 常用于标记未知类型变量，不希望类型检查器对这些值进行检查，而是直接让它们通过编译阶段的检查。
    + any 类型：允许在编译时可选择地包含或移除类型检查
    + `object` 类型或 `unknown` 类型的变量只是允许你给它赋任意值, 不允许调用该值的任意方法。而 `any` 类型允许调用该值的任意方法。
    ```ts
      let notSure: any = 4;
      notSure = "也可以字符串";
      notSure = false;

      let notSure_2: any = 4;
      notSure_2.ifItExists(); // OK, 无论 ifItExists 是否在运行时存在
      notSure_2.toFixed(); // OK, toFixed exists (but the compiler doesn't check)

      let notSure_3: Object = 4;
      let notSure_4: unknown = 4;
      notSure_3.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
      notSure_4.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
    ```

### void 无任何类型
  - 某种程度上，`void` 类型与 `any` 类型相反，它表示没有任何类型。 
    + 当一个函数没有返回值时，常用 `void` 为函数返回值的类型
    + 声明 `void` 类型的变量，只能为其赋予 `undefined` 和  `null`
    ```ts
      function test(): void {
        console.log('This is function is void');
      }

      let unusable: void = undefined;
    ```

### never 永无值类型
  - TypeScript 中使用 `never` 类型：表示的是那些永不存在的值的类型。 
    + `never` 类型常用于：总是会抛出异常、根本就不会有返回值的函数表达式、箭头函数表达式返回值等的类型； 
    + `never` 类型也可用于变量被永不为真的类型保护所约束时。
  - `never` 类型是任何类型的子类型，可赋值给任何类型；
    + 没有类型是 `never` 的子类型（因此其他类型不能赋值给 `never` 类型）。即使 `any` 也不能赋值给 `never`。
    ```ts
      // 返回 never 的函数必须存在无法达到的终点
      function error(message: string): never {
          throw new Error(message);
      }

      // 推断的返回值类型为 never
      function fail() {
          return error("Something failed");
      }

      // 返回 never 的函数必须存在无法达到的终点
      function infiniteLoop(): never {
          while (true) {
          }
      }
    ```

### unknown 未知类型
  - TypeScript 3.0 中使用 `unknown` 未知类型：表示对前期编程阶段暂不确定变量类型的指定类型，（限制变量的行为）
    + 常用于标记未知类型变量，不希望类型检查器对这些值进行检查，而是直接让它们通过编译阶段的检查。
    ```ts
      let notSure: unknown = 4;
      notSure = 'maybe a string instead';
      notSure = false;

      let value_1: unknown = notSure; // OK
      let value_2: any = notSure; // OK
      let value_4: number = notSure; // Error
      let value_5: string = notSure; // Error
      let value_3: boolean = notSure; // Error
    ```

### 字面量类型
  - TypeScript 支持 3 种字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型，分别对应与其值一样的字面量类型
    + 字面量：既可以表示值，也可以表示类型
    ```ts
      let flag1: "hello" = "hello";
      let flag2: 1 = 1;
      let flag3: true = true;
    ```

## TypeScirpt 工具函数 
| 函数 | 含义 |
|:--|:--|
| `Partial<T>`     | 表示 `T` 类型的所有子集（每个属性都是可选的） |
| `Readonly<T>`    | 返回跟 `T` 一样的类型，但会将所有的属性设置为 `readonly` |
| `Required<T>`    | 返回跟 `T` 一样的类型，但会将所有的属性设置为 `required` |
| `Pick<T,K>`      | 从 `T` 类型中，挑选部分 `K` 属性而构造出来的新类型 |
| `Exclude<T,U>`   | 从 `T` 类型中，移除部分 `U` 属性而构造出来的新类型 |
| `Extract<T,U>`   | 提取 `T` 联合类型中，所有可以被赋值给 `U` 类型的部分 |
| `NonNullable<T>` | 从 `T` 联合类型中，移除 `null` 和 `undefined` 而构造出来的新类型 |
| `ReturnType<T>`  | 表示 `T` 函数类型的返回值类型 |

## 实战
### 类型注释
  - TypeScript 通过 `/** */` 形式的注释为类型做标记提示
### TypeScript 支持 ECMAScript 的新增特性
  - TypeScript 3.7 
    + 支持 `ES2020(ES11)` 新特性：`?.` 可选链。
    + 支持 `ES2021(ES12)` 新特性：`??` 空值合并运算符
### 类访问限定修饰符
  - TypeScript 的类定义允许使用三种访问修饰符 `private`、`protected`、 `public` 声明成员访问限制，并在编译期进行检查：
    + `public` 公有类型：类的属性和方法在 类内部、子类、类外部都可访问，类的访问修饰符默认值；
    + `protected` 保护类型：类的类的属性和方法在 类内部、子类可访问，类外部不能访问；
    + `private` 私有类型：类的类的属性和方法只能在 类内部可访问。
      *  `ES2019` 中使用 `#` 来定义私有成员的规范。Chrome 74+ 和 Node 12+ 已经实现了该私有成员定义的规范。
    ```ts
      class Person {
        private name:string;
        private age:number;
  
        // `static`关键字 可以将类内部的属性和方法定义为 静态属性和方法
        public static sex:string = "Male";
        
        constructor(name:string, age:number){
          this.name = name;
          this.age = age;
        }
        public run():void{
          console.log(this.name + "在跑步")；
        }
        public setName(name:string):void{
          this.name = name;
        }
        }
        var p:Person = new Person("Tony", 22);
        console.log(Person.sex) // Male
        p.run(); // Tony在跑步
        console.Log(p.name); // 编辑器报错：属性 “name" 为私有属性，只能在类 “Person” 类内部访问
    ```
    + 转义生成 JavaScript 的 Person 类定义
    ```js
      "use strict";
      class Person{
        constructor(name, age){
          this.name = name;
          this.age = age;
        }
        run(){
          console.log(this.name + "在跑步")；
        }
        setName(name){
          this.name = name;
        }
      }
      Person.sex = "Male";
      var p = new Person("Tony", 22);
      console.log(Person.sex);
      p.run();
      console.log(p.name);
    ```

### 作用域问题
  - 不同文件可能会存在相同名称的变量，
    + 例：a 文件定义了一个  a 全局的变量，b 文件也定义了一个 a 全局变量，那么就会产生异常。
      * 在绝大多数实际开发中不会出现此问题，因为项目中每个文件都会以模块的形式去工作
    + 解决方案一：用一个立即执行函数创建一个单独的作用域
      ```ts
        (function () {
            const a: string = 'foobar'
        })()
      ```
    + 解决方案二：使用 export 导出，此时这个文件就会作为一个模块导出，模块有单独的模块作用域
      ```ts
        const a: string = 'foobar'

        export {} // export 语法，并非表示导出一个空对象
      ```

## 参考资料
  - [TypeScirpt 官网](https://www.typescriptlang.org/zh/)
  - [TypeScript 手册](https://ts.nodejs.cn/docs/handbook/intro.html)
  - [TypeScript 中文网](https://www.tslang.cn/docs/handbook/basic-types.html)

  - [最全的TypeScript学习指南](https://juejin.cn/post/7031787942691471396)
  - [Typescript 最佳实践](https://juejin.cn/post/6844904034302705671)