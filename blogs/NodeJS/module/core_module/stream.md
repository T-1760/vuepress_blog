---
sidebar: auto
title: stream 模块
date: 2023-10-18
tags:
 - stream 模块
 - Node.js 核心模块
 - 流
categories: 
 - 核心模块
---

## stream 流
  - stream 流是用于在 Node.js 中**处理流数据的抽象**接口
  - 所有的 stream 流都是 `EventEmitter` 的实例。
  - 对象模式：所有 stream 流都只对**字符串和 Buffer（或 Uint8Array）对象**进行操作。
  - stream 流可以是可读的、可写的、或两者兼而有之。Node.js 中流的四种基本类型：
    + `Readable`可读流：可读操作。写入数据的流（例：`fs.createWriteStream()`）
    + `Writable`可写流：可写操作。读取数据的流（例：`fs.createReadStream()`）
    + `Duplex`双工流：可读可写操作。Readable 和 Writable 的流（例：`net.Socket`）
    + `Transform`转换流：可以在读写数据时，修改或转换数据的 Duplex 流（例：`zlib.createDeflate()`）。
  - `Duplex` 和 `Transform` 流都是 `Writable` 写入流和 `Readable` 读取流两者的结合

### 缓冲
  - `Writable` 流和 `Readable` 流都将数据存储在内部缓冲区中。
  - 调用 `stream.push(chunk)` 时，数据缓存在 Readable 流中。 
    + 若流的使用者未调用 `stream.read()`，则数据会一直驻留在内部队列中，直到被使用。

### 流的管道
  - 管道：用于两种流之间的连接
    + 流的 data 事件复制文件：通过创建可读流获取（源文件）数据，可写流开始写入（到新文件）
    ```js
      import fs from 'fs'
      const readStream = fs.createReadStream('test.txt')
      const writeStream = fs.createWriteStream('copy.txt', { flags: 'w' })

      readStream.on('data', (buffer) => {
        console.log('data 事件传输数据')
        writeStream.write(buffer)
      })
    ```
  - 流的管道方法复制文件：连接可读流和可写流，无需手动，可读流数据自动传输到可写流中。
    ```js
      import fs from 'fs'

      const readStream = fs.createReadStream('test.txt')
      const writeStream = fs.createWriteStream('copy.txt', { flags: 'w' })

      readStream.pipe(writeStream) // 将可读流直接流入可写流，实现读取再写入的操作

      /* 管道也可以添加事件 */
      readStream.on('end', () => {
        console.log('读取完毕，管道前链式调用可读流的 end 事件')
      }).pipe(writeStream).on('finish', () => {
          console.log('写入完成，管道后链式调用可读流的 finish 事件')
      })
    ```
  - 链式流：通过连接输出流到另外一个流并创建多个流操作链的机制。链式流常用于管道操作
    ```js
      const fs = require("fs");
      const zlib = require('zlib');

      // 压缩 input.txt 文件为 input.txt.gz
      fs.createReadStream('input.txt')
        .pipe(zlib.createGzip())
        .pipe(fs.createWriteStream('input.txt.gz'));

      // 解压 input.txt.gz 文件为 input.txt
      fs.createReadStream('input.txt.gz')
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream('input.txt'));

    ```
    
### 流、异步生成器、异步迭代器的兼容性
  - 在 JavaScript 中所支持的异步生成器和迭代器，异步生成器实际上是一流的语言级流构造。
#### 异步迭代器使用可读流
  - 异步迭代器在流上注册一个永久错误处理程序，以防止任何未处理的销毁后错误。
  ```js
    (async function() {
      for await (const chunk of readable) {
        console.log(chunk);
      }
    })();
  ```
  
#### 异步生成器创建可读流
  - 使用 `Readable.from()` 方法从异步生成器创建 Node.js 可读流：
  ```js
    const { Readable } = require('stream');

    const ac = new AbortController();
    const signal = ac.signal;

    async function * generate() {
      yield 'a';
      await someLongRunningFn({ signal });
      yield 'b';
      yield 'c';
    }

    const readable = Readable.from(generate());
    readable.on('close', () => {
      ac.abort();
    });

    readable.on('data', (chunk) => {
      console.log(chunk);
    });
  ```

