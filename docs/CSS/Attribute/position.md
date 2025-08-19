---
sidebar: auto
title: CSS postion 定位属性
date: 2023-10-18
tags:
 - postion 定位属性
 - postion
categories: 
 - CSS 属性
---

## position
  - CSS position 属性用于指定一个元素在文档中的定位方式。
    + `top`、`right`、`bottom`、`left` 属性，则决定了该元素的最终位置。
  - 多数情况下 `height` 和 `width` 属性被设定为 `auto` 的绝对定位元素，按其内容大小调整尺寸。
    + 绝对定位的元素可通过指定 `top` 和 `bottom` 保留 `height` 未指定（即：`auto`）来填充可用的垂直空间。
    + 绝对定位的元素可通过指定 `left` 和 `right`并将 `width` 指定为（即：`auto`）来填充可用的水平空间。
  - 若 `top` 和 `bottom` 都被指定（严格讲指定的值不能为 `auto` ），`top` 优先。
  - 若同时指定 `left` 和 `right` ，
    + 当 `direction: ltr` （从左往右水平书写：中文、英语）时， `left` 优先，
    + 当 `direction: rtl`（从右向左水平书写：阿拉伯语、波斯语）时，`right` 优先。

### 定位类型
  - 定位元素（positioned element）
    + 是计算后位置属性为 `relative`、`absolute`、`fixed`、`sticky` 的一个元素（即：除 `static` 以外的任何东西）。
  - 相对定位元素（relatively positioned element）
    + 是计算后位置属性为 `relative` 的元素。
  - 绝对定位元素（absolutely positioned element）
    + 是计算后位置属性为 `absolute`、`fixed` 的元素。
  - 粘性定位元素（stickily positioned element）
    + 是计算后位置属性为 `sticky` 的元素。

## 语法
  - 形式语法：`position = static | relative | absolute | sticky  | fixed`   
### static
  - `static`：指定元素使用正常的布局行为（即：元素在文档常规流中当前的布局位置）
    + 此时 `top`、`right`、`bottom`、`left` 和 `z-index` 属性无效。
### relative
  - `relative`：指定元素先放置在未添加定位时的位置，再在不改变页面布局的前提下，调整元素位置。
    + 因此会在此元素未添加定位时，所在位置留下空白。
  - `relative` 对 `table-*-group`、`table-row`、`table-column`、`table-cell`、`table-caption` 元素无效。
### absolute
  - `absolute`：指定元素会被移出正常文档流，并不为元素预留空间，
    + `absolute` 指定的元素相对于最近的**非 `static`**定位祖先元素的偏移，来确定元素位置。
    + `absolute` 绝对定位的元素可设置 `margin` 外边距，且不会与其他边距合并。
### fixed
  - `fixed`: 指定元素会被移出正常文档流，并不为元素预留空间，而通过指定元素**相对于屏幕视**口（viewport）的位置来指定元素位置。
    + 元素的位置在屏幕滚动时不会改变。打印时，元素会出现在每页的固定位置。
    + `fixed` 属性会创建新的层叠上下文。
    + 当祖先元素的 `transform`、`perspective`、`filter` 或 `backdrop-filter` 属性非 `none` 时，容器由相对于视口，变为相对于该祖先。
### sticky
  - sticky：指定元素根据正常文档流进行定位，然后相对它最近滚动祖先（nearest scrolling ancestor）和 最近块级祖先（nearest block-level ancestor），
    + 包括 `table-related` 元素，基于 `top`、`right`、`bottom`、`left` 的值进行偏移。偏移值不会影响任何其他元素的位置。
    + sticky 属性会创建新的层叠上下文。
    + 注意，一个 sticky 元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的 `overflow` 是 `hidden`、`scroll`、`auto` 、`overlay` 时），即便该祖先不是最近的真实可滚动祖先。这有效地抑制了任何“sticky”行为

## 实战
### sticky
  - [粘性定位元素position:sticky](https://blog.csdn.net/MFWSCQ/article/details/104797424)
  - [position:sticky 不生效](https://blog.csdn.net/qq_38886284/article/details/134334577)
  - [好用不难的粘性布局 position:sticky](https://blog.csdn.net/weixin_38080573/article/details/102955476)

## 参考资料
  - [MDN CSS position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
