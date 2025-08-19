---
sidebar: auto
title: OSPF 
date: 2024-03-26
tags:
 - Open Shortest Path First
 - 开放式最短路径优先
 - 网络工程师
categories: 
 - blogs
---

## 前言
  - OSPF 是一种基于链路状态的路由协议，也是专为 IP 开发的路由协议，直接运行在 IP 层上面。
    + 每个路由器负责发现、维护与邻居的关系，并将已知的邻居列表和链路费用 LSU 报文描述，通过可靠的泛洪与自治系统 AS 内的其他路由器周期性交互，
    + 学习到整个自治系统的网络拓扑结构;并通过自治系统边界的路由器注入其他 AS 的路由信息，从而得到整个 Internet 的路由信息。每隔一个特定时间或当链路状态发生变化时，重新生成 LSA，路由器通过泛洪机制将新 LSA 通告出去，以便实现路由的实时更新。
    + 这样，每台路由器都收到了自制系统中所有路由器生成的 LSA，这些 LSA 的集合组成了 LSDB（链路状态数据库），这样所有的 OSPF 路由器都维护一个相同的描述自治系统内部结构的数据库。
  - 它从设计上保证了无路由环路。除此之外，IS-IS 也是很常见的链路状态协议。
  - OSPF 协议是一种链路状态协议。

## 基本概念
### OSPF 区域
  - 为了适应大型的网络，OSPF 在 AS 内划分多个区域，每个 OSPF 路由器只维护所在区域的完整链路状态信息。划分区域时，会创建一个称为 Area 0 的中心区域，其他区域（Area 1、Area 2、Area 3等）始终与 Area 0 相连，连接区域 0 和其他区域的路由器称为区域边界路由器。

## 网络类型
  - 根据路由器所连接的物理网络不同，OSPF 将网络划分为四种类型:
    + 广播类型：数据链路层是 Ethernet 等
    + P2P 点对点类型：数据链路层是 点到点 等
    + NBMA 类型：数据链路层是 帧中继 等
    + P2MP 点到多点类型：需手工配置
### 广播多路访问型（Broadcast multiAccess）、
  - 广播多路访问型网络如：Ethernet、Token Ring、FDDI
    ![广播多路类型](https://i-blog.csdnimg.cn/blog_migrate/2cdca6c298c177e26c00feba8b2a4f65.png)
### 非广播多路访问型（None Broadcast MultiAccess，NBMA）、
  - NBMA 型网络如：Frame Relay、X.25、SMDS
    ![NBMA 类型](https://i-blog.csdnimg.cn/blog_migrate/9287f968c4d244be75b9591cb2415feb.png)
### 点到点型（Point-to-Point）
  - Point-to-Point 型网络如：PPP、HDLC
   ![点到点类型](https://i-blog.csdnimg.cn/blog_migrate/08381b24d3c51f1892c309e02ac03af0.png)
### 点到多点型（Point-to-MultiPoint）
  ![点到多点类型](https://i-blog.csdnimg.cn/blog_migrate/740e7b537ca66b3b9b1b8e22e64b6beb.png)


## 报文类型
  - OSPF 的五种报文类型
### 1、Hello 报文：
 - 周期性发送，用来发现和维持 OSPF 邻居关系。
### 2、DD（数据库的描述）报文：
  - 描述了本地 LSDB 中每一条 LSA 的摘要信息，用于两台路由器进行数据库同步。
### 3、LSR（链路状态请求）报文：
  - 向对方请求所需的 LSA。
### 4、LSU（链路状态更新）报文：
  - 向对方发送其所请求的 LSA。
### 5、LSACK（链路状态确认）报文：
  - 用来对收到的 LSA 进行确认。内容是需要确认的 LSA 的 Header（一个报文可以对多个 LSA 进行确认）。

## 状态
  - OSPF的七种状态
    ![OSPF的七种状态](https://pics7.baidu.com/feed/d1160924ab18972b078fc49230473d849f510a4d.jpeg)
### 1、Down：
  - 刚开机时，随即发送第一个 hello 报文的状态。
### 2、Init：
  - 发送了第一个 hello 报文后，等待收到对方发来 hello 报文的状态。
  - attempt：跟 init 状态类似，但它只用于 NBMA 接口网络类型之中。
### 3、2-way：
  - 双向连接，收到了邻居发来的 hello 报文（其中携带一些信息说明本设备为邻居的 route-id 等），在这个状态里完成 DR 和 BDR 的选举。
### 4、Exstart：
  - 双方开始交换“空”的 DD 报文，通过 DD 报文中序号等摘要信息协商并选举出主从设备。
### 5、Exchange：
  - 双方交换携带了 LSA 摘要 DD 报文，用于同步 LSDB。（可以说双方各自存储着自己的 LSA 报文数据库即 LSDB）
### 6、Loading：
  - 用于加载 exchange 交换之后各自缺少的 LSA 报文。（此过程会发送LSR、LSU、LSAck 报文）
### 7、Full：
  - 同步 LSDB 完成。（此过程拓扑链路发生变化会发送 HELLO、DD 报文、LSR、LSU、LSAck 报文，以进行动态刷新 LSDB）

## 参考资料
  - [网络工程师必备干货｜OSPF协议](https://baijiahao.baidu.com/s?id=1785792362853203499)
  - [OSPF基本概念最全](https://baijiahao.baidu.com/s?id=1780813343366184896)
  - [1.2 网络类型](https://blog.csdn.net/m0_70976024/article/details/135307563)
  - [OSPF技术连载1：OSPF基础知识，7000字总结！](https://cloud.tencent.com/developer/article/2323478)