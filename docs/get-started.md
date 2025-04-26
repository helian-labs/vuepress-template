---
title: 快速开始
---

# 快速开始

这是一个基础页面，包含 VuePress 的基本知识。

## 页面

你可以在 VuePress 目录中添加 Markdown 文件，每个 Markdown 文件都会被转换为站点中的一个页面。

更多详情请参见[路由][]。

## 内容

每个 Markdown 文件[会被渲染为 HTML，然后转换为 Vue 单文件组件][content]。

VuePress 支持基本的 Markdown 语法和[一些扩展][syntax-extensions]，你还可以在其中[使用 Vue 特性][vue-feature]。

## 配置

VuePress 使用 `.vuepress/config.js`（或 .ts）文件作为[站点配置][config]，你可以用它来配置你的站点。

对于[客户端配置][client-config]，你可以创建 `.vuepress/client.js`（或 .ts）。

同时，你也可以通过[frontmatter][]为每个页面添加配置。

## 布局和自定义

以下是控制 `@vuepress/theme-default` 布局的常见配置：

- [导航栏][navbar]
- [侧边栏][sidebar]

查看[默认主题文档][default-theme]获取完整参考。

你可以通过 `.vuepress/styles/index.scss` 文件[添加额外样式][style]。

[routing]: https://v2.vuepress.vuejs.org/zh/guide/page.html#routing
[content]: https://v2.vuepress.vuejs.org/zh/guide/page.html#content
[syntax-extensions]: https://v2.vuepress.vuejs.org/zh/guide/markdown.html#syntax-extensions
[vue-feature]: https://v2.vuepress.vuejs.org/zh/guide/markdown.html#using-vue-in-markdown
[config]: https://v2.vuepress.vuejs.org/zh/guide/configuration.html#client-config-file
[client-config]: https://v2.vuepress.vuejs.org/zh/guide/configuration.html#client-config-file
[frontmatter]: https://v2.vuepress.vuejs.org/zh/guide/page.html#frontmatter
[navbar]: https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#navbar
[sidebar]: https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#sidebar
[default-theme]: https://v2.vuepress.vuejs.org/zh/reference/default-theme/
[style]: https://v2.vuepress.vuejs.org/zh/reference/default-theme/styles.html#style-file
