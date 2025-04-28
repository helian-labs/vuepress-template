import { execSync } from 'child_process'

import chalk from 'chalk'

// 检查文档格式
function checkFormat() {
  console.log(chalk.blue('Checking document format...'))
  try {
    execSync('pnpm format', { stdio: 'inherit' })
    console.log(chalk.green('✓ Document format check passed'))
  } catch (error) {
    console.error(chalk.red('✗ Document format check failed'))
    process.exit(1)
  }
}

// 检查链接有效性
function checkLinks() {
  console.log(chalk.blue('Checking document links...'))
  try {
    execSync('pnpm validate:content', { stdio: 'inherit' })
    console.log(chalk.green('✓ Document links check passed'))
  } catch (error) {
    console.error(chalk.red('✗ Document links check failed'))
    process.exit(1)
  }
}

// 检查构建
function checkBuild() {
  console.log(chalk.blue('Checking document build...'))
  try {
    execSync('pnpm docs:build', { stdio: 'inherit' })
    console.log(chalk.green('✓ Document build check passed'))
  } catch (error) {
    console.error(chalk.red('✗ Document build check failed'))
    process.exit(1)
  }
}

// 主函数
function main() {
  console.log(chalk.yellow('Starting document checks...\n'))

  checkFormat()
  checkLinks()
  checkBuild()

  console.log(chalk.green('\nAll document checks passed!'))
}

main()
