---
sidebar: auto
title: Naming conventions 命名规范
date: 2023-10-18
tags:
 - Naming conventions
 - 命名规范
categories: 
 - 开发规范
---

## General specification 通用规范
  - 常见命名规则必须遵循以下规则：
    + 见名知义
    + 名称只能由字母、数字、`_`下划线组成. 但不能以数字开头.

### 命名方法的类别
  - 蛇形命名法 snake case
    + 使用 `_` 下划线连接（即：下划线命名法。
    + 小蛇形：`user_name`
    + 大蛇形：`USER_NAME`
  - 骆驼式命名法 camel case
    + 只由大小写字母组成，根据首位的大小写又分为大驼峰、小驼峰。
    + 大驼峰：`UserName`
    + 小驼峰：`userName`
  - 驼峰蛇形命名法
    + 结合 “驼峰” 和 “蛇形” 两种命名法组合而成
    + 示例：`user_Name`、 `User_Name`
  - 帕斯卡命名法 Pascal case
    + 所有单词首字母都大写，等同于“大驼峰命名法”
    + 示例：`UserName`
  - 匈牙利命名法 HN case
    + 基于容易记忆容易理解的原则，连贯性的去取每一个明确含义对象名称的全称或一部分。
    + 顺序公式：属性 + 类型 + 描述
    + 示例：
      ``` C++
        int iMyAge;  // “i”是 int 类型的缩写；
        char cMyName[10];  // “c” 是 char 类型的缩写； 
        float fMyHeight;  // “f” 是 float 类型的缩写；
        bool b_my_sex;        
      ```
      ```js
        lAccountNum 	// 变量是 long int 类型
        arru8NumberList // arr 表示数组，u8 表示 uint8，所以整个变量表示 uint8 数组
        bBusy 			// 布尔类型
      ```
    + 常见的前缀类型
      | 前缀 | 全称 | 含义 |
      |:--|:--|:--|
      | `arr` | Array   | 数组 |
      | `b`   | Boolean | 布尔值 |
      | `by`  | Byte    | 字节 |
      | `ch`  | Char    | 字符 |
      | `f`   | Float   | 浮点型 |
      | `fn`  | Function  | 函数 |
      | `h`   | Handle  | 句柄 |
      | `i`   | Int     | 整型 |
      | `l`   | Long Int  | 长整型 |
      | `u`   | Unsigned Int    | 无符号整型 |
      | `u8`  | Unsigned Int8   | 无符号 8 位整型 |
      | `u16` | Unsigned Int16  | 无符号 16 位整型 |
      | `u32` | Unsigned Int32  | 无符号 32 位整型 |
      | `p`   | Pointer       | 指针 |
      | `lp`  | Long Pointer  | 长指针 |
      | `s`   | String        | 字符串 |
      | `w`   | Word          | 字 |
      | `dw`  | Double Word   | 双字 |
  - 脊柱命名法 spinal case
    + 使用 `-` 中划线连接。又称：kebab case 烤串式命名法、train case 列式命名法
    + 小脊柱：`user-name`
    + 大脊柱：`USER-NAME`
  - 自由命名法 studly caps
    + 大小写混杂、无简明规则，又称：sticky caps
    + 示例：`UserNAME`、`STudlyCaPs`、`NeXT`

#### 蛇形命名法
  - snake_case 蛇形命名法：全由小写字母和下划线组成，在两个单词之间用下滑线连接即可。
    + 常用于：测试方法名、常量、枚举名称等。
  - 示例：
    ```java
      first_name
      last_name
      MAX_ITERATION
      LAST_DATA
    ```

#### 骆驼式命名法
  - `Camel Case` 骆驼式命名法：是电脑程式编写时的一套命名规则（惯例）。
    + 正如它的名称 CamelCase 所表示的那样，是指混合使用大小写字母来构成变量和函数的名字。
    + 程序员们为了各自代码能更容易与同行之间交流，所以多采取统一的可读性比较好的命名方式。
  - 驼峰式命名法可分为：
      1. `lowerCamelCase` 小驼峰命名法
      1. `CamelCase` 大驼峰命名法

