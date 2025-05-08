/**
 * VuePress文档检查脚本
 *
 * 这个脚本用于检查文档的各个方面：
 * - 文档格式检查
 * - 链接有效性检查
 * - 构建检查
 * - 图片检查
 * - 代码块检查
 * - 元数据检查
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

import chalk from 'chalk'

// 配置常量
const CONFIG = {
  docsDir: path.join(process.cwd(), 'docs'),
  imageDir: path.join(process.cwd(), 'docs/.vuepress/public/images'),
  allowedImageExtensions: ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'],
  maxImageSize: 5 * 1024 * 1024, // 5MB
  commands: {
    format: 'pnpm format',
    validate: 'pnpm validate:content',
    build: 'pnpm docs:build',
  },
}

// 性能监控
const stats = {
  startTime: Date.now(),
  filesChecked: 0,
  imagesChecked: 0,
  codeBlocksChecked: 0,
  results: {
    format: { passed: false, error: null },
    links: { passed: false, error: null },
    build: { passed: false, error: null },
    images: { passed: false, error: null },
    codeBlocks: { passed: false, error: null },
    metadata: { passed: false, error: null },
  },
}

// 检查文档格式
function checkFormat() {
  console.log(chalk.blue('检查文档格式...'))
  try {
    execSync(CONFIG.commands.format, { stdio: 'inherit' })
    stats.results.format.passed = true
    console.log(chalk.green('✓ 文档格式检查通过'))
  } catch (error) {
    stats.results.format.error = error.message
    console.error(chalk.red('✗ 文档格式检查失败'))
    console.error(chalk.red(error.message))
  }
}

// 检查链接有效性
function checkLinks() {
  console.log(chalk.blue('检查文档链接...'))
  try {
    execSync(CONFIG.commands.validate, { stdio: 'inherit' })
    stats.results.links.passed = true
    console.log(chalk.green('✓ 文档链接检查通过'))
  } catch (error) {
    stats.results.links.error = error.message
    console.error(chalk.red('✗ 文档链接检查失败'))
    console.error(chalk.red(error.message))
  }
}

// 检查构建
function checkBuild() {
  console.log(chalk.blue('检查文档构建...'))
  try {
    execSync(CONFIG.commands.build, { stdio: 'inherit' })
    stats.results.build.passed = true
    console.log(chalk.green('✓ 文档构建检查通过'))
  } catch (error) {
    stats.results.build.error = error.message
    console.error(chalk.red('✗ 文档构建检查失败'))
    console.error(chalk.red(error.message))
  }
}

// 检查图片
function checkImages() {
  console.log(chalk.blue('检查文档图片...'))
  try {
    if (!fs.existsSync(CONFIG.imageDir)) {
      throw new Error('图片目录不存在')
    }

    const files = fs.readdirSync(CONFIG.imageDir)
    let hasError = false

    for (const file of files) {
      stats.imagesChecked++
      const filePath = path.join(CONFIG.imageDir, file)
      const ext = path.extname(file).toLowerCase()
      const fileStats = fs.statSync(filePath)

      // 检查文件扩展名
      if (!CONFIG.allowedImageExtensions.includes(ext)) {
        console.error(chalk.yellow(`! 不支持的图片格式: ${file}`))
        hasError = true
      }

      // 检查文件大小
      if (fileStats.size > CONFIG.maxImageSize) {
        console.error(chalk.yellow(`! 图片过大: ${file} (${formatSize(fileStats.size)})`))
        hasError = true
      }
    }

    if (!hasError) {
      stats.results.images.passed = true
      console.log(chalk.green('✓ 文档图片检查通过'))
    } else {
      throw new Error('发现图片问题')
    }
  } catch (error) {
    stats.results.images.error = error.message
    console.error(chalk.red('✗ 文档图片检查失败'))
    console.error(chalk.red(error.message))
  }
}

// 检查代码块
function checkCodeBlocks() {
  console.log(chalk.blue('检查代码块...'))
  try {
    const files = getAllMarkdownFiles(CONFIG.docsDir)
    let hasError = false

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8')
      const codeBlocks = content.match(/```[\s\S]*?```/g) || []

      for (const block of codeBlocks) {
        stats.codeBlocksChecked++
        // 检查代码块语言
        if (!block.startsWith('```')) {
          console.error(chalk.yellow(`! 代码块缺少语言标识: ${file}`))
          hasError = true
        }

        // 检查代码块内容
        if (block.trim() === '```') {
          console.error(chalk.yellow(`! 空代码块: ${file}`))
          hasError = true
        }
      }
    }

    if (!hasError) {
      stats.results.codeBlocks.passed = true
      console.log(chalk.green('✓ 代码块检查通过'))
    } else {
      throw new Error('发现代码块问题')
    }
  } catch (error) {
    stats.results.codeBlocks.error = error.message
    console.error(chalk.red('✗ 代码块检查失败'))
    console.error(chalk.red(error.message))
  }
}

// 检查元数据
function checkMetadata() {
  console.log(chalk.blue('检查文档元数据...'))
  try {
    const files = getAllMarkdownFiles(CONFIG.docsDir)
    let hasError = false

    for (const file of files) {
      stats.filesChecked++
      const content = fs.readFileSync(file, 'utf-8')
      const frontmatter = content.match(/^---\n([\s\S]*?)\n---/) || []

      if (frontmatter.length === 0) {
        console.error(chalk.yellow(`! 缺少 frontmatter: ${file}`))
        hasError = true
        continue
      }

      const metadata = frontmatter[1]
      const requiredFields = ['title']

      for (const field of requiredFields) {
        if (!metadata.includes(`${field}:`)) {
          console.error(chalk.yellow(`! 缺少必要字段 ${field}: ${file}`))
          hasError = true
        }
      }
    }

    if (!hasError) {
      stats.results.metadata.passed = true
      console.log(chalk.green('✓ 文档元数据检查通过'))
    } else {
      throw new Error('发现元数据问题')
    }
  } catch (error) {
    stats.results.metadata.error = error.message
    console.error(chalk.red('✗ 文档元数据检查失败'))
    console.error(chalk.red(error.message))
  }
}

// 获取所有 Markdown 文件
function getAllMarkdownFiles(dir) {
  const files = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
        files.push(...getAllMarkdownFiles(fullPath))
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

// 格式化文件大小
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]
}

// 生成检查报告
function generateReport() {
  console.log(chalk.cyan('\n=== 文档检查报告 ==='))
  console.log(chalk.blue(`\n性能统计:`))
  console.log(chalk.blue(`- 检查文件数: ${stats.filesChecked}`))
  console.log(chalk.blue(`- 检查图片数: ${stats.imagesChecked}`))
  console.log(chalk.blue(`- 检查代码块数: ${stats.codeBlocksChecked}`))
  console.log(chalk.blue(`- 总耗时: ${((Date.now() - stats.startTime) / 1000).toFixed(2)}s`))

  const allPassed = Object.values(stats.results).every(r => r.passed)
  if (allPassed) {
    console.log(chalk.green('\n所有检查都通过了！'))
  } else {
    console.log(chalk.red('\n发现以下问题：'))
    Object.entries(stats.results).forEach(([key, result]) => {
      if (!result.passed) {
        console.log(chalk.red(`\n${key}:`))
        console.log(chalk.red(result.error))
      }
    })
  }
}

// 主函数
function main() {
  try {
    console.log(chalk.yellow('开始文档检查...\n'))

    checkFormat()
    checkLinks()
    checkBuild()
    checkImages()
    checkCodeBlocks()
    checkMetadata()

    generateReport()

    // 如果有任何检查失败，退出码为1
    if (!Object.values(stats.results).every(r => r.passed)) {
      process.exit(1)
    }
  } catch (error) {
    console.error(chalk.red('检查过程出错:'), error)
    process.exit(1)
  }
}

main()
