import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { getDirname, path } from '@vuepress/utils'
import fs from 'fs'

// 导入配置模块
import { head } from './config/head.js' // 注意：导入时使用 .js 扩展名
import { plugins } from './config/plugins.js' // 注意：导入时使用 .js 扩展名
import { zh as zhNavbar } from './config/navbar/zh.js' // 注意：导入时使用 .js 扩展名
import { zh as zhSidebar } from './config/sidebar/zh.js' // 注意：导入时使用 .js 扩展名

const __dirname = getDirname(import.meta.url)

// 获取仓库信息 (移到这里，因为它只在 themeConfig 中使用)
function getRepoInfo() {
  try {
    // 调整路径以适应新的 config 目录结构
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8'))
    const repoUrl = packageJson.repository?.url || ''
    let repo = ''

    if (repoUrl) {
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
    console.error('Error reading package.json for repo info:', e)
    return "https://github.com/yourusername/vuepress-template"
  }
}

export default defineUserConfig({
  // 站点配置
  lang: 'zh-CN',
  title: 'VuePress 模板',
  description: '基于 VuePress 的文档站点模板',
  head: head, // 使用导入的 head 配置

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

    // 多语言支持配置
    locales: {
      '/': { // 根路径使用中文配置
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',

        // 导航栏
        navbar: zhNavbar, // 使用导入的中文导航栏

        // 侧边栏
        sidebar: zhSidebar, // 使用导入的中文侧边栏
        sidebarDepth: 2, // 侧边栏显示深度

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
      },
      // 如果需要添加其他语言，例如英文:
      // '/en/': {
      //   selectLanguageName: 'English',
      //   navbar: enNavbar, // 需要创建 enNavbar 配置
      //   sidebar: enSidebar, // 需要创建 enSidebar 配置
      //   editLinkText: 'Edit this page on GitHub',
      //   lastUpdatedText: 'Last Updated',
      //   contributorsText: 'Contributors',
      //   tip: 'TIP',
      //   warning: 'NOTE',
      //   danger: 'WARNING',
      //   notFound: ['Page Not Found'],
      //   backToHome: 'Back to Home',
      // }
    },

    // 跨语言配置项（如果不在 locales 中单独设置）
    // themePlugins: {
    //   // 关闭git插件，如果 lastUpdated 和 contributors 已在 locales 中配置
    //   git: false,
    // },

  }),

  // Markdown 配置 (只保留必要的)
  markdown: {
    anchor: {
      level: [1, 2, 3, 4, 5, 6],
    },
    links: { externalAttrs: { target: '_blank', rel: 'noopener noreferrer' } },
    importCode: {
      handleImportPath: (str) =>
        str.replace(/^@vuepress/, path.resolve(__dirname, '../../')),
    },
  },

  // 插件配置
  plugins: plugins, // 使用导入的 plugins 配置

  // 其他配置
  alias: {
    // 自定义 `@theme` 别名指向你的自定义主题（如果创建了）
    // '@theme/HomeFooter.vue': path.resolve(__dirname, './components/layout/MyHomeFooter.vue'),
  },
})
