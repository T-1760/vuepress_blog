---
sidebar: auto
title: String 字符串
date: 2023-10-18
tags:
 - String
 - 字符串
categories: 
 - 标准内置对象
---

## String 的创建
### 字符串字面量
  ```js
      let str = '123'
  ``` 
### String 字符串对象
  ```js
      let str = String(123); // '123'
  ```
### new String() 构造函数（不推荐）
  - 创建一个 String 对象，该对象不是一个字符串原始值.
  ```js
    console.log(typeof new String(123)) // "object"，
    console.log(typeof '123') // "string"，
    console.log(new String(123) == "123", new String(123) === "123", String(123) === "123") // true false true
  ```
## String 的静态方法
### String.fromCharCode()
  - 功能：返回使用指定的 `Unicode` 值序列创建的字符串。

### String.fromCodePoint()
  - 功能：返回使用指定的码位序列创建的字符串。

### String.raw()
  - 功能：返回从原始模板字符串创建的字符串。

## String 的实例属性
  - 在 `String.prototype` 上定义的属性，并由所有 str 实例共享。
    + `String.prototype.constructor` => `str 实例.constructor`
    + `String.prototype.length` => `str 实例.length`
### String.prototype.constructor
  - 功能：创建实例对象的构造函数。对于 `str` 实例，初始值是 `String` 构造函数。

### String.prototype.length
  - 功能：反映字符串的 length。只读。

## String 的实例方法
### str.slice()
  - 功能：拷贝字符串中的某段数据，对原字符串不会产生改变
  - 语法：`str.slice(start, end)`
  - 参数：
    + start<Number 数值类型>: 起始位，从 0 开始
    + end <Number 数值类型>: 结束位
  - 返回值<String 字符串类型>：返回拷贝某段数据的**新字符串**
  ```js
      let string = 'happy day'
      let stringSlice = string.slice(1, 2) // 从位置1即第二个字符开始，拷贝到位置为2前
      console.log(string ,stringSlice) //string:'happy day'  stringSlice:'a'
      
      stringSlice = string .slice(0)// 拷贝整个字符串
      console.log(string ,stringSlice) //string:'happy day'  stringSlice:'happy day'
  ```

### str.split()
  - 功能：以指定的分割符对字符串进行分割
  - 语法：`str.split(separator[, limit])`
  - 参数：
    + separator<String 字符串类型>: 分隔符
    + imit<Number 数值类型>: 限制分割的份数
  - 返回值<Array类型>：返回以分隔符分割成的数组
  ```js
    let string = 'happy day and day'
    let ArraySplit= string.split(' ') // 以空格进行分割
    console.log(string ,ArraySplit) //string:'happy day and day'  ArraySplit:['happy','day','and','day']
    
    ArraySplit= string.split(' ',2) // 以空格进行分割，并提取2份
    console.log(string ,ArraySplit) //string:'happy day and day'  ArraySplit:['happy','day']
  ```

### str.substring()
  - 功能：截取指定位置的字符串
  - 语法：`str.substring(start[, end])`
  - 参数：
    + start<Number 数值类型>: 起始位置，从0开始
    + end<Number 数值类型>: 结束位置
  - 返回值<String类型>：返回截取到的字符串
  ```js
    let string = 'happy day'
    let stringSubstring= string.substring(0,4) // 从开头位置截取到位置4之前
    console.log(string, stringSubstring) //string:'happy day'  stringSubstring:'happ'
    
    stringSubstring= string.substring(5) // 从位置5开始截取到完
    console.log(string, stringSubstring) //string:'happy day'  stringSubstring:'day'
  ```
### str.substr()
  - 功能：截取指定长度的字符串
  - 语法：`str.substr(start, length)`
  - 参数：
    + start<Number 数值类型>: 起始位置.(当参数为负数时 从字符串末尾开始计算，例 -1 则是字符串的最后一个字符)，
    + length<Number 数值类型>: 截取的字符长度。默认为字符串长度
  - 返回值<String 字符串类型>：返回截取到的字符串
  ```js
    let str='string'
    console.log(str.substr(0, 3))  // str
    console.log(str.substr(1)) // tring
    console.log(str.substr(-1))  // g
    console.log(str)  // string
  ```

### str.charAt()
  - 功能：从字符串中返回指定的字符
  - 语法：`str.charAt(index)`
  - 参数：
    + index<Number 数值类型>::指定位置，从 0 开始
  - 返回值<String 字符串类型>：返回的字符
  ```js
    let string = 'happy day'
    let char= string.charAt(4) // 读取第五个字符
    console.log(string, char) //string:'happy day'  char:'y'
  ```

