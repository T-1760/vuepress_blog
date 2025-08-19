---
sidebar: auto
title: Web API
date: 2023-10-18
tags:
 - Web API
categories: 
 - Web API
---

## 前言
### API
  - API（全称：Application Programming Interface 应用程序编程接口）是一些预先定义的函数，
  - 目的：提供应用程序与开发人员基于某软件或硬件得以访问一组例程的能力，而又无需访问源码（理解为：内部工作机制的细节）
    + 任何开发语言都有自己的 API
    + API 的特征输入和输出（ I / O ）
    + API 的使用方法《console.log()）

## 客户端 JavaScript API 
  - 客户端 JavaScript 中有很多可用的 API, 他们本身并不是 JavaScript 语言的一部分，却建立在 JavaScript 语言核心的顶部，为使用 JavaScript 代码提供额外的超强能力。通常分为两类: 浏览器 API 和 第三方 API
### 浏览器 API
  - 浏览器 API内置于 Web 浏览器中，能从浏览器和电脑周边环境中提取数据，并用来做有用的复杂的事情
  - 常见的浏览器 API
    + Ajax API: 从服务器获取数据（`XMLHttpRequest API`、`Fetch API`）
    + BOM API: 操作浏览器
    + Canvas API：用于绘制和操作图形
    + DOM API: 操作页面文档
    + Device API: 操作和检索现代设备硬件中的数据 （`Geolocation API`地理位置、`Notifications API` 系统通知、`Vibration API` 硬件震动）
    + Media API: 用于呈现和操作媒体 （`Web Audio API`、`WebRTC`）
    + Storage API：用于客户端存储数据 （`Web Storage API`键值存储、`IndexedDB API`表格存储）
### 第三方 API
  - 第三方 API缺省情况下不会内置于浏览器中，通常必须在 Web 中的某个地方获取代码和信息
  - 常见的第三方 API
    +  Twilio API: 为 app 提供了针对语音通话和视频聊天的框架，及从你的 app 发送短信息或多媒体信息等诸多功

## 参考资料
  - [MDN：客户端 Web API](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)
  - [MDN：Web API 接口参考](https://developer.mozilla.org/zh-CN/docs/Web/API)