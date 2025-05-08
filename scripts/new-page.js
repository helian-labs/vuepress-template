/**
 * 创建新文档页面的辅助脚本
 * 使用方法: npm run docs:new
 */

import fs from 'fs'
import path from 'path'
import readline from 'readline'

import chalk from 'chalk'

// 配置常量
const CONFIG = {
  docsDir: path.resolve('docs'),
  sections: ['guide', 'config', 'api', 'faq', 'advanced'],
  templates: {
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
  },
}

// 创建 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

/**
 * 确保目录存在
 * @param {string} dir - 目录路径
 */
function ensureDirectoryExists(dir) {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  } catch (error) {
    console.error(chalk.red(`创建目录失败 ${dir}:`), error)
    throw error
  }
}

/**
 * 验证用户输入
 * @param {string} input - 用户输入
 * @param {string} type - 输入类型
 * @returns {string} 验证后的输入
 */
function validateInput(input, type) {
  const value = input.trim()
  if (!value) {
    throw new Error(`${type}不能为空`)
  }
  return value
}

/**
 * 创建新页面
 */
async function createNewPage() {
  try {
    console.log('✨ 创建新的文档页面')

    // 1. 选择文档类型/目录
    const section = await new Promise((resolve, reject) => {
      rl.question(`选择文档类型 (${CONFIG.sections.join('/')}): `, answer => {
        try {
          const section = validateInput(answer, '文档类型').toLowerCase()
          if (!CONFIG.sections.includes(section)) {
            throw new Error(`无效的文档类型。请选择: ${CONFIG.sections.join(', ')}`)
          }
          resolve(section)
        } catch (error) {
          reject(error)
        }
      })
    })

    // 2. 输入页面名称
    const pageName = await new Promise((resolve, reject) => {
      rl.question('输入页面名称 (如 getting-started): ', answer => {
        try {
          const name = validateInput(answer, '页面名称').toLowerCase()
          resolve(name)
        } catch (error) {
          reject(error)
        }
      })
    })

    // 3. 输入页面标题
    const pageTitle = await new Promise((resolve, reject) => {
      rl.question('输入页面标题 (如 快速开始): ', answer => {
        try {
          const title = validateInput(answer, '页面标题')
          resolve(title)
        } catch (error) {
          reject(error)
        }
      })
    })

    // 4. 选择模板
    const templateType = await new Promise((resolve, reject) => {
      const choices = Object.keys(CONFIG.templates)
      rl.question(`选择模板类型 (${choices.join('/')}): `, answer => {
        try {
          const type = validateInput(answer, '模板类型').toLowerCase()
          if (!choices.includes(type)) {
            throw new Error(`无效的模板类型。请选择: ${choices.join(', ')}`)
          }
          resolve(type)
        } catch (error) {
          reject(error)
        }
      })
    })

    // 构建文件路径
    const sectionDir = path.join(CONFIG.docsDir, section)
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
    let content = CONFIG.templates[templateType]
    content = content.replace(/^# .*$/m, `# ${pageTitle}`)

    // 写入文件
    fs.writeFileSync(filePath, content)
    console.log(`✅ 成功创建页面: ${filePath}`)

    rl.close()
  } catch (error) {
    console.error(chalk.red('创建页面失败:'), error.message)
    rl.close()
    process.exit(1)
  }
}

// 启动流程
createNewPage().catch(error => {
  console.error(chalk.red('发生错误:'), error)
  process.exit(1)
})
