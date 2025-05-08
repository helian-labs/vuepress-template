import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { getDirname, path } from 'vuepress/utils'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { searchPlugin } from '@vuepress/plugin-search'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import fs from 'fs'

// 动态获取当前目录
const __dirname = getDirname(import.meta.url)

// 动态检测导航菜单
function generateNavbar() {
  const navbar = [{ text: '首页', link: '/' }]

  // 检查各主要目录是否存在
  const dirMap = {
    guide: '指南',
    config: '配置',
    api: 'API参考',
    faq: '常见问题',
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
    guide: '指南',
    config: '配置',
    api: 'API参考',
    faq: '常见问题',
  }

  for (const [dir, text] of Object.entries(dirMap)) {
    const dirPath = path.resolve(__dirname, '../', dir)
    if (!fs.existsSync(dirPath)) continue

    const files = fs
      .readdirSync(dirPath)
      .filter(file => file.endsWith('.md'))
      .sort((a, b) => {
        // README.md 总是排在第一位
        if (a === 'README.md') return -1
        if (b === 'README.md') return 1
        return a.localeCompare(b)
      })
      .map(file => {
        const name = file.replace('.md', '')
        // 将 README.md 转换为目录路径
        return name === 'README' ? `/${dir}/` : `/${dir}/${name}`
      })

    sidebar[`/${dir}/`] = [
      {
        text,
        children: files,
      },
    ]
  }

  return sidebar
}

// 获取仓库信息
function getRepoInfo() {
  try {
    const packageJson = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../../../package.json'), 'utf8')
    )
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
      repo = 'https://github.com/yourusername/vuepress-template'
    }

    return repo
  } catch (e) {
    return 'https://github.com/yourusername/vuepress-template'
  }
}

export default defineUserConfig({
  // 基础配置
  base: '/',
  lang: 'zh-CN',
  title: 'VuePress 模板',
  description: '基于 VuePress 的文档模板',

  // 多语言配置
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'VuePress 模板',
      description: '基于 VuePress 的文档模板',
    },
    '/en/': {
      lang: 'en-US',
      title: 'VuePress Template',
      description: 'Documentation template based on VuePress',
    },
  },

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
      tabIndex: false,
    },
    links: { externalAttrs: { target: '_blank', rel: 'noopener noreferrer' } },
    toc: { includeLevel: [1, 2, 3] },
    code: {
      // 添加代码块行号
      lineNumbers: true,
      // 高亮显示当前行
      highlightLines: true,
      // 显示复制按钮
      copyCode: {
        selector: 'div[class*="language-"]',
        successText: '已复制!',
        failureText: '复制失败!',
      },
    },
  },

  // 插件配置
  plugins: [
    // 组件自动注册插件
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),

    // 图片缩放插件
    mediumZoomPlugin({
      // 选择器
      selector: ':not(a) > img:not(.no-zoom)',
      // 缩放选项
      zoomOptions: {
        margin: 16,
        background: '#fff',
        scrollOffset: 40,
      },
    }),

    // PWA 插件
    pwaPlugin({
      // 是否注册Service Worker
      skipWaiting: true,
      // 缓存控制
      cachePic: true,
      // 刷新内容提示
      popupComponent: 'PwaPopup',
      // manifest.webmanifest
      manifest: {
        name: 'VuePress 文档模板',
        short_name: 'VuePressDoc',
        description: '基于 VuePress 的文档站点模板',
        theme_color: '#3eaf7c',
        background_color: '#ffffff',
        icons: [
          {
            src: '/images/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),

    // 搜索插件配置 (内置搜索)
    searchPlugin({
      // 本地搜索选项
      locales: {
        '/': {
          placeholder: '搜索文档',
        },
        '/en/': {
          placeholder: 'Search docs',
        },
      },
      // 搜索结果最大条目
      maxSuggestions: 10,
      // 仅匹配标题
      getExtraFields: () => [],
      // 显示搜索框热键提示
      hotKeys: ['s', '/'],
      // 搜索索引选项
      isSearchable: page => page.path !== '/',
    }),

    // Algolia DocSearch 插件 (需要自行申请和配置)
    // 注释掉了，如果需要使用取消注释并配置自己的appId、apiKey和indexName
    /*
    docsearchPlugin({
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>',
      appId: '<APP_ID>',
      locales: {
        '/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索',
              buttonAriaLabel: '搜索',
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消',
              },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除',
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接',
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者',
              },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈',
              },
            },
          },
        },
      },
    }),
    */
  ],
})
