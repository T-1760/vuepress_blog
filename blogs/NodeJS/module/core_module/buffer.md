---
sidebar: auto
title: buffer 模块
date: 2023-10-18
tags:
 - buffer 模块
 - Node.js 核心模块
categories: 
 - 核心模块
---

## buffer 缓冲区
  - JavaScript 语言本身只有字符串数据类型，没有二进制数据类型
    + 故此 Node.js 通过 Buffer 缓冲区进行处理二进制数据
  - Buffer 类似于数组的对象， 用于表示固定长度的字节序列。
    + 虽然 Buffer 类在 Node.js 全局作用域内可用，但仍然建议通过 `require` 或  `import`显式引用。
    + Buffer 本质是一段内存空间，专门用来处理二进制数据。
  - Buffer 类 Uint8Array 类的子类
  - Buffer 实例同时也是 Uint8Array 和 TypedArray 的实例
  - Buffer 的特点
    + Buffer 大小固定且无法调整
    + Buffer 性能较好，可以直接对计算机内存进行操作
    + 每个元素的大小为 1 字节（byte）

### buffer 缓冲区字符编码
  - 在 Buffer 和字符串之间转换时，需要指定字符编码。 默认为：`UTF-8`
  - 编码字符串不区分大小写。
    + 例，UTF-8 可以指定为 `'utf8'`、`'UTF8'` 或 `'uTf8'`。
  - buffer 编码与解码
    + 将 Buffer 转换为 String 称为解码，将 String 转换为 Buffer 称为编码。
    + 此约定命名的字符编码：`'utf8'`、`'utf16le'`、`'latin1'`
  - 二进制转文本命名相反
    * 将 Buffer 转换为 String 称为编码，将 String 转换为 Buffer 称为解码。
    + 此约定命名的字符编码：`'base64'`、`'base64url'`、`'hex'`
  - 字符编码：
    + `'utf8'`（别名：`'utf-8'`）： 多字节编码的 Unicode 字符。 
      * 许多网页和其他文档格式都使用 UTF-8。 这是默认的字符编码。不符合规定的字符，将用 `U+FFFD` 表示这些错误。
    + `'utf16le'`（别名：`'utf-16le'`）： 多字节编码的 Unicode 字符。 
      * 与 `'utf8'` 不同，字符串中的每个字符都将使用 2 或 4 个字节进行编码。
      +  Node.js 仅支持 `UTF-16` 的小端变体。
    + `'latin1'`: `Latin-1` 代表 `ISO-8859-1`。此字符编码仅支持 `U+0000` 至 `U+00FF` 的 Unicode 字符。 
      * 每个字符都使用单个字节进行编码。不符合该范围的字符将被截断并映射到该范围内的字符。
    + `'base64'`: Base64 编码。 从字符串创建 Buffer 时，此编码需要正确遵循"URL 和文件名安全字母表"。 
      * base64 编码的字符串中包含的空白字符（例如空格、制表符和换行符）会被忽略。
    + `'base64url'`: base64url 编码。 当从字符串创建 Buffer 时，此编码也将正确接受常规的 base64 编码的字符串。 
      * 当将 Buffer 编码为字符串时，此编码将忽略填充。
    + `'hex'`: 将每个字节编码为两个十六进制字符。 
      * 当解码不完全由偶数个十六进制字符组成的字符串时，可能会发生数据截断。
    + 不推荐`'ascii'`: 仅适用于 7 位 ASCII 数据。当将字符串编码为 Buffer 时，等效于 `'latin1'`。
    + 不推荐`'binary'`: `'latin1'` 的别名。 此编码的名称很容易让人误解，因为这里列出的所有编码都在字符串和二进制数据之间进行转换。 对于字符串和 Buffer 之间的转换，通常 'utf8' 是正确的选择。
    + 不推荐`'ucs2'`/`'ucs-2'`: `'utf16le'` 的别名。 UCS-2 过去指的是 UTF-16 的一种变体，它不支持代码点大于 U+FFFF 的字符。 在 Node.js 中，始终支持这些代码点。
    ```js
      const { Buffer } = require('buffer');
      
      const buf = Buffer.from('hello world', 'utf8');
      console.log(buf.toString('hex')); // 68656c6c6f20776f726c64
      console.log(buf.toString('base64')); // aGVsbG8gd29ybGQ=
      console.log(Buffer.from('fhqwhgads', 'utf8')); // <Buffer 66 68 71 77 68 67 61 64 73>
      console.log(Buffer.from('fhqwhgads', 'utf16le')); // <Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00>

      // 第一个非十六进制值时截断数据, ('g') 发生数据截断.
      Buffer.from('1ag123', 'hex'); // <Buffer 1a>,

      Buffer.from('1a7', 'hex'); // <Buffer 1a>, data truncated when data ends in single digit ('7').
      Buffer.from('1634', 'hex'); // <Buffer 16 34>, all data represented.
     
    ```

