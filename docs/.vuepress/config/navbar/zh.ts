import type { NavbarConfig } from '@vuepress/theme-default'
import { getDirname, path } from '@vuepress/utils'
import fs from 'fs'

const __dirname = getDirname(import.meta.url)

// 动态检测导航菜单 (现在只检测中文)
function generateZhNavbar(): NavbarConfig {
  const navbar: NavbarConfig = [
    { text: '首页', link: '/' }
  ]

  // 检查各主要目录是否存在 (调整路径以适应新的 config 目录结构)
  const docsBaseDir = path.resolve(__dirname, '../../') // 指向 docs 目录
  const dirMap = {
    'guide': '指南',
    'reference': '参考', // 重命名 config 为 reference
    'faq': '常见问题'
  }

  for (const [dir, text] of Object.entries(dirMap)) {
    const dirPath = path.resolve(docsBaseDir, dir)
    if (fs.existsSync(dirPath)) {
      navbar.push({ text, link: `/${dir}/` })
    }
  }

  return navbar
}

export const zh = generateZhNavbar()
