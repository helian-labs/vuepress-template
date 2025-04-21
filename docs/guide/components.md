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
