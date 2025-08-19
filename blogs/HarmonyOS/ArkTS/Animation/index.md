---
sidebar: auto
title: Animation 动画
date: 2023-10-18
tags:
 - Animation
 - 动画
categories: 
 - ArkUI
 - HarmonyOS
---

## 属性动画
  - 属性动画是组件的通用属性发生改变时而产生的属性渐变效果
    + 只需要给组件（包括基础组件和容器组件）添加animation属性，并设置好参数

### animation 属性动画参数
  | 属性名称  | 属性类型  | 默认值  | 描述 |
  |:--|:--|:--|:--||
  | duration   | `number`   | `1000`  | 动画时长（单位：毫秒），默认为 `1000` 毫秒 |
  | tempo      | `number`   | `1.0`   | 动画的播放速度，值越大动画播放越快，值越小播放越慢，为 `0` 时无动画效果 |
  | curve      | `Curve`    | `Curve.Linear` | 动画变化曲线，默认曲线为线性 |
  | delay      | `number`   | `0` | 延时播放时间，单位为毫秒，默认不延时播放 |
  | iterations | `number`   | `1` | 播放次数，默认一次，设置为 `-1` 时表示无限次播放 |
  | playMode   | `PlayMode` | `PlayMode.Normal` | 设置动画播放模式，默认播放完成后重头开始播放 |
  | onFinish   | `function` |  | 动画播放结束时回调该函数 |
#### curve 变化曲线枚举值
  | 名称 | 描述 | 贝塞尔曲线 |
  |:--|:--|:--|
  | `Linear`    | 表示动画从头到尾的速度都是相同的 | |
  | `Ease`      | 表示动画以低速开始，然后加快，在结束前变慢 | `CubicBezier(0.25, 0.1, 0.25, 1.0)` |
  | `EaseIn`    | 表示动画以低速开始 | `CubicBezier(0.42, 0.0, 1.0, 1.0)` |
  | `EaseOut`   | 表示动画以低速结束 | `CubicBezier(0.0, 0.0, 0.58, 1.0)` |
  | `EaseInOut` | 表示动画以低速开始和结束 | `CubicBezier(0.42, 0.0, 0.58, 1.0)` |
  | `FastOutSlowIn`   | 标准曲线 | `cubic-bezier(0.4, 0.0, 0.2, 1.0)` | 
  | `LinearOutSlowIn` | 减速曲线 | `cubic-bezier(0.0, 0.0, 0.2, 1.0)` | 
  | `FastOutLinearIn` | 加速曲线 | `cubic-bezier(0.4, 0.0, 1.0, 1.0)` | 
  | `ExtremeDeceleration` | 急缓曲线 | `cubic-bezier(0.0, 0.0, 0.0, 1.0)` | 
  | `Sharp`     | 锐利曲线 | `cubic-bezier(0.33, 0.0, 0.67, 1.0)` | 
  | `Rhythm`    | 节奏曲线 | `cubic-bezier(0.7, 0.0, 0.2, 1.0)` | 
  | `Smooth`    | 平滑曲线 | `cubic-bezier(0.4, 0.0, 0.4, 1.0)` | 
  | `Friction`  | 阻尼曲线 | `CubicBezier(0.2, 0.0, 0.2, 1.0)` |
#### playMode 播放模式枚举值
 | 名称 | 描述 |
 |:--|:--|
 | `Normal`           | 动画按正常播放 |
 | `Reverse`          | 动画反向播放 |
 | `Alternate`        | 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放 |
 | `AlternateReverse` | 动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放 |

#### delay 延时播放
  - 经验参考：在延时间距不超过动画时长 duration 时，总延时间距越接近 duration，秩序性越好。
    + 总延时间距为延时间距与元素数量的乘积，即：延时间距*图标数量=总延时间距。
    + 设置 delay 参数时，同时需要确定 duration 动画时长的参数值
#### iterations 播放次数
  - 当 `iterations` 参数播放结束时，会调用 `onFinish` 函数来进行后续的业务处理
    + 当 `iterations` 设置为 `-1` 时，表示无限次播放，则 `onFinish` 回调函数不会被调用。
