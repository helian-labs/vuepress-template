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

VuePress 开发服务器将在 [http://localhost:8080](http://localhost:8080) 启动。

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

```md
---
title: 我的第一篇文章
---

# 我的第一篇文章

VuePress 使用 Markdown 增强语法提供了许多有用的特性。

## 代码块

```js
console.log('Hello, VuePress!')
```

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
```

## 部署

要部署你的 VuePress 站点，先构建静态文件：

```bash
pnpm docs:build
```

构建完成后，`docs/.vuepress/dist` 目录下会生成静态文件，你可以将这些文件部署到任何静态网站托管服务，如 GitHub Pages、Netlify 或 Vercel。

### GitHub Pages

对于 GitHub Pages，你可以添加以下脚本到 `package.json`：

```json
{
  "scripts": {
    "docs:deploy": "bash deploy.sh"
  }
}
```

然后创建一个 `deploy.sh` 文件：

```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

## 下一步

现在你已经了解了 VuePress 的基本使用方法，可以继续探索更多高级功能：

- [配置参考](/config/) - 了解 VuePress 的配置选项
- [主题开发](/api/) - 学习如何开发自定义主题
- [插件使用](/api/) - 探索 VuePress 的插件系统 
