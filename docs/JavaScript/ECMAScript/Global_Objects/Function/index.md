---
sidebar: auto
title: Function 函数
date: 2023-10-18
tags:
 - Function
 - 函数
categories: 
 - 标准内置对象
---

## 前言
  - Function 对象提供了用于处理函数的方法。
  - 在 JavaScript 中，**每个函数实际上都是一个 `Function` 对象**。
## Function 的创建
  - - `Function` 构造函数与函数声明之间的不同
    + 由 `Function` 构造函数创建的函数不会创建当前环境的闭包，它们总是被创建于全局环境，
    + 因此在运行时它们只能访问全局变量和自己的局部变量，不能访问它们被 `Function` 构造函数创建时所在的作用域的变量。这一点与使用 `eval()` 执行创建函数的代码不同
    ```js
      var x = 10; // 使用 `var` 创建一个全局属性

      function createFn1() {
        const x = 20;
        return new Function("return x;"); // 这个 `x` 指的是全局 `x`
      }

      function createFn2() {
        const x = 20;
        function f() {
          return x; // 这个 `x` 指的是上面的局部 `x`
        }
        return f;
      }

      const f1 = createFn1();
      console.log(f1()); // 10
      const f2 = createFn2();
      console.log(f2()); // 20    
    ```
    + 上述代码在浏览器中正常运行，但在 Node.js 中 `f1()` 会产生一个“找不到变量 x”的 `ReferenceError`。（因为在 Node.js 中顶级作用域不是全局作用域，而 `x` 其实是在当前模块的作用域之中）
### function 关键此创建
  ```js
    function fn(a, b){
      return a + b
    }
  ```
