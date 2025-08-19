---
sidebar: auto
title: url 模块
date: 2023-10-18
tags:
 - url 模块
 - Node.js 核心模块
categories: 
 - 核心模块
---

## url 网址
  - url 模块提供用于网址处理和解析的实用方法
### URL 字符串和 URL 对象
  - 网址字符串是包含多个有意义组件的结构化字符串。 
    + 解析时，将返回包含每个组件的属性的网址对象。
  - url 模块提供了两个用于处理 URL 的 API
    + 特定于 Node.js 的旧版 Legacy API（用于向后兼容）
    + 于 Web 浏览器使用的相同 WHATWG URL 标准 的较新 API
  - url.parse() 方法处理 `'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'` 网址字符串的两种 API
    ```js
      /* 旧版 API 解析网址字符串 */
      const url = require('url');
      const myURL = url.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');

      /* WHATWG API 解析网址字符串 */
      const myURL = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
      ┌────┌────────────────────────────────────────────────────────────────────────────────────────────────┐
      │    │                                              href                                              │
      | 旧 ├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
      │    │ protocol │  │        auth         │          host          │           path            │ hash  │
      │    │          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
      │ 版 │          │  │                     │    hostname     │ port │ pathname │     search     │       │
      │    │          │  │                     │                 │      │          ├─┬──────────────┤       │
      │────│          │  │                     │                 │      │          │ │    query     │       │
           "  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
      │────│          │  │          │          │    hostname     │ port │          │                │       │
      │    │          │  │          │          ├─────────────────┴──────┤          │                │       │
      │ 新 │ protocol │  │ username │ password │          host          │          │                │       │
      |    ├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
      │    │   origin    │                     │         origin         │ pathname │     search     │ hash  │
      | 版 ├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
      │    │                                              href                                              │
      └────└────────────────────────────────────────────────────────────────────────────────────────────────┘
      (请无视 path 字符串中的空格，只为便于布局) 
      (新版的 origin = protocol + hostname + port，不包含 username 和 password )
    ```
  - 使用属性设置器或模板字面串从组件部分构建 WHATWG 网址：
    ```JS
      /* 网址 'https://example.org/a/b/c?d=e#fgh' */
      // 属性设置器方式
      const myURL = new URL('https://example.org');
      myURL.pathname = '/a/b/c';
      myURL.search = '?d=e';
      myURL.hash = '#fgh';

      // 模板字符串拼接方式
      const pathname = '/a/b/c';
      const search = '?d=e';
      const hash = '#fgh';
      const myURL = new URL(`https://example.org${pathname}${search}${hash}`);
    ```

### URL 中的百分比编码
  - URL 网址只允许包含一定范围的字符。 
    + 任何超出该范围的字符都必须进行编码。 
    + 这些字符的编码方式及要编码的字符完全取决于字符在网址结构中的位置。
#### 旧版 Legacy API
  - `|`、`\`、`\r`、`\n`、`\t`、`{`、`}`、`<`、`>`、`^`、`'`、`"`和（`）反引号，以及（' '）空格等字符将在网址对象的属性中自动转义
    + 例：ASCII (' ')空格字符被编码为 `%20`。 `/` 正斜杠字符编码为 `%3C`