##### 小驼峰命名法
  - `lowerCamelCase` 小驼峰命名法：除第一个单词之外，其他单词首字母大写。
    + 常用于：方法名、参数名、成员变量、局部变量等。
  - 示例:
    ```java
      getUserInfo()
      createCustomThreadPool()
      findAllByUserName(String userName)
      TaskRepository taskRepository;
    ```

##### 大驼峰命名法
  - `CamelCase` 大驼峰命名法（即：帕斯卡命名法）：相比小驼峰法，大驼峰法把第一个单词的首字母也大写了。
    + 常用于：类名，命名空间等。
  - 示例：
    ```java
      class TaskDateToSend{}
      class TaskLabelToSend{}
      SettingRepository
    ```

#### 烤串式命名法
  - kebab-case 烤串式命名法: 各个单词之间通过 `-` 中划线连接，
    + 常用于：项目文件夹名称、 HTTP 头式、 CSS 属性名和属性值、
  - 示例：
    ```txt
      my-project-name
      my-component
      module-user
      module-order
      
      Content-Type
      User-Agent 

      mydeployment-pod-0.yaml // K8S 的资源配置文件
    ```

### 项目命名
  - 采用小写方式
  - 最好一个单词描述
  - 多个单词描述
    + 名词 + 动词
    + 使用烤串式命名法，`-`中划线连接多个单词
  - 示例
    ```txt
      mobile-advertisement 移动广告
      mobile-social 移动社交
      mobile-bussiness 移动电子商务
      mobile-reading 移动电子阅读
      mobile-search 手机搜索
      mobile-pay 移动支付
      mobile-share 手机内容共享
      share-to-friends
      share-to-community
      weex-pay
      alipay-pay
      user-integral
    ```
  
### 目录命名
  - 采用小写方式
  - 最好一个单词描述，复数结构采用复数命名法.
  - 多个单词描述
    + 名词 + 动词
    + 使用烤串式命名法，`-`中划线连接多个单词
  - 常见目录命名
    | 目录名 | 含义 |
    |:--|:--|
    | config | 配置文件 |
    | src | 源代码，source 简写 |
    | docs | 文档,  documents 简写 |
    | lib | 库文件，library 简写 |
    | dist | 用来放打包编译后的文件，distribution 简写 |
    | build / scripts | 构建脚本 |
    | utils / tools / helpers | 工具代码 |
    | models | 模型层 |
    | views | 视图层 |
    | controllers | 控制器 |
    | middlewares | 中间件 |
    | router | 路由 |
    | server | 用来放服务端代码 |
    | adapters | 适配器，适配器设计模式 |
    | legacy | 一般用来放兼容历史版本或兼容旧浏览器的代码 |
    | test / `__tests__` 测试文件 |
    | benchmarks | 基准测试或性能测试。用来测试版本的性能变化 |
    | unit / spec | 单元测试，一般在 test 目录下 |
    | e2e | 端对端测试，一般在 test 目录下 |
    | assets / vendor | 资源，一般用来放图片或 css 文件 |
    | static | 静态资源 |
    | examples / demo | 示例 |
    | layouts | 布局 |
    | components | 组件 |
    | plugins | 插件 |
    | bin | 命令脚本，命令行工具经常会用到 |
    | common | 公用的文件 |
    | packages | 项目会打包出多个 npm 包，用来减小体积，一般会用 packages 来放不同的包 |
    | misc | 杂项，miscellaneous 简写 |
    | core | 核心文件 |

