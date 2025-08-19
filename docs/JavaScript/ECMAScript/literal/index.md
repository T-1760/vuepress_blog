---
sidebar: auto
title: literal 字面量
date: 2023-10-18
tags:
 - literal 
 - 字面量
categories: 
 - JavaScript 语法
 - 数据类型
---

## 前言
  - 在 JavaScript 中，你可以使用各种字面量。这些字面量是脚本中按字面意思给出的固定的值，而不是变量

## 字面量的类型
  - 布尔字面量
  - 数字字面量
  - 字符串字面量
  - 正则字面量
  - 数组字面量
  - 对象字面量  

### 布尔字面量
  - 布尔类型有两种字面量：`true` 和 `false` （即：布尔类型的原始值 `true` 和 `false`）
  - 布尔对象（即：Boolean 内置对象）
### 数字字面量
  - JavaScript 数字字面量包括**多种基数的整数字面量**和**以 `10` 为基数的浮点数字面量**
#### 多种基数整数字面量
  - 十进制（基数为 10）整数字面量
    + 由一串数字序列组成，且没有前缀 `0`。
    + 例：`0`, `117`, `-345`
  - 八进制（基数为 8）整数字面量
    + 以 `0`（或 `0O、0o`）开头，只能包括 `0 - 7` 数字。
    + 例：`015`, `0001`, `-0o77`
    + 温馨提示：如果前导 0 后面的数值超出 `0 - 7` 范围，则忽略前导 0，后面的数值看成 10 进制
    + 例：`018`, `0009`, `-0o89`
  - 十六进制（基数为 16）整数字面量
    + 以 `0x`（或 `0X`）开头，可以包含 `0 - 9` 数字和 `A ~ F`（或`a ~ f`）字母。
    + 例：`0x1123`, `0x00111`, `-0xF1A7`
  - 二进制（基数为 2）整数字面量
    + 以 `0b`（或 `0B`）开头，只能包含 `0` 和 `1`数字。
    + 例：`0b11`, `0b0011`, `-0b11`
#### 以`10`为基数的浮点型字面量
  - 浮点数字面值有以下四个部分组成：
    + 一个十进制整数，可以带正负号（即: 前缀 `+` 或 `-`）
    + 小数点（`.`），
    + 小数部分（由一串十进制数表示），
    + 指数部分。
      * 指数部分以 `e`（或 `E`）开头，后面跟着一个整数，可以有正负号（即: 前缀 `+` 或 `-`）。
  - 浮点数字面量至少有一位数字，且必须带 `.` 小数点或 `e`（或 `E`）。
  - 浮点字面量的语法： `[(+|-)][digits][.digits][(E|e)[(+|-)]digits]`
    + 例：`-3.1415926`, `-.123456789`, `3.1E+12`, `.1e-23`

### 字符串字面量
  - 字符串字面量是由 `""`双引号对或 `‘’`单引号对括起来的零个或多个字符。字符串被限定在成对引号之间；
  - ES6 中引入了 ` `` `模板字符串（与 Python等语言的字符串插值相似），提供了一些语法糖来帮构造字符串，模板字符串前添加一个 tag 来自定义模板字符串的解析过程，这可以用来防止注入攻击
  - JavaScript 会自动将字符串字面值转换为一个临时字符串对象，字符串字面值也是字符串对象（即：String 内置对象）
    ```js
      let str = 'hello world'
      console.log(str.length) // 11
      console.log('hello world'.length) // 11
      console.log('one line \n another line')
      
      let site = 'baidu'
      console.log(`https://www.${site}.com`)
    ```
#### 字符串中的特殊字符
  - `\` 转义字符, 符合正确的转移字符组合，所带的 `\` 前导反斜线将被忽略
    |字符	| 意思 |
    |:----|:----|
    |`\0` | Null 字节 |
    |`\b` | 退格符 |
    |`\f` | 换页符 |
    |`\n` | 换行符 |
    |`\r` | 回车符 |
    |`\t` | Tab (制表符) |
    |`\v` | 垂直制表符 |
    |`\'` | `''`单引号 |
    |`\"` | `""`双引号 |
    |`\\` | `\`反斜杠字符 |
    |`\XXX`| 由从 `0 - 377` 最多三位八进制数XXX表示的 Latin-1 字符。例如，`\251` 是版权符号的八进制序列 |
    |`\xXX`| 由从 `00` 和 `FF` 的两位十六进制数字 XX 表示的 Latin-1 字符。例如，`\ xA9` 是版权符号的十六进制序列。|
    |`\uXXXX`	| 由四位十六进制数字 XXXX 表示的 Unicode 字符。例如，`\ u00A9` 是版权符号的 Unicode 序列。|
    |`\u*{XXXXX}*` |	Unicode 代码点 (code point) 转义字符。例如，`\u{2F804}` 相当于 Unicode 转义字符 \uD87E\uDC04 的简写 |。
  - 通过在引号前加上反斜线 `\`，可以在字符串中插入引号，这就是引号转义
    + 例: `console.log("He read \"hello world\" by her") // He read "hello world" by her`
  - 字符串换行之前加上反斜线以转义换行（译注：简而言之一条语句拆成多行书写），这样反斜线和换行都不会出现在字符串的值中
    ```js
      var str = "this string \
        is broken \
        across multiple\
        lines.";
      console.log(str); // this string is broken across multiplelines.
      
      var poem = "云裳衣裳花想容,\n\
        春风扶槛露华浓。\n\
        若非群玉山头见,\n\
        会向瑶台月下逢。";
      console.log(poem);
      // 云裳衣裳花想容,
      // 春风扶槛露华浓。
      // 若非群玉山头见,
      // 会向瑶台月下逢。

      var poem = `云裳衣裳花想容,
        春风扶槛露华浓。
        若非群玉山头见,
        会向瑶台月下逢。`;
      console.log(poem);
      // 云裳衣裳花想容,
      // 春风扶槛露华浓。
      // 若非群玉山头见,
      // 会向瑶台月下逢。
    ```
