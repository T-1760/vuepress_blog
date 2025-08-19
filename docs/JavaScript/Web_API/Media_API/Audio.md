---
sidebar: auto
title: Web Audio API
date: 2023-10-18
tags:
 - Web Audio API
categories: 
 - Web API
 - Medio API
---

## 前言
  - Web Audio API 可在 AudioContext 音频上下文中进行音频操作，具有**模块化路由**的特点。
    + 在 AudioNodes 音频节点上操作进行基础的音频，它们连接在一起构成 AudioRoutingGraph 音频路由图。
  - AudioNodes 音频节点通过输入和输出相互连接，形成一个链或者一个简单的网。（即：音频节点可相互链式传递）
    + 这个链或网起始于一个或多个音频源。音频源可以提供一个个片段的音频采样数据（以数组的方式）
    + 一秒钟的音频数据可以被切分成几万个片段。这些片段可通过多种方式获得
      * 数学运算（如: `OscillatorNode`）
      + 读取音频或视频的文件（如：`AudioBufferSourceNode`、`MediaElementAudioSourceNode`）
      + 音频流（如：`MediaStreamAudioSourceNode`）
    
### 典型的 web audio 流程
   1. 创建音频上下文
    -  `const ctx = new (window.AudioContext || window.webkitAudioContext)();`
   2. 在音频上下文里创建 Source 音频源
    - `<audio>` 元素
    - `createOscillator` 振荡器
    - `AudioBufferSourceNode` 音频源
    - `MediaStreamAudioSourceNode` 流
  3. 创建 Effect 效果节点（例：混响、双二阶滤波器、平移、压缩）
    - `const analyser = ctx.createAnalyser();`
  4. 为音频选择一个 Destination 目的地
    - 例: 系统终端的扬声器、链接的耳机设备。
  5. 连接 Source 源到 Effect 效果器，对 Destination 目的地进行效果输出

  ```mermaid
    graph
    source[输入<br>AudioBufferSourceNode]
    gain[处理<br>GainNode]
    output[输出<br>Destination]

    source --> gain --> output
    subgraph Audio Context
      source
      gain
      output
    end
  ```

## Web Audio API 接口
  - Web Audio API 共有一系列接口和相关的事件，通常分成九类功能。
    + （通用）音频图
      * Web Audio API 中与生成音频图相关的定义与通用容器
    + 音频源
      * Web Audio API 使用的音频源接口
    + 音效
      * 应用到音频源上的音效接口
    + 音频目的地
      * 定义处理音频之后输出到哪里的接口
    + 数据分析和可视化
      * 通过  AnalyserNode 从音频里提取数据（时间、频率等）的接口
    + 分离、合并声道
      * 用于拆分、合并声道的接口
    + 声音空间效果
      * 用来添加空间平移效果到音频源的接口
    + 使用 JavaScript 处理音频
      * 编写 JavaScript 代码来处理音频数据。
      * 接口将来会被 `Audio_Workers` 代替。
    + 离线（后台）音频处理
      * 可以在后台进行音频的快速处理。仅生成包含 AudioBuffer 音频数据，而不在扬声器里播放它。
    + 音频工作者
      * 了解新的 WebWorker 方面的内容。音频工作者提供了一种可以在一个 WebWorker 上下文中直接进行音频处理的方式。
  - 案例：
    ```js
      let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      // 创建多个不同作用功能的 node 节点
      let analyser = audioCtx.createAnalyser();
      let distortion = audioCtx.createWaveShaper();
      let gainNode = audioCtx.createGain();
      let biquadFilter = audioCtx.createBiquadFilter();
      let convolver = audioCtx.createConvolver();

      // 将所有节点连接在一起
      source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.connect(distortion);
      distortion.connect(biquadFilter);
      biquadFilter.connect(convolver);
      convolver.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // 控制双二阶滤波器
      biquadFilter.type = "lowshelf";
      biquadFilter.frequency.value = 1000;
      biquadFilter.gain.value = 25;
    ```