### Buffer 缓冲区与 TypedArray
  - Buffer API 和 TypedArray API 之间存在细微的不兼容
    + `TypedArray.prototype.slice()` 
      + 创建 TypedArray 部分的副本，而 `Buffer.prototype.slice()` 在现有 Buffer 上创建视图而不进行复制。 
      + 此行为可能会有意外，并且仅存在于旧版兼容性中。 
      * `TypedArray.prototype.subarray()` 优先用于在 Buffer 和其他 TypedArray 上实现 `Buffer.prototype.slice()` 的行为
    + `buf.toString()` 与其对应的 TypedArray 不兼容。
    + 还有其他多种方法，例：`buf.indexOf()` 支持额外的参数。
  - 从 Buffer 创建新的 TypedArray 实例两种方式：
    + 将 Buffer 传递给 TypedArray 构造函数将复制 Buffer 内容，解释为整数数组，而不是目标类型的字节序列
      ```js
        const { Buffer } = require('buffer');
        const buf = Buffer.from([1, 2, 3, 4]);
        const uint32array = new Uint32Array(buf);
        console.log(uint32array);//  Uint32Array(4) [ 1, 2, 3, 4 ]
      ```
    + 传递 ArrayBuffer 底层的 Buffer 将创建一个与 Buffer 共享其内存的 TypedArray
      ```js
        const { Buffer } = require('buffer');

        const buf = Buffer.from('hello', 'utf16le');
        const uint16array = new Uint16Array(
          buf.buffer,
          buf.byteOffset,
          buf.length / Uint16Array.BYTES_PER_ELEMENT);

        console.log(uint16array); // Uint16Array(5) [ 104, 101, 108, 108, 111 ]
      ```
  - 通过以相同的方式使用 TypedArray 对象的 .buffer 属性，可以创建与 TypedArray 实例共享相同分配内存的新 Buffer。 
    + `Buffer.from()` 在这种情况下等同 `new Uint8Array()`。
    ```js
    const { Buffer } = require('node:buffer');

    const arr = new Uint16Array(2);
    arr[0] = 5000;
    arr[1] = 4000;

    const buf_1 = Buffer.from(arr); // 复制 arr 的内容。
    const buf_2 = Buffer.from(arr.buffer); // 与 arr 共享内存。

    console.log(buf_1);// <Buffer 88 a0>
    console.log(buf_2);// <Buffer 88 13 a0 0f>

    arr[1] = 6000;
    console.log(buf_1);// <Buffer 88 a0>
    console.log(buf_2);// <Buffer 88 13 70 17>
    ```
  - 使用 `TypedArray.buffer` 创建 Buffer 时，可以通过 `byteOffset` 和 `length` 参数仅使用底层 ArrayBuffer 的一部分。
    ```js
      const { Buffer } = require('node:buffer');

      const arr = new Uint16Array(20);
      const buf = Buffer.from(arr.buffer, 0, 16);

      console.log(buf.length); // 16
    ```
  - `Buffer.from()` 和 `TypedArray.from()` 具有不同的签名和实现。 
    + TypedArray 变体接受第二个参数，该参数是在类型化数组的每个元素上调用的映射函数 `TypedArray.from(source[, mapFn[, thisArg]])`
    + Buffer.from() 方法不支持使用映射函数：
      * `Buffer.from(array)`
      * `Buffer.from(buffer)`
      * `Buffer.from(arrayBuffer[, byteOffset[, length]])`
      * `Buffer.from(string[, encoding])`
      
## buffer 创建 
  - Buffer.alloc
  - Buffer.allocUnsafe
  - Buffer.from

