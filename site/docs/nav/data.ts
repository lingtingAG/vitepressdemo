import { icon } from './iconSvg';
export const NAV_DATA = [
  {
    title: "Vue组件库",
    items: [
      {
        key: "https://cn.vuejs.org",
        icon: icon.Vue,
        title: "Vue官网",
        desc: '渐进式JavaScript 框架',
        link: "https://cn.vuejs.org/"
      },
      {
        key: "https://router.vuejs.org/zh/",
        icon: icon.Vue,
        title: "Vue Router",
        desc: 'Vue.js 的官方路由',
        link: "https://router.vuejs.org/zh/"
      },
      {
        key: "https://vuex.vuejs.org/zh/",
        icon: {
          svg:icon.Vuex
        },
        title: "Vuex",
        desc: 'Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库',
        link: "https://vuex.vuejs.org/zh/"
      },
      {
        key: "https://pinia.vuejs.org/zh/",
        icon: icon.Pinia,
        title: "Pinia",
        desc: '符合直觉的Vue.js 状态管理库',
        link: "https://pinia.vuejs.org/zh/"
      },
      {
        key: "https://vueuse.org/",
        icon: icon.VueUse,
        title: "VueUse",
        desc: 'Collection of Vue Composition Utilities',
        link: "https://vueuse.org/"
      }
    ]
  },
  {
    title: "UI组件库",
    items: [
      {
        key: "https://element.eleme.cn/#/zh-CN",
        icon: icon.Element,
        title: "Element",
        desc: '一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库',
        link: "https://element.eleme.cn/#/zh-CN"
      },
      {
        key: "https://element-plus.gitee.io/zh-CN/",
        icon: icon.Element,
        title: "Element Plus",
        desc: '基于 Vue 3，面向设计师和开发者的组件库',
        link: "https://element-plus.gitee.io/zh-CN/"
      },
      {
        key: "https://www.naiveui.com/zh-CN/os-theme",
        icon: icon['Naive UI'],
        title: "Naive UI",
        desc: '一个 Vue 3 组件库比较完整，主题可调，使用 TypeScript',
        link: "https://www.naiveui.com/zh-CN/os-theme"
      },
    ]
  },
  {
    title: "构建工具",
    items: [
      {
        key: "https://www.webpackjs.com/",
        icon: icon.webpack,
        title: "webpack",
        desc: 'webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具',
        link: "https://www.webpackjs.com/"
      },
      {
        key: "https://vitejs.cn/vite3-cn/",
        icon: icon.vite,
        title: "vite",
        desc: 'Vite 下一代的前端工具链',
        link: "https://vitejs.cn/vite3-cn/"
      },
    ]
  },
  {
    title: "JS组件库",
    items: [
      {
        key: "https://www.lodashjs.com/",
        icon: icon.Lodash,
        title: "Lodash",
        desc: 'Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库',
        link: "https://www.lodashjs.com/"
      },
    ]
  },
  {
    title: "NodeJS",
    items: [
      {
        key: "https://nodejs.org/zh-cn/",
        icon: icon.NodeJS,
        title: "Node",
        desc: 'Node.js® 是一个开源、跨平台的 JavaScript 运行时环境。',
        link: "https://nodejs.org/zh-cn/"
      },
      {
        key: "https://www.nestjs.com.cn/",
        icon: icon.NestJS,
        title: "NestJS",
        desc: 'Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架',
        link: "https://www.nestjs.com.cn/"
      },
      {
        key: "https://typeorm.biunav.com/zh",
        icon: icon.TypeORM,
        title: "TypeORM",
        desc: 'TypeORM 是一个ORM (opens new window)框架，它可以运行在 NodeJS、Browser、Cordova、PhoneGap、Ionic、React Native、Expo 和 Electron 平台上，可以与 TypeScript 和 JavaScript (ES5,ES6,ES7,ES8)一起使用',
        link: "https://typeorm.biunav.com/zh"
      },
    ]
  },
  {
    title: "学习资源",
    items: [
      {
        key: "https://www.npmjs.com/",
        icon: icon.npm,
        title: "npm",
        desc: '通过 npm 可以安装、共享、分发代码,管理项目依赖关系',
        link: "https://www.npmjs.com/"
      },
      {
        key: "https://developer.mozilla.org/zh-CN/",
        icon: icon.MDN,
        title: "MDN",
        desc: 'Resources for Developers,by Developers',
        link: "https://developer.mozilla.org/zh-CN/"
      },
      {
        key: "https://zh.javascript.info/",
        icon: icon['JavaScript.INFO'],
        title: "现代JavaScript教程",
        desc: '以最新的 JavaScript 标准为基准。通过简单但足够详细的内容，为你讲解从基础到高阶的 JavaScript 相关知识',
        link: "https://zh.javascript.info/"
      },
      {
        key: "https://jkchao.github.io/typescript-book-chinese/#why",
        icon: icon['typescript-book'],
        title: "深入理解TypeScript",
        desc: '此书是 《TypeScript Deep Dive》 的中文翻译版，从基础到深入，很全面的阐述了 TypeScript 的各种魔法，不管你是新手，还是老鸟，它都将适应你',
        link: "https://jkchao.github.io/typescript-book-chinese/#why"
      },
    ]
  },
  {
    title: "社区论坛",
    items: [
      {
        key: "https://juejin.cn/",
        icon: icon.juejin,
        title: "掘金",
        desc: '一个帮助开发者成长的社区',
        link: "https://juejin.cn/"
      },
      {
        key: "https://v2ex.com/",
        icon: icon.V2EX,
        title: "V2EX",
        desc: 'V2EX是一个面向程序员、极客人群的分享交流社区',
        link: "https://v2ex.com/"
      }
    ]
  },
  {
    title: "工具库",
    items: [
      {
        key: "https://stackblitz.com/",
        icon: icon.stackblitz,
        title: "stackblitz",
        desc: 'Dev environments. In your web app.',
        link: "https://stackblitz.com/"
      },
    ]
  },
  {
    title: "小程序",
    items: [
      {
        key: "https://uniapp.dcloud.net.cn/",
        icon: icon['uni-app'],
        title: "uni-app",
        desc: 'uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台',
        link: "https://uniapp.dcloud.net.cn/"
      },
    ]
  }
];
