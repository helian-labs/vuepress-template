# 贡献指南

感谢您考虑为此项目做出贡献！我们欢迎任何形式的贡献，无论是报告问题、提交功能请求、改进文档还是编写代码。

为了确保社区的健康和协作，请遵守我们的 [行为准则](CODE_OF_CONDUCT.md)。

## 如何贡献

我们推荐使用 GitHub Flow 进行开发。

1. **Fork 仓库**: 首先将本仓库 Fork 到您的 GitHub 账户。
2. **克隆您的 Fork**: 在本地克隆您 Fork 的仓库。

   ```bash
   git clone https://github.com/YOUR_USERNAME/vuepress-template.git
   cd vuepress-template
   ```

3. **创建新分支**: **从最新的 `main` 分支** (或其他指定的开发分支) 创建一个描述性的分支。分支名称建议遵循 `类型/简短描述` 的格式，例如：

   - `feat/add-dark-mode`
   - `fix/typo-in-readme`
   - `docs/update-contribution-guide`

   ```bash
   # 确保你的 main 分支是最新的
   git checkout main
   git pull origin main
   # 创建新分支
   git checkout -b feat/your-feature-name
   ```

4. **进行修改**: 编写您的代码或修改文档。
   - 请务必遵循项目的 [代码风格](#代码风格)。
   - 如果添加了新功能，请考虑编写相应的单元测试或集成测试。
   - 如果修改了 API 或用户界面，请更新相关文档。
5. **运行检查与测试**: 在提交前，请确保运行代码格式化、代码检查和测试。

   ```bash
   # 格式化代码
   pnpm format
   # 检查代码风格
   pnpm lint
   # (如果适用) 运行测试
   # pnpm test
   ```

6. **提交更改**: 使用清晰且符合 [提交规范](#提交规范) 的消息提交您的更改。 **推荐使用英文进行提交**，以便更广泛的开发者理解。

   ```bash
   # (可选) 查看更改
   git status
   # 添加更改
   git add .
   # 提交更改 (示例)
   git commit -m "feat: add dark mode toggle button"
   ```

7. **保持分支同步**: 如果原始仓库的 `main` 分支有更新，建议将这些更新同步到您的特性分支，以减少合并冲突。

   ```bash
   git fetch origin
   git rebase origin/main
   # 如果遇到冲突，请解决冲突后继续 rebase
   # git add .
   # git rebase --continue
   ```

8. **推送到您的 Fork**:

   ```bash
   # 如果是第一次推送或者 rebase 后需要强制推送
   git push --force-with-lease origin feat/your-feature-name
   # 后续推送
   # git push origin feat/your-feature-name
   ```

9. **创建 Pull Request (PR)**:
   - 在 GitHub 上，导航到您 Fork 的仓库，并点击 "New pull request" 或 "Compare & pull request" 按钮。
   - 确保您的 PR 基分支指向原始仓库的 `main` 分支（或指定的开发分支），比较分支是您的 `feat/your-feature-name` 分支。
   - 在 PR 标题和描述中，请清晰地说明您所做的更改、解决的问题（如果适用，请使用 `Closes #123`, `Fixes #456` 等关键词链接到相关的 Issue），以及任何需要审阅者注意的细节。
   - 如果您的 PR 是对视觉效果的更改，请务必附上截图或 GIF 动图。
   - 勾选允许维护者修改您的 PR (Allow edits from maintainers)，这有助于我们更快地修复小问题。

## 代码风格

- 使用 2 个空格进行缩进。
- 避免使用行尾多余的空格。
- 默认情况下，代码行末尾不使用分号 (`;`)。
- 本项目配置了 [Prettier](https://prettier.io/) 和 [ESLint](https://eslint.org/) 来统一和检查代码风格。
- **强烈建议在提交代码前运行 `pnpm format` 和 `pnpm lint` 命令**，并修复所有报告的问题，以确保代码风格一致性。这可以通过 git hooks (如 husky + lint-staged) 自动完成（如果项目已配置）。

## 提交规范

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。这有助于自动化版本发布和生成变更日志。提交信息格式如下：

```markdown
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

**常用类型**:

- `feat`: 新功能 (feature)
- `fix`: 修复 Bug
- `docs`: 仅仅修改了文档
- `style`: 代码格式调整 (不影响代码运行的变动)
- `refactor`: 代码重构 (既不是新增功能，也不是修复 bug)
- `perf`: 性能优化
- `test`: 增加或修改测试
- `build`: 影响构建系统或外部依赖项的更改 (例如：gulp、broccoli、npm)
- `ci`: 对 CI 配置文件和脚本的更改 (例如 Travis, Circle, BrowserStack, SauceLabs)
- `chore`: 其他不修改 `src` 或 `test` 文件的更改

**示例**:

```markdown
feat: add dark mode toggle button
fix(login): resolve password validation logic error
docs: update CONTRIBUTING.md section on PR process
refactor: restructure user authentication module
chore: update dependencies
```

## 问题报告 (Issues)

如果您发现了 Bug、有功能建议或改进想法，欢迎通过 GitHub Issues 告诉我们。

- **搜索现有 Issues**: 在创建新 Issue 之前，请务必搜索是否已存在相关或类似的讨论。
- **使用模板**: 我们提供了 Issue 模板来帮助您提供必要的信息。请选择合适的模板（Bug 报告或功能请求）并尽可能详细地填写。
- **清晰描述**:
  - **Bug 报告**: 提供清晰的标题、详细的复现步骤（提供最小可复现示例会非常有帮助）、期望行为、实际行为以及您的环境信息（操作系统、Node.js 版本、pnpm 版本、浏览器版本等）。
  - **功能请求**: 清晰地描述您希望添加的功能、它能解决什么问题、为什么这个功能对项目很重要，以及（可选）您认为可能的实现方式或思路。

## Pull Request 流程

1. **提交 PR**: 按照 [如何贡献](#如何贡献) 中的步骤提交您的 Pull Request。
2. **自动化检查**: 提交后，通常会触发 CI/CD 流程（如 GitHub Actions），自动运行代码风格检查、测试等。请确保这些检查通过。
3. **代码审查**: 项目维护者或其他贡献者会对您的代码进行审查。他们可能会提出修改建议或要求进行更改。请及时回应审查意见并进行必要的修改。
4. **合并**: 一旦 PR 通过审查且所有检查都成功，维护者会将您的贡献合并到主分支中。
5. **感谢**: 您的贡献将出现在项目的提交历史和（可能的）更新日志中。感谢您的付出！

## 开发设置

1. **环境准备**:

   - 确保您已安装 [Node.js](https://nodejs.org/) (建议使用项目 `.nvmrc` 文件指定的版本或最新的 LTS 版本)。
   - 确保您已安装 [pnpm](https://pnpm.io/)。可以通过 `npm install -g pnpm` 安装。

   ```bash
   node -v # 检查 Node.js 版本
   pnpm -v # 检查 pnpm 版本
   ```

2. **安装依赖**: 在项目根目录下运行：

   ```bash
   pnpm install
   ```

3. **启动开发服务器**:

   ```bash
   pnpm docs:dev
   ```

   这通常会启动一个本地开发服务器，您可以在浏览器中预览更改。

## 许可证

通过向本项目贡献代码或文档，您同意您的贡献将根据项目的 [LICENSE](LICENSE) 文件进行许可。
