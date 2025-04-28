// 使用 .cjs 扩展名以避免与 package.json 中的 "type": "module" 冲突
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true, // 支持 ES2022 语法
  },
  parser: 'vue-eslint-parser', // 指定 Vue 解析器
  parserOptions: {
    parser: '@typescript-eslint/parser', // 在 Vue 文件中解析 <script> 的 TypeScript
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // 如果使用 JSX
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', // Vue 3 推荐规则
    'plugin:@typescript-eslint/recommended', // TypeScript 推荐规则
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:node/recommended', // 添加 Node.js 推荐规则
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', '@typescript-eslint', 'import', 'node', 'prettier'], // 添加 node 插件
  settings: {
    'import/resolver': {
      typescript: true, // 恢复为简单的 true
      node: true,
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] }, // 允许 ES Modules 语法
    ],
    'node/no-missing-import': 'off', // 关闭此规则，让 import/no-unresolved 处理
  },
  rules: {
    // === ESLint Core Rules ===
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off', // 由 @typescript-eslint/no-unused-vars 处理
    'prefer-const': 'warn',
    'no-duplicate-imports': 'error',
    'no-var': 'error',

    // === TypeScript Rules ===
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn', // 允许 any 但警告
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-ignore': 'allow-with-description',
        'ts-expect-error': 'allow-with-description',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',

    // === Vue Rules ===
    'vue/multi-word-component-names': 'off', // 在 .vuepress/components 中可能需要单文件组件
    'vue/no-v-html': 'off', // VuePress 中常用 v-html
    'vue/require-default-prop': 'off',
    'vue/attribute-hyphenation': ['warn', 'always'],
    'vue/v-on-event-hyphenation': ['warn', 'always'],
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/component-name-in-template-casing': ['warn', 'PascalCase'],
    'vue/component-definition-name-casing': ['warn', 'PascalCase'],
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-model-argument': 'off',

    // === Import Rules ===
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': ['error', { ignore: ['^node:', '^@vuepress/'] }], // 全局忽略 node: 和 @vuepress/ 开头的模块
    'import/no-duplicates': 'error',
    'import/no-cycle': 'error',
  },
  overrides: [
    {
      // 针对 scripts 目录下的文件
      files: ['scripts/**/*.js'],
      env: {
        node: true, // 明确为脚本文件启用 Node.js 环境
        es2022: true,
      },
      parserOptions: {
        sourceType: 'module', // 假设脚本也是 ES Module
      },
      rules: {
        'node/no-unpublished-import': 'off', // 允许在脚本中使用 devDependencies
        'no-process-exit': 'off', // 允许在脚本中使用 process.exit
        'import/no-unresolved': [
          'error',
          {
            // 在 scripts 目录中，明确忽略这些模块
            ignore: [
              '^node:', // 继续忽略 node 内置模块
              'fs',
              'path',
              'url',
              'chalk',
              'glob',
              'gray-matter',
              'child_process', // 添加 child_process
              'http', // 添加 http
              'https', // 添加 https
            ],
          },
        ],
      },
    },
    {
      // 允许 .eslintrc.cjs 本身使用 require
      files: ['.eslintrc.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'node/no-unpublished-require': 'off',
      },
    },
    {
      // 针对 analyze-build.js 使用 CommonJS
      files: ['scripts/analyze-build.js'],
      parserOptions: {
        sourceType: 'script', // 设置为 CommonJS
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off', // 允许 require
        'node/no-unpublished-require': 'off', // 允许 require devDependencies
      },
    },
    {
      // 其他 JS 文件保持 ES Module
      files: ['*.js'],
      excludedFiles: ['scripts/analyze-build.js'], // 排除 analyze-build.js
      rules: {
        // 根据需要为其他 JS 文件添加规则
      },
    },
    {
      // 在配置文件中放宽一些规则
      files: ['docs/.vuepress/**/*.ts', '*.config.ts', '*.config.js', '*.cjs', '*.mjs'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['*.vue'],
      rules: {
        'import/no-unresolved': 'off',
      },
    },
  ],
})
