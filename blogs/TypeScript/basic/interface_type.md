---
sidebar: auto
title: interface 接口 & type 类型别买
date: 2023-10-18
tags:
 - interface
 - type
 - 接口
 - 类型别名
categories: 
 - TypeScript
---

## TypeScript 定义类型
  - TypeScript 定义构建类型（类型扩展）的方法
    + interface 接口
    + type 类型别名

## interface 接口
  - `interface` 接口功能：为类型命名和为你的代码或第三方代码定义契约。
    + 在接口中只需要定义属性或方法，不需要具体的实现。
    + TS 编译器不会去检查接口属性的顺序，只检查接口属性类型符合配置
    + 常用于定义对象类型、函数类型、类类型。    
  - 语法：`interface Name { someValidTypes }`
    ```ts
      // 定义对象类型
      interface Point {
        x: number;
        y: number;
      }
      // 定义方法类型
      interface SetPoint {
        (x: number, y: number):void
      }
    ```
  - `interface` 可（继承）扩展
    ```ts
      interface pointX {
        x: number
      };
      interface point extends pointX {
        y: number
      }

      /* 多个接口扩展 */
      interface Shape {
        color: string;
      }
      interface PenStroke {
        penWidth: number;
      }

      interface Square extends Shape, PenStroke {
        sideLength: number;
      }

      let square = <Square>{};
      square.color = "blue";
      square.sideLength = 10;
      square.penWidth = 5.0;
    ```

### interface 属性描述符
  - 可选属性（Optional Properties）
    + 使用 `?` 表示此参数可选
    + 接口中的属性可有可无，有则处理，无则忽略
    ```ts
      interface Log {
        message?: string;
      }

      function print({ message }: Log) {
        console.log(message || '该参数没有传递~')
      }

      // 传递参数
      print({ message: 'hello' }) // "hello" 
      // 不传递
      print({}) // "该参数没有传递~" 
    ```
  - 只读属性（Readonly Properties）
    + 使用 `readonly` 关键字表示此参数只读
    + 限制接口中的属性不能修改（首次的）赋值。
      ```ts
        interface Info {
          name: string;
          readonly age: number;
        }

        // 只读 age 属性只能初始时,赋值一次
        const student: Info = {
          name: '小王',
          age: 15
        }

        student.age = 50
        // Cannot assign to 'age' because it is a read-only property.
        // 无法分配给 “age”，因为它是只读属性。
      ```
    + TS 提供了 `ReadonlyArray<T>` 类型（与 `Array<T>` 相似），
      * 只是去掉了所有可变方法，因此可以确保数组创建后再也不能被修改。
      ```ts
        // 创建一个 number 类型只读数组
        let arr: ReadonlyArray<number> = [1, 2, 3, 4]

        arr[0] = 10
        // Index signature in type 'readonly number[]' only permits reading.
        // 类型 “只读数字[]” 的索引签名只允许读取。

        arr.push(5)
        // Property 'push' does not exist on type 'readonly number[]'.
        // 类型 “只读数字[]” 上不存在 push 属性。

        arr.length = 99
        // Cannot assign to 'length' because it is a read-only property.
        // 只读属性无法分配给 “length”。
      ```
  - 索引签名（Index Signatures）
    + 使用 `[index: 索引签名属性]: any` 支持任意类型
      * 索引签名属性只允许 `string`、`number`、`symbol`、模板字符串模式以及仅由这些组成的联合类型。
    + 可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型
    ```ts
      interface StringArray {
        [index: number]: string;
      }

      let myArray: StringArray;
      myArray = ["张三", "李四"];

      let myStr: string = myArray[0];
    ```
   
### interface 任意属性
  - 使用 `[propName: string]: any` 支持任意类型
  - TS 提供了索引签名的形式，处理接口中除了包含必选和可选属性之外，还允许有其他的任意属性
    ```ts
      interface IPerson {
        name: string;
        [propName: string]: any;
      }

      const a: IPerson = { name: '小王' }
      console.log(a) //{"name": "小王"} 只传递必填,其他参数不要
      const b: IPerson = { name: '小王', age: 15, sex: '男' }
      console.log(b) //{"name": "小王", "age": 15, "sex": "男"} 传递必填,其他参数随意传递
    
      interface IDiscount {
        (price: number): number;
      }
      let cost: IDiscount = function (price: number): number {
        return price * 0.8;
      };
    ```
    
### interface 接口定义 函数类型
  - 语法：`function <fnName()> : <interfaceName> {}`
    ```ts
      interface Info {
        (name: string; ae: number;):string
      }

      // 也可 function getUserInfo(opt: Info) { 
      function getUserInfo({ name, age }) : Info {
        return `name: ${name}, age: ${age}`
      }

      console.log(getUserInfo({ name: '张三', age: 123 })) // OK "name: 张三, age: 123" 
      
      // 函数实参名不需要与接口里定义的名字相匹配
      console.log(getUserInfo({ n: '张三', a: 123 })) // OK "name: 张三, age: 123" 

      console.log(getUserInfo({ name: '张三' }))
      // Property 'age' is missing in type '{ name: string; }' but required in type 'Info'.
      // 类型“｛name:string；｝”中缺少属性“age”，但类型“Info”中需要该属性。

      console.log(getUserInfo())
      // Expected 1 arguments, but got 0.
      // 应为 1 个参数，但得到了 0 个。
    ```

