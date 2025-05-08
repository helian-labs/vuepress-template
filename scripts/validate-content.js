/**
 * 内容验证脚本
 *
 * 这个脚本检查文档中的常见问题:
 * - 检查断开的链接
 * - 检查缺失的图片
 * - 检查Frontmatter问题
 * - 检查重复的标题
 * - 检查拼写错误
 * - 验证外部链接有效性
 */

import fs from 'fs'
import http from 'http'
import https from 'https'
import path from 'path'
import { URL } from 'url'

import chalk from 'chalk'
import { glob } from 'glob'
import matter from 'gray-matter'

// 配置常量
const CONFIG = {
  docsDir: path.join(process.cwd(), 'docs'),
  maxConcurrentRequests: 5,
  requestTimeout: 5000,
  ignoredPatterns: ['node_modules/**', '.vuepress/**'],
}

// 性能监控
const stats = {
  startTime: Date.now(),
  filesChecked: 0,
  linksChecked: 0,
  errors: [],
  warnings: [],
}

// 缓存
const checkedUrls = new Map()
let activeRequests = 0
const urlQueue = []

// 常见拼写错误和修正建议
const SPELLING_CORRECTIONS = {
  javascript: 'JavaScript',
  css: 'CSS',
  html: 'HTML',
  nodejs: 'Node.js',
  'vue.js': 'Vue.js',
  vuejs: 'Vue.js',
  vuepress: 'VuePress',
  github: 'GitHub',
  gitlab: 'GitLab',
  bitbucket: 'Bitbucket',
  npm: 'npm',
  webpack: 'webpack',
  api: 'API',
  oauth: 'OAuth',
  http: 'HTTP',
  https: 'HTTPS',
  ios: 'iOS',
  macos: 'macOS',
  linux: 'Linux',
  windows: 'Windows',
  typescript: 'TypeScript',
  eslint: 'ESLint',
  jsx: 'JSX',
  tsx: 'TSX',
  ui: 'UI',
  ux: 'UX',
  url: 'URL',
  urls: 'URLs',
  json: 'JSON',
  yaml: 'YAML',
  xml: 'XML',
}

// 中文拼写错误和修正建议
const CHINESE_SPELLING_CORRECTIONS = {
  刷新缓存: '刷新缓存',
  卸载: '卸载',
  安装: '安装',
  框架: '框架',
  错误: '错误',
  警告: '警告',
  组件: '组件',
  模块: '模块',
  插件: '插件',
  主题: '主题',
  路由: '路由',
  状态: '状态',
  配置: '配置',
  构建: '构建',
  部署: '部署',
  调试: '调试',
  测试: '测试',
  打包: '打包',
  编译: '编译',
}

console.log(chalk.blue('开始验证文档内容...'))

// 获取所有的markdown文件
const markdownFiles = glob.sync('**/*.md', {
  cwd: CONFIG.docsDir,
  ignore: CONFIG.ignoredPatterns,
})

// 主验证函数
async function validateContent() {
  try {
    // 检查所有markdown文件
    for (const file of markdownFiles) {
      stats.filesChecked++
      const filePath = path.join(CONFIG.docsDir, file)
      const relativePath = path.relative(process.cwd(), filePath)
      const content = fs.readFileSync(filePath, 'utf8')

      try {
        // 检查frontmatter
        validateFrontmatter(content, relativePath)

        // 检查链接
        validateLinks(content, relativePath, file)

        // 检查图片
        validateImages(content, relativePath, file)

        // 检查标题
        validateHeadings(content, relativePath)

        // 检查拼写错误
        validateSpelling(content, relativePath)
      } catch (error) {
        stats.errors.push(`${relativePath}: ${error.message}`)
      }
    }

    // 验证所有外部链接
    await validateExternalLinks()

    // 显示结果
    console.log('\n=== 验证结果 ===')
    console.log(chalk.blue(`\n性能统计:`))
    console.log(chalk.blue(`- 检查文件数: ${stats.filesChecked}`))
    console.log(chalk.blue(`- 检查链接数: ${stats.linksChecked}`))
    console.log(chalk.blue(`- 总耗时: ${((Date.now() - stats.startTime) / 1000).toFixed(2)}s`))

    if (stats.errors.length === 0 && stats.warnings.length === 0) {
      console.log(chalk.green('✓ 没有发现问题！'))
    } else {
      if (stats.errors.length > 0) {
        console.log(chalk.red(`\n错误 (${stats.errors.length}):`))
        stats.errors.forEach(error => console.log(chalk.red(`- ${error}`)))
      }

      if (stats.warnings.length > 0) {
        console.log(chalk.yellow(`\n警告 (${stats.warnings.length}):`))
        stats.warnings.forEach(warning => console.log(chalk.yellow(`- ${warning}`)))
      }

      if (stats.errors.length > 0) {
        process.exit(1)
      }
    }
  } catch (error) {
    console.error(chalk.red('验证过程出错:'), error)
    process.exit(1)
  }
}

