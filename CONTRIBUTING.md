# 贡献指南

感谢您考虑为此项目做出贡献！我们欢迎任何形式的贡献，无论是报告问题、提交功能请求、改进文档还是编写代码。

为了确保社区的健康和协作，请遵守我们的 [行为准则](CODE_OF_CONDUCT.md)。 (如果还没有，请创建此文件)

## 如何贡献

我们使用 GitHub Flow 进行开发。

1. **Fork 仓库**: 首先 Fork 本仓库到您的 GitHub 账户。
2. **克隆您的 Fork**:

    ```bash
    git clone https://github.com/YOUR_USERNAME/vuepress-template.git
    cd vuepress-template
    ```

3. **创建新分支**: 从 `main` 或最新的开发分支创建一个描述性分支。分支名称建议遵循 `类型/简短描述` 的格式，例如：
    * `feat/add-dark-mode`
    * `fix/typo-in-readme`
    * `docs/update-contribution-guide`

    ```bash
    git checkout -b feat/your-feature-name
    ```

4. **进行修改**: 编写您的代码或修改文档。
    * 确保遵循项目的 [代码风格](#代码风格)。
    * 如果添加了新功能，请考虑添加相应的测试。
5. **提交更改**: 使用清晰且符合 [提交规范](#提交规范) 的消息提交您的更改。

    ```bash
    # (可选) 查看更改
    git status
    # 添加更改
    git add .
    # 提交更改
    git commit -m "feat: 添加了新特性 XYZ"
    ```

6. **推送到您的 Fork**:

    ```bash
    git push origin feat/your-feature-name
    ```

7. **创建 Pull Request (PR)**:
    * 在 GitHub 上，导航到您 Fork 的仓库，并点击 "New pull request" 按钮。
    * 确保您的 PR 指向原始仓库的 `main` 分支（或指定的开发分支）。
    * 在 PR 描述中，请清晰地说明您所做的更改、解决的问题（如果适用，请链接到相关的 Issue，例如 `Closes #123`），以及任何需要审阅者注意的细节。
    * 如果您的 PR 是对视觉效果的更改，请附上截图或 GIF。

## 代码风格

* 使用 2 个空格进行缩进。
* 避免使用行尾多余的空格。
* 代码行末尾不使用分号 (`;`)。
* (可选) 本项目使用 [Prettier](https://prettier.io/) 和 [ESLint](https://eslint.org/) 自动格式化和检查代码。请确保在提交前运行 `pnpm format` 和 `pnpm lint`。

## 提交规范

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。这有助于自动化版本发布和生成变更日志。提交信息格式如下：

```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

**常用类型**:

* `feat`: 新功能 (feature)
* `fix`: 修复 Bug
* `docs`: 仅仅修改了文档
* `style`: 代码格式调整 (不影响代码运行的变动)
* `refactor`: 代码重构 (既不是新增功能，也不是修复 bug)
* `perf`: 性能优化
* `test`: 增加或修改测试
* `build`: 影响构建系统或外部依赖项的更改 (例如：gulp、broccoli、npm)
* `ci`: 对 CI 配置文件和脚本的更改 (例如 Travis, Circle, BrowserStack, SauceLabs)
* `chore`: 其他不修改 `src` 或 `test` 文件的更改

**示例**:

```
feat: 添加暗黑模式切换功能
fix(login): 修复密码验证逻辑错误
docs: 更新 CONTRIBUTING.md
refactor: 重构用户认证模块
```

## 问题报告 (Issues)

如果您发现了 Bug、有功能建议或改进想法，欢迎通过 GitHub Issues 告诉我们。

* **搜索现有 Issues**: 在创建新 Issue 之前，请先搜索是否已存在相关讨论。
* **使用模板**: 我们提供了 Issue 模板来帮助您提供必要的信息。请选择合适的模板（Bug 报告或功能请求）并填写详细信息。
* **清晰描述**:
  * **Bug 报告**: 提供清晰的标题、详细的复现步骤、期望行为、实际行为以及您的环境信息（操作系统、Node.js 版本、浏览器等）。
  * **功能请求**: 描述您希望添加的功能、它解决的问题以及可能的实现方式。

## 开发设置

确保您已安装 [Node.js](https://nodejs.org/) (建议使用 LTS 版本) 和 [pnpm](https://pnpm.io/)。

```bash
# 安装依赖
pnpm install

# 启动开发服务器 (通常用于预览文档站点)
pnpm docs:dev

# (如果项目有其他命令，例如构建、测试、linting，请在此处添加)
# pnpm build
# pnpm test
# pnpm lint
# pnpm format
```

## 许可证

通过向本项目贡献代码或文档，您同意您的贡献将根据项目的 [LICENSE](LICENSE) 文件进行许可。(请确保仓库根目录有 LICENSE 文件)
