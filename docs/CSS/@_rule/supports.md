---
sidebar: auto
title: CSS @supports 特性检测
date: 2023-10-18
tags:
 - CSS @supports
 - 特性检测
categories: 
 - CSS @ 规则
---

## @supports
  - 检测 CSS 语法的新特性（兼容性），并在内部 CSS 区块中写入，通过特性检测希望实现的 CSS 语句
  - 语法：
    ```css
      @supports <supports_condition> {
          /* specific rules */
      }
    ```
  - 若浏览器对 `@supports` 判断括号中的表达式成立，则会去渲染括号内的 CSS 表达式
    + 如果浏览器支持 `@supports` 语法和 `position:sticky` 语法，则 div 元素被设置为 `position:sticky`
    ```css
      div {
        position: fixed;
      }

      @supports (position:sticky) {
        div {
          position:sticky;
        }
      }
    ```
## @supports 条件判断操作符
  - `@supports not`、`@supports and`、`@supports or`三者可互相混合使用 
### not 非
  - `not` 操作符可以放在任何表达式的前面来产生一个新的表达式，新的表达式为原表达式的值的否定
    ```css
      .container {
        translate: 50% 10%;
        rotate: 80deg;
        scale: 1.5;
      }     

      /* 如果浏览器不支持 scale: 1 语法，则 supports 内的语法生效 */
      @supports not (scale: 1) {
        .container {
          transform: translate(50%, 10%) rotate(80deg) scale(1.5);
        }
      }
    ```
### and 与
  - `and` 操作符连接任意多个原始的表达式。
    + 只有两个原始表达式的值都为真，生成的表达式才为真，反之为假。
    + 多重判断，类似 javascript 的 && 运算符符。
    ```css
      p {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* 如果浏览器同时支持三个表达式，则多行省略样式生效 */
      @supports (display:-webkit-box) and (-webkit-line-clamp:2) and (-webkit-box-orient:vertical) {
        /* 实现多行省略效果 */
        p {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    ```
### or 或
  - `or` 操作符连接任意多个原始的表达式
    + 只要有一个为真，则生成表达式表达式为真。
    + 任一判断，类似 javascript 的 `||` 运算符符。
    ```css
      /* 如果浏览器只需支持两个表达式其一，则添加渐变样式生效 */
      @supports (background:-webkit-linear-gradient(0deg, yellow, red)) or (background:linear-gradient(90deg, yellow, red)){
        /* 添加渐变 */
        div {
          background:-webkit-linear-gradient(0deg, yellow, red);
          background:linear-gradient(90deg, yellow, red)
        }
      }
    ```

## 参考资料
  - [MDN @supports](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports)

  - [CSS at-rules(@) 规则扫盲](https://zhuanlan.zhihu.com/p/579955243)