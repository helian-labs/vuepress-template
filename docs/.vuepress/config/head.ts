import type { HeadConfig } from 'vuepress'

/**
 * `<head>` 标签配置
 *
 * @see https://v2.vuepress.vuejs.org/zh/reference/config.html#head
 */
export const head: HeadConfig[] = [
  // 站点图标
  ['link', { rel: 'icon', href: '/images/logo.png' }],

  // SEO 相关
  ['meta', { name: 'author', content: 'VuePress 团队' }], // 作者信息
  ['meta', { name: 'keywords', content: 'vuepress, vue, 文档, 博客' }], // 关键词

  // PWA 相关
  ['meta', { name: 'theme-color', content: '#3eaf7c' }], // 主题色
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }], // iOS Safari 全屏
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }], // iOS Safari 状态栏样式
  ['link', { rel: 'apple-touch-icon', href: '/images/icons/apple-touch-icon.png' }], // Apple Touch Icon
  ['link', { rel: 'mask-icon', href: '/images/icons/safari-pinned-tab.svg', color: '#3eaf7c' }], // Safari Pinned Tab Icon
  ['meta', { name: 'msapplication-TileImage', content: '/images/icons/mstile-150x150.png' }], // Windows Tile Icon
  ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }], // Windows Tile 背景色

  // 添加其他需要的 <head> 标签，例如 Google Analytics 等
  // ['script', { src: 'https://example.com/script.js' }],
]
