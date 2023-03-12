import { h, App } from "vue";
import { useData } from "vitepress";
import Theme from "vitepress/theme";
import vitepressdemo from "vitepressdemo";

export default Object.assign({}, Theme, {
  Layout: () => {
    const props: Record<string, any> = {};
    // 获取 frontmatter
    const { frontmatter } = useData();

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass;
    }

    return h(Theme.Layout, props);
  },
  enhanceApp: async ({ app }) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    app.use(vitepressdemo);
  }
});

// export default {
//     ...DefaultTheme,
//     enhanceApp: async ({ app }) => {
//         // app is the Vue 3 app instance from `createApp()`. router is VitePress'
//         // custom router. `siteData`` is a `ref`` of current site-level metadata.
//         app.use(vitepressdemo);

//     },
// };
