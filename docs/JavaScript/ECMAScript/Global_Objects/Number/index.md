---
sidebar: auto
title: Number 数值
date: 2023-10-18
tags:
 - Number
 - 数值
categories: 
 - 标准内置对象
---

## 前言
### JavaScript 数值遵循 IEEE 754 规范
  - JavaScript 的 Number 类型是一个**双精度 64 位二进制格式 IEEE 754 值**，
    + 类似于 Java \ C# 中的 `double`。这意味着它可以表示小数值，但是存储的数字的大小和精度有一些限制。（简而言之，IEEE 754 双精度浮点数使用 64 位来表示 3 个部分：）
      1. `1` 位用于表示符号位（sign）：正数或者负数
      1. `11` 位用于表示指数（exponent）：取值范围`-1022` 到 `1023`
      1. `52` 位用于表示尾数（mantissa）：表示 0 和 1 之间的数值
    + 科学计数法：Number = (-1) ^sign^ · (1 + mantissa)· 2^exponent^
    + 尾数（即：有效数）是表示实际值（即：有效数字）的数值部分
### JavaScript 数值取值范围
  - 尾数使用 `52` 比特存储，在二进制小数中解释为 `1.…` 之后的数字。尾数的精度是 2^-52^（即：可用 `Number.EPSILON` 获得）
    + 简而言之，十进制数小数点后大约 `15` 到 `17` 位；超过这个精度的算术会受到**舍入的影响**
  - 一个数值可容纳的最大值是 2^1024^ - 1（指数为 `1023`，尾数为基于二进制的 `0.1111…`）
    + 可以通过 `Number.MAX_VALUE` 获得。超过此值会被替换为 `Infinity` 特殊的数值常量。
  - 只有在 [ -2^53^ + 1, 2^53^ - 1] 范围闭区间的整数才能在不丢失精度的情况下被表示
    + 可通过 `Number.MIN_SAFE_INTEGER` 和` Number.MAX_SAFE_INTEGER` 获得），因为尾数只能容纳 `53` 位（包括前导 `1`）。
  - 在 JavaScript 代码中，如 `37` 这样的数字字面量是浮点数值，而不是整数。
    + 在常见的日常使用中，JavaScript 没有单独的整数类型。
    + JavaScript 新增的 BigInt 类型，但它并不是为了取代 Number 而设计的，`37` 仍然是一个数字，而不是一个 BigInt。
  ```js
    // 整数类型的范围
    const biggestInt = Number.MAX_SAFE_INTEGER; // (2**53 - 1) => 9007199254740991
    const smallestInt = Number.MIN_SAFE_INTEGER; // -(2**53 - 1) => -9007199254740991
  ```
### Number 数值强制转换
  - `BigInt` 类型进行 Number 数值强制转换会抛出 `TypeError`，以防止意外的强制隐式转换导致精度损失。
  - `Symbol` 类型进行 Number 数值强制转换会抛出 `TypeError`。
  - `undefined` 类型进行 Number 数值强制转换为 `NaN`
  - `null` 类型进行 Number 数值强制转换为 `0`
  -  `Boolean` 布尔类型进行 Number 数值强制转换
    + `true` 强制转换为 `1`
    + `false` 强制转换为 `0`
  - `Object` 对象类型进行 Number 数值强制转换,
    + 首先通过按顺序调用它们的 `[@@toPrimitive]()`（使用 "number" 提示）、`valueOf()` 和 `toString()` 方法将其转换为原始值。
    + 然后将得到的原始值转换为数字。（除了 `Object` 以外，所有类型都定义了表示在语言最低层面的不可变值。将这些值称为**原始值**）
  - `String`字符串类型进行 Number 数值强制转换，
    + 首先将被字符串假定为包含数字字面量，
    + 再通过解析它们来转换。解析失败会得到 `NaN`。与实际数字字面量相比，它们有一些细微的差别：
      1. 前导和尾随的空格/换行符会被忽略。
      1. 前导的数字 `0` 不会导致该数值成为八进制字面量（或在严格模式下被拒绝）。
      1. `+` 和 `-` 允许出现在字符串的开头以指示其符号。（在实际代码中，它们“看起来像”文字的一部分，但实际上是独立的一元运算符。）然而，该标志只能出现一次，并且后面不能跟空格。
      1. `Infinity` 和 `-Infinity` 被当作是字面量。在实际代码中，它们是全局变量。
      1. 空字符串或仅包含空格的字符串转换为 `0`。
      1. 不允许使用数字分隔符。（即：`_`下划线作为分隔符以增强数值字面量的可读性：`1_000_000_000_000`）