### Buffer.alloc()
  - 功能：创建指定大小的 Buffer 缓冲区
  - 语法：`Buffer.alloc(size[, fill[, encoding]])`
  - 参数：
    + size <integer\>：新的 Buffer 所需的长度。取值 `[0, buffer.constants.MAX_LENGTH]` 范围
    + fill <String\> | <Buffer\> | <Uint8Array\> | <integer\>: 用于预填充新 Buffer 的值。默认值：`0`。
    + encoding <String\>: 若 `fill` 参数为字符串，其为此字符串的编码。默认值：`'utf8'`。
  - 返回值<Buffer\>：缓冲区
  - 若 `fill` 参数为 `undefined`，则 Buffer 将被填零
    ```js
      const { Buffer } = require('buffer');
      
      // 创建一个长度为 10 字节的 Buffer（申请了 10 字节的内存空间，每个字节的值为 `0`）
      const buf_1 = Buffer.alloc(10); // <Buffer 00 00 00 00 00 00 00 00 00 00>
    
      const buf_2 = Buffer.alloc(5, 'a');// <Buffer 61 61 61 61 61>

      const buf_3 = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64'); // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
    ```
  - 提示：`Buffer.alloc()` 可能比 `Buffer.allocUnsafe()` 慢得多，但确保新创建的 Buffer 实例内容永远不会包含以前分配的敏感数据或没有为 Buffer 分配的数据情况。

### Buffer.allocUnsafe
  - 功能：
  - 语法：`Buffer.allocUnsafe(size)`
  - 参数：
    + size <integer\> 新的 Buffer 所需的长度。取值 `[0, buffer.constants.MAX_LENGTH]` 范围
  - 返回值<Buffer\>：缓冲区
  - `Buffer.alloc()` 来用 `0` 来初始化 Buffer 实例，而 `Buffer.allocUnsafe()` 创建实例的底层内存没有被初始化，内容未知。（可能包含敏感数据，输出的是内容地址）
    ```js
      const { Buffer } = require('buffer');

      const buf = Buffer.allocUnsafe(10);

      console.log(buf); // Prints (contents may vary): <Buffer a0 8b 28 3f 01 00 00 00 50 32>

      buf.fill(0);
      console.log(buf);// Prints: <Buffer 00 00 00 00 00 00 00 00 00 00>
    ```

### Buffer.from()
  - 功能：向堆外内存新增 Buffer
  - `Buffer.from(array)`、`Buffer.from(string)` 与 `Buffer.allocUnsafe()` 同样使用内部 Buffer 池。
#### 语法：`Buffer.from(array)`
  - 功能：使用 0 范围内的 array 字节分配一个新的 `Buffer – 255`。
    + 该范围之外的数组条目将被截断以符合它
  - 参数：
    + array <integer[]\>：类似 Array 的对象（即：具有 number 类型的 length 属性的对象，所有其他 TypedArray 变体都可）
  - 返回值<Buffer\>：缓冲区
    ```js
      const { Buffer } = require('buffer');

      // 创建一个新的包含 'buffer' 字符串的 UTF-8 编码字节的 Buffer
      const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    ```
  - 推荐使用 `Buffer.copyBytesFrom()` 对 `TypedArray` 的字节创建 Buffer

#### 语法：`Buffer.from(arrayBuffer[, byteOffset[, length]])`
  - 功能：创建 ArrayBuffer 的视图，而无需复制底层内存
  - 参数：
    + arrayBuffer <ArrayBuffer\> | <SharedArrayBuffer\> 例: `TypedArray.buffer` 属性。
    + byteOffset <integer\> 要暴露的第一个字节的索引。 默认值：`0`。
    + length <integer\> 要暴露的字节数。 默认值：`arrayBuffer.byteLength - byteOffset`。
  - 返回值<Buffer\>：缓冲区
  - `arrayBuffer` 参数为 `TypedArray.buffer` 属性的引用时，新创建的 Buffer 将与 `TypedArray` 的底层 `ArrayBuffer` 共享相同的分配内存
    ```js
      const arr = new Uint16Array(2);
      arr[0] = 5000;
      arr[1] = 4000;

      // 与 `arr` 共享内存
      const buf = Buffer.from(arr.buffer);
      console.log(buf); // <Buffer 88 13 a0 0f>

      // 改变原始的 Uint16Array 也会改变 Buffer
      arr[1] = 6000;
      console.log(buf); // <Buffer 88 13 70 17>

      // 指定将与 Buffer 共享的 arrayBuffer 的内存范围
      const ab = new ArrayBuffer(10);
      const buf_range = Buffer.from(ab, 0, 2);
      console.log(buf_range.length); // 2

      const arrA = Uint8Array.from([0x63, 0x64, 0x65, 0x66]); // 4 elements
      const arrB = new Uint8Array(arrA.buffer, 1, 2); // 2 elements
      console.log(arrA.buffer === arrB.buffer); // true
      console.log(Buffer.from(arrB.buffer)); // <Buffer 63 64 65 66>
    ```

