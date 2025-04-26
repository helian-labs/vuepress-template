---
title: CLI 命令
---

# 命令行接口

VuePress 提供了一个命令行接口 (CLI)，可用于开发和构建文档站点。

## 基本用法

### 全局安装

如果你全局安装了 VuePress，可以使用 `vuepress` 命令：

```bash
# 安装
npm install -g vuepress

# 显示帮助信息
vuepress --help

# 显示版本信息
vuepress --version
```

### 本地安装

更推荐的方式是在项目中本地安装 VuePress，然后通过 npm scripts 使用：

```bash
# 安装
npm install -D vuepress

# 在 package.json 中添加 scripts
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}

# 启动开发服务器
npm run docs:dev

# 构建静态文件
npm run docs:build
```

## 命令

VuePress CLI 提供了几个命令：

### `vuepress dev`

启动一个开发服务器，用于本地开发。

```bash
# 基本用法
vuepress dev [sourceDir]

# 示例
vuepress dev docs
```

#### 选项

- `-c, --config <config>` - 设置配置文件路径
- `-p, --port <port>` - 设置端口号
- `-t, --temp <temp>` - 设置临时文件目录
- `-c, --cache <cache>` - 设置缓存目录
- `--host <host>` - 设置主机名
- `--open` - 启动服务器后打开浏览器
- `--debug` - 启用 debug 模式
- `--no-cache` - 禁用缓存
- `--clean-cache` - 在启动前清除缓存

### `vuepress build`

构建静态站点。

```bash
# 基本用法
vuepress build [sourceDir]

# 示例
vuepress build docs
```

#### 选项

- `-c, --config <config>` - 设置配置文件路径
- `-d, --dest <dest>` - 设置输出目录
- `-t, --temp <temp>` - 设置临时文件目录
- `-c, --cache <cache>` - 设置缓存目录
- `--debug` - 启用 debug 模式
- `--no-cache` - 禁用缓存
- `--clean-cache` - 在构建前清除缓存

### `vuepress info`

显示环境信息。

```bash
vuepress info
```

## 使用示例

### 开发模式

启动开发服务器，并指定源目录：

```bash
# 启动开发服务器
vuepress dev docs

# 指定端口号
vuepress dev docs --port 8080

# 在开发前清除缓存
vuepress dev docs --clean-cache

# 启动后自动打开浏览器
vuepress dev docs --open
```

### 构建模式

构建静态站点：

```bash
# 基本构建
vuepress build docs

# 指定输出目录
vuepress build docs --dest dist

# 在构建前清除缓存
vuepress build docs --clean-cache
```

### 配置文件

指定自定义配置文件：

```bash
# 使用自定义配置文件
vuepress dev docs --config my-config.js

# 构建时使用自定义配置文件
vuepress build docs --config my-config.js
```

## 配置方式

除了通过命令行参数，你还可以通过配置文件或环境变量来设置 CLI 的选项：

### 配置文件

在 VuePress 配置文件中设置：

```js
export default {
  // 站点配置
  port: 8080,
  open: true,

  // 其他配置
}
```

### 环境变量

通过环境变量设置：

```bash
# 设置端口号
VUEPRESS_PORT=8080 vuepress dev docs

# 设置输出目录
VUEPRESS_DEST=dist vuepress build docs
```

## 参考链接

- [VuePress 官方 CLI 参考](https://v2.vuepress.vuejs.org/zh/reference/cli.html)
