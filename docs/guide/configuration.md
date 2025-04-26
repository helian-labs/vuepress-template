---
title: 配置
---

# 配置导航栏和侧边栏

VuePress 站点的导航栏和侧边栏主要通过 `.vuepress/config.js` 文件中的 `themeConfig` 对象进行配置。本模板使用了 `@vuepress/theme-default`，其配置方式如下。

## 导航栏 (Navbar)

导航栏配置在 `themeConfig.navbar` 数组中。

```js
// .vuepress/config.js
import { defaultTheme } from '@vuepress/theme-default'

export default {
  theme: defaultTheme({
    navbar: [
      // 简单的链接项
      { text: '首页', link: '/' },

      // 指向指南目录的链接项
      { text: '指南', link: '/guide/' },

      // 嵌套的下拉菜单
      {
        text: 'API文档',
        children: [
          { text: 'API V1', link: '/api/v1/' },
          { text: 'API V2', link: '/api/v2/' },
          {
            text: '相关链接',
            children: [
              { text: 'GitHub', link: 'https://github.com' },
              { text: 'VuePress', link: 'https://v2.vuepress.vuejs.org/' },
            ],
          },
        ],
      },

      // 使用分组的嵌套下拉菜单
      {
        text: '配置项',
        children: [
          {
            text: '基础配置',
            children: ['/config/basic.md', '/config/theme.md'],
          },
          {
            text: '高级配置',
            children: ['/config/advanced.md'],
          },
        ],
      },

      // 外部链接
      {
        text: '模板仓库',
        link: 'https://github.com/vuepress/vuepress-next',
        target: '_blank',
      },
    ],
  }),
}
```

### 导航栏项配置

每个导航栏项可以是一个对象，包含以下属性：

- `text`: 链接的文本。
- `link`: 链接的路径 (内部路径或外部 URL)。
- `target`: 链接的 `target` 属性 (例如 `_blank` 在新标签页打开)。
- `rel`: 链接的 `rel` 属性。
- `activeMatch`: 用于决定该链接项是否应处于激活状态的正则表达式。例如，`/guide/` 会匹配所有以 `/guide/` 开头的路径。
- `children`: 用于创建嵌套下拉菜单，其值是另一个导航栏项配置数组。

## 侧边栏 (Sidebar)

侧边栏配置在 `themeConfig.sidebar` 对象中。侧边栏可以为不同的页面路径设置不同的内容。

### 基本配置 (数组形式)

最简单的配置是直接提供一个包含链接路径的数组。VuePress 会自动提取页面的 H2 标题作为侧边栏项。

```js
// .vuepress/config.js
export default {
  theme: defaultTheme({
    sidebar: [
      // 侧边栏项
      '/guide/README.md',
      '/guide/getting-started.md',
      '/guide/configuration.md',
    ],
  }),
}
```

### 对象形式 (按路径配置)

你可以为不同的 URL 路径前缀配置不同的侧边栏。

```js
// .vuepress/config.js
export default {
  theme: defaultTheme({
    sidebar: {
      // /guide/ 路径下的侧边栏
      '/guide/': [
        // 简单链接
        '/guide/README.md',

        // 分组
        {
          text: '基础',
          collapsible: true, // 是否可折叠
          children: ['/guide/getting-started.md', '/guide/configuration.md'],
        },
        {
          text: '进阶',
          collapsible: false,
          children: [
            '/guide/adding-content.md',
            '/guide/components.md',
            '/guide/styling.md',
          ],
        },
      ],

      // /api/ 路径下的侧边栏
      '/api/': [
        {
          text: 'API 文档',
          children: ['/api/v1/README.md', '/api/v2/README.md'],
        },
      ],

      // fallback: 如果其他路径都没有匹配，则使用根路径的侧边栏
      '/': [
        '', // README.md
        'contact.md',
        'about.md',
      ],
    },
  }),
}
```

### 侧边栏项配置

在侧边栏数组中，每个元素可以是：

- **字符串**: 一个指向 Markdown 文件的相对路径。文本将是页面的第一个 H1 或 `title` (来自 Frontmatter)。
- **对象**: 用于创建分组或自定义链接。
  - `text`: 分组或链接的文本。
  - `link` (可选): 如果提供，则该项是一个可点击的链接。
  - `collapsible` (可选, 默认为 `true`): 分组是否可折叠。
  - `children`: 一个包含其他侧边栏项的数组 (字符串或对象)，用于创建嵌套分组。

### 自动侧边栏

你还可以让 VuePress 根据文件结构自动生成侧边栏。

```js
// .vuepress/config.js
export default {
  theme: defaultTheme({
    // 禁用明确的侧边栏配置
    // sidebar: 'auto', // 不推荐，通常需要更精细的控制
    // 或者为特定路径启用
    sidebar: {
      '/reference/': 'auto',
    },
  }),
}
```

但是，对于结构化的文档，**手动配置侧边栏**通常能提供更好的用户体验和更清晰的导航结构。

## 结合导航栏和侧边栏

通常，导航栏用于站点的主要区域切换 (如 指南、API、配置)，而侧边栏用于显示当前区域内的页面结构。

- 当用户点击导航栏切换到 `/guide/` 时，会显示 `/guide/` 对应的侧边栏。
- 当用户点击导航栏切换到 `/api/` 时，会显示 `/api/` 对应的侧边栏。

确保你的 `sidebar` 配置的 key (如 `/guide/`, `/api/`) 与 `navbar` 中的 `link` 或 `activeMatch` 能够对应起来。
