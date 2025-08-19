---
sidebar: auto
title: Array 数组
date: 2023-10-18
tags:
 - Array
 - 数组
categories: 
 - 标准内置对象
---

## 前言
### 数组方法和空槽
  - 稀疏数组中的空槽在数组方法之间的行为不一致。通常，旧方法会跳过空槽，而新方法将它们视为 `undefined`。
  - 创建数组空槽： 
    ```js
      let emptyArr2 = Array(2)
      let emptyArr3 = new Array(3)
      console.log(emptyArr2, emptyArr3) // [ <2 empty items> ]  [ <3 empty items> ]
      console.log(emptyArr2[1], emptyArr3[2]) // undefined undefined
    ``` 
  - 以下数组方法将 `empty` 空槽视为 `undefined`：
    + `entries()`
    + `fill()`
    + `find()`
    + `findIndex()`
    + `findLast()`
    + `findLastIndex()`
    + `includes()`
    + `join()`
    + `keys()`
    + `toLocaleString()`
    + `values()`
  - 以下数组方法遍历多个元素时，在访问索引之前执行 `in` 检查，并且不将 `empty` 空槽与 `undefined` 合并：
    + `concat()`
    + `copyWithin()`
    + `every()`
    + `filter()`
    + `flat()`
    + `flatMap()`
    + `forEach()`
    + `indexOf()`
    + `lastIndexOf()`
    + `map()`
    + `reduce()`
    + `reduceRight()`
    + `reverse()`
    + `slice()`
    + `some()`
    + `sort()`
    + `splice()`
    ```js
      let emptyArr = new Array(3)
      let undefinedArr = new Array(undefined, undefined, undefined)
      emptyArr.map(item => item + 1) // [ <5 empty items> ]
      undefinedArr.map(item => item + 1) // [ NaN, NaN, NaN ]
    ```
    
## Array 的创建
### 数组字面量
  ```js
    let arr = [ 1+9, 'anc', {name: 'name'} ]
  ```
### Array 数组对象
  ```js
    let arr = Array(1+9, 'anc', {name: 'name'}) // [ 10, 'anc', {name: 'name'} ]
  ```
### new Array() 数组构造函数
  ```js
    let arr2 = new Array() // [] 
    // empty 空槽取值为 undefined
    let arr1 = new Array(3) // [empty, empty, empty]
    let arr2 = new Array(1+9, 'anc', {name: 'name'}) //  [ 10, 'anc', {name: 'name'}]
  ```

## Array 的静态方法
### Array.from()
  - 功能：从数组类对象或可迭代对象创建一个新的 Array 实例。
  - 语法：`Array.from(arrayLike[, mapFn[, thisArg]])`
  - 参数：
    + arrayLike：想要转换成数组的 伪数组对象或 可迭代对象（可遍历）, 类数组包含:
      1. 数组
      2. 字符串
      3. Set
      4. Map
      5. NodeList
      6. HTMLCollection
      7. arguments
      8. 拥有 `length` 属性的任意对象
    + mapFn <Function 函数类型>：如果指定了该参数，新数组中的每个元素会执行该回调函数。
    + thisArg <Object 对象类型>：可选参数，执行回调函数 mapFn 时 this 对象。
  - 返回值 <Array 数组类型>
  ```js
    let obj ={
	    '0': '大',
	    '1': '前',
	    '2': '端',
	    'length': 3
	  }
	  let arr = Array.from(obj); // ["大", "前", "端"]

    let arr2 = Array.from({ length: 3 }, (value, index) => {
      return index + 1;    
    }); // [1, 2, 3]
  ```

### Array.isArray()
  - 功能：如果参数是数组则返回 true ，否则返回 false 。
  - 语法：`Array.isArray(param)`
  - 参数：
    + param <Any 任意类型>: 需要检测的值
  - 返回值 <Boolean 布尔类型>
  ```js
    Array.isArray([1, 2, 3]); // true
    Array.isArray({foo: 123}); // false
    Array.isArray("foobar"); // false
    Array.isArray(undefined); // false
  ```