### 文件命名
  - 采用小写方式
  - 最好一个单词描述
  - 多个单词描述
    + 名词 + 动词
    + 静态文件（.png/.ttf） `_` 下划线，编译文件 `-` 短横线
  - 图片文件
    + 第一部分：图片的逻辑归属分类 
    + 第二部分：图片的表现内容 
    + 第三部分：图片的内容类型
    + 第四部分[可选]：图片的表现状态。 
    + 示例：tabbar_home_icon、 navigationbar_showtime_icon@2x.png、 tabbar_categories_icon、 banner_sina.gif、 menu_aboutus.gif、 title_news.gif
  - 示例
    ```txt
      index.js
      account-model.js
    ```
### 变量名、常量名、函数方法名、类名、事件名
#### 变量命名 variableCase
  - 变量是指在程序运行中可以改变其值的量
  - 采用小驼峰命名法
    + 不论是类成员变量还是全局变量，均不使用 `m` 或 `g` 前缀。
    + 私有类成员使用单一下划线前缀标识。
    + 变量名不应带有类型信息（动态类型语言：JavaScript、Python）
      * 如 iValue、names_list、dict_obj 等都是不好的命名。
  - 名词复数。统一风格，加 `s` 或 `List` 尾缀，
    + 变量名建议使用 `s` 尾缀，
    + 函数名建议使用 `List` 尾缀；
#### 常量命名 CONSTANT_CASE
  - 常量是在作用域内保持不变的值
  - 采用大蛇形命名法（作为方法参数时除外），由 `_` 下划线连接各个单词
    + 如：MAX_OVERFLOW，TOTAL。
  - Java 编程语言, 一般使用 `final` 进行修饰。一般分为三种，
    + 全局常量（`public static final` 修饰），
    + 类内常量（`private static final` 修饰）
    + 局部常量（方法内，或者参数中的常量），局部常量比较特殊，通常采用小驼峰命名即可。 

####  函数方法命名
  - 命名规范：动词 + 名词
  - 示例
    ```js
      login()
      logout()
      expandList()
      getTotal()
      keySearch()
      submitForm()
      cancel()
      goMore()
      searchAll()
      searchCurrent()
      clearContent()
      uploadImage()
      searchResult()
    ```

#### 事件名
  - 命名规范：handle + 名称[可选]+ 动词
  - 示例
    ```js
      handleItemClick () {},
      handleItemHover () {}
    ```

### 常用命名单词锦集
#### 命名简写
  | 缩写 | 说明 |
  |:--|:--|
  | alloc   | Allocate | 分配 |
  | dealloc | Deallocate | 释放 | 
  | app     | Applicant | 应用程序 |
  | calc    | Calculate | 计算 |
  | init    | Initialize | 初始化 |
  | horiz   | Horizontal | 水平的 |
  | vert    | Vertical | 垂直的 |
  | func    | Function | 方法 |
  | info    | Information | 信息 |
  | max     | Maximum | 最大值 | 
  | min     | Minimum | 最小值 | 
  | msg     | Message | 通知、消息 | 
  | temp    | Temporary | 临时的 |  

#### 前置对仗词
  - 位于变量前置部分，用于修饰后面的名词
    | 名称 | 含义 |
    |:---|:---|
    | begin  | end |
    | first  | last |
    | locked | unlocked |
    | min    | max |
    | next   | previous |
    | old    | new |
    | opened | closed |
    | visible | invisible |
    | source | target |
    | source | destination |
    | up     | down |

#### 后置限定词
  - 后置限定词。描述名词的作用范围属性
    + 请求入参：xxxQuery、xxxRequest
    + 返回结果：xxxResponse、xxxResult
    + 传参数据：xxxDTO、xxxVO、xxxInfo
    + 运算结果：xxxTotal（总和）/xxxMax（最大值）/xxxAverage（平均值）

