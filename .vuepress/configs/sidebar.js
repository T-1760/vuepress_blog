module.exports = {
  /* ---------- HTML 结构 ---------- */
  "/docs/HTML/": [
    {
      title: '结构', icon: 'reco-menu', children: [
        "/docs/HTML/",
      ]
    },
  ],
  /* ---------- CSS 样式 ---------- */
  "/docs/CSS/": [
    {
      title: '样式', icon: 'reco-menu', children: [
        "/docs/CSS/",
      ]
    },
  ],
  /* ---------- JavaScript 行为 ---------- */
  // "/docs/JavaScript/": [
  //   {
  //     title: '脚本', icon: 'reco-menu', children: [
  //       "/docs/JavaScript/",
  //     ]
  //   },
  // ],
  "/docs/JavaScript/ECMAScript/": [
    // {
    //   title: 'ECMAScript 语法', icon: 'reco-menu', children: [
    "/docs/JavaScript/ECMAScript/Data_type/",
    "/docs/JavaScript/ECMAScript/literal/",
    {
      title: '标准内置对象', path: "/docs/JavaScript/ECMAScript/Global_Objects/", children: [
        "/docs/JavaScript/ECMAScript/Global_Objects/Array/",
        "/docs/JavaScript/ECMAScript/Global_Objects/Boolean/",
        "/docs/JavaScript/ECMAScript/Global_Objects/Function/",
        "/docs/JavaScript/ECMAScript/Global_Objects/Number/",
        "/docs/JavaScript/ECMAScript/Global_Objects/Object/",
        "/docs/JavaScript/ECMAScript/Global_Objects/String/",
      ]
    }
    //   ]
    // },
  ],
  // Web API
  "/docs/JavaScript/Web_API/": [
    {
      title: '服务器通信 API', icon: 'reco-menu', children: [
        "/docs/JavaScript/Web_API/AJAX_API/Fetch.md",
        "/docs/JavaScript/Web_API/AJAX_API/XMLHttpRequest.md",
      ]
    },
    // "/docs/JavaScript/Web_API/BOM_API/",
    // "/docs/JavaScript/Web_API/Canvas_API/",
    // "/docs/JavaScript/Web_API/DOM_API/",
    {
      title: '硬件设备 API', icon: 'reco-menu', children: [
        "/docs/JavaScript/Web_API/Device_API/Geolocation.md",
        "/docs/JavaScript/Web_API/Device_API/Notifications.md",
        "/docs/JavaScript/Web_API/Device_API/Vibration.md"
      ]
    },
    {
      title: '媒体 API', icon: 'reco-menu', children: [
        "/docs/JavaScript/Web_API/Media_API/Audio.md",
      ]
    },
    {
      title: '存储 API', icon: 'reco-menu', children: [
        "/docs/JavaScript/Web_API/Storage_API/IndexedDB.md",
        "/docs/JavaScript/Web_API/Storage_API/Storage.md",
      ]
    }
  ],
  /* ---------- Node.js ---------- */
  // 全局对象
  "/blogs/NodeJS/globals/": [

  ],
  // 模块系统
  "/blogs/NodeJS/module/": [
    {
      title: '核心模块', icon: 'reco-menu', children: [
        "/blogs/NodeJS/module/core_module/buffer.md",
        "/blogs/NodeJS/module/core_module/fs.md",
        "/blogs/NodeJS/module/core_module/http.md",
        "/blogs/NodeJS/module/core_module/os.md",
        "/blogs/NodeJS/module/core_module/path.md",
        "/blogs/NodeJS/module/core_module/querystring.md",
        "/blogs/NodeJS/module/core_module/stream.md",
        "/blogs/NodeJS/module/core_module/url.md",
        "/blogs/NodeJS/module/core_module/util.md"
      ]
    },
    {
      title: '模块域内置对象', icon: 'reco-menu', children: [
        "/blogs/NodeJS/module/globals/__dirname.md",
        "/blogs/NodeJS/module/globals/__filename.md",
      ]
    },
  ],
  "/blogs/NodeJS/": [
    "/blogs/NodeJS/",
    { title: "全局对象", children: ["/blogs/NodeJS/globals/"] },
    { title: "模块系统", children: ["/blogs/NodeJS/module/"] }
  ],
  /* ---------- 收藏家 ---------- */
  "/collector/": [
    "/collector/site/"
  ],
  /* ---------- HarmonyOS ---------- */
  "/blogs/HarmonyOS/": [
    "/blogs/HarmonyOS/ArkTS/",
    {
      title: '组件', icon: 'reco-menu', children: [
        "/blogs/HarmonyOS/ArkTS/Animation/",
        "/blogs/HarmonyOS/ArkTS/component/",
        "/blogs/HarmonyOS/ArkTS/Network/",
        "/blogs/HarmonyOS/ArkTS/Notification/",
        "/blogs/HarmonyOS/ArkTS/Ohpm/",
        "/blogs/HarmonyOS/ArkTS/Reminder/",
        "/blogs/HarmonyOS/ArkTS/Storage/",
        "/blogs/HarmonyOS/ArkTS/UIAbility/",
      ]
    }
  ],
  /* ---------- 开发规范 ---------- */
  "/blogs/Development/Standard/": [
    "/blogs/Development/Standard/naming_conventions",
    "/blogs/Development/Standard/git_commit"
  ]
}