#### 异步迭代器管道传输到可写流
  - 从异步迭代器写入可写流时，确保正确处理背压和错误。 
    + `stream.pipeline()` 抽象了背压和背压相关错误的处理：
    ```js
      const fs = require('fs');
      const { pipeline } = require('stream');
      const { pipeline: pipelinePromise } = require('stream/promises');

      const writable = fs.createWriteStream('./file');

      const ac = new AbortController();
      const signal = ac.signal;

      const iterator = createIterator({ signal });

      // Callback 回调模式
      pipeline(iterator, writable, (err, value) => {
        if (err) {
          console.error(err);
        } else {
          console.log(value, 'value returned');
        }
      }).on('close', () => {
        ac.abort();
      });

      // Promise 异步模式
      pipelinePromise(iterator, writable)
        .then((value) => {
          console.log(value, 'value returned');
        })
        .catch((err) => {
          console.error(err);
          ac.abort();
        });
    ```

## stream.Writable 可写流与 stream.Readable 可读流
  - Writable 可写流是**数据写入目的地**的抽象。
  - Readable 可读流是**对消费数据源**的抽象。
  - Writable 可写流和 Readable 可读流的示例
    | Writable 流示例(部分实现 Writable 的 Duplex 流) | Readable 流的示例 |
    |:--|:--|
    | 客户端上的 HTTP 请求 | 客户端上的 HTTP 响应 |
    | 服务器上的 HTTP 响应 | 服务器上的 HTTP 请求 |
    | 文件系统写入流       | 文件系统读取流 |
    | zlib 流             | zlib 流 |
    | 加密流              | 加密流 |
    | 套接字              | 套接字 |
    | 子进程标准输入       | 子进程标准输出和标准错误 |
    | `process.stdout`、`process.stderr` | `process.stdin` |
### Writable 可写流模式
  - 所有的 Writable 流都实现了 `stream.Writable` 类定义的接口, **都遵循相同的基本使用模式**
    ```js
      const myStream = getWritableStreamSomehow();

      myStream.write('some data');
      myStream.write('some more data');
      myStream.end('done writing data');
    ```
### Readable 可读流模式
  - 所有的 Readable 流都实现了 `stream.Readable` 类定义的接口。**以"流动和暂停"两种读取模式之一有效运行**
    + 在流动读取模式下，数据会自动从底层系统读取，并通过 EventEmitter 使用事件尽快提供给应用。
    + 在暂停读取模式下，必须显式调用 `stream.read()` 方法以从流中读取数据块。
  - 所有的 Readable 流都以暂停读取模式开始，
    + 切换为 "流动"读取模式
      * 添加 `data` 事件监听器。
      * 调用 `stream.resume()` 方法。
      * 调用 `stream.pipe()` 方法将数据发送到 Writable。
    + 切换为 "暂停"读取模式
      * 若存在管道目标，则（可通过 `stream.unpipe()`）删除所有管道目标。
      * 若没有管道目标，则调用 `stream.pause()` 方法。
  - 若 Readable 切换到流动读取模式，并且没有消费者使用处理数据，则数据将被丢失。 
    + 例：调用 `readable.resume()` 而没有绑定到 `data` 事件监听器时（或从流中删除 `data` 事件时）
  - 添加 `readable` 事件会自动使流停止流动，并且只能通过 `readable.read()` 来消费数据。 
    + 若删除 `readable` 事件，则只能在 `data` 事件监听器上，将流再次开始流动。

###  Readable 可读流的三种状态
  - Readable 可读流的 "两种模式" 操作，是对流实现中发生的更复杂内部状态管理的简化抽象。
  - 任何时刻，每个 Readable 可读流都处于三种可能的状态之一：
    + `readable.readableFlowing === null`
    + `readable.readableFlowing === false`
    + `readable.readableFlowing === true`
  - `readableFlowing` 属性为 `null` 
    + 不提供使用流数据的机制，流不会生成数据
  - `readableFlowing` 属性为 `true` 
    + 在 `readableFlowing` 属性为 `null`状态下，为 `data` 事件绑定监听器、调用 `readable.pipe()` 或 `readable.resume()` 方法，会将 `null` 状态切换到 `true`，从而使 Readable 在生成数据时开始主动触发事件。
  - `readableFlowing` 属性为 `false`
    + 调用 `readable.pause()`、`readable.unpipe()` 或接收背压，将导致 `readable.readableFlowing` 设置为 `false`，暂时停止事件的流动但不会停止数据的生成（可能会在流的内部缓冲区中累积）。 
    + 在 `readableFlowing` 属性为 `false`状态下，为 `data` 事件绑定监听器，不会切换到 `true` 状态。
    ```js
      const { PassThrough, Writable } = require('node:stream');
      const pass = new PassThrough();
      const writable = new Writable();

      pass.pipe(writable);
      pass.unpipe(writable);
      // readableFlowing 已为 false

      pass.on('data', (chunk) => { console.log(chunk.toString()); });
      // readableFlowing 仍为 false.

      pass.write('ok');  // 不会触发 'data' 事件
      pass.resume();     // 只有被调用了才会触发 'data' 事件

      // readableFlowing 已为 true.
    ```
    

