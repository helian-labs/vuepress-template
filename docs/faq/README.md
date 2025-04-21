# 常见问题

本页面汇总了使用 VuePress 过程中的常见问题及其解决方案。

## 安装问题

### 安装出现 EACCES 错误

**问题**：在安装 VuePress 时出现 EACCES 权限错误。

**解决方案**：避免使用 sudo 安装 npm 包，正确设置 npm 权限：

```bash
# 修复 npm 权限
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### 安装过程中依赖包报错

**问题**：安装过程中依赖包报错。

**解决方案**：尝试清除 npm 缓存或使用其他包管理器：

```bash
# 清除 npm 缓存
npm cache clean --force

# 使用 pnpm 安装
pnpm install
```

## 配置问题

### 侧边栏配置不生效

**问题**：配置了侧边栏但没有显示。

**解决方案**：确保路径格式正确，检查是否和页面路径完全匹配：

```js
// 正确的路径格式
sidebar: {
  '/guide/': [
    {
      text: '指南',
      children: [
        '/guide/', // 注意这里的斜杠
        '/guide/introduction.md', // 可以带 .md 后缀
      ],
    },
  ],
}
```

### 自定义主题不生效

**问题**：自定义主题没有正确加载。

**解决方案**：检查主题导入和路径是否正确：

```js
// 导入自定义主题
import { path } from '@vuepress/utils'
import { defaultTheme } from '@vuepress/theme-default'

// 确保路径正确
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  theme: defaultTheme({
    // 主题配置
  }),
  
  // 添加自定义样式
  alias: {
    '@theme/Home.vue': path.resolve(__dirname, './components/Home.vue'),
  },
}
```

## 开发问题

### 热更新不工作

**问题**：修改文件后页面没有自动刷新。

**解决方案**：
1. 确认使用了正确的开发命令 `vuepress dev docs`
2. 检查是否在监视范围内
3. 尝试清除缓存重新启动

```bash
# 清除缓存并启动
vuepress dev docs --clean-cache
```

### 自定义组件不显示

**问题**：注册的自定义 Vue 组件不显示。

**解决方案**：确保正确导入和注册组件：

```js
// .vuepress/client.js
import { defineClientConfig } from '@vuepress/client'
import MyComponent from './components/MyComponent.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('MyComponent', MyComponent)
  },
})
```

## 构建问题

### 构建失败

**问题**：执行 `vuepress build` 时出错。

**解决方案**：
1. 检查语法错误
2. 检查配置文件
3. 检查依赖版本兼容性
4. 尝试清除缓存重新构建

```bash
# 清除缓存并构建
vuepress build docs --clean-cache
```

### 图片路径错误

**问题**：构建后图片无法正确显示。

**解决方案**：
1. 使用相对路径或绝对路径引用图片
2. 将图片放在 `public` 目录中

```md
<!-- 使用 public 目录中的图片 -->
![图片](/images/logo.png)

<!-- 使用相对路径 -->
![图片](./images/logo.png)
```

## 部署问题

### 部署后页面为空白

**问题**：部署到服务器后页面为空白或样式丢失。

**解决方案**：
1. 检查 `base` 配置是否正确
2. 确认服务器路径配置正确

```js
// 正确设置 base
export default {
  base: '/your-repo/', // 如果部署到 GitHub Pages 的项目页面
}
```

### 资源加载失败

**问题**：CSS、JS 或图片资源加载失败。

**解决方案**：
1. 检查资源路径
2. 确认服务器配置
3. 尝试使用 CDN

```js
// 在配置中使用 CDN
export default {
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/your-css' }],
  ],
}
```

## 插件问题

### 插件不生效

**问题**：配置了插件但功能没有生效。

**解决方案**：
1. 检查插件导入和配置
2. 确认插件版本与 VuePress 版本兼容

```js
// 正确导入和配置插件
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'

export default {
  plugins: [
    googleAnalyticsPlugin({
      id: 'G-XXXXXXXXXX',
    }),
  ],
}
```

## 性能问题

### 开发服务器启动慢

**问题**：本地开发服务器启动非常慢。

**解决方案**：
1. 减少文档数量或拆分为多个项目
2. 使用 SSD 存储
3. 增加系统内存
4. 升级 Node.js 版本

### 构建速度慢

**问题**：构建过程耗时长。

**解决方案**：
1. 减少不必要的插件
2. 使用 Vite 打包工具
3. 优化图片和资源
4. 考虑拆分大型文档

```js
// 使用 Vite 作为打包工具
import { viteBundler } from '@vuepress/bundler-vite'

export default {
  bundler: viteBundler(),
}
```

## 更多资源

如果你遇到了其他问题，可以参考以下资源：

- [VuePress 官方文档](https://v2.vuepress.vuejs.org/zh/)
- [GitHub Issues](https://github.com/vuepress/vuepress-next/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vuepress)
- [VuePress 社区](https://discord.com/invite/HBherRA) 
