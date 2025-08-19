---
sidebar: auto
title: HTML 元素内容分类
date: 2023-10-18
tags:
 - HTML 元素分类
 - HTML Element
categories: 
 - HTML
---

## 前言
  - 元素内容模型（content model）：每个元素的内容都必须遵循自身元素定义包含哪一类内容的规则
  - HTML 元素（通俗）可分为两大类：
    + 行级（内联）内容元素（inline-level content）：在 CSS 中，参与行内布局的内容。
    + 块级内容元素（block-level content）：在 CSS 中，参与块级布局的内容被称为
    + 提示：HTML 元素历来被归类为“块级”元素或“行级”元素。作为一种呈现的特性，现在这将由 CSS 来提供。
  - 行级内容
    + 默认情况下，大多数文本、替换元素以及生成的内容都是行级的。
    + 在行内布局中，行级盒子相互垂直或者水平对齐，具体取决于（文本的基线进行对齐）书写模式。这可以使用 CSS 进行更改。
  - 块级内容
    + 在块级布局中，块级盒子总是从包含块的顶部开始，一个接着一个地（从新的行/列上）垂直放置。每个块级盒子的左外边缘触及包含块的左边缘
    + 提示：若包含块的 `writing-mode` 被设置为默认值之外的值，上述的块布局行为将发生改变。
### 行级内容元素和块级内容元素的区别
  - 行级内容元素（CSS `display:inline`）
    + 不可设置宽高（width/height）、上下内、外边距(top/bottom-padding/margin)。（**左右内、外边距设置有效**）
    + 其宽度和高度由其内容自动填充。
    + 其他行级元素共处一行
  - 块级内容元素（CSS `display:block`）
    + 可以设置宽高（width/height）、内、外边距（padding/margin）
    + 独占一行（即前后均有换行）；
    + 如果不设置宽度和高度，则**width 宽度默认为父级元素的宽度。height 高度则根据内容大小自动填充。**
  - 两者结合元素：行内块元素（CSS `display:inline-block`）
    + 可以设置宽高、内外边距；
    + 可以与其他行内元素、内联元素共处一行；
    + 常见元素：`<input>`、`<img>`

## 主内容类（Main content)
  - 描述了很多元素共享的内容规范
### 元数据内容（Metadata content）
  - 元数据内容：可以修改文档其余部分的呈现或行为，建立与其他文档的链接，或者传达其他外带信息
  - 属于元数据内容元素：
    + `<base>`
    + `<link>`
    + `<meta>`
    + `<noscript>`
    + `<script>`
    + `<style>`
    + `<title>`
### 流式内容（Flow content）
  - 流式内容：包含大多 body 元素之内的元素，具体包括：标题元素、分段/章节元素、措辞元素、嵌入元素、互动元素、表单相关元素和文本节点（只由空白字符组成的节点除外）
  - ![流式内容元素交织图](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Content_categories/content_categories_venn.png)
  - 属于流水内容元素：
    + `<a>`
    + `<abbr>`
    + `<address>`
    + `<article>`
    + `<aside>`
    + `<audio>`
    + `<b>`
    + `<bdo>`
    + `<bdi>`
    + `<blockquote>`
    + `<br>`
    + `<button>`
    + `<canvas>`
    + `<cite>`
    + `<code>`
    + `<data>`
    + `<datalist>`
    + `<del>`
    + `<details>`
    + `<dfn>`
    + `<div>`
    + `<dl>`
    + `<em>`
    + `<embed>`
    + `<fieldset>`
    + `<figure>`
    + `<footer>`
    + `<form>`
    + `<h1>`
    + `<h2>`
    + `<h3>`
    + `<h4>`
    + `<h5>`
    + `<h6>`
    + `<header>`
    + `<hgroup>`
    + `<hr>`
    + `<i>`
    + `<iframe>`
    + `<img>`
    + `<input>`
    + `<ins>`
    + `<kbd>`
    + `<label>`
    + `<main>`
    + `<map>`
    + `<mark>`
    + `<math>`
    + `<menu>`
    + `<meter>`
    + `<nav>`
    + `<noscript>`
    + `<object>`
    + `<ol>`
    + `<output>`
    + `<p>`
    + `<picture>`
    + `<pre>`
    + `<progress>`
    + `<q>`
    + `<ruby>`
    + `<s>`
    + `<samp>`
    + `<script>`
    + `<section>`
    + `<select>`
    + `<small>`
    + `<span>`
    + `<strong>`
    + `<sub>`
    + `<sup>`
    + `<svg>`
    + `<table>`
    + `<template>`
    + `<textarea>`
    + `<time>`
    + `<u>`
    + `<ul>`
    + `<var>`
    + `<video>`
    + `<wbr>`
  - 仅限于某种特殊情形，才属于流水元素:
    + `<area>`：仅限于它作为 `<map>` 的子节点的情形
    + `<link>`：仅限于 `itemprop` 属性存在的情形
    + `<meta>`：仅限于 `itemprop` 属性存在的情形

#### 标题内容（Heading content）
  - 标题内容：定义了分节的标题，而这个分节可能由一个明确的分段内容元素直接标记或者由标题本身隐式地定义。
  - 提示：尽管`<header>`可能包含一些标题内容，但并不是标题内容本身。
  - 属于标题内容元素：
    + `<h1>`
    + `<h2>`
    + `<h3>`
    + `<h4>`
    + `<h5>`
    + `<h6>`