/**
 * 验证Frontmatter
 */
function validateFrontmatter(content, filePath) {
  try {
    const { data } = matter(content)

    // 检查必须的字段
    if (!data.title) {
      stats.warnings.push(`${filePath}: 缺少标题 (title) 字段`)
    }

    // 检查日期格式
    if (data.date && isNaN(new Date(data.date).getTime())) {
      stats.errors.push(`${filePath}: 日期格式无效: ${data.date}`)
    }
  } catch (error) {
    stats.errors.push(`${filePath}: Frontmatter 解析错误: ${error.message}`)
  }
}

/**
 * 验证链接
 */
function validateLinks(content, filePath, relativeMdPath) {
  const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let match

  while ((match = mdLinkRegex.exec(content)) !== null) {
    const [, linkText, linkPath] = match

    // 检查空链接文本
    if (!linkText.trim()) {
      stats.warnings.push(`${filePath}: 链接缺少描述文本: ${linkPath}`)
    }

    // 处理外部链接
    if (linkPath.startsWith('http')) {
      // 将外部链接添加到检查队列
      urlQueue.push({
        url: linkPath,
        filePath,
        lineNum: getLineNumber(content, match.index),
      })
      return
    }

    // 忽略锚点链接
    if (linkPath.startsWith('#')) {
      validateAnchorLink(content, linkPath, filePath)
      return
    }

    // 处理相对路径
    const targetPath =
      linkPath.endsWith('.md') || linkPath.endsWith('.html')
        ? path.resolve(path.dirname(path.join(CONFIG.docsDir, relativeMdPath)), linkPath)
        : null

    if (targetPath && !fs.existsSync(targetPath)) {
      stats.errors.push(`${filePath}: 链接失效: ${linkPath}`)
    }
  }
}

/**
 * 验证锚点链接
 */
function validateAnchorLink(content, anchor, filePath) {
  // 移除开头的 # 符号
  const headingId = anchor.substring(1)

  // 检查文档中是否存在对应的标题ID
  // 这里简化处理，实际上需要考虑VuePress的ID生成规则
  const headingRegex = new RegExp(
    `<h[1-6][^>]*id=["']${headingId}["'][^>]*>|^#+\\s+(.+?)\\s*$`,
    'gm'
  )

  if (!headingRegex.test(content)) {
    stats.warnings.push(`${filePath}: 可能的无效锚点链接: ${anchor}`)
  }
}

/**
 * 验证图片
 */
function validateImages(content, filePath, relativeMdPath) {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  let match

  while ((match = imageRegex.exec(content)) !== null) {
    const [, altText, imagePath] = match

    // 检查alt文本
    if (!altText) {
      stats.warnings.push(`${filePath}: 图片缺少alt文本: ${imagePath}`)
    }

    // 忽略外部图片
    if (imagePath.startsWith('http')) {
      // 将外部图片链接添加到检查队列
      urlQueue.push({
        url: imagePath,
        filePath,
        lineNum: getLineNumber(content, match.index),
        isImage: true,
      })
      return
    }

    // 检查图片是否存在
    const targetPath = path.resolve(
      path.dirname(path.join(CONFIG.docsDir, relativeMdPath)),
      imagePath
    )
    if (!fs.existsSync(targetPath)) {
      stats.errors.push(`${filePath}: 图片不存在: ${imagePath}`)
    }
  }
}

/**
 * 验证标题
 */
function validateHeadings(content, filePath) {
  const lines = content.split('\n')
  const headings = []

  lines.forEach((line, i) => {
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)[0].length
      const text = line.replace(/^#+\s+/, '').trim()

      headings.push({
        level,
        text,
        line: i + 1,
      })

      // 检查标题级别跳跃（如从h1直接到h3）
      if (headings.length > 1) {
        const prevHeading = headings[headings.length - 2]
        if (level > prevHeading.level + 1) {
          stats.warnings.push(
            `${filePath}:${i + 1}: 标题级别跳跃: 从 h${prevHeading.level} 到 h${level}`
          )
        }
      }
    }
  })

  // 检查重复标题
  const headingTexts = {}
  headings.forEach(heading => {
    if (headingTexts[heading.text]) {
      stats.warnings.push(
        `${filePath}: 重复标题 "${heading.text}" 在第 ${headingTexts[heading.text]} 行和第 ${heading.line} 行`
      )
    } else {
      headingTexts[heading.text] = heading.line
    }
  })
}

/**
 * 验证拼写
 */
