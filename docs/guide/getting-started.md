---
title: 快速上手
---

# 快速上手

本指南将帮助你从头开始构建一个简单的 VuePress 网站。如果你已经有了现成的项目并希望将 VuePress 集成进去，请移步[指南](./README.md)。

## 前置条件

- [Node.js](https://nodejs.org/) 版本 16.0.0 或更高
- 包管理器如 [npm](https://www.npmjs.com/)、[yarn](https://yarnpkg.com/) 或 [pnpm](https://pnpm.io/)

::: tip
在下面的说明中，我们将使用 [pnpm](https://pnpm.io/) 作为包管理器的示例。你可以使用喜欢的包管理器，相应地更改命令。
:::

## 安装

以下步骤将帮助你安装本模板并开始使用：

### 克隆项目

```bash
git clone https://github.com/yourusername/vuepress-template.git my-docs
cd my-docs
```

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm docs:dev
```

VuePress 开发服务器将在 `localhost:8080` 启动。

## 项目结构

成功安装后，你的项目应该具有以下结构：

```
.
├── docs
│   ├── .vuepress
│   │   ├── public        # 静态资源目录
│   │   └── config.js     # 配置文件
│   ├── guide             # 指南目录
│   │   ├── README.md     # 指南首页
│   │   ├── introduction.md
│   │   └── getting-started.md
│   └── README.md         # 网站首页
└── package.json          # 项目依赖
```

## 基本配置

VuePress 的配置文件是 `.vuepress/config.js`，下面是一个基本配置示例：

```js
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  // 站点配置
  lang: 'zh-CN',
  title: '我的文档站点',
  description: '这是我的第一个 VuePress 站点',

  // 主题配置
  theme: defaultTheme({
    logo: '/images/logo.png',
    navbar: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
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
    },
  }),
})
```

## 内容编写

VuePress 以 Markdown 为中心，所有内容都是由 Markdown 文件生成的。下面是一个示例页面：

````md
---
title: 我的第一篇文章
---

# 我的第一篇文章

VuePress 使用 Markdown 增强语法提供了许多有用的特性。

## 代码块

```js
console.log('Hello, VuePress!')
```
````

## 提示容器

::: tip 提示
这是一个提示
:::

::: warning 注意
这是一个警告
:::

::: danger 警告
这是一个危险警告
:::

````

## 部署

要部署你的 VuePress 站点，先构建静态文件：

```bash
pnpm docs:build
````

构建完成后，`docs/.vuepress/dist` 目录下会生成静态文件，你可以将这些文件部署到任何静态网站托管服务，如 GitHub Pages、Netlify 或 Vercel。

### 使用 GitHub Actions 自动部署到 GitHub Pages

本模板提供了一个预置的 GitHub Actions 工作流 (`.github/workflows/deploy.yml`)，可以在你将代码推送到主分支 (例如 `main`) 时自动构建和部署文档到 GitHub Pages。

要使其生效，你需要：

1. **在 GitHub 仓库设置中启用 GitHub Pages**: 前往你的仓库 "Settings" -> "Pages"。
2. **选择部署源 (Source)**: 选择 "GitHub Actions"。

之后，每次推送到主分支，GitHub Actions 会自动运行 `deploy.yml` 工作流，完成构建和部署。

你可以在仓库的 "Actions" 标签页查看工作流的运行状态。

::: tip 提示
如果你需要部署到自定义域名，请在 `.vuepress/public` 目录下创建一个名为 `CNAME` 的文件，并将你的域名写入其中。
:::

## 下一步

现在你已经了解了 VuePress 的基本使用方法，可以继续探索更多高级功能和模板特性：

- **配置**: 学习如何配置 [导航栏和侧边栏](./configuration.md) (页面待创建)。
- **内容**: 了解如何 [添加新的文档页面](./adding-content.md) (页面待创建)，以及如何使用 [内容验证脚本](./content-validation.md)。
- **组件**: 探索如何在 Markdown 中 [使用自定义组件](./components.md) 以及如何 [创建新组件](./components.md#创建新组件) (需要更新 components.md)。
- **样式**: 学习如何 [自定义网站样式](./styling.md) (页面待创建)。
- **VuePress**: 查阅官方 [VuePress 文档](https://v2.vuepress.vuejs.org/zh/) 获取更深入的信息。