#### 语法：`Buffer.from(buffer)`
  - 功能：将传入的 buffer 数据复制到新的 Buffer 实例上
  - 参数
    + buffer <Buffer\> | <Uint8Array\> 要从中复制数据的现有 Buffer 或 Uint8Array。
  - 返回值<Buffer\>：缓冲区
    ```js
      const { Buffer } = require('node:buffer');

      const buf_a = Buffer.from('buffer');
      const buf_b = Buffer.from(buf_a);

      buf_a[0] = 0x61;

      console.log(buf_a.toString()); // auffer
      console.log(buf_b.toString()); // buffer
    ```

#### 语法：`Buffer.from(object[, offsetOrEncoding[, length]])`
  - 参数：
    + object <Object\> 支持 `Symbol.toPrimitive` 或 `valueOf()` 的对象。
    + offsetOrEncoding <integer\> | <String\> 字节偏移量或编码。
    + length <integer\> 长度。
  - 返回值<Buffer\>：缓冲区
  - 对于 `valueOf()` 函数返回的值不严格等于 object 的对象，则返回 `Buffer.from(object.valueOf(), offsetOrEncoding, length)`。
    ```js
      const { Buffer } = require('node:buffer');

      const buf = Buffer.from(new String('this is a test')); 
      // <Buffer 74 68 69 73 20 69 73 20 61 20 74 65 73 74>
    ```
  - 对于支持 `Symbol.toPrimitive` 的对象，则返回 `Buffer.from(object[Symbol.toPrimitive]('string'), offsetOrEncoding)`。
    ```js
      const { Buffer } = require('buffer');

      class Foo {
        [Symbol.toPrimitive]() {
          return 'this is a test';
        }
      }

      const buf = Buffer.from(new Foo(), 'utf8');
      // <Buffer 74 68 69 73 20 69 73 20 61 20 74 65 73 74>
    ```

#### 语法：`Buffer.from(string[, encoding])`
  - 功能：创建包含 string 的新 Buffer 
  - 参数：
    + string <String\>：要编码的字符串。
    + encoding <String\>：string 参数的字符编码。 默认值：`'utf8'`。
  - 返回值：
    ```js
      const { Buffer } = require('node:buffer');

      const buf_1 = Buffer.from('this is a tést');
      const buf_2 = Buffer.from('7468697320697320612074c3a97374', 'hex');

      console.log(buf_1.toString()); // this is a tést
      console.log(buf_2.toString()); // this is a tést
      console.log(buf_1.toString('latin1')); // this is a tÃ©st
    ```

## buffer 静态属性
  - Buffer.poolSize

### Buffer.poolSize
  - 功能：用于池的预分配内部 Buffer 实例的大小（以字节为单位）。该值可修改。
  - 返回值<integer\>：默认值：`8192`

## buffer 静态方法
  - Buffer.alloc()
  - Buffer.copyBytesFrom()
  - Buffer.concat()
  - Buffer.isBuffer()
  
### Buffer.alloc()
  - 功能：分配指定字节数量的新 Buffer。 
  - 语法：`Buffer.alloc(size[, fill[, encoding]])`
  - 参数：
    + size<integer\>：新的 Buffer 所需的字节长度
    + fill<String\> | <Buffer\> | <Uint8Array\> | <integer\> : 预填充新 Buffer 的值。 默认值：`0`
      * 若 `fill` 参数为 `undefined`，则 Buffer 将被填零
    + encoding<String\>：若 `fill` 参数是字符串，则本参数就是它的编码。 默认值： `'utf8'`
  - 返回值<Buffer\>：缓存区
  ```js
    const { Buffer } = require('buffer');

    const buf_1 = Buffer.alloc(5);   
    const buf_2 = Buffer.alloc(5, 'a'); 
    const buf_3 = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');
    
    console.log(buf_1); // <Buffer 00 00 00 00 00>
    console.log(buf_2); // <Buffer 61 61 61 61 61>
    console.log(buf_3); // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
  ```

