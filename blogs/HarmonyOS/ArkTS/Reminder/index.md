---
sidebar: auto
title: ReminderAgentManager 后台代理提醒
date: 2023-10-18
tags:
 - ReminderAgentManager 
 - 后台代理提醒
categories: 
 - ArkUI
 - HarmonyOS
---

## 前言
  - 后台代理提醒：由系统后台进程代理应用的提醒功能。
    + 通过 reminderAgentManager 模块提供提醒定义、创建提醒、取消提醒等能力。
    + 后台代理提醒服务提供统一的提醒管理能力，在应用退居后台或退出后，计时和提醒通知功能被系统后台代理接管。

## 后台代理提醒业务类型：
  - 倒计时类
    + 基于倒计时的提醒功能，适用于短时的计时提醒业务。
  - 日历类
    + 基于日历的提醒功能，适用于较长时间的提醒业务。
  - 闹钟类
    + 基于时钟的提醒功能，适用于指定时刻的提醒业务。

## 参考资料
  -[HOS ReminderAgentManager](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/js-apis-reminderagentmanager-0000001477981405-V3?catalogVersion=V3)