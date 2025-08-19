---
sidebar: auto
title: Notification 通知
date: 2023-10-18
tags:
 - Notification
 - 通知
categories: 
 - ArkUI
 - HarmonyOS
---

## 通知表现形式
  - [通知表现形式](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20231219114012.92763457726561030610029910836269:50001231000000:2800:4104EF08EACB959CD58E82ECBA2EA3268BEA5CF04B558A5D2B4D88D38B76C452.png?needInitFileName=true?needInitFileName=true)
  - 通知栏
    + 通知浏览界面，通知在通知栏中按时间排序。
  - 锁屏通知
    + 锁屏上仅显示本次锁屏期间接收的通知，最多显示 3 条通知。
  - 横幅通知
    + 在界面顶部显示 5 秒后消失。非全屏界面显示 3 行高度，全屏界面显示为 1 行高度。
  - 桌面图标角标
    + 圆点角标表示该应用有通知。
  - 通知图标
    + 以图标形式显示在状态栏、AOD 界面。
## 通知结构
  - ![通知结构](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20231219114012.62439308027248973344105597935148:50001231000000:2800:FEEAC8B9BE1B85337089C5BBF947BAD1C1BE990E068B3C18B8349E9ADAF7072E.png?needInitFileName=true?needInitFileName=true)
  1. 通知小图标：表示通知的功能与类型。
  2. 通知名称：应用名称或功能名称。
  3. 时间：发送通知的时间，系统默认显示。
  4. 展开箭头：点击标题区，展开被折叠的内容和按钮。若无折叠的内容和按钮，不显示此箭头。
  5. 内容标题：描述简明概要。
  6. 内容详情：描述具体内容或详情。

## 参考资料
  - [HOS NotificationManager 模块](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/js-apis-notificationmanager-0000001427585056-V3)