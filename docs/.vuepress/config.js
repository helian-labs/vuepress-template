import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { getDirname, path } from '@vuepress/utils'
import fs from 'fs'

// 动态获取当前目录
const __dirname = getDirname(import.meta.url)

// 动态检测导航菜单
function generateNavbar() {
  const navbar = [
    { text: '首页', link: '/' }
  ]

  // 检查各主要目录是否存在
  const dirMap = {
    'guide': '指南',
    'config': '配置',
    'api': 'API参考',
    'faq': '常见问题'
  }

  for (const [dir, text] of Object.entries(dirMap)) {
    const dirPath = path.resolve(__dirname, '../', dir)
    if (fs.existsSync(dirPath)) {
      navbar.push({ text, link: `/${dir}/` })
    }
  }

  return navbar
}

// 动态生成侧边栏
function generateSidebar() {
  const sidebar = {}

  // 检查各主要目录并生成侧边栏配置
  const dirMap = {
    'guide': '指南',
    'config': '配置',
    'api': 'API参考',
    'faq': '常见问题'
  }

  for (const [dir, text] of Object.entries(dirMap)) {
    const dirPath = path.resolve(__dirname, '../', dir)
    if (!fs.existsSync(dirPath)) continue

    const files = fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.md'))
      .sort((a, b) => {
        // README.md 总是排在第一位
        if (a === 'README.md') return -1
        if (b === 'README.md') return 1
        return a.localeCompare(b)
      })
      .map(file => `/${dir}/${file.replace('.md', '')}`)

    // 将 README.md 路径转换为目录路径
    sidebar[`/${dir}/`] = [
      {
        text,
        children: files.map(file => file.endsWith('/README') ? file.replace('/README', '/') : file)
      }
    ]
  }

  return sidebar
}

// 获取仓库信息
function getRepoInfo() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../package.json'), 'utf8'))
    const repoUrl = packageJson.repository?.url || ''
    let repo = ''

    if (repoUrl) {
      // 提取 GitHub 仓库 URL
      const match = repoUrl.match(/github\.com[\/:]([^\/]+\/[^\/\.]+)/)
      if (match) {
        repo = `https://github.com/${match[1]}`
      } else {
        repo = repoUrl
      }
    } else {
      repo = "https://github.com/yourusername/vuepress-template"
    }

    return repo
  } catch (e) {
    return "https://github.com/yourusername/vuepress-template"
  }
}

export default defineUserConfig({
  // 站点配置
  lang: 'zh-CN',
  title: 'VuePress 模板',
  description: '基于 VuePress 的文档站点模板',
  head: [
    ['link', { rel: 'icon', href: '/images/logo.png' }],
    ['meta', { name: 'author', content: 'VuePress 团队' }],
    ['meta', { name: 'keywords', content: 'vuepress, vue, 文档, 博客' }],
  ],

  // Vite 打包工具配置
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  // 主题配置
  theme: defaultTheme({
    logo: '/images/logo.png',
    repo: getRepoInfo(),
    docsDir: 'docs',

    // 动态生成导航栏
    navbar: generateNavbar(),

    // 动态生成侧边栏
    sidebar: generateSidebar(),

    // 编辑链接
    editLink: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: true,
    lastUpdatedText: '上次更新',
    contributors: true,
    contributorsText: '贡献者',

    // 自定义容器默认标题
    tip: '提示',
    warning: '注意',
    danger: '警告',

    // 404 页面
    notFound: ['页面未找到'],
    backToHome: '返回首页',
  }),

  // Markdown 配置
  markdown: {
    anchor: {
      level: [1, 2, 3, 4, 5, 6],
      // 使用新的格式替代已弃用的 permalink 选项
      permalinkSymbol: '#',
      permalinkPattern: (slug, opts) => `#${slug}`,
      tabIndex: false
    },
    links: { externalAttrs: { target: '_blank', rel: 'noopener noreferrer' } },
    toc: { includeLevel: [1, 2, 3] },
  },
})