### Array.of()
  - 功能：创建一个新的 Array 实例，具有可变数量的参数，而不管参数的数量或类型。
  - 语法：`Array.of( elementN )`
  - 参数：
    + elementN <Any 任意类型>：任意个参数，将按顺序成为返回数组中的元素。
  - 返回值 <Array 数组类型>
  ```js
    Array.of(undefined); // [undefined]
    Array.of(7);       // [7]
    Array.of(1, 2, 3); // [1, 2, 3]
    Array(7);          // [ , , , , , , ] 返回一个数组长度73的  空数组 =>[empty × 7]
    Array(1, 2, 3);    // [1, 2, 3]
  ```

## Array 的实例属性
  - 在 `Array.prototype` 上定义的属性，并由所有 arr 实例共享。
    + `Array.prototype.constructor` => `arr 实例.constructor`
    + `Array.prototype.length` => `arr 实例.length`
### Array.prototype.constructor
  - 创建实例对象的构造函数。对于 Array 实例，初始值是 arr 构造函数。
### Array.prototype[@@unscopables]
  - 包含 ES6 版本之前 ECMAScript 标准中没有包含的属性名，在使用 `with` 绑定语句时会被忽略。
### Array.prototype.length
  - 反映实例数组中元素的数量。
  - JavaScript 数组的 `length` 属性和数值属性是连接的。
  - 一些内置数组方法（例: `join()`、`slice()`、`indexOf()` 等）在**被调用时**会考虑到数组的 length 属性。
  - 一些内置数组方法（例，`push()`、`splice()` 等）也会**更新**数组的 length 属性。
  - 当在 JavaScript 数组上设置一个属性时，如果该属性是一个有效的数组索引并且该索引在数组的当前边界之外，引擎将相应地更新数组的 length 属性：

## Array 的实例方法
  - 修改原数组值方法与相应的非修改方法
    | 修改方法     | 相应的非修改方法 |
    |:---|:---|
    | `copyWithin()`    | 暂无 |
    | `fill()`          | 暂无 |
    | `pop()`           | `slice(0, -1)` |
    | `push(v1, v2)`    | `concat([v1, v2])` |
    | `reverse()`       | `toReversed()` |
    | `shift()`         | `slice(1)` |
    | `sort()`          | `toSorted()` |
    | `splice()`        | `toSpliced()` |
    | `unshift(v1, v2)` | `toSpliced(0, 0, v1, v2)` |
  - 数组实例方法功能分类
    | 方法分类 | 实例方法名称 | 用法 |
    |:---|:---|:---|
    | 查询元素 | `index0f / 1astIndex0f(item, pos)`| 从pos找到item,则返回索引否则返回-1。 |
    |         | `includes(value)`| 如果数组有value,则返回true,否则返回false。 |
    |         | `find / filter(func)`| 通过函数过滤元素，返回true条件的符合find函数的第一个值或符合filter函数的全部值。 |
    |         | `findIndex`| 和find类似，但返回 索引 而不是 值。 |
    | 添加 / 删除元素 | `push(...items)`| 从结尾添加元素 |
    |         | `pop()`| 从结尾提取元素， |
    |         | `shift()`| 从开头提取元素 |
    |         | `unshift(...items)`| 从开头添加元素， |
    |         | `splice(pos,deleteCount,..items)`| 从index开始：删除deleteCount元素并在当前位置插入元素。 |
    |         | `slice(start,end)`| 它从所有元素的开始索引"start"复制到"end"(不包括"end")返回一个新的数组。 |
    |         | `concat(..items)`| 返回一个新数组：复制当前数组的所有成员并添加其中。若有成员是数组类型，那么就取其元素 |
    | 转换数组 | `map(func)`| 从每个元素调用func的结果创建一个新数组. |
    |         | `sort(func)`| 将数组倒序排列，然后返回. |
    |         | `reverse()`| 在原地颠倒数组，然后返回它. |
    |         | `split./join`| 一将字符串转换为数组并返回。 |
    |         | `reduce(func,initial)`| 通过为每个元素调用func计算数组上的单个值并在调用之间传递中间结果。 |
    | 迭代遍历数组 | `forEach(func)`| 为每个元素调用 func,，不返回任何东西。 |
    |         | `map(func)`         |   |
    |         | `every(func)`       |   |
    |         | `some(func)`        |   |
    |         | `filter(func)`      |   |
    |         | `reduce(func)`      |   |
    |         | `reduceRight(func)` |   |
    |         | `find(func)`        |   |
    |         | `findIndex(func)`   |   |
