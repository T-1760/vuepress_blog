---
sidebar: auto
title: HTML 元素属性
date: 2023-10-18
tags:
 - HTML 元素属性
 - HTML Attribute
categories: 
 - HTML
---

## 前言
  - HTML 中的元素属性（attribute）；包含了关于元素的一些额外信息
  - 这些额外的值可以配置元素或者以各种方式来调整元素的行为，

## HTML 元素属性分类
  - 在 HTML 中，大多数属性都有两个方面：**内容属性**和 **IDL 接口描述语言属性**。
### 内容属性
  - 内容属性常在内容（HTML 代码）中设置，也可通过 `element.setAttribute()` 或 `element.getAttribute()` 来设置。
### IDL 接口描述语言属性
  - IDL 属性（attribute）也就是 JavaScript 属性（property）, 也就是可通过 `element.foo` 来设置这些属性
  - IDL 属性本质时反映了内容属性
    + 获取 IDL 属性的值时，IDL 属性总会使用隐含的内容属性的值（可能先经过转换）来返回一个值。
    + 设置 IDL 属性的值时，设置值会保存在内容属性中。

## HTML 属性
  | 属性名 | 元素 | 描述 |
  |:--|:--|:--|
  | `accept` | `<form>`、`<input>` | 服务器接受内容（通常是文件类型）的列表。|
  | `accept-charset` |	`<form>` | 支持的字符集列表。|
  | `accesskey`	| 全局属性 | 用于激活或聚焦元素的键盘快捷键。|
  | `action` | `<form>` | 处理通过表单提交的信息的程序的 URI。|
  | `allow`	| `<iframe>` | 指定 iframe 的特性策略。|
  | `alt`	| `<area>`、`<img>`、`<input>` | 在图片无法显示时展示的替代文本。|
  | `async`	| `<script>` | 异步执行该脚本。|
  | `autocapitalize` | 全局属性 | 设置用户输入时是否自动大写。|
  | `autocomplete` | `<form>`、`<input>`、`<select>`、`<textarea>` | 指示浏览器是否可以自动填充表单中的值。|
  | `autofocus`	| `<button>`、`<input>`、`<select>`、`<textarea>` | 页面加载后，该元素应自动获得焦点。|
  | `autoplay` | `<audio>`、`<video>` | 音视频应该自动播放。|
  | `buffered` | `<audio>`、`<video>` | 包含已缓存媒体的时间范围。|
  | `capture` | `<input>`	| 来自 Media Capture 规范，指定一个新文件是否可以被捕获。|
  | `charset` | `<meta>` | 申明该页面或脚本的字符编码。|
  | `checked` | `<input>` | 指出该元素在页面加载后是否处于选中状态。|
  | `cite` | `<blockquote>`、`<del>`、`<ins>`、`<q>` | 包含一个指明引用或修改的来源的 URI。|
  | `class` |	全局属性 | 通常和 CSS 配合使用，使用常用属性来为元素添加样式。|
  | `cols` | `<textarea>` | 定义一个 `textarea` 中包含多少列。|
  | `colspan` | `<td>`、`<th>` | `colspan` 属性定义了一个单元格跨越的列数。|
  | `content` | `<meta>` | 与 `http-equiv` 或 `name` 关联的值，取决于上下文。|
  | `contenteditable`	| 全局属性 | 指示该元素的内容是否可以被编辑。|
  | `controls` | `<audio>`、`<video>` | 指示浏览器是否应该向用户显示播放控件。|
  | `coords` | `<area>` | 指定热点区域坐标的一组值。|
  | `crossorigin` | `<audio>`、`<img>`、`<link>`、`<script>`、`<video>` | 元素如何处理跨源请求。|
  | `data` | `<object>` | 指定资源的 URL。|
  | `data-*` | 全局属性 | 允许你对一个 HTML 元素附加自定义的属性。|
  | `datetime` | `<del>`、`<ins>`、`<time>` | 指示与元素关联的日期和时间。|
  | `decoding` | `<img>` | 指示解码图像的首选方法。|
  | `default` | `<track>` | 指示应启用该轨道，除非与用户首选项指示的不同。|
  | `defer` | `<script>` | 指示该脚本应在页面解析后执行。|
  | `dir` | 全局属性 | 定义文本的方向。允许的值有 ltr（从左到右）或 rtl（从右到左）。|
  | `disabled` | `<button>`、`<fieldset>`、`<input>`、`<optgroup>`、`<option>`、`<select>`、`<textarea>` | 指示用户是否可以与该元素交互。|
  | `download` | `<a>`、`<area>` | 指示用于下载资源的超链接。|
  | `draggable` | 全局属性 | 定义元素是否可以被拖拽。|
  | `enctype` | `<form>` | 定义 method 为 POST 时，表单数据的内容类型。|
  | `for` |	`<label>`、`<output>` |	描述与当前元素绑定的元素。|
  | `height` | `<canvas>`、`<embed>`、`<iframe>`、`<img>`、`<input>`、`<object>`、`<video>`	| 指定元素的高度 ||
  | `hidden` | 全局属性 | 阻止对给定元素的渲染，同时保持子元素（例如脚本元素）处于激活状态。|
  | `high` | `<meter>` | 指示高值区间的下限值。|
  | `href` | `<a>`、`<area>`、`<base>`、`<link>` | 关联资源的 URL。|
  | `hreflang` | `<a>`、`<link>` | 指定关联资源的语言。|
  | `http-equiv` | `<meta>` | 定义编译程序指令（pragma directive）。|
  | `id` | 全局属性 | 通常与 CSS 一起使用，以为特定元素添加样式。此属性的值必须是唯一的。|
  | `integrity` | `<link>`、`<script>` | 指定子资源完整性值，允许浏览器验证它们获取的内容。|
  | `ismap` | `<img>` | 指示图像是服务器端图像映射（image map）的一部分。|
  | `kind` | `<track>` | 指定文本字幕的类型。|
  | `label` | `<optgroup>`、`<option>`、`<track>` | 为元素指定用户可读的标题。|
  | `lang` | 全局属性 | 定义元素中使用的语言。|
  | `list` | `<input>` | 指示建议用户输入的预定义选项列表。|
  | `loop` | `<audio>`、`<marquee>`、`<video>` | 指示媒体在播放结束时是否应从头开始播放。|
  | `low` | `<meter>`	| 指示低值区间的上限值。|
  | `max`	| `<input>`、`<meter>`、`<progress>` | 指示允许的最大值。|
  | `maxlength`	| `<input>`、`<textarea>` | 定义元素中允许的最大字符数。|
  | `minlength`	| `<input>`、`<textarea>`	| 定义元素中允许的最小字符数。|
  | `media`	| `<a>`、`<area>`、`<link>`、`<source>`、`<style>` | 指定链接资源所设计的媒体的提示。|
  | `method` | `<form>`	| 定义用于提交表单的 HTTP 方法。可以是 GET（默认）或 POST。|
  | `min` |	`<input>`、`<meter>` | 指示允许的最小值。|
  | `multiple` | `<input>`、`<select>` | 指示是否可以在 email 或 file 类型的输入中输入多个值。|
  | `muted`	| `<audio>`、`<video>` | 指示页面加载时音频是否会被静音。|
  | `name` | `<button>`、`<form>`、`<fieldset>`、`<iframe>`、`<input>`、`<object>`、`<output>`、`<select>`、`<textarea>`、`<map>`、`<meta>`、`<param>`	| 元素的名称。例如，用于服务器标识表单提交中的字段。|
  | `novalidate` | `<form>`	| 此属性指示在提交表单时不应验证表单。|
  | `open` | `<details>`、`<dialog>` | （用于 `<details>` 元素）指示内容目前是否可见或 （用于 `<dialog>` 元素）对话框是否处于活动状态且可以与之交互。| |
  | `optimum` | `<meter>`	| 指示最佳数值。|
  | `pattern`	| `<input>`	| 定义用于验证元素值的正则表达式。|
  | `ping` | `<a>`、`<area>` | `ping` 属性指定一个用空格分隔的 URL 列表，以便在用户访问超链接时通知这些 URL。|
  | `placeholder` |	`<input>`、`<textarea>`	| 提供用于告诉用户可以在字段中输入什么的提示。|
  | `laysinline` | `<video>` | 布尔属性，指示视频是否要“内嵌”播放（即：在元素的播放区域内播放）。请注意，该属性的缺失并不意味着视频将始终以全屏模式播放。|
  | `poster` | `<video>` | 用于指示在用户播放或搜索之前要显示的海报帧的 URL。|
  | `preload` | `<audio>`、`<video>` | 指示是否应预加载整个资源、部分资源或者不预加载。|
  | `readonly` | `<input>`、`<textarea>` | 指示元素是否可以被编辑。|
  | `referrerpolicy` | `<a>`、`<area>`、`<iframe>`、`<img>`、`<link>`、`<script>` | 指定在获取资源时发送哪个引荐来源（referrer）。|
  | `rel` | `<a>`、`<area>`、`<link>` | 指示目标对象与链接对象的关系。|
  | `required` | `<input>`、`<select>`、`<textarea>` | 指示是否必须填写此元素。|
  | `reversed` | `<ol>` | 指示列表是否应以降序而不是升序显示。|
  | `role` | 全局属性 | 定义元素的显式角色，供辅助技术使用。|
  | `rows` | `<textarea>` | 定义文本区域的行数。|
  | `rowspan` | `<td>`、`<th>` | 定义表格单元格应跨越的行数。|
  | `sandbox` | `<iframe>` | 阻止在 `iframe` 中加载的文档使用某些特性（例如提交表单或打开新窗口）。|
  | `scope` | `<th>` | 定义（ `th` 元素）表头单元格所关联的单元格。|
  | `selected` | `<option>` | 定义页面加载时将被选中的值。|
  | `size` | `<input>`、`<select>` | 定义元素的宽度（以像素为单位）。如果元素的 `type` 属性是 `text` 或 `password`，则它是字符数。|
  | `slot` | 全局属性 | 为影子 DOM（shadow DOM）影子树中的插槽分配一个元素。|
  | `spellcheck` | 全局属性 | 指示是否允许对元素进行拼写检查。|
  | `src` | `<audio>`、`<embed>`、`<iframe>`、`<img>`、`<input>`、`<script>`、`<source>`、`<track>`、`<video>` | 可嵌入内容的 URL。|
  | `srcset` | `<img>`、`<source>` | 一个或多个响应式图像候选项。|
  | `start` | `<ol>` | 定义除 1 以外的第一个数字。|
  | `style` | 全局属性 | 定义将覆盖先前设置的 CSS 样式。|
  | `tabindex` | 全局属性 | 使用指定的聚焦（tab）顺序覆盖浏览器的默认聚焦顺序。|
  | `target` | `<a>`、`<area>`、`<base>`、`<form>` | （用于 `<a>` 元素）指定打开链接文档的位置或（用于 `<form>` 元素）显示接收到的响应的位置。|
  | `title` | 全局属性 | 在鼠标悬停在元素上时显示的提示文本。|
  | `translate` | 全局属性 | 指定当页面本地化时，元素的属性值和其文本节点后代的值是否应该被翻译，或者是否应该保持不变。|
  | `type` | `<button>`、`<input>`、`<embed>`、`<object>`、`<ol>`、`<script>`、`<source>`、`<style>`、`<menu>`、`<link>` |定义元素的类型。|
  | `value`	| `<button>`、`<data>`、`<input>`、`<li>`、`<meter>`、`<option>`、`<progress>`、`<param>`	定义页面加载时元素中显示的默认值。|
  | `width`	| `<canvas>`、`<embed>`、`<iframe>`、`<img>`、`<input>`、`<object>`、`<video>	` | 确定此处所列元素的宽度。|
  | `wrap` | `<textarea>` | 指示文本是否应该换行。|