### new Function() 构造函数
  - `new Function` 构造函数与 `eval()` 都能动态创建函数。但都同样会出现安全问题和（相对较小的）性能问题
    + 解决安全问题提示：[Uncaught EvalError: Refused to evaluate a string as JavaScript](https://blog.csdn.net/gao_zhennan/article/details/126006827)
  - 与 `eval()` 不同的是，`new Function` 构造函数创建的函数**只能在全局作用域中**运行
  - 语法：`new Function ([arg1, ...argN], functionBody)`
  ```js
    // 通常 安全问题 控制台会提示错误
    const plus = new Function("a", "b", "return a + b"); // 声明
    console.log(plus(1, 2)) // 3
  ```

## Function 实例属性
  - 在 `Function.prototype` 上定义的属性，并由所有 func 实例共享。
    + `Function.prototype.constructor` => `func 实例.constructor`
### Function.prototype.constructor
  - 创建实例对象的构造函数。对于 Function 实例来说，初始值是 Function 构造函数。
### func.length
- 指定函数期望的参数个数。
### func.name
- 函数的名称。
### func.prototype
- 在使用 `function` 作为构造函数与 `new` 运算符一起使用时，用作新对象的原型。

## Function 实例方法
  + 类数组 / 伪数组：具有 `length` 属性，并且整数（“索引”）属性的范围在 `[0,.length - 1]` 之间
### func.apply()
  - 功能：使用给定的 `this` 值（即：对象的上下文）和可选的参数数组（或类数组对象）作为参数来调用一个函数。
  - 语法：`func.apply(thisArg[, argsArray])`
  - 参数：
    + thisArg<Object 对象类型 | null>：调用 func 函数时提供的 `this` 值
    + argsArray<Array 数组类型 | 类数组类型 | null | undefined>：用于指定调用 func 函数时的参数，默认为 `null` 或 `undefined`
  - 返回值<Any 任意类型>：使用指定的 `this` 值和参数调用函数的结果
  - 通常 `fn.apply(null, args)` 等同于 `fn(...args)` 参数展开语法的 ，
    + 前者 `args` 期望是**类数组**对象，
    + 后者 `args` 期望是**可迭代**对象。
  ```js
    const arr1 = ["a", "b"];
    const arr2 = [0, 1, 2];
    const arr3 = ["a", "b"];
    const arr4 = [0, 1, 2];
    arr1.push(arr2)
    console.log(arr1) // ["a", "b", [0, 1, 2]]
    arr1.push.apply(arr3, arr4);
    console.log(arr3); // ["a", "b", 0, 1, 2]

    // 用 apply 调用 Math.min/Math.max 数组中的最小/最大值
    const list = [5, 6, 2, 3, 7];
    
    // 等价于 Math.max(list[0], …) 等价于 Math.max(5, 6, …)    
    let min = Math.min.apply(null, numbers); // 7
    let max = Math.max.apply(null, numbers); // 2
  ```
### func.call()
  - 功能：使用给定的 `this` 值（即：对象的上下文）和逐个提供的参数（列表形式）调用一个函数。
  - 语法：`func.bind(thisArg[, arg1, ...argN])`
  - 参数：
    + thisArg<Object 对象类型 | undefined>：调用 func 函数时提供的 `this` 值，默认值：`undefined`
    + argN<Any 任意类型列表>：调用 func 函数时的（列表形式）参数
  - 返回值<Any 任意类型>：使用指定的 `this` 值和参数调用函数的结果
     ```js
      function person() {
        console.log(`您好，我叫${this.name}, 是一位 ${this.age} 岁的高质量${this.gender}性！`);
      }
      const boy = {
        name: "如花",
        age: 18,
        gender: '男'
      };
      person.call(boy); // 您好，我叫如花, 是一位 18 岁的高质量男性！

      globalThis.globProp = "全局属性";
      function display() {
        console.log(`globProp 的值是 ${this.globProp}`);
      }
      display.call(); // “globProp 的值是 全局属性
    ```
  - `call()` 几乎等同于普通函数调用，只是将 `this` 作为普通参数传入
    + `map(arr, callback)` 来代替 `arr.map(callback)`
    + `arguments` 伪数组转换为数组
    ```js
      const slice = Array.prototype.slice; 

      slice.call(arguments)
    ```
  - 而将 `slice.call` 保存并将其作为普通函数调用，
    + 因为 `call()` 方法也会读取它的 `this` 值，而这个值应该是它要调用的函数。在这种情况下，应使用 `bind()` 来绑定 `call()` 的 `this` 值
    ```js
      // 与 上方示例中的  slice 相同
      const unboundSlice = Array.prototype.slice;
      const slice = Function.prototype.call.bind(unboundSlice);

      slice(arguments);
    ```
   
### func.bind()
  - 功能：在调用创建的新函数时，其 this 关键字被设置为提供的值，可选地在调用新函数时在提供的参数之前加上一系列给定的参数。
    + bind 创建的绑定函数将绑定时传入的参数（包括 this 的值和前几个参数）提前存储为其内部状态。而不是（像 apply 和 call 一样）在实际调用时传入
  - 语法：`func.bind(thisArg[, arg1, ...argN])`
  - 参数：
    + thisArg<Object 对象类型 | undefined>：在调用创建的绑定函数时，作为 this 参数传入 func 目标函数的值
    + argN<Any 任意类型列表>：在调用 func 时，传入到创建绑定函数的参数前的参数
  - 返回值<Function 函数类型>：使用指定的 `this` 值和初始参数（若提供）创建的给定函数的副本（即：boundFn 绑定函数）具备属性：
    + length<Number 数值类型>：目标函数的 `length` 减去被绑定的参数个数（不包括 `thisArg` 参数），最小值为 `0`。
    + name<String 字符串类型>：目标函数的 name 前加上 `"bound "` 前缀。
    + 温馨提示：绑定函数还会继承目标函数的原型链。但不会继承目标函数的其他自有属性（例，若目标函数是一个类，则不会继承其静态属性）
    ```js
      "use strict"; // 防止 `this` 被封装到到包装对象中

      function log(...args) {
        console.log(this, ...args);
      }
      const boundLog = log.bind("this value", 1, 2);
      const boundLog2 = boundLog.bind("new this value", 3, 4);
      boundLog2(5, 6); // "this value", 1, 2, 3, 4, 5, 6
    ```
  - 如果目标函数是可构造的，绑定函数也可使用 `new` 运算符进行构造.
    + argN 参数会传递给目标函数，而提供的 `this` 值会被忽略（因构造函数会有自己的 `this`）
    + 若直接构造绑定函数，`new.target` 将指向目标函数
    + 限制绑定函数只能使用 new 调用 或者反之只能在没有使用 new 的情况下调用，目标函数必须强制执行该限制，例：通过检查 `new.target !== undefined` 或使用 `class`。
    ```js
      class Base {
        constructor(...args) {
          console.log(new.target === Base);
          console.log(args);
        }
      }

      const BoundBase = Base.bind(null, 1, 2);
      new BoundBase(3, 4); // true, [1, 2, 3, 4]

      // 注：由于绑定函数没有 `prototype` 属性，它不能作为 `extends` 的基类
      class Derived extends class {}.bind(null) {} // TypeError: Class extends value does not have valid prototype property undefined
    ```
  - 当将绑定函数用作 `instanceof` 运算符右操作数时，`instanceof` 会访问绑定函数内部存储的目标函数，并读取其 `prototype` 属性。
    ```js
      class Base {}
      const BoundBase = Base.bind(null, 1, 2);
      console.log(new Base() instanceof BoundBase); // true
    ```
  - bind 创建一个函数。无论如何调用，它都会使用特定的 `this` 值进行调用。
    + 将一个方法从对象中提取出来，然后再调用，并期望方法中的 this 是原来的对象（如：回调中传入这个方法）
    ```js
      // 顶级的 this 绑定到 globalThis， 浏览器中它是 window 对象
      this.value = '全局值';

      const module = {
        value: "模块值",
        getValue() {
          return this.value;
        },
      };

      // getValue 的 this 参数绑定到 module
      console.log(module.getValue()); // "模块值"

      const retrieveVal = module.getValue;
      // retrieveVal 的 this 参数在非严格模式下绑定到 globalThis 。
      console.log(retrieveVal()); // '全局值'

      // 创建一个 boundGetVal 新函数并将 this 参数绑定到 module 。
      const boundGetVal = retrieveVal.bind(module);
      console.log(boundGetVal()); // "模块值"
    ```
  - 偏函数：创建一个具有预设初始参数的函数
    ```js
      function list(...args) {
        return args;
      }
      function add(arg1, arg2) {
        return arg1 + arg2;
      }

      console.log(list(1, 2, 3)); // [1, 2, 3]
      console.log(add(1, 2)); // 3

      const initialValList = list.bind(null, 'initial');  // 创建一个带有预设前导参数的函数
      const initialValAdd = add.bind(null, 100); // 创建一个带有预设第一个参数的函数。

      console.log(initialValList()); // [’initial‘]
      console.log(initialValList(1, 2, 3)); // [’initial‘, 1, 2, 3]
      console.log(initialValAdd(5)); // 105
      console.log(initialValAdd(5, 10)); // 105（最后一个参数 10 被忽略）
    ```
  - 绑定类: 在类上使用 bind() 会保留大部分类的语义，只是当前类的所有静态自有属性会丢失
    + 但由于原型链保留，类实例仍可以使用到继承自父类的静态属性的功能
    ```js
      class Base {
        static baseProp = "基类属性";
      }

      class Derived extends Base {
        static derivedProp = "派生类属性";
      }

      const BoundDerived = Derived.bind(null);
      console.log(BoundDerived.baseProp); // "基类属性"
      console.log(BoundDerived.derivedProp); // undefined
      console.log(new BoundDerived() instanceof Derived); // true
    ```
  - 作为构造函数使用的绑定函数 ：绑定函数同时适用于与 `new` 运算符一起使用，以用于构造目标函数创建的新实例
    ```js
      function Point(x, y) {
        this.x = x;
        this.y = y;
      }

      Point.prototype.toString = function () {
        return `${this.x},${this.y}`;
      };

      const pit = new Point(1, 2);
      pit.toString();  // '1,2'

      const YAxisPoint = Point.bind(null/*thisArg 被忽略*/, 0 /*x*/);

      const axisPoint = new YAxisPoint(5);
      axisPoint.toString(); // '0,5'

      axisPoint instanceof Point; // true
      axisPoint instanceof YAxisPoint; // true
      new YAxisPoint(17, 42) instanceof Point; // true
    ```
### func.toString()
  - 功能：返回表示函数源代码的字符串。重写了 Object.prototype.toString 方法。
  - 语法：`func.toString()`
  - 返回值<String 字符串类型>：表示函数源代码的字符串
    ```js
      function fnStr(fn) {
        console.log(fn.toString());
      }

      function f/* a comment */() {}
      class A {
        a() {}
      }
      function* g() {}

      console.log(`${f}`); // "function f/* a comment */() {}"
      fnStr(f); // "function f/* a comment */() {}"
      fnStr(A); // "class A { a() {} }"
      fnStr(g); // "function* g() {}"
      fnStr((a) => a); // "(a) => a"
      fnStr({ a() {} }.a); // "a() {}"
      fnStr({ *a() {} }.a); // "*a() {}"
      fnStr({ [0]() {} }[0]); // "[0]() {}"
      fnStr(Object.getOwnPropertyDescriptor({ get a() {} }, "a").get); // "get a() {}"
      fnStr(Object.getOwnPropertyDescriptor({ set a(x) {} }, "a").set); // "set a(x) {}"
      fnStr(Function.prototype.toString); // "function toString() { [native code] }"
      fnStr(function f() {}.bind(0)); // "function () { [native code] }"
      fnStr(Function("a", "b")); // function anonymous(a\n) {\nb\n
    ```
  - `new Function` 构造函数 使用 `toString`：返回创建后的函数源码（包括形参和函数体，函数名为 `anonymous`）
    ```js
      new Function("a", "b", "return a + b").toString()
      function anonymous(a,b
      ) {
      return a + b
      }
    ```
### func[@@hasInstance]()
  - 功能：指定确定构造函数是否将对象识别为其实例的默认过程。由 `instanceof` 运算符调用。
  - 语法：`func[Symbol.hasInstance](value)`
  - 参数：
    + value<Object 对象类型>：要测试的对象
  - 返回值<Boolean 布尔类型>：原始值始终返回 `false`：
    + 如果 `func.prototype` 在 `value` 的原型链中，则返回 `true`，反之 `false`；
    + 如果 `value` 不是一个对象或 `this` 不是一个函数，则始终返回 `false`。
    + 如果 `this` 是一个绑定函数，则返回 `value` 和底层目标函数进行 `instanceof` 的结果。
    ```js
      class Foo {}
      const foo = new Foo();
      console.log(foo instanceof Foo === Foo[Symbol.hasInstance](foo)); // true
    ```
  - 在调用默认的 `instanceof` 行为，检测构造函数是否重写了 `[@@hasInstance]()` 方法
    ```js
      class Foo {
        static [Symbol.hasInstance](value) {
          return false; // 自定义实现
        }
      }

      const foo = new Foo();
      console.log(foo instanceof Foo); // false
      console.log(Function.prototype[Symbol.hasInstance].call(Foo, foo)); // true
    ```
## 参考资料
  - [MDN Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)