### Buffer.copyBytesFrom()
  - 功能：将 view 的底层内存复制到新的 Buffer 中
  - 语法：`Buffer.copyBytesFrom(view[, offset[, length]])`
  - 参数：
    + view <TypedArray\>：要复制的 `TypedArray` 数据。
    + offset <integer\>: `view` 参数的起始偏移量。 默认值: `0`。
    + length <integer\>: `view` 参数要复制的元素数。 默认值：`view.length - offset`。
  - 返回值<Buffer\>：缓存区
    ```js
      const { Buffer } = require('buffer');

      const u16 = new Uint16Array([0, 0xffff]);
      const buf = Buffer.copyBytesFrom(u16, 1, 1);

      u16[1] = 0;
      console.log(buf.length); // 2
      console.log(buf[0]); // 255
      console.log(buf[1]); // 255
    ```

### Buffer.concat()
  - 功能：缓冲区合并
  - 语法：`Buffer.concat(list[, totalLength])`
  - 参数：
    + list <Buffer[]\> | <Uint8Array[]\> 要连接的 Buffer 或 Uint8Array 实例的列表。
    + totalLength <integer\> 连接时 list 中 Buffer 实例的总长度（强制为无符号整数）。
  - 返回值<Buffer\>：拼接成的新缓存区
    ```js
      const { Buffer } = require('buffer');

      // 从一个包含三个 Buffer 实例的数组创建为一个单一的 Buffer。
      const buf1 = Buffer.alloc(10);
      const buf2 = Buffer.alloc(14);
      const buf3 = Buffer.alloc(18);
      const totalLength = buf1.length + buf2.length + buf3.length;
      console.log(totalLength); // 42 

      const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);
      console.log(bufA); // <Buffer 00 00 00 00 ...>
      console.log(bufA.length); // 42
    ```
  - 若 `list `参数列表中没有条目，或者 `totalLength` 参数为 `0`，则返回新的零长度 Buffer
  - 若 list 参数列表中的 Buffer 的组合长度大于 `totalLength` 参数，则结果将被截断为 totalLength。
  - `Buffer.concat()` 与 `Buffer.allocUnsafe()` 同样使用内部 Buffer 池。

### Buffer.isBuffer()
  - 功能：检测数据是否为 Buffer 缓冲区
  - 语法：`Buffer.isBuffer(obj)`
  - 参数：
    + obj <Object\> 检测参数
  - 返回值<boolean\>： 检测结果
    ```js
      const { Buffer } = require('buffer');

      Buffer.isBuffer(Buffer.alloc(10)); // true
      Buffer.isBuffer(Buffer.from('foo')); // true
      Buffer.isBuffer('a string'); // false
      Buffer.isBuffer([]); // false
      Buffer.isBuffer(new Uint8Array(1024)); // false
    ```

## buffer 实例属性
  - buf.length
  - buf.buffer
  - buf.byteOffset
### buf.length
  - 功能：缓冲区字节长度
  - 返回值<integer\>： buf 缓冲区的字节数
    ```js
      const { Buffer } = require('buffer');

      const buf = Buffer.alloc(1234);
      console.log(buf.length); // 1234

      buf.write('some string', 0, 'utf8');
      console.log(buf.length); // 1234
    ```

### buf.buffer
  - 功能：创建此 Buffer 对象所基于的底层 ArrayBuffer 对象
  - 返回值<ArrayBuffer\>：ArrayBuffer 对象。
    ```js
      const { Buffer } = require('node:buffer');

      const arrayBuffer = new ArrayBuffer(16);
      const buffer = Buffer.from(arrayBuffer);

      console.log(buffer.buffer === arrayBuffer); // true
    ```
  - 温馨提示：不保证此 ArrayBuffer 与原始 Buffer 完全对应

