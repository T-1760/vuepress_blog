---
sidebar: auto
title: 事件 / 消息循环
date: 2023-10-18
tags:
 - ECMAScript 事件循环
 - 事件循环
 - 消息循环
categories: 
 - 事件循环
---

## 事件循环
  - javascript 是单线程的，这意味着它一次只能执行一个任务。然而 javascript 能够处理异步操作，归功于事件循环（EventLoop）机制
    + 浏览器是多线程的，其中有一个线程是事件循环线程，事件循环线程负责监听事件，当事件触发时，将事件添加到事件队列中，事件循环线程会不断地从事件队列中取出事件，执行事件对应的回调函数。

### 相关概念
#### 1. 调用栈（Call Stack）
  - 调用栈是一种数据结构，它记录了**当前正在执行的函数以及它们的调用顺序**。每当一个函数被调用时，都会将其添加到调用栈的顶部，并在函数执行完毕后从栈顶移除。
#### 2. 宏任务队列（MacroTask Queue）与宏任务（MacroTask）
  - 每次调用栈为空时，事件循环会从 宏任务队列 中取出最前面的任务执行。执行完这个宏任务后，再去执行 微任务队列中 的所有任务。
  - 宏任务主要包括 
    + 整体代码块 `script`：这是最顶层的代码，作为一个宏任务执行
    + 定时器（`setTimeout`、`setInterval`）
    + I/O 操作（如文件读写、网络请求）
    + UI 渲染（浏览器中的重绘、回流）
    + `requestAnimationFrame`（浏览器动画）
    + `setImmediate` (Node.js 环境)。
#### 3. 微任务队列（MicroTask Queue）与 微任务（MicroTask）
  - 微任务是**在当前操作完成后立即执行的任务**，即在当前宏任务结束后，在下一个宏任务开始前执行。
  - 微任务的特点：
    1. 执行时机在每个宏任务执行结束后立即处理
    2. 不会触发新的事件循环（即：不进入事件循环的下一轮）
    3. 执行过程中产生的微任务会加入微任务队列尾部，并立即执行
  - 微任务主要包括 
    + Promise 的回调（ `Promise.then()`、`Promise.catch()`、`Promise.finally`）
    + queueMicrotask（显式添加微任务 `window.queueMicrotask(callback)` 或 `WorkerGlobalScope.queueMicrotask(callback)`）
    + `MutationObserver`（浏览器环境，监听 DOM 变化）
    + `process.nextTick()`（Node.js环境）
### 事件循环的工作流程
  1. 执行全局脚本（作为第一个宏任务），将整个脚本放入调用栈中执行（此过程是同步的）。
  2. 当遇到异步操作（如：定时器、网络请求、DOM 事件等），这些操作不会立即执行，而是按照类型将（回调函数）任务放入相应的任务队列（宏任务队列或微任务队列）中。
  3。当调用栈为空时，事件循环开始检查任务队列（优先级：微队列 高于 宏队列）
  4. 事件循环首先会按顺序执行完所有的微任务后，浏览器可能会进行一次 UI 渲染（取决于具体实现）。
    > 可优先使用微任务来处理大量异步操作, 减少 UI 更新的频率，从而提升渲染性能。
  5. 事件循环然后会从宏任务队列中取出一个任务并执行，之后再次执行所有产生的微任务，如此循环往复。
  ```js
    console.log('宏任务 Script Start'); // 同步代码

    setTimeout(() => {
      console.log('宏任务 setTimeout'); // 回调属于宏任务，在下一次事件循环迭代时执行
    }, 0);

    new Promise((resolve, reject) => {
      console.log('宏任务 Script Promise'); // 同步代码
    })

    Promise.resolve().then(() => {
        console.log('微任务 Promise resolve then 回调'); //  属于微任务，在当前宏任务结束后的微任务阶段执行。
    });

    console.log('宏任务 Script End'); // 同步代码

    // 宏任务 Script Start
    // 宏任务 Script Promise
    // 宏任务 Script End
    // 微任务 Promise resolve then 回调
    // 宏任务 setTimeout
  ```

## 参考资料
  - [JavaScript的宏任务(MacroTask)和微任务(MicroTask)](https://blog.csdn.net/weixin_74183307/article/details/148308708)