### arr.splice()
  - 功能：可实现数组项的删除、插入、替换
  - 语法：`arr.splice(start, deleteCount, item1, item2...)`
  - 参数：
    + start <Number 数值类型>：删除或插入或替换的起始索引
    + deleteCount <Number 数值类型>：删除或插入或替换的数量。若忽略，则从 start 开始后边都会被删除
    + item  <Any 任意类型>：插入的值
  - 返回值 <Array 数组类型>：由被删除的元素组成的一个数组，如果没有被删除则返回空数组
  - 注意：数组的 splice 与 slice 方法的区别：splice 会修改原始数组。slice 则不会。
  ```js
    let arr = [1, 2, 3, 4, 5]
    let result = arr.splice(1, 2) // 从数组下标1开始 删除2个元素
    console.log(arr, result) //arr:[1,4,5]   result:[2,3]
    result = arr.splice(1, 2, 2, 3)// 从数组下标1开始 替换2个元素为2，3
    console.log(arr, result) //arr:[1,2,3]   result:[4,5]
    result = arr.splice(3, 0, 4, 5)// 从数组下标3开始 增加2个元素4，5
    console.log(arr, result) //arr:[1,2,3,4,5]   result:[]
  ```

### arr.slice()
  - 功能：浅拷贝数组中的某段数据 (浅拷贝说明如果是引用类型数据则拷贝的是引用地址)
  - 语法：`arr.slice(start, end)`
  - 参数：
    + start <Number 数值类型>：起始位的数组索引（包含该位）
    + end <Number 数值类型>：结束位的数组索引（不包含该位）
  - 返回值 <Array 数组类型>：返回一个浅拷贝某段数据的新数组
  ```js
    let arr = [1,2,3,4,{ name:'xiaobai'}]
    let result = arr.slice(1,2) // 从数组下标1浅拷贝到数组下标2前
      console.log(arr,result) //arr:[1,2,3,4,{ name:'xiaobai'}]   result:[2]
    result = arr.slice()// 浅拷贝整个数组
      console.log(arr,result) //arr:[1,2,3,4,{ name:'xiaobai'}]   result:[1,2,3,4,{ name:'xiaobai'}]
    result = arr.slice(3)// 从数组下标3开始浅拷贝
      console.log(arr,result) //arr:[1,2,3,4,{ name:'xiaobai'}]   result:[4,{ name:'xiaobai'}]
    result[0] = 100
    result[1]. name = 'dabai'
      console.log(arr,result) //arr:[1,2,3,4,{ name:'dabai'}]   result:[100,{ name:'dabai'}]
  ```

### arr.copyWithin()
  - 功能：从数组的指定位置拷贝元素到数组的另一个指定位置中.
  - 语法：`arr.copyWithin( target[, start][, end])`
  - 参数：
    + target <Number 数值类型>：复制到指定目标索引位置。
    + start <Number 数值类型>：元素复制的起始位置。从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
    + end <Number 数值类型>：停止复制的索引位置 (默认为 array.length)。如果为负值，表示倒数。
    如果三个参数不是数值，会自动转为数值。**会连空位一起拷贝**
  - 返回值 <Array 数组类型>：返回拷贝后的数组


### arr.push() && arr.pop() 数组尾部操作
  1. push 功能：可向数组的末尾添加一个或多个元素，并返回新的长度。
    - 语法：`arr.push(elementN...)`
    - 参数
      + elementN<Any 任意类型>：添加的（0 到 多个）值
    - 返回值<Number 数值类型>：返回新的长度。
  2. pop 功能：从原始数组中删除最后一个元素。
    - 返回值<Any 任意类型>： 并返回被pop弹出的元素。
    - 注意：当数组的length = 0，使用pop() 返回 undefined
  ```js
    var arr=[1, 2, 3, 4];

  	var push_arr=arr.push("Tom", "Sun");
  	  console.log(arr); //[1, 2, 3, 4, "Tom", "Sun"];
  	  console.log(push_arr); // 6

  	var pop_arr=arr.pop();
  	  console.log(arr); //[1, 2, 3, 4, "Tom"];
  	  console.log(pop_arr); // Sun	
  ```

