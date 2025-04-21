# 贡献指南

感谢您考虑为此项目做出贡献！以下是参与本项目的一些指导原则。

## 如何贡献

1. 首先 Fork 本仓库
2. 克隆您 Fork 的仓库到本地
   ```bash
   git clone https://github.com/YOUR_USERNAME/vuepress-template.git
   cd vuepress-template
   ```
3. 创建新的分支
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. 进行您的修改
5. 提交您的更改
   ```bash
   git commit -m "描述您的更改"
   ```
6. 推送到您的 Fork
   ```bash
   git push origin feature/your-feature-name
   ```
7. 在 GitHub 上创建一个 Pull Request

## 代码风格

- 使用 2 个空格进行缩进
- 避免使用尾随空格
- 代码行末尾不要有分号

## 提交规范

提交信息应该清晰明了，描述所做更改的目的。建议使用以下格式：

```
feat: 添加了新特性
fix: 修复了某个问题
docs: 更新了文档
style: 代码风格调整，不影响功能
refactor: 代码重构
test: 添加或修改测试
chore: 构建过程或辅助工具变动
```

## 问题报告

如果您发现了 bug 或有新功能建议，请创建一个 issue。在创建 issue 时，请提供：

- 问题的简洁明了的描述
- 复现步骤（如果是 bug）
- 您的期望结果
- 实际结果
- 环境信息（如操作系统、浏览器版本等）

## 开发设置

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm docs:dev
```

## 许可证

通过贡献您的代码，您同意将其授权给项目的许可证。 