# 自定义样式

VuePress 提供了多种方式来自定义站点的外观和感觉。本模板使用默认主题 (`@vuepress/theme-default`)，其样式定制主要依赖于 CSS 变量和特定的用户样式文件。

## 理解样式结构

默认主题的样式主要由以下部分组成：

-   **基础样式**: 来自 VuePress Core 和默认主题自身的基础 CSS。
-   **主题变量**: 定义在主题中的一系列 CSS 变量 (例如 `--c-brand`, `--c-text`)，用于控制颜色、字体、布局等方面。
-   **用户样式**: 你可以通过特定的文件来覆盖或添加自定义样式。

## 自定义方式

### 1. 覆盖主题调色板 (Palette)

这是最常用的定制方式，用于修改主题的核心颜色、字体大小、代码块样式等。

-   创建文件：`docs/.vuepress/styles/palette.scss` (如果使用 Sass) 或 `docs/.vuepress/styles/palette.css`。
-   在此文件中，覆盖默认主题提供的 CSS 变量。

**示例 (`palette.scss`):**

```scss
// 覆盖默认主题颜色
:root {
  --c-brand: #3498db; // 主品牌色 (例如链接、徽标)
  --c-brand-light: #5dade2; // 主品牌浅色 (例如悬停效果)
  
  --c-text: #2c3e50;
  --c-text-light: #3a5169;
  --c-text-lighter: #4e6e8e;
  --c-text-lightest: #6a8bad;
  
  --c-bg: #ffffff;
  --c-bg-light: #f3f4f5;
  --c-bg-lighter: #eeeeee;
  
  --c-border: #eaecef;
  --c-border-dark: #dfe2e5;
  
  --c-tip: #42b983;
  --c-warning: #e7c000;
  --c-danger: #cc0000;
}

// 覆盖代码块颜色 (需要 Shiki 主题知识)
// :root {
//   --code-bg-color: #282c34;
// }

// 覆盖导航栏高度
// :root {
//   --navbar-height: 4rem;
// }
```

你可以在 [默认主题文档](https://v2.vuepress.vuejs.org/zh/reference/default-theme/styles.html) 中找到更多可用的 CSS 变量。

### 2. 添加全局样式或覆盖 (Index)

如果你需要添加更复杂的 CSS 规则，或者覆盖主题中未通过变量暴露的样式，可以使用这个文件。

-   创建文件：`docs/.vuepress/styles/index.scss` (如果使用 Sass) 或 `docs/.vuepress/styles/index.css`。
-   在此文件中编写你的 CSS 规则。

**示例 (`index.scss`):**

```scss
// 改变所有段落的字体大小
// p {
//   font-size: 1.1rem;
// }

// 自定义特定元素的样式
// .my-custom-class {
//   background-color: yellow;
//   padding: 10px;
//   border: 1px solid red;
// }

// 强制覆盖某个现有样式 (谨慎使用)
// .navbar .logo {
//   height: 2.5rem !important;
// }
```

**优先级**: `index.scss` / `index.css` 中的样式会在 `palette.scss` / `palette.css` 之后应用，因此可以覆盖调色板中的变量效果（但不推荐这样做，优先使用 `palette` 文件覆盖变量）。

### 3. 组件内部样式

对于你在 `docs/.vuepress/components/` 目录下创建的自定义 Vue 组件，推荐使用 `<style scoped>` 来编写组件的样式。

```vue
<template>
  <button class="my-custom-button"><slot /></button>
</template>

<style scoped>
.my-custom-button {
  background-color: var(--c-brand); /* 使用主题变量 */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.my-custom-button:hover {
  background-color: var(--c-brand-light);
}
</style>
```

`scoped` 属性可以确保这些样式只应用于当前组件，不会泄露到全局或其他组件，避免样式冲突。

### 4. 公共静态资源 (Public)

如果你需要引入自定义字体文件、图标或其他不常变动的 CSS 文件，可以将它们放在 `docs/.vuepress/public/` 目录下。

然后在 `.vuepress/config.js` 的 `head` 配置中引入它们：

```js
// .vuepress/config.js
export default {
  head: [
    // 引入外部 CSS
    ['link', { rel: 'stylesheet', href: '/styles/custom-font.css' }],
    // 引入 Font Awesome
    // ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' }]
  ]
}
```

## 提示

-   修改样式文件后，VuePress 的热重载 (HMR) 通常会自动生效。如果样式没有更新，尝试重启开发服务器 (`pnpm docs:dev`)。
-   使用浏览器的开发者工具检查元素，可以帮助你找到需要覆盖的 CSS 选择器和变量名。 
