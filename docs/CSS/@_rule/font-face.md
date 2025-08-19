---
sidebar: auto
title: CSS @font-face 字体
date: 2023-10-18
tags:
 - CSS @font-face
 - 字体
categories: 
 - CSS @ 规则
---

## @font-face
  - 用于显示文本的自定义字体；字体能从远程服务器或本地安装的字体加载
    + 若指定 `local()` 函数，将从本地查找指定的字体名称中的匹配项，本地字体才会使用。
    + 否则，字体就使用 `url()` 函数下载的资源。通过允许作者提供他们自己的字体
  - 语法：
    ```css
      @font-face { <declaration-list> }  
    ```
  - @font-face 允许开发者为其网页指定在线字体。
    + 通过这种作者自备字体的方式，可以消除对用户电脑字体的依赖
    ```css
      @font-face {
        font-family: "Open Sans";
        src:
          url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
          url("/fonts/OpenSans-Regular-webfont.woff") format("woff");
      }    
    ```
    
### 自定义字体
  - 通过使用 CSS 的 `@font-face` 加载特定的字体（而替代掉浏览器自带的默认字体） 从而来实现特定的文字效果.
    + `font-family` 属性：（自定义）字体名称
    + `src` 属性：字体资源在当前服务器的路径
    + `format` 属性：字体的格式（便于浏览器解析）
      * 字体格式：`truetype`、`opentype`、`truetype-aat`、`embedded-opentype`、`avg`等
    ```css
      @font-face {
        font-family: 'my_font_family';
        src: url('../font/my_font.eot');
        src: url('../font/my_font.eot?#iefix') format('embedded-opentype'),
            url('../font/my_font.woff2') format('woff2'),
            url('../font/my_font.woff') format('woff'),
            url('../font/my_font.ttf') format('truetype'),
            url('../font/my_font.svg#iconfont') format('svg');
      }
    ```
#### `format` 属性的字体格式：
  - `TrueType` 格式(`.ttf`)
    + Windows和Mac上常见的字体格式 这是一种原始格式 因此并没有为网页进行优化处理
    + 浏览器支持：IE9+、FireFox3.5+、Chrome4.0+、Safari3+、Opera10+、IOS Mobile Safari4.2+
  - `OpenType` 格式(`.otf`)
    + 以 `TrueType` 为基础 也是一种原始格式 但提供了更多的功能
    + 浏览器支持：FireFox3.5+、Chrome4.0+、Safari3.1+、Opera10.0+、IOS Mobile Safari4.2+
  - `Web Open Font` 格式(`.woff`)
    + 它是一个开放的 `TrueType` / `OpenType` 的压缩版 同时支持元数据包的分离。对网页进行特殊优化了，因此是 Web 字体中的最佳格式。
    + 浏览器支持：IE9+、FireFox3.5+、Chrome6+、Safari3.6+、Opera11.1+
  - `Embedded Open Type` 格式(`.eot`)
    + IE专用字体格式 可以从 `TrueType` 格式创建此格式字体
    + 浏览器支持：IE4+  
  - `SVG` 格式(`.svg`)
    + 基于 SVG 字体渲染的格式
    + 浏览器支持：Chrome4+、Safari3.1+、Opera10.0+、IOS Mobile Safari3.2+

## 参考资料
  - [MDN @font-face](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face)
  - [CSS自定义字体@font-face：使用方法及format属性p](https://blog.csdn.net/Piconjo/article/details/104720807/)