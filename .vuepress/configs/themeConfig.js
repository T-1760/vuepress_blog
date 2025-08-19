const nav = require("./nav")
const sidebar = require("./sidebar")

module.exports = {
  type: "blog",
  nav, // 导航栏配置， Array 类型
  sidebar, // 左侧导航栏, Object 类型
  logo: "/favicon.ico", // 导航栏博客标题的 logo 图片
  author: "Tang_1997", // 作者名称
  authorAvatar: "/avatar.png", // 作者头像
  blogConfig: {
    // 导航栏的博客配置
    // category: {
    //   location: 4,
    //   text: "分类"
    // },
    // tag: {
    //   location: 5,
    //   text: "标签"
    // },
    // 信息栏展示社交信息
    socialLinks: [
      { icon: 'reco-github', link: 'https://github.com/T-1760' },
      { icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan' }
    ]
  },
  lastUpdated: "上次更新时间", // 文章更新时间
  record: "备案信息", // 备案号
  startYear: "2022",
  searchMaxSuggestions: 10, // 搜索结果数量
  noFoundPageByTencent: false, // 腾讯公益
} 