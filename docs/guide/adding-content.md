---
title: 添加内容
---

# 添加新内容

本指南介绍如何向你的 VuePress 项目中添加新的 Markdown 页面和目录，以及如何使用辅助脚本简化此过程。

## 手动添加页面

1.  **创建 Markdown 文件**: 在 `docs/` 目录下的相应子目录中创建 `.md` 文件。例如，要在指南部分添加一个关于部署的页面，你可以创建 `docs/guide/deployment.md`。

        ```md
        ---
        title: 部署指南
        date: 2023-10-27
        ---

        # 部署指南

        这里是部署相关的文档内容...
        ```

    ::: tip Frontmatter
    建议在新页面中包含 `title` Frontmatter 字段，它通常会被主题用于生成标题和侧边栏文本。
    :::

2.  **更新侧边栏**: 打开 `.vuepress/config.js` 文件，找到 `themeConfig.sidebar` 的配置。将新页面的相对路径添加到相应的侧边栏数组中。

    ```js {4}
    // .vuepress/config.js
    sidebar: {
      '/guide/': [
        {
          text: '基础',
          collapsible: true,
          children: [
            '/guide/README.md',
            '/guide/getting-started.md',
            '/guide/configuration.md'
          ]
        },
        {
          text: '进阶',
          collapsible: false,
          children: [
            '/guide/adding-content.md',
            '/guide/deployment.md', // <-- 添加新页面路径
            '/guide/components.md',
            '/guide/styling.md' // 待创建
          ]
        }
      ],
      // ... 其他路径的侧边栏
    }
    ```

3.  **重启开发服务器**: 如果开发服务器正在运行，你需要重启它 (Ctrl+C 然后 `pnpm docs:dev`) 来加载新的侧边栏配置和页面。

## 添加目录

如果你想添加一个全新的内容版块 (例如，一个 "教程" 部分)，步骤类似：

1.  **创建目录**: 在 `docs/` 下创建新目录，例如 `docs/tutorial/`。
2.  **添加页面**: 在新目录中添加 `README.md` (作为该部分的首页) 和其他 `.md` 文件。
3.  **更新导航栏 (可选)**: 如果希望在顶部导航栏直接链接到这个新版块，可以在 `config.js` 的 `themeConfig.navbar` 中添加一项，例如 `{ text: '教程', link: '/tutorial/' }`。
4.  **更新侧边栏**: 在 `config.js` 的 `themeConfig.sidebar` 中为新路径添加配置，例如：

    ```js
    // .vuepress/config.js
    sidebar: {
      '/guide/': [ /* ... 指南侧边栏 ... */ ],

      // 新增教程侧边栏
      '/tutorial/': [
        {
          text: '入门教程',
          children: [
            '/tutorial/README.md',
            '/tutorial/lesson1.md',
            '/tutorial/lesson2.md'
          ]
        }
      ],

      '/api/': [ /* ... API 侧边栏 ... */ ],
      '/': [ /* ... 根路径侧边栏 ... */ ]
    }
    ```

## 使用 new-page 脚本 (推荐)

为了简化创建新页面的流程，本模板提供了一个辅助脚本 `scripts/new-page.js`。

**用法**: 在项目根目录下运行：

```bash
pnpm run docs:new
# 或者
node scripts/new-page.js
```

**流程**: 脚本会依次询问你：

1. **选择文档类型**: 从预设的目录 (如 `guide`, `config`, `api`) 中选择，脚本会将页面创建在此目录下。
2. **输入文件名**: 输入页面的文件名 (不含 `.md` 后缀)。
3. **输入页面标题**: 输入页面的 Markdown H1 标题。
4. **选择模板**: 选择一个基本的页面模板 (如 `normal`)。

脚本会自动：

- 检查文件是否已存在。
- 如果目录不存在，则创建目录。
- 使用所选模板和输入的标题创建 `.md` 文件。

```mermaid
graph TD
    A[运行 `pnpm run docs:new`] --> B{选择类型 (e.g., guide)};
    B --> C{输入文件名 (e.g., new-feature)};
    C --> D{输入标题 (e.g., 新功能介绍)};
    D --> E{选择模板 (e.g., normal)};
    E --> F[创建 docs/guide/new-feature.md];
```

::: warning 注意
`new-page.js` 脚本**不会**自动更新 `.vuepress/config.js` 中的侧边栏配置。创建页面后，你仍然需要手动编辑 `config.js` 将新页面添加到侧边栏中。
:::

这个脚本主要用于快速生成带有基本结构和 Frontmatter 的 Markdown 文件。
