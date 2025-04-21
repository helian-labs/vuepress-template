#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 读取 package.json 获取仓库信息
REPO_URL=$(node -e "try { const pkg = require('./package.json'); console.log(pkg.repository && pkg.repository.url || ''); } catch(e) { console.log(''); }")
REPO_NAME=$(echo $REPO_URL | sed -n 's/.*[\/:]\\([^\\/]*\/[^\\/\.]*\\).*/\\1/p')

# 如果未找到仓库信息，提示用户设置
if [ -z "$REPO_NAME" ]; then
  echo "警告: 未在 package.json 中找到有效的仓库信息。"
  echo "请在使用此部署脚本前，在 package.json 的 repository.url 中设置您的 GitHub 仓库地址。"
  echo "或者取消注释并修改此脚本中的 DEPLOY_REPO 变量。"

  # 用户可以在这里设置固定的部署仓库
  # DEPLOY_REPO=username/repo
fi

# 生成静态文件
echo "生成静态网站文件..."
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
if [ -n "$CUSTOM_DOMAIN" ]; then
  echo "$CUSTOM_DOMAIN" > CNAME
fi

# 初始化 git 仓库并提交更改
echo "准备部署到 GitHub Pages..."
git init
git add -A
git commit -m 'deploy: 更新文档站点'

# 部署到 GitHub Pages
if [ -n "$REPO_NAME" ]; then
  # 如果有设置仓库信息，使用它
  echo "正在部署到 https://github.com/$REPO_NAME..."

  # 判断是部署到 username.github.io 还是普通仓库
  if [[ "$REPO_NAME" =~ [^/]*/[^/]*\.github\.io ]]; then
    # 部署到 username.github.io
    git push -f git@github.com:$REPO_NAME.git main
  else
    # 部署到普通仓库的 gh-pages 分支
    git push -f git@github.com:$REPO_NAME.git main:gh-pages
  fi
elif [ -n "$DEPLOY_REPO" ]; then
  # 使用手动设置的仓库
  echo "正在部署到 https://github.com/$DEPLOY_REPO..."
  git push -f git@github.com:$DEPLOY_REPO.git main:gh-pages
else
  # 如果没有设置仓库信息，提示用户手动设置
  echo "未找到部署仓库信息，请手动设置以下命令中的仓库地址："
  echo "  git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages"
  echo "或在 package.json 中设置 repository.url 字段后重新运行此脚本。"

  # 退出而不实际执行部署
  exit 1
fi

# 回到原目录
cd -

echo "部署完成！"