## HTML 全局属性
  - 全局属性：是所有 HTML 元素共有的属性；可以用于所有元素，即使属性可能对某些元素不起作用。
### accesskey 快捷键属性
  - 为当前元素提供一个生成键盘快捷键的提示。
  - 该属性由一个空格分隔的字符列表组成。浏览器应该使用计算机键盘布局上存在的第一个字符。
### autocapitalize 自动大写属性
  - 控制用户的文本输入是否和如何自动大写，属性值如下：
    + `off` 或 `none`：不应用自动大写（所有字母都默认为小写字母）。
    + `on` 或 `sentences`：每个句子的第一个字母默认为大写字母，所有其他字母都默认为小写字母。
    + `words`：每个单词的第一个字母默认为大写字母，所有其他字母都默认为小写字母。
    + `characters`：所有的字母都应该默认为大写。
### autofocus 自动聚焦属性
  - 表示一个元素将在页面加载时自动聚焦，或者在其所属的 `<dialog>` 显示时被聚焦。
  - 该属性是一个布尔值，初始化为 `false`。
### class 类名属性
  - 以空格分隔的元素的类名列表，
  - 它允许 CSS 通过类选择器来选择和访问特定的元素。
  - 它允许 Javascript 通过 DOM 方法 `document.getElementsByClassName()` 来选择和访问特定的元素。