### 通用音频图定义  
  - `AudioContext` 音频上下文：代表由音频模块构成的音频处理图。
    + 音频上下文控制其所包含节点的创建和音频处理、解码。
    + 使用其他一切操作接口都在必须在音频上下文环境里进行。
  - `AudioNode` 音频节点：是一个音频处理模块
    + 例：音频源（例：`<audio>`、`<video>`），音频输出、中间处理模块（例：`BiquadFilterNode` 滤波器、`GainNode` 音量控制器）。
  - `AudioParam` 音频参数：代表音频相关的参数（例：一个 AudioNode 音频节点的参数）。
    + 它可以设置为特定值或值的变化，并且可以在指定的时间之后以指定模式变更。
  - `ended` 结束事件：当媒体播放停止时，会触发 `ended` 事件。

### 音频源
  - `OscillatorNode`：代表一种随时间变化的波形，
    + 例：正弦波形或三角波形。类型是 AudioNode，功能是音频处理模块，可以产生指定频率的波形。
  - `AudioBuffer`：代表内存中的一段音频数据，当音频数据被解码成这种格式之后，就可被放入一个 `AudioBufferSourceNode` 中使用。
    + AudioBuffer 可通过 `AudioContext.decodeAudioData()` 方法从音频文件创建
    + AudioBuffer 可通过 `AudioContext.createBuffer`() 方法从原始数据创建  
  - `AudioBufferSourceNode`：表示由内存音频数据组成的音频源，音频数据存储在 AudioBuffer 中。（这是一个作为音频源的 AudioNode）
  - `MediaElementAudioSourceNode`：表示由 `<audio>`、`<video>` 元素生成的音频源。（这是一个作为音频源的 AudioNode）
  - `MediaStreamAudioSourceNode`：表示由 WebRTC 的 MediaStream（如：网络摄像头、麦克风）生成的音频源。（这是一个作为音频源的 AudioNode）
  
### 音效
  - `BiquadFilterNode`：表示一个简单的低阶滤波器。总是只有一个输入和一个输出。
    + 它是 AudioNode 类型，可以表示不同种类的滤波器、调音器或图形均衡器。
  - `ConvolverNode`：
    + 它是 AudioNode 类型，对给定的 AudioBuffer 执行线性卷积，常用于实现混响效果。
  - `DelayNode`：表示延迟线；
    + 它是 AudioNode 类型的音频处理模块，使输入的数据延时输出。
  - `DynamicsCompressorNode`：提供了一个压缩效果，
    + 当多个音频在同时播放并且混合时，通过它降低音量最大的部分的音量来帮助避免发生削波和失真。
  - `GainNode`：用于音量变化。
    + 它是 AudioNode 类型的音频处理模块，输入后应用增益 效果，然后输出。
  - `StereoPannerNode`：表示一个简单立体声控制节点，用来左右移动音频流。
  - `WaveShaperNode`：表示一个非线性的扭曲。
    + 它是 AudioNode 类型，可以利用曲线来对信号进行（明显效果的）扭曲。还常被用来给声音添加温暖的感觉。
  - `PeriodicWave`：定义周期性的波形，
    + 可被用来重塑 `OscillatorNode` 的输出。

### 音频目的地
  - `AudioDestinationNode`：定义最后音频要输出到哪里，通常输出到扬声器。
  - `MediaStreamAudioDestinationNode`：定义使用 WebRTC 的 MediaStream（只包含单个 AudioMediaStreamTrack）应该连接的目的地，
    + AudioMediaStreamTrack 的使用方式和从 getUserMedia() 中得到 MediaStream 相似。这个接口是 AudioNode 类型的音频目的地。

### 数据分析和可视化
  - `AnalyserNode`：表示一个提供实时频率分析与时域分析的切点，这些分析数据可以用做数据分析和可视化。
#### AnalyserNode.frequencyBinCount 属性
  - frequencyBinCount 的值固定为 AnalyserNode 接口中 fftSize 值的一半。
    + 该属性通常用于可视化的数据值的数量。
    
