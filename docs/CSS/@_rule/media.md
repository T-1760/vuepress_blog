---
sidebar: auto
title: CSS @media 媒介查询
date: 2023-10-18
tags:
 - CSS @media
 - 媒介查询
categories: 
 - CSS @ 规则
---

## @media
  - 当且仅当该媒体查询与正在使用其内容的设备匹配时，该 CSS 块样式应用于该文档
    + 使用设备若满足媒介查询的条件，则条件规则组里的规则生效
  - 语法：
    ```css
      @media MediaType_1, MediaType_2 [and|not|only] (媒体特性) {
        /*  <rule-list>  */
      }      
    ```
### 媒体类型
  - 媒体类型（media type）：描述设备的一般类别。
    + 除非使用 `not` 或 `only` 逻辑运算符，否则媒体类型是可选的，且（隐式地）应用 `all` 类型。
  - 媒体类型
    + `all`：所有设备 
    + `screen`：屏幕 
    + `print`：打印 
    + `projection`：投影 （将启用）
    + `handheld`：手持设备（将启用） 
    + `aural`：声音设备（将启用）
    ```css
      /* 多个媒体类型用 `,` 分隔 */
      @media screen, print{
        body {
          line-height: 1.2;
        }
      }
      
      @media only screen and (min-width: 320px) and (max-width: 480px) and (resolution: 150dpi) {
        body {
          line-height: 1.4;
        }
      }

      @media screen and (min-width: 900px) {
        .container {
          padding: 1rem 3rem;
        }
      }

      /* 嵌套至其他的 @ 条件规则中 */
      @supports (display: flex) {
        @media screen and (min-width: 900px) {
          .container {
            display: flex;
          }
        }
      }
    ```

### 逻辑运算符
  - 逻辑运算符（logical operator）：用于联合构造复杂的（多个用 `,` 分隔）媒体查询。
    + `not`
    + `and`
    + `only`
    + `or`
#### not
  - 用于否定媒体查询，若不满足条件，则返回 `true` 反之 `false`。
    + 如果在以 `,` 分隔的查询列表中，将仅否定应用了该查询的特定查询。
    + 如果使用 `not` 运算符，则还必须指定媒体类型。
#### and
  - 用于将多个媒体查询规则组合成单条媒体查询，
    + 当每个查询规则都成立时，则该条媒体查询为 `true`，还用于将媒体特性与媒体类型结合在一起。
    +  在第 3 版中，`not`关键字不能用于否定单个媒体特性表达式，只能用于否定整个媒体查询。

#### only
  - 仅在整个查询匹配时才应用样式。对向下浏览器兼容性友好。
    + 当不使用 `only` 时，较老浏览器会将 `screen and (max-width: 500px)` 简单理解 `screen`将忽略查询的其余部分，并将其样式应用于所有屏幕。
    + 如果使用 `only` 时，则还必须指定媒体类型。

#### or
  - 等价于 `,` 运算符。
    * 添加于媒体查询v4。

#### , 逗号
  - 逗号用于将多个媒体查询合并为一个规则。逗号分隔列表中的每个查询都与其他查询分开处理
    + 如果列表中的任一查询为 `true`，则整个媒体查询返回 `true`。
    + 列表的行为类似于 `or` 逻辑或运算符。