### contenteditable 可编辑属性
  - 表示元素是否可被用户编辑。
  - 若可以枚举，浏览器会调整元素的部件以允许编辑。属性值如下：
    + `true` 或者 `''` 空字符串：表明元素是可被编辑的；
    + `false`，表明元素不能被编辑。
### data-* 自定义数据属性
  - 允许在 HTML 和其 DOM 表示之间交换专有信息，可由脚本使用。
  - 所有自定义数据属性，通过所属元素的 `HTMLElement.dataset` 属性可以访问它们。
### dir 文本方向属性
  - 一个指示元素中文本方向的枚举属性。属性值如下：
    + `ltr`：指从左到右，用于那种从左向右书写的语言（例：汉语）；
    + `rtl`：指从右到左，用于那种从右向左书写的语言（例：阿拉伯语）；
    + `auto`：指由用户代理决定方向。它在解析元素中字符时会运用一个基本算法，直到发现一个具有强方向性的字符，然后将这一方向应用于整个元素。
### draggable 拖拽属性
  - 一种枚举属性，指示是否可以使用 `Drag and Drop API` 拖动元素。属性值如下：
    + `true`: 这表明元素可被拖动；
    + `false`: 这表明元素不可被拖动。
### enterkeyhint 回车键属性
  - 提示在虚拟键盘上为回车键呈现什么动作标签（或图标）。
