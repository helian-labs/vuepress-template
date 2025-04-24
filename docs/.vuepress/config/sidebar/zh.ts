import type { SidebarConfig } from '@vuepress/theme-default'
import { getDirname, path } from '@vuepress/utils'
import fs from 'fs'

const __dirname = getDirname(import.meta.url)

// 动态生成侧边栏 (现在只生成中文)
function generateZhSidebar(): SidebarConfig {
  const sidebar: SidebarConfig = {}
  const docsBaseDir = path.resolve(__dirname, '../../') // 指向 docs 目录

  // 检查各主要目录并生成侧边栏配置 (调整路径以适应新的 config 目录结构)
  const dirMap = {
    'guide': '指南',
    'reference': '参考', // 重命名 config 为 reference
    'faq': '常见问题'
  }

  for (const [dir, text] of Object.entries(dirMap)) {
    const dirPath = path.resolve(docsBaseDir, dir)
    if (!fs.existsSync(dirPath)) continue

    const files = fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md') // 排除 README.md
      .sort((a, b) => a.localeCompare(b)) // 按字母排序
      .map(file => {
        const name = file.replace('.md', '')
        return `/${dir}/${name}`
      })

    // 将 README.md (即 /${dir}/) 作为分组的第一项
    const children = [`/${dir}/`, ...files]

    sidebar[`/${dir}/`] = [
      {
        text,
        collapsible: true, // 允许折叠
        children: children
      }
    ]
  }

  return sidebar
}

export const zh = generateZhSidebar()
