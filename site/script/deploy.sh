#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e &&

# 生成静态文件
pnpm run docs:build &&

cd docs/.vitepress/dist &&
git init &&
git config user.name lingtingAG &&
git config user.email zsfLgYT@163.com &&
git add -A &&
git commit -m 'deploy' &&
git remote add origin https://github.com/lingtingAG/lingtingAG.github.io.git &&
git push -f -u origin main &&
cd -