### interface 定义 类类型
  - 语法：`class <className> implements <interfaceName> {}`
    ```ts
      interface IClock {
        new (hour: number, minute: number): IClockTick;
      }
      interface IClockTick {
        tick(): void;
      }
      class DigitalClock implements IClockTick {
        constructor(hour: number, minute: number) {}

        tick() {
          console.log("Tick-tock");
        }
      }
      let digitalClock: IClock = DigitalClock;
      let clock = new digitalClock(12, 0);
      clock.tick(); // 输出：Tick-tock


      class IAnimal {
        constructor(public name: string) {}
      }
      // 不加 new 是修饰函数的, 加 new 是修饰类的
      interface IWithNameClass {
        new (name: string): IAnimal;
      }
      function createAnimal(clazz: IWithNameClass, name: string) {
        return new clazz(name);
      }
      let a = createAnimal(Animal, "hello");
      console.log(a.name);
    ```
 
## type 类型别名
  - `type` 类型别名会给一些类型一块重新定义一个新名称的类型。
    + 类型别名用于原始值、联合类型、元组、其它任何需要手写的类型.
  - 语法：`type alias = someValidTypes`
    ```ts
      type newstring = string;
      const str: newstring = 'randy'

      // 定义 对象类型
      type Point = {
        x: number;
        y: number;
      };

      // 定义 方法类型
      type SetPoint = (x: number, y: number) => void

      // 定义 联合类型
      type some = boolean | string;
      const b: some = true // OK
      const c: some = 'hello' // OK
      const d: some = 123 // Error: 不能将 123 分配给 some 类型

      // 定义 元组类型
      type data = [number, string];

      // 定义泛型
      type Container<T> = { value: T };

      // dom
      let div = document.createElement("div");
      type B = typeof div;
    ```
  - `type` 可扩展
    ```ts
      type pointX = {
        x: number
      };
      type point = pointX & {y: number}
    ```
  - `type` 类型别名可在属性里引用自己：
    ```ts
      type Tree<T> = {
        value: T;
        left: Tree<T>;
        right: Tree<T>;
      }
    ```
  - `type` 与交叉类型一起使用
    ```ts
      interface Person {
        name: string;
      }

      type LinkedList<T> = T & { next: LinkedList<T> };

      let people: LinkedList<Person>;
      let s1 = people.name;
      let s2 = people.next.name;
      let s3 = people.next.next.name;
      let s4 = people.next.next.next.name;
    ```
### `type` 定义 方法类型
    ```ts
      type type1 = () => {}; // 声明返回 `{}` 的函数类型，即空对象
      type type2 = () => void // 声明返回 `void` 的函数类型，即 nothing
      type type3 = () => string // 声明返回 `string` 的函数类型，即字符串

      // 使用 type1 类型，必须用 () 括号对 {} 括起来，否则 TS 会认为缺少返回语句
      const firstType: type1 = () => ({})
      const SecondType: type2 = () => { }
      const thirdType: type3 = () => `hello world`
    ```

### `type` 定义 类类型
  ```ts
    type Point = {
      x: number;
      y: number;
    };
    class SomePoint implements Point {
      x: 1;
      y: 2;
    }

    type PartialPoint = { x: number; } | { y: number; };
    // 类无法实现定义了联合类型的 `type` 类型别名
    class SomePartialPoint implements PartialPoint {
      // Error 类只能实现对象类型 或 对象类型与静态已知成员的交集。
      x: 1;
      y: 2;
    }
  ```

##  `type` 类型别名和 `interface` 接口可相互扩展的
  - `type` 可扩展 `interface`
    ```ts 
      type pointX = {
        x: number
      };

      interface point extends pointX  {
        y: number
      }
    ```
  - `interface` 可扩展 `type`
    ```ts
      interface pointX{
        x: number 
      }
      type point = pointX & {y: number}
    ```

## interface 接口和 type 类型别名的应用场景
  - 在定义公共 API（如编辑一个库）时使用 `interface`，因为方便使用者继承接口；
  - 在定义组件属性（Props）和状态（State）时，建议使用 `type`，因为 type 的约束性更强；
  - `type` 类型不能二次编辑，而 `interface` 可以随时扩展。
  - 两者区别（两者均可使用时，优先采用 `interface` 接口）
    + `interface` 接口
      * 同名自动合并，通过 `extends` 扩展
      * 自身只能表达 `object`、`class`、`function` 类型
    + `type` 类型别名
      * 只能通过 `&` 进行合并
      * 更强大，自身支持更多的类型（`string`、`Array`、`object`、`class`、`function` 等）

## 参考资料
  - [Node.js中文网 日常类型](https://ts.nodejs.cn/docs/handbook/2/everyday-types.html)
  - [Node.js中文网 对象类型](https://ts.nodejs.cn/docs/handbook/2/objects.html#属性描述符)
  
  - [Typescript - 通俗易懂的 interface 接口](https://blog.csdn.net/weixin_44198965/article/details/129986148)