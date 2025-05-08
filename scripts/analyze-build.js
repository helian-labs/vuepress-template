/**
 * VuePress构建分析脚本
 *
 * 这个脚本分析VuePress构建输出，提供以下信息：
 * - 页面数量和大小统计
 * - 资源大小分析
 * - 构建时间分析
 * - 发现可能的性能问题
 * - 性能评分和建议
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import zlib from 'zlib'

import chalk from 'chalk'

// 配置常量
const CONFIG = {
  distDir: path.join(process.cwd(), 'docs/.vuepress/dist'),
  outputReport: path.join(process.cwd(), 'docs/.vuepress/dist/build-report.json'),
  sizeThreshold: {
    js: 250 * 1024, // 250KB
    css: 50 * 1024, // 50KB
    html: 100 * 1024, // 100KB
    image: 5 * 1024 * 1024, // 5MB
  },
  performanceScores: {
    totalSize: {
      excellent: 2 * 1024 * 1024, // 2MB
      good: 5 * 1024 * 1024, // 5MB
      poor: 10 * 1024 * 1024, // 10MB
    },
    compressionRatio: {
      excellent: 0.3, // 30%
      good: 0.5, // 50%
      poor: 0.7, // 70%
    },
    jsFiles: {
      excellent: 5,
      good: 10,
      poor: 15,
    },
    cssFiles: {
      excellent: 3,
      good: 5,
      poor: 10,
    },
  },
  weights: {
    totalSize: 0.3,
    compressionRatio: 0.3,
    jsFiles: 0.2,
    cssFiles: 0.2,
  },
  buildCommand: 'npx vuepress build docs',
}

// 性能监控
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
  performance: {
    score: 0,
    metrics: {},
  },
}

// 检查构建目录是否存在
if (!fs.existsSync(CONFIG.distDir)) {
  console.log(chalk.yellow('构建目录不存在，开始构建...'))
  try {
    execSync(CONFIG.buildCommand, { stdio: 'inherit' })
  } catch (error) {
    console.error(chalk.red('构建失败:'), error.message)
    process.exit(1)
  }
}

// 分析函数
async function analyze() {
  try {
    console.log(chalk.blue('开始分析VuePress构建...'))
    await walkDir(CONFIG.distDir)

    // 计算总结果
    const buildTime = (Date.now() - stats.startTime) / 1000

    // 计算性能评分
    calculatePerformanceScore()

    // 输出分析结果
    console.log(chalk.green('\n=== 构建分析报告 ==='))
    console.log(`构建时间: ${buildTime.toFixed(2)}秒`)
    console.log(`页面总数: ${stats.pages}`)
    console.log(
      `总大小: ${formatSize(stats.totalSize)} (压缩后: ${formatSize(stats.compressedSize)})`
    )
    console.log(`性能评分: ${stats.performance.score}/100`)

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
      performance: stats.performance,
    }

    fs.writeFileSync(CONFIG.outputReport, JSON.stringify(report, null, 2))
    console.log(
      chalk.green(`\n分析报告已保存到: ${path.relative(process.cwd(), CONFIG.outputReport)}`)
    )

    // 提供优化建议
    provideOptimizationTips(report)
  } catch (error) {
    console.error(chalk.red('分析过程出错:'), error)
    process.exit(1)
  }
}

// 计算性能评分
function calculatePerformanceScore() {
  const metrics = stats.performance.metrics
  let totalScore = 0

  // 总大小评分
  const totalSize = stats.totalSize
  if (totalSize <= CONFIG.performanceScores.totalSize.excellent) {
    metrics.totalSize = { score: 100, level: 'excellent' }
  } else if (totalSize <= CONFIG.performanceScores.totalSize.good) {
    metrics.totalSize = { score: 80, level: 'good' }
  } else if (totalSize <= CONFIG.performanceScores.totalSize.poor) {
    metrics.totalSize = { score: 60, level: 'poor' }
  } else {
    metrics.totalSize = { score: 40, level: 'critical' }
  }

  // 压缩比评分
  const compressionRatio = stats.compressedSize / stats.totalSize
  if (compressionRatio <= CONFIG.performanceScores.compressionRatio.excellent) {
    metrics.compressionRatio = { score: 100, level: 'excellent' }
  } else if (compressionRatio <= CONFIG.performanceScores.compressionRatio.good) {
    metrics.compressionRatio = { score: 80, level: 'good' }
  } else if (compressionRatio <= CONFIG.performanceScores.compressionRatio.poor) {
    metrics.compressionRatio = { score: 60, level: 'poor' }
  } else {
    metrics.compressionRatio = { score: 40, level: 'critical' }
  }

  // JS文件数量评分
  const jsFiles = stats.assets.js.length
  if (jsFiles <= CONFIG.performanceScores.jsFiles.excellent) {
    metrics.jsFiles = { score: 100, level: 'excellent' }
  } else if (jsFiles <= CONFIG.performanceScores.jsFiles.good) {
    metrics.jsFiles = { score: 80, level: 'good' }
  } else if (jsFiles <= CONFIG.performanceScores.jsFiles.poor) {
    metrics.jsFiles = { score: 60, level: 'poor' }
  } else {
    metrics.jsFiles = { score: 40, level: 'critical' }
  }

  // CSS文件数量评分
  const cssFiles = stats.assets.css.length
  if (cssFiles <= CONFIG.performanceScores.cssFiles.excellent) {
    metrics.cssFiles = { score: 100, level: 'excellent' }
  } else if (cssFiles <= CONFIG.performanceScores.cssFiles.good) {
    metrics.cssFiles = { score: 80, level: 'good' }
  } else if (cssFiles <= CONFIG.performanceScores.cssFiles.poor) {
    metrics.cssFiles = { score: 60, level: 'poor' }
  } else {
    metrics.cssFiles = { score: 40, level: 'critical' }
  }

  // 计算总分
  totalScore =
    metrics.totalSize.score * CONFIG.weights.totalSize +
    metrics.compressionRatio.score * CONFIG.weights.compressionRatio +
    metrics.jsFiles.score * CONFIG.weights.jsFiles +
    metrics.cssFiles.score * CONFIG.weights.cssFiles

  stats.performance.score = Math.round(totalScore)
}

// 遍历目录
async function walkDir(dir, relativePath = '') {
  try {
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
  } catch (error) {
    console.error(chalk.red(`遍历目录出错 ${dir}:`), error)
    throw error
  }
}

// 分析单个文件
function analyzeFile(fullPath, relativePath, size) {
  try {
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
      if (size > CONFIG.sizeThreshold.js) {
        stats.largeFiles.push(fileInfo)
      }
    } else if (ext === 'css') {
      stats.assets.css.push(fileInfo)
      if (size > CONFIG.sizeThreshold.css) {
        stats.largeFiles.push(fileInfo)
      }
    } else if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) {
      stats.assets.images.push(fileInfo)
      if (size > CONFIG.sizeThreshold.image) {
        stats.largeFiles.push(fileInfo)
      }
    } else if (ext === 'html' && size > CONFIG.sizeThreshold.html) {
      stats.largeFiles.push(fileInfo)
    }
  } catch (error) {
    console.error(chalk.red(`分析文件出错 ${fullPath}:`), error)
    throw error
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

  // 检查性能评分
  if (report.performance.score < 60) {
    console.log(chalk.red('\n性能评分较低，需要重点关注以下问题:'))
  }

  // 检查大JS文件
  if (report.assets.js.filter(f => f.size > CONFIG.sizeThreshold.js).length > 0) {
    console.log('- 考虑拆分大型JS文件，使用代码分割或懒加载')
    console.log('  - 使用动态导入: import()')
    console.log('  - 配置路由级别的代码分割')
    console.log('  - 使用 webpack/vite 的 splitChunks 优化')
  }

  // 检查大图片
  if (report.assets.images.filter(f => f.size > CONFIG.sizeThreshold.image).length > 0) {
    console.log('- 优化大型图片:')
    console.log('  - 使用 WebP 格式替代 JPG/PNG')
    console.log('  - 使用适当的图片压缩工具')
    console.log('  - 考虑使用响应式图片')
    console.log('  - 实现图片懒加载')
  }

  // 检查资源总大小
  if (report.totalSize > CONFIG.performanceScores.totalSize.poor) {
    console.log('- 网站总大小过大:')
    console.log('  - 移除未使用的依赖')
    console.log('  - 优化第三方库的引入')
    console.log('  - 使用 tree-shaking 减少打包体积')
  }

  // 检查压缩比
  const compressionRatio = report.compressedSize / report.totalSize
  if (compressionRatio > CONFIG.performanceScores.compressionRatio.poor) {
    console.log('- 压缩效果不佳:')
    console.log('  - 优化代码结构使其更易压缩')
    console.log('  - 移除重复代码')
    console.log('  - 使用更高效的压缩算法')
  }

  // 检查CSS文件数量
  if (report.assets.css.length > CONFIG.performanceScores.cssFiles.poor) {
    console.log('- CSS文件过多:')
    console.log('  - 合并CSS文件减少HTTP请求')
    console.log('  - 使用CSS模块化方案')
    console.log('  - 移除未使用的CSS')
  }

  // 检查JS文件数量
  if (report.assets.js.length > CONFIG.performanceScores.jsFiles.poor) {
    console.log('- JS文件过多:')
    console.log('  - 合并小型JS文件')
    console.log('  - 使用代码分割')
    console.log('  - 优化模块导入')
  }

  // 提供性能优化建议
  console.log(chalk.cyan('\n性能优化建议:'))
  console.log('- 启用 HTTP/2')
  console.log('- 配置适当的缓存策略')
  console.log('- 使用 CDN 加速静态资源')
  console.log('- 实现资源预加载')
  console.log('- 优化关键渲染路径')
}

// 运行分析
analyze().catch(error => {
  console.error(chalk.red('分析出错:'), error)
  process.exit(1)
})