### arr.unshift() && arr.shift() 数组首部操作
  1. unshift 功能：可向数组的开头添加一个或更多元素，并返回新的长度。
    - 语法：`arr.unshift(elementN...)` 
    - elementN 参数<Any 任意类型>：添加的（0 到 多个）值
    - 返回值<Number 数值类型>：并返回新的长度。
  2. shift 功能：用于把数组的第一个元素从删除，并返回第一个元素的值。
    - 返回值<Any 任意类型>：并返回第一个元素的值。
  ```js
    var arr=[1, 2, 3, 4];
  	var shift_arr=arr.shift();
  	  console.log(arr); // [2,  3,  4]
  	  console.log(shift_arr); // 1
  	var unshift_arr=arr.unshift("Tom");
  	  console.log(arr); // ["Tom",  2,  3,  4]
  	  console.log(unshift_arr); // 4
  ```

### arr.concat()
  - 功能：合并一个或多个数组，返回新的数组，原数组不会被改变。数组元素若是引用类型，也为浅拷贝
  - 语法：`arr.concat(elementN)`
  - 参数：
    + elementN<Any 任意类型>: 添加的（0 到 多个）值
  - 返回值<Array 数组类型>：返回一个（浅拷贝的）新数组
  ```js
    let arr1 = [1, 2, 3]
    let arr2 = [4, 5, 6, { name:'xiaobai'}]
    let result = arr1.concat(arr2) // 连接两个数组
    console.log(arr1,result) //arr1:[1,2,3]   result:[1,2,3,4,5,6,{ name:'xiaobai'}]
    
    result = arr1.concat(arr2) 
    result[6]. name = 'dabai'
    console.log(arr2,result) //arr2: [4,5,6,{ name:'dabai'}] result:[1,2,3,4,5,6,{ name:'dabai'}]

    result = arr1.concat()
    console.log(arr1,result) //arr1:[1,2,3]   result:[1,2,3] 
  ```

### arr.toString()
- 功能：用于将数组内容转换为字符串
- 返回值<String 字符串类型>：一个表示指定的数组及其元素的字符串。
```js
  let arr1 = [1, 2, '3'];
  let arr2 = [1, '123',  {name: "xiaobai"];
  console.log(arr1.toString(), arr2.toString()) //arr1: "1,2,3",   arr2: "1,123,[object Object]"
  
  let nestedArray = [1,2, ["123", 123, {name: 'xiaobai'}]]
  console.log(nestedArray.toString())  // "1,2,123,123,[object Object]"
```

### arr.join()
  - 功能：用分隔符将数组中的每一项连接起来形成字符串
  - 语法：`arr.join( separator )`
  - 参数：
    + separator<String 字符串类型>：分隔符（默认为 ","逗号）
  - 返回值<String 字符串类型>：返回一个用**分隔符连接起来的字符串**
  ```js
    let arr = [1, 2, 3, 4]
    let result = arr.join() // 用默认逗号分隔符将数组中的每一项连接起来形成字符串
    console.log(arr, result) //arr:[1, 2, 3, 4]   result:"1, 2, 3, 4"
    
    result = arr.join("")// 将数组中的每一项连接起来形成字符串
    console.log(arr, result) //arr:[1, 2, 3, 4]   result:“1234”
    
    result = arr.join('xiaobai')// 用'xiaobai'将数组中的每一项连接起来形成字符串
    console.log(arr, result) //arr:[1, 2, 3, 4]   result:"1xiaobai2xiaobai3xiaobai4"
    
    arr = [1, 2, 3, undefined, 4, null, 5]
    result = arr.join() // 如果数组元素为undefined或null，都返回空
    console.log(arr, result) //arr:[1, 2, 3, undefined, 4, null, 5]  result:"1,2,3,,4,,5"
    
    result = arr.join("") // 如果数组元素为undefined或null，都返回空
    console.log(arr, result) //arr:[1, 2, 3, undefined, 4, null, 5]  result:"12345"
  ```

