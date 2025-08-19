---
sidebar: auto
title: http 模块
date: 2023-10-18
tags:
 - http 模块
 - Node.js 核心模块
categories: 
 - 核心模块
---

## http 协议通信
  - Node.js 中，使用 HTTP 服务器 或 客户端（即：代理服务器转发请求）
    + 创建服务器
      ```js
        //匿名函数
        const http = require('http');
        
        http.createServer(function(request, response){
            response.writeHead(200, {"Content-Type": 'text/plain'});
            response.write("Hello world");
            response.end();
        }).listen(8000)        
      ```
    + 创建客户端
      ```js
        //服务端
        const http = require('http');
        const https = require('https')
        // 真正处理的业务服务器
        const reqOption = { 
            protocol: 'https:',
            host: 'getman.cn',
            path: '/mock/shopList',
            method: 'POST',
            headers: {
                "content-type": "application/json",
            }
        }
        function proxyApi(_data) {
          return new Promise((resolve, reject) => {
            let req = https.request(reqOption, (res) => {
              let data = '';
              res.on('data', (chunk) =>data += chunk);
              res.on('end', () => {
                resolve(data)
              });
            })
            req.write(_data)
            req.end();
          })
        }
        let server = http.createServer((req, res) => {
          let proxyData = ''
          req.on('data', data => proxyData += data)
          req.on('end', () => {
            proxyApi(proxyData).then((proxyRes) => {
              res.write(proxyRes)
              res.end()
            })
          })
        })

        server.listen(3000, () => console.log("服务已开启，端口 3000 "));
      ```
  - Node.js 中的 HTTP 模块主要特点是：从不缓冲整个请求或响应，因此能流式传输数据。(如：大量或块编码的消息)
  - HTTP 消息头由类似对象表示（键是小写的。 值不可修改）
    ```js
      { 
        'content-length': '123',
        'content-type': 'text/plain',
        'connection': 'keep-alive',
        'host': 'example.com',
        'accept': '*/*' 
      }
    ```
  - Node.js 的 HTTP API 是非常低层的（支持所有 HTTP 应用）
    + http 模块只进行流处理和消息解析（将消息解析为标头和正文），但不解析实际的标头或正文
    + 接收到的原始标头在 `rawHeaders` 属性中，属性值以 `[key, value, ..., keyN, valueN ]` 数组表示。
    ```js
      [
        'ConTent-Length', '123456',
        'content-LENGTH', '123',
        'content-type', 'text/plain',
        'CONNECTION', 'keep-alive',
        'Host', 'example.com',
        'accepT', '*/*' 
      ]
    ```
  - HTTP 模块中的四大类
    + http.Agent
    + http.ClientRequest
    + http.ServerResponse
    + http.IncomingMessage
    + http.OutgoingMessage

### http 模块属性
  - METHODS
  - STATUS_CODES
  - globalAgent
  - maxHeaderSize
#### http.METHODS
  - 功能：解析器支持的 HTTP 方法列表
  - 返回值<string[]>
  
#### http.STATUS_CODES
  - 功能：所有标准 HTTP 响应状态代码的集合，以及每个的简短描述。
    + 例如，`http.STATUS_CODES[404] === 'Not Found'`
  - 返回值<Object\>

#### http.globalAgent
  - 功能：用作所有 HTTP 客户端请求的默认值。
  - 返回值<http.Agent\>：Agent 的全局实例

#### http.maxHeaderSize
  - 功能：指定 HTTP 标头的最大允许大小（只读属性）。 默认为 `16` KiB （以字节为单位）
    + 使用 `--max-http-header-size` 命令行选项进行配置
    + 通过传入 `maxHeaderSize` 选项为服务器和客户端请求覆盖。
  - 返回值<Number\>

### http 模块方法
  - createServer()
  - request()
  - get()
  - validateHeaderName()
  - validateHeaderValue()
  - setMaxIdleHTTPParsers()

