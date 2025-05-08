---
title: 主题自定义
---

# 主题自定义指南

本文档介绍如何自定义 VuePress 主题的外观和功能。

## 修改主题颜色

在 `docs/.vuepress/styles/palette.scss` 文件中修改主题颜色：

```scss
:root {
  // 品牌色
  --c-brand: #3eaf7c;
  --c-brand-light: #4abf8a;

  // 背景色
  --c-bg: #ffffff;
  --c-bg-light: #f3f4f5;
  --c-bg-lighter: #eeeeee;
  --c-bg-navbar: var(--c-bg);
  --c-bg-sidebar: var(--c-bg);
  --c-bg-arrow: #cccccc;

  // 文本色
  --c-text: #2c3e50;
  --c-text-accent: var(--c-brand);
  --c-text-light: #3a5169;
  --c-text-lighter: #4e6e8e;
  --c-text-lightest: #6a8bad;
  --c-text-quote: #999999;

  // 边框色
  --c-border: #eaecef;
  --c-border-dark: #dfe2e5;

  // 自定义容器
  --c-tip: #42b983;
  --c-tip-bg: var(--c-bg-light);
  --c-tip-title: var(--c-text);
  --c-tip-text: var(--c-text);
  --c-tip-text-accent: var(--c-text-accent);
  --c-warning: #e7c000;
  --c-warning-bg: #fffae3;
  --c-warning-title: #b29400;
  --c-warning-text: #746000;
  --c-warning-text-accent: #edb563;
  --c-danger: #cc0000;
  --c-danger-bg: #ffe0e0;
  --c-danger-title: #990000;
  --c-danger-text: #660000;
  --c-danger-text-accent: #bd1a1a;
  --c-details-bg: #eeeeee;

  // 徽标
  --c-badge-tip: var(--c-tip);
  --c-badge-warning: var(--c-warning);
  --c-badge-danger: var(--c-danger);

  // 过渡
  --t-color: 0.3s ease;
  --t-transform: 0.3s ease;

  // 代码块
  --code-bg-color: #282c34;
  --code-text-color: #ffffff;
}
```

## 修改布局

在 `docs/.vuepress/styles/index.scss` 文件中修改布局样式：

```scss
// 修改导航栏
.navbar {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

// 修改侧边栏
.sidebar {
  background-color: var(--c-bg-sidebar);
}

// 修改内容区域
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2.5rem;
}

// 修改代码块
div[class*="language-"] {
  border-radius: 6px;
  margin: 1rem 0;
}
```

## 添加自定义组件

1. 在 `docs/.vuepress/components` 目录下创建组件：

```vue
<!-- InfoCard.vue -->
<template>
  <div class="info-card">
    <div class="info-card__header">
      <slot name="header"></slot>
    </div>
    <div class="info-card__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoCard",
}
</script>

<style lang="scss">
.info-card {
  border: 1px solid var(--c-border);
  border-radius: 6px;
  padding: 1rem;
  margin: 1rem 0;

  &__header {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
}
</style>
```

2. 在 Markdown 中使用组件：

```md
<InfoCard>
  <template #header>标题</template>
  内容
</InfoCard>
```

## 添加自定义页面

1. 创建自定义布局组件：

```vue
<!-- CustomLayout.vue -->
<template>
  <div class="custom-layout">
    <header class="custom-header">
      <slot name="header"></slot>
    </header>
    <main class="custom-main">
      <slot></slot>
    </main>
    <footer class="custom-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "CustomLayout",
}
</script>

<style lang="scss">
.custom-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .custom-header {
    padding: 1rem;
    background-color: var(--c-bg-light);
  }

  .custom-main {
    flex: 1;
    padding: 2rem;
  }

  .custom-footer {
    padding: 1rem;
    background-color: var(--c-bg-light);
  }
}
</style>
```

2. 在页面中使用自定义布局：

```md
---
layout: CustomLayout
---

<template #header>

  <h1>自定义标题</h1>
</template>

内容

<template #footer>

  <p>页脚内容</p>
</template>
```

## 添加自定义插件

1. 创建插件文件：

```js
// docs/.vuepress/plugins/my-plugin.js
export default {
  name: "my-plugin",
  clientAppEnhanceFiles: [path.resolve(__dirname, "clientAppEnhance.js")],
}
```

2. 创建客户端增强文件：

```js
// docs/.vuepress/clientAppEnhance.js
import { defineClientAppEnhance } from "vuepress/client"

export default defineClientAppEnhance(({ app, router, siteData }) => {
  // 在这里添加客户端增强代码
})
```

3. 在配置文件中使用插件：

```js
// docs/.vuepress/config.js
import myPlugin from "./plugins/my-plugin"

export default {
  plugins: [myPlugin()],
}
```

## 参考链接

- [VuePress 主题配置](https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html)
- [VuePress 样式配置](https://v2.vuepress.vuejs.org/zh/reference/default-theme/styles.html)
- [VuePress 组件开发](https://v2.vuepress.vuejs.org/zh/advanced/cookbook/usage-of-client-config.html)
