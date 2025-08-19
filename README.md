---
home: true
heroText: Tang-Blog
tagline: 难分简 - 简做勤 - 勤化习 - 习以常 - 常解难
# heroImage: /hero.png
# heroImageStyle: {
#   maxWidth: '600px',
#   width: '100%',
#   display: block,
#   margin: '9rem auto 2rem',
#   background: '#fff',
#   borderRadius: '1rem',
# }
bgImage: /banner.png
bgImageStyle: {
  height: '100vh',
}
---

::: details 技术支持
  - [vuePress](https://vuepress.vuejs.org/zh/)
  - [vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)
:::

<script>
export default {
  mounted () {
    const ifJanchor = document.getElementById("JanchorDown"); 
    ifJanchor && ifJanchor.parentNode.removeChild(ifJanchor);
    let a = document.createElement('a');
    a.id = 'JanchorDown';
    a.className = 'anchor-down';
    document.getElementsByClassName('hero')[0].append(a);
    let targetA = document.getElementById("JanchorDown");
    targetA.addEventListener('click', e => { // 添加点击事件
      this.scrollFn();
    })
  },

  methods: {
    scrollFn() {
      const windowH = document.getElementsByClassName('hero')[0].clientHeight; // 获取窗口高度
      document.documentElement.scrollTop = windowH; // 滚动条滚动到指定位置
    }
  }
}
</script>

<style>
body{
  /* background: url(https://liheng103.github.io/blog/bkg3.gif); */
  background-size: cover;
  background-attachment: fixed;
  background-repeat: repeat-y;
}
#app .home-blog .hero{
  /* margin-top: 0 */
  padding-bottom: 60vh;
}
.anchor-down {
  position: absolute;
  left: 50%;
  bottom: 20%;
  display: block;
  margin: 12rem auto 0 -1rem;
  width: 20px;
  height: 20px;
  font-size: 34px;
  text-align: center;
  animation: bounce-in 5s 1s infinite;
  cursor: pointer;
}
@keyframes bounce-in{
  0%{
    transform:translateY(0)
  }
  50%{
    transform:translateY(-3rem)
  }
  100%{
    transform:translateY(0)
  }
}
.anchor-down::before {
  content: "";
  width: 20px;
  height: 20px;
  display: block;
  border-right: 3px solid #fff;
  border-top: 3px solid #fff;
  transform: rotate(135deg);
  position: absolute;
  bottom: 10px;
}
.anchor-down::after {
  content: "";
  width: 20px;
  height: 20px;
  display: block;
  border-right: 3px solid #fff;
  border-top: 3px solid #fff;
  transform: rotate(135deg);
}

</style>