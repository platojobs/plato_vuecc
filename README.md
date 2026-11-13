# Plato 科技官网

面向设备接入、数据观测与现场运维的品牌站点。

技术栈：Vue 3 · Vite 6 · Vue Router 4 · Element Plus（`unplugin-auto-import` + `unplugin-vue-components` 按需引入，`zh-cn` 语言包，主题变量跟随站点深浅色）。

`/showcase` 能力看板集中展示项目交付状态，可作为后续业务页面的参考实现，复制 [ShowcaseView.vue](src/views/ShowcaseView.vue) 后替换数据即可改造。

## 本地运行

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 构建到 dist/
npm run preview  # 预览构建产物
```

开发环境基路径为 `/`，生产构建为 `/plato_vuecc/`。

## 部署

推送 `main` 后由 GitHub Actions 自动发布到 GitHub Pages：<https://platojobs.github.io/plato_vuecc/>。构建时会将 `index.html` 复制为 `404.html`，支持深链接刷新。

## 目录

```
src/
├── assets/styles/   # 基础样式与 Element Plus 主题变量
├── components/      # 导航、搜索、面包屑等公共组件
├── views/           # 页面视图
├── router/          # 路由、滚动行为与页面元信息
└── data/site.js     # 全站文案与内容数据
```
