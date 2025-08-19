---
sidebar: auto
title: Network 网络
date: 2023-10-18
tags:
 - Network 
 - 网络
categories: 
 - ArkUI
---

## 前言
  - ArkUI 使用网络资源（例：访问在线网页）时，都须在 module.json5 文件中申明 `ohos.permission.INTERNET` 网络访问权限。
    + 此权限是 HarmonyOS 提供的一种访问控制机制即应用权限，用来保证这些数据或功能不会被不当或恶意使用
    ```json
      {
          "module" : {
              "requestPermissions":[
                 {
                   "name": "ohos.permission.INTERNET"
                 }
              ]
          }
      }
    ```

## Web 网络组件
  - Web 组件：用于加载显示网页，借助此组件相当于在原生应用程序里嵌入一个浏览器

## 发起 HTTP 请求
  - 共分五个步骤
    1. 导入 http 模块。
    2. 创建 httpRequest 对象。
    3. 订阅请求头（可选）
    4. 发起 http 请求。
    5. 处理响应结果