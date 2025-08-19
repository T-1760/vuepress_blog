module.exports = [
  { text: "Home", link: "/", icon: "reco-home" },
  {
    text: "FrontEnd", icon: "reco-home", items: [
      { text: "HTML", link: "/docs/HTML/", icon: "reco-message" },
      { text: "CSS", link: "/docs/CSS/", icon: "reco-message" },
      {
        text: "JavaScript", link: "/docs/JavaScript/", items: [
          { text: "ECMAScript", link: "/docs/JavaScript/ECMAScript/", icon: "reco-message", },
          { text: "WebAPI", link: "/docs/JavaScript/Web_API/", icon: "reco-message", }
        ]
      },
    ]
  },
  {
    text: "工程化", icon: "reco-message", items: [
      { text: "开发规范", link: "/blogs/Development/Standard/" }
    ]
  },
  { text: "收藏家", link: "/collector/", icon: "reco-message" },
  {
    text: "博客", link: "/blogs/", icon: "reco-message", items: [
      { text: "Node.js", link: "/blogs/NodeJS/" },
      { text: "HormonyOS", link: "/blogs/HarmonyOS/" },
      { text: "软考", link: "/blogs/computer_software_exam/" },
      { text: "End", link: "/blogs/civil_service_exam/" },
    ]
  },
]
