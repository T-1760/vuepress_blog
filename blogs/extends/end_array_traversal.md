---
sidebar: auto
title: 跳出数组循环 或 终止数组遍历方法
date: 2023-10-18
tags:
 - JavaScript 数组
 - 数组终止遍历
categories: 
 - 扩展
 - 数组
---

## 跳出数组循环 或 终止数组遍历方法
  |方法 | `break `| `continue `| `return` | `return true` | `return false` |
  |:--|:--|:--|:--|:--|:--|:--|:--|
  |`for`             | 跳出循环 |	跳出本次循环 | 不合法 |	不合法 | 不合法 |
  |`for...in`	       | 跳出循环 | 跳出本次循环 | 不合法 | 不合法 | 不合法 |
  |`arr.forEach()`   | 不合法   | 不合法 | 跳出本次循环	| 跳出本次循环 | 跳出本次循环	|
  |`arr.map()`       | 不合法   |	不合法 | 跳出本次循环	| 跳出本次循环 | 跳出本次循环	|
  |`arr.some()`	     | 不合法   | 不合法 | 跳出本次循环	| 跳出循环     | 跳出本次循环 |
  |`arr.every()`     | 不合法   |	不合法 | 跳出循环     | 跳出本次循环 | 跳出循环 |
  |`arr.find()`	     | 不合法   |	不合法 | 跳出本次循环 | 跳出循环     | 跳出本次循环 |
  |`arr.findIndex()` | 不合法   |	不合法 | 跳出本次循环	| 跳出循环     | 跳出本次循环 |
  - 对于arr数组的实例遍历方法中跳出循环：
    + 使用 `return;`或`return true;` 代替 `continue` 语句；
    + 使用 `return false;` 代替 `break`语句；
  -  终止遍历数组方法
    1. `arr.every()`: return false 跳出整个循环; return true跳出本次循环，继续循环
    2. `arr.some()`: return true 跳出整个循环; return false跳出本次循环，继续循环
    3. `for遍历` break 或 return false 跳出（当前for）整个循环，continue 用于跳出本次循环
      + 若是**多层嵌套循环，要跳出所有循环，则需给最外层循环命名**；
  ```js
    f: for(var i = 0; i < 3; i++) {
      for(var j = 0; j < 3; j++) {
          if (i === 0 && j === 0) {
              break f;      
          }  
          console.log(i, j);
      }     
    }
  ```
  - forEach() 和 map()的 return false 均只能跳出本次循环，无法终止整个循环遍历
    + > forEach 和 map 正常不可以终端遍历过程。**可以抛除一个异常** 实现终止循环
    ```js
      var arr = [1,2,3,4,5,6,7];
      try {
        arr.forEach((item,index) => {
          console.log(item);
          if(item == 3){
            throw new Error('break');
          }
        });
      } catch (e) {
        // console.log(e);
      } finally {
      
      }
    ``` 

## 参考资料
  - [JavaScript中Array数组方法总结](https://www.cnblogs.com/jiaoshou/p/15745891.html)