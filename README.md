# VuePress 文档模板

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)

这是一个基于 [VuePress 2](https://v2.vuepress.vuejs.org/zh/) 构建的、遵循最佳实践的现代化文档网站模板项目。旨在提供一个开箱即用、易于扩展、配置清晰、包含自动化流程的基础模板。

## ✨ 特性

- **最新技术栈**: 使用 VuePress 2 (Vite Bundler), Vue 3, TypeScript, SCSS。
- **自动化配置**: 动态生成导航栏和侧边栏 (基于 `docs` 目录结构)。
- **模块化配置**: 将 VuePress 配置拆分为多个逻辑模块，易于维护。
- **代码质量**: 集成 ESLint 和 Prettier，确保代码规范。
- **结构化样式**: 使用 SCSS 并组织在清晰的目录结构中。
- **TypeScript 支持**: 核心配置文件和客户端增强文件使用 TypeScript。
- **实用脚本**: 包含创建新页面、组件等辅助脚本。
- **CI/CD 友好**: 提供基础的 GitHub Actions 工作流配置（即将添加）。

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐)

### 使用模板

1. **创建项目**: 使用此模板创建你自己的仓库（点击 "Use this template" 按钮）。
2. **克隆仓库**: `git clone https://github.com/yourusername/your-new-repo.git`
3. **进入目录**: `cd your-new-repo`
4. **安装依赖**: `pnpm install`

### 本地开发

```bash
# 启动开发服务器 (推荐)
pnpm docs:dev

# 清除缓存并启动
pnpm docs:clean-dev
```

开发服务器将在 `http://localhost:8080` 启动。

### 代码检查与格式化

```bash
# 运行 ESLint 检查并尝试修复
pnpm lint

# 使用 Prettier 格式化所有文件
pnpm format
```

### 构建

```bash
# 构建静态文件到 .vuepress/dist 目录
pnpm docs:build
```

## 🔧 如何使用此模板

1. **修改项目信息**: 更新 `package.json` 中的 `name`, `description`, `repository`, `author` 等字段。
2. **自定义站点配置**:
   - 修改 `docs/.vuepress/config.ts` 中的 `title`, `description`, `lang`。
   - 修改 `docs/.vuepress/config/head.ts` 添加或修改 `<head>` 标签。
   - 将 `docs/.vuepress/public/images/logo.png` 替换为你的 Logo。
3. **调整主题样式**:
   - 修改 `docs/.vuepress/styles/palette.scss` 覆盖默认主题颜色。
   - 在 `docs/.vuepress/styles/variables.scss` 定义你的 SCSS 变量。
   - 在 `docs/.vuepress/styles/custom.scss` 添加自定义全局样式。
4. **开始编写文档**:
   - 在 `docs/` 目录下按逻辑创建或修改 Markdown 文件和子目录（如 `guide`, `reference` 等）。
   - 导航栏和侧边栏将根据这些目录自动更新（查看 `docs/.vuepress/config/navbar/zh.ts` 和 `sidebar/zh.ts` 中的逻辑）。
   - 使用 frontmatter (如 `title`, `description`) 优化页面元信息。
5. **添加自定义组件**:
   - 将全局 Vue 组件放入 `docs/.vuepress/components/global/`。
   - 将特定布局组件放入 `docs/.vuepress/components/layout/`。
   - 将通用 UI 组件放入 `docs/.vuepress/components/ui/`。
   - `registerComponentsPlugin` 会自动注册这些组件。
6. **配置插件**: 在 `docs/.vuepress/config/plugins.ts` 中添加、删除或配置插件。
7. **更新部署脚本/CI**: 修改 `.github/workflows/deploy.yml` (即将添加) 或 `deploy.sh` (如果使用) 以适应你的部署目标。

## 项目结构

```
.                            # 项目根目录
├── .github/                 # GitHub Actions 工作流
│   └── workflows/
├── .husky/                  # Git Hooks (可选)
├── .vscode/                 # VS Code 设置 (可选)
├── docs/                    # 文档源文件
│   ├── .vuepress/           # VuePress 配置和资源
│   │   ├── config.ts      # 主配置文件 (导入其他模块)
│   │   ├── client.ts      # 客户端增强文件
│   │   ├── components/    # Vue 组件 (global, layout, ui)
│   │   ├── public/        # 静态资源 (图片, favicon 等)
│   │   ├── styles/        # 样式文件 (index.scss, palette.scss, ...)
│   │   └── config/        # 拆分的配置模块 (head, plugins, navbar, sidebar)
│   ├── api/               # API 参考文档目录
│   ├── faq/               # 常见问题目录
│   ├── guide/             # 指南/教程目录
│   ├── reference/         # 配置/参考目录
│   └── README.md          # 文档站点首页
├── scripts/                 # 辅助 Node.js 脚本
├── .editorconfig            # 编辑器一致性配置
├── .eslintignore            # ESLint 忽略规则
├── .eslintrc.cjs            # ESLint 配置
├── .gitignore               # Git 忽略规则
├── .npmrc                   # pnpm 配置
├── .prettierignore          # Prettier 忽略规则
├── .prettierrc.json         # Prettier 配置
├── LICENSE                  # 项目许可证
├── package.json             # 项目依赖与脚本
├── pnpm-lock.yaml           # 依赖锁定文件
└── README.md                # 项目根 README (当前文件)
```

## 🤝 贡献指南

欢迎为此模板项目做出贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详情。

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证。
