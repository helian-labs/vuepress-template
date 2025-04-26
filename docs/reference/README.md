---
title: 参考
---

# 配置

VuePress 站点的配置文件位于 `.vuepress/config.js`，它导出一个 JavaScript 对象，包含了站点的各种配置选项。

## 配置指南

本节包含了 VuePress 站点配置的详细信息：

- [基本配置](./basic-config.md) - 站点名称、描述、语言等基本配置
- [主题配置](./theme-config.md) - 导航栏、侧边栏、外观等主题配置

## 配置示例

以下是一个完整的配置示例：

```js
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  // 站点配置
  lang: 'zh-CN',
  title: 'VuePress 模板',
  description: '基于 VuePress 的文档站点模板',
  head: [
    ['link', { rel: 'icon', href: '/images/logo.png' }],
    ['meta', { name: 'author', content: 'VuePress 团队' }],
    ['meta', { name: 'keywords', content: 'vuepress, vue, 文档, 博客' }],
  ],

  // Vite 打包工具配置
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  // 主题配置
  theme: defaultTheme({
    logo: '/images/logo.png',
    repo: 'https://github.com/yourusername/vuepress-template',
    docsDir: 'docs',
    navbar: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '配置', link: '/config/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          children: [
            '/guide/README.md',
            '/guide/introduction.md',
            '/guide/getting-started.md',
          ],
        },
      ],
      '/config/': [
        {
          text: '配置',
          children: [
            '/config/README.md',
            '/config/basic-config.md',
            '/config/theme-config.md',
          ],
        },
      ],
    },
  }),

  // Markdown 配置
  markdown: {
    anchor: { permalink: true, permalinkSymbol: '#' },
    links: { externalAttrs: { target: '_blank', rel: 'noopener noreferrer' } },
    toc: { includeLevel: [1, 2, 3] },
  },
})
```

## 参考链接

- [VuePress 官方配置参考](https://v2.vuepress.vuejs.org/zh/reference/config.html)