#### WHATWG API 标准
  - WHATWG URL 标准比 Legacy API 的使用方法，更具**选择性**，**细粒度**的方法来选择编码字符。
  - WHATWG 算法定义了四个 "百分比编码集"，描述了**必须进行百分比编码**的字符范围：
    1. C0 控制百分比编码集：包括 `U+0000` 到 `U+001F`（含）范围内的代码点以及大于 `U+007E` (即：`~`) 的所有代码点。
    1. 片段百分比编码集包括 C0 控制百分比编码集和代码点：`U+0020` SPACE、`U+0022` (即：`"`)、`U+003C` (即：`<`)、`U+003E` (即：`>`) 和 `U+0060` (即：` 反引号)。
    1. 路径百分比编码集包括 C0 控制百分比编码集和代码点：`U+0020` SPACE、`U+0022` (即：`"`)、`U+0023` (即：`#`)、`U+003C` (即：`<`)、`U+003E` (即：`>`)、`U+003F` (即：`?`)、`U+007B` (即：`{`)、`U+007D` (即：`}`) 和 `U+0060` (即：` 反引号)。
    1. 用户信息编码集包括路径百分比编码集和代码点：`U+002F` (即：`/`), `U+003A` (即：`:`), `U+003B` (即：`;`), `U+003D` (即：`=`), `U+0040` (即：`@`), `U+005B` (即：`[`) 到 `U+005E`(即：`^`)和 `U+007C`(即：`|`)。
  - 四种百分比编码集作用
    + C0 控制百分比编码集：用于某些特定条件下的**主机和路径，以及所有其他情况**。
    + 片段百分比编码集：用于 **URL 片段**。 
    + 路径百分比编码集：用于**大多数 URL 的路径**。 
    + 用户信息百分比编码集：专门用于**在 URL 中编码的用户名和密码**。 
  - 当主机名中出现非 ASCII 字符时，主机名将使用 Punycode 算法进行编码。 
    + 注意，主机名可能同时包含 Punycode 编码字符和百分比编码字符：
    ```js
      const myURL = new URL('https://%CF%80.example.com/foo');

      console.log(myURL.href);// https://xn--1xa.example.com/foo
      console.log(myURL.origin);// https://xn--1xa.example.com
    ```

## Legacy API
### urlObject 网址对象 
  - 由 `url.parse()` 函数创建和返回网址对象  
    + 前提需引入 `urlObject（require('node:url').Url` 或 `import { Url } from 'node:url'）`
  - urlObject 网址对象的属性
    + `href`
    + `protocol`
    + `auth`
    + `hostname`
    + `port`
    + `host`
    + `path`
    + `pathname`
    + `search`
    + `query`
    + `hash`
    + `slashes`
    
#### href 属性
  - href 属性是将 protocol 和 host 组件都转换为小写的完整网址字符串。
    + 例：`'http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'`

#### protocol 属性
  - protocol 属性标识网址的小写协议方案。
    + 例：`'http:'`

#### auth 属性
  - auth 属性是 URL 的用户名和密码部分，也称为用户信息。 
    + 此字符串子集跟在 `protocol` 和 `//` 双斜杠（若存在）之后，并在 `host` 组件之前，由 `@` 分隔。 
    + 该字符串可以是用户名，或由 `:` 分隔的用户名和密码。
    + 例：`'user:pass'`

#### hostname 属性
  - hostname 属性是 host 组件的小写主机名部分，不包括 port。
    + 例：`'sub.example.com'`

#### port 属性
  - port 属性是 host 组件的数字端口部分。
    + 例：`'8080'`

#### host 属性
  - host 属性是网址的完整小写主机部分，包括 port（如果指定）。
    + 例：`'sub.example.com:8080'`

#### path 属性
  - path 属性是 pathname 和 search 组件的串联。（不执行 path 的解码）
    + 例：`'/p/a/t/h?query=string'`

#### pathname 属性
  - pathname 属性包含网址的整个路径部分。 (不执行路径字符串的解码)
    + `host`（包括 `port`）之后和 `query` 或 `hash` 组件开始之前的所有内容，由 ASCII `?` 问号或 `#` 哈希字符分隔。
    + 例：`'/p/a/t/h'`

#### search 属性
  - search 属性由 URL 的整个 "请求参数" 部分组成，包括前导 ASCII `?` 问号字符。（不执行查询字符串的解码）
    + 例：`'?query=string'`

#### query 属性
  - query 属性有两种数据类型
    + 字符串：是不带前导 ASCII `?` 问号的查询字符串，（不执行查询字符串的解码）
    + 对象：querystring 模块的 `querystring.parse()` 方法返回的对象。 （键和值都会被解码）
  - 例：`'query=string'` 或 `{'query': 'string'}`。

#### hash 属性
  - hash 属性是网址的片段标识符部分，包括前导 `#` 字符。
    + 例：`'#hash'`

#### slashes 属性
  - 若 protocol 中的 `:` 冒号后需要两个 ASCII 正斜杠字符 (即：`//`)，则 slashes 属性是值为 `true` 布尔值。

### url.format() 方法
  - 功能： 对派生 urlObject 网址对象格式化为网址字符串
  - 语法：`url.format(urlObject)`
  - 参数：
    + urlObject <Object\> | <String\> 网址对象（由 `url.parse()` 返回或以其他方式构造）。 
      * 如果是字符串，则通过将其传给 `url.parse()` 将其转换为对象
  - 返回值<String\>：格式化网址字符串
    ```js
      const url = require('node:url');
      url.format({
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/some/path',
        query: {
          page: 1,
          format: 'json',
        },
      }); // 'https://example.com/some/path?page=1&format=json'
    ```

### url.resolve() 方法
  - 功能：（类似于 Web 浏览器解析锚标记的方式）解析相对于基本 URL 的目标 URL
  - 语法：`url.resolve(from, to)`
  - 参数：
    + from <String\> 如果 to 是相对的 URL 网址，则使用的基本的 URL 网址。
    + to <String\> 要解析的目标 URL 网址。
  - 返回值<String\> URL 网址
    ```js
      const url = require('url');
      url.resolve('/one/two/three', 'four');         // '/one/two/four'
      url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
      url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'

      /* 使用 WHATWG URL API 实现相同的结果 */
      function resolve(from, to) {
        const resolvedUrl = new URL(to, new URL(from, 'resolve://'));
        if (resolvedUrl.protocol === 'resolve:') {
          // `from` is a relative URL.
          const { pathname, search, hash } = resolvedUrl;
          return pathname + search + hash;
        }
        return resolvedUrl.toString();
      }
      resolve('/one/two/three', 'four');         // '/one/two/four'
      resolve('http://example.com/', '/one');    // 'http://example.com/one'
      resolve('http://example.com/one', '/two'); // 'http://example.com/two'
    ```

## WHATWG API 
### URL 类
  - 浏览器兼容的 URL 类，按照 WHATWG 网址标准实现。 URL 类也在全局对象上可用。
  - 已解析 URL 的示例可以在标准本身中找到。 
  - 按照浏览器的约定，URL 对象的所有属性都被实现为类原型上的获取器和设置器，而不是对象本身的数据属性。 
    + 与旧版 `urlObject` 网址对象不同，在 URL 对象（例：`delete myURL.protocol`）的任何属性上使用 `delete` 关键字无效，但始终返回 `true`。

### URL 静态方法
#### URL.canParse()
  - 功能：检查相对于 base 的 input 是否可以解析为正确的 URL
  - 语法：`URL.canParse(input[, base])`
  - 参数：
    + input <String\> 要解析的绝对或相对的输入网址。 
      * `input` 参数是相对的，则需要 `base` 参数。 
      * `input` 参数是绝对的，则忽略 `base` 参数。 
      * `input` 参数不是字符串，则首先 转换为字符
    + base <String\> 
      + `input` 参数不是绝对的，则为要解析的基本网址。 
      + `base` 参数不是字符串，则首先 转换为字符串。
  - 返回值<Boolean\>
    ```js
      const isValid = URL.canParse('/foo', 'https://example.org/'); // true

      const isNotValid = URL.canParse('/foo'); // false
    ```

### URL 创建实例
  - 功能：通过相对于 base 解析 input 来创建新的 URL 对象。 
    + 若 base 为字符串，则其将被解析等效于 `new URL(base)`。
  - 语法：`new URL(input[, base])`
  - 参数：
    + input <String\> 要解析的绝对或相对的输入网址。 
      * `input` 参数是相对的，则需要 `base` 参数。 
      * `input` 参数是绝对的，则忽略 `base` 参数。 
      * `input` 参数不是字符串，则首先 转换为字符
    + base <String\> 
      + `input` 参数不是绝对的，则为要解析的基本网址。 
      + `base` 参数不是字符串，则首先 转换为字符串。
  - 返回值<Object\>：URL 对象
  - 网址构造函数可作为全局对象的属性访问，也可从内置的 url 模块中导入
    ```js
      const myURL = new URL('/foo', 'https://example.org/'); // https://example.org/foo
      
      console.log('全局对象 与 模块导入的 URL 是否相同：', URL === require('node:url').URL); // '全局对象 与 模块导入的 URL 是否相同：' 'true'.
    ```
  - 温馨提示：若 `input` 或 `base` 参数不是有效的网址，则将抛出 `TypeError`。并将给定的值强制转换为字符串。 
    ```js
      const myURL = new URL({ toString: () => 'https://example.org/' }); // https://example.org/
    ```
  - `input` 参数的 hostname 主机名中出现的 Unicode 字符将使用 Punycode 算法自动转换为 ASCII。
    ```js
      const myURL = new URL('https://測試'); // https://xn--g6w251d/
    ```
  - 若事先无法确定 `input` 参数是否为绝对的网址，并且提供了 `base` 参数，则建议验证 URL 对象的 `origin` 是否符合预期。
    ```js
      let myURL = new URL('http://Example.com/', 'https://example.org/');// http://example.com/

      myURL = new URL('https://Example.com/', 'https://example.org/');// https://example.com/

      myURL = new URL('foo://Example.com/', 'https://example.org/');// foo://Example.com/

      myURL = new URL('http:Example.com/', 'https://example.org/');// http://example.com/

      myURL = new URL('https:Example.com/', 'https://example.org/');// https://example.org/Example.com/

      myURL = new URL('foo:Example.com/', 'https://example.org/');// foo:Example.com/
    ```

### URL 实例属性
  - `href`
  - `protocol`
  - `username`
  - `password`
  - `hostname`
  - `port`
  - `host`
  - `origin`
  - `pathname`
  - `hash`
  - `search`
  - `searchParams`
  - 提示：`username`、`password` 、`pathname`、`hash`、`search` 属性的值中包含无效 URL 字符时，进行百分比编码的字符可能与 `url.parse()` 或 `url.format()` 方法产生的结果有所不同

#### url.href
  - 功能：获取和设置序列化的网址。无效的网址则将抛出 `TypeError`。
    + 获取 href 属性的值等同于 `url.toString()`
    + 设置 href 属性新值等同于 `new URL(value)` 创建新的 URL 对象。
  - 返回值<String\>
    ```js
      const myURL = new URL('https://example.org/foo');
      console.log(myURL.href); // https://example.org/foo

      myURL.href = 'https://example.com/bar';
      console.log(myURL.href); // https://example.com/bar
    ```

#### url.protocol
  - 功能：获取和设置网址的协议部分。无效的网址协议值将被忽略
  - 返回值<String\>
    ```js
      const myURL = new URL('https://example.org');
      console.log(myURL.protocol); // https:

      myURL.protocol = 'ftp';
      console.log(myURL.href); // ftp://example.org/
    ```
  - 特殊协议
    + WHATWG URL 标准对少数 URL 协议方案在解析和序列化时会特殊处理。 
    + WHATWG URL 标准的特殊协议方案有 `ftp`、`file`、`http`、`https`、`ws` 和 `wss`。
    + 当使用特殊协议解析网址时，`url.protocol` 属性可能会更改为另一种特殊协议，但不能更改为非特殊协议，反之亦然。
    + 从 http 更改为 https 有效；特殊协议与非特殊协议相互转换无效
    ```js
      const u = new URL('http://example.org');
      u.protocol = 'https';
      console.log(u.href);  // https://example.org/

      const u = new URL('http://example.org');
      u.protocol = 'fish';
      console.log(u.href); // http://example.org/

      const u = new URL('fish://example.org');
      u.protocol = 'http';
      console.log(u.href); // fish://example.org
    ```

#### url.username
  - 功能：获取和设置网址的用户名部分。
  - 返回值<String\>
    ```js
      const myURL = new URL('https://abc:xyz@example.com');
      console.log(myURL.username); // abc

      myURL.username = '123';
      console.log(myURL.href); // https://123:xyz@example.com/
    ```

#### url.password
  - 功能：获取和设置网址的密码部分。
  - 返回值<String\>
    ```js
      const myURL = new URL('https://abc:xyz@example.com');
      console.log(myURL.password); // xyz

      myURL.password = '123';
      console.log(myURL.href); // https://abc:123@example.com/
    ```

#### url.hostname
  - 功能：获取和设置网址的主机名部分。无效主机名值将被忽略
    + `url.host` 和 `url.hostname` 的区别： **`url.hostname` 不包括 `port` 端口部分**。
  - 返回值<String\>    
    ```js
      const myURL = new URL('https://example.org:81/foo');
      console.log(myURL.hostname);// example.org

      // 设置 hostname 主机名不会更改 port 端口
      myURL.hostname = 'example.com';
      console.log(myURL.href);// https://example.com:81/foo

      // 设置 host 主机值部分会更改 hostname主机名和 port 端口
      myURL.host = 'example.org:82';
      console.log(myURL.href);// https://example.org:82/foo
    ```

#### url.port
  - 功能：获取和设置网址的端口部分。
    + 设置 `port` 端口值时，该值将首先使用 `.toString()` 转换为字符串
  - 返回值<String\> | <integer\>
    + `port` 端口可以是包含 `0` 到 `65535`（含）范围内（不在此范围内，则被忽略）的数字字符串。 （截取以数字开头的前导数字为有效值）
    + 将值设置指定 `protocol` 协议的 URL 对象的默认端口时，会导致 `port` 属性值成为 `''` 空字符串。
    + 当 `port` 端口为空字符串时，依据不同 `protocol` 协议会自动设置默认端口
      | 协议 | 港口 |
      |:---|:---|
      | ftp   | 21  |
      | file  |     |
      | http  | 80  |
      | https | 443 |
      | ws    | 80  |
      | wss   | 443 |
    ```js
      const myURL = new URL('https://example.org:8888');
      console.log(myURL.port); // 8888

      // 默认端口将自动转换为空字符 （HTTPS 协议默认端口 443）
      myURL.port = '443';
      console.log(myURL.port); // the empty string
      console.log(myURL.href); // https://example.org/

      myURL.port = 1234;
      console.log(myURL.port); // 1234
      console.log(myURL.href); // https://example.org:1234/

      // 完全无效的端口字符串将被忽略
      myURL.port = 'abcd';
      console.log(myURL.port); // 1234

      // 开头的数字将会被当做端口数
      myURL.port = '5678abcd';
      console.log(myURL.port); // 5678

      // 非整形数字将会被截取部分
      myURL.port = 1234.5678;
      console.log(myURL.port); // 1234

      // 超出范围的数字将被忽略
      myURL.port = 1e10;  // 10000000000 不在 [0, 65535]区间范围内
      console.log(myURL.port); // 1234
    ```

#### url.host
  - 功能：获取和设置网址的主机部分。无效主机值将被忽略。
  - 返回值<String\>
    ```js
      const myURL = new URL('https://example.org:81/foo');
      console.log(myURL.host);// example.org:81

      myURL.host = 'example.com:82';
      console.log(myURL.href);// https://example.com:82/foo
    ```
    
#### url.origin
  - 获取网址的源的只读的序列化。
  - 返回值<String\>
    ```js
      const myURL = new URL('https://example.org/foo/bar?baz');
      console.log(myURL.origin); // https://example.org

      const idnURL = new URL('https://測試');
      console.log(idnURL.origin); // https://xn--g6w251d
      console.log(idnURL.hostname); // xn--g6w251d
    ```

#### url.pathname
  - 功能：获取和设置网址的路径部分。
  - 返回值<String\>
    ```js
      const myURL = new URL('https://example.org/abc/xyz?123');
      console.log(myURL.pathname); // /abc/xyz

      myURL.pathname = '/abcdef';
      console.log(myURL.href); // https://example.org/abcdef?123
    ```

#### url.hash
  - 功能：获取和设置网址的片段标识符部分，包括前导 `#` 字符。
  - 返回值<String\>
    ```js
      const myURL = new URL('https://example.org/foo#bar');
      console.log(myURL.hash); // #bar

      myURL.hash = 'baz';
      console.log(myURL.href); // https://example.org/foo#baz
    ```

#### url.search
  - 功能：获取和设置网址的序列化的查询部分。
  - 返回值<String\>
    ```js
      const myURL = new URL('https://example.org/abc?123');
      console.log(myURL.search); // ?123

      myURL.search = 'abc=xyz';
      console.log(myURL.href); // https://example.org/abc?abc=xyz
    ```

#### url.searchParams
  - 功能：获取表示网址查询参数的 URLSearchParams 对象。
    + 该属性是只读的，但它提供的 URLSearchParams 对象可用于改变 URL 实例； 
    + 若替换 URL 的全部查询参数，请使用 `url.search` 设置器。
  - 返回值<URLSearchParams\>
  - 当使用 `.searchParams`修改 URL 时要小心，因为根据 WHATWG 规范，URLSearchParams 对象使用不同的规则来确定要对哪些字符进行百分比编码。 
    + 例，URL 对象不会对 ASCII `~` 波浪号字符进行百分比编码，而 URLSearchParams 会对其进行编码
    ```js
      const myURL = new URL('https://example.org/abc?foo=~bar');

      console.log(myURL.search);  // ?foo=~bar

      // url.searchParams 修改 URL
      myURL.searchParams.sort();
      console.log(myURL.search);  // ?foo=%7Ebar
    ```

### URL 实例方法
#### url.toString()
  - 功能：URL 对象上的 toString() 方法返回序列化的网址。 
    + 返回值等同于 `url.href` hu `url.toJSON()` 的值。
  - 返回值 <String\>

#### url.toJSON()
  - 功能：URL 对象上的 toJSON() 方法返回序列化的网址。 
      + 返回值等同于 `url.href` 和 `url.toString()` 的值。
      + 当 URL 对象与 `JSON.stringify()` 进行序列化时，会自动调用此方法。
  - 返回值 <String\>
    ```js
      const myURLs = [
        new URL('https://www.example.com'),
        new URL('https://test.example.org'),
      ];
      console.log(JSON.stringify(myURLs)); // ["https://www.example.com/","https://test.example.org/"]
    ```

#### url.domainToASCII()
  - 功能：返回 domain 域的 **Punycode ASCII** 序列化。 
    + 若 domain 是无效域，则返回空字符串。
    + 与 `url.domainToUnicode()` 相反的操作。
  - 语法：`url.domainToASCII(domain)`
  - 参数：
    + domain <String\>：需要序列化的域名
  - 返回值<String\>
    ```js
      const url = require('url');

      console.log(url.domainToASCII('español.com')); // xn--espaol-zwa.com
      console.log(url.domainToASCII('中文.com')); // xn--fiq228c.com
      console.log(url.domainToASCII('xn--iñvalid.com')); // an empty string
    ```

#### url.domainToUnicode()
  - 功能：返回 domain 的 **Unicode** 序列化。 
    + 若 domain 是无效域，则返回空字符串。
    + 与 `url.domainToASCII()` 相反的操作。
  - 语法：`url.domainToUnicode(domain)`
  - 参数：
    + domain <String\>：需要序列化的域名
  - 返回值 <String\>：   
    ```js
      const url = require('url');

      console.log(url.domainToUnicode('xn--espaol-zwa.com')); // español.com
      console.log(url.domainToUnicode('xn--fiq228c.com')); // 中文.com
      console.log(url.domainToUnicode('xn--iñvalid.com')); // an empty string
    ```

#### url.fileURLToPath()
  - 功能：此函数可确保正确解码百分比编码字符，并确保跨平台有效的绝对路径字符串。
  - 语法：`url.fileURLToPath(url)` 
  - 参数：
    + url <URL\> | <String\> 要转换为路径的文件网址字符串或网址对象。
  - 返回值 <String\>：完全解析的特定于平台的 Node.js 文件路径。
    ```js
      const { fileURLToPath } = require('url');
      new URL('file:///C:/path/').pathname;    // 错误的: /C:/path/
      fileURLToPath('file:///C:/path/');       // 正确的: C:\path\ (Windows)

      new URL('file://nas/foo.txt').pathname;  // 错误的: /foo.txt
      fileURLToPath('file://nas/foo.txt');     // 正确的: \\nas\foo.txt (Windows)

      new URL('file:///你好.txt').pathname;    // 错误的: /%E4%BD%A0%E5%A5%BD.txt
      fileURLToPath('file:///你好.txt');       // 正确的: /你好.txt (POSIX)

      new URL('file:///hello world').pathname; // 错误的: /hello%20world
      fileURLToPath('file:///hello world');    // 正确的: /hello world (POSIX)
    ```

#### url.format()
  - 功能： WHATWG URL 对象的 URL 字符串表示的可自定义序列化。
  - 语法：`url.format(URL[, options])` 
  - 参数：
    + URL <URL\> 一个 WHATWG URL 对象
    + options <Object\>
      * auth <Boolean\>：序列化的网址字符串需要**包含用户名和密码**，则为 `true`，繁殖为 `false`。默认值：`true`。
      * fragment <Boolean\>：序列化的网址字符串需要**包含片段**，则为 `true`，繁殖为 `false`。默认值：`true`。
      * search <Boolean\>：序列化的网址字符串需要**包含搜索查询**，则为 `true`，繁殖为 `false`。默认值：`true`。
      * unicode <Boolean\> `true` 表示在网址字符串的主机组件中的 Unicode 字符，应该被直接编码而非 Punycode 编码。默认值：`false`。
  - 返回值<String\>：   
  - 方法允许对输出进行基本的自定义, 
    + 网址对象具有 `toString()` 方法和 `href` 属性（这些都不能自定义），用于返回网址的字符串序列化。
    ```js
      const url = require('url');
      const myURL = new URL('https://a:b@測試?abc#foo');

      console.log(myURL.href);// https://a:b@xn--g6w251d/?abc#foo
      console.log(myURL.toString());// https://a:b@xn--g6w251d/?abc#foo
      console.log(url.format(myURL, { fragment: false, unicode: true, auth: false }));// 'https://測試/?abc'
    ```

#### url.pathToFileURL()
  - 功能： 该函数确保 path 被绝对解析并且在转换为文件网址时，正确编码网址控制字符。
  - 语法：`url.pathToFileURL(path)`    
  - 参数：
    + path <String\> 要转换为文件网址的路径。
  - 返回值<URL\>：文件网址对象
    ```js
      const { pathToFileURL } = require('node:url');
      new URL(__filename);               // 错误的: throws (POSIX)
      new URL(__filename);               // 错误的: C:\... (Windows)
      pathToFileURL(__filename);         // 正确的:   file:///... (POSIX)
      pathToFileURL(__filename);         // 正确的:   file:///C:/... (Windows)

      new URL('/foo#1', 'file:');        // 错误的: file:///foo#1
      pathToFileURL('/foo#1');           // 正确的:   file:///foo%231 (POSIX)

      new URL('/some/path%.c', 'file:'); // 错误的: file:///some/path%.c
      pathToFileURL('/some/path%.c');    // 正确的:   file:///some/path%25.c (POSIX)
    ```

#### url.urlToHttpOptions()
  - 功能：按照 `http.request()` 和 `https.request()` 方法的预期，将网址对象转换为普通选项对象
  - 语法：`url.urlToHttpOptions(url)`
  - 参数：
    url <URL\> 要转换为选项对象的 WHATWG URL 对象。
  - 返回值 <Object\> ：选项对象
    + protocol <String\> 使用的协议。
    + hostname <String\> 向其触发请求的服务器的域名或 IP 地址。
    + hash <String\> 网址的片段部分。
    + search <String\> 网址的序列化的查询部分。
    + pathname <String\> 网址的路径部分。
    + path <String\> 请求的路径。（包括查询字符串, 例：`'/index.html?page=12'`。请求路径包含非法字符时抛出异常）
    + href <String\> 序列化的网址。
    + port <Number\> 远程服务器的端口。
    + auth <String\> 基本身份验证，即 `user:password` 两组件部分计算授权标头。   
    ```js
      const { urlToHttpOptions } = require('url');
      const myURL = new URL('https://a:b@測試?abc#foo');

      console.log(urlToHttpOptions(myURL));
      /* 
      {
        protocol: 'https:',
        hostname: 'xn--g6w251d',
        hash: '#foo',
        search: '?abc',
        pathname: '/',
        path: '/?abc',
        href: 'https://a:b@xn--g6w251d/?abc#foo',
        auth: 'a:b'
      }
      */
    ```

### URLSearchParams 类
  - URLSearchParams API 提供对 URL 查询的读写访问。
    + URLSearchParams 类可在全局对象上使用
  - WHATWG URLSearchParams 接口和 querystring 模块具有相似的用途。
    + querystring 模块的用途更通用，因为它允许自定义的分隔符（`&` 和 `=`）。
    + querystring 模块是专门处理网址查询字符串。
  ```js
    const myURL = new URL('https://example.org/?abc=123');
    console.log(myURL.searchParams.get('abc')); // 123

    myURL.searchParams.append('abc', 'xyz');
    console.log(myURL.href); // https://example.org/?abc=123&abc=xyz

    myURL.searchParams.delete('abc');
    myURL.searchParams.set('a', 'b');
    console.log(myURL.href); // https://example.org/?a=b

    const newSearchParams = new URLSearchParams(myURL.searchParams); 
    // 等同于 const newSearchParams = new URLSearchParams(myURL.search);

    newSearchParams.append('a', 'c');
    console.log(myURL.href); // https://example.org/?a=b
    console.log(newSearchParams.toString()); // a=b&a=c

    // newSearchParams.toString() 被隐式调用
    myURL.search = newSearchParams;
    console.log(myURL.href); // https://example.org/?a=b&a=c
    newSearchParams.delete('a');
    console.log(myURL.href); // https://example.org/?a=b&a=c
  ```

### URLSearchParams 创建实例
  - URLSearchParams 类的构造函数具有四种方式。
    + `new URLSearchParams()`
    + `new URLSearchParams(string)`
    + `new URLSearchParams(obj)`
    + `new URLSearchParams(iterable)`
#### new URLSearchParams()
  - 功能：创建新的空 URLSearchParams 对象。

#### new URLSearchParams(string)
  - 功能：将 string 解析为查询字符串，并对其创建新的 URLSearchParams 对象。 
    + 前导 `?` 若存在将被忽略。
  - 参数：
    + string <String\> 查询字符串
  - 返回值<Object\>
    ```js
      let params;

      params = new URLSearchParams('user=abc&query=xyz');
      console.log(params.get('user'));// 'abc'
      console.log(params.toString());// 'user=abc&query=xyz'

      params = new URLSearchParams('?user=abc&query=xyz');
      console.log(params.toString());// 'user=abc&query=xyz'
    ```

#### new URLSearchParams(obj)
  - 功能：使用查询哈希映射创建新的 URLSearchParams 对象。 
    + obj 所有属性的键和值都会被强制转换为字符串。
  - 参数：
    + obj <Object\> 表示键值对集合的对象
  - 返回值<Object\>
  - 与 querystring 模块不同，不允许以数组值的形式出现重复的键。 
    + 数组使用 array.toString() 字符串化，采用逗号连接所有数组元素。
    ```js
      const params = new URLSearchParams({
        user: 'abc',
        query: ['first', 'second'],
      });
      console.log(params.getAll('query')); // [ 'first,second' ]
      console.log(params.toString()); // 'user=abc&query=first%2Csecond'
    ```

#### new URLSearchParams(iterable)
  - 功能：可迭代映射创建新的 URLSearchParams 对象。
  - 参数：
    + iterable <Iterable\> 元素为键值对的可迭代对象
      * iterable 可以是 Array 或任何可迭代对象。 
      * iterable 是另一个 URLSearchParams 时，构造函数将简单地创建提供的 URLSearchParams 的克隆。 
      * iterable 的元素是键值对（键可以重复），并且本身可以是任何可迭代对象。
  - 返回值：
    ```js
      let params;

      // 数组作为参数创建
      params = new URLSearchParams([
        ['user', 'abc'],
        ['query', 'first'],
        ['query', 'second'],
      ]);
      console.log(params.toString()); // 'user=abc&query=first&query=second'

      // Map 对象作为参数创建
      const map = new Map();
      map.set('user', 'abc');
      map.set('query', 'xyz');
      params = new URLSearchParams(map);
      console.log(params.toString()); // 'user=abc&query=xyz'

      // generator 函数作为参数创建
      function* getQueryPairs() {
        yield ['user', 'abc'];
        yield ['query', 'first'];
        yield ['query', 'second'];
      }
      params = new URLSearchParams(getQueryPairs());
      console.log(params.toString()); // 'user=abc&query=first&query=second'

      // 每个键值对必须有两个元素（即：键值成对匹配，否则报错）
      new URLSearchParams([
        ['user', 'abc', 'error'],
      ]);
      // Throws TypeError [ERR_INVALID_TUPLE]:
      //        Each query pair must be an iterable [name, value] tuple
    ```

### URLSearchParams 实例属性
#### urlSearchParams.size
  - 功能：参数条目的总数。
  - 返回值 <integer\>

### URLSearchParams 实例方法
  - `urlSearchParams.append(name, value)`
    + 将新的名称-值对追加到查询字符串
  - `urlSearchParams.delete(name[, value])`
    + 删除指定的所有建或键的值
  - `urlSearchParams.keys()`
    + 迭代查询对象，将每个键作为数组的元素项，并返回该数组
  - `urlSearchParams.values()`
    + 迭代查询对象，将每个值作为数组的元素项，并返回该数组
  - `urlSearchParams.entries()`
    + 迭代查询对象，将每个键值对作为数组的元素项，并返回该数组。（`urlSearchParams[@@iterator]()` 的别名）
  - `urlSearchParams.forEach(fn[, thisArg])`
    + 迭代查询对象的每个键值对并调用给定的函数
  - `urlSearchParams.set(name, value)`
  - `urlSearchParams.get(name)`
  - `urlSearchParams.getAll(name)`
  - `urlSearchParams.has(name[, value])`
  - `urlSearchParams.sort()`
  - `urlSearchParams.toString()`
    + 返回序列化为字符串的搜索参数，必要时使用百分比编码的字符。
  
## 参考资料
  - [Node.js v20.9.0 中文网](https://nodejs.cn/api/url.html)