### arr.indexOf()
  - 功能：寻找指定元素的索引
  - 语法：`arr.indexOf(searchEl, fromIndex)`
  - 参数：
   + searchEl<Any 任意类型>: 查找的元素值
   + fromIndex<Number 数值类型>: 开始查找的索引值
  - 返回值<Number 数值类型>：在数组中的索引位置
  ```js
    let arr = [1,2,3]
    let index = arr.indexOf(2) // 查找元素’2‘的索引值  
    console.log(index) // index:1
    
    arr = [1,2,3,34,31,4]
    index = arr.indexOf(31,3)// 从索引值3开始寻找元素31
    console.log(index) // index:4
  ```

### 4.10、 arr.sort()
  - 功能：对数组进行排序并返回
  - 语法：`arr.sort(compareFunc(firstEl, secondEl))`
  - 参数：
    + compareFunc(firstEl, secondEl)<Function 函数类型>
      * firstEl<Any 任意类型>: 数组的第二项a[1]
      * secondEl<Any 任意类型>: 数组的第一项a[0]
    + 若 `compareFunc > 0`, 那么 firstEl 排在 secondEl **之后**
    + 若 `compareFunc = 0`, 那么 firstEl 和 secondEl 的**相对位置不变**
    + 若 `compareFunc < 0`, 那么 firstEl 排在 secondEl **之前**
  - 返回值<Array 数组类型>：排序后的数组，原地排序
  ```js
    let arr = [1, 2, 3]
    arr.sort((firstEl, secondEl)=>{
      return secondEl - firstEl
    }) // 实现数组从大到小排序
    console.log(arr) // arr:[3, 2, 1]
    
    arr = [1, 2, 3, 34, 31, 4]
    arr.sort()
    console.log(arr) // arr:[1, 2, 3, 31, 34, 4]
  ```

### 4.11、 arr.reverse()
  - 功能：反转数组，即第一项变成最后一项，最后一项变为第一项
  - 返回值<Array 数组类型>：经反转后的原数组
  ```js
    let arr = [1, 2, 3, 4]
    let reverseArr = arr.reverse() // 反转数组
    console.log(arr, reverseArr ) // arr:[4, 3, 2, 1]  reverseArr :[4, 3, 2, 1] 
  ```

### 4.12、 arr.includes()
  - ES6 功能：判断一个数组是否包含一个指定的值
  - 语法：`arr.includes(valueToFind[, fromIndex])`
  - 参数
    + valueToFind<Any 任意类型>：需要查找的元素值。
    + fromIndex<Number 数值类型>：从fromIndex 索引处开始查找 valueToFind。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 （即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。
  - 返回值<Boolean 布尔类型>: 若在数组中找到了（如果传入了 fromIndex ，表示在 fromIndex 指定的索引范围中找到了）则返回 true 。

### 4.13、 arr.flat()
  - ES6 功能：通过指定深度遍历各元素，并且将个元素组成新数组返回
  - 语法：`arr.flat(depth)`
  - 参数：
    + depth<Number 数值类型>：指定要提取嵌套数组的结构深度，默认值为 1
  - 返回值<Array 数组类型>：经指定深度遍历各元素后组成的**新数组**
  ```js
    let arr = [1, 2, 3, [4, 5, 6]]
    let flatArr= arr.flat() // 按照深度为 1 进行提取元素，并组成新数组
    console.log(arr, flatArr) // arr:[1, 2, 3, [4, 5, 6]]  flatArr:[1, 2, 3, 4, 5, 6]

    // 使用 Infinity，可展开任意深度的嵌套数组
    let arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
    arr.flat(Infinity) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  ```

### 4.14、 arr.fill()
  - ES6 功能：填充数组，**改变原数组**
  - 语法：`arr.fill(val, start, end)`
  - 参数：
    + val<Any 任意类型>：要填充的值
    + start<Number 数值类型>：要填充的起始位置
    + end<Number 数值类型>：要填充的中止位置
  - 返回值<Array 数组类型>：填充后的数组
  ```js
    let arr = [1, 2, 3, 4, 5]
    let fillArr= arr.fill(100, 2, 3) // 从数组下标2开始到数组下标3前，填充’100‘
    console.log(arr, fillArr) // arr:[1, 2, 100, 4, 5]  flatArr:[1, 2, 100, 4, 5]
    
    fillArr= arr.fill(100, 2) // 从数组下标2开始填充’100‘
    console.log(arr, fillArr) // arr:[1, 2, 100, 100, 100]  flatArr:[1, 2, 100, 100, 100]
    
    fillArr= arr.fill(100) // 从头开始填充’100‘
    console.log(arr, fillArr) // arr:[100, 100, 100, 100, 100]  flatArr:[100, 100, 100, 100, 100]
  ```

