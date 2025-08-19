---
sidebar: auto
title: git commit 提交规范
date: 2023-10-18
tags:
 - git 
 - git commit
 - 提交规范
categories: 
 - 开发规范
---

## git commit 提交规范
  - 由 Header、Body、Footer三部分组成，提交格式模板
    ```txt
      type [scope] subject
      // 空一行
      [Body]
      // 空一行
      [Footer]
    ``` 
- 单次提交注意事项
  + 提交问题的类别必须统一
  + 提交问题的数量不能超过 3 个
  + 避免不规范的 commit 提交，
    * `git commit --amend -m "新的提交信息"`
    * `git reset --hard HEAD^ 重新提交一次`

### Header 部分
  - commit message header 提交消息头，不能超过 `60` 个字符
  - Header 部分只有一行，由`type [scope] subject` 三个字段组成

#### type 提交类型字段
  - 用于说明 `git commit` 提交的类型。
  - type 提交类型为 `feat` 或 `fix`，则该 commit 将肯定出现在 Change log 中。
    + 其他情况（`docs`、`chore`、`style`、`refactor` 等），建议不要放入 Change log 中
  
  | TYPE 前缀 | 含义|
  |:--|:--|
  | `feat`    | 新增（feature）功能或页面 |
  | `modify`  | 修改 功能 |
  | `delete`  | 删除 功能或文件 |
  | `fix`     | 修复 bug 或解决冲突（尽量避免） |
  | `docs`    | 修改 documentation 文档 |
  | `refactor`| 代码重构，未新增任何（feature）功能和修复任何 bug |
  | `build`   | 改变构建流程，新增依赖库、工具等（例：webpack 修改） |
  | `style`   | （缩进、注释等）格式修改，不改变代码逻辑的变动； |
  | `perf`    | performance 性能优化 |
  | `chore`   | 非`src` 或 `test`目录的修改（例：构建流程, 辅助工具，依赖管理等的变动）|
  | `test`    | 测试用例的新增、修改 |
  | `ci`      | 自动化流程配置修改 |
  | `revert`  | 撤销，版本回退 |

#### scope 提交范围字段（可选） 
  - 用于说明 `git commit` 影响的范围，
    + 视项目而定，如：数据层、控制层、视图层等。
  - 范围是指定提交更改位置的任何内容。

#### subject 目的描述字段
  - 用于说明 `git commit` 简短（不超过 `50` 个字符的）目的描述。
    + 以动词开头，使用第一人称现在时，如 `change`，而非 `changed` 或 `changes`
    + 首字母小写, 结尾不加 `.` 句号
    + 若无合适描述，可默认为： "提交内容"

### Body 部分
  - commit message body 提交消息具体内容
  - Body 部分是对本次 commit 的详细描述，可以分成多行。
    + 使用第一人称现在时，如 `change`，而非 `changed` 或 `changes`
    + 应该说明代码变动的动机，以及与以前行为的对比。
    ```txt
      More detailed explanatory text, if necessary.  Wrap it to 
      about 72 characters or so. 

      Further paragraphs come after blank lines.

      - Bullet points are okay, too
      - Use a hanging indent      
    ```


### Footer 部分
  - commit message footer 提交消息尾述
  - Footer 部分只用于 `Breaking changes` 和 `Closed issues` 两种情况。
#### Breaking changes 不兼容变动
  - 如果当前代码与上一个版本不兼容，则 Footer 部分以 BREAKING CHANGE 开头，后面是对变动的描、以及变动理由和迁移方法。
    ```txt
      BREAKING CHANGE: isolate scope bindings definition has changed.

        To migrate the code follow the example below:

        Before:

        scope: {
          myAttr: 'attribute',
        }

        After:

        scope: {
          myAttr: '@',
        }

        The removed `inject` wasn't generaly useful for directives so there should be no code using it.
    ```

#### Closed issues 关闭问题
  - 如果当前 commit 针对某个 issue，那么可以在 Footer 部分关闭这个 issue 。
    ```txt
      Closes #234 # 关闭 issue

      Closes #123, #245, #992 # 一次关闭多个 issue 
    ```