#### http.createServer()
  - 功能：用于创建 http.Server 的实例。
  - 语法：`http.createServer([options][, requestListener])`
  - 参数：
    + options <Object\>
      * connectionsCheckingInterval <Number\>: 设置间隔值用以检查不完整请求中的请求与标头超时。 默认值：`30000` 以毫秒为单位。
      + headersTimeout <Number\>: 设置从客户端接收完整 HTTP 标头的超时值。默认值：`60000` 以毫秒为单位。
        > 可参考 `server.headersTimeout`
      * highWaterMark <Number\>：可选择覆盖所有 socket 的 `readableHighWaterMark` 和 `writableHighWaterMark`。默认值：可参考 `stream.getDefaultHighWaterMark()`。
        > 将影响 `IncomingMessage` 参数和 `ServerResponse.highWaterMark` 属性。 
      * insecureHTTPParser <Boolean\> 是否使用不安全的 HTTP 解析器，默认值：`false`。当为 `true` 时接受无效的 HTTP 标头。
      * IncomingMessage <http.IncomingMessage\> 指定要使用的 IncomingMessage 类。 用于扩展原始的 IncomingMessage。 默认值：`IncomingMessage`。
      * joinDuplicateHeaders <Boolean\> 是否使用 `,` 逗号连接请求中多个标头的字段行值，默认值：`false` 表示丢弃重复项。
        > 可参考 `message.headers`。
      * keepAlive <Boolean\>  在收到新的传入连接后立即在套接字上是否启用保持活动功能，默认值：`false`。
        > 类似于在 `socket.setKeepAlive([enable][, initialDelay])`、`socket.setKeepAlive(enable, initialDelay)` 中所做的事情。
      * keepAliveInitialDelay <Number\> 如果设置为正数，则表示在空闲套接字上发送第一个保持活跃探测之前的初始延迟。 默认值：`0`。
      * keepAliveTimeout: 在完成写入最后一个响应之后，在套接字将被销毁之前，服务器需要等待额外传入数据的不活动毫秒数。 默认值：`5000`。
        > 可蚕参考 `server.keepAliveTimeout`
      * maxHeaderSize <Number\> 覆盖服务请求的 `--max-http-header-size` 请求标头的最大长度值。 默认值： `16384` (16 KiB)。以字节为单位
      * noDelay <Boolean\>: 在收到新的传入连接后是否禁用 Nagle 算法。 默认值：`true`。
      * requestTimeout<Number\>: 设置从客户端接收整个请求的超时值。 默认值：`300000` 以毫秒为单位
        > 可参考 `server.requestTimeout` 。
      * requireHostHeader <Boolean\> 是否强制服务器以 `400`（错误请求）状态码响应任何缺少主机标头（按照规范的规定）的 HTTP/1.1 请求消息。 默认值：`true`。
      * ServerResponse <http.ServerResponse\> 指定要使用的 ServerResponse 类。用于扩展原始的 ServerResponse。 默认值： `ServerResponse`。
      * uniqueHeaders <Array\> 只应发送一次的响应标头列表。 如果标头的值是数组，则子项将使用 `;` 连接。
    + requestListener <Function\>：添加到 `request` 事件的函数
  - 返回值 <http.Server\>：http.Server 的新实例。
    ```js
      const http = require('http');

      /* 创建本地服务器从中获取数据 */
      // 方式一
      const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          data: 'Hello World!',
        }));
      });

      server.listen(8000);

      // 方式二
      const server = http.createServer();
      server.on('request', (request, res) => { // 监听服务的 request 事件
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          data: 'Hello World!',
        }));
      });
      server.listen(8000);
    ```

