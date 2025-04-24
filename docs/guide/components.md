---
title: 使用和创建组件
---

# 使用和创建组件

VuePress 允许你在 Markdown 文件中直接使用 Vue 组件，这极大地增强了文档的表现力。本模板项目对组件的使用进行了约定，并提供了辅助脚本来简化组件创建。

## 概述：组件系统

本模板的组件系统基于以下特性：

- **自动注册**: 使用 `@vuepress/plugin-register-components` 插件，放置在 `docs/.vuepress/components/` 目录下的 `.vue` 文件会被自动注册为全局组件。
- **建议目录结构**: 为了更好地组织，建议将组件放入以下子目录：
    *   `global/`: 放置在多个页面广泛使用的全局组件。
    *   `layout/`: 放置与布局相关的组件。
    *   `ui/`: 放置通用的 UI 元素，如按钮、卡片等。
- **创建脚本**: 提供 `scripts/create-component.js` 脚本，通过 `pnpm run docs:component` 命令快速生成带有模板的新组件。

## 使用组件

已注册的组件可以直接在 Markdown 文件中使用，就像使用 HTML 标签一样。组件名称通常是其文件名（遵循 PascalCase 或 kebab-case）。

**示例：使用内置 InfoCard 组件**

本模板在 `docs/.vuepress/components/ui/InfoCard.vue` 提供了一个示例信息卡片组件。你可以这样使用它：

```vue
<InfoCard title="提示信息">
这是卡片的内容。
</InfoCard>

<InfoCard title="警告信息" type="warning">
请注意这里的潜在风险。
</InfoCard>

<InfoCard title="危险操作" type="danger">
进行此操作前请务必备份数据。
</InfoCard>

<InfoCard title="小技巧" type="tip">
你可以使用 `slot` 传递更复杂的 HTML 内容。
</InfoCard>
```

**渲染效果:**

<InfoCard title="提示信息">
这是卡片的内容。
</InfoCard>

<InfoCard title="警告信息" type="warning">
请注意这里的潜在风险。
</InfoCard>

<InfoCard title="危险操作" type="danger">
进行此操作前请务必备份数据。
</InfoCard>

<InfoCard title="小技巧" type="tip">
你可以使用 `slot` 传递更复杂的 HTML 内容。
</InfoCard>

## 创建新组件

### 使用脚本 (推荐)

推荐使用模板提供的脚本来创建新组件：

```bash
pnpm run docs:component
# 或
node scripts/create-component.js
```

脚本会引导你完成以下步骤：

1.  **输入组件名称**: 使用 kebab-case 格式 (例如 `my-new-button`)。
2.  **选择模板类型**: 从 `basic`, `functional`, `demo` 中选择。

脚本会自动：

-   将名称转换为 PascalCase (如 `MyNewButton`)。
-   在 `docs/.vuepress/components/` 目录下创建对应的 `.vue` 文件 (例如 `MyNewButton.vue`)。
-   使用选定的模板填充文件内容。

#### 可用组件模板

-   **基础 (basic)**: 简单的内容包装组件，支持标题和默认插槽。
    ```vue
    <template>
      <div class="component-container">
        <h2>{{ title }}</h2>
        <div class="component-content">
          <slot></slot>
        </div>
      </div>
    </template>
    ```
    *使用示例*: `<MyBasicComponent title="基础信息">内容...</MyBasicComponent>`

-   **功能性 (functional)**: 带有头部、主体、可选脚部插槽以及可选关闭按钮的组件。
    ```vue
    <template>
      <div class="functional-component">
        <div class="component-header">...</div>
        <div class="component-body"><slot></slot></div>
        <div v-if="$slots.footer" class="component-footer"><slot name="footer"></slot></div>
      </div>
    </template>
    ```
    *使用示例*: `<MyFunctionalComponent title="提示" :showClose="true">主体内容 <template #footer>页脚</template></MyFunctionalComponent>`

-   **代码演示 (demo)**: 用于展示组件/代码示例及其对应代码，自带"显示/隐藏代码"切换。
    ```vue
    <template>
      <div class="demo-component">
        <div class="demo-header">... <button @click="...">...</button></div>
        <div class="demo-preview"><slot></slot></div>
        <div v-if="showCode" class="demo-code" :class="{ 'code-visible': codeVisible }">
          <slot name="code"></slot>
        </div>
      </div>
    </template>
    ```
    *使用示例*: `<MyDemoComponent title="示例"><MyButton/><template #code>\`\`\`html <MyButton/> \`\`\`</template></MyDemoComponent>`

### 手动创建

你也可以手动创建组件：

1.  在 `docs/.vuepress/components/` 下的建议子目录（如 `ui/`）中创建你的 `.vue` 文件（例如 `MyCustomWidget.vue`）。
2.  编写你的 Vue 组件逻辑。

组件创建后，由于自动注册机制，你可以直接在 Markdown 中使用它 (`<MyCustomWidget />`)。

### 在组件中访问 VuePress 数据

在你的组件中，可以使用 `@vuepress/client` 提供的 Hooks 来访问站点或页面数据：

```vue
<script setup>
import { usePageData, usePageFrontmatter, useSiteData } from '@vuepress/client'

const pageData = usePageData()
const frontmatter = usePageFrontmatter()
const siteData = useSiteData()

console.log('当前页面标题:', pageData.value.title)
console.log('当前页面 Frontmatter:', frontmatter.value)
console.log('站点标题:', siteData.value.title)
</script>
```

