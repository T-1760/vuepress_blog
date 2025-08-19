---
sidebar: auto
title: Closure 闭包
date: 2023-10-18
tags:
 - Closure
 - 闭包
categories: 
 - 词法作用域
---

## 闭包概念
  - 闭包是指函数能够访问并记住其词法作用域（Lexical Scope）,即便该函数在其作用域外执行。
  - 闭包核心在于**函数与它被创建时所处的作用域链绑定在一起**。
    + 闭包是**函数和其词法环境（包含变量、参数等）的组合**，当一个函数在其外部作用域中被调用时，依旧可以访问其创建时，所处的作用于中的变量。
### 核心机制‌
  - 词法作用域‌：函数在定义时确定作用域链，而非执行时。闭包通过作用域链访问外部变量。‌
  - 环境保留‌：当内部函数被返回或传递时，外部函数的作用域会被保留，不会被垃圾回收。
    ```js
      function outer() {
        let count = 0; // 外部函数的变量

        function inner() { // 内部函数（闭包）
          count++; // 访问外部变量
          console.log(count);
        }

        return inner; // 返回内部函数
      }

      const closureFn = outer(); // outer() 执行完毕，但 count 被 inner 引用，不会销毁

      closureFn(); // 输出 1
      closureFn(); // 输出 2（count 状态被保留）
    ```

### 核心特点
  - 持久化变量：闭包中的外部变量会一直存在，直到闭包被销毁，从而实现状态的持久化。
  - 私有性：可隐藏数据，仅通过闭包暴露特定操作（类似私有变量），实现数据封装，避免全局污染。
  - 跨作用域访问：闭包可以访问定义时的整个作用域链（自身、外部函数、全局作用域）。
  - 模块化基础：闭包是 JavaScript 模块化编程的核心技术之一，通过创建模块模式实现代码隔离与接口暴露。
  
### 注意事项
  - ‌内存泄漏风险‌：闭包可能因长期持有外部变量导致内存占用过高，需谨慎管理变量生命周期。 ‌
  - ‌性能考量‌：闭包对象创建次数由外部函数调用次数决定，频繁调用可能影响效率。
## 闭包应用场景
  | 场景 | 作用 |
  |:-----|:-----|
  | 私有变量  | 封装数据，避免全局污染 |
  | 模块模式  | 构建可维护的模块化代码 |
  | 柯里化    | 函数复用与参数预设 |
  | 事件/异步 | 保持上下文与状态 |
  | 防抖/节流 | 优化性能 |
  | 记忆化    | 缓存结果，提升效率 |
  | 迭代器    | 实现自定义遍历逻辑 |
  - 注意：**闭包会阻止变量被垃圾回收，过度使用可能导致内存泄漏**，需谨慎管理。
### 1. 数据封装与私有变量
  - 闭包可以用来**创建私有变量，防止外部直接访问和修改**，从而实现数据的封装。
    + ✅ 优点：避免全局污染，保护内部状态。
    ```js
      function createCounter() {
          let count = 0; // 私有变量
          return function() {
              count++;
              console.log(count);
          };
      }

      const counter = createCounter();
      counter(); // 1
      counter(); // 2
      // 外部无法直接访问或修改 `count`
    ```
### 2. 模块化编程（Module Pattern）
  - 利用闭包可以**模拟模块，暴露有限的接口，隐藏内部实现细节**。
    + ✅ 优点：适用于组织代码、构建可维护的大型应用。
    ```js
      const MyModule = (function() {
        let privateVar = "私有数据";

        function privateMethod() {
          console.log(privateVar);
        }

        return {
          publicMethod: function() {
              privateMethod();
          }
        };
      })();

      MyModule.publicMethod(); // 输出: 私有数据
    ```
### 3. 函数柯里化（Currying）
  - 闭包可用于**实现函数的柯里化**，将**多参数函数转换为单参数函数的链式调用**。
    + ✅ 优点：提高函数的复用性和灵活性。
    ```js
      function add(a) {
        return function(b) {
            return a + b;
        };
      }

      const add5 = add(5);
      console.log(add5(3)); // 8
      console.log(add(2)(4)); // 6
    ```
### 4. 回调函数与事件处理
  - 闭包常用于**异步操作、事件监听中保存上下文信息**。
    ```js
      for (var i = 0; i < 3; i++) {
        // 若不用闭包，var 会导致输出全是 3（经典问题）。使用 let 或闭包可解决。
        (function(index) {
            setTimeout(() => {
                console.log(`Index: ${index}`);
            }, 100);
        })(i);
      }
      // 输出: Index: 0, Index: 1, Index: 2
    ```
### 5. 防抖（Debounce）与节流（Throttle）
  - 闭包用于**保存定时器状态，控制函数执行频率**。
    + ✅ 优点：优化性能，避免频繁触发事件。
    ```js
      function debounce(func, delay) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
      }

      // 使用示例
      window.addEventListener('resize', debounce(() => {
        console.log('窗口大小已调整');
      }, 300));
    ```
### 6. 函数记忆（Memoization）
  - 闭包可用于**缓存函数执行结果，提高性能**。
    + ✅ 优点：避免重复计算，提升效率。
    ```js
      function memoize(fn) {
        const cache = {};

        return function(x) {
            if (cache[x] !== undefined) return cache[x];

            console.log('计算中...');
            return cache[x] = fn(x);
        };
      }

      const factorial = memoize(function(n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
      });

      factorial(5); // 计算中... 返回  120
      factorial(5); // 直接返回缓存结果
    ```
### 7. 迭代器与生成器模拟
  - 闭包可用于**创建自定义迭代器**。
    ```js
      function createIterator(arr) {
        let index = 0;
        return {
            next: function() {
                return index < arr.length ?
                    { value: arr[index++], done: false } :
                    { value: undefined, done: true };
            }
        };
      }

      const iter = createIterator([1, 2, 3]);
      console.log(iter.next()); // { value: 1, done: false }
      console.log(iter.next()); // { value: 2, done: false }
    ```
## 参考资料
  - [闭包概念、特点、用途、判断、销毁、检测](https://blog.csdn.net/qq_49596922/article/details/146564401)