### str.concat(str1, str2, str3...)
  - 功能：字符串拼接
  - 语法：`str.concat(str1, str2, ...strN)`
  - 参数：
    + strN<String 字符串类型>: 拼接的字符串
  - 返回值<String 字符串类型>：返回拼接完的 **新字符串**
  ```js
    let str1 = 'happy day'
    let str2 = 'And day'
    let str3 = str1.concat(str2) // 读取第五个字符
    console.log(str1, str2, str3 ) //str1:'happy day'  str2:'And day' str3:'happy dayAnd day'
   // 更建议使用[赋值操作符]（`+`, `+=`）
  ```

### str.toUpperCase()
  - 功能：把字符串转化为大写
  - 语法：`str.toUpperCase(params)`
  - 参数：
    + params<String 字符串类型>: 需要转换的字符串
  - 返回值<String 字符串类型>：转换为大写的**新字符串**
  ```js
    let string = 'happy day'
    let upperCase= string.toUpperCase() // 把字符串转换成大写
    console.log(string, upperCase) //string:'happy day'  upperCase: 'HAPPY DAY'
  ```

### str.toLowerCase()
  - 功能：把字符串转化为小写
  - 语法：`str.toLowerCase(params)`
  - 参数：
    + params<String 字符串类型>: 需要转换的字符串
  - 返回值<String 字符串类型>：转换为小写的**新字符串**
  ```js
    let string = 'HAPPY DAY'
    let upperCase= string.toLowerCase() // 把字符串转换成小写
    console.log(string ,upperCase) //string:'HAPPY DAY'  upperCase: 'happy day'
  ```

### str.trim()
  - 功能：去掉字符串两端的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR等）
  - 语法：`str.trim()`
  - 返回值<String 字符串类型>：返回去掉空白字符的字符串
  ```js
    let string = '  happy day   '
    let str= string.trim() // 去掉字符串两端的空白字符
    console.log('string:' ,string ,'str:',str) //string:'  happy day   '  str: 'happy day'
  ```

### str.endsWith()
  - 功能：判断给定字符或者是字符串是否是该字符串的结尾
  - 语法：`str.endsWith(params，index)`
  - 参数：
    + params<String 字符串类型>: 字符串
    + index<Number 数值类型>: 把第几位当作是末尾（以1开始）
  - 返回值<Boolean 布尔类型>：true 或 false
  ```js
    let string = 'happy day'
    let endwith= string.endsWith('ay') // 末尾是以’ay‘结尾
    console.log(string ,endwith) //string:'happy day'  charcode:true
    
    endwith= string.endsWith('app',4) // 把第四位当作是末尾，判断’app‘是不是结尾
    console.log(string ,endwith) //string:'happy day'  charcode:true
  ```
### str.replace()
  - 功能：替换字符串中的字符，
  - 语法：`str.replace(regexp|substr, newSubStr|function)`
  - 参数
    + regexp<Object 正则对象| String 正则字符串>: 一个正则表达式对象 或者 其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。
    + substr<String 字符串类型>: 一个将被 newSubStr 替换的 字符串。其被视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换。
    + newSubStr<String 字符串类型>: 用于替换掉第一个参数在原字符串中的匹配部分的字符串。该字符串中可以内插一些特殊的变量名。
    + function<Function 函数类型>: 一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。
  - 返回值<String 字符串类型>：一个部分或全部匹配由替代模式所取代的新字符串。
    ```js
        let str='string'
        console.log(str.replace('r','R'), str)  //stRing    string
        // 交换一个字符串中两个单词的位置
        let re = /(\w+)\s(\w+)/;
        let newStr = 'two one'.replace(re, "$2, $1"); // one, two
        console.log(newStr);
    ```

### str.match()
  - 功能：检索字符串匹配正则表达式的结果
  - 语法：`str.match(regexp)`
  - 参数
    + regexp<Object 正则对象>： 一个正则表达式对象。若参数非正则表达式，将隐式地使用 `new RegExp(obj)`
    + 注意：如果使用 `g` 全局搜索标志，则将返回与完整正则表达式匹配的所有结果，但不会返回groups捕获组；若不包含 g 标志，`str.match()` 将返回与 `RegExp.exec()` 相同的结果。
  - 返回值<Array 素组 | null 类型>：
    + 找到：`[查询结果1，查询结果2···, index: 0, input: "string", groups: undefined]`; 
      1. index<Number 数值类型>: 匹配的结果的开始位置
      1. input<String 字符串类型>: 搜索的字符串.
      1. groups<Array 素组 | undefined 类型>: 一个捕获组数组 或 undefined（如果没有定义命名捕获组）。
    + 未找到：null
  ```js
    console.log('string'.match(/\w*$/)) // ["string", index: 0, input: "string"]
    console.log('string'.match('rin')) // ["rin", index: 2, input: "string"]
    console.log('string'.match(/^a*$/))  //null
    console.log('string'.match())  // ["", index: 0, input: "string", groups: undefined]
    console.log('abc123'.match(/\d/g))// ["1", "2", "3"]
    console.log('abc123'.match(/\d/))// ["1", index: 4, input: "abc123", groups: undefined]
  ```