### buf.byteOffset
  - 功能：Buffer 底层 ArrayBuffer 对象的 byteOffset 属性
  - 返回值<integer\> ArrayBuffer 对象的 `byteOffset` 属性
    ```js
      const { Buffer } = require('buffer');
      
      // 创建一个小于 Buffer.poolSize 的 Buffer
      const nodeBuffer = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

      // Buffer 缓冲区强制转换为 Int8Array 时，请使用 byteOffset
      new Int8Array(nodeBuffer.buffer, nodeBuffer.byteOffset, nodeBuffer.length);
    ```
  - 温馨提示：使用 `buf.buffer` 直接访问底层 ArrayBuffer 时可能会导致问题，
    + 因为 ArrayBuffer 的其他部分可能与 Buffer 对象本身无关
  - 当在 `Buffer.from(ArrayBuffer, byteOffset, length)` 中设置 `byteOffset` 时，或在分配小于 `Buffer.poolSize` 的 Buffer 时，缓冲区不会从底层 ArrayBuffer 上的零偏移量开始。
  - 创建与 Buffer 共享内存的 TypedArray 对象时，需要正确指定 `byteOffset` 参数 

## buffer 实例方法
  - buf.compare()
  - buf.copy()
  - buf.write()
  - buf.values()
  - buf.toJSON()
  - buf.toString()
### buf.compare()
  - 功能：缓冲区比较
  - 语法：`buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])`
  - 参数：
    + target <Buffer\> | <Uint8Array\>：用于比较 `buf` 的 Buffer 或 Uint8Array 参考值。
    + targetStart <integer\>：`target` 参考值内开始比较的偏移量。 默认值：`0`。
    + targetEnd <integer\>：`target` 参考值中结束比较（不包括）的偏移量。 默认值：`target.length`。
    + sourceStart <integer\> `buf` 内开始比较的偏移量。 默认值：`0`。
    + sourceEnd <integer\> `buf` 中结束比较（不包括）的偏移量。 默认值：`buf.length`。
  - 返回值 <integer\>：比较 `buf` 在排序顺序中是在 `target` 之前、之后还是与 `target` 相同。（比较基于每个 Buffer 中的实际字节序列）
    + 如果 `target` 与 `buf` 相同，则返回 `0`
    + 如果排序时 `target` 应该在 `buf` 之前，则返回 `1`。
    + 如果排序时 `target` 应该在 `buf` 之后，则返回 `-1`。
  ```js
    const { Buffer } = require('buffer');

    const buf1 = Buffer.from('ABC');
    const buf2 = Buffer.from('BCD');
    const buf3 = Buffer.from('ABCD');

    console.log(buf1.compare(buf1)); // 0
    console.log(buf1.compare(buf2)); // -1
    console.log(buf1.compare(buf3)); // -1
    console.log(buf2.compare(buf1)); // 1
    console.log(buf2.compare(buf3)); // 1
    console.log([buf1, buf2, buf3].sort(Buffer.compare)); // [ <Buffer 41 42 43>, <Buffer 41 42 43 44>, <Buffer 42 43 44> ] 等价予 [buf1, buf3, buf2].)

    const buf_1 = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const buf_2 = Buffer.from([5, 6, 7, 8, 9, 1, 2, 3, 4]);

    console.log(buf_1.compare(buf_2, 5, 9, 0, 4)); // 0
    console.log(buf_1.compare(buf_2, 0, 6, 4)); // -1
    console.log(buf_1.compare(buf_2, 5, 6, 5)); // 1
  ```
  
### buf.copy()
  - 功能：缓冲区复制
  - 语法：`buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])`
  - 参数：
    + target <Buffer\> | <Uint8Array\> 要复制到的 Buffer 或 Uint8Array。
    + targetStart <integer\> target 内开始写入的偏移量。 默认值：`0`。
    + sourceStart <integer\> buf 内开始复制的偏移量。 默认值：`0`。
    + sourceEnd <integer\> buf 内停止复制的偏移量（不包括）。 默认值：`buf.length`。
  - 返回值 <integer\> 复制的字节数。
    ```js
      // 拷贝 buf_1 中第 16 个至第 19 个字节到 buf2 第 8 个字节起
      const { Buffer } = require('buffer');
      const buf_1 = Buffer.allocUnsafe(26);
      const buf_2 = Buffer.allocUnsafe(26).fill('!');
      
      for (let i = 0; i < 26; i++) {
        // 97 是 'a' 的十进制 ASCII 值
        buf_1[i] = i + 97;
      }
      
      buf_1.copy(buf_2, 8, 16, 20);      
      console.log(buf_2.toString('ascii', 0, 25)); // !!!!!!!!qrst!!!!!!!!!!!!!

      // 创建一个 Buffer ，并拷贝同一 Buffer 中一个区域的数据到另一个重叠的区域
      const buf = Buffer.allocUnsafe(26);

      for (let i = 0; i < 26; i++) {
        // 97 是 'a' 的十进制 ASCII 值
        buf[i] = i + 97;
      }

      buf.copy(buf, 0, 4, 10);
      console.log(buf.toString()); // efghijghijklmnopqrstuvwxyz
    ```
  - 与 `TypedArray.prototype.set()` 执行相同的操作，并且可用于所有 TypedArrays

