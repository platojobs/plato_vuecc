# Plato科技官网前端工程

Plato科技品牌站点，围绕设备接入、数据观测与现场运维三条主线组织内容。站点采用纯前端实现，包含首页、产品与解决方案、行业应用、洞察、常见问题、关于我们、联系我们与 404 页面，并提供站内搜索、深浅色主题、面包屑与滚动渐显等站点级能力，通过 GitHub Pages 自动发布。

## 技术栈

- Vue 3（Composition API + `<script setup>`）
- Vite 6
- Vue Router 4（HTML5 History 模式）
- 原生 CSS（CSS 变量主题 + 组件 scoped 样式）
- 无 UI 框架、无后端、无外部字体与图片依赖

## 快速开始

环境要求：Node.js 18+（推荐 20 及以上）。

```bash
npm install
npm run dev      # 开发环境，默认 http://localhost:5173
npm run build    # 生产构建，产物输出到 dist/
npm run preview  # 本地预览构建产物
```

生产构建的静态资源基路径为 `/plato_vuecc/`，对应 GitHub Pages 的部署位置；`npm run dev` 仍以根路径运行，方便本地开发。`npm run preview` 会按构建产物中的基路径提供服务，访问地址为 `http://localhost:4173/plato_vuecc/`。

## 页面与路由

| 路由 | 页面 | 说明 |
| --- | --- | --- |
| `/` | 首页 | Hero、能力模型、产品概览、行业场景、能力指标、推进方法、CTA |
| `/products` | 产品与解决方案 | 分类筛选、产品卡片、三组组合方案 |
| `/products/:slug` | 产品详情 | 动态路由，展示简介、能力点、规格概览、典型场景与相关模块 |
| `/industries` | 行业应用 | 六类行业场景，含问题、处理思路、预期改善与实施路径 |
| `/insights` | 洞察 | 按主题筛选的实践笔记列表 |
| `/insights/:slug` | 洞察详情 | 动态路由，展示文章正文、要点、相关阅读与 CTA |
| `/faq` | 常见问题 | 四类分组折叠问答，支持通过锚点直接展开 |
| `/about` | 关于我们 | 团队叙述、工作原则、推进节奏、团队构成、工作边界 |
| `/contact` | 联系我们 | 沟通流程、咨询方向、前端校验表单、草稿恢复与提交成功状态 |
| `/:pathMatch(.*)*` | 404 | 兜底页面，提供返回首页、产品列表与站内搜索入口 |

全局布局由顶部固定导航与页脚组成。导航在桌面端提供产品与行业二级下拉，在移动端以折叠菜单呈现，并保持键盘可访问。顶部同时提供站内搜索（`Ctrl/Command + K`）与深浅色主题切换，移动端保留独立搜索入口。

## 目录结构

```
vueGw/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages 自动部署工作流
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── favicon.svg              # 站点图标
│   ├── robots.txt               # 搜索引擎抓取规则
│   ├── sitemap.xml              # 站点地图（含子路径）
│   ├── share.svg                # 分享图源文件
│   └── share.png                # 1200×630 分享图
├── src/
│   ├── main.js                  # 应用入口，注册路由与 v-reveal 指令
│   ├── App.vue                  # 全局布局外壳、路由过渡与加载骨架
│   ├── assets/styles/base.css   # 设计变量、深色主题、重置样式与通用类
│   ├── components/
│   │   ├── AppHeader.vue        # 顶部导航、二级下拉、搜索与主题入口
│   │   ├── AppFooter.vue        # 页脚
│   │   ├── BackToTop.vue        # 返回顶部按钮
│   │   ├── BrandMark.vue        # 品牌标识
│   │   ├── Breadcrumbs.vue      # 面包屑导航
│   │   ├── CtaBanner.vue        # 通用 CTA 区块
│   │   ├── PlaceholderGraphic.vue # CSS 渐变 + SVG 场景图形
│   │   ├── ProductCard.vue      # 产品卡片
│   │   ├── SearchDialog.vue     # 站内搜索弹层与键盘交互
│   │   ├── SectionHead.vue      # 区块标题组合
│   │   └── ThemeToggle.vue      # 深浅色切换
│   ├── composables/
│   │   └── useTheme.js          # 主题偏好读取、切换与持久化
│   ├── data/
│   │   └── site.js              # 全站文案、洞察、FAQ 与搜索索引
│   ├── directives/
│   │   └── reveal.js            # 滚动进入动画指令
│   ├── router/
│   │   └── index.js             # 路由表、滚动行为与页面元信息同步
│   └── views/
│       ├── HomeView.vue
│       ├── ProductsView.vue
│       ├── ProductDetailView.vue
│       ├── IndustriesView.vue
│       ├── InsightsView.vue
│       ├── InsightDetailView.vue
│       ├── FaqView.vue
│       ├── AboutView.vue
│       ├── ContactView.vue
│       └── NotFoundView.vue
└── README.md
```

