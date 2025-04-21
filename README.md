# VuePress 模板

这是一个使用 VuePress 搭建的文档网站模板项目，具有自动化的配置和简便的内容管理功能。

## 特性

- 基于 VuePress 2.0 构建
- 自动生成导航栏和侧边栏
- 动态检测文档结构
- 响应式设计，支持移动端
- 开箱即用的文档模板
- 简单的新页面创建工具

## 快速开始

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn

# 使用 pnpm
pnpm install
```

### 本地开发

```bash
# 启动开发服务器
npm run docs:dev

# 或使用 yarn
yarn docs:dev

# 或使用 pnpm
pnpm docs:dev
```

访问 http://localhost:8080 查看效果。

### 构建

```bash
# 构建静态文件
npm run docs:build
```

### 创建新页面

```bash
# 使用交互式命令创建新页面
npm run docs:new
```

## 项目结构

```
.
├── docs                     # 文档目录
│   ├── .vuepress           # VuePress 配置
│   │   ├── config.js       # 主配置文件（自动化）
│   │   └── public          # 静态资源
│   ├── guide               # 指南文档
│   ├── config              # 配置文档 
│   ├── api                 # API参考
│   ├── faq                 # 常见问题
│   └── README.md           # 首页
├── scripts                 # 辅助脚本
│   └── new-page.js         # 创建新页面脚本
├── package.json            # 项目依赖
└── README.md               # 项目说明（当前文件）
```

## 自定义项目

1. 修改 `package.json` 中的项目信息和仓库链接
2. 替换 `docs/.vuepress/public/images/logo.png` 为您的项目logo
3. 根据需要修改 `docs/.vuepress/config.js` 中的站点标题和描述
4. 开始编写您的文档内容

## 自动化特性

- **导航栏和侧边栏**: 基于目录结构自动生成
- **仓库链接**: 从 package.json 中自动读取
- **文档结构**: 新增目录自动添加到导航

## 部署

### GitHub Pages

执行以下命令部署到 GitHub Pages:

```bash
npm run docs:deploy
```

> 注意：部署前请先在 `deploy.sh` 中配置正确的仓库URL。

### 其他部署方式

VuePress 生成的是静态网站，可以部署到任何静态网站托管服务，例如：

- Netlify
- Vercel
- GitLab Pages
- 自己的服务器

## 贡献指南

请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何为此项目做出贡献。

## 许可证

[MIT](LICENSE) 
