#!/usr/bin/env node

/**
 * 创建新文档页面的辅助脚本
 * 使用方法: npm run docs:new
 */

import fs from 'fs'
import path from 'path'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const DOCS_DIR = path.resolve('docs')
const TEMPLATES = {
  normal: `# 页面标题

这是一个普通页面。

## 小标题

内容...
`,
  api: `# API 名称

## 描述

API 的简要描述。

## 使用方法

\`\`\`js
// 示例代码
\`\`\`

## 参数

| 参数名 | 类型 | 默认值 | 描述 |
| ----- | --- | ----- | ---- |
| param1 | String | - | 参数1的描述 |

## 返回值

返回值的描述。

## 示例

\`\`\`js
// 使用示例
\`\`\`
`,
  config: `# 配置项

## 描述

配置项的简要描述。

## 类型

\`\`\`ts
// 类型定义
interface Config {
  // 属性定义
}
\`\`\`

## 默认值

\`\`\`js
// 默认配置
\`\`\`

## 示例

\`\`\`js
// 使用示例
\`\`\`
`,
  guide: `# 指南标题

## 介绍

这个功能的简要介绍。

## 基本使用

基本用法的描述。

\`\`\`js
// 基本用法示例
\`\`\`

## 高级用法

更高级用法的描述。

## 最佳实践

使用此功能的最佳实践。

## 常见问题

常见问题及解决方案。
`,
}

// 支持的目录类型
const SECTIONS = ['guide', 'config', 'api', 'faq', 'advanced']

/**
 * 确保目录存在
 */
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

/**
 * 创建新页面
 */
async function createNewPage() {
  console.log('✨ 创建新的文档页面')

  // 1. 选择文档类型/目录
  const section = await new Promise(resolve => {
    rl.question(`选择文档类型 (${SECTIONS.join('/')}): `, answer => {
      const section = answer.trim().toLowerCase()
      if (!SECTIONS.includes(section)) {
        console.log(`无效的文档类型。请选择: ${SECTIONS.join(', ')}`)
        process.exit(1)
      }
      resolve(section)
    })
  })

  // 2. 输入页面名称
  const pageName = await new Promise(resolve => {
    rl.question('输入页面名称 (如 getting-started): ', answer => {
      const name = answer.trim().toLowerCase()
      if (!name) {
        console.log('页面名称不能为空')
        process.exit(1)
      }
      resolve(name)
    })
  })

  // 3. 输入页面标题
  const pageTitle = await new Promise(resolve => {
    rl.question('输入页面标题 (如 快速开始): ', answer => {
      const title = answer.trim()
      if (!title) {
        console.log('页面标题不能为空')
        process.exit(1)
      }
      resolve(title)
    })
  })

  // 4. 选择模板
  const templateType = await new Promise(resolve => {
    const choices = Object.keys(TEMPLATES)
    rl.question(`选择模板类型 (${choices.join('/')}): `, answer => {
      const type = answer.trim().toLowerCase()
      if (!choices.includes(type)) {
        console.log(`无效的模板类型。请选择: ${choices.join(', ')}`)
        process.exit(1)
      }
      resolve(type)
    })
  })

  // 构建文件路径
  const sectionDir = path.join(DOCS_DIR, section)
  ensureDirectoryExists(sectionDir)

  const filePath = path.join(sectionDir, `${pageName}.md`)

  // 检查文件是否已存在
  if (fs.existsSync(filePath)) {
    const overwrite = await new Promise(resolve => {
      rl.question('文件已存在，是否覆盖? (y/n): ', answer => {
        resolve(answer.trim().toLowerCase() === 'y')
      })
    })

    if (!overwrite) {
      console.log('操作已取消')
      rl.close()
      return
    }
  }

  // 处理模板内容
  let content = TEMPLATES[templateType]
  content = content.replace(/^# .*$/m, `# ${pageTitle}`)

  // 写入文件
  fs.writeFileSync(filePath, content)
  console.log(`✅ 成功创建页面: ${filePath}`)

  rl.close()
}

// 启动流程
createNewPage().catch(err => {
  console.error('发生错误:', err)
  process.exit(1)
})