### 分离、合并声道
  - `ChannelSplitterNode`：用于把输入流的每个声道输出到一个独立的输出流。
  - `ChannelMergerNode`： 用于把一组输入流合成到一个输出流（输出流的每一个声道对应一个输入流）。

### 声音空间效果
  - `AudioListener`：代表场景中正在听声音的人的位置和朝向。
  - `PannerNode`：用于表示场景是声音的空间行为。
    + 它是 AudioNode 类型的音频处理模块，
    + 这个节点用于表示右手笛卡尔坐标系里声源的位置信息，
      * 运动信息（通过一个速度向量表示）
      * 方向信息（通过一个方向圆锥表示）

### 使用 JavaScript 处理音频
  - `ScriptProcessorNode`：用于通过 JavaScript 代码生成，处理，分析音频。
    + 它是 AudioNode 类型的音频处理模块，但它与两个缓冲区相连接，一个缓冲区里包含当前的输入数据，另一个缓冲区里包含着输出数据。
    + 每当新的音频数据被放入输入缓冲区，就会产生一个 AudioProcessingEvent 事件，当这个事件处理结束时，输出缓冲区里应该写好了新数据。
  - `audioprocess` 事件：当 ScriptProcessorNode 已经准备好进行处理时，这个事件回调会被调用。
  - `AudioProcessingEvent`：当 ScriptProcessorNode 的输入流数据准备好了时，该事件会被触发。

### 离线（后台）音频处理
  - `OfflineAudioContext` 离线音频上下文：也是 `AudioContext` 音频上下文，表示把 AudioNode 连接到一起的一个音频处理图。
   + 但与 `AudioContext` 音频上下文相比，离线上下文不能把音频渲染到扬声器，仅仅是把音频渲染到一个缓冲区。
  - `Complete` 事件：当离线音频上下文被终止时产生。
  - `OfflineAudioCompletionEvent`：表示上下文被终止时的事件。
  
### 音频工作者
  - `AudioWorkerNode`
    + 它是 AudioNode 类型， 用于与工作者线程合作来直接完成音频的生成，处理或分析等操作。
  - `AudioWorkerGlobalScope`：代表一个工作者上下文。 继承于 DedicatedWorkerGlobalScope。
    + 这个工作者上下文里运行着对音频进行处理的脚本。
    + 此接口的目的，为了直接通过编写 JavaScript 代码，来完成对音频数据的生成，处理，分析工作。
  - `AudioProcessEvent`：这个事件对象会被分发给 AudioWorkerGlobalScope 对象来进行处理。

## 实战
### 采集设备上的麦克风声音连接到扬声器：
  ```js
    // 创建音频上下文
    const audioContext = new AudioContext();
    // 获取设备麦克风流
    stream = await navigator.mediaDevices
      .getUserMedia({ audio: true})
      .catch(function (error) {
        console.log(error);
      });
    // 创建来自麦克风的流的声音源
    const sourceNode = audioContext.createMediaStreamSource(stream);
    // sourceNode.connect(audioContext.destination); // 将声音连接的扬声器 （无任何处理效果）

    const gainNode = audioCtx.createGain(); // 创建一个增益 Node
    sourceNode.connect(gainNode); // 将声音经过 gainNode 处理
    gainNode.connect(audioContext.destination); // 将声音连接的扬声器
    gainNode.gain.value = 2.0; // 设置声音增益，放大声音
  ```
## 参考资料
  - [MDN：Web Audio API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API)
  - [Web Audio API实现音频可视化-学习](https://www.bilibili.com/video/BV1iQ4y1V7Qh)
  - [Web Audio: 从入门到精通](https://www.python100.com/html/84649.html)

  - [Web Audio API实现简单变声效果](https://zhuanlan.zhihu.com/p/634848804)
  - [如何基于 Web Audio API 实现一个 Tuner（调音器）？](https://zhuanlan.zhihu.com/p/30824985)
  - [WebVR开发教程——Web Audio实现3D音效](https://zhuanlan.zhihu.com/p/32748737)