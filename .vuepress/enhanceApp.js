// vuepress 增强
import MySite from "../collector/site/site.vue"
import MyList from "./my_components/MyList.vue"

const components = {
  MySite,
  MyList,
}

export default async ({
  Vue
}) => {
  // 全局样式
  require('./styles/my_style.css')

  // 全局组件挂载
  if (typeof process === 'undefined') {
    Object.keys(components).forEach(comp => {
      Vue.component(comp, components[comp])
    })
  }
}