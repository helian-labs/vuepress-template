---
title: API 参考
---

# API 参考

本节提供了 VuePress 各种 API 和工具的参考文档。

## 主要模块

VuePress 由几个主要模块组成：

- [CLI](./cli.md) - 命令行接口
- 核心模块 - VuePress 的核心功能
- 打包工具 - 用于构建 VuePress 站点的打包器
- 主题 API - 用于开发主题
- 插件 API - 用于开发插件

## 客户端 API

VuePress 提供了一系列客户端 API，可以用于在页面中编写 Vue 组件：

```js
// 获取当前页面
import { usePageData, usePageFrontmatter } from "@vuepress/client"

const page = usePageData()
const frontmatter = usePageFrontmatter()

// 网站配置
import { useSiteData, useSiteLocaleData } from "@vuepress/client"

const site = useSiteData()
const siteLocale = useSiteLocaleData()

// 主题配置
import { useThemeData, useThemeLocaleData } from "@vuepress/client"

const theme = useThemeData()
const themeLocale = useThemeLocaleData()

// 路由
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
```

## Node API

VuePress 提供了 Node.js API，可以用于编程式地构建站点：

```js
import { createVuePress } from "vuepress"

const vuepress = createVuePress({
  // 传入 CLI 配置
  // 等同于命令行参数
})

// 开发模式
await vuepress.dev()

// 构建模式
await vuepress.build()
```

## 插件 API

插件是 VuePress 的核心功能之一，可以用于扩展站点的功能：

```js
// 创建插件
import { createPlugin } from "vuepress"

const myPlugin = createPlugin({
  name: "vuepress-plugin-my-plugin",

  // 各种 Hook
  extendsPageOptions: (options, app) => {
    // 修改 page 选项
    return options
  },

  extendsMarkdown: md => {
    // 扩展 markdown-it
    md.use(/* ... */)
  },

  clientConfigFile: path.resolve(__dirname, "./client.js"),
})
```

使用插件：

```js
import myPlugin from "vuepress-plugin-my-plugin"

export default {
  plugins: [
    myPlugin({
      // 插件选项
    }),
  ],
}
```

## 打包工具 API

VuePress 2.0 默认使用 Vite 作为打包工具，也支持 Webpack：

```js
// 使用 Vite
import { viteBundler } from '@vuepress/bundler-vite'

export default {
  bundler: viteBundler({
    viteOptions: {
      // Vite 配置
    },
    vuePluginOptions: {
      // @vitejs/plugin-vue 选项
    },
  }),
}

// 使用 Webpack
import { webpackBundler } from '@vuepress/bundler-webpack'

export default {
  bundler: webpackBundler({
    configureWebpack: (config, isServer, isBuild) => {
      // Webpack 配置对象
      return {}
    },
    chainWebpack: (config, isServer, isBuild) => {
      // Webpack 链式配置
    },
  }),
}
```

## 主题 API

主题决定了 VuePress 站点的外观和功能：

```js
// 创建主题
import { createTheme } from "vuepress"

const myTheme = createTheme({
  name: "vuepress-theme-my-theme",

  // 继承自默认主题
  extends: defaultTheme({
    // 默认主题配置
  }),

  // 主题设置
  layouts: {
    Layout: path.resolve(__dirname, "layouts/Layout.vue"),
    404: path.resolve(__dirname, "layouts/404.vue"),
  },

  // 主题可以像插件一样使用 Hook
  extendsPageOptions: (options, app) => {
    return options
  },
})
```

使用主题：

```js
import myTheme from "vuepress-theme-my-theme"

export default {
  theme: myTheme({
    // 主题选项
  }),
}
```

## 参考链接

- [VuePress 官方 API 参考](https://v2.vuepress.vuejs.org/zh/reference/config.html)
