# 插件功能说明

本模板项目集成了多种插件，提供增强的文档体验。本文档介绍主要插件的功能和使用方法。

## 搜索功能

### 内置搜索

VuePress 内置搜索插件允许用户在文档中快速查找内容：

- **快捷键**: 按 <kbd>s</kbd> 或 <kbd>/</kbd> 激活搜索框
- **搜索范围**: 标题和内容摘要
- **配置文件**: `docs/.vuepress/config.js` 中的 `searchPlugin` 部分

```js
searchPlugin({
  locales: {
    '/': {
      placeholder: '搜索文档',
    },
  },
  // 其他选项...
})
```

### Algolia DocSearch

本模板也支持集成 Algolia DocSearch，提供更强大的搜索体验：

1. 在 [Algolia DocSearch](https://docsearch.algolia.com/apply/) 申请免费账号
2. 获取 `apiKey`、`indexName` 和 `appId`
3. 在 `config.js` 中取消注释并配置 `docsearchPlugin`

```js
docsearchPlugin({
  apiKey: 'YOUR_API_KEY',
  indexName: 'YOUR_INDEX_NAME',
  appId: 'YOUR_APP_ID',
  // 其他配置...
})
```

## PWA 支持

本模板支持 PWA (渐进式 Web 应用) 功能，允许用户将文档作为应用安装在设备上：

- **离线访问**: 缓存文档内容，支持离线浏览
- **自动更新**: 当文档更新时，会提示用户刷新获取最新内容
- **自定义安装**: 添加到主屏幕，提供类似原生应用的体验

### PWA 配置

PWA 功能通过 `pwaPlugin` 配置，主要选项包括：

```js
pwaPlugin({
  skipWaiting: true,
  cachePic: true,
  // 自定义更新提示组件
  popupComponent: 'PwaPopup',
  // Web App 清单
  manifest: {
    name: '应用名称',
    short_name: '短名称',
    theme_color: '#颜色代码',
    icons: [
      // 图标配置
    ]
  }
})
```

### 更新提示

当文档内容更新时，系统会显示一个更新提示，用户可以点击"更新"按钮刷新并获取最新内容。

## 图片增强

### 图片缩放

本模板集成了 `mediumZoomPlugin`，允许用户点击图片查看大图：

- **默认行为**: 点击文档中的图片会放大显示
- **排除图片**: 添加 `no-zoom` 类可以禁用特定图片的缩放功能

```md
<!-- 支持缩放的图片 -->
![图片描述](./path/to/image.jpg)

<!-- 禁用缩放的图片 -->
![图片描述](./path/to/image.jpg){.no-zoom}
```

### 图片配置

图片缩放功能可以在 `config.js` 中进行配置：

```js
mediumZoomPlugin({
  // 选择器
  selector: ':not(a) > img:not(.no-zoom)',
  // 缩放选项
  zoomOptions: {
    margin: 16,
    background: '#fff',
    scrollOffset: 40,
  }
})
```

## 代码块增强

本模板对代码块进行了多项增强：

### 行号显示

所有代码块默认显示行号，便于引用特定代码行：

```js
// 这是第1行
const hello = 'world';
// 这是第3行
```

### 代码高亮

支持对特定行进行高亮显示：

```js{2}
// 普通行
// 这行会被高亮显示
// 普通行
```

### 复制按钮

每个代码块右上角都有复制按钮，方便用户复制代码内容。

## 组件自动注册

本模板使用 `registerComponentsPlugin` 自动注册 `docs/.vuepress/components` 目录中的所有 Vue 组件，使其可以直接在 Markdown 文件中使用：

```md
<MyComponent title="自定义标题">
  组件内容
</MyComponent>
```

## 其他实用插件

本模板还集成了以下实用插件：

- **Markdown 扩展**: 支持脚注、属性等增强功能
- **外部链接处理**: 自动为外部链接添加 `target="_blank"` 和安全属性
- **代码演示**: 支持代码和效果同时展示

## 自定义插件

您可以在 `config.js` 的 `plugins` 数组中添加更多插件：

```js
plugins: [
  // 现有插件...
  
  // 添加新插件
  yourNewPlugin({
    // 插件配置
  })
] 
