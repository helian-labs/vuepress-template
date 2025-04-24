import type { HeadConfig } from 'vuepress'

export const head: HeadConfig[] = [
  ['link', { rel: 'icon', href: '/images/logo.png' }],
  ['meta', { name: 'author', content: 'VuePress 团队' }],
  ['meta', { name: 'keywords', content: 'vuepress, vue, 文档, 博客' }],
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['link', { rel: 'apple-touch-icon', href: '/images/icons/apple-touch-icon.png' }],
  ['link', { rel: 'mask-icon', href: '/images/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
  ['meta', { name: 'msapplication-TileImage', content: '/images/icons/mstile-150x150.png' }],
  ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
]