更多可用的客户端 API，请参考 [VuePress 官方文档 > Client API](https://v2.vuepress.vuejs.org/zh/reference/client-api.html)。

## 确保注册插件已启用

为了让自动注册和组件能在 Markdown 中正常工作，请确保你的 `.vuepress/config.js` 文件中启用了 `@vuepress/plugin-register-components` 插件：

```js
// .vuepress/config.js
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  // ... 其他配置
  plugins: [
    registerComponentsPlugin({
      // 指定组件目录
      componentsDir: path.resolve(__dirname, './components'),
    }),
    // ... 其他插件
  ],
}
```

# 组件系统说明

本文档模板提供了组件系统，允许您创建和使用自定义 Vue 组件来增强文档内容。

## 组件概述

组件系统基于以下功能:

- **组件自动注册**: 放置在 `docs/.vuepress/components` 目录中的组件会被自动注册
- **组件创建脚本**: 使用 `create-component.js` 脚本快速创建新组件
- **多种组件模板**: 支持基础、功能性和演示多种组件模板

## 创建新组件

使用以下命令创建新组件:

```bash
npm run docs:component
```

按照交互式提示，输入:

1. 组件名称 (使用 kebab-case 格式，如 `info-box`)
2. 组件模板类型 (basic/functional/demo)

脚本会自动:

- 创建组件文件并放置在正确的目录
- 使用选定的模板生成代码
- 将组件命名为 PascalCase 格式 (如 `InfoBox`)

## 可用组件模板

### 基础组件 (Basic)

简单的内容包装组件，支持标题和插槽内容:

```vue
<template>
  <div class="component-container">
    <h2>{{ title }}</h2>
    <div class="component-content">
      <slot></slot>
    </div>
  </div>
</template>
```

**使用示例:**

```md
<InfoBox title="重要信息">
  这里是一些重要内容。
</InfoBox>
```

### 功能性组件 (Functional)

带有更多功能的组件，如可关闭的面板和多个插槽:

```vue
<template>
  <div class="functional-component">
    <div class="component-header">
      <h3>{{ title }}</h3>
      <span v-if="showClose" class="close-btn" @click="$emit('close')">&times;</span>
    </div>
    <div class="component-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="component-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
```

**使用示例:**

```md
<MessageBox title="提示" :showClose="true" @close="handleClose">
  <p>这是一个可关闭的消息框。</p>
  <template #footer>
    <em>附加信息</em>
  </template>
</MessageBox>
```

### 代码演示组件 (Demo)

用于展示组件示例和相应代码的组件:

```vue
<template>
  <div class="demo-component">
    <div class="demo-header">
      <h3>{{ title }}</h3>
      <div class="demo-actions">
        <button v-if="showCode" class="toggle-code" @click="codeVisible = !codeVisible">
          {{ codeVisible ? '隐藏代码' : '查看代码' }}
        </button>
      </div>
    </div>
    
    <div class="demo-preview">
      <slot></slot>
    </div>
    
    <div v-if="showCode" class="demo-code" :class="{ 'code-visible': codeVisible }">
      <slot name="code"></slot>
    </div>
  </div>
</template>
```

**使用示例:**

```md
<CodeDemo title="按钮示例">
  <button class="custom-button">点击我</button>
  
  <template #code>
  ```html
  <button class="custom-button">点击我</button>
  
  <style>
  .custom-button {
    background-color: #3eaf7c;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
  }
  </style>
  ```
  </template>
</CodeDemo>
```

## 在文档中使用组件

创建组件后，需要确保组件在配置中注册:

1. 检查 `docs/.vuepress/config.js` 中是否包含 `registerComponentsPlugin` 配置
2. 确保 `componentsDir` 指向正确的组件目录

然后，您可以在任何 Markdown 文件中直接使用组件:

```md
# 使用组件示例

这是普通的 Markdown 内容。

<InfoAlert title="注意">
  这里使用了自定义组件。
</InfoAlert>

继续普通的 Markdown 内容。
```

## 组件样式

所有组件都使用 scoped CSS 确保样式不会泄漏到文档其他部分:

```vue
<style scoped>
.component-container {
  border: 1px solid var(--c-border);
  /* 其他样式 */
}
</style>
```

组件使用 VuePress 的 CSS 变量系统，确保它们能够适应不同的主题和颜色模式:

- `--c-brand`: 主题色
- `--c-text`: 文本颜色
- `--c-border`: 边框颜色
- `--c-bg`: 背景色

## 自定义现有组件

您可以通过编辑 `docs/.vuepress/components` 目录中的文件来修改现有组件:

1. 添加新的 props
2. 更改样式
3. 增强功能

## 最佳实践

1. **保持简单**: 组件应该专注于解决特定的展示问题
2. **文档化组件**: 为每个组件添加使用示例和说明
3. **使用一致的风格**: 保持组件设计与文档风格一致
4. **可访问性**: 确保组件满足可访问性标准(WCAG)
5. **响应式设计**: 确保组件在不同屏幕尺寸下显示正常

## 故障排除

如果组件未显示或工作不正常，请检查:

1. 组件名称是否正确 (区分大小写)
2. 组件是否在正确的目录中
3. 是否重新启动了开发服务器
4. 浏览器控制台中的错误消息 
