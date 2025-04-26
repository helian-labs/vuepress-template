# 静态资源

此目录用于存放静态资源，如图片、字体、样式表等。

## 目录结构

- `images/` - 图片资源
- `fonts/` - 字体资源
- `styles/` - 额外的CSS文件
- `js/` - 额外的JavaScript文件

## 使用方法

在 Markdown 文件中引用静态资源时，路径应该以 `/` 开头，表示相对于 `public` 目录。

例如：

```markdown
![Logo](/images/logo.png)
```

而不是：

```markdown
![Logo](../public/images/logo.png)
```
