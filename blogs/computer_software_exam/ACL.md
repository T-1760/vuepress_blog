---
sidebar: auto
title: ACL 访问控制列表
date: 2024-03-26
tags:
 - ACL
 - Access Control Lists
 - 访问控制列表
 - 网络工程师
categories: 
 - blogs
---

## ACL 概念
  - ACL （Access Control Lists 访问控制列表）是由一系列 permit 或 deny 语句组成的、有序规则的列表
    + 规则：描述报文匹配条件的判断语句。（条件可以是报文的 源地址、目标地址、端口号等）
    ```mermaid
       block-beta
           columns 3
           dialog1["源 IP 地址\n 目的 IP 地址\n 协议类型"] dialog2["源端口\n 目标端口"] space
           down1<[" "]>(down) down2<[" "]>(down) space

         block:g:3
            a["IP Header"]
            b("TCP/UDP Header")
            c["data"]
         end         
         classDef dialog stroke:#333,stroke-width:4px

         class dialog1,dialog2 dialog
    ```
  - ACL本质上是一种报文过滤器，规则是过滤器的滤芯。设备基于这些规则进行报文匹配。
  - ACL 是一个匹配工具，能够对（业务或路由）报文进行匹配和区分
  - ACL 应用
     + 匹配IP流量
     + 在 Traffic-filter 中被调用
     + 在NAT（Network Address Translation）中被调用
     + 在路由策略中被调用
     + 在防火墙的策略部署中被调用
     + 在QoS中被调用

### 基于 ACL 规则定义方式分类
  | 分类 | 编号范国 | 规则定义描述 
  |:--|:--|:--|
  | 基本 ACL | 2000 ~ 2999 | 仅使用报文的源 1P 地址.分片信息和生效时间段信息来定义规则 |
  | 高级 ACL | 3000 ~ 3999 | 可使用 IP4 报文的源 IP 地址、目的 IP 地址、IP 协议类型、CMP 类型、TCP 源/目的端口号、UDP 源/目的端口号、生效时间段等来定义规则 |
  | 二层 ACL | 4000 ~ 4999 | 使用报文的以太网帧头信息来定义规则，如根据源 MAC 地址、目的 MAC 地址、二层协议类型等 |
  | 用户自定义 ACL | 5000 ~ 5999 | 使用报文头，偏移位置、字符串掩码和用户自定义字符串来定义规则 |
  | 用户 ACL | 6000 ~ 6999 | 既可使用 IPv4 报文的源 IP 地址或源 UCL(User Control Li)组，也可使用目的 IP 地址或目的 UCL 组。IP 协议类型、CMP类型、TCP 源端口/目的端口、UDP 源端口/目的端口号等来定义规则 |

### 基于 ACL 标识方法的分类
  | 分类 | 规则定义描述 |
  |:--|:--|
  | 数字型 ACL | 传统的 ACL 标识方法，创建 ACL 时，指定一个维一的数字标识该 ACL |
  | 命名型 ACL | 通过名称代普编号来标识 ACL |