import type { PluginConfig } from 'vuepress'
import { getDirname, path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { searchPlugin } from '@vuepress/plugin-search'
// import { docsearchPlugin } from '@vuepress/plugin-docsearch' // 如果使用 Algolia 搜索

const __dirname = getDirname(import.meta.url)

export const plugins: PluginConfig = [
  // 组件自动注册插件
  registerComponentsPlugin({
    // 调整路径以适应新的 config 目录结构
    componentsDir: path.resolve(__dirname, '../components'),
  }),

  // 图片缩放插件
  mediumZoomPlugin({
    selector: ':not(a) > img:not(.no-zoom)',
    zoomOptions: {
      margin: 16,
      background: 'rgba(255, 255, 255, 0.9)', // 使用带透明度的背景
      scrollOffset: 40,
    },
  }),

  // PWA 插件 (选项暂时注释)
  pwaPlugin({
    // skipWaiting: true,
    // cachePic: true,
    // popupComponent: 'PwaPopup',
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
    locales: {
      '/': {
        placeholder: '搜索文档',
      },
    },
    maxSuggestions: 10,
    isSearchable: (page) => page.path !== '/',
  }),

  // DocSearch 插件 (如果使用 Algolia)
  // docsearchPlugin({
  //   appId: 'YOUR_APP_ID',
  //   apiKey: 'YOUR_API_KEY',
  //   indexName: 'YOUR_INDEX_NAME',
  //   locales: {
  //     '/': {
  //       placeholder: '搜索文档',
  //     },
  //   },
  // }),
]
