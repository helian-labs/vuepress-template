---
title: 插件 API
---

# 插件 API

VuePress 的插件系统允许你扩展 VuePress 的功能。本指南将介绍如何创建和使用插件。

## 插件基础

插件是一个函数，它接收一个 `app` 对象作为参数，并返回一个对象：

```js
const myPlugin = app => {
  return {
    name: 'my-plugin',
    // 插件选项
  }
}
```

## 插件选项

插件可以定义以下选项：

### `name`

- 类型: `string`
- 必填: 是

插件的名称。

### `multiple`

- 类型: `boolean`
- 默认值: `false`

是否允许同一个插件被多次使用。

### `clientAppEnhanceFiles`

- 类型: `string | string[]`
- 默认值: `undefined`

客户端增强文件的路径。

### `clientAppSetupFiles`

- 类型: `string | string[]`
- 默认值: `undefined`

客户端设置文件的路径。

### `clientAppRootComponentFiles`

- 类型: `string | string[]`
- 默认值: `undefined`

客户端根组件文件的路径。

### `extendsMarkdown`

- 类型: `(md: MarkdownIt) => void`
- 默认值: `undefined`

扩展 Markdown 解析器的函数。

### `extendsPageOptions`

- 类型: `(pageOptions: PageOptions) => void`
- 默认值: `undefined`

扩展页面选项的函数。

### `extendsPageData`

- 类型: `(pageData: PageData) => void`
- 默认值: `undefined`

扩展页面数据的函数。

### `onInitialized`

- 类型: `() => Promise<void> | void`
- 默认值: `undefined`

在应用初始化完成后调用的函数。

### `onPrepared`

- 类型: `() => Promise<void> | void`
- 默认值: `undefined`

在应用准备完成后调用的函数。

### `onWatched`

- 类型: `() => Promise<void> | void`
- 默认值: `undefined`

在文件变化后调用的函数。

### `onGenerated`

- 类型: `() => Promise<void> | void`
- 默认值: `undefined`

在静态文件生成后调用的函数。

## 插件示例

### 简单插件

```js
const myPlugin = app => {
  return {
    name: 'my-plugin',
    onInitialized: () => {
      console.log('应用已初始化')
    },
  }
}
```

### Markdown 插件

```js
const markdownPlugin = app => {
  return {
    name: 'markdown-plugin',
    extendsMarkdown: md => {
      // 添加自定义 Markdown 规则
      md.use(require('markdown-it-emoji'))
    },
  }
}
```

### 页面数据插件

```js
const pageDataPlugin = app => {
  return {
    name: 'page-data-plugin',
    extendsPageData: pageData => {
      // 添加自定义页面数据
      pageData.customData = {
        timestamp: Date.now(),
      }
    },
  }
}
```

## 使用插件

在 VuePress 配置文件中使用插件：

```js
import { defineUserConfig } from 'vuepress'
import { myPlugin } from './my-plugin'

export default defineUserConfig({
  plugins: [myPlugin()],
})
```

## 插件开发最佳实践

1. **命名规范**：

   - 使用 kebab-case 命名插件
   - 使用 `@vuepress/plugin-` 前缀（如果是官方插件）

2. **文档**：

   - 提供清晰的 README
   - 包含使用示例
   - 说明插件选项

3. **测试**：

   - 编写单元测试
   - 测试不同配置下的行为

4. **错误处理**：
   - 提供有意义的错误信息
   - 优雅地处理异常情况

## 参考链接

- [VuePress 插件 API 参考](https://v2.vuepress.vuejs.org/zh/reference/plugin-api.html)
- [VuePress 插件开发指南](https://v2.vuepress.vuejs.org/zh/advanced/plugin.html)
