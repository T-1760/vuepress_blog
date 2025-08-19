---
sidebar: auto
title: CSS 层叠样式表
date: 2023-10-18
tags:
 - CSS 层叠样式表
categories: 
 - CSS
---

## 前言
  - 层叠样式表（Cascading Style Sheets，缩写为 CSS）是一种样式表语言，用来描述 HTML 或 XML（包括如 SVG、MathML 或 XHTML 之类的 XML 分支语言）文档的呈现方式。
  - CSS 用于渲染在屏幕、纸质、音频等其他媒体上的元素。
  - CSS 是开放 Web 的核心语言之一，并根据 W3C 规范在 Web 浏览器中进行了标准化。
    + 以前 CSS 规范的各个部分的开发是同步进行的，CSS1、CSS2.1 甚至 CSS3。但是以后将不会由新版本，因为以后一切都是没有版本号的 CSS

## CSS 样式 
  - 选择器: 选择器以 HTML 为目标，对内容应用样式。
  
### CSS 组成
  - 外部样式表：在一个单独的扩展名为 `.css` 的文件中包含 CSS.
    + 通过 `<link>` 元素的 `href` 属性引用样式文件到 HTML 网页中
  - 内部样式表：一个内部样式表驻留在 HTML 文档内部。
    + 要创建一个内部样式表，把 CSS 放置在包含在 `<head>` 元素中 `<style>` 元素的内容
  - 内联样式：只影响单个 HTML 元素的 CSS 声明，包含在元素的 `style` 属性中。

### CSS 语法糖
  - [MDN CSS 的简写属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Shorthand_properties)

## CSS 上下文
### 堆叠上下文
  - [MDN 堆叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)
### 区块格式化上下文
  - [MDN 区块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

## CSS 布局
### position 定位
### Flex 弹性布局
### Gird 网格布局

## 参考资料
  - [MDN CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)