import type { PluginConfig } from 'vuepress'
import { getDirname, path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { searchPlugin } from '@vuepress/plugin-search'
// import { docsearchPlugin } from '@vuepress/plugin-docsearch' // 如果需要 Algolia 搜索，取消注释并配置

const __dirname = getDirname(import.meta.url)

/**
 * 插件配置
 *
 * @see https://v2.vuepress.vuejs.org/zh/reference/plugin/register-components.html
 * @see https://v2.vuepress.vuejs.org/zh/reference/plugin/medium-zoom.html
 * @see https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa.html
 * @see https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html
 * @see https://v2.vuepress.vuejs.org/zh/reference/plugin/docsearch.html
 */
export const plugins: PluginConfig = [
  /**
   * 自动注册 `.vuepress/components` 目录下的 Vue 组件
   */
  registerComponentsPlugin({
    // componentsDir: path.resolve(__dirname, '../components'), // 默认路径，可省略
  }),

  /**
   * 为页面图片提供缩放功能 (Medium Zoom)
   */
  mediumZoomPlugin({
    selector: ':not(a) > img:not(.no-zoom)', // 应用于非链接中、没有 .no-zoom class 的图片
    zoomOptions: {
      margin: 16,
      background: 'rgba(255, 255, 255, 0.9)', // 缩放背景色
      scrollOffset: 40,
    },
  }),

  /**
   * 提供 PWA (Progressive Web App) 支持
   */
  pwaPlugin({
    // 以下选项可能在某些 rc 版本中存在类型问题，升级后可尝试取消注释
    // skipWaiting: true, // 立即激活新的 Service Worker
    // cachePic: true, // 缓存图片资源
    // popupComponent: 'PwaPopup', // 自定义"发现新内容"弹窗组件名
    manifest: {
      // Web App Manifest 配置
      // @see https://developer.mozilla.org/zh-CN/docs/Web/Manifest
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

  /**
   * 提供基于文档内容的内置搜索功能
   */
  searchPlugin({
    locales: {
      '/': {
        placeholder: '搜索文档',
      },
    },
    maxSuggestions: 10, // 最大建议数量
    isSearchable: page => page.path !== '/', // 排除首页不被搜索
    // getExtraFields: (page) => [], // 额外搜索字段
    // hotKeys: ['s', '/'], // 激活搜索框的热键
  }),

  /**
   * （可选）使用 Algolia DocSearch 替代内置搜索
   * 需要在 Algolia 申请服务并配置
   */
  // docsearchPlugin({
  //   appId: 'YOUR_APP_ID',
  //   apiKey: 'YOUR_API_KEY',
  //   indexName: 'YOUR_INDEX_NAME',
  //   locales: { '/': { placeholder: '搜索文档' } },
  // }),
]