#### 成对动词 
  | 名称 | 含义 | 名称 | 含义 | 
  |:---|:---|:---|:---|
  | get | 获取 | set | 设置 | 
  | add | 增加 | remove | 删除 | 
  | create | 创建 | destory | 移除 | 
  | create | 创建 | destroy | 销毁 | 
  | insert | 插入 | delete | 移除 | 
  | add | 加入 | append | 添加 | 
  | increase | 增加 | decrease | 减少 | 
  | clean | 清理 | clear | 清除 | 
  | start | 启动 | stop | 停止 | 
  | open | 打开 | close | 关闭 | 
  | read | 读取 | write | 写入 | 
  | load | 载入 | save | 保存 | 
  | begin | 开始 | end | 结束 | 
  | begin | 起始 | end | 结束 | 
  | start | 开始 | finish | 完成 | 
  | backup | 备份 | restore | 恢复 | 
  | import | 导入 | export | 导出 | 
  | split | 分割 | merge | 合并 | 
  | inject | 注入 | extract | 提取 | 
  | attach | 附着 | detach | 脱离 | 
  | bind | 绑定 | separate | 分离 | 
  | view | 查看 | browse | 浏览 | 
  | edit | 编辑 | modify | 修改 | 
  | select | 选取 | mark | 标记 | 
  | copy | 复制 | paste | 粘贴 | 
  | undo | 撤销 | redo | 重做 | 
  | index | 索引 | sort | 排序 | 
  | find | 查找 | search | 搜索 | 
  | play | 播放 | pause | 暂停 | 
  | launch | 启动 | run | 运行 | 
  | compile | 编译 | execute | 执行 | 
  | debug | 调试 | trace | 跟踪 | 
  | observe | 观察 | listen | 监听 | 
  | build | 构建 | publish | 发布 | 
  | input | 输入 | output | 输出 | 
  | encode | 编码 | decode | 解码 | 
  | encrypt | 加密 | decrypt | 解密 | 
  | compress | 压缩 | decompress | 解压缩 | 
  | pack | 打包 | unpack | 解包 | 
  | parse | 解析 | emit | 生成 | 
  | connect | 连接 | disconnect | 断开 | 
  | send | 发送 | receive | 接收 | 
  | download | 下载 | upload | 上传 | 
  | refresh | 刷新 | synchronize | 同步 | 
  | update | 更新 | revert | 复原 | 
  | lock | 锁定 | unlock | 解锁 | 
  | check out | 签出 | check in | 签入 | 
  | submit | 提交 | commit | 交付 | 
  | push | 推 | pull | 拉 | 
  | expand | 展开 | collapse | 折叠 | 
  | enter | 进入 | exit | 退出 | 
  | abort | 放弃 | quit | 离开 | 
  | obsolete | 废弃 | depreciate | 废旧 | 
  | collect | 收集 | aggregate | 聚集 |

#### 业务相关名词
  | 名称 | 含义 |
  |:--|:--|
  | product | 产品 |
  | price | 产品价格 |
  | description | 产品描述 |
  | review | 产品评论 |
  | news_release | 最新产品 |
  | publisher | 生产商 |
  | screenshot | 缩略图 |
  | faqs | 常见问题 |
  | keyword | 关键词 |
  | blog | 博客 |
  | forum | 论坛 |
  | share | 分享 |
  | integral | 积分 | 
  | advertisement | 广告 | 
  | pay | 支付 | 
  | community | 社区 | 
  | tag | 标签 |
  | msg / message	| 提示信息 |
  | tips | 小技巧 |
  | icon | 图标 |
  | note | 注释 |
  | guild | 指南 |
  | service | 服务 |
  | hot | 热点 |
  | news| 新闻 |
  | download | 下载 |
  | vote | 投票 |
  | partner| 合作伙伴 |
  | friendlink | 友情连接 |

