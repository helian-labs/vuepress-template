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
    'plugin:prettier/recommended',
  ],
  plugins: [
    'vue',
    '@typescript-eslint',
    'import',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
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
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    }],
    '@typescript-eslint/no-explicit-any': 'warn', // 允许 any 但警告
    '@typescript-eslint/ban-ts-comment': ['warn', {
      'ts-ignore': 'allow-with-description',
      'ts-expect-error': 'allow-with-description',
    }],
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
    'import/order': ['warn', {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'object',
        'type',
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    }],
    'import/no-unresolved': 'error',
    'import/no-duplicates': 'error',
    'import/no-cycle': 'error',
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
        '*.mjs',
      ],
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
