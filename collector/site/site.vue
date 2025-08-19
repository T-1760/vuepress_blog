<template>
  <div>
    <ul class="flex-box" v-if="data && data.children && Array.isArray(data.children)">
      <li class="card padding-H_1em padding-V_05em" v-for="item in  data.children" :key="item.url">
        <a class="flex-H-center" :href="item.url" target="_blank">
          <img :src="getDomain(item.url)" :alt="item.label + '_icon'"  onerror="this.onerror=null;this.src='/favicon.ico'" srcset="">
          <span class="margin-H_1em ellipsis">{{item.label}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import data from "./site.js"
  export default {
    props: {
      flag: {
        type: String,
        required: true
      }
    },
    data(){
      return {
        data: data[this.flag]
      }
    },
    methods: {
      /** 
       * 获取 网址的 域名 再通过（一为 API）第三方的接口获取网站 Favicon
       * @param {Stirng} url 网址 
       */
      getDomain(url){
        const regEx = /^(?:https?:\/\/)?(?:www\.)?([^\/:\n\r]+)/;
        const domain = url.match(regEx);
        return url && domain ? `https://api.iowen.cn/favicon/${domain[1]}.png` : "/favicon.ico";
      }
    }
  }
</script>

<style scoped>
.flex-box {
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
}

.card{
  width: 25%;
  border: 1px solid white;
  border-radius: 1.5em;
}

@media (max-width: 1200px) {
  .card {
    width: 25%;
  }
}

@media (max-width: 768px) {
  .card {
    width: 40%;
  }
}
@media (max-width: 576px) {
  .card {
    width: 100%;
  }
}

img{
  width: 2em;
  height: 2em;
  border-radius: 0.5em;
}
</style>