## FrontEnd 前端
  - 前端常见命名锦集
    | 名称 | 含义 |
    |:--|:--|
    | wrapper | 页面外围控制整体布局 |
    | container / content | 容器, 用于最外层 |
    | head / header | 页头部分 |
    | foot / footer	| 页脚部分 |
    | nav	| 主导航 |
    | subnav | 二级导航 |
    | menu | 菜单 |
    | submenu | 子菜单 |
    | slider | 滑块 |
    | progress | 进度条 |
    | tooltip | 提示 |
    | sideBar | 侧栏 |
    | sidebar_l / sidebar_r | 左边栏或右边栏 |
    | main | 页面主体 |
    | title	| 标题 |
    | summary	| 摘要 |
    | loginbar | 登录条 |
    | regsiter | 注册 |
    | hot	| 热门热点 |
    | searchInput	| 搜索输入框 |
    | sreachbox | 搜索框 |
    | sreachbtn | 搜索按钮 |
    | search | 搜索 |
    | searchBar | 搜索条 |
    | logo | 网站 LOGO 标志 |
    | siteinfo | 网站信息 |
    | sitemap | 网站地图 |
    | arrow | 箭头 |
    | guild | 指南 |
    | list | 列表 |
    | homepage | 首页 |
    | subpage | 二级页面子页面 |
    | tool / toolbar | 工具条 |
    | drop | 下拉 |
    | dorpmenu | 下拉菜单 |
    | status | 状态 |
    | scroll | 滚动 |
    | tab | 标签页 |
    | left / right / center | 居左、中、右 |
    | news | 新闻 |
    | detail | 详情 |
    | download | 下载 |
    | banner | 顶部广告条 |
    | copyright | 版权信息 |
    | branding | 商标 |
    | siteinfoLegal | 法律声明 |
    | siteinfoCredits | 信誉 |
    | history | 发展历史 |
    | aboutus | 关于我们 |
    | linkus / contactus | 联系我们 |
    | feedback | 反馈 |
    | leavewords | 留言 |
    | joinus | 加入我们 |
    | partner | 合作伙伴 |

### HTML
#### 网站布局结构
  - Container: 将页面中的所有元素包裹的部分，也可命名为: “wrapper“, “wrap“, “page“
  - Header：网站页面的头部区域，也可命名为:“page-header”  或 “pageHeader”
    + 如：网站的 logo 和一些其他元素。
  - Navbar：等同于横向的导航栏，也可命名为: “nav”, “navigation”, “nav-wrapper”
  - Menu：包含一般的链接和菜单，也可命名为: “subNav “, “links“，“sidebar-main”
  - Main：网站的主要区域，也可命名为: “content“, “main-content” (或“mainContent”)
  - Sidebar：网站的次要内容，也可可命名为: “subNav “, “side-panel“, “secondary-content“
    + 如：最近更新内容列表、网站介绍或广告元素等
  - Footer：网站的一些附加信息，也可命名为: “copyright“
    ```mermaid
      block-beta
        block
          columns 3
          a["header"]:3
          block:g1:3
            b["navbar"]
          end
          c["menu"] d["main"] e["sidebar"]
          block:g2:3
            f["footer"]
          end
        end
    ```
  - 常见布局命名
    |布局区域 | 含义 |
    |:--|:--|
    | wrap 外套 |  #container |
    | header 头部 | #head, #header, #nav, #sub-nav, #menu,  #sub-menu, #branding |
    | main 主要内容 | bussiness-title, bussiness-logo, bussiness-search, bussiness-search-results |
    | main-left 左侧 | #side-bar, #side-bar-a, #side-bar-b |
    | main-right 右侧 | #side-bar, #side-bar-a, #side-bar-b |
    | content 内容 | radio-click, radio-height, light, radio-active, input-seach-off, input-search-on |
    | footer 底部 | #service, #regsiter, #partner（合作伙伴）, #joinus, #site-info |

### CSS
  - 常见 CSS 文件命名
    | 文件名	| 说明 |
    |:--|:--|
    | master.css / style.css  | 主要的 |
    | module.css | 模块 |
    | base.css / common.css | 基本共用 |
    | layout.css | 布局，版面 |
    | themes.css | 主题 |
    | skin.css | 皮肤	|
    | columns.css |专栏 |
    | font.css  | 文字、字体 |
    | forms.css | 表单 |
    | mend.css  | 补丁 |
    | print.css | 打印 |
    | animation.css | 动画 |
    | color.css | 颜色 |

