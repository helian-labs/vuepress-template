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
    'prettier', // 使用 Prettier 接管格式化规则
  ],
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    // === ESLint Core Rules ===
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off', // 由 @typescript-eslint/no-unused-vars 处理
    'prefer-const': 'warn',

    // === TypeScript Rules ===
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // 未使用的变量警告（忽略下划线开头）
    '@typescript-eslint/no-explicit-any': 'warn', // 允许 any 但警告
    '@typescript-eslint/ban-ts-comment': ['warn', { 'ts-ignore': 'allow-with-description' }], // 允许带描述的 @ts-ignore

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

    // === Potential Problems / Best Practices (Customize as needed) ===
    // 'eqeqeq': ['error', 'always', { null: 'ignore' }],
    // 'no-implicit-coercion': 'error',
  },
  overrides: [
    {
      files: ['*.js', '*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off', // 允许在 JS/CJS 文件中使用 require
      },
    },
    {
      // 在配置文件中放宽一些规则
      files: [
        'docs/.vuepress/**/*.ts',
        '*.config.ts',
        '*.config.js',
        '*.cjs',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
})