### hidden 隐藏属性
  - 一个枚举的属性，表示该元素还没有，或者不再相关。浏览器不会渲染这样的元素。这个属性不能用来隐藏可以合法显示的内容。
  - 使用场景：可用于隐藏页面中的元素，这些元素在登录过程完成之前不能使用。
### id 唯一标识符属性
  - 定义唯一标识符（ID），该标识符在整个文档中必须是唯一的。
  - 目的是在链接（使用片段标识符），脚本或样式（使用 CSS）时标识元素。  
### inert 忽略输入事件属性
  - 一个布尔值，使浏览器忽略该元素的用户输入事件。常在点击事件的情景使用。
### inputmode 虚拟键盘类型属性
  - 向浏览器提供有关在编辑此元素或其内容时要使用的虚拟键盘配置类型的提示。
  - 常用于 `<input>` 元素，但在 `contenteditable` 模式下可用于任何元素。
### is 自定义元素属性
  - 允许指定标准 HTML 元素的行为如同已注册的自定义内置元素一样
  
### itemid 项唯一标识符属性
  - 项的唯一全局标识符。
### itemprop 增添项属性
  - 用于向项添加属性。
  - 每个 HTML 元素都可以指定一个 `itemprop` 属性，其属性值由一个名称和值对组成。

### itemref
  - 只有不是具有 `itemscope` 属性的元素的后代，它的属性才可以与使用 `itemref` 项目相关联。
  - 它提供了元素 ID 列表（而非 itemid）以及文档中其他位置的其他属性。

### itemscope
  - 通常 `itemscope` 与 `itemtype` 搭配使用，以指定包含在关于特定项目代码块中的 HTML。
  - `itemscope` 创建数据项并定义与之关联的 `itemtype` 的范围。
  - `itemtype` 是描述项及其属性上下文的词汇表（例如 `schema.org`）的有效 URL。

### itemtype
  - 指定将用于在数据结构中定义 `itemprops`（项属性）的词汇表的 URL。
  - `itemscope` 用于设置数据结构中按 `itemtype` 设置的词汇表的生效范围。

### lang 语言属性
  - 帮助定义元素的语言：不可编辑元素所在的语言，或者由用户编写的可编辑元素的语言。
  - 该属性包含一个“语言标记”（由用`-`分隔的“语言子标记”组成）。`xml:lang` 优先于它。
    + 例：`<html lang="zh-CN">`
### nonce 
  - 一个加密的 `nonce`（“只使用一次的数字”），可以被内容安全策略使用，以确定是否允许进行给定的获取。

### part 空格分隔属性
  - 元素的部件名称的空格分隔列表。
  - Part 名称允许 CSS 通过 `::part` 伪元素选择和设置影子树中的特定元素。

### popover 弹框属性
  - 用于将某个元素指定为弹出式元素（可参阅 `Popover API`）。
  - 弹出式元素通过 `display: none` 隐藏，直到通过调用/控制元素（即 `<button> `、` <input type="button">` 带有 `popovertarget` 属性）或 `HTMLElement.showPopover()`  调用而打开。