#### BEM 命名法
  - BEM：（Block 块 + Element 元素 + Modifier 修饰符）是一种基于组件的 Web 开发方法，基本思想是将用户界面划分为独立的块。
    + 块名称 Block 表示一个最高级别的抽象或者说是组件，主要是起到边界的作用，其中有以下三个主要功能特点：
      ```css
         /* Block 负责描述功能，不应该包含状态 */
        /* correct */
        .m-header {
        }
        /* error */
        .m-header--active {
        }

        /* Block 不影响自身布局，不包含具体的样式。*/
        /* correct */
        .m-header {
        }        
        /* error */
        .m-header {
          background-color: red;
        }

        /* Block 不能使用元素选择器和 ID 选择器。*/
        /* correct */
        .m-header {
        }
        /* error */
        .m-header a {
        }
      ```
    + 元素名称（Element）表示目的，而非状态，在此层用于设置盒子边距宽高度数据、布局方式等。不能脱离 Block 父级单独使用。
      ```css
        .m-header__logo {
          margin-left: 50px;
          width: 100px;
        }
        .m-header__nav {
          margin: 100px;
        }
      ```
    + 修饰符名称（Modifier）表示的是状态。
      ```css
        .m-header__nav_navlist {
          background-color: red;
        }
      ```
  - 官方标准：namespace-block__element_modifier
    + 追加约定：给组件添加命名空间 `m` 表示模块，防止和第三方组件命名冲突。
    + 如：m-block __ element_modifier
    + 所有单词一律小写、尽量不要超过三个单词，避免命名过长，单词之间用 `-` 分隔。
    + 通过 `-` 将命名空间（Namespace）与块名称（Block）进行分隔。
    + 通过 `__` 将块名称（Block）与元素名称（Element）进行分隔
    + 通过 `_` 将元素（Element）与修饰符名称（Modifier）进行分隔。

### JavaScript
  - 驼峰式命名。前缀应当是名词。
    + 函数的名字前缀为动词，以此区分变量和函数)
  - 尽量在变量名字中体现所属类型，
    + 如: length、count 等表示数字类型；而包含name、title表示为字符串类型
  - 常量全大写，用下划线连接
  - 构造函数，大写第一个字母
  - 函数命名： 前缀应当为动词
    | 常见动词约定 | 含义 |
    |:--|:--|
    | can	| 判断是否可执行某个动作(权限) |
    | has	| 判断是否含有某个值 |
    | is	| 判断是否为某个值 |
    | get	| 获取某个值 |
    | set	| 设置某个值 |
    | load | 加载某些数据 |
  - 对象方法命名
    + fn + 对象类名 + 动词 + 名词形式   
    + 示例：fnAnimateDoRun() 
  - 事件响应函数命名
    + on + 触发事件对象名 + 事件名或者模块名
    + 示例：onDivClick()
  - 示例
    ```js
      var firstName = "John";

      var MAX_COUNT = 10;

      var $body = $('body');
    ```


## BackEnd 前端

## Database 数据库
  - 布尔字段全都要加 is_ 前缀

## 参考资料
  - [【开发规范】命名规范](https://blog.csdn.net/TracingOrigins/article/details/124388901)
  - [【编程规范】一文讲解开发中的命名规范](https://blog.csdn.net/qq_43783527/article/details/132001035)
  - [前端设计开发常用命名规则](https://cloud.tencent.com/developer/article/1483666)
  - [史上最全的Java命名规范！告别编码5分钟，命名2小时？](https://cloud.tencent.com/developer/article/1782577)
  - [程序员必知的常见命名方法](https://cloud.tencent.com/developer/article/2339116)
  - [前端项目规范](https://blog.csdn.net/ewl0116/article/details/127083595)
  - [程序命名公式及规范](https://blog.csdn.net/weixin_44808483/article/details/115293929)
  - [项目命名规范（二）](https://blog.csdn.net/weixin_30649859/article/details/96375852)