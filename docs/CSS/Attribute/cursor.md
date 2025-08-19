---
sidebar: auto
title: CSS cursor 鼠标形状属性
date: 2023-10-18
tags:
 - cursor 鼠标形状属性
 - cursor
categories: 
 - CSS 属性
---

## cursor 语法
  -  `cursor: [ [ <url> | <url-set> ]  [关键字值]`
  
### 关键字值
  - Firefox bug 275173 在 Windows 或 Mac OS X 中 `no-drop` 与 `not-allowed` 相同.
  - Firefox bug 275174 在 Windows 中 `all-scroll` 与 `move` 相同.
    | 类型 | CSS 值 | 例子 | 描述 |
    |:--|:--|:--|:--|
    | 常用      | auto         |  | 浏览器根据当前内容决定指针样式。例：文字内容则使用 text 样式 |
    |           | default      | ![default.gif] | 默认指针，通常是箭头。|
    |           | none         |  | 无指针被渲染 |
    | 链接及状态 | context-menu	| ![context-menu.png] | 指针下有可用内容目录。|
    |           | help         | ![help.gif] | 指示帮助 |
    |           | pointer      | ![pointer.gif] | 悬浮于连接上时，通常为手 |
    |           | progress     | ![progress.gif] | 程序后台繁忙，用户仍可交互 (与wait 相反). |
    |           | wait         | ![wait.gif] | 程序繁忙，用户不可交互 (与progress 相反).图标一般为沙漏或者表。 |
    | 选择      | cell         | ![cell.gif] | 指示单元格可被选中 |
    |           | crosshair    | ![crosshair.gif] | 交叉指针，通常指示位图中的框选 |
    |           | text         | ![text.gif] | 指示文字可被选中 |
    |           | vertical-text | ![vertical-text.gif] | 指示垂直文字可被选中 |
    | 拖拽      | alias        | ![alias.gif] | 复制或快捷方式将要被创建 |
    |           | copy         | ![copy.gif] | 指示可复制 |
    |           | move         | ![move.gif] | 被悬浮的物体可被移动 |
    |           | no-drop      | ![no-drop.gif] | 当前位置不能扔下 |
    |           | not-allowed  | ![not-allowed.gif] | 不能执行 |
    |           | grab         | ![grab.gif] | 可抓取 （较新，参考浏览器兼容表） |
    |           | grabbing     | ![grabbing.gif] | 抓取中 （较新，参考浏览器兼容表）|
    | 重设大小及滚动 | all-scroll  | ![all-scroll.gif] | 元素可任意方向滚动（平移）|
    |               | col-resize  | ![col-resize.gif] | 元素可被重设宽度。通常被渲染为中间有一条竖线分割的左右两个箭头 |
    |               | row-resize  | ![row-resize.gif] | 元素可被重设高度。通常被渲染为中间有一条横线分割的上下两个箭头 | 
    |               | n-resize    | ![n-resize] | 某条边将被移动。例如元素盒的东南角被移动时使用 se-resize | 
    |               | e-resize    | ![e-resize] |
    |               | s-resize    | ![s-resize] |
    |               | w-resize    | ![w-resize] |
    |               | ne-resize   | ![ne-resize] |
    |               | nw-resize   | ![nw-resize] |
    |               | se-resize   | ![se-resize] |
    |               | sw-resize   | ![sw-resize] |
    |               | ew-resize   | ![3-resize.gif] | 指示双向重新设置大小 |
    |               | ns-resize   | ![6-resize.gif] |  |
    |               | nesw-resize | ![1-resize.gif] |  |
    |               | nwse-resize | ![4-resize.gif] |  |
    | 缩放          | zoom-in | ![zoom-in.gif] |	指示可被放大或缩小 |
    |               | zoom-out | ![zoom-out.gif] |

## 参考资料
  - [MDN CSS sursor](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor)


[default.gif]:https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/default.gif
[context-menu.png]:https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/context-menu.png
[help.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/help.gif "问号形"
[pointer.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/pointer.gif
[progress.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/progress.gif
[wait.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/wait.gif "沙漏形"
[cell.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/cell.gif
[crosshair.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/crosshair.gif "十字形 "
[text.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/text.gif "文本形"
[vertical-text.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/vertical-text.gif
[alias.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/alias.gif
[copy.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/copy.gif
[move.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/move.gif "十字箭头形"
[no-drop.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/no-drop.gif
[not-allowed.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/not-allowed.gif
[grab.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/grab.gif
[grabbing.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/grabbing.gif
[all-scroll.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/all-scroll.gif
[col-resize.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/col-resize.gif
[row-resize.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/row-resize.gif
[n-resize]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/n-resize.gif "上箭头形"
[e-resize]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/e-resize.gif "右箭头形"
[s-resize]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/s-resize.gif "下箭头形"
[w-resize]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/w-resize.gif "左箭头形"
[ne-resize]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/ne-resize.gif "右上箭头形"
[nw-resize]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/nw-resize.gif "左上箭头形"
[se-resize]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/se-resize.gif "右下箭头形"
[sw-resize]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/sw-resize.gif "左下箭头形"
[1-resize.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/1-resize.gif
[3-resize.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/3-resize.gif
[4-resize.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/4-resize.gif
[6-resize.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/6-resize.gif
[zoom-in.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/zoom-in.gif
[zoom-out.gif]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/zoom-out.gif