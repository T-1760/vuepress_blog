---
sidebar: auto
title: ArkTS 应用开发语言
date: 2023-10-18
tags:
 - ArkTS
 - 应用开发语言
categories: 
 - HarmonyOS
---

## 前言
  - ArkTS 是 HarmonyOS 优选的主力应用开发语言。它在 TypeScript（简称TS）的基础上，扩展了声明式 UI、状态管理等相应的能力，
    + ArkTS 则是 TS 的超集，TS 是 JavaScript（简称JS）的超集

## 组件状态管理装饰器
  - 组件状态管理装饰器用来管理组件中的状态
    + @State：装饰的变量是组件内部的状态数据，当这些状态数据被修改时，将会调用所在组件的 build 方法进行 UI 刷新
    + @Prop：装饰的变量必须使用其父组件提供的 @State 变量进行初始化，允许组件内部修改 @Prop 变量，但更改不会通知给父组件（即：@Prop 属于单向数据绑定）
      * 与 @State 有相同的语义，但初始化方式不同
    + @Link：装饰的变量可以和父组件的 @State 变量建立双向数据绑定，
      * 注意：@Link 变量不能在组件内部进行初始化。
## @Builder装饰器
  - @Builder：装饰的方法用于定义组件的声明式 UI 描述，在一个自定义组件内快速生成多个布局内容。