## stream.Writable 可写流类
### 属性
  - writable
  - writableCorked
  - writableHighWaterMark
  - writableLength
  - writableObjectMode
  - writableNeedDrain
  - writableEnded
  - closed
  - writableFinished
  - destroyed
  - errored

#### writable.writable
  - 功能：可写流是否（可读）未被破坏，
    + 调用 `writable.write()` 是安全的（即：`true`）表示流尚未触发 `error` 或 `end`事件。
  - 返回值<Boolean\>

#### writable.writableCorked
  - 功能：需调用 `writable.uncork()` 以完全解开流的次数。
  - 返回值<integer\>

#### writable.writableHighWaterMark
  - 功能：返回创建 Writable 可写时，传入的 `highWaterMark` 的值。
  - 返回值<Number\>
  
#### writable.writableLength
  - 功能：包含队列中准备读取的字节数（或对象数）。
    + 该值提供有关 `highWaterMark` 状态的内省数据。
  - 返回值<Number\>

#### writable.writableObjectMode
  - 功能：获取给定 Writable 流的 `objectMode` 属性。
  - 返回值<Boolean\>

#### writable.writableNeedDrain
   - 功能：可写流的缓冲区是否已满。
    + 缓冲区已满且流将触发 `drain` 事件之后该值为 `true`。。
  - 返回值<boolean\>

#### writable.writableEnded
  - 功能：可写流是否已结束
    + 触发 `end` 事件之后该值为 `true`。
    + 使用 `writable.writableFinished` 代替指示数据是否已刷新
  - 返回值<Boolean\>

#### writable.closed
  - 功能：可写流是否已关闭
    + 触发 `close` 事件之后该值为 `true`。
  - 返回值<Boolean\>

#### writable.writableFinished
  - 功能：可写流是否已完成
    + 触发 `finish` 事件之后该值为 `true`。
  - 返回值<Boolean\>

#### writable.destroyed
  - 功能：可写流是否为已注销，
    + 调用 `writable.destroy()` 方法之后该值是 `true`。
  - 返回值<Boolean\>
    ```js
      const { Writable } = require('stream');

      const myStream = new Writable();
      console.log(myStream.destroyed); // false
      myStream.destroy();
      console.log(myStream.destroyed); // true
    ```

#### writable.errored
  - 功能：可写流的错误信息。
    + 可写流因错误而被销毁，则返回错误。
  - 返回值<Error\>

### 方法
  - cork()
  - uncork()
  - write()
  - end()
#### writable.cork()
  - 功能：强制所有写入的数据都缓存在内存中。 
    + 当调用 `stream.uncork()` 或 `stream.end()` 方法时，缓冲的数据将被刷新。
  - 语法：`writable.cork()`
  - `writable.cork()` 的主要目的：是适应将几个小块快速连续写入流的情况。
  - `writable.cork()` 不是立即将它们转发到底层目标，而是缓冲所有块，直到 `writable.uncork()` 被调用，
    + 如果存在 `writable.uncork()` 会将它们全部传给 `writable._writev()`。 
    + 这可以防止在等待处理第一个小块时正在缓冲数据的行头阻塞情况。
    + 但在不实现 `writable._writev()` 的情况下使用 `writable.cork()` 可能会对吞吐量产生不利影响。