#### Revert 特殊情况
  - revert 是一种特殊的 commit，用于回滚前面的 commit。
     ```txt        
        revert: fix: home banner crash #12345
    
        This reverts commit aa7b6ed2d93bd9b79faccf1ac9d086c98c52141f.
      ```
  - 如果当前 commit 用于撤销以前的 commit，则必须以 `revert:` 开头，后面跟着被撤销 Commit 的 Header。
    + Body 部分必须以 `This reverts commit <commitID>` 的格式.
      ```txt
        revert: feat(pencil): add 'graphiteWidth' option

        This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
      ```
    + 如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。
    + 如果当前 commit 与被撤销的 commit，在不同的发布，那么当前 commit，会出现在 Change log 的 Reverts 小标题下面。

## 提交 Emojis 表情标识
  - Emoji 对照表
    + `git commit -m ":tada: shou commit（首次提交）"`

    | 代码 | 作用 | Emoji |
    |:--|:--|:--|
    | 🎉 庆祝  | `:tada:`	         | 初次提交 |
    | ✨ 火花  | `:sparkles:`	    | 引入新功能 |
    | 🐛 bug  | `:bug:`	           | 修复 bug |
    | 🚧 施工  | `:construction:`	 | 工作进行中 |
    | ⬇️ 下箭头	 | `:arrow_down:`	 | 降级依赖 |
    | ⬆️ 上箭头	 | `:arrow_up:`	   | 升级依赖 |
    | ➖ 减号  | `:heavy_minus_sign:` | 减少一个依赖 |
    | ➕ 加号  | `:heavy_plus_sign:`	 | 增加一个依赖 |
    | 🔧 扳手  | `:wrench:`	         | 修改配置文件 |
    | 🌐 地球  | `:globe_with_meridians:`| 国际化与本地化 |
    | 🔒 锁  | `:lock:`	           | 修复安全问题 |
    | 🍎 苹果  | `:apple:`	       | 修复 macOS 下的问题 |
    | 🐧 企鹅  | `:penguin:`	     | 修复 Linux 下的问题 |
    | 🏁 旗帜  | `:checked_flag:`	 | 修复 Windows 下的问题 |
    | 🔥 火焰  | `:fire:`	         | 移除代码或文件 |
    | 🚨 警车灯  | `:rotating_light:` | 移除 linter 警告 |
    | 🚑 急救车  | `:ambulance:`	   | 重要补丁|
    | 🔨 锤子  | `:hammer:`	        | 重大重构 |
    | 📝 备忘录  | `:memo:`	        | 撰写文档 |
    | ✏️ 铅笔  | `:pencil2:`	      | 修复 typo |
    | 💄 口红  | `:lipstick:`	       | 更新 UI 和样式文件 |
    | 🎨 调色板  | `:art:`          | 改进代码结构/代码格式 |
    | ⚡️ 闪电  | `:zap:`	          | 提升性能 |
    | 🐎 赛马  | `:racehorse:`	    | 提升性能 |
    | ✅ 勾选框  | `:white_check_mark:` | 增加测试 |
    | 🐳 鲸鱼  | `:whale:`	            | Docker 相关工作 |
    | 🔖 书签  | `:bookmark:`	         | 发行/版本标签 |
    | 🚀 火箭  | `:rocket:`	           | 部署功能 |
    | 👷 工人  | `:construction_worker:`  | 添加 CI 构建系统 |
    | 💚 绿心  | `:green_heart:`	        | 修复 CI 构建问题 |
    | 📈 趋势图	| `:chart_with_upwards_trend:` | 添加分析或跟踪代码 |
        
  - [styleguide-git-commit-message](https://github.com/slashsBin/styleguide-git-commit-message)

## Commitizen 提交格式工具
  - Commitizen 是一个撰写合格 Commit message 的工具。
    + step 1: `npm install -g commitizen`
      * 为了使其支持 Angular 的 Commit message 格式。需在在项目目录下，运行命令: `commitizen init cz-conventional-changelog --save --save-exact`
    + step 2：用到 git `commit` 替换为 `git cz` 命令，
    + step 3：这时会出现选项，用来生成符合格式的 Commit message。
