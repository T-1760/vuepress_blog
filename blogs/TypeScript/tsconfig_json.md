---
sidebar: auto
title: tsconfig.json 配置文件
date: 2023-10-18
tags:
 - tsconfig.json
 - 配置文件
categories: 
 - TypeScript
---

## 配置文件
  - tsconfig.json 文件通常存在于 TypeScript 项目的根目录下。 
    + tsconfig.json 文件指定编译项目所需的根文件和编译选项
  - 使用 tsconfig.json
    + 当调用 tsc 指定了输入文件时，tsconfig.json 文件会被忽略。
    + 当调用 tsc 不带任何输入文件时，编译器会从当前目录开始（逐级向上搜索父目录）去查找 tsconfig.json 文件。
    + 当调用 tsc 不带任何输入文件时，且使用 `--project` 或 `-p` 参数指定一个包含 tsconfig.json 文件的目录。
    
  - tsconfig.json 配置中的常用选项
    + compilerOptions 属性
    + files 属性
    + include 属性
    + exclude 属性
    
### files 属性
  + files 属性指定一个包含相对或绝对文件路径的列表

### include 属性
  - include 属性指定一个文件 glob 匹配模式列表。 

### exclude 属性
  - exclude 属性指定一个文件 glob 匹配模式列表
  - 支持的 glob 通配符
    + `*`：匹配 0 或多个字符（不包括 目录分隔符）
    + `?`：匹配一个任意字符（不包括 目录分隔符）
    + `**/`：递归匹配任意子目录
    + `**`：表示任意目录
    + `*`：表示任意文件

### include exclude files 三者关联计算
  - 任何被 `files` 或 `include` 指定的文件所引用的文件，也会被包含进来。
    + 例：A.ts 引用了 B.ts，因此 B.ts 不能被排除（除非引用它的 A.ts 在 `exclude` 列表中）。
  - 使用 `include` 引入的文件可以使用 `exclude` 属性过滤。
    + 通过 `files` 属性明确指定的文件却总是会被包含在内，无视 `exclude` 属性设置。 
  - 通常 `exclude` 默认情况下会排除 node_modules、bower_components、jspm_packages 和 compilerOptions.outDir 等的目录。
  
### compilerOptions 属性
  - [compilerOptions 属性默认值](https://www.tslang.cn/docs/handbook/compiler-options.html)
  - target
    + 表示设置编译过后 Javascript 所采用的 ECMA 标准；
  - module
    + 表示输出的代码采用什么样的方式去进行模块化；
  - outDir
    + 设置编译结果输出到的目录（通常为 dist 目录）
  - rootDir
    + 配置源代码（即：Typescript 的代码所在的文件夹，通常为 src 目录）
  - sourceMap
    + 开启源代码映射，
    + 开启之后，调试时可以在 sourceMap 文件进行调试源代码；
  - strict
    + 开启所有严格检查选项，
    + 严格模式下，需要我们对每一个成员都要指定明确的类型等等
  ```js
    {
      "include": [
          "./"
      ],
      "exclude": [
          "./demo.ts"
      ],
      "compilerOptions": {
          // 编译的js版本目标
          "target": "ES6",
          // 模块化版本
          "module": "system",
          // 指定项目中要使用到的库
          "lib": ["esnext"],
          // 编译后所在目录
          "outDir": "./dist",
          // 将编译的js合并到一起
          "outFile": "./dist/app.js",
          // 是否对js进行编译，false表示不对js进行编译
          "allowJs": false,
          // 是否对js文件进行检验，false表示不检验
          "checkJs": false,
          // 是否移除注释，false表示不去掉注释
          "removeComments": false,
          // 不生成编译文件，
          "noEmit": false,
          // 当编译出错时不生成编译文件
          "noEmitOnError": false,
          // 所有严格模式的总开关
          "strict": false,
          // 是否开启严格模式，false表示不开启
          "alwaysStrict": false,
          // 当一个变量不指定类型时，默认使用any，设置为true时，表示不允许使用隐式any
          "noImplicitAny": false,
          // 设置为 true，表示不允许使用隐式 this
          "noImplicitThis": false,
      }
    }
```
