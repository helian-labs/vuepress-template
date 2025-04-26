#!/usr/bin/env node

/**
 * 创建Vue组件的辅助脚本
 * 使用方法: node scripts/create-component.js
 */

import fs from 'fs'
import path from 'path'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const DOCS_DIR = path.resolve('docs')
const COMPONENTS_DIR = path.join(DOCS_DIR, '.vuepress/components')

// 组件模板
const TEMPLATES = {
  basic: `<template>
  <div class="component-container">
    <h2>{{ title }}</h2>
    <div class="component-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '$ComponentName',
  props: {
    title: {
      type: String,
      default: '组件标题'
    }
  }
}
</script>

<style scoped>
.component-container {
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}

.component-content {
  margin-top: 12px;
}
</style>
`,
  functional: `<template>
  <div class="functional-component">
    <div class="component-header">
      <h3>{{ title }}</h3>
      <span v-if="showClose" class="close-btn" @click="$emit('close')">&times;</span>
    </div>
    <div class="component-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="component-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '$ComponentName',
  props: {
    title: {
      type: String,
      required: true
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close']
}
</script>

<style scoped>
.functional-component {
  border: 1px solid var(--c-border);
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.component-header {
  background-color: var(--c-brand-light);
  color: var(--c-white);
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.component-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.close-btn {
  cursor: pointer;
  font-size: 1.4rem;
  line-height: 1;
}

.component-body {
  padding: 16px;
}

.component-footer {
  padding: 12px 16px;
  background-color: var(--c-bg-lighter);
  border-top: 1px solid var(--c-border);
}
</style>
`,
  demo: `<template>
  <div class="demo-component">
    <div class="demo-header">
      <h3>{{ title }}</h3>
      <div class="demo-actions">
        <button v-if="showCode" class="toggle-code" @click="codeVisible = !codeVisible">
          {{ codeVisible ? '隐藏代码' : '查看代码' }}
        </button>
      </div>
    </div>

    <div class="demo-preview">
      <slot></slot>
    </div>

    <div v-if="showCode" class="demo-code" :class="{ 'code-visible': codeVisible }">
      <slot name="code"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '$ComponentName',
  props: {
    title: {
      type: String,
      default: '示例'
    },
    showCode: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      codeVisible: false
    }
  }
}
</script>

<style scoped>
.demo-component {
  border: 1px solid var(--c-border);
  border-radius: 8px;
  overflow: hidden;
  margin: 24px 0;
}

.demo-header {
  padding: 12px 16px;
  background-color: var(--c-bg-lighter);
  border-bottom: 1px solid var(--c-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.demo-preview {
  padding: 20px;
  background-color: var(--c-bg);
}

.demo-code {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: var(--c-bg);
  border-top: 1px solid var(--c-border);
}

.code-visible {
  max-height: 800px;
}

.toggle-code {
  background-color: var(--c-brand);
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}

.toggle-code:hover {
  background-color: var(--c-brand-light);
}
</style>
`,
}

/**
 * 确保目录存在
 */
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

/**
 * 转换组件名格式
 * 例如: my-component -> MyComponent
 */
function toPascalCase(kebabCase) {
  return kebabCase
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

/**
 * 创建新组件
 */
async function createNewComponent() {
  console.log('✨ 创建新的Vue组件')

  // 确保组件目录存在
  ensureDirectoryExists(COMPONENTS_DIR)

  // 1. 输入组件名称
  const componentName = await new Promise(resolve => {
    rl.question('输入组件名称 (使用kebab-case, 如 info-box): ', answer => {
      const name = answer.trim().toLowerCase()
      if (!name || !name.match(/^[a-z0-9]+(-[a-z0-9]+)*$/)) {
        console.log('无效的组件名称。请使用kebab-case格式 (如 info-box)')
        process.exit(1)
      }
      resolve(name)
    })
  })

  // 转换为PascalCase (Vue组件标准命名)
  const pascalCaseName = toPascalCase(componentName)

  // 2. 选择模板类型
  const templateType = await new Promise(resolve => {
    const choices = Object.keys(TEMPLATES)
    rl.question(`选择组件模板类型 (${choices.join('/')}): `, answer => {
      const type = answer.trim().toLowerCase()
      if (!choices.includes(type)) {
        console.log(`无效的模板类型。请选择: ${choices.join(', ')}`)
        process.exit(1)
      }
      resolve(type)
    })
  })

  // 构建文件路径
  const filePath = path.join(COMPONENTS_DIR, `${pascalCaseName}.vue`)

  // 检查文件是否已存在
  if (fs.existsSync(filePath)) {
    const overwrite = await new Promise(resolve => {
      rl.question('组件已存在，是否覆盖? (y/n): ', answer => {
        resolve(answer.trim().toLowerCase() === 'y')
      })
    })

    if (!overwrite) {
      console.log('操作已取消')
      rl.close()
      return
    }
  }

  // 处理模板内容
  let content = TEMPLATES[templateType]
  content = content.replace(/\$ComponentName/g, pascalCaseName)

  // 写入文件
  fs.writeFileSync(filePath, content)
  console.log(`✅ 成功创建组件: ${filePath}`)

  // 提示如何注册组件
  console.log('\n要使用此组件，请确保在 .vuepress/config.js 中注册它:')
  console.log(`
在 config.js 文件中找到 plugins 配置，添加或更新 register-components 插件:

import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  // ...其他配置
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
}

然后在Markdown中使用:

<${pascalCaseName} title="自定义标题">
  组件内容
</${pascalCaseName}>
`)

  rl.close()
}

// 启动流程
createNewComponent().catch(err => {
  console.error('发生错误:', err)
  process.exit(1)
})
