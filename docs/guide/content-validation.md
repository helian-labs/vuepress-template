---
title: 内容校验
---

# 文档内容校验

本项目提供了强大的文档内容校验功能，帮助您保持文档的质量和一致性。

## 功能概述

内容校验脚本 `validate-content.js` 可以检查以下内容:

- **链接验证**: 检查内部链接和外部链接的有效性
- **图片检查**: 确保所有图片存在且有适当的替代文本
- **Frontmatter 验证**: 检查必要的元数据字段
- **标题结构检查**: 确保标题层级合理且无重复
- **拼写检查**: 验证常见术语的正确拼写和大小写
- **锚点验证**: 确保文档内部引用有效

## 使用方法

您可以通过以下命令运行内容验证:

```bash
# 验证所有文档
npm run docs:validate

# 或使用简写
npm run validate
```

## 配置选项

校验脚本提供了多种配置选项，可以根据项目需要进行定制。主要配置包括:

### 拼写检查词典

脚本内置了英文和中文常见术语的校正列表，您可以通过编辑 `scripts/validate-content.js` 中的 `SPELLING_CORRECTIONS` 和 `CHINESE_SPELLING_CORRECTIONS` 对象来添加或修改校正规则。

```js
// 示例: 添加新的拼写规则
const SPELLING_CORRECTIONS = {
  // 现有规则
  javascript: 'JavaScript',
  // 添加自定义规则
  react: 'React',
  nextjs: 'Next.js',
}
```

### 链接验证选项

外部链接验证支持以下配置:

- **并发请求数**: 通过 `MAX_CONCURRENT_REQUESTS` 控制同时验证的链接数量
- **请求超时**: 通过 `REQUEST_TIMEOUT` 设置链接检查的超时时间（毫秒）

```js
// 示例: 修改链接验证配置
const MAX_CONCURRENT_REQUESTS = 10 // 默认为5
const REQUEST_TIMEOUT = 10000 // 默认为5000ms
```

## 输出说明

校验脚本将输出两种类型的消息:

- **错误 (Errors)**: 必须修复的严重问题，如断开的链接或缺失的图片
- **警告 (Warnings)**: 建议修复但不会导致构建失败的问题，如拼写建议或可能的改进

示例输出:

```
=== 验证结果 ===

错误 (1):
- docs/guide/getting-started.md: 链接失效: ../api/missing-page.md

警告 (2):
- docs/guide/introduction.md:15: 可能的拼写错误: "javascript" 应为 "JavaScript"
- docs/config/options.md: 图片缺少alt文本: ./images/config-diagram.png
```

## 最佳实践

为保持文档质量，建议遵循以下最佳实践:

1. **在提交前运行验证**: 确保所有更改通过验证后再提交
2. **定期验证整个文档**: 防止外部链接随时间变得无效
3. **注意警告信息**: 即使是警告也应尽量解决，以提高文档质量
4. **为所有图片添加alt文本**: 提高可访问性和SEO

## 扩展校验规则

您可以根据项目需要扩展验证规则。例如，添加对特定格式的验证:

```js
// 示例: 添加自定义验证规则
function validateCustomFormat(content, filePath) {
  // 实现自定义验证逻辑
  const customRegex = /特定格式/g
  if (customRegex.test(content)) {
    warnings.push(`${filePath}: 发现自定义格式问题`)
  }
}

// 然后在主验证函数中调用
validateCustomFormat(content, relativePath)
```

## 常见问题排查

如果您在运行验证时遇到问题，请检查:

1. Node.js 版本是否兼容
2. 是否安装了所有必要的依赖
3. 网络连接状态（外部链接验证需要网络连接）
4. 是否有防火墙或代理限制外部请求
