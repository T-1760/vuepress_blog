---
sidebar: auto
title: HTML 超文本标记语言
date: 2023-10-18
tags:
 - HTML 超文本标记语言
categories: 
 - HTML
---

## 前言
  - HTML（HyperText Markup Language）超文本标记语言, 它不是一门编程语言，而是一种用于定义内容结构的标记语言。
  - HTML 是构成 Web 的基础。它定义了网页内容的结构含义。此外，其他技术则通常用来描述网页的表现展示效果（如: CSS）或与行为功能（如: JavaScript）与 HTML 搭配呈现最终的 Web 应用。

## HTML 标记语言
  - HTML 由一系列的元素组成
  - HTML 元素（Element）通过 “标签”（tag）将文本从文档中引出，标签由`<` 和 `>` 中包裹的元素名（元素名不区分大小写，但推荐全部小写）组成。
  - HTML 元素：由 `<开始标签>` 、`内容（也可是元素）`、 `</结束标签，`三部分相结合，便是一个完整的元素。
  - HTML 元素（通俗）类别：块级内容元素和行级（内联）内容元素
    + 提示：HTML 元素历来被归类为“块级”元素或“行级”元素。作为一种呈现的特性，现在这将由 CSS 来提供。
  - 空（单表签）元素：不包含任何内容的元素。
    + 例：`<img>`
  - 嵌套元素：将一个元素置于其他元素之中
    + 元素嵌套必须正确地开始标签和结束标签包裹，不可出现元素始末标签交叉
  - HTML 的注释（comment）是用`<!--` 和 `-->` 包裹。
  
## 基础 HTML 文档详解
  - Web 基础的 HTML 文档结构
    ```html
      <!doctype html>
      <html lang="en-US">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width" />
          <title>My test page</title>
        </head>
        <body>
          <!-- 注释 -->
          <img src="images/firefox-icon.png" alt="My test image" />
        </body>
      </html>    
    ```
  - `<!DOCTYPE html>` 
    + 文档类型：这是 HTML 必不可少的开头。仅用于保证文档正常读取（起初用来关联 HTML 编写规范，以供自动查错等功能所用）
  - `<html>` 元素
    + 根元素：该元素包含整个页面的所有内容。
    + 包含 `lang` 属性，写明页面的主要语种
  - `<head>` 元素
    + 头元素：访问页面时不呈现给用户的 hTML 文档内容的元素容器
    + 该元素内容常包含 HTML 提供给搜索引擎的关键字和页面描述、风格化页面的 CSS、字符集声明等
  - `<meta charset="utf-8">` 
    + 该元素指明文档使用 `UTF-8` 字符编码
    + `UTF-8` 编码基本上可以处理任何文本内容
  - `<meta name="viewport" content="width=device-width">`
    + 视口元素：确保页面以视口宽度进行渲染，避免移动端浏览器上因页面过宽导致缩放
  - `<title>` 元素
    - 标题元素：设置页面的标题显示在浏览器标签页上，也作为收藏网页的描述文字
  - `<body>` 元素
    + 主体元素：访问页面时呈现给用户的全部文档内容（即：文本、图像、游戏、音视频等多媒体或其他内容

## 参考资料
  - [MDN HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
  - [MDN HTML 基础](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/HTML_basics)