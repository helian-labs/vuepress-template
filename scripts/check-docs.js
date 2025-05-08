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

// 配置
const DOCS_DIR = path.join(process.cwd(), 'docs')
const IMAGE_DIR = path.join(DOCS_DIR, '.vuepress/public/images')
const ALLOWED_IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']
const MAX_IMAGE_SIZE = 1024 * 1024 // 1MB

// 检查结果
const results = {
  format: { passed: false, error: null },
  links: { passed: false, error: null },
  build: { passed: false, error: null },
  images: { passed: false, error: null },
  codeBlocks: { passed: false, error: null },
  metadata: { passed: false, error: null },
}

// 检查文档格式
function checkFormat() {
  console.log(chalk.blue('检查文档格式...'))
  try {
    execSync('pnpm format', { stdio: 'inherit' })
    results.format.passed = true
    console.log(chalk.green('✓ 文档格式检查通过'))
  } catch (error) {
    results.format.error = error.message
    console.error(chalk.red('✗ 文档格式检查失败'))
    console.error(chalk.red(error.message))
  }
}

// 检查链接有效性
function checkLinks() {
  console.log(chalk.blue('检查文档链接...'))
  try {
    execSync('pnpm validate:content', { stdio: 'inherit' })
    results.links.passed = true
    console.log(chalk.green('✓ 文档链接检查通过'))
  } catch (error) {
    results.links.error = error.message
    console.error(chalk.red('✗ 文档链接检查失败'))
    console.error(chalk.red(error.message))
  }
}

// 检查构建
function checkBuild() {
  console.log(chalk.blue('检查文档构建...'))
  try {
    execSync('pnpm docs:build', { stdio: 'inherit' })
    results.build.passed = true
    console.log(chalk.green('✓ 文档构建检查通过'))
  } catch (error) {
    results.build.error = error.message
    console.error(chalk.red('✗ 文档构建检查失败'))
    console.error(chalk.red(error.message))
  }
}

// 检查图片
function checkImages() {
  console.log(chalk.blue('检查文档图片...'))
  try {
    if (!fs.existsSync(IMAGE_DIR)) {
      throw new Error('图片目录不存在')
    }

    const files = fs.readdirSync(IMAGE_DIR)
    let hasError = false

    for (const file of files) {
      const filePath = path.join(IMAGE_DIR, file)
      const ext = path.extname(file).toLowerCase()
      const stats = fs.statSync(filePath)

      // 检查文件扩展名
      if (!ALLOWED_IMAGE_EXTENSIONS.includes(ext)) {
        console.error(chalk.yellow(`! 不支持的图片格式: ${file}`))
        hasError = true
      }

      // 检查文件大小
      if (stats.size > MAX_IMAGE_SIZE) {
        console.error(chalk.yellow(`! 图片过大: ${file} (${formatSize(stats.size)})`))
        hasError = true
      }
    }

    if (!hasError) {
      results.images.passed = true
      console.log(chalk.green('✓ 文档图片检查通过'))
    } else {
      throw new Error('发现图片问题')
    }
  } catch (error) {
    results.images.error = error.message
    console.error(chalk.red('✗ 文档图片检查失败'))
    console.error(chalk.red(error.message))
  }
}

// 检查代码块
function checkCodeBlocks() {
  console.log(chalk.blue('检查代码块...'))
  try {
    const files = getAllMarkdownFiles(DOCS_DIR)
    let hasError = false

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8')
      const codeBlocks = content.match(/```[\s\S]*?```/g) || []

      for (const block of codeBlocks) {
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
      results.codeBlocks.passed = true
      console.log(chalk.green('✓ 代码块检查通过'))
    } else {
      throw new Error('发现代码块问题')
    }
  } catch (error) {
    results.codeBlocks.error = error.message
    console.error(chalk.red('✗ 代码块检查失败'))
    console.error(chalk.red(error.message))
  }
}

// 检查元数据
function checkMetadata() {
  console.log(chalk.blue('检查文档元数据...'))
  try {
    const files = getAllMarkdownFiles(DOCS_DIR)
    let hasError = false

    for (const file of files) {
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
      results.metadata.passed = true
      console.log(chalk.green('✓ 文档元数据检查通过'))
    } else {
      throw new Error('发现元数据问题')
    }
  } catch (error) {
    results.metadata.error = error.message
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

  const allPassed = Object.values(results).every(r => r.passed)
  if (allPassed) {
    console.log(chalk.green('\n所有检查都通过了！'))
  } else {
    console.log(chalk.red('\n发现以下问题：'))
    Object.entries(results).forEach(([key, result]) => {
      if (!result.passed) {
        console.log(chalk.red(`\n${key}:`))
        console.log(chalk.red(result.error))
      }
    })
  }
}

// 主函数
function main() {
  console.log(chalk.yellow('开始文档检查...\n'))

  checkFormat()
  checkLinks()
  checkBuild()
  checkImages()
  checkCodeBlocks()
  checkMetadata()

  generateReport()

  // 如果有任何检查失败，退出码为1
  if (!Object.values(results).every(r => r.passed)) {
    process.exit(1)
  }
}

main()