### RegExp 正则字面值
  - 一个正则表达式是字符被斜线（译注：`/` 正斜杠）围成的表达式
    ```js
      var re = /ab+c/;
    ```

### 数组字面量
  - 数组字面值是一个封闭在方括号对 `[]` 中的包含有零个或多个**表达式**的列表，其中每个表达式代表数组的一个元素。
  - 当你使用数组字面值创建一个数组时，该数组将会以指定的值作为其元素进行初始化，而其长度被设定为元素的个数。
    ```js
      let arr =  [ 1+9, 'anc', {name: 'name'} ]
      console.log(arr[0]) // 10
      console.log(arr.length) // 3
    ```
  - 数组字面值同时也是数组对象（即：Array 内置对象）
  - 数组字面值中的多余逗号
    + 数组字面量初始化时，`[]` 列表中所有的逗号都表示一个新元素（的开始）,元素默认为 `undefined`, 最后的那个逗号被忽略
    + 温馨提示：显式地将缺失的元素声明为 `undefined`，将大大提高你的代码的清晰度和可维护性。
      ```js
        /*建议声明 [ 1+9, 'anc', {name: 'name'}, undefined,] */
        let arr = [ 1+9, 'anc', {name: 'name'}, ,]
        console.log(arr[3]) // undefined
        console.log(arr.length) // 4
      ```

### 对象字面量
  - 对象字面值是一个封闭在花括号对 `{}` 中的一个对象的零个或多个 **“属性名—值”** 键值对的（元素）列表。
  - 对象属性名字可以是任意字符串，包括 `‘’` 空串
  - 如果对象属性名字不合法，则不能用点 `.`访问该对象的属性值，但可通过 `[]` 方括号表示法来访问该对象的属性值
    ```js
      const obj = {
        '': '空字符串',
        '!': '感叹号'
      }
      console.log(obj.'');   // SyntaxError: Unexpected string
      console.log(obj.!);    // SyntaxError: Unexpected token !
      console.log(unusualPropertyNames[""]); // 空字符串
      console.log(unusualPropertyNames["!"]); // 感叹号
      // 注意
      var foo = { a: "alpha", 2: "two" };
      console.log(foo.a); // alpha
      console.log(foo[2]); // two
      console.log(foo["a"]); // alpha
      console.log(foo["2"]); // two
      //console.log(foo.2);  // SyntaxError: missing ) after argument list
      //console.log(foo[a]); // ReferenceError: a is not defined
    ```
#### 增强的对象字面量
  - 在 ES6 中对象字面值扩展支持在创建时设置原型，简写了 `foo: foo` 形式的属性赋值，方法定义，支持父方法调用，以及使用表达式动态计算属性名。
  - 这使得对象字面值和类声明更加紧密地联系起来
    ```js
      var obj = {
        // __proto__
        __proto__: theProtoObj,
        // Shorthand for ‘handler: handler’
        handler,
        // Methods
        toString() {
          // Super calls
          return "d " + super.toString();
        },
        // Computed (dynamic) property names
        ["prop_" + (() => 42)()]: 42,
      };      
    ```

## 参考资料
  - [MDN: 字面量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#%E5%AD%97%E9%9D%A2%E9%87%8F)