### buf.write()
  - 功能：写入缓冲区
  - 语法：`buf.write(string[, offset[, length]][, encoding])`
  - 参数：
    + string <String\> 要写入 `buf` 的字符串。
    + offset <integer\> 开始写入 `string` 之前要跳过的字节数。 默认值：`0`。
    + length <integer\> 要写入的最大字节数（不超过 `buf.length - offset`）。 默认值：`buf.length - offset`。
    + encoding <String\> `string` 的字符编码。 默认值：`'utf8'`。
  - 返回值 <integer\> 写入的字节数。
    ```js
      const { Buffer } = require('node:buffer');

      const buf = Buffer.alloc(256);
      const len = buf.write('\u00bd + \u00bc = \u00be', 0);
      console.log(`${len} 字符: ${buf.toString('utf8', 0, len)}`);// 12 字符: ½ + ¼ = ¾

      const buffer = Buffer.alloc(10);
      const length = buffer.write('abcd', 8);
      console.log(`${length} 字符: ${buffer.toString('utf8', 8, 10)}`);// 2 字符 : ab
    ```

### buf.values()
  - 功能：缓存区转换为迭代器。（在 `for..of` 语句中使用 Buffer 时，会自动调用此函数）
  - 返回值<Iterator\>：缓冲区迭代器
    ```js
        const { Buffer } = require('node:buffer');

        const buf = Buffer.from('buffer');

        for (const value of buf.values()) {
          console.log(value);
        }
        //   98
        //   117
        //   102
        //   102
        //   101
        //   114

        for (const value of buf) {
          console.log(value);
        }
        //   98
        //   117
        //   102
        //   102
        //   101
        //   114
    ```

###	buf.toJSON()
  - 功能：将 Buffer 缓冲区转换为 JSON 对象
  - 返回值<Object\>：缓冲区的 JSON 对象
  -  `JSON.stringify()` 在字符串化 Buffer 实例时隐式调用此函数
  - `Buffer.from(buf.toJSON())` 类似于 `Buffer.from(buf)`。
    ```js
      const { Buffer } = require('buffer');

      const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
      const json = JSON.stringify(buf);
      console.log(json); // {"type":"Buffer","data":[1,2,3,4,5]}

      const copy = JSON.parse(json, (key, value) => {
        return value && value.type === 'Buffer' ?
          Buffer.from(value) :
          value;
      });
      console.log(copy); // <Buffer 01 02 03 04 05>
    ```

### buf.toString()
  - 功能：将 Buffer 缓冲区转换为 string 字符串
  - 语法：`buf.toString([encoding[, start[, end]]])`
  - 参数：
    + encoding <String\> 要使用的字符编码。 默认值：`'utf8'`。
    + start <integer\> 开始解码的字节偏移量。 默认值：`0`。
    + end <integer\> 停止解码的字节偏移量（不包括在内）。 默认值：`buf.length`。
  - 返回值<String\>：缓冲区的字符串
    ```js
      const { Buffer } = require('buffer');

      const buf_1 = Buffer.allocUnsafe(26);
      for (let i = 0; i < 26; i++) {
        // 97 是 'a' 的十进制 ASCII 值
        buf_1[i] = i + 97;
      }
      console.log(buf_1.toString('utf8')); // abcdefghijklmnopqrstuvwxyz
      console.log(buf_1.toString('utf8', 0, 5)); // abcde

      const buf_2 = Buffer.from('tést');
      console.log(buf_2.toString('hex')); // 74c3a97374
      console.log(buf_2.toString('utf8', 0, 3)); // té
      console.log(buf_2.toString(undefined, 0, 3)); // té
    ```
  - 若 `encoding` 参数为 `'utf8'` 且输入中的字节序列不是有效的 UTF-8，则每个无效字节都将替换为替换字符 `U+FFFD`。 

## 参考资料
  - [Node.js v20.9.0 中文网](https://nodejs.cn/api/buffer.html#%E7%B1%BBbuffer)