// import type { NavGroup } from '@vuepress/theme-default' // 类型推断困难，暂时注释
import { getDirname, path } from 'vuepress/utils'
import fs from 'fs'

const __dirname = getDirname(import.meta.url)

// 定义可能的导航项类型 (类型推断困难，使用 any)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NavbarConfigItem = any

/**
 * 动态生成中文导航栏配置
 * 它会检查 `docs` 目录下预定义的子目录是否存在，如果存在，则添加到导航栏中。
 * @returns {NavbarConfigItem[]} 返回生成的导航栏配置数组
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateZhNavbar(): any[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navbar: any[] = [
    // 始终包含首页链接
    { text: '首页', link: '/' },
  ]

  // 检查各主要目录是否存在 (调整路径以适应新的 config 目录结构)
  const docsBaseDir = path.resolve(__dirname, '../../../') // 指向 docs 目录 (退三级)

  const dirMap = {
    guide: '指南',
    reference: '参考', // 已重命名
    api: 'API 参考', // 添加 API 目录检查
    faq: '常见问题',
  }

  for (const [dir, text] of Object.entries(dirMap)) {
    const dirPath = path.resolve(docsBaseDir, dir)
    const exists = fs.existsSync(dirPath)
    if (exists) {
      navbar.push({ text, link: `/${dir}/` })
    }
  }

  return navbar
}

export const zh = generateZhNavbar()
