const head = require("./configs/head")
const themeConfig = require("./configs/themeConfig")

module.exports = {
  base: '/vuepress_blog/',
  title: '无常记', // 博客标题
  description: 'Great Frontend 喜常于记',
  head,
  locales: { // 多语言
    '/': {
      lang: 'zh-CN'
    }
  },
  theme: "reco",
  themeConfig,
}