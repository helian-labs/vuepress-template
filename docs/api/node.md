---
title: Node.js API
---

# Node.js API

VuePress 提供了 Node.js API，允许你以编程方式使用 VuePress。

## 基本用法

```js
import { createApp } from '@vuepress/core'

const app = createApp({
  // 源目录
  sourceDir: 'docs',
  // 目标目录
  dest: 'dist',
  // 临时目录
  temp: '.vuepress/.temp',
  // 缓存目录
  cache: '.vuepress/.cache',
  // 开发服务器配置
  dev: {
    host: 'localhost',
    port: 8080,
  },
  // 构建配置
  build: {
    // 构建选项
  },
})

// 启动开发服务器
await app.dev()

// 构建静态文件
await app.build()
```

## 配置选项

### `sourceDir`

- 类型: `string`
- 默认值: `'docs'`

源文件目录的路径。

### `dest`

- 类型: `string`
- 默认值: `'dist'`

输出目录的路径。

### `temp`

- 类型: `string`
- 默认值: `'.vuepress/.temp'`

临时文件目录的路径。

### `cache`

- 类型: `string`
- 默认值: `'.vuepress/.cache'`

缓存目录的路径。

### `dev`

开发服务器配置。

```js
{
  // 主机名
  host: 'localhost',
  // 端口号
  port: 8080,
  // 是否在启动后打开浏览器
  open: false,
  // 是否启用热更新
  hot: true,
  // 是否启用调试模式
  debug: false,
}
```

### `build`

构建配置。

```js
{
  // 是否启用调试模式
  debug: false,
  // 是否启用缓存
  cache: true,
  // 是否在构建前清除缓存
  cleanCache: false,
}
```

## 插件系统

VuePress 的插件系统允许你扩展 VuePress 的功能。

### 使用插件

```js
import { createApp } from '@vuepress/core'
import { searchPlugin } from '@vuepress/plugin-search'
import { pwaPlugin } from '@vuepress/plugin-pwa'

const app = createApp({
  // 基本配置
})

// 使用插件
app.use(searchPlugin())
app.use(pwaPlugin())

// 启动开发服务器
await app.dev()
```

### 插件选项

每个插件都可以接受选项：

```js
app.use(
  searchPlugin({
    // 搜索选项
    locales: {
      '/': {
        placeholder: '搜索',
      },
    },
  })
)
```

## 主题系统

VuePress 的主题系统允许你自定义站点的外观和功能。

### 使用主题

```js
import { createApp } from '@vuepress/core'
import { defaultTheme } from '@vuepress/theme-default'

const app = createApp({
  // 基本配置
  theme: defaultTheme({
    // 主题选项
    navbar: [
      // 导航栏配置
    ],
    sidebar: {
      // 侧边栏配置
    },
  }),
})
```

## 参考链接

- [VuePress Node.js API 参考](https://v2.vuepress.vuejs.org/zh/reference/node-api.html)
