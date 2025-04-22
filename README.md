# Plato科技官网前端工程

Plato科技品牌站点，围绕设备接入、数据观测与现场运维三条主线组织内容。站点采用纯前端实现，包含首页、产品与解决方案、行业应用、关于我们、联系我们与 404 页面，并通过 GitHub Pages 自动发布。

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
| `/about` | 关于我们 | 团队叙述、工作原则、推进节奏、团队构成、工作边界 |
| `/contact` | 联系我们 | 沟通流程、咨询方向、前端校验表单与提交成功状态 |
| `/:pathMatch(.*)*` | 404 | 兜底页面，提供返回首页与产品列表入口 |

全局布局由顶部固定导航与页脚组成。导航在桌面端提供产品与行业二级下拉，在移动端以折叠菜单呈现，并保持键盘可访问。

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
│   └── favicon.svg              # 站点图标
├── src/
│   ├── main.js                  # 应用入口，注册路由与 v-reveal 指令
│   ├── App.vue                  # 全局布局外壳
│   ├── assets/styles/base.css   # 设计变量、重置样式与通用类
│   ├── components/
│   │   ├── AppHeader.vue        # 顶部导航、二级下拉与移动端菜单
│   │   ├── AppFooter.vue        # 页脚
│   │   ├── BrandMark.vue        # 品牌标识
│   │   ├── CtaBanner.vue        # 通用 CTA 区块
│   │   ├── PlaceholderGraphic.vue # CSS 渐变 + SVG 场景图形
│   │   ├── ProductCard.vue      # 产品卡片
│   │   └── SectionHead.vue      # 区块标题组合
│   ├── data/
│   │   └── site.js              # 全站文案与结构化数据
│   ├── directives/
│   │   └── reveal.js            # 滚动进入动画指令
│   ├── router/
│   │   └── index.js             # 路由表、滚动行为与标题同步
│   └── views/
│       ├── HomeView.vue
│       ├── ProductsView.vue
│       ├── ProductDetailView.vue
│       ├── IndustriesView.vue
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

页面级的小标题、表单字段标签与校验提示属于界面文案，直接写在对应视图中。

## 构建与部署

站点通过 GitHub Actions 部署到 GitHub Pages，工作流文件为 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)。

- 触发条件：推送到 `main` 分支，或在 Actions 页面手动触发 `workflow_dispatch`。
- 权限：`contents: read`、`pages: write`、`id-token: write`；使用 `concurrency` 串行化部署，避免并发发布。
- 构建环境：Node.js 22，执行 `npm ci` 与 `npm run build`。
- SPA 兜底：构建完成后将 `dist/index.html` 复制为 `dist/404.html`，使 `/products/xxx` 等深链接在刷新时仍能进入应用并由前端路由接管。
- 部署地址：<https://platojobs.github.io/plato_vuecc/>。

由于站点使用 History 路由并部署在子路径下，`vite.config.js` 中构建基路径设为 `/plato_vuecc/`，路由初始化使用 `createWebHistory(import.meta.env.BASE_URL)`。若仓库或 Pages 路径变更，需要同步调整基路径。

## 可访问性与响应式

- 导航下拉支持悬停与点击展开，点击页面其他区域、按 `Esc` 或跳转后关闭；`Esc` 关闭后焦点回到触发按钮。
- 所有交互元素保留可见焦点样式，移动端菜单与二级分组通过 `aria-expanded` 描述展开状态。
- 页面在 900px 断点切换桌面与移动布局，卡片、筛选与表单控件均做了小屏适配。
- 滚动进入动画遵循 `prefers-reduced-motion`，系统开启减少动态效果时自动关闭。

## 后续扩展

1. **接入表单服务**：在 `ContactView.vue` 的 `handleSubmit` 中把本地提交替换为真实请求，并补充错误与重试状态。
2. **新增页面**：在 `src/router/index.js` 注册路由，并在 `src/views` 下新建视图；导航项由 `site.js` 的 `nav` 驱动。
3. **视觉扩展**：主题色、圆角、阴影与字体栈在 `src/assets/styles/base.css` 的 `:root` 变量中统一调整。
4. **内容运营**：如需多人维护，可将 `site.js` 的数据迁移到 CMS 或接口层，页面组件无需改动。
5. **部署扩展**：构建产物为纯静态文件，也可部署到其他支持 SPA 回退的静态托管平台。