## 内容维护

公司叙述、导航、产品、方案、行业场景、能力指标、联系方式与页脚文案集中存放在 [src/data/site.js](src/data/site.js)，页面只负责呈现结构。修改内容时：

- 调整产品：编辑 `products` 数组，`slug` 会自动匹配 `/products/:slug` 详情路由，无需改动路由表。
- 调整行业：编辑 `industries` 数组，页面锚点由 `id` 生成，顶部锚点导航同步更新。
- 调整导航：编辑 `nav` 数组；产品与行业两个栏目会自动生成二级菜单。
- 调整指标：编辑 `stats` 与 `statsNote`，首页指标区会按数组顺序渲染。
- 新增洞察：编辑 `insights` 数组，`slug` 自动匹配 `/insights/:slug`；`searchIndex` 会同步收录标题、摘要与标签。
- 调整常见问题：编辑 `faqGroups` 数组，页面分组、锚点与搜索索引随之更新。
- 更新站点地图：新增静态页面或内容后，同步维护 `public/sitemap.xml`。

页面级的小标题、表单字段标签与校验提示属于界面文案，直接写在对应视图中。

## 构建与部署

站点通过 GitHub Actions 部署到 GitHub Pages，工作流文件为 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)。

- 触发条件：推送到 `main` 分支，或在 Actions 页面手动触发 `workflow_dispatch`。
- 权限：`contents: read`、`pages: write`、`id-token: write`；使用 `concurrency` 串行化部署，避免并发发布。
- 构建环境：Node.js 22，执行 `npm ci` 与 `npm run build`。
- SPA 兜底：构建完成后将 `dist/index.html` 复制为 `dist/404.html`，使 `/products/xxx`、`/insights/xxx` 等深链接在刷新时仍能进入应用并由前端路由接管。
- SEO 资源：`robots.txt`、`sitemap.xml` 与分享图随构建产物一并发布，页面标题、描述、Open Graph 与 Twitter Card 由路由在切换时同步更新。
- 部署地址：<https://platojobs.github.io/plato_vuecc/>。

由于站点使用 History 路由并部署在子路径下，`vite.config.js` 中构建基路径设为 `/plato_vuecc/`，路由初始化使用 `createWebHistory(import.meta.env.BASE_URL)`。若仓库或 Pages 路径变更，需要同步调整基路径。

## 可访问性与响应式

- 导航下拉支持悬停、点击与键盘展开，点击页面其他区域、按 `Esc` 或跳转后关闭；`Esc` 关闭后焦点回到触发按钮。
- 站内搜索支持输入联想、`↑`/`↓` 选择、`Enter` 打开、`Esc` 关闭，并在无结果时提供继续浏览入口。
- 主题默认跟随系统 `prefers-color-scheme`，也可手动切换；偏好保存在 `localStorage`，首屏通过内联脚本避免闪白。
- 所有交互元素保留可见焦点样式，移动端菜单与二级分组通过 `aria-expanded` 描述展开状态。
- 页面在 900px 断点切换桌面与移动布局，卡片、筛选与表单控件均做了小屏适配。
- 滚动进入动画、页面过渡与返回顶部平滑滚动均遵循 `prefers-reduced-motion`，系统开启减少动态效果时自动关闭。

## 后续扩展

1. **接入表单服务**：在 `ContactView.vue` 的 `handleSubmit` 中把本地提交替换为真实请求，并补充错误与重试状态。
2. **新增页面**：在 `src/router/index.js` 注册路由，并在 `src/views` 下新建视图；导航项由 `site.js` 的 `nav` 驱动。
3. **视觉扩展**：主题色、圆角、阴影与字体栈在 `src/assets/styles/base.css` 的 `:root` 变量中统一调整。
4. **内容运营**：如需多人维护，可将 `site.js` 的数据迁移到 CMS 或接口层，页面组件无需改动。
5. **部署扩展**：构建产物为纯静态文件，也可部署到其他支持 SPA 回退的静态托管平台。