### 4.15、 arr.filter()
  - 功能：创建一个新数组，其包含满足所提供方法的元素
  - 语法：`arr.filter(callbackFn(item, index, array))`
  - 参数：
    + callbackFn<Functionr 函数类型>：用来测试数组的每个元素的函数。返回 `true` 表示该元素通过测试，保留该元素，`false` 则不保留。
    + item<Any 任意类型>: 当前遍历到的元素
    + index<Number 数值类型>: 当前遍历到的索引
    + array<Array 数组类型>: 数组本身
  - 返回值<Array 数组类型>：返回满足提供的方法的元素的新数组,
  ```js
    let arr = [1,2,3]
    let ary = arr.filter(item=>(){
      return item>1
    }) // 过滤大于1的元素
      console.log(arr,ary) //arr1:[1,2,3]   ary:[2,3]
    arr = [1,2,3,[3,4]]
    ary = arr.filter(item=>{
      return item>1
    }) // 过滤大于1的元素
      console.log(arr,ary) //arr: [1,2,3,[3,4]]  ary: [2,3]
  ```

### 4.16、 arr.every()
  - 功能：测试数组每一项是否满足所提供的函数
  - 语法：`arr.every(callbackFn(item, index, array))`
  - 参数：
    + item<Any 任意类型>: 当前遍历到的元素
    + index<Number 数值类型>: 当前遍历到的索引
    + array<Array 数组类型>: 数组本身
  - 返回值<Boolean 布尔类型>：**所有项都满足** 返回结果则为true, 反之为false
  ```js
    var arr = [1, 4, 6, 8, 10];
  	var result1 = arr.every((currentValue) => { return currentValue < 12 });
  	console.log(result1);  // true

  	var result2 = arr.every((currentValue) => { return currentValue > 1	});
  	console.log(result2);  // false
  ```

### 4.17、 arr.some()
  - 功能：测试数组是否至少满足一次所提供的函数
  - 语法：`arr.some(callbackFn(item, index, array))`
  - 参数：
    + callbackFn<Functionr 函数类型>:用来测试数组的每个元素的函数。
    + item<Any 任意类型>: 当前遍历到的元素
    + index<Number 数值类型>: 当前遍历到的索引
    + array<Array 数组类型>: 数组本身
  - 返回值<Boolean 布尔类型>：**至少满足一次** 返回结果则为true, 反之为false
  ```js
    let arr = [1,2,3]
    let flag = arr.some(item => { return item == 2 }) // 是否存在’2‘这个元素
    console.log(arr,flag) //arr:[1,2,3]   flag: true
  ```

### 4.18、 arr.map()
  - 功能：用提供的方法遍历一遍数组，形成新数组
  - 语法：`arr.map(callbackFn(item, index, array))`
  - 参数：
    + callbackFn<Functionr 函数类型>: 遍历每个元素的方法
    + item<Any 任意类型>: 当前遍历到的元素
    + index<Number 数值类型>: 当前遍历到的索引
    + array<Array 数组类型>: 数组本身
  - 返回值<Array 数组类型>：返回一个新数组
  ```js
    let arr = [1, 2, 3]
    let ary = arr.map(item=>{ return item * 2 }) // 给数组每位元素都乘以2
    console.log(arr, ary) //arr:[1, 2, 3]   ary:[2, 4, 6]

    let strArray = arr.map(String) // ["1", "2", "3"]
    let numArray = strArray.map(NUmber) // [1, 2, 3]
  ```