### Role 
  - Role 定义了内容的语义，允许屏幕阅读器和其他工具以符合用户对该类型对象的期望的方式来展示和支持与该对象的互动。
  - roles 以 `role="role_type"` 的形式添加到 HTML 元素中，其中 `role_type` 是 ARIA 规范中的一个角色名称。

### slot 插槽属性
  - 将影子 DOM 影子树中的一个空槽分配给一个元素：具有 `slot` 属性的元素被分配给由 `<slot>` 元素创建的空槽，其 `name` 属性的值与 `slot` 属性的值匹配。

### spellcheck 拼写检查属性
  - 枚举属性，定义是否可以检查元素是否存在拼写错误。属性值如下：
    + `true` 或 `''` 空字符串：表示如果可能，应检查元素是否存在拼写错误；
    + `false`：表示不应检查元素的拼写错误。

### style 样式属性
  - 含有要应用于元素的 CSS 样式声明。
  - 提示：建议在单独的文件中定义样式。该属性和 `<style>` 元素主要用于快速添加样式，

### tabindex 索引定位属性
  - 整数属性，指示元素是否可以获取输入焦点（可聚焦），是否应该参与顺序键盘导航，如果是，则表示哪个位置。属性值如下：
    + 负值：表示该元素应该是可聚焦的，但不应通过顺序键盘导航到达;
    + 0: 表示元素应通过顺序键盘导航可聚焦和可到达，但其相对顺序由平台约定定义;
    + 正值：意味着元素应该可以通过顺序键盘导航进行聚焦和访问；元素聚焦的顺序是 `tabindex` 的增加值。如果多个元素共享相同的 `tabindex`，则它们的相对顺序遵循它们在文档中的相对位置。

### title 提示信息属性
  - 包含表示与其所属元素相关信息的文本。通常作为提示呈现给用户，但不是必须的。

### translate 转换属性
  - 枚举属性，用于指定在页面本地化时是否转换元素的属性值及其 Text 节点子节点的值，或者是否保持它们不变。属性值如下：
    + `yes` 或 `''` 空字符串：表示元素将被翻译。
    + `no`：表示该元素不会被翻译。

### virtualkeyboardpolicy 虚拟键盘行为属性
  - 用于控制屏幕上的虚拟键盘行为的枚举属性，
  - 如平板电脑、手机或其他设备上的硬件键盘可能无法使用的元素，也使用 `contenteditable` 属性。属性值如下：
  + `auto` 或 `''` 空字符串：当元素被聚焦或点击时自动显示虚拟键盘。
  + `manual`：它将焦点和元素上的点击与虚拟键盘的状态解耦。

### 基本的 HTML 全局属性之外的其他全局属性
  - `xml:lang` 和 `xml:base`：两者都是从 XHTML 规范继承且被弃用，但为了兼容性而被保留的。
  - ARIA `role` 和多重 `aria-*` 状态和属性，用于保证无障碍。
  - 事件处理器属性：
    + `onabort`
    + `onautocomplete`
    + `onautocompleteerror`
    + `onblur`
    + `oncancel`
    + `oncanplay`
    + `oncanplaythrough`
    + `onchange`
    + `onclick`
    + `onclose`
    + `oncontextmenu`
    + `oncuechange`
    + `ondblclick`
    + `ondrag`
    + `ondragend`
    + `ondragenter`
    + `ondragleave`
    + `ondragover`
    + `ondragstart`
    + `ondrop`
    + `ondurationchange`
    + `onemptied`
    + `onended`
    + `onerror`
    + `onfocus`
    + `oninput`
    + `oninvalid`
    + `onkeydown`
    + `onkeypress`
    + `onkeyup`
    + `onload`
    + `onloadeddata`
    + `onloadedmetadata`
    + `onloadstart`
    + `onmousedown`
    + `onmouseenter`
    + `onmouseleave`
    + `onmousemove`
    + `onmouseout`
    + `onmouseover`
    + `onmouseup`
    + `onmousewheel`
    + `onpause`
    + `onplay`
    + `onplaying`
    + `onprogress`
    + `onratechange`
    + `onreset`
    + `onresize`
    + `onscroll`
    + `onseeked`
    + `onseeking`
    + `onselect`
    + `onshow`
    + `onsort`
    + `onstalled`
    + `onsubmit`
    + `onsuspend`
    + `ontimeupdate`
    + `ontoggle`
    + `onvolumechange`
    + `onwaiting`
  
## 参考资料
  - [MDN HTML 属性参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes)
  - [MDN HTML 全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)