#!/usr/bin/env node

/**
 * VuePress构建分析脚本
 *
 * 这个脚本分析VuePress构建输出，提供以下信息：
 * - 页面数量和大小统计
 * - 资源大小分析
 * - 构建时间分析
 * - 发现可能的性能问题
 */

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const zlib = require('zlib')
const { execSync } = require('child_process')

// 配置
const DIST_DIR = path.join(process.cwd(), 'docs/.vuepress/dist')
const OUTPUT_REPORT = path.join(process.cwd(), 'docs/.vuepress/dist/build-report.json')
const SIZE_THRESHOLD = {
  js: 250 * 1024, // 250KB
  css: 50 * 1024, // 50KB
  html: 100 * 1024, // 100KB
  image: 1000 * 1024, // 1MB
}

// 统计数据
const stats = {
  startTime: Date.now(),
  totalSize: 0,
  compressedSize: 0,
  fileTypes: {},
  largeFiles: [],
  pages: 0,
  assets: {
    js: [],
    css: [],
    images: [],
  },
}

// 检查构建目录是否存在
if (!fs.existsSync(DIST_DIR)) {
  console.log(chalk.yellow('构建目录不存在，开始构建...'))
  try {
    execSync('npx vuepress build docs', { stdio: 'inherit' })
  } catch (error) {
    console.error(chalk.red('构建失败:'), error.message)
    process.exit(1)
  }
}

// 分析函数
async function analyze() {
  console.log(chalk.blue('开始分析VuePress构建...'))
  await walkDir(DIST_DIR)

  // 计算总结果
  const buildTime = (Date.now() - stats.startTime) / 1000

  // 输出分析结果
  console.log(chalk.green('\n=== 构建分析报告 ==='))
  console.log(`构建时间: ${buildTime.toFixed(2)}秒`)
  console.log(`页面总数: ${stats.pages}`)
  console.log(
    `总大小: ${formatSize(stats.totalSize)} (压缩后: ${formatSize(stats.compressedSize)})`
  )

  // 按类型显示
  console.log(chalk.cyan('\n文件类型分布:'))
  Object.keys(stats.fileTypes)
    .sort()
    .forEach(type => {
      const typeStats = stats.fileTypes[type]
      console.log(
        `  ${type}: ${typeStats.count}个文件, ${formatSize(typeStats.size)} (${((typeStats.size / stats.totalSize) * 100).toFixed(1)}%)`
      )
    })

  // 最大的JS文件
  if (stats.assets.js.length > 0) {
    console.log(chalk.cyan('\n最大的JS文件:'))
    stats.assets.js
      .sort((a, b) => b.size - a.size)
      .slice(0, 5)
      .forEach(file => {
        console.log(`  ${file.path}: ${formatSize(file.size)}`)
      })
  }

  // 最大的CSS文件
  if (stats.assets.css.length > 0) {
    console.log(chalk.cyan('\n最大的CSS文件:'))
    stats.assets.css
      .sort((a, b) => b.size - a.size)
      .slice(0, 5)
      .forEach(file => {
        console.log(`  ${file.path}: ${formatSize(file.size)}`)
      })
  }

  // 显示大文件警告
  if (stats.largeFiles.length > 0) {
    console.log(chalk.yellow('\n大文件警告:'))
    stats.largeFiles.forEach(file => {
      console.log(`  ${file.path}: ${formatSize(file.size)}`)
    })
  }

  // 保存分析报告
  const report = {
    buildTime,
    pages: stats.pages,
    totalSize: stats.totalSize,
    compressedSize: stats.compressedSize,
    fileTypes: stats.fileTypes,
    largeFiles: stats.largeFiles,
    assets: stats.assets,
  }

  fs.writeFileSync(OUTPUT_REPORT, JSON.stringify(report, null, 2))
  console.log(chalk.green(`\n分析报告已保存到: ${path.relative(process.cwd(), OUTPUT_REPORT)}`))

  // 提供优化建议
  provideOptimizationTips(report)
}

// 遍历目录
async function walkDir(dir, relativePath = '') {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const relPath = path.join(relativePath, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      await walkDir(fullPath, relPath)
    } else {
      analyzeFile(fullPath, relPath, stat.size)
    }
  }
}

// 分析单个文件
function analyzeFile(fullPath, relativePath, size) {
  const ext = path.extname(relativePath).toLowerCase().substring(1) || 'unknown'

  // 更新总大小
  stats.totalSize += size

  // 计算gzip压缩后的大小
  const content = fs.readFileSync(fullPath)
  const compressedSize = zlib.gzipSync(content).length
  stats.compressedSize += compressedSize

  // 更新文件类型统计
  if (!stats.fileTypes[ext]) {
    stats.fileTypes[ext] = { count: 0, size: 0 }
  }
  stats.fileTypes[ext].count++
  stats.fileTypes[ext].size += size

  // 统计HTML页面
  if (ext === 'html') {
    stats.pages++
  }

  // 保存资产信息
  const fileInfo = { path: relativePath, size, compressedSize }

  if (ext === 'js') {
    stats.assets.js.push(fileInfo)
    if (size > SIZE_THRESHOLD.js) {
      stats.largeFiles.push(fileInfo)
    }
  } else if (ext === 'css') {
    stats.assets.css.push(fileInfo)
    if (size > SIZE_THRESHOLD.css) {
      stats.largeFiles.push(fileInfo)
    }
  } else if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) {
    stats.assets.images.push(fileInfo)
    if (size > SIZE_THRESHOLD.image) {
      stats.largeFiles.push(fileInfo)
    }
  } else if (ext === 'html' && size > SIZE_THRESHOLD.html) {
    stats.largeFiles.push(fileInfo)
  }
}

// 格式化大小
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]
}

// 提供优化建议
function provideOptimizationTips(report) {
  console.log(chalk.cyan('\n优化建议:'))

  // 检查大JS文件
  if (report.assets.js.filter(f => f.size > SIZE_THRESHOLD.js).length > 0) {
    console.log('- 考虑拆分大型JS文件，使用代码分割或懒加载')
  }

  // 检查大图片
  if (report.assets.images.filter(f => f.size > SIZE_THRESHOLD.image).length > 0) {
    console.log('- 优化大型图片，考虑使用WebP格式或适当压缩')
  }

  // 检查资源总大小
  if (report.totalSize > 5 * 1024 * 1024) {
    // 5MB
    console.log('- 网站总大小超过5MB，考虑优化资源减小加载时间')
  }

  // 检查压缩比
  const compressionRatio = report.compressedSize / report.totalSize
  if (compressionRatio > 0.8) {
    console.log('- 压缩效果不佳，考虑优化资源使其更易压缩')
  }

  // 检查CSS文件数量
  if (report.assets.css.length > 10) {
    console.log('- CSS文件过多，考虑合并CSS减少HTTP请求')
  }
}

// 运行分析
analyze().catch(error => {
  console.error(chalk.red('分析出错:'), error)
  process.exit(1)
})