#### writable.uncork()
  - 功能：刷新自调用 `stream.cork()` 以来缓冲的所有数据。
  - 语法：`writable.uncork()`
  - 当使用 `writable.cork()` 和 `writable.uncork()` 管理写入流的缓冲时，可使用 `process.nextTick()` 来推迟 `writable.uncork()` 的调用。 
    + 这样允许对在给定 Node.js 事件循环阶段中发生的所有 `writable.write()` 调用进行批处理。
    ```js
      stream.cork();
      stream.write('some ');
      stream.write('data ');
      process.nextTick(() => stream.uncork());
    ```
  - 如果在一个流上多次调用 `writable.cork()` 方法，则必须调用相同数量的 `writable.uncork()` 调用来刷新缓冲的数据。
    ```js
      stream.cork();
      stream.write('some ');
      stream.cork();
      stream.write('data ');
      process.nextTick(() => {
        stream.uncork();
        // 之前的数据只有在 uncork() 被二次调用后才会输出
        stream.uncork();
      });
    ```

#### writable.write()
  - 功能：将一些数据写入流，并在数据完全处理后调用提供的 callback。 
    + 如果发生错误，则 callback 将使用错误作为其第一个参数进行调用。
    + callback 是异步地调用，并且在 'error' 触发之前。
  - 语法：`writable.write(chunk[, encoding][, callback])`
  - 参数：
    + chunk <String\> | <Buffer\> | <Uint8Array\> | <Any\> 可选的要写入的数据。 
      * 对于不在对象模式的流，块将是字符串或 Buffer 或 Uint8Array
      * 对于处于对象模式的流，块可以是除 `null` 之外的任何 JavaScript 值。
    + encoding <String\> | <null\> 如果 chunk 为字符串，则为编码。 默认值：`'utf8'`
    + callback <Function\> 当刷新此数据块时的回调。
  - 返回值 <Boolean\>：
    + 若在接纳 chunk 后，内部缓冲区小于当创建流时配置的 `highWaterMark`，则返回值为 true。 
    + 如果返回 `false` 则应停止进一步尝试将数据写入流，直到触发 `drain` 事件。
  - 如果要写入的数据可以按需生成或获取，则建议将逻辑封装成 Readable 并且使用 `stream.pipe()`。 
    + 但如果首选调用 `write()`，则可以使用 `drain` 事件遵守背压并避免内存问题：
    ```js
    function write(data, cb) {
      if (!stream.write(data)) {
        stream.once('drain', cb);
      } else {
        process.nextTick(cb);
      }
    }   

    // 在回调函数被执行后再进行其他的写入
    write('hello', () => {
      console.log('吸入完成, 现在还能进行其他写入.');
    });
    ```


#### writable.end()
  - 功能：表示不再有数据写入 Writable。 
    + 可选的 chunk 和 encoding 参数允许在关闭流之前立即写入最后一个额外的数据块。
  - 语法：`writable.end([chunk[, encoding]][, callback])`
  - 参数：
    + chunk <String\> | <Buffer\> | <Uint8Array\> | <Any\> 可选的要写入的数据。
      * 对于不在对象模式的流，块将是字符串或 Buffer 或 Uint8Array
      * 对于处于对象模式的流，块可以是除 `null` 之外的任何 JavaScript 值。
    + encoding <String\>: chunk 为字符串时的编码
    + callback <Function\>: 流结束时的回调。
  - 返回值 <this\>
  - 在调用 `stream.end()` 之后不能调用 `stream.write()`，否则将引发错误。

### 事件
  - close 关闭事件
  - drain 再写入事件
  - error 错误事件
  - finish 完成事件
  - pipe 涌入管道事件
  - unpipe 涌出管道事件
#### close 关闭事件
  - 当流及其任何底层资源（例：文件描述符）已关闭时，则会触发 `close` 事件。 
    + 该事件表明将不再触发更多事件，并且不会发生进一步的计算。
  - 若 Writable 流是使用 `emitClose` 选项创建的，则始终会触发 `close` 事件。

#### drain 再写入事件
  - 若对 `stream.write(chunk)` 的调用返回 `false`，则 `drain` 事件将在适合继续将数据写入流时触发。
    ```js
      // 向可写流中写入数据一百万次。需要注意背压 （back-pressure）。
      function writeOneMillionTimes(writer, data, encoding, callback) {
        let i = 1000000;
        write();
        function write() {
          let ok = true;
          do {
            i--;
            if (i === 0) {
              // 最后 一次
              writer.write(data, encoding, callback);
            } else {
              // 检查是否可以继续写入。（这里不要传递 callback， 因为写入还未结束
              ok = writer.write(data, encoding);
            }
          } while (i > 0 && ok);
          // 当 'drain' 事件触发后继续写入  
          if (i > 0) {
            writer.once('drain', write);
          }
        }
      }
    ```