### str.search()
  - 功能：执行正则表达式 和 str对象之间的一个搜索匹配.(用法等同于match，match返回匹配结果值数组，search返回搜索匹配值索引)
  - 语法：`str.search(regexp)`
  - 参数
    + regexp<Object 正则对象>： 一个正则表达式对象。若参数非正则表达式，将隐式地使用 `new RegExp(obj)`
  - 返回值<Number 数值类型>：返回 正则表达式在字符串中**首次匹配项的索引**; 反之返回 -1
  ```js
    console.log('string'.search('rin'))  //2
    console.log('string'.search('stringaa')) //-1
  ```

### str.includes()
  - 功能：查找字符串是否包含提供的字符串
  - 语法：`str.includes(searchStr，index)`
  - 参数：
    + searchStr<String 字符串类型>:查找的字符串
    + index<Number 数值类型>:从第几位找起（从0开始）
  - 返回值<Boolean 布尔类型>：true 或 false
  ```js
    let string = 'happy day'
    let includeFlag= string.includes('ay') // 查找是否存在'ay'
    console.log(string ,includeFlag) //string:'happy day'  includeFlag:true
    
    includeFlag= string.includes('day',5) // 从第六个字符开始查找是否存在’day'
    console.log(string ,includeFlag) //string:'happy day'  includeFlag: true
  ```

### str.indexOf()
  - 功能：查找某字符串在该字符串中第一次出现的索引位置
  - 语法：`str.indexOf(searchStr，index)`
  - 参数：
    + searchStr<String 字符串类型>: 查找的字符串
    + index<Number 数值类型>: 从第几位找起（从0开始）
  - 返回值<Number 数值类型>：索引位置, 若不存在返回 -1
  ```js
    let string = 'happy day'
    let index = string.indexOf('ppy') // 查找’ppy'在字符串中第一次出现的索引位置
    console.log(string ,index) //string:'happy day'  index: 2
    
    index = string.indexOf('ppy',2) // 从索引位置为2开始查找’ppy‘的索引位置
    console.log(string ,index) //string:'happy day'  index: 2
  ```
### str.lastIndexOf()
  - 功能：从末尾开始查找某字符串在该字符串中第一次出现的索引位置
  - 语法：`str.lastIndexOf(searchStr[, start])`
  - 参数：
    + searchStr<String 字符串类型>: 查找的字符串
    + start<Number 数值类型>: 从第几位找起（从**字符串末尾**开始 ）
  - 返回值<Number 数值类型>：索引位置，若不存在返回 -1
    ```js
        let string = 'happy day'
        let index = string.indexOf('ppy') // 查找’ppy'在字符串中第一次出现的索引位置
        console.log(string ,index) //string:'happy day'  index: 2
        
        index = string.indexOf('ppy',2) // 从索引位置为2开始查找’ppy‘的索引位置
        console.log(string ,index) //string:'happy day'  index: 2
    ```

### arr.charCodeAt()
  - 功能：从字符串中返回指定字符的 16位Unicode编码
  - 语法：`arr.charCodeAt(index)`
  - 参数：
    + index<Number 数值类型>: 指定位置，从 0 开始
  - 返回值<Number 数值类型>：Unicode编码
  ```js
    let string = 'happy day'
    let charCode = string.charCodeAt(4) // 读取第五个字符
    console.log(string , charCode) //string:'happy day'  charCode:121
  ```

### str.codePointAt()
  - 功能：从字符串中返回指定字符的 Unicode编码
  - 语法：`str.codePointAt(index)`
  - 参数：
    + index<Number 数值类型>: 指定位置，从 0 开始
  - 返回值<Number 数值类型>：Unicode编码
  ```js
    let string = 'happy day'
    let charCode= string.codePointAt(4) // 读取第五个字符
    console.log(string ,charCode) //string:'happy day'  charCode:121
  ```
  - 注意: codePointAt 与 charCodeAt 方法的区别
    + charCodeAt 是用 2 个字节编码（码元），
    + codePointAt 使用 4 个字节编码（码点）

## 参考资料
  - [String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)