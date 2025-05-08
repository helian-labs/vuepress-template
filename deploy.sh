#!/usr/bin/env sh

# 设置错误处理
set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 日志函数
log() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
  echo -e "${RED}[ERROR]${NC} $1"
  exit 1
}

# 清理函数
cleanup() {
  if [ -d "docs/.vuepress/dist" ]; then
    log "清理构建目录..."
    rm -rf docs/.vuepress/dist
  fi
}

# 注册清理函数
trap cleanup EXIT

# 检查必要的命令
check_commands() {
  log "检查必要的命令..."
  for cmd in node npm git; do
    if ! command -v $cmd &> /dev/null; then
      error "$cmd 未安装，请先安装 $cmd"
    fi
  done
}

# 读取 package.json 获取仓库信息
get_repo_info() {
  log "读取仓库信息..."
  REPO_URL=$(node -e "try { const pkg = require('./package.json'); console.log(pkg.repository && pkg.repository.url || ''); } catch(e) { console.log(''); }")
  REPO_NAME=$(echo $REPO_URL | sed -n 's/.*[\/:]\([^\/]*\/[^\/\.]*\).*/\1/p')

  if [ -z "$REPO_NAME" ]; then
    warn "未在 package.json 中找到有效的仓库信息"
    warn "请在使用此部署脚本前，在 package.json 的 repository.url 中设置您的 GitHub 仓库地址"
    warn "或者取消注释并修改此脚本中的 DEPLOY_REPO 变量"
    # DEPLOY_REPO=username/repo
  fi
}

# 构建文档
build_docs() {
  log "开始构建文档..."
  if ! npm run docs:build; then
    error "文档构建失败"
  fi
}

# 部署到 GitHub Pages
deploy_to_github() {
  log "准备部署到 GitHub Pages..."
  cd docs/.vuepress/dist

  # 如果是发布到自定义域名
  if [ -n "$CUSTOM_DOMAIN" ]; then
    log "设置自定义域名: $CUSTOM_DOMAIN"
    echo "$CUSTOM_DOMAIN" > CNAME
  fi

  # 初始化 git 仓库并提交更改
  git init
  git add -A
  git commit -m 'deploy: 更新文档站点'

  if [ -n "$REPO_NAME" ]; then
    log "正在部署到 https://github.com/$REPO_NAME..."
    if [[ "$REPO_NAME" =~ [^/]*/[^/]*\.github\.io ]]; then
      git push -f git@github.com:$REPO_NAME.git main
    else
      git push -f git@github.com:$REPO_NAME.git main:gh-pages
    fi
  elif [ -n "$DEPLOY_REPO" ]; then
    log "正在部署到 https://github.com/$DEPLOY_REPO..."
    git push -f git@github.com:$DEPLOY_REPO.git main:gh-pages
  else
    error "未找到部署仓库信息，请手动设置以下命令中的仓库地址：
  git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages
或在 package.json 中设置 repository.url 字段后重新运行此脚本"
  fi

  cd -
}

# 主函数
main() {
  check_commands
  get_repo_info
  build_docs
  deploy_to_github
  log "部署完成！"
}

# 执行主函数
main
