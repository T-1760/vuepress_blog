---
sidebar: auto
title: util 模块
date: 2023-10-18
tags:
 - util 模块
 - Node.js 核心模块
categories: 
 - 核心模块
---

## util 工具
  - 功能：提供给 Node.js 内部 API 的工具方法
  - 语法：`const util = require('util'); `

## util 常用方法
- 风格转换
  + `util.promisify` <=> `util.callbackify`
  + `util.TextEncoder` <=> `util.TextDecoder`
- 调试工具
  + `util.debuglog`
  + `util.inspect`
  + `util.format`
  + `util.getSystemErrorName`
  + `util.isDeepStrictEqual`
- 类型判断
  + `util.types.isAnyArrayBuffer(value)`
  + `util.types.isArrayBufferView(value)`
  + `util.types.isArgumentsObject(value)`
  + `util.types.isArrayBuffer(value)`
  + `util.types.isAsyncFunction(value)`
  + `util.types.isBigInt64Array(value)`
  + `util.types.isBigUint64Array(value)`
  + `util.types.isBooleanObject(value)`
  + `util.types.isBoxedPrimitive(value)`
  + `util.types.isCryptoKey(value)`
  + `util.types.isDataView(value)`
  + `util.types.isDate(value)`
  + `util.types.isExternal(value)`
  + `util.types.isFloat32Array(value)`
  + `util.types.isFloat64Array(value)`
  + `util.types.isGeneratorFunction(value)`
  + `util.types.isGeneratorObject(value)`
  + `util.types.isInt8Array(value)`
  + `util.types.isInt16Array(value)`
  + `util.types.isInt32Array(value)`
  + `util.types.isKeyObject(value)`
  + `util.types.isMap(value)`
  + `util.types.isMapIterator(value)`
  + `util.types.isModuleNamespaceObject(value)`
  + `util.types.isNativeError(value)`
  + `util.types.isNumberObject(value)`
  + `util.types.isPromise(value)`
  + `util.types.isProxy(value)`
  + `util.types.isRegExp(value)`
  + `util.types.isSet(value)`
  + `util.types.isSetIterator(value)`
  + `util.types.isSharedArrayBuffer(value)`
  + `util.types.isStringObject(value)`
  + `util.types.isSymbolObject(value)`
  + `util.types.isTypedArray(value)`
  + `util.types.isUint8Array(value)`
  + `util.types.isUint8ClampedArray(value)`
  + `util.types.isUint16Array(value)`
  + `util.types.isUint32Array(value)`
  + `util.types.isWeakMap(value)`
  + `util.types.isWeakSet(value)`
  
### util.promisify()
  - 功能：将用遵循错误优先的回调风格的函数（即：`(err, value) => {... }`）转换为 `Promise` 的版本
  - 语法：`util.promisify(original)`
  - 参数：
    + original <Function\>:  遵循错误优先的回调风格的函数
  - 返回值 <Function\>： `Promise` 函数版本
  ```js
    const util = require('util');
    const fs = require('fs');

    const stat = util.promisify(fs.stat);
    // 链式调用
    stat('.').then((stats) => {
      console.log(`该目录所在于 ${stats.uid}`);
    }).catch((error) => {
      // Handle the error.
    });
    
    // async await 调用
    async function callStat() {
      const stats = await stat('.');
      console.log(`该目录所在于 ${stats.uid}`);
    }
    callStat(); 
  ```

### util.callbackify()
  - 功能：将 `Promise` 函数转换为遵循错误优先回调风格的函数 （即：`(err, value) => {... }`）
    + 在回调函数中，第一个 `err` 参数表示拒绝原因（若 Promise 已解决，则为 `null`），第二个参数将是已解决的值。
  - 语法：`util.callbackify(original)`
  - 参数：
    + original <Function\>:  `Promise` 函数
  - 返回值 <Function\>： 转换成的错误优先回调风格的函
  ```js
    const util = require('util');

    async function fn() {
      return 'hello world';
    }
    const callbackFunction = util.callbackify(fn);

    callbackFunction((err, ret) => {
      if (err) throw err;
      console.log(ret); // 'hello world' 
    });
  ```

### util.isDeepStrictEqual()
  - 功能：比较两个值是否深度严格相等
  - 语法： `util.isDeepStrictEqual(source, target)`
  - 参数：
    + source <Any\>: 比较数据源
    + target <Any\>: 比较目标值
  - 返回值 <Boolean\>：`true` 严格相等， `false` 严格不相等
  
## 参考资料
  - [Node.js v20.9.0 中文网](https://nodejs.cn/api/util.html)