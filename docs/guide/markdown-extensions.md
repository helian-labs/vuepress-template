---
title: Markdown 扩展
---

# Markdown 扩展

VuePress 默认支持标准的 CommonMark Markdown 语法，并在此基础上提供了许多有用的扩展功能，让你的文档更具表现力。

本页面将展示一些常用的 Markdown 扩展功能及其用法。

## 自定义容器

使用 `:::` 语法创建不同类型的提示、警告或详情块。

**语法：**

```markdown
::: tip
这是一个提示容器。
:::

::: warning
这是一个警告容器。
:::

::: danger
这是一个危险警告容器。
:::

::: details 点击查看详情
这是一个详情容器，默认折叠。

- 列表项 1
- 列表项 2
:::
```

**效果：**

::: tip
这是一个提示容器。
:::

::: warning
这是一个警告容器。
:::

::: danger
这是一个危险警告容器。
:::

::: details 点击查看详情
这是一个详情容器，默认折叠。

- 列表项 1
- 列表项 2
:::

## 代码组

使用 `code-group` 和 `code-group-item` 可以将多个代码块组合在一起，并提供切换标签。

**语法：**

````markdown
::: code-group

```bash [pnpm]
pnpm install vuepress@next
```

```bash [npm]
npm install vuepress@next
```

```bash [yarn]
yarn add vuepress@next
```

:::
````

**效果：**

::: code-group

```bash [pnpm]
pnpm install vuepress@next
```

```bash [npm]
npm install vuepress@next
```

```bash [yarn]
yarn add vuepress@next
```

:::

## 导入代码片段

你可以从文件中导入指定的代码片段，避免在 Markdown 中复制代码。

**语法：**

假设 `docs/.vuepress/config.ts` 中有如下代码片段：

```ts
// ... 其他代码 ...
// #region config-snippet
export default defineUserConfig({
  lang: 'zh-CN',
  title: 'VuePress 模板',
  description: '基于 VuePress 的现代化文档模板',
})
// #endregion config-snippet
// ... 其他代码 ...
```

你可以在 Markdown 中这样导入：

```markdown
<<< @/.vuepress/config.ts#config-snippet
```

**效果：**

<<< @/.vuepress/config.ts#config-snippet

**注意：**
*   路径别名 `@` 指向 `docs` 目录。
*   需要使用 `#region region-name` 和 `#endregion region-name` 在源文件中标记代码片段。
*   `handleImportPath` 已在 `docs/.vuepress/config.ts` 的 `markdown.importCode` 部分配置，用于处理 `@` 别名。

## 其他常用语法

### Emoji

可以直接使用 Emoji Unicode 字符，或者使用 `:emoji_shorthand:`。

**语法：** `:+1: :tada:`

**效果：** :+1: :tada:

### 目录 (TOC)

默认主题会自动在右侧生成目录。你也可以在 Markdown 中使用 `[[toc]]` 来插入目录。

**语法：** `[[toc]]`

### 任务列表

**语法：**

```markdown
- [x] 已完成的任务
- [ ] 未完成的任务
```

**效果：**

- [x] 已完成的任务
- [ ] 未完成的任务

### 上标和下标

**语法：** `H~2~O`, `x^2^`

**效果：** H~2~O, x^2^

### 脚注

**语法：**

```markdown
这是一个脚注的示例[^1]。

[^1]: 这是脚注的内容。
```

**效果：**

这是一个脚注的示例[^1]。

[^1]: 这是脚注的内容。

## 更多

VuePress 还支持其他 Markdown 扩展，例如数学公式 (需要安装插件)、图表等。详情请查阅 [VuePress 官方文档 > Markdown](https://v2.vuepress.vuejs.org/zh/guide/markdown.html)。 
