---
title: 主题配置
---

# 主题配置

VuePress 默认主题提供了许多配置选项，以满足大多数文档网站的需求。本页将详细介绍如何配置 VuePress 的默认主题。

## 基本配置

要使用默认主题，首先需要导入并使用它：

```js
import { defaultTheme } from "@vuepress/theme-default"

export default {
  theme: defaultTheme({
    // 默认主题配置
    logo: "/images/logo.png",
    navbar: [
      /* ... */
    ],
    sidebar: {
      /* ... */
    },
  }),
}
```

## 导航栏配置

导航栏（`navbar`）可以包含站点标题、搜索框、导航链接、多语言切换、仓库链接等。

### 导航链接

你可以通过 `navbar` 选项配置导航栏链接：

```js
theme: defaultTheme({
  navbar: [
    // 导航链接
    {
      text: "首页",
      link: "/",
    },
    // 下拉菜单
    {
      text: "指南",
      children: [
        {
          text: "介绍",
          link: "/guide/introduction.html",
        },
        {
          text: "快速上手",
          link: "/guide/getting-started.html",
        },
      ],
    },
    // 嵌套下拉菜单
    {
      text: "参考",
      children: [
        {
          text: "配置",
          children: ["/config/README.md", "/config/basic-config.md"],
        },
        {
          text: "API",
          children: ["/api/README.md", "/api/cli.md"],
        },
      ],
    },
  ],
})
```

### 禁用导航栏

你可以通过 `navbar: false` 来禁用所有页面的导航栏：

```js
theme: defaultTheme({
  navbar: false,
})
```

你也可以通过页面的 frontmatter 来禁用特定页面的导航栏：

```yaml
---
navbar: false
---
```

## 侧边栏配置

侧边栏（`sidebar`）可以包含多个侧边栏项，通常用于展示文档的层次结构。

### 简单配置

最简单的配置是提供一个链接数组：

```js
theme: defaultTheme({
  sidebar: [
    "/", // 首页
    "/guide/", // 指南首页
    "/guide/introduction", // 介绍页
  ],
})
```

### 分组配置

你可以将侧边栏链接分组：

```js
theme: defaultTheme({
  sidebar: [
    {
      text: "指南",
      collapsible: true, // 可折叠
      children: ["/guide/", "/guide/introduction", "/guide/getting-started"],
    },
    {
      text: "配置",
      collapsible: false, // 不可折叠
      children: ["/config/", "/config/basic-config", "/config/theme-config"],
    },
  ],
})
```

### 多个侧边栏

为不同的页面路径配置不同的侧边栏：

```js
theme: defaultTheme({
  sidebar: {
    "/guide/": [
      {
        text: "指南",
        children: ["/guide/", "/guide/introduction", "/guide/getting-started"],
      },
    ],
    "/config/": [
      {
        text: "配置",
        children: ["/config/", "/config/basic-config", "/config/theme-config"],
      },
    ],
  },
})
```

### 禁用侧边栏

你可以通过 `sidebar: false` 来禁用所有页面的侧边栏：

```js
theme: defaultTheme({
  sidebar: false,
})
```

你也可以通过页面的 frontmatter 来禁用特定页面的侧边栏：

```yaml
---
sidebar: false
---
```

## 版权信息

配置页脚版权信息：

```js
theme: defaultTheme({
  // 默认为 'MIT Licensed | Copyright © 2018-present Vue.js'
  footer: "MIT Licensed | Copyright © 2024",
})
```

某些页面也可以在 frontmatter 中自定义页脚：

```yaml
---
footer: 这是自定义页脚
---
```

## 编辑链接

启用编辑链接，让用户可以轻松地编辑文档：

```js
theme: defaultTheme({
  // 编辑链接
  editLink: true,
  editLinkText: "在 GitHub 上编辑此页",
  docsRepo: "https://github.com/vuepress/core",
  docsBranch: "main",
  docsDir: "docs",
})
```

## 贡献者和最后更新时间

显示页面贡献者和最后更新时间：

```js
theme: defaultTheme({
  lastUpdated: true,
  lastUpdatedText: "上次更新",
  contributors: true,
  contributorsText: "贡献者",
})
```

## 多语言支持

配置多语言支持：

```js
export default {
  locales: {
    "/": {
      lang: "zh-CN",
      title: "VuePress 模板",
      description: "基于 VuePress 的文档站点模板",
    },
    "/en/": {
      lang: "en-US",
      title: "VuePress Template",
      description: "A VuePress-based documentation site template",
    },
  },
  theme: defaultTheme({
    locales: {
      "/": {
        navbar: [
          { text: "首页", link: "/" },
          { text: "指南", link: "/guide/" },
        ],
        sidebar: {
          "/guide/": [
            {
              text: "指南",
              children: [
                /* ... */
              ],
            },
          ],
        },
      },
      "/en/": {
        navbar: [
          { text: "Home", link: "/en/" },
          { text: "Guide", link: "/en/guide/" },
        ],
        sidebar: {
          "/en/guide/": [
            {
              text: "Guide",
              children: [
                /* ... */
              ],
            },
          ],
        },
      },
    },
  }),
}
```

## 参考链接

- [VuePress 默认主题配置](https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html)

## 更多配置

更多配置选项请参考 [VuePress 默认主题配置文档](https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html)。