#### 分段/章节内容（Sectioning content）
  - 分段/章节内容：属于分段内容模型的元素， 在当前的大纲中创建一个分段
  - 此分段定义 `<header>` 元素、`<footer>` 元素和 标题元素（Heading content）的范围。
  - 属于分段/章节内容元素:  
    + `<article>`
    + `<aside>`
    + `<nav> `
    + `<section>`
#### 短语内容（Phrasing content）
  - 短语内容：定义了文本和它包含的标记。一些短语内容就构成了段落。
  - 属于短语内容元素：
    + `<abbr>`
    + `<audio>`
    + `<b>`
    + `<bdo>`
    + `<br>`
    + `<button>`
    + `<canvas>`
    + `<cite>`
    + `<code>`
    + `<datalist>`
    + `<dfn>`
    + `<em>`
    + `<embed>`
    + `<i>`
    + `<iframe>`
    + `<img>`
    + `<input>`
    + `<kbd>`
    + `<label>`
    + `<mark>`
    + `<math>`
    + `<meter>`
    + `<noscript>`
    + `<object>`
    + `<output>`
    + `<progress>`
    + `<q>`
    + `<ruby>`
    + `<samp>`
    + `<script>`
    + `<select>`
    + `<small>`
    + `<span>`
    + `<strong>`
    + `<sub>`
    + `<sup>`
    + `<svg>`
    + `<textarea>`
    + `<time>`
    + `<var>`
    + `<video>`
    + `<wbr> `
    + 纯文本（完全为空字符内容除外）。
  - 仅限于某种特殊情形，才属于短语内容元素:
    + `<a>`：当它仅包含短语内容时
    + `<area>`：当它为 `<map>` 元素的子元素时
    + `<del>`：当它仅包含短语内容时
    + `<ins>`：当它仅包含短语内容时
    + `<link>`：仅限于 `itemprop` 属性存在的情形
    + `<map>`：当它仅包含短语内容时
    + `<meta>`：仅限于 `itemprop` 属性存在的情形
#### 嵌入内容（Embedded content）
  - 嵌入内容：将来自另一种标记语言或命名空间的内容元素插入到文档中
  - 属于嵌入内容元素：
    + `<audio>`
    + `<canvas>`
    + `<embed>`
    + `<iframe>`
    + `<img>`
    + `<math>`
    + `<object>`
    + `<picture>`
    + `<svg> `
    + `<video>`
#### 交互式内容（Interactive content）
  - 交互式内容：包含为用户交互而特别设计的元素
  - 属于交互式内容元素
    + `<a>`
    + `<button>`
    + `<details>`
    + `<embed>`
    + `<iframe>`
    + `<label>`
    + `<select>`
    + `<textarea> `
  - 仅限于某种特殊情形，才属于交互式内容元素:
    + `<audio>`：若 `controls` 属性存在
    + `<img>`：若 `usemap` 属性存在
    + `<input>`：若 `type` 属性不为 `hidden` 隐藏状态
    + `<object>`：若 `usemap` 属性存在
    + `<video>`：若 `controls` 属性存在

#### 表单相关内容（Form-associated content）
  - 表单相关内容：括有表单所有者的元素（即：`<form>` 的元素或在 `form` 属性中指定其 `id` 的元素）
  - 属于表单相关内容元素：
    + `<button>`
    + `<fieldset>`
    + `<input>`
    + `<label>`
    + `<meter>`
    + `<object>`
    + `<output>`
    + `<progress>`
    + `<select>`
    + `<textarea>`
  - 属于表单相关（listed）可列举的元素
    + `<button>`
    + `<fieldset>`
    + `<input>`
    + `<object>`
    + `<output>`
    + `<select>`
    + `<textarea>`
  - 属于表单相关（labelable）可标记的元素: 和 `<label>` 相关联
    + `<button>`
    + `<input>`
    + `<meter>`
    + `<output>`
    + `<progress>`
    + `<select> `
    + `<textarea>`
  - 属于表单相关（submittable）可提交的元素: 包括当表单提交时，用来组成表单数据的元素
    + `<button>`
    + `<input>`
    + `<object>`
    + `<select>`
    + `<textarea>`
  - 属于表单相关（resettable）可重置的元素：当表单重置时会被重置的元素
    + `<input>`
    + `<output>`
    + `<select>`
    + `<textarea>`

## 二级分离
### 支持脚本的元素（Script-supporting elements）
  - 支持脚本元素：用于支持（包含指定的脚本代码，或者指定将被脚本使用的数据）脚本，不会直接渲染输出在页面文档中。
  - 属于支持脚本元素：
    + `<script>`
    + `<template>`

## 空元素
  - 空（单表签）元素：不包含任何内容的元素。
  - HTML 空元素
    + `<img>`：图片
    + `<input>`：输入框
    + `<meta>`：文档元数据
    + `<link>`：引入文档外部资源
    + `<source>`：常用于 `<video>`元素内容中使用不同格式的文件来兼容不同的浏览器。
    + `<track>`：常用于 `<audio>` 、 `<video>` 元素内容中的 `<source>` 后增添加字幕用的
    + `<br>`：换行
    + `<hr>`：水平线

## 参考资料
  - [MDN 内容分类](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Content_categories#Palpable_content)
  - [MDN之Web指南【内容分类】](https://blog.csdn.net/WuLex/article/details/97141040)
