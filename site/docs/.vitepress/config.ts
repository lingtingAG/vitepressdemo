export default {
  base:'/',
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  themeConfig: {
    siteTitle: "lingting的笔记",
    nav: [
      { text: "资源导航", link: "/nav/" },
      { text: "学习笔记", link: "/note/" },
      { text: "指南XX", link: "/guild/installation/" },
      { text: "组件XX", link: "/components/button/" }
    ],
    sidebar: {
      "/guild/": [
        {
          text: "基础",
          items: [
            {
              text: "安装",
              link: "/guild/installation/"
            },
            {
              text: "快速开始",
              link: "/guild/quickstart/"
            }
          ]
        },
        {
          text: "进阶",
          items: [
            {
              text: "xx",
              link: "/xx"
            }
          ]
        }
      ],
      "/components/": [
        {
          text: "基础组件",
          items: [
            {
              text: "Button",
              link: "/components/button/"
            }
          ]
        }
      ],
      "/note/": [
        {
          items: [
            {
              text: "笔记首页",
              link: "/note/"
            }
          ]
        },
        {
          text: "JavaScript",
          collapsed: false,
          items: [
            {
              text: "JavaScript重点",
              link: "/note/javascript/keypoint/"
            }
          ]
        },
        {
          text: "TypeScript",
          collapsed: false,
          items: [
            {
              text: "TypeScript Learning Data",
              link: "/note/typescript/learning/"
            }
          ]
        },
        {
          text: "Vue",
          collapsed: false,
          items: [
            {
              text: "Vue3",
              link: "/note/vue/"
            }
          ]
        }
      ]
    },
    socialLinks: [{ icon: "github", link: "https://github.com/lingtingAG/vitepressdemo" }]
  }
};
