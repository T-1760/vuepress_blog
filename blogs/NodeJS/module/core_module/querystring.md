---
sidebar: auto
title: querystring 模块
date: 2023-10-18
tags:
 - querystring 模块
 - Node.js 核心模块
categories: 
 - 核心模块
---

## querystring 查询字符串
  - 功能：用于解析和格式化 URL 查询字符串
  - 语法：`const querystring = require('querystring'); `

## querystring 常用方法
### querystring.parse()
  - 功能：将网址查询字符串解析为键值对的集合
  - 语法：`querystring.parse(str[, sep[, eq[, options]]])`
  - 参数:
    + str <String\>：要解析的网址查询字符串
    + sep <String\>：用于在查询字符串中分隔键值对的子字符串。 默认值： `&`。
    + eq <String\>：用于分隔查询字符串中的键和值的子字符串。 默认值： `=`。
    + options <Object\>
      * decodeURIComponent <Function\>：当对查询字符串中的百分比编码字符进行解码时使用的函数。 默认值：`querystring.unescape()` 
      * maxKeys <Number\>：指定要解析的最大键数。指定 `0` 以删除键的计数限制。 默认值： `1000`。
  - 返回值<TypeObject\>：返回的对象不是原型继承自 Object 对象。
  - 示例：查询字符串 `foo=bar&abc=xyz&abc=123` 被解析为：
    ```js
      {
        foo: 'bar',
        abc: ['xyz', '123']
      }
    ```
  - 获取 post 请求内容
    ```js
      var http = require('http');
      var querystring = require('querystring');
      var util = require('util');

      http.createServer(function(req, res){
          // 定义了一个 post 变量，用于暂存请求体的信息
          var post = '';     

          // 通过 req 的 data 事件监听函数，每当接受到请求体的数据，就累加到 post 变量中
          req.on('data', function(chunk){    
              post += chunk;
          });

          // 在 end 事件触发后，通过 querystring.parse 将 post 解析为真正的 POST 请求格式，然后向客户端返回。
          req.on('end', function(){    
              post = querystring.parse(post);
              res.end(util.inspect(post));
          });
      }).listen(3000);

    ```

### querystring.stringify()
  - 功能：通过遍历对象的 "自有属性" 从给定的 obj 生成 URL 查询字符串
  - 语法：`querystring.stringify(obj[, sep[, eq[, options]]])`
  - 参数：
    + obj <TypeObject\> | <Object\>：要序列化为网址查询字符串的对象
    + sep <String\>：用于在查询字符串中分隔键值对的子字符串。 默认值： `&`。
    + eq <String\>：用于分隔查询字符串中的键和值的子字符串。 默认值： `=`。
    + options
      * encodeURIComponent <Function\>: 当将网址不安全的字符转换为查询字符串中的百分比编码时使用的函数。 默认值： `querystring.escape()`。
  - 温馨提示：序列化 obj 中传递的以下类型的值： <String\> | <Number\> | <Bigint\> | <Boolean\> | <String[]\> | <Number[]\> | <Bigint[]\> | <Boolean[]\> 数值必须是有限的。 任何其他输入值都将被强制为空字符串
  - 返回值 <String\>：生成 URL 查询字符串
  ```js
    querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
    // 返回：'foo=bar&baz=qux&baz=quux&corge='

    querystring.stringify({ foo: 'bar', baz: 'qux' }, ';', ':');
    // 返回：'foo:bar;baz:qux'
  ```

### querystring.unescape()
  - 功能：给定的 str 上执行网址百分比编码字符的解码
    + 通常不会被直接使用，该方法被 `querystring.parse()` 使用。将该方法分配给替代函数来提供**替换的解码**实现
  - 语法：`querystring.unescape(str)`

### querystring.escape() 
  - 功能：以网址查询字符串的特定要求优化的方式，对给定的 str 执行网址百分比编码。
    + 通常不会被直接使用, 该方法被 `querystring.stringify()` 使用。将该方法分配给替代函数来提供**替换的百分比编码**实现
  - 语法：`querystring.escape(str)`

### querystring.decode()
  - 该方法是 `querystring.parse()` 的别名  

### querystring.encode()
  - 该方法是 `querystring.stringify()` 的别名  

## 参考资料
  - [Node.js v20.9.0 中文网](https://nodejs.cn/api/querystring.html)