---
sidebar: auto
title: CSS @page 打印页规则
date: 2023-10-18
tags:
 - CSS @page
 - 打印页规则
categories: 
 - CSS @ 规则
---


## @page
  - `@page` 规则：用于在打印文档时修改某些 CSS 属性
  - 语法：
    ```css
      @page {
        margin: 1cm;
      }

      @page :first {
        margin: 2cm;
      }
    ```
  - `@page` 规则中目前不能使用：`vh`、`vm`、`vmin`、 `vmax`
  - `@page` 规则不能修改所有的 CSS 属性
    + 只能修改文档的 `margin`、`orphans`、`widows` 和分页符。对其他属性的修改都无效
    + 页面框的 `margin` 外边缘将与目标对齐。 `margin` 百分比值与目标尺寸相关，
    + 
    ```css
      @page {
        size: auto;
        /* 若目标纸张尺寸为 21.0 cm × 29.7 cm（即 A4），则 margin 边距为 2.10 cm 和 2.97 cm */
        margin: 10%; 
      }
    ```

### 三种引入打印样式的方式
  - 在 CSS 中使用 `@media print`
    ```css
      @media print {
          body {
              background-color: white;
          }
          img {
              visibility: hidden;
          }
          a::after {
              content: "(" attr(href) ")"; /* 所有链接后显示链接地址 */
          }
      }
    ```
  - 在 CSS 中使用 `@import`
    ```css
      @import url("my-print-style.css") print;
    ```
  - 在 HTML 中使用标签
    ```html
      <link rel="stylesheet" media="print" href="my-print-style.css">    
    ```

## @page 描述符
### @page-orientation 
  - 指定文档在页面上的方向，允许它进行正常的布局和格式化、也可以将其向左或向右旋转。
  - 预设值
    + `upright` 回正（默认值）：以垂直位置显示打印内容 
    + `rotate-left` 逆时针：显示逆时针旋转的打印内容
    + `rotate-right` 顺时针：显示顺时针旋转的打印内容
    ```css
      @page {
        @page-orientation: upright;
      }

      @page {
        @page-orientation: rotate-left;
      }

      @page {
        @page-orientation: rotate-right;
      }
    ```
### size （绝对长度单位）
  - 指定页面框包含块的目标大小和方向。通常一个页面框渲染到一页纸上时，它也会指定目标页的大小。
  - 预设值：
    + `auto` 自动（默认值）：页面框将设置为目标工作表的大小和方向。
    + `portrait`纵向：覆盖目标的方向。页面框的大小与目标相同，短边是水平的。
    + `landscape` 横向：覆盖目标的方向。页面框的大小与目标相同，且较长的边是水平的。
    + `<length> values` 长度值：创建绝对页面盒子。
      * 指定一个长度值，则会同时设置页面框的宽高。
      + 指定两个长度值: 表示页面的宽度，页面的高度
    + `Keyword` 关键词
      * `A4`、`A4`、`A5`、`B4`、`B5`、`JIS-B4`、`JIS-B5`、`letter`、`legal`、`ledger`、  
    ```css
      @page{
        size: auto;
        size: portrait;
        size: landscape;

        /* <length> values */
        size: 6in;
        size: 4in 6in;

        size: A4;
        size: B5;
        size: JIS-B4;
        size: letter;

        /* 混合尺寸和方向 */
        size: A4 portrait; 
      }
    ```
  - 提示：当 `size` 属性设置纵横方向时，则浏览器的打印面板的【方向】选项消失。
## @page 伪类
### `:blank` 为类
  - 选择用户输入为空的输入框
### `:first` 为类
  - 表示打印文档的第一页
    + 仅应用于更改文档的边距（绝对长度单位）、`orphans`、`widows` 和分页符
    ```css
      /* 打印时选择第一页 */
      @page :first {
        margin-left: 50%;
        margin-top: 50%;
      }
    ```
### `:left` 为类
  - 配置第一页从右至左的书写方向 
    + 仅应用予 `margin`、`padding`、`border` 和 `background` 等打印时需要的属性
    + 使用的属性只对打印时生效，显示时不会生效
    ```css
      /* 设置打印时的左侧文档样式 */
      @page :left {
        margin: 2in 3in;
      }
    ```
### `:right` 为类
  - 配置第一页从左至右的书写方向  
    + 仅应用予 `margin`、`padding`、`border` 和 `background` 等打印时需要的属性
    + 使用的属性只对打印时生效，显示时不会生效
    ```css
      /* 当打印时会选择所有文档右页 */
      @page :right {
        margin: 2in 3in;
      }
    ```


## 参考资料
  - [MDN @page](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@page)
  - [css--打印](https://blog.csdn.net/gao531162436/article/details/81450916)