---
title: 介绍
---

# 介绍

## VuePress 是什么

VuePress 是一个基于 Vue 的静态网站生成器，最初是为了支持 Vue 及其子项目的文档需求而创建的。

每一个由 VuePress 生成的页面都有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。

## VuePress 2.0

VuePress 2.0 是使用 Vue 3、Vite 和 TypeScript 重写的版本，提供了更好的性能和开发体验。

主要变化包括：

- 使用 Vue 3 作为客户端框架
- 使用 Vite 作为构建工具
- 使用 TypeScript 构建和提供类型定义
- 迁移到 CSS 变量，更好地支持主题定制
- 改进的插件 API
- 更好的 Markdown 支持
- 最小网站结构和组件库

## 核心概念

在深入了解 VuePress 之前，有必要了解一下它的几个核心概念：

### 页面

VuePress 中的每个 Markdown 文件都会被视为一个独立的页面。文件的相对路径将决定页面的路由路径。

### 配置

VuePress 站点的配置文件是 `.vuepress/config.js`，它导出一个 JavaScript 对象。可以在这里定义站点的标题、描述、主题配置等。

### 主题

VuePress 主题决定了站点的外观和功能。默认主题提供了一个漂亮的文档布局，也可以开发自定义主题或使用社区主题。

### 插件

VuePress 插件可以扩展站点的功能，如添加 Google Analytics、PWA 支持等。

## 下一步

- [快速上手](./getting-started.md) - 学习如何设置和配置你的 VuePress 站点。