function validateSpelling(content, filePath) {
  const lines = content.split('\n')

  lines.forEach((line, lineIndex) => {
    // 跳过代码块和frontmatter
    if (line.startsWith('```') || line.startsWith('---')) {
      return
    }

    // 检查英文术语拼写
    Object.keys(SPELLING_CORRECTIONS).forEach(misspelled => {
      const regex = new RegExp(`\\b${misspelled}\\b`, 'i')
      if (regex.test(line)) {
        const correctTerm = SPELLING_CORRECTIONS[misspelled]
        // 如果已经正确使用了大小写，就不需要警告
        if (!line.includes(correctTerm)) {
          stats.warnings.push(
            `${filePath}:${lineIndex + 1}: 可能的拼写错误: "${misspelled}" 应为 "${correctTerm}"`
          )
        }
      }
    })

    // 检查中文术语
    Object.keys(CHINESE_SPELLING_CORRECTIONS).forEach(term => {
      if (line.includes(term)) {
        const suggestion = CHINESE_SPELLING_CORRECTIONS[term]
        if (term !== suggestion && !line.includes(suggestion)) {
          stats.warnings.push(
            `${filePath}:${lineIndex + 1}: 可能的用词建议: "${term}" 建议使用 "${suggestion}"`
          )
        }
      }
    })
  })
}

/**
 * 验证外部链接
 */
async function validateExternalLinks() {
  if (urlQueue.length === 0) {
    return
  }

  console.log(chalk.blue(`\n开始验证 ${urlQueue.length} 个外部链接...`))

  return new Promise(resolve => {
    // 处理队列中的链接
    const processQueue = () => {
      // 如果队列为空且没有活跃请求，则完成
      if (urlQueue.length === 0 && activeRequests === 0) {
        resolve()
        return
      }

      // 如果有空闲插槽且队列中还有链接待检查
      while (activeRequests < CONFIG.maxConcurrentRequests && urlQueue.length > 0) {
        activeRequests++
        const { url, filePath, lineNum, isImage } = urlQueue.shift()
        checkUrl(url, filePath, lineNum, isImage).finally(() => {
          activeRequests--
          processQueue() // 处理下一个
        })
      }
    }

    // 开始处理队列
    processQueue()
  })
}

/**
 * 检查URL是否有效
 */
async function checkUrl(url, filePath, lineNum, isImage = false) {
  stats.linksChecked++

  // 如果已经检查过这个URL，直接使用缓存结果
  if (checkedUrls.has(url)) {
    const result = checkedUrls.get(url)
    if (!result.valid) {
      const errorMsg = `${filePath}:${lineNum}: ${isImage ? '图片' : '链接'} 访问失败: ${url} (${result.statusCode || result.error})`
      stats.errors.push(errorMsg)
    }
    return
  }

  try {
    const parsedUrl = new URL(url)
    const protocol = parsedUrl.protocol === 'https:' ? https : http

    const result = await new Promise((resolve, reject) => {
      const request = protocol.get(
        url,
        {
          timeout: CONFIG.requestTimeout,
          headers: {
            'User-Agent': 'Mozilla/5.0 VuePress-Link-Checker',
          },
        },
        response => {
          // 处理重定向
          if (
            response.statusCode >= 300 &&
            response.statusCode < 400 &&
            response.headers.location
          ) {
            resolve({
              valid: true,
              redirectTo: response.headers.location,
              statusCode: response.statusCode,
            })
          } else if (response.statusCode >= 200 && response.statusCode < 400) {
            resolve({
              valid: true,
              statusCode: response.statusCode,
            })
          } else {
            resolve({
              valid: false,
              statusCode: response.statusCode,
            })
          }
        }
      )

      request.on('error', error => {
        reject(error)
      })

      request.on('timeout', () => {
        request.destroy()
        reject(new Error('请求超时'))
      })
    })

    // 缓存结果
    checkedUrls.set(url, result)

    // 如果链接无效，添加错误
    if (!result.valid) {
      const errorMsg = `${filePath}:${lineNum}: ${isImage ? '图片' : '链接'} 访问失败: ${url} (${result.statusCode || result.error})`
      stats.errors.push(errorMsg)
    }

    // 如果是重定向，添加警告
    if (result.redirectTo) {
      stats.warnings.push(
        `${filePath}:${lineNum}: ${isImage ? '图片' : '链接'} 重定向: ${url} -> ${result.redirectTo}`
      )
    }
  } catch (error) {
    // 缓存错误结果
    checkedUrls.set(url, {
      valid: false,
      error: error.message,
    })

    stats.errors.push(
      `${filePath}:${lineNum}: ${isImage ? '图片' : '链接'} 格式无效: ${url} (${error.message})`
    )
  }
}

/**
 * 获取内容中某个位置所在的行号
 */
function getLineNumber(content, index) {
  const lines = content.substring(0, index).split('\n')
  return lines.length
}

// 执行验证
validateContent().catch(error => {
  console.error(chalk.red('验证过程出错:'), error)
  process.exit(1)
})
