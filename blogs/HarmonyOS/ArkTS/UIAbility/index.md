---
sidebar: auto
title: UIAbility 应用组件
date: 2023-10-18
tags:
 - UIAbility
 - 应用组件
categories: 
 - ArkUI
 - HarmonyOS
---
## 前言
  - UIAbility 是一种包含用户界面的应用组件，主要用于和用户进行交互。
    + UIAbility 也是系统调度的单元，为应用提供窗口在其中绘制界面。
    + 每一个 UIAbility 实例，都对应于一个最近任务列表中的任务。
  - 一个应用可以有一个 UIAbility，也可以有多个 UIAbility，
    + 一个 UIAbility 可以对应于多个页面，建议将一个独立的功能模块放到一个 UIAbility 中，以多页面的形式呈现。
    + 例：新闻应用在浏览内容的时候，可以进行多页面的跳转使用。
  - UIAbility 内页面的跳转和数据传递
    + UIAbility 内页面的跳转和数据传递、
    + UIAbility 间的数据跳转和数据传递，
  - 页面间的导航通过页面路由 router 模块来实现。
    + 页面路由模块根据页面 url 找到目标页面，从而实现跳转。
    + 通过页面路由模块，可以使用不同的 url 访问不同的页面，
      * 跳转到 UIAbility 内的指定页面、
      * 用 UIAbility 内的某个页面替换当前页面、
      * 返回上一页面或指定的页面。

## UIAbility 的生命周期
  - 为了实现多设备形态上的裁剪和多窗口的可扩展性，系统对组件管理和窗口管理进行了解耦。
  - UIAbility 生命周期的四个状态
    + Create 状态
      * UIAbility 实例创建时，触发 `onCreate` 回调
      * 常用于进行相关初始化操作。
    + Foreground 状态
      * UIAbility 切换至前台时，触发 `onForeground` 回调
      * `onForeground` 回调在 UIAbility 的 UI 页面可见之前，常用于申请系统的资源、重新申请在 onBackground 中释放的资源等。
    + Background 状态
      * UIAbility 切换至后台时，触发 `onBackground` 回调
      * `onBackground` 回调在 UIAbility 的 UI 页面完全不可见之后，常用于释放页面不可见时无用的资源、执行较为耗时的（状态保存）操作等。
    + Destroy 状态
      + UIAbility 实例销毁时，触发 `onDestroy` 回调
      + 常用于系统资源的释放、数据的保存等操作。
  - UIAbility 实例创建完成之后，在进入 Foreground 之前，系统会创建一个 WindowStage 窗口管理器实例。
    + 每一个 UIAbility 实例都对应持有一个 WindowStage 实例。
    + WindowStage 为本地窗口管理器，用于管理窗口相关的内容（与界面相关的获焦/失焦、可见/不可见等）。
    + WindowStageCreate 与 WindowStageDestroy 两种状态实现 UIAbility 与窗口之间的弱耦合
  - 窗口管理器在 UIAbility 中管理 UI 界面功能生命周期的两个状态
    + WindowStageCreate 状态
      + UIAbility 实例创建之后，触发 `onWindowStageCreate` 回调
      * 常用于设置 UI 页面加载、设置 WindowStage 的事件订阅等操作。
    + WindowStageDestroy 状态
      * UIAbility 实例销毁之前，触发 `onWindowStageDestroy` 回调
      * 常用于释放 UI 页面资源等操作。

    ![UIAbility 生命周期状态](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20231219114011.85030804480791293473872381051767:50001231000000:2800:B4ADE6E5CD82D6A8D3D179B6610C6DD1ABB5549A115DAD982BCF7B672788A4FB.png?needInitFileName=true?needInitFileName=true)

## UIAbility 的启动模式
  - UIAbility 当前支持 3 种启动模式
    + `singleton` 单实例模式（默认）
    + `multiton` 多实例模式
    + `specified` 指定实例模式
### singleton 单实例模式
  - 在 module.json5 文件中的 `launchType` 字段配置为 `singleton`即可。（默认情况下的启动 `singleton` 模式）
  - 每次调用 `startAbility()` 方法时，如果应用进程中该类型的 UIAbility 实例已经存在，则复用系统中的 UIAbility 实例。
    + 系统中只存在唯一一个该 UIAbility 实例，即在最近任务列表中只存在一个该类型的 UIAbility 实例。
    + 由于启动的还是原来的 UIAbility 实例，并未重新创建一个新的 UIAbility 实例，此时只会进入该 UIAbility 的 `onNewWant()` 回调，不会进入其 `onCreate()` 和`onWindowStageCreate()` 生命周期回调。
### multiton 多实例模式
  - 在 module.json5 文件中的 `launchType` 字段配置为 `multiton`即可。
  - 每次调用 `startAbility()` 方法时，都会在应用进程中创建一个新的该类型 UIAbility 实例。即在最近任务列表中可以看到有多个该类型的UIAbility实例。
### specified 指定实例模式
  - 在 module.json5 文件中的 `launchType` 字段配置为 `specified`即可。
  - 针对一些特殊场景使用
    + 例：文档应用中每次新建文档希望都能新建一个文档实例，重复打开一个已保存的文档希望打开的都是同一个文档实例。
    
## router 模块
### router.pushUrl 页面跳转
  - `router.pushUrl() `方法通过 `mode` 参数可配置为两种实例模式
    + `router.RouterMode.Single` 单实例模式
    + `router.RouterMode.Standard` 多实例模式
  - 在单实例模式下：如果目标页面的url在页面栈中已经存在同url页面，离栈顶最近同url页面会被移动到栈顶，移动后的页面为新建页，原来的页面仍然存在栈中，页面栈的元素数量不变；如果目标页面的url在页面栈中不存在同url页面，按多实例模式跳转，页面栈的元素数量会加 1。
  - 页面栈的元素数量最大为 32 ，通常调用 `router.clear()` 方法清除页面栈中的所有历史页面，仅保留当前页面作为栈顶页面。
### router.replaceUrl 页面跳转
  - `router.replaceUrl()` 方法通过 `mode` 参数可配置为两种实例模式
    + `router.RouterMode.Single` 单实例模式
    + `router.RouterMode.Standard` 多实例模式。
  - 在单实例模式下：如果目标页面的url在页面栈中已经存在同url页面，离栈顶最近同url页面会被移动到栈顶，替换当前页面，并销毁被替换的当前页面，移动后的页面为新建页，页面栈的元素数量会减1；如果目标页面的url在页面栈中不存在同url页面，按多实例模式跳转，页面栈的元素数量不变。

## 参考资料
  - []()