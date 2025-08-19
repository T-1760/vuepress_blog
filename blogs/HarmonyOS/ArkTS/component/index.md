---
sidebar: auto
title: Component 组件
date: 2023-10-18
tags:
 - Component 
 - 组件
categories: 
 - HarmonyOS
 - ArkUI
---

## 组件
  - 组件（Component）是界面搭建与显示的最小单位，
  - HarmonyOS ArkUI 声明式开发范式，根据功能可以分为五大类：
    + 基础组件
    + 容器组件
    + 媒体组件
    + 绘制组件
    + 画布组件

## 基础组件
  - 基础组件是视图层的基本组成单元，包括 `Text`、`Image`、`TextInput`、`Button`、`LoadingProgress`等
### Text 组件
  - `Text` 组件用于在界面上展示一段文本信息，可以包含 `Span` 子组件
#### 文本样式
  - 针对包含文本元素的组件（`Text`、`Span`、`Button`、`TextInput`等），可设置文本的 `fontColor` 颜色、`fontSize` 大小、`fontStyle` 样式、`fontWeight` 粗细、`fontFamily`字体等文本样式属性：
| 名称 | 参数类 | 描述 |
|:--|:--|:--|
| `fontColor`   | ResourceColor   | 设置文本颜色。| 
| `fontSize`    | Length\Resource | 设置文本尺寸，Length为 number 类型时，使用 `fp` 单位。| 
| `fontStyle`   | FontStyle       | 设置文本的字体样式。默认值：`FontStyle.Normal`。| 
| `fontWeight`  | number\FontWeight\string | 设置文本的字体粗细，<br>number 类型取值`[100, 900]`，取值间隔为`100`，默认为`400`，取值越大，字体越粗。<br>string 类型仅支持 number 类型取值的字符串形式，例: `"400"`，<br>以及分别对应 FontWeight 中相应的`bold`、`bolder`、`lighter`、`regular`、`medium`枚举值。默认值：`FontWeight.Normal`。|
| `fontFamily` | string\Resource |设置文本的字体列表。使用 `，` 分割多个字体，优先级按顺序生效。例：`"Arial，sans-serif"`。|

## 容器组件
  - 容器组件是一种比较特殊的组件，它可以包含其他的组件。
    + 容器组件除了放置基础组件外，也可以放置容器组件进行嵌套
  - 线性布局容器表示按照垂直方向或者水平方向排列子组件的容器，
    + ArkTS 提供了 Column 和 Row 容器来实现线性布局。
  - 在布局容器中，默认存在两根轴，分别是主轴和交叉轴，这两个轴始终是相互垂直的。不同的容器中主轴的方向不一样的
    + 主轴：
      * 在 Column 容器中的子组件：按照**从上到下的垂直方向**布局的，其主轴的方向是垂直方向；
      * 在 Row 容器中的组件：按照**从左到右的水平方向**布局的，其主轴的方向是水平方向。
      * ![Column 容器 & Row 容器主轴](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/103/404/958/0260086000103404958.20221102115909.22873051359993638219253132361587:50001231000000:2800:DD239797D663EF0C454A0344974110E18232305E2A48C465CB8104AB7AF3B76D.png)
    + 交叉轴：与主轴垂直相交的轴线，
      * 如果**主轴是垂直**方向（例：Column 容器），**交叉轴则水平**方向。
      * 如果**主轴是水平**方向（例：Row 容器），**交叉轴则垂直**方向。
      * ![Column 容器 & Row 容器交叉轴](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/103/404/958/0260086000103404958.20221102115920.30331924582664597826254415316555:50001231000000:2800:3531A948E66A8AEFBC7ACD4C60C8412D31B655FF90C52DCA0F06B4E8C6B1DE16.png)
### Column
  - Column：表示沿垂直方向布局的容器。
### Row
  - Row：表示沿水平方向布局的容器。
### List 组件
  - List 组件：列表包含一系列相同宽度的列表项。适合连续、多行呈现同类数据，例如图片和文本。
### ListItem 子组件
### Grid 组件
### GridItem 子组件
### Tabs 组件
### TabContent 子组件
#### TabBar 属性

## 媒体组件
### Video 视频组件
  - Video 组件：用于播放视频文件并控制其播放状态的组件。


Swiper组件：滑块视图容器，提供子组件滑动轮播显示的能力。
Navigator组件：路由容器组件，提供路由跳转能力。
ForEach组件：ForEach基于数组类型数据执行循环渲染。