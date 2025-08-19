---
sidebar: auto
title: Ohpm 第三方库
date: 2023-10-18
tags:
 - Ohpm 
 - 第三方库
categories: 
 - ArkUI
---

## 开源三方库途径
### 通过 Gitee 网站开源社区获取
  - 在 Gitee 中，搜索 `OpenHarmony-TPC` 仓库，在 tpc_resource 中对三方库进行了资源汇总。
### 通过 OpenHarmony 三方库中心仓获取
  - 进入 OpenHarmony 三方库中心仓，根据类型或者直接搜索寻找需要的三方库。
  - 常用的三方库可以分为 UI、动画、网络、图片、多媒体、数据、安全、工具等。
    + UI 库
      * `@ohos/textlayoutbuilder`：可以定制任一样式的文本构建工具，包括字体间距、大小、颜色、富文本高亮显示等。
      * `@ohos/roundedimageview`：可以生成圆角矩形、或者椭圆形等图片形状。
    + 网络库
      * `@ohos/axios`：运行在 nodejs 和浏览器中的 axios，也是较熟知的基于 promise 的网络请求库，同样实现了强大的网络功能。
    + 动画库
      * `@ohos/lottie`：用于解决应用中复杂动画的问题。
      * `@ohos/svg`：可以解析 SVG 图片并渲染到页面上。

### 使用开源三方库（以 lottie 为例）
  - @ohos/lottie 是基于 lottie-web 开发，集成在三方库社区内的开源版本，是 HarmonyOS 系统中复杂动画的一种解决方案。
    + 启动动画
      * APP logo动画的播放。
    + 加载动画
      * 网络请求的 loading 动画。
    + 上下拉刷新动画
      * 请求更多资源时的刷新动画。
    + 按钮动画
      * 切换按钮、编辑按钮、播放按钮等按钮的切换过渡动画。
    + 视图转场动画
      * 一些场景的转场添加动画能够提升用户体验。
#### 安装 @ohos/lottie
  - 通过 `ohpm` 执行对应的指令，将 lottie 安装到项目中。
    ```shell
      # 安装 @ohos/lottie
      ohpm install @ohos/lottie

      # 卸载 @ohos/lottie，将lottie从项目中删除，其程序包和配置信息将会从项目中移除
      ohpm uninstall @ohos/lottie
    ```
#### 使用 @ohos/lottie
  - 通过import指令在项目中引入@ohos/lottie到文件中。
    ```ts
      import lottie from '@ohos/lottie'
    ```
  - 构建 Canvas 画布
    + @ohos/lottie 解析 JSON 动画文件的数据需要基于 Canvas 画布进行2D渲染，
    + 在加载 JSON 动画之前，需先初始化渲染上下文，并在画面中创建 Canvas 画布区域，将对应的渲染上下文 `renderingContext` 传递给 Canvas。
    ```ts
      // 初始化渲染上下文  
      private renderingSettings: RenderingContextSettings = new RenderingContextSettings(true) // 设置开启抗锯齿
      private renderingContext: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.renderingSettings)  // 创建2D渲染上下文

      // 加载Canvas画布   
      Canvas(this.renderingContext)
    ```
  - 使用 @ohos/lottie 加载 JSON 动画
    + 加载 JSON 动画需要用到 `loadAnimation` 方法，在方法中需配置相应的初始设置，包括渲染上下文、渲染方式以及 JSON 动画资源的路径等
    ```ts
      // 用 animationItem 实例接收返回的 animationItem 对象
      let animationItem = lottie.loadAnimation({
        container: this.renderingContext,            // 渲染上下文
        renderer: 'canvas',                          // 渲染方式
        loop: 10,                                    // 设置为循环播放10次
        autoplay: true,                              // 是否自动播放，默认true
        path: 'common/lottie/data.json',             // json路径
      })
      // 或直接使用 lottie.loadAnimation 方法   
      lottie.loadAnimation({
        container: this.renderingContext,            // 渲染上下文
        renderer: 'canvas',                          // 渲染方式
        loop: true,                                  // 默认为true
        autoplay: true,                              // 是否自动播放，默认true
        path: 'common/lottie/data.json',             // json路径
      })
    ```
  - @ohos/lottie 控制动画
    + @ohos/lottie 内封装了包括状态控制，进度控制，播放设置控制和属性控制等多个API，从而实现更加灵活的交互效果。
    ```ts
      // 播放、暂停、停止、销毁  可以使用lottie，也可以使用animationItem实例进行控制
      lottie.play();        // 从目前停止的帧开始播放
      lottie.stop();        // 停止播放，回到第0帧
      lottie.pause();       // 暂停该动画，在当前帧停止并保持
      lottie.togglePause(); // 切换暂停/播放状态
      lottie.destroy();     // 删除该动画，移除相应的元素标签等。在unmount的时候，需要调用该方法

      // 播放进度控制
      animationItem.goToAndStop(value, isFrame); // 跳到某个时刻/帧并停止。isFrame(默认false)指示value表示帧还是时间(毫秒)
      animationItem.goToAndPlay(value, isFrame); // 跳到某个时刻/帧并进行播放
      animationItem.goToAndStop(30, true);       // 例：跳转到第30帧并停止
      animationItem.goToAndPlay(300);            // 例：跳转到第300毫秒并播放

      // 控制帧播放
      animationItem.setSegment(5,15);             // 限定动画资源播放时的整体帧范围，即设置动画片段
      animationItem.resetSegments(5,15);          // 重置播放的动画片段
      animationItem.playSegments(arr, forceFlag); // arr可以包含两个数字或者两个数字组成的数组，forceFlag表示是否立即强制播放该片段
      animationItem.playSegments([10,20], false); // 例：播放完之前的片段，播放10-20帧
      animationItem.playSegments([[5,15],[20,30]], true); //例： 直接播放5-15帧和20-30帧

      // 动画基本属性控制
      lottie.setSpeed(speed);         // 设置播放速度，speed为1表示正常速度
      lottie.setDirection(direction); // 设置播放方向，1表示正向播放，-1表示反向播放

      // 获取动画帧数属性
      animationItem.getDuration();    //获取动画时长
    ```