#### JavaScript 实现 Number 类型转换
  - 一元加/减：`+x`（或 `-x`） 完全按照 Number 数值强制转换步骤来转换 x。
  - `Number()` 函数：`Number(x)`使用相同的算法转换 x，除了 `BigInt` 不会抛出 `TypeError`，而是返回其数字值（可能导致精度损失）
    + `Number.parseFloat()` 和 `Number.parseInt()` 只能转换字符串，并且解析规则略有不同。例：`parseInt()` 无法识别小数点，`parseFloat()` 无法识别 `0x` 前缀。
  
  ```js
    console.log(+"123", Number("123")); // 123  123
    console.log(+"12.3", Number("12.3")); // 12.3  12.3
    console.log(+"12.00", Number("12.00")); // 12  12
    console.log(+"123e-1", Number("123e-1")); // 12.3  12.3
    console.log(+"", Number("")); // 0  0
    console.log(+null, Number(null)); // 0  0
    console.log(+undefined, Number(undefined)); // NaN  NaN
    console.log(+"0x11", Number("0x11")); // 17  17
    console.log(+"0b11", Number("0b11")); // 3  3
    console.log(+"0o11", Number("0o11")); // 9  9
    console.log(+"foo", Number("foo")); // NaN  NaN
    console.log(+"100a", Number("100a")); // NaN  NaN
    console.log(+"-Infinity", Number("-Infinity")); // -Infinity  -Infinity    
    
    // 使用 Number() 转换 Date 对象
    console.log(Number(new Date("2019-10-01T03:24:00"))); // 1569871440000
    console.log(Number(new Date("October 01, 2019 03:24:00"))); // 1569871440000
  ```

### 固定宽度数值转换
  - JavaScript 有一些较低级别的函数，用于处理整数的二进制编码，常见就是**按位运算**和 **`TypedArray` 对象**。
    + 按位运算总是将操作数转换为 `32` 位整数。在这些情况下，将值转换为数字后，数字将首先截断小数部分，然后再取整数的二进制的补码编码中的最低几位来将数值标准化为给定的宽度。
  ```js
    new Int32Array([1.1, 1.9, -1.1, -1.9]); // Int32Array(4) [ 1, 1, -1, -1 ]

    new Int8Array([257, -257]); // Int8Array(2) [ 1, -1 ]
    // 257 = 0001 0000 0001
    //     =      0000 0001（模 2^8）
    //     = 1
    // -257 = 1110 1111 1111
    //      =      1111 1111（模 2^8）
    //      = -1（带符号整数）

    new Uint8Array([257, -257]); // Uint8Array(2) [ 1, 255 ]
    // -257 = 1110 1111 1111
    //      =      1111 1111（模 2^8）
    //      = 255（无符号整数）    
  ```
## Number 的创建
### 数值字面量
  ```js
    let num = 123
  ```
### Number () 数值对象
  ```js
    console.log(Number("-Infinity"), Number("123")); // -Infinity  123 
  ```
### 一元加减隐式创建
  ```js
    console.log(+"-Infinity", -null)); // -Infinity  -0
  ```
### new Number() 构造函数（不推荐）
  - 创建一个 Number 对象，该对象不是一个数值原始值.
    ```js
      console.log(typeof new Number(123)) // "object"，
      console.log(typeof 123) // "number"，
      console.log(new Number(123) == 123, new Number(123) === 123, Number(123) === 123) // true false
    ```

## Number 的静态属性
  ```js
    console.log( Number.MIN_VALUE ); // 5e-324
    console.log( Number.MAX_VALUE ); // 1.7976931348623157e+308
    console.log( Number.MIN_SAFE_INTEGER ); // -9007199254740991
    console.log( Number.MAX_SAFE_INTEGER ); // 9007199254740991
    console.log( Number.NaN ); // NaN
    // Infinity 是全局对象的属性
    console.log( Number.POSITIVE_INFINITY, window.Infinity ); // Infinity Infinity
    console.log( Number.NEGATIVE_INFINITY ); // -Infinity   
  ```
### Number.MIX_VALUE
  - 能表示的最小正数即最接近 0 的正数（实际上不会变成 0）。
### Number.MAN_VALUE
  - 能表示的最大正数。
### Number.MIN_SAFE_INTEGER
  - 能表示的最小的安全整数（-(2^53^ - 1)）。
### Number.MAX_SAFE_INTEGER
  - 能表示的最大的安全整数（2^53^ - 1）。
### Number.NAN
  - 非数字值。
### Number.POSITIVE_INFINITY
  - 特殊的正无穷大值，在溢出时返回该值。
### Number.NEGATIVE_INFINITY
  - 负无穷，当溢出时返回。

## Number 的静态方法
### Number.isNaN()
  - 功能：确定传递的值是否是 `NaN`。
### Number.parseFloat()
  - 功能：和全局对象 `parseFloat()` 一样。
### Number.parseInt()
  - 功能：和全局对象 `parseInt()` 一样。
### Number.isFinite()
  - 功能：确定传递的值类型及本身是否是有限数。
### Number.isInteger()
  - 功能：确定传递的值类型是 `number`，且是整数。
