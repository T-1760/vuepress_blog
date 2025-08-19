---
sidebar: auto
title: Storage 数据存储
date: 2023-10-18
tags:
 - Storage 
 - 数据存储
categories: 
 - ArkUI
---

### 首选项
  - 首选项为应用提供 Key-Value 键值型的数据存储能力，支持应用持久化轻量级数据，并对其进行增删除改查等。
    + 该存储对象中的数据会被缓存在内存中，因此它可以获得更快的存取速度
    + Key-Value 数据结构：一种键值型的数据结构 Key 是不重复的关键字，Value 是数据值。
  - 数据中的 Key 为 `<string>` 类型，要求**非空**且字符长度不超过 **80** 个字节。
  - 数据中的 Value 为 `<string>` 类型时，允许为空，字符长度不超过 **8192** 个字节。
  - 首选项是一种**非关系型数据库**
    + 与关系型数据库区别：首选项不保证遵循 ACID（Atomicity, Consistency, Isolation and Durability）特性，数据之间无关系。
    + 进程中每个文件仅存在一个 `Preferences` 实例，应用获取到实例后，可以从中读取数据，或者将数据存入实例中。
    + 通过调用 `flush` 方法可以将实例中的数据回写到文件里。
    ![首选项运作机制](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/103/404/958/0260086000103404958.20221102133754.12375442517269967648668670198659:50001231000000:2800:97EB15B8DA0A699559915D9178129C46DE797C3D6EAE0C167979A15D03491D67.png)
  - 关系数据库与首选项的区别
    | 分类 | 系型数据库 | 首选项 |
    | 数据库类型 | 关系型 | 非关系型 |
    | 使用场景 | 提供复杂场景下的本地数据库管理机制 | 对Key-Value结构的数据进行存取和持久化操作
    | 存储方式 | SQLite数据库 | 文件
    | 约束与限制 | 1、连接池最大 4 个         | 1、建议数据不超一万条 |
    |           | 2、同一时间只支持一个写操作 | 2、Key 为 string 型 |

#### Preferences 首选项实例的创建
  1. 导入 `@ohos.data.preferences` 模块到 `PreferencesUtil` 开发环境中
    ```ts
      /* 注：把常用接口封装在PreferencesUtil工具类里面，为了方便后面代码直接调用）*/

      // PreferencesUtil.ets
      import dataPreferences from '@ohos.data.preferences';
    ```
  2. 在 entryAbility 的 `onCreate` 方法获取首选项实例，以便后续能进行保存、读取、删除等操作，获取实例需要 `context` 上下文和 `PREFERENCES_NAME` 文件名字
    ```ts
      // entryAbility.ets  
      onCreate(want, launchParam) {
        Logger.info(TAG, 'onCreate');
        globalThis.abilityWant = want;
        // 创建首选项
        PreferencesUtil.createFontPreferences(this.context);
      }

      // PreferencesUtil.ets 
      import dataPreferences from '@ohos.data.preferences';
 
      createFontPreferences(context) {
        globalThis.getFontPreferences = (() => {
          // 获取首选项实例
          let preferences: Promise<dataPreferences.Preferences> = dataPreferences.getPreferences(context, PREFERENCES_NAME);
          return preferences;
        });
      }
    ```
#### Preferences 首选项实例的方法
  - 常用方法
    + `put` 保存数据
    + `get` 获取数据
    + `has` 是否包含指定的 key
    + `delete` 删除数据
    + `flush` 数据持久化

### 关系型数据库
### 分布式数据服务
### 分布式数据对象