### 4.19、 arr.forEach()
  - 功能：使用函数遍历数组所有元素
  - 语法：`arr.forEach(callbackFn(item, index, array))`
  - 参数：
    + callbackFn<Functionr 函数类型>:遍历每个元素的方法, `return` 无效
    + item<Any 任意类型>: 当前遍历到的元素
    + index<Number 数值类型>: 当前遍历到的索引
    + array<Array 数组类型>: 数组本身
  - 返回值<undefined 类型>：无法返回值
  ```js
    let arr = [1, 2, 3, 4]
    arr.forEach((item, index)=>{ arr[index] += item}) // 给数组每一项 加1 操作
    console.log(arr) // arr:[2, 4, 6, 8]
    // 需要注意它与map的区别：map是返回 新数组，而forEach返回值是 undefined
  ```

### 4.20、 arr.reduce()
  - 功能：所有数组元素执行一次callbackFn函数,将其结果汇总成单个结果返回
  - 语法：`arr.reduce(callbackFn(accumulator, currentValue, index, array)[, initialValue])`
  - 参数：
    + accumulator/previons<Any 任意类型>: 累计值
    + currentValue<Any 任意类型>: 当前遍历到元素
    + index<Number 数值类型>: 当前遍历到的索引
    + array<Array 数组类型>: 数组本身
    + initialValue<Any 任意类型>: 
      1. 若有：赋值给 previons， currentValue 取数组索引 0 第一项。
      2. 若无，则 previons 为数组中第一个元素, currentValue 为数组中第二个元素
  - 返回值<Any 任意类型>：函数累计的结果（即：previons 的值）
  - 注意：reduce 从左到右，reduceRight 从右到左。
  ```js
    // eg1: 计算各元素重复出现次数
    let arr = [1, 2, 2, 3, 3, 3, 5, 4]
    let count = arr.reduce((accumulator,currentVal)=>{
      if(currentVal in accumulator){
          accumulator[currentVal]++
      }else{
          accumulator[currentVal] = 1
      }
      return accumulator
    },{}) 
    console.log(arr) // count:{1: 1, 2: 2, 3: 3, 4: 1, 5: 1}

    // eg2: 按照属性进行统计
    let people = [
        { name: 'Alice', age: 21 },
        { name: 'Max', age: 20 },
        { name: 'Jane', age: 20 }
      ]
    function groupBy(property,objArray){
      return objArray.reduce((accu,val)=>{
          if(val[property] in accu){
              accu[val[property]].push(val)
          }else{
            accu[val[property]] = Array.of(val)
          }
        return accu
      },{})
    }
    let groupByAge = groupBy('age',people) 
    // 输出如下：
    // { 
    //   20: [
    //     { name: 'Max', age: 20 }, 
    //     { name: 'Jane', age: 20 }
    //   ], 
    //   21: [{ name: 'Alice', age: 21 }] 
    // }

    // eg3: 实现数组去重
    let myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
    let myOrderedArray = myArray.reduce((acc,val)=>{
        if(!acc.includes(val)){
          acc.push(val)
        }
        return acc
    },[])
    console.log(myOrderedArray) // ["a", "b", "c", "e", "d"]
  ```

### 4.21、 arr.findIndex()
  - ES6 功能：数组中**第一个满足**提供的测试函数的元素索引
  - 语法：`arr.findIndex(callbackFn(item, index, array))`
  - 参数：
    + item<Any 任意类型>: 当前遍历到的元素
    + index<Any 任意类型>: 当前遍历到的索引
    + array<Array 数组类型>: 数组本身
  - 返回值<Number 数值类型>：数组中通过提供测试函数的第一个元素的索引。否则，返回-1
  ```js
    let arr = [1, 2, 3, 4]
    let element = arr.find( item => item > 2 ) // 查找第一个大于2的元素
    console.log(element) // element: 2
  ```

### 4.22、 arr.find()
  - ES6 功能：找到**第一个符合**所提供的函数的条件，并返回该元素
  - 语法：`arr.find(callbackFn(item, index, array))`
  - 参数：
     + item<Any 任意类型>: 当前遍历到的元素
     + index<Any 任意类型>: 当前遍历到的索引
     + array<Array 数组类型>: 数组本身
  - 返回值<Any类型>：符合条件的元素
  ```js
    let arr = [1,2,3,4]
    let element = arr.find( item => item > 2 ) // 查找第一个大于2的元素
    console.log(element) // element: 3
    // 需要注意它与filter的区别：find是找到 第一个 满足函数的元素，而filter是 所有 满足函数的元素
  ```

## 参考资料
  - [MDN: Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)