#### http.request()
  - 功能：服务器处理多个连接以触发 HTTP 请求
  - 语法：`http.request(url[, options][, callback])`
    + 简写：`http.request(options[, callback])`
    + `url` 和 `options` 两参数会合并对象，`options` 参数优先级高于 `url` 参数
  - 参数：
    + url <String\> | <URL\> 若为字符串，将使用 `new URL()` 解析。若为 URL 对象，将转换为普通的 `options` 对象
    + options <Object\>
      * agent <http.Agent\> | <Boolean\> 控制 Agent 的行为。
        > - `undefined`（默认）： 使用 `http.globalAgent` 作为主机和端口。
        > - `Agent` 对象：显式使用传入的 Agent。
        > - `false`: 使用具有默认值的新 Agent。
      * auth <String\>: 用于计算授权标头的基本身份验证 (`user:password`)。
      * createConnection <Function\> 当不使用 agent 选项时，生成用于请求的套接字/流的函数。 
        > - 可避免创建自定义 Agent 类只是为了覆盖默认的 `createConnection` 函数。 
        > - 可参考 `agent.createConnection()`。 任何 Duplex 流都是有效的返回值。
      * defaultPort <Number\> 协议的默认端口。
        > 若使用 `Agent`，则为默认值：`agent.defaultPort`，否则为 `undefined`。
      * family <Number\>：解析 `host` 或 `hostname` 时要使用的 IP 地址族。 
        > 有效值为 `4` 或 `6`。当未指定时，则将使用 IPv4 和 IPv6。
      * headers <Object\> 包含请求头的对象。
      * hints <Number\> 可选 `dns.lookup()` 提示。
      * host <String\> 要向其触发请求的服务器的域名或 IP 地址。 默认值：`'localhost'`。
      * hostname <String\> host 的别名。 
        > 为了支持 `url.parse()`，`hostname` 选项优先级高于 `host` 选项。
      * insecureHTTPParser <Boolean\>：是否使用不安全的 HTTP 解析器，默认值 `false`。当为 `true` 时接受无效的 HTTP 标头。
        > 可参考 `--insecure-http-parser`。
      * joinDuplicateHeaders <Boolean\>：是否使用 `,` 逗号连接请求中多个标头的字段行值，默认值：`false` 表示丢弃重复项。
        > 可参考 `message.headers`。
      * localAddress <String\>：用于绑定网络连接的本地接口。
      * localPort <Number\>：连接的本地端口。
      * lookup <Function\>：自定义查找函数。 默认值：`dns.lookup()`。
      * maxHeaderSize <Number\>：服务器接收到的响应，可选择覆盖服务请求的 `--max-http-header-size` 请求标头的最大长度值。 默认值： `16384` (16 KiB)。以字节为单位
      * method <String\>：指定 HTTP 请求方法的字符串。默认值：`'GET'`。
      * path <String\>：请求的路径（包括查询字符串，例：`'/index.html?page=12'`）。 默认值： `'/'`
      * port <Number\>：远程服务器的 `defaultPort` 端口。 默认值：`80`。
      * protocol <String\>：要使用的协议。 默认值：`'http:'`。
      * setHost <Boolean\>：指定是否自动添加 Host 标头。 默认为 `true`。
      * signal <AbortSignal\>：用于中止正在进行的请求的中止信号。
      * socketPath <String\> Unix 域套接字。 
        > `host` 选项或 `port` 选项将不能使用，这两个选项是用于指定 TCP 套接字。
      * timeout <Number\>：指定套接字超时的数字（以毫秒为单位）。将在连接套接字之前设置超时。
      * uniqueHeaders <Array\>：只应发送一次的响应标头列表。如果标头的值是数组，则子项将使用 `;` 连接。
    + callback <Function\>：添加为 `response` 事件的单次监听器
  - 返回值 <http.ClientRequest\>：ClientRequest 实例是可写流。
    + 若需使用 POST 请求上传文件，则写入 ClientRequest 对象
  - 无论是否有数据写入请求体，`http.request()` 必须始终调用 `req.end()` 来表示请求的结束。
    ```js
      const http = require('http');

      const postData = JSON.stringify({msg: 'Hello World!'});
      const options = {
        hostname: 'www.google.com',
        port: 80,
        path: '/upload',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      };

      const req = http.request(options, (res) => {
        console.log(`状态码: ${res.statusCode}`);
        console.log(`响应头: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
          console.log('响应无数据.');
        });
      });

      req.on('error', (e) => {
        console.error(`请求出错: ${e.message}`);
      });

      req.write(postData);  // 写入数据到请求体
      req.end();

      
      /* 使用 URL 作为 options 参数 */
      const options = new URL('http://abc:xyz@example.com');
      const req = http.request(options, (res) => {
        // ...
      });
    ```
  - 在请求期间遇到任何错误（ DNS 解析错误、TCP 级别错误、实际的 HTTP 解析错误），都会在返回的请求对象上触发 `error` 事件（未注册 `error` 监听器，则会抛出错误）。
  - 特殊的标头（请求头）。
    + 发送 `Connection: keep-alive` 会通知 Node.js，服务器的连接应一直持续到下一个请求。
    + 发送 `Content-Length` 请求头会禁用默认的块编码。
    + 发送 `Expect` 请求头会立即发送请求头。通常当发送 `Expect: 100-continue` 时，则超时时间与 `continue` 事件监听器都需要被设置。
    + 发送 `Authorization` 请求头会替代 `auth` 选项，计算基本身份验证。

##### 遵循触发事件的顺序
  - 成功的请求的情况下
    + `socket` 事件
    + `response` 事件
      * res 对象上的 `data`事件（任意次数。通常在重定向中，响应正文为空，则不会触发 `data` 事件）
      * res 对象上的 `end` 事件
    + `close` 事件
  - 连接错误的情况下
    + `socket` 事件
    + `error` 事件
    + `close` 事件
  - 收到**响应之前**过早关闭连接的情况下
    + `socket` 事件
    +  `error` 事件（具有 `'Error: socket hang up'` 错误消息和 `ECONNRESET` 代码错误）
    + `close` 事件
  - 收到**响应之后**过早关闭连接的情况下
    + `socket` 事件
    + `response` 事件
      * res 对象上的 `data` 事件（任意次数）
    + （在此处关闭连接）
    + res 对象上的 `aborted` 事件
    + res 对象上的 `error` 事件（具有`'Error: aborted'` 错误消息和 `ECONNRESET` 代码错误）
    + `close` 事件
    + res 对象上的 `close` 事件
  - **分配套接字之前**调用 `req.destroy()` 的情况下
    + （在此处调用 `req.destroy()`）
    + `error` 事件（具有 `'Error: socket hang up'` 错误消息和 `ECONNRESET` 代码错误，或 `req.destroy()` 的错误）
    + `close` 事件
  - **连接成功之前**调用 `req.destroy()` 的情况下
    + `socket` 事件
    + （在此处调用 `req.destroy()`）
    + `error` 事件（具有 `'Error: socket hang up'` 错误消息和 `ECONNRESET` 代码错误，或 `req.destroy()` 的错误）
    + `close` 事件
  - **收到响应之后**调用 `req.destroy()` 的情况下
    + `socket` 事件
    + `response` 事件
      * res 对象上的 `data`事件（任意次数）
    + （在此处调用 `req.destroy()`）
    + res 对象上的 `aborted` 事件
    + res 对象上的 `error` 事件（具有 `'Error: aborted'` 错误消息和 `ECONNRESET` 代码错误，或 `req.destroy()` 的错误）
    + `close` 事件
    + res 对象上的 `close` 事件
  - **分配套接字之前**调用 `req.abort()` 的情况下
    + （在此处调用 `req.abort()`）
    + `abort` 事件
    + `close` 事件
  - **连接成功之前**调用 `req.abort()` 的情况下
    + `socket` 事件
    + （在此处调用 `req.abort()`）
    + `abort` 事件
    + `error` 事件（具有 `'Error: socket hang up'` 错误消息和 `ECONNRESET` 代码错误）
    + `close` 事件
  - **收到响应之后**调用 `req.abort()` 的情况下
    + `socket` 事件
    + `response` 事件
      * res 对象上的 `data` 事件（任意次数）
    + （在此处调用 `req.abort()`）
    + `abort` 事件
    + res 对象上的 `aborted` 事件
    + res 对象上的 `error`事件（具有 `'Error: aborted'`错误消息和 `ECONNRESET` 代码错误）
    + `close` 事件
    + res 对象上的 `close` 事件

#### http.get()
  - 功能：服务器处理 GET 连接以触发 HTTP 请求
  - 语法：`http.get(url[, options][, callback])`
    + 简写 `http.get(options[, callback])`
  - 参数：
    + url <String\> | <URL\>
    + options <Object\> 与 `http.request()` 接受相同的 `options`，方法默认设置为 `GET`。
    + callback <Function\>：
  - 返回值 <http.ClientRequest\>：
    ```js
      http.get('http://localhost:8000/', (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;
        // 任何 2xx 状态码都表示成功响应，但这只有 200 状态码才表示成功。
        if (statusCode !== 200) {
          error = new Error('请求失败.\n' + `状态码: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error('无效的 content-type.\n' + `期望是 application/json，但获取的是 ${contentType}`);
        }
        if (error) {
          console.error(error.message);
          // 消耗响应数据以释放内存
          res.resume();
          return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
          } catch (e) {
            console.error(e.message);
          }
        });
      }).on('error', (e) => {
        console.error(`获取错误: ${e.message}`);
      });

      /* 创建本地服务器从中获取数据 */ 
      const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          data: 'Hello World!',
        }));
      });
      server.listen(8000);
    ```
  - 与 `http.request()` 的唯一区别：是它默认设置方法为 `GET` 并自动调用 `req.end()`。 
    + 因 http.ClientRequest 中的回调必须响应数据。

#### http.validateHeaderName()
  - 功能：调用 `res.setHeader(name, value)` 时，对提供的 `name` 执行低层验证
  - 语法：`http.validateHeaderName(name[, label])`
  - 参数：
    + name <String\>
    + label <String\> 错误消息的标签。 默认值：`'Header name'`。
  - 将标头（请求头）传给 HTTP 请求或响应之前，无需使用此方法。自动验证此类标头
  - 将非法值作为 `name` 传入将导致抛出 `TypeError`
    + 由 `code: 'ERR_INVALID_HTTP_TOKEN'` 标识。
    ```js
      const { validateHeaderName } = require('http');

      try {
        validateHeaderName('');
      } catch (err) {
        console.error(err instanceof TypeError); // --> true
        console.error(err.code); // --> 'ERR_INVALID_HTTP_TOKEN'
        console.error(err.message); // --> 'Header name must be a valid HTTP token [""]'
      }
    ```

#### http.validateHeaderValue()
  - 功能：调用 `res.setHeader(name, value)` 时，对提供的 `value` 执行低层验证
  - 语法：`http.validateHeaderValue(name, value)`
  - 参数：
    + name <String\>
    + value <Any\>
  - 将标头（请求头）传给 HTTP 请求或响应之前，无需使用此方法。自动验证此类标头
  -  `value` 传入非法值，将导致抛出 `TypeError`。
    + 未定义值错误由 `code: 'ERR_HTTP_INVALID_HEADER_VALUE'` 标识。
    + 无效值字符错误由 `code: 'ERR_INVALID_CHAR'` 标识。
    ```js
      const { validateHeaderValue } = require('node:http');

      try {
        validateHeaderValue('x-my-header', undefined);
      } catch (err) {
        console.error(err instanceof TypeError); // --> true
        console.error(err.code === 'ERR_HTTP_INVALID_HEADER_VALUE'); // --> true
        console.error(err.message); // --> 'Invalid value "undefined" for header "x-my-header"'
      }

      try {
        validateHeaderValue('x-my-header', 'oʊmɪɡə');
      } catch (err) {
        console.error(err instanceof TypeError); // --> true
        console.error(err.code === 'ERR_INVALID_CHAR'); // --> true
        console.error(err.message); // --> 'Invalid character in header content ["x-my-header"]'
      }
    ```

#### http.setMaxIdleHTTPParsers()
  - 功能：设置最大空闲 HTTP 解析器数。
  - 语法：`http.setMaxIdleHTTPParsers(max)`
  - 参数：
    + max <Number\> 默认值：`1000`。

## http.Agent 代理类
  - Agent 负责管理 HTTP 客户端连接的持久性和重用。 
  - 它维护一个给定主机和端口的待处理请求队列，为每个请求重用单个套接字连接，直到队列为空，此时套接字要么被销毁，要么放入池中（会被再次用于请求到相同的主机和端口）。 
  - 销毁与汇集取决于 `keepAlive` 选项。
  - 当客户端或服务器关闭连接时，它会从池中删除.
  - 对不再使用的套接字进行 Agent 实例 `destroy()`, 以免消耗操作系统资源。
  - 代理也可用于单个请求。
    + 通过对 `http.get()` 或 `http.request()` 函数设置  `{agent: false}` 选项，则单次使用的具有默认选项的 Agent 将用于客户端连接。
    ```js
      http.get({
        hostname: 'localhost',
        port: 80,
        path: '/',
        agent: false,  // 创建一个新的代理，只用于本次请求
      }, (res) => {
        // 对响应进行处理
      });
    ```
### Agent 创建实例
  - 语法：`new Agent([options])`
  - 参数：
    + options <Object\> 要在代理上设置的可配置选项集。 可以有以下字段：
      * keepAlive <Boolean\> 即使没有未完成的请求，也要保留套接字（用于未来的请求，而无需重新建立 TCP 连接）。 默认值：`false`。
        > - 不要与 Connection 标头的 keep-alive 值混淆。 
        > - 使用代理时总是发送 `Connection: keep-alive` 请求头，除非显式指定了 Connection 标头或当 `keepAlive: false` 选项和 `maxSockets: Infinity` 选项，此情况下将使用 `Connection: close`。 
      * keepAliveMsecs <Number\> 使用 `keepAlive` 选项时，为 TCP Keep-Alive 数据包指定初始延迟。默认值：`1000`。
      * maxSockets <Number\> 每个主机允许的最大套接字数量。默认值：`Infinity`。
        > - 如果同一主机打开多个并发连接，则每个请求都将使用新的套接字，直到达到 `maxSockets` 值。 
        > - 如果主机尝试打开的连接数超过 `maxSockets`，则额外的请求将进入待处理请求队列，并在现有连接终止时进入活动连接状态。（确保何时给定的主机最多有 `maxSockets` 个活动连接）。
      * maxTotalSockets <Number\> 所有主机总共允许的最大套接字数量（每个请求将使用新的套接字，直到达到最大值）。 默认值：`Infinity`。
      * maxFreeSockets <Number\> 每台主机在空闲状态下保持打开的最大套接字数。默认值：`256`。
        > - 仅当 `keepAlive: true` 时才有效。
      * scheduling <String\> 选择下一个要使用的空闲套接字时应用的（`'fifo'` 或 `'lifo'`）调度策略。默认值： 'lifo'。
        > - `'lifo'` 选择最近使用的套接字，
        > - `'fifo'` 选择最近最少使用的套接字。 
        > - 在每秒请求率**较低**的情况下，`'lifo'` 调度将降低选择可能因不活动而被服务器关闭的套接字的风险。 
        > - 在每秒请求率**较高**的情况下，`'fifo'` 调度将最大化打开套接字的数量，而 `'lifo'` 调度将保持尽可能低。 
      * timeout <Number\> 创建套接字时设置超时（以毫秒为单位）。
  - http.request() 使用的默认 http.globalAgent 将所有这些值设置为各自的默认值。
    + `socket.connect()` 中的 `options` 也受支持
    ```js
      const http = require('http');

      const keepAliveAgent = new http.Agent({ keepAlive: true });
      options.agent = keepAliveAgent;
      http.request(options, onResponseCallback);
    ```

### 属性
  - freeSockets
  - maxFreeSockets
  - maxSockets
  - maxTotalSockets
  - requests
  - sockets
#### agent.freeSockets
  - 当启用 keepAlive 时，包含当前等待代理使用的套接字数组的对象（不可修改）。
    + freeSockets 列表中的套接字将被自动销毁并从 `'timeout'` 上的数组中删除。
  - 返回值<Object\>

#### agent.maxFreeSockets
  - 当启用 keepAlive 时，设置在空闲状态下将保持打开的最大套接字数量。 默认为 `256`。
  - 返回值<Number\>

#### agent.maxSockets
  - 确定代理可以为每个来源打开多少个并发套接字。默认为 `Infinity`。 
    + 来源是 `agent.getName()` 的返回值。
  - 返回值<Number\>

#### agent.maxTotalSockets
  - 确定代理可以打开多少个并发套接字。  默认为 `Infinity`。 
    + 与 `maxSockets` 不同，`maxTotalSockets` 适用于所有来源。
  - 返回值<Number\>

#### agent.requests
  - 尚未分配给套接字的请求队列的对象（不可修改）。
  - 返回值<Object\>

#### agent.sockets
  - 包含代理当前正在使用的套接字数组的对象（不可修改）。
  - 返回值<Object\>

### 方法
  - createConnection()
  - keepSocketAlive()
  - reuseSocket()
  - destroy()
  - getName()
#### agent.createConnection()
  - 功能：用于 HTTP 请求的套接字/流
    + 默认情况下，此函数与 `net.createConnection()` 功能相同
  - 语法：`agent.createConnection(options[, callback])`
  - 参数：
    + options <Object\> 包含连接详细信息的选项。
      * 查看 `net.createConnection()` 以获取选项的格式
    + callback <Function\> 接收创建的套接字的回调函数
      + err：回调错误
      + stream：套接字/流
  - 返回值 <stream.Duplex\>：

#### agent.keepSocketAlive()
  - 功能：当 socket 从请求中分离，可以由 Agent 持久化时调用，
  - 语法：`agent.keepSocketAlive(socket)`
  - 参数：
    + socket <stream.Duplex\>
  - 返回值<Boolean\> ：`false` 表示则套接字将被销毁，而不是将其持久化以供下一个请求使用。默认返回 `true`
    ```js
      socket.setKeepAlive(true, this.keepAliveMsecs);
      socket.unref();
      return true;
    ```

#### agent.reuseSocket()
  - 功能：当 socket 由于保持活动选项而持久化后附加到 request 时调用。
    ```js
      // 默认行为
      socket.ref();
    ```
  - 语法：`agent.reuseSocket(socket, request)`
  - 参数：
    + socket <stream.Duplex\>
    + request <http.ClientRequest\>

#### agent.destroy()
  - 功能：销毁代理当前正在使用的所有套接字。
    + 用于对启用 keepAlive 的代理，不再需要代理时显式关闭该代理。 以免在服务器上，终止这些套接字之前，还保持打开很长时间。
  - 语法：`agent.destroy()`

#### agent.getName()
  - 功能：获取一组请求选项的唯一名称，以确定是否可以重用连接。 
    + 对于 HTTP 代理，则这将返回 `host:port:localAddress` 或` host:port:localAddress:family`。 
    + 对于 HTTPS 代理，则名称包括 **CA、证书、密码和其他确定套接字可重用性的 HTTPS/TLS 特定选项**。
  - 语法：`agent.getName([options])`
  - 参数：
    + options <Object\> 一组提供名称生成信息的选项
      * host <String\> 向其触发请求的服务器的域名或 IP 地址
      * port <Number\> 远程服务器端口
      * localAddress <String\> 触发请求时绑定网络连接的本地接口
      * family <integer\>   IP 地址族，如果不为 `undefined`，则必须是 `4` 或 `6`。
  - 返回值 <String\>

## http.ClientRequest 客户端请求类
### 属性
### 方法

## http.ServerResponse 服务端请求类
### 属性
### 方法

## http.IncomingMessage 传入消息类
### 属性
### 方法

## http.OutgoingMessage 传出消息类
### 属性
### 方法


## 参考资料
  - [Node.js v20.9.0 中文网](https://nodejs.cn/api/http.html)