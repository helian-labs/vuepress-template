// import type { SidebarConfig } from '@vuepress/theme-default' // 类型推断困难，暂时注释
import { getDirname, path } from 'vuepress/utils'
import fs from 'fs'

const __dirname = getDirname(import.meta.url)

/**
 * 将 kebab-case 或 snake_case 的文件名转换为 Title Case 标题
 * @param {string} filename 文件名 (不含扩展名)
 * @returns {string} 转换后的标题
 */
function formatFilenameAsTitle(filename: string): string {
  return filename
    .split(/[-_]/) // 按连字符或下划线分割
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // 首字母大写，其余小写
    .join(' ')
}

/**
 * 动态生成中文侧边栏配置
 * 它会扫描 `docs` 目录下预定义的子目录，并为每个目录生成对应的侧边栏分组。
 * 每个分组包含目录下的 `README.md` (作为概述链接) 和其他 `.md` 文件。
 * @returns {any} 返回生成的侧边栏配置对象 (类型推断困难，使用 any)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateZhSidebar(): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sidebar: any = {}
  // 计算 docs 目录的绝对路径
  const docsBaseDir = path.resolve(__dirname, '../../../')

  // 定义要生成侧边栏的目录及其对应的分组标题
  // key 是目录名 (相对于 docs 目录)，value 是侧边栏分组显示的文本
  const dirMap: Record<string, string> = {
    guide: '指南',
    reference: '参考',
    api: 'API 参考',
    faq: '常见问题',
  }

  // 遍历 dirMap，为每个存在的目录生成侧边栏配置
  for (const [dir, text] of Object.entries(dirMap)) {
    const dirPath = path.resolve(docsBaseDir, dir)
    // 跳过不存在的目录
    if (!fs.existsSync(dirPath)) continue

    // 读取目录下所有 Markdown 文件 (排除 README.md)
    const files = fs
      .readdirSync(dirPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md')
      .sort((a, b) => a.localeCompare(b)) // 按字母顺序排序
      .map(file => {
        const name = file.replace('.md', '')
        // 将文件名转换为对象格式 { text: '标题', link: '/路径/文件名' }
        return {
          text: formatFilenameAsTitle(name), // 使用辅助函数生成标题
          link: `/${dir}/${name}`,
        }
      })

    // 创建侧边栏子项数组，将 README.md 对应的链接放在首位
    const children = [
      { text: '概述', link: `/${dir}/` }, // README.md 链接 (文本可自定义)
      ...files, // 其他 Markdown 文件链接对象
    ]

    // 为当前目录路径设置侧边栏配置
    sidebar[`/${dir}/`] = [
      {
        text, // 分组标题 (来自 dirMap)
        collapsible: true, // 允许折叠
        children, // 子项数组
      },
    ]
  }

  return sidebar
}

// 导出生成的中文侧边栏配置
export const zh = generateZhSidebar()