### 媒体特性
  - 媒体特性（media feature）：描述了用户代理、输出设备或环境的具体特征。媒体特性表达式是完全可选的
  - 媒体特性属性
    + `width`：视口的宽度（包括纵向滚动条）。
    + `min-width`：视口最小宽度
    + `max-width`：视口最大宽度
    + `height`：视口的高度（包括纵向滚动条）。
    + `min-height`：视口最小高度
    + `max-height`：视口最大高度
    + `orientation`：视口的旋转方向。
      * `landscape`：横屏
      * `portrait`：竖屏
    + `grid`：输出设备使用网格屏幕还是点阵屏幕？
    + `any-hover`：是否有任何可用的输入机制允许用户（鼠标等）悬停在元素上
      * 添加于媒体查询v4
    + `any-pointer`：可用的输入机制中是否有任何指针设备，如果有，它的精度如何？
      * 添加于媒体查询v4
    + `aspect-ratio`： 视口（viewport）的宽高比。
    + `color`：输出设备每个颜色分量的比特值，
      + 如果设备不支持输出彩色，则该值为 `0`。
    + `color-gamut`：用户代理和输出设备大致程度上支持的色域。
      * 添加于媒体查询v4
    + `color-index`：输出设备的颜色查询表（color lookup table）中的条目数量，
      * 如果设备不使用颜色查询表，则该值为 `0`。
    + `display-mode`：应用程序的显示模式，
      * 显示模式由 web 应用的清单（manifest）中的 `display` 成员所指定。
    + `dynamic-range`：用户代理和输出设备支持的亮度、对比度和色彩深度的组合。
      * 添加于媒体查询v5。
    + `forced-colors`：检测用户代理是否限制调色板。
      * 添加于媒体查询v5。
    + `hover`：主输入机制是否允许用户在元素上悬停。
      * 添加于媒体查询v4。
    + `inverted-colors`：用户代理或者底层操作系统是否反转了颜色。
      * 添加于媒体查询v5。
    + `monochrome`：输出设备单色帧缓冲区中每个像素的位深度。
      * 如果设备并非单色屏幕，则该值为 `0`。
    + `overflow-block`：输出设备如何处理沿块轴溢出视口的内容。
      * 添加于媒体查询v4。
    + `overflow-inline`：沿行轴溢出视口的内容是否可以滚动。
      * 添加于媒体查询v4。
    + `pointer`：主输入机制是一个指针设备吗？如果是，它的精度如何？
      * 添加于媒体查询v4。
    + `prefers-color-scheme`：用户倾向于选择亮色、暗色的（明暗）配色主题。
      + `light`：明亮（白昼）主题
      + `dark`：暗黑（夜间）主题
      * 添加于媒体查询v5。
    + `prefers-contrast`：用户是否有向系统调整相近颜色之间的对比度（内容色彩对比度）。
      + `no-preference`（默认值）：不作变化
      + `less`：使用对比度更低的界面
      + `more`：使用对比度更高的界面
      * 添加于媒体查询v5。
    + `prefers-reduced-motion`：用户是否希望页面上出现更少的动态效果（减弱动画效果）。
      * `reduce`：删除或替换掉一些（让部分视觉运动障碍者）不适的动画类型
      * 添加于媒体查询v5。
    + `resolution`：输出设备的像素密度（分辨率）。
    + `scripting`：检测脚本（如 JavaScript）是否可用。
      * 添加于媒体查询v5。
    + `video-dynamic-range`：用户代理的视频平面和输出设备支持的亮度、对比度及色彩深度的组合。
      * 添加于媒体查询v5。
  ```css
    @media screen and (min-width: 300px) and (max-width: 300px) {         

    }
    
    /* 媒体查询第 4 版新的范围语法 */
    @media (height > 600px) {
      body {
        line-height: 1.4;
      }
    }
    @media (400px <= width <= 700px) {
      body {
        line-height: 1.4;
      }
    }
    
    /* 明暗主题 */
    body {
      background: white;
      color: black;
    }
    @media (prefers-color-scheme: dark) {
      body {
        background: black;
        color: white;
      }
    }
    /* 内容色彩对比度 */
    body {
      background: #fff; // 文字与背景对比度为 5.74
      color: #666;
    }
    @media (prefers-contrast: more) {
      body {
        background: #fff; // 文字与背景对比度为 21
        color: #000;
      }
    }
  ```

## 无障碍考虑
  - 适应调整网站文本大小的用户，在媒体查询中推荐使用 `em` 单位。
    + `em` 和 `px` 都是有效单位，若用户更改浏览器文本大小，`em` 的效果会更好。
  - 使用媒体查询第 4 版 `prefers-reduced-motion` 以检测用户是否已请求系统最小化其使用的动画或动作。


## 参考资料
  - [MDN @media](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media)