#### error 错误事件
  - 在写入或管道数据时发生错误，则会触发 `error` 事件。 
    + 监听器回调在调用时传入单个 Error 参数。
  - 在创建流将 `autoDestroy` 选项为 `true`时，当触发 `error` 事件将会关闭流。
  - 在 `error` 事件之后，不应再触发除 `close` 事件之外的事件。

#### finish 完成事件
  - 在调用 `stream.end()` 方法之后，并且所有数据都已刷新到底层系统，则触发 `finish` 事件。
    ```js
      const writer = getWritableStreamSomehow();
      for (let i = 0; i < 100; i++) {
        writer.write(`hello, #${i}!\n`);
      }
      writer.on('finish', () => {
        console.log('所有的写入现已完成.');
      });
      writer.end('到此结束\n');
    ```

#### pipe 涌入管道事件
  - 当在 Readable 可读流上调用 `stream.pipe()` 方法将此可写流添加到其目标集时，则触发 `pipe` 事件。
  - 参数（事件函数）
    + src <stream.Readable\> 管道到此可写流的源流
    ```js
      const writer = getWritableStreamSomehow();
      const reader = getReadableStreamSomehow();
      writer.on('pipe', (src) => {
        console.log('Something is piping into the writer.');
        assert.equal(src, reader);
      });
      reader.pipe(writer);
    ```

#### unpipe 涌出管道事件
  - 当在 Readable 可读流上调用 `stream.unpipe()` 时，则会触发 `unpipe` 事件，
    + 从其目标集合中删除此 Writable 可写流。
  - 参数（事件函数）
    + src <stream.Readable\> unpiped 这个可写的源码流

## stream.Readable 可读流类
  - 可读流的 data 数据块事件和 pipe 管道方法
 
### 属性
  - readable
  - readableEncoding
  - readableHighWaterMark
  - readableLength
  - readableObjectMode
  - readableFlowing
  - readableEnded
  - closed
  - destroyed
  - errored

#### readable.readable
  - 功能：可读流是否（可读）未被破坏，
    + 调用 `readable.read()` 是安全的（即：`true`）表示流尚未触发 `error` 或 `end`事件。
  - 返回值<Boolean\\>

#### readable.readableEncoding
  - 功能：获取可读流的编码。
    + 使用 `readable.setEncoding()` 方法可设置 `encoding` 属性。
  - 返回值<null\> | <String\>

#### readable.readableHighWaterMark
  - 功能：返回创建 Readable 可读流时，传递的 `highWaterMark` 的值。
  - 返回值<Number\>

#### readable.readableLength
  - 功能：包含队列中准备读取的字节数（或对象数）。
    + 该值提供有关 `highWaterMark` 状态的内省数据。
  - 返回值<Number\>

#### readable.readableObjectMode
  - 功能：获取给定 Readable 流的 `objectMode` 属性。
  - 返回值<Boolean\>

#### readable.readableFlowing
  - 功能：获取 Readable 可读流的当前状态。
  - 返回值<Boolean\>

#### readable.readableEnded
  - 功能：可读流是否已结束
    + 触发 `end` 事件之后该值为 `true`。
  - 返回值<Boolean\>

#### readable.closed
  - 功能：可读流是否已关闭
    + 触发 `close` 事件之后该值为 `true`。
  - 返回值<Boolean\>

#### readable.destroyed
  - 功能：可读流是否为已注销，
    + 调用 `readable.destroy()` 方法之后该值是 `true`。
  - 返回值<Boolean\>

#### readable.errored
  - 功能：可读流的错误信息。
    + 可读流因错误而被销毁，则返回错误。
  - 返回值<Error\>

### 方法
  - pause()
  - isPaused()
  - pipe()
  - unpipe()
  - read()
  - resume()
#### readable.pause()
  - 功能：将导致处于流动模式的流停止触发 `data` 事件，切换出流动模式。
    + 任何可用的数据都将保留在内部缓冲区中。
    + 存在 `readable` 事件监听器，则 `readable.pause()` 方法不起作用。
  - 语法：`readable.pause()`
  - 返回值<this\>
    ```js
      const readable = getReadableStreamSomehow();
      readable.on('data', (chunk) => {
        console.log(`已接收 ${chunk.length} 个字节的数据`);
        readable.pause();
        console.log('一秒内没有其他数据.');
        setTimeout(() => {
          console.log('现在数据将重新开始流动。');
          readable.resume();
        }, 1000);
      });
    ```

#### readable.isPaused()
  - 功能：返回 Readable 的当前运行状态。 
    + 这主要由作为 `readable.pipe()` 方法基础的机制使用。 
    + 通常情况下，尽可能不要直接使用此方法。
  - 语法：`readable.isPaused()`
  - 返回值 <Boolean\>
    ```js
      const readable = new stream.Readable();

      readable.isPaused(); // === false
      readable.pause();
      readable.isPaused(); // === true
      readable.resume();
      readable.isPaused(); // === false
    ```

#### readable.pipe()
  - 功能：将 Writable 流绑定到 readable，使其自动切换到流动模式并将其所有数据推送到绑定的 Writable。 
    + 数据流将被自动管理，以便目标 Writable 流不会被更快的 Readable 流漫过。
  - 语法：`readable.pipe(destination[, options])`
  - 参数：
    + destination <stream.Writable\> 写入数据的目标
    + options <Object\> 管道选项
      * end <Boolean\> 当读取结束时结束写入。 默认值：`true`。
  - 返回值<stream.Writable\>: 目的地，如果它是 Duplex 双工流或 Transform 转换流，则允许管道链
    ```js
      // 将 readable 中的所有数据通过管道传输到名为 file.txt 的文件
      const fs = require('fs');

      const readable = getReadableStreamSomehow();
      const writable = fs.createWriteStream('file.txt');
      // readable 中的所有数据都传给了 'file.txt'
      readable.pipe(writable);
    ```
  - `readable.pipe()` 方法返回对目标流的引用，从而可以设置管道流链：
    + 将多个 Writable 流绑定到单个 Readable 流。
    ```js
      const fs = require('fs');
      const zlib = require('zlib');

      const r = fs.createReadStream('file.txt');
      const z = zlib.createGzip();
      const w = fs.createWriteStream('file.txt.gz');
      r.pipe(z).pipe(w);
    ```
  - 默认情况下，当源 Readable 流触发 `end` 时，则在目标 Writable 流上调用 `stream.end()`，因此目标流不再可写。 
    + 若要禁用此默认行为，可以将 end 选项设置为 `false` ，从而使目标流保持打开状态：
    ```js
      reader.pipe(writer, { end: false });

      reader.on('end', () => {
        writer.end('Goodbye\n');
      });
    ```
  - 注意：如果 Readable 流在处理过程中触发错误，则 Writable 目标不会自动关闭。 
    + 如果发生错误，则需要手动关闭每个流以防止内存泄漏。
  - 注意：`process.stderr` 和 `process.stdout` 中， Writable 流在 Node.js 进程退出之前永远不会关闭。

#### readable.unpipe()
  - 功能：分离之前 `stream.pipe()` 方法附加的 Writable 流。默认分离所有管道
  - 语法：`readable.unpipe([destination])`
  - 参数：
    + destination <stream.Writable\> 可选的要取消管道的特定流
  - 返回值<this\>
    ```js
      const fs = require('node:fs');
      const readable = getReadableStreamSomehow();
      const writable = fs.createWriteStream('file.txt');
      
      // 所有数据通过 readable 流入 'file.txt' 文件,
      // 但仅用了一秒钟
      readable.pipe(writable);
      setTimeout(() => {
        console.log('停止写入到 file.txt.');
        readable.unpipe(writable);
        console.log('手动关闭该文件流.');
        writable.end();
      }, 1000);
    ```

#### readable.read()
  - 功能：从内部缓冲区中读取数据并返回。 默认返回内部缓冲区中包含的所有数据
    + 如果没有数据可以读取，则返回 null。
    + 默认情况下数据以 Buffer 对象返回，除非使用 `readable.setEncoding()` 指定编码或流在对象模式下运行。
  - 语法：`readable.read([size])`
  - 参数：
    + size <Mumber\>: 用于指定要读取的数据量的字节数。必须小于或等于 1 GiB。
  - 返回值 <String\> | <Buffer\> | <null\> | <Any\>
    + 返回数据块，则还将触发 `data` 事件。
  - `readable.read()` 方法只在暂停模式下操作的 Readable 流上调用。 
    + 在流动模式下，会自动调用 `readable.read()`，直到内部缓冲区完全排空。
    ```js
      const readable = getReadableStreamSomehow();

      // 再缓冲区中数据 readable 流可能被触发多次
      readable.on('readable', () => {
        let chunk;
        console.log('可读的流（在缓冲区中接收到新数据）');
        // 使用循环确保读取所有当前可用的数据
        while (null !== (chunk = readable.read())) {
          console.log(`读取到 ${chunk.length} 个字节数据`);
        }
      });

      // 当没有更多可用数据时，将触发一次 end 事件
      readable.on('end', () => {
        console.log('Reached end of stream.');
      });
    ```
  - `readable.read()` 每次都会返回一个数据块（块不是串联的）或 null。
    + 通过 `while` 循环来使用当前缓冲区中的所有数据。 
    + 在读取大文件时，`.read()` 可能会返回 null，虽然已经使用了所有缓冲的内容，但是还有更多的数据尚未缓冲。在这种情况下，当缓冲区中有更多数据时，将触发新的 `readable` 事件。 最后，当没有更多数据时，则将触发 `end` 事件。
    + 因此要从 readable 读取文件的全部内容，必须跨越多个 `readable` 事件来收集块：
    ```js
      const chunks = [];

      readable.on('readable', () => {
        let chunk;
        while (null !== (chunk = readable.read())) {
          chunks.push(chunk);
        }
      });

      readable.on('end', () => {
        const content = chunks.join('');
      });
    ```
  - 对象模式下的 Readable 流将始终调用 `readable.read(size)` （无视 `size` 参数）返回单个条目。

#### readable.resume()
  - 功能：导致显式暂停的 Readable 流恢复触发 `data` 事件，将流切换到流动模式。
    + 用于完全使用流中的数据，而无需实际处理任何数据
    + 存在 `readable` 事件监听器，则 `readable.resume()` 方法不起作用。
  - 语法：`readable.resume()`
  - 返回值 <this\>
    ```js
      getReadableStreamSomehow()
        .resume()
        .on('end', () => {
          console.log('流结束事件，没有处理任何数据.');
        });
    ```

### 事件
  - close 关闭事件
  - data 数据块事件
  - end 结束事件
  - error 错误事件
  - pause 暂停事件
  - resume 继续事件
  - readable 可读事件
#### close 关闭事件
  - 当流及其任何底层资源（例：文件描述符）已关闭时，则会触发 `close` 事件。 
    + 该事件表明将不再触发更多事件，并且不会发生进一步的计算。
  - 如果 Readable 流是使用 `emitClose` 选项创建的，则始终会触发 `close` 事件。

#### data 数据块事件
  - 每当流将数据块的所有权移交给使用者时，则会触发 `data` 事件。 
    + 通过调用 `readable.pipe()`、`readable.resume()`或将监听器回调绑定到 `data` 事件而将流切换到流动模式时，就会发生这种情况。
    + 每当调用 `readable.read()` 方法且可以返回数据块时，也会触发 `data` 事件。
  - 参数（事件函数）
    + chunk <Buffer\> | <String\> | <Any\> 数据块。 
      + 对于不在对象模式的流，块将是字符串或 Buffer。 
      + 对于处于对象模式的流，块可以是除 `null` 之外的任何 JavaScript 值。
  - 将 `data` 事件监听器绑定到尚未显式暂停的流，则会将流切换到流动模式。 数据将在可用时立即传入。
  - 使用 `readable.setEncoding()` 方法为流指定了默认编码，则监听器回调将把数据块作为字符串传递；否则数据将作为 Buffer 传递。
    ```js
      const readable = getReadableStreamSomehow();
      readable.on('data', (chunk) => {
        console.log(`Received ${chunk.length} bytes of data.`);
      });
    ```

#### end 结束事件
  - 当流中没有更多数据可供使用时，则会触发 `end` 事件。
  - `end` 事件不会被触发除非数据被完全消耗。 
    + 可通过将流切换到流动模式来实现，或通过重复调用 `stream.read()` 直到所有数据都被消费完。
    ```js
      const readable = getReadableStreamSomehow();
      readable.on('data', (chunk) => {
        console.log(`已接收 ${chunk.length} 个字节的数据.`);
      });
      readable.on('end', () => {
        console.log('将不再有数据.');
      });
    ```

#### error 错误事件
  - `error` 事件可以随时由 Readable 的实现触发。 
    + 如果底层流由于底层内部故障而无法生成数据，或者当流实现尝试推送无效数据块时，可能会发生这种情况。
  - 监听器回调将传入单个 `Error` 对象。

#### pause 暂停事件
  - 当调用 `stream.pause()` 且 `readableFlowing` 不为 `false` 时，则会触发 `pause` 事件。

#### resume 继续事件
  - 当调用 `stream.resume()` 且 `readableFlowing` 不为 `true` 时，则会触发 `resume` 事件。

#### readable 可读事件
  - 当有可从流中读取的数据或已到达流的末尾时，则将触发 `readable` 事件。 
    + 实际 `readable` 事件表明流有新的信息。 
    + 若数据可用，则 `stream.read()` 将返回该数据。
    ```js
      const readable = getReadableStreamSomehow();
      readable.on('readable', function() {
        // 这里具有一些已经可读的数据
        let data;

        while ((data = this.read()) !== null) {
          console.log(data);
        }
      });
    ```
  - 如果已经到达流的末尾（即便未能读取到任何数据），则调用 `stream.read()` 将返回 `null` 并触发 `end` 事件。 
    ```js
      const fs = require('fs');
      /* foo.txt 是一个空文件 */
      const rr = fs.createReadStream('foo.txt');
      rr.on('readable', () => {
        console.log(`readable: ${rr.read()}`);  // readable: null
      });
      rr.on('end', () => {
        console.log('end'); // end 
      });
    ```
  - 在某些情况下，为 'readable' 事件绑定监听器会导致一些数据被读入内部缓冲区。
    + 通常 `readable.pipe()` 和 `data` 事件机制比 `readable` 事件更容易理解。 但处理 `readable` 可能会导致吞吐量增加。
  - 如果同时使用 `readable` 事件和 `data` 事件，则 `readable` 事件优先控制流，即只有在调用 `stream.read()` 时才会触发 `data` 事件。
    + `readableFlowing` 属性将变为 `false`。 
    + 如果在删除 `readable` 时，有 `data` 监听器，流将开始流动，即 `data` 事件将在不调用 `.resume()` 的情况下触发。

## stream.Duplex 双工流和 Transform 转换流
  - Duplex 双工流同时实现 Readable 和 Writable 的流
  - Transform 转换流是 Duplex 流，其中输出以某种方式与输入相关。
  - Duplex 流与 Transform 流的示例
    | Duplex 流 | Transform 流 |
    |:--|:--|
    | zlib 流        | zlib 流 |
    | 加密流         | 加密流   |
    | Socket 套接字  |         |

### duplex 的属性
#### duplex.allowHalfOpen
  - 功能：手动更改现有 Duplex 流实例的半打开行为，但只能在触发 `end` 事件之前更改。
  - 返回值<Boolean\>
    + false 表示流将在可读端结束时自动结束可写端。最初由 `allowHalfOpen` 构造函数选项设置，默认为 `true`。

### transform 的方法
  - 常见的转换流 `zlib.createGzip()` 可以压缩文件数据。
    ```js
      import fs from 'fs'
      import zlib from 'zlib'

      const readStream = fs.createReadStream('test.txt')
      const duplexStream = zlib.createGzip()
      const writeStream = fs.createWriteStream('test.txt.gz', { flags: 'w' })
      
      readStream // 读
        .pipe(duplexStream) // 转换流压缩
        .pipe(writeStream)  // 写
    ```
#### transform.destroy()
  - 功能：销毁流，并可选择触发 `error` 事件。 
    + 在此调用之后，转换流将释放所有内部资源。 
    + 实现者不应覆盖此方法，而应实现 `readable._destroy()`。
    + Transform 的 `_destroy()` 的默认实现也会触发 `close` 事件（当 `emitClose` 为 `false` 除外）。
    + 一旦调用此方法，任何进一步的调用都将是空操作，除了` _destroy()` 之外的任何其他错误都不会作为 `error` 触发。
  - 语法：`transform.destroy([error])`
  - 参数
    + error <Error\>
  - 返回值 <this\>

## 参考资料
  - [Node.js v20.9.0 中文网](https://nodejs.cn/api/stream.html)