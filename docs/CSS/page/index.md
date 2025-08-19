---
sidebar: auto
title: page 打印样式
date: 2023-10-18
tags:
 - page 
 - CSS @page
 - 打印样式
categories: 
 - CSS
---

## page
  - page 属性用于指定命名页面，
    + 由 `@page` 规则定义的特定类型的页面。
  - 如果有多个选择器连续使用命名页面，则需要使用 `break-after` 强制分页。
  - 语法：`page：auto | <custom-ident>`
  - 参数：
    + `auto`：使用最近祖先的值与非自动值一起使用（若祖先没有命名页面值，则该值为空字符串）。默认值
    + `custom-ident`：在` @page` 规则中自定义的名称（区分大小写）。
  - 全局参数值
    + `inherit`：从父元素继承该属性的设置。
    + `initial`：采用该属性初始默认值
    + `revert`
    + `revert-layer`
    + `unset`
  - 案例：
    ```css
      /* set a named page */
      page: exampleName;
      page: auto; 
      page: inherit;
    ```

### brreak-* 取代 page-brreak-*
  - `page-break-before`、`page-break-inside`、`page-break-after` 三属性将分别被更通用的`break-before`、`break-inside`、`break-after` 取代。
  - 通用的 `break-*` 属性也处理列和区域中断，
  - `page-break-before`、`page-break-inside`、`page-break-after` 三属性的共有特性
    + 此属性适用于生成一个块元素盒子。不适用于不会生成一个空的盒子。
    + 尽管可以用 always 强制放上分页符，但是无法保证避免分页符的插入，只能尽可能避免插入分页。
    + 应用于：`position` 值为 `relative` 或 `static` 的非浮动块级元素。
    + 只在打印预览或实际打印时才有效。在常规浏览模式下，可能无法看到分页效果
  - 案例
    ```css
      /* 
        设置 A4 值纵向大小
        单位 pt 点（磅） 
        单位 in 英寸
      */
      @page {
          /* size 定义纸张大小 A4 纸（210mm * 297mm） margin 设置页边距 */
          size: 210mm 297mm;
          margin: 1.54cm 1.17cm 1.54cm 1.17cm;
          mso-header-margin: 1.5cm;
          mso-footer-margin: 1.75cm;
          mso-paper-source: 0;
      }
      
      /* 
        纸张横向，并且内容独占一页 
      */
      .last-division {
        page-break-after: always;
        margin-bottom: 0;
      }
      @page rotated {
        /* 重新设置纸张大小，使其横向 */
        /* size: landscape; */
        size: 297mm 210mm;
      }       
      .last-page {
        page: rotated;
        page-break-inside: avoid;
      }
    ```
### page-break-before
  - 设置当前元素之前的分页符（`page-breaking` 行为）
  - 参数：
    + `auto`（默认值）：若必要，则在元素前插入分页符。
    + `always`：始终在元素前强制分页。
    + `avoid`：避免在元素前插入分页符。
    + `left`：在元素之前足够的分页符，直到一张空白的**左页**为止。
    + `right`：在元素之前足够的分页符，直到一张空白的**右页**为止。
    + `inherit`：从父元素继承该属性的设置。
  - 案例
    ```css
      /* 避免在类注释的 div 元素之前出现分页符 */
      div.note {
        page-break-before: avoid;
      }      
    ```
  - 注释：尽可能避免在表格、浮动元素、带有边框的块元素中少地使用分页属性。

### page-break-inside
  - 设置当前元素内部的分页符（`page-breaking` 行为）。
  - 参数
    + `auto`（默认值）：若必要，则在元素内部插入分页符。
    + `avoid`：避免在元素内部插入分页符。
    + `inherit`：从父元素继承该属性的设置。

### page-break-after 
  - 设置当前元素之后的分页符（`page-breaking` 行为）
  - 参数：
    + `auto`（默认值）：若必要，则在元素后插入分页符。
    + `always`：始终在元素后强制分页。
    + `avoid`：避免在元素后插入分页符。
    + `left`：在元素之后足够的分页符，直到一张空白的**左页**为止。
    + `right`：在元素之后足够的分页符，直到一张空白的**右页**为止。
    + `inherit`：从父元素继承该属性的设置。
  - 案例
    ```css
      /* 移动到脚注后的新页面*/
      div.footnotes {
        page-break-after: always;
      }
    ```
  - 注释：尽可能避免在表格、浮动元素、带有边框的块元素中少地使用分页属性。


## 参考资料
  - [MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/page)
  - [page-break-before\page-break-inside\page-break-after用法](https://blog.csdn.net/ZMJ_QQ/article/details/125724371)