### Number.isSafeInteger()
  - 功能：确定传递的值是否为安全整数 [`Number.MIN_SAFE_INTEGER`, `Number.MAX_SAFE_INTEGER`] ( -(2^53^ - 1) 至 2^53^ - 1 之间)。

## Number 的实例属性
  - 在 `Number.prototype` 上定义的属性，并由所有 num 实例共享。
  - `Number.prototype.constructor` => `num 实例.constructor`

## Number 的实例方法
### num.toFixed()
  - 功能：用定点表示法来格式化该数值。将而言之，将一个（浮点型）数字转换为指定小数位数的字符串。
  - 语法：`num.toFixed(digits)`
  - 参数：
    + digits<Number 数值类型>：小数点后的位数, `[0, 100]` 取值范围，默认值 `0`
  - 返回值<String 字符串类型>：使用定点表示法表示给定数字的字符串
  ```js
    var num = Number(5.123);
    var int = 10;
    console.log(num.toFixed(2), parseFloat(int).toFixed(2));  // '5.12' '10.00'
  ```

### num.toString()
  - 功能：返回给定对象基于指定基数（radix）的字符串。简而言之，将一个数字转换为指定进制字符串。
  - 语法：`num.toString(radix)`
  - 参数：
    + radix<Number 数值类型>：表示数字值的基数。`[2, 36]` 取值范围，默认为 10
  - 返回值<String 字符串类型>：表示指定数字值的字符串
  ```js
    var num = Number(5.123);
    console.log(num.toString());  // '5.123'
    
    function hexColour(coloe) {
      if (coloe < 256) {
        return Math.abs(coloe).toString(16);
      }
      return 0;
    } 
    console.log(hexColour(233)); // "e9"    
    console.log(hexColour('11')); // "b"
  ```

### num.valueOf()
  - 功能：返回指定对象的原始值。
  - 语法：`num.valueOf()`
  - 返回值<Number 数值类型>：表示指定 Number 对象的原始值的数字
  ```js
    const numObj = new Number(42);
    console.log(typeof numObj);
    // Expected output: "object"

    const num = numObj.valueOf();
    console.log(num);
    // Expected output: 42

    console.log(typeof num);
    // Expected output: "number"
  ```

### num.toLocaleString()
  - 功能：将一个数字转换为本地数字格式的字符串。
  - 语法：`num.toLocaleString([locales][, options])`
  - 参数
    + locales<String 字符串类型>：指定格式转换的语言（即：缩写语言代码 zh-cn）
    + options<Object 对象类型>：调整输出格式的对象
  - 返回值<String 字符串类型>：返回一个语言环境下的表示字符串
  ```js
    function eArabic(x) {
      return x.toLocaleString('ar-EG'); // 阿拉伯文
      return x.toLocaleString('zh-cn'); // 中文
    }

    console.log(eArabic(123456.789)); 
    // 阿里博文 ١٢٣٬٤٥٦٫٧٨٩
    // 中文 123,456.789
  ```

### num.toExponential()
  - 功能：使用指数表示数值的字符串。简而言之，将数字转换为指定数目中有效数字的字符串。
  - 语法：`num.toExponential(fractionDigits)`
  - 参数
    + fractionDigits<Number 数值类型>：表示指定小数点后有效位数。默认为，完整表示该数字所需要的数字。
  - 返回值<String 字符串类型>：其小数点前为一位数字，小数点后舍入到 `fractionDigits` 位的字符串：
  ```js
    console.log(0.00123.toExponential(2));   // '1.23e-3'
    console.log(5.00123.toExponential(2));   // '5.00e+0'
    console.log(5.123.toExponential(2));   // '5.12e+0'
  ```
### num.toPrecision()
  - 功能：以指定精度表示该数字的字符串，简而言之，将数字转换为指定有效数字的字符串
  - 语法：`num.toPrecision(precision)`
  - 参数
    + precision<Number 数值类型>：指定有效位数的整数
  - 返回值<String 字符串类型>：以定点或指数表示数值的字符串，该字符串四舍五入到 `precision` 个有效数字
  ```js
    let numObj = 5.123456;

    console.log(numObj.toPrecision()); // '5.123456'
    console.log(numObj.toPrecision(5)); // '5.1235'
    console.log(numObj.toPrecision(2)); // '5.1'
    console.log(numObj.toPrecision(1)); // '5'

    numObj = 0.000123;

    console.log(numObj.toPrecision()); // '0.000123'
    console.log(numObj.toPrecision(5)); // '0.00012300'
    console.log(numObj.toPrecision(2)); // '0.00012'
    console.log(numObj.toPrecision(1)); // '0.0001'

    // 请注意，在某些情况下可能会返回指数表示法字符串
    console.log((1234.5).toPrecision(2)); // '1.2e+3'

  ```

## 参考资料
  - [MDN Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)

