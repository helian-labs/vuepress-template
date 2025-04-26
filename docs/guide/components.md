---
title: 组件
---

# 组件

VuePress 提供了一个强大的组件系统，让你可以在 Markdown 文件中直接使用 Vue 组件。本指南将介绍如何使用和创建组件。

## 使用组件

在 VuePress 中，你可以在 Markdown 文件中直接使用 Vue 组件。这使得你可以轻松地创建交互式的文档界面。

### 基本用法

要在 Markdown 中使用组件，只需要像在 Vue 模板中一样使用它们：

```vue
<InfoCard>
  这是一个信息卡片组件
</InfoCard>
```

### 组件属性

你可以像在 Vue 中一样传递属性：

```vue
<InfoCard type="warning" title="注意">
  这是一个警告信息
</InfoCard>
```

## 创建组件

你可以通过以下步骤创建自己的组件：

### 使用组件创建脚本

我们提供了一个便捷的脚本来创建新组件：

```bash
pnpm create:component MyComponent
```

这将在 `components` 目录下创建一个新的组件文件。

### 组件类型

创建组件时，你可以选择以下类型：

1. 基础组件
2. 函数式组件
3. 演示组件

每种类型都有其特定的用途和模板。

### 组件示例

以下是一个基础组件的示例：

```vue
<template>
  <div class="my-component">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "MyComponent",
  data() {
    return {
      message: "Hello from MyComponent!",
    }
  },
}
</script>

<style scoped>
.my-component {
  /* 样式 */
}
</style>
```

## 最佳实践

### 命名约定

- 组件名使用 PascalCase
- 文件名与组件名保持一致
- UI 组件使用 `UI` 前缀

### 文档

为你的组件添加适当的文档：

```vue
<template>
  <div class="my-demo-component">
    <!-- 组件内容 -->
  </div>
</template>

<script>
/**
 * @description 演示组件
 * @example
 * <MyDemoComponent />
 */
export default {
  name: "MyDemoComponent",
}
</script>
```

### 组件注册

组件会被自动注册，你可以直接在 Markdown 中使用它们。

## 相关资源

- [Vue.js 组件文档](https://cn.vuejs.org/guide/components/registration.html)
- [VuePress 组件指南](https://v2.vuepress.vuejs.org/zh/guide/page.html#组件)

## 常见问题

### URL 路径问题

确保在组件中使用的所有 URL 路径都是正确的。对于静态资源，使用相对路径或绝对路径。

### 样式隔离

使用 `scoped` 样式确保组件样式不会影响其他组件：

```vue
<style scoped>
/* 组件样式 */
</style>
```
