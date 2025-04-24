# 基本配置

VuePress 站点的基本配置包括站点信息、语言、页面头部等设置。

## 站点信息

```js
export default {
  // 站点语言
  lang: 'zh-CN',
  
  // 站点标题
  title: 'VuePress 模板',
  
  // 站点描述
  description: '基于 VuePress 的文档站点模板',
  
  // 站点 base 路径，默认是 /
  base: '/',
}
```

### `lang`

- 类型: `string`
- 默认值: `en-US`

站点的语言，它将会在 HTML 的 `<html>` 标签中作为 `lang` 属性。

### `title`

- 类型: `string`
- 默认值: `''`

站点的标题，它将会作为所有页面的标题后缀，并且在默认主题的导航栏中显示。

### `description`

- 类型: `string`
- 默认值: `''`

站点的描述，它将会在 HTML 中作为 `<meta>` 标签渲染。

### `base`

- 类型: `string`
- 默认值: `/`

站点的基础路径，如果你想让你的网站部署到 `https://foo.github.io/bar/`，那么你应该将 `base` 设置为 `"/bar/"`。它的值应该以 `/` 开始和结束。

## 页面头部

你可以通过 `head` 选项来添加页面的额外标签：

```js
export default {
  head: [
    // 添加 favicon
    ['link', { rel: 'icon', href: '/images/logo.png' }],
    
    // 添加作者标签
    ['meta', { name: 'author', content: 'VuePress 团队' }],
    
    // 添加关键词
    ['meta', { name: 'keywords', content: 'vuepress, vue, 文档, 博客' }],
    
    // 添加自定义 JavaScript
    ['script', { src: '/js/custom.js' }],
    
    // 添加自定义 CSS
    ['link', { rel: 'stylesheet', href: '/styles/custom.css' }],
  ],
}
```

页面的 `<head>` 标签会在所有页面中渲染，对于特定页面的头部标签，可以在页面的 Frontmatter 中使用 `head` 字段。

## 多语言支持

VuePress 支持多语言配置：

```js
export default {
  locales: {
    // 默认语言 - 中文
    '/': {
      lang: 'zh-CN',
      title: 'VuePress 模板',
      description: '基于 VuePress 的文档站点模板',
    },
    // 英文
    '/en/': {
      lang: 'en-US',
      title: 'VuePress Template',
      description: 'A VuePress-based documentation site template',
    },
  },
}
```

每个语言的子路径都需要在主题配置中设置对应的导航栏和侧边栏配置。

## 打包工具配置

VuePress 2.0 默认使用 Vite 作为打包工具，你也可以使用 Webpack：

```js
// Vite
import { viteBundler } from '@vuepress/bundler-vite'

export default {
  bundler: viteBundler({
    viteOptions: {
      // Vite 配置选项
    },
    vuePluginOptions: {
      // @vitejs/plugin-vue 选项
    },
  }),
}

// Webpack
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

## Markdown 配置

VuePress 提供了强大的 Markdown 配置选项：

```js
export default {
  markdown: {
    // 设置锚点选项
    anchor: { 
      permalink: true,
      permalinkSymbol: '#',
    },
    
    // 设置外部链接选项
    links: { 
      externalAttrs: { 
        target: '_blank', 
        rel: 'noopener noreferrer',
      },
    },
    
    // 设置目录选项
    toc: { 
      includeLevel: [1, 2, 3],
    },
    
    // 启用代码块行号
    code: {
      lineNumbers: true,
    },
  },
}
```

更多 Markdown 配置可参考 [VuePress Markdown 配置](https://v2.vuepress.vuejs.org/zh/reference/config.html#markdown)。

## 参考链接

- [VuePress 官方配置参考](https://v2.vuepress.vuejs.org/zh/reference/config.html) 
