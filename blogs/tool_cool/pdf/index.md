---
sidebar: auto
title: mozilla pdfjs-dist / pdf.js 工具库
date: 2023-10-18
tags:
 - mozilla
 - pdfjs-dist
 - pdf.js
 - PDF
categories: 
 - Tools_Cool
 - 工具库
---

## pdfjs-dist 与 pdf.js

## pdfjs 的使用
### 引入 PDF.js
    ```html
      <!-- 显示 PDF 文档的容器元素 -->
      <div id="pdf-container"></div>

      <!-- 引入pdf.js -->
      <script src="pdf.js"></script>
      <script src="pdf.worker.js"></script>
    ```
### 加载 PDF 文档
  - 创建一个 PDF 文档实例
    ```js
      const url = 'PDF 文件路径';
      const pdfDoc = null;
      pdfjsLib.getDocument(url).promise.then(doc => {
        pdfDoc = doc;
      });      
    ```
  - 获取 PDF 文档中的页面，并通过自建 `<canvas>` 置于容器元素中呈现
    ```js
      const pageNumber = 1; // 显示 PDF 文档中的页码
      pdfDoc.getPage(pageNumber).then(page => {
        const scale = 1.5;
        // 获取 PDF 指定 pageNumber 页码内容
        const viewport = page.getViewport({ scale: scale });
        
        // 自建 canvas 元素
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        document.getElementById('pdf-container').appendChild(canvas);
        
        // 配置渲染器的选项
        const renderer = {
          canvasContext: context,
          viewport: viewport
        };
        
        // 渲染页面
        page.render(renderer);
      });

    ```

## pdfjs 的常用方法
  - [v2.0.943](https://github.com/mozilla/pdf.js/blob/v2.0.943/src/display/api.js)
### PDF.getDocument()
  - 功能：异步加载 PDF 文档。
    + 注意：若使用 URL 获取 PDF 数据，则使用标准 `XMLHttpRequest`（XHR）
  - 语法：`PDF.getDocument(src)`
  - 参数：
    + src<String\> | <TypedArray\> | <DocumentInitParameters\> | <PDFDataRangeTransport\>: 可以是 PDF 所在位置的 url、类型化数组（Uint8Array）、已经填充的数据或参数对象。
  - 返回值
    + PDFDoc<PDFDocumentLoadingTask\>：加载 PDF 文档信息
### PDFDoc.getPage()
  - 功能：获取 PDF 文档指定页码的页面信息
  - 语法：`PDFDoc.getPage(pageNumber)`
  - 参数：
    + pageNumber<Number\>：要获取的页码。第一页则为 `1`。 
  - 返回值：
    + Promise<Object\>：使用`｛ @link PDFPageProxy ｝`对象解析的 Promise 对象。
### PDFPage.getViewport()
  - 功能：获取 PDF 的页面视图信息 
  - 语法：`pdfPage.getViewport(options)`
  - options 参数
    + scale<Number\>：设置页面的缩放比例
    + [rotate]<Number\>：设置页面的旋转角度
    + [dontFlip]<Boolean\>：设置页面 Y 轴是否翻转（镜像）
  - 返回值<PageViewport\>: 包含 width、height、变换等渲染信息的属性对象。
  - 案例：
    ```js
      const viewport = page.getViewport({ 
        scale: 2,
        rotate: 90
      });
    ```
  - 注：不同版本的 pdfjs-dist 的 getViewport(options) 方法人参格式区别
    + **pdfjs-dist v2.3.200**及以上版本，options 参数以 (`scale`, `rotate`) 逗号分隔的列表形式
    + **pdfjs-dist v2.4.456**及以下版本, options 参数以 (`{scale, rotate}`) 选项对象形式
    + getViewport 获取到的是原 pdf 大小，原 pdf 宽度小于移动端 h5 宽度，也就是 scale < 1 时，加载出来的pdf 分辨率很低，是模糊的
### PDFPage.render()
  - 功能：将页面渲染到所需上下文中
  - 语法：`pdfPage.render(options)`
  - options 参数
    + canvasContext<Object\>：DOM Canvas对象的 2D 上下文。
    + viewport<PageViewport\>: 设置页面的渲染视口，可调用 `PDFPage.getViewport` 方法获得
    + intent<String\>：渲染意图，可选值 `"display"`（默认）、`"print"`
    + [enableWebGL]<Boolean\>：是否启用 WebGL 加速渲染某些操作。默认值：`false`。
    + [transform]<Array\>：附加转换，在视口变换之前应用
    + [background]<Object\>：设置页面的背景色（用于画布的背景）
      * 可使用任何有效的 `canvas.fillStyle`：解析为的 DOMString 类似 CSS＜color＞值，`CanvasGradient` 对象（线性或径向梯度）或` CanvasPattern` 对象（填充图像）。默认值为 `rgb(255, 255, 255)`。
  - 案例
    ```js
      const renderer = {
        canvasContext: canvas.getContext('2d'),
        viewport: page.getViewport({ scale: 1 }),
        background: 'gray'
      };
    ```
## pdf.js 常见问题
### 打印面板中多出一张空白页
  - `padding` 和 `margin` 样式设置为 `0`
    ```css
      @media print {
        *{
          padding: 0;
          margin: 0;
        }
      }
    ```
  - `<canvas>` 为行级元素，可尝试调整 `vertical-align` 样式属性
    ```css
      @media print {
        canvas{
          vertical-align: bottom;
        }
      }
    ```
  - 若设置了 `@page.size` 打印纸张宽高可能小于内容（`<vanvas>`元素或其包裹的父元素的）宽高
    ```js
      const viewport = {
        width: 794;
        height 1123;
      }
      const cssText = `
        @media print {
          @page{
            margin: 0;
            size: ${viewport.width}px  ${viewport.height}px 
          }
        }
      `
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width - 1;
      canvas.height = viewport.height - 1;
    ```
#### 跟多参考
  - [vue-pdf 打印文字空白、每一页多一个空白页、电子签章不显示](https://blog.csdn.net/qq_42249552/article/details/112860593)
  - [vue批量导出pdf（含分页及解决最后一页空白问题）](https://blog.csdn.net/weixin_44409569/article/details/128630644)

## 参考资料
  - [pdfjs-dist GitHub](https://github.com/mozilla/pdfjs-dist/tree/v2.0.943)
  - [PDF.js 官网](https://mozilla.github.io/pdf.js/)
  - [PDF.js 中文文档](https://gitcode.gitcode.host/docs-cn/pdf.js-docs-cn/index.html)
  - [网页在线打开PDF_网站中在线查看PDF之pdf.js](https://blog.csdn.net/u011127019/article/details/133847939)

