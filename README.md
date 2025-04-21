# VuePress 模板

这是一个使用 VuePress 搭建的网站模板项目。

## 功能特点

- 基于 VuePress 2.0 构建
- 使用默认主题，支持自定义
- 响应式设计，支持移动端
- 支持 Markdown 增强

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

# 或使用 yarn
yarn docs:build

# 或使用 pnpm
pnpm docs:build
```

## 项目结构

```
.
├── docs                  # 文档目录
│   ├── .vuepress         # VuePress 配置
│   └── README.md         # 首页
├── package.json          # 项目依赖
└── README.md             # 项目说明
```

## 许可证

[MIT](LICENSE) 