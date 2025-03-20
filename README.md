# Plato科技 · 纯前端站点骨架

一个用于个人练手的 Vue 3 品牌站点骨架。虚构了「Plato科技」这家专注边缘接入与现场运维的技术团队，用来练习信息架构、页面布局、响应式实现与前端表单交互。

> 站内公司叙述、产品名称、行业场景、案例与数字均为**原创虚构的示例内容**，不代表真实客户、项目或业绩。装饰图形全部由 CSS 渐变与自写 SVG 构成，未使用任何第三方站点资源。

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
npm run dev      # 开发预览，默认 http://localhost:5173
npm run build    # 生产构建，产物输出到 dist/
npm run preview  # 本地预览构建产物
```

## 页面与路由

| 路由 | 页面 | 说明 |
| --- | --- | --- |
| `/` | 首页 | Hero、三层能力概览、产品概览、行业场景、数据亮点、工作方法、CTA |
| `/products` | 产品与解决方案 | 分类筛选、6 个产品卡片、3 组组合方案 |
| `/products/:slug` | 产品详情 | 动态路由，展示简介、能力点、能力概览、典型场景与相关模块 |
| `/industries` | 行业应用 | 6 个行业场景，含痛点、处理思路、示例效果与虚构案例 |
| `/about` | 关于我们 | 品牌叙述、原则、示例路线图、团队角色、项目边界说明 |
| `/contact` | 联系我们 | 联系方式占位、前端校验表单、本地提交占位与成功状态 |
| `/:pathMatch(.*)*` | 404 | 兜底页面，提供返回首页与产品列表入口 |

全局布局：顶部固定导航（移动端可折叠菜单）+ 页脚。所有页面均做了响应式适配。

## 目录结构

```
vueGw/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg              # 自绘站点图标
├── src/
│   ├── main.js                  # 应用入口，注册路由与 v-reveal 指令
│   ├── App.vue                  # 全局布局外壳
│   ├── assets/styles/base.css   # 设计变量、重置样式与通用类
│   ├── components/
│   │   ├── AppHeader.vue        # 顶部导航与移动端菜单
│   │   ├── AppFooter.vue        # 页脚
│   │   ├── BrandMark.vue        # 自绘品牌标识
│   │   ├── CtaBanner.vue        # 通用 CTA 区块
│   │   ├── PlaceholderGraphic.vue # CSS 渐变 + SVG 占位视觉
│   │   ├── ProductCard.vue      # 产品卡片
│   │   └── SectionHead.vue      # 区块标题组合
│   ├── data/
│   │   └── site.js              # 全站展示数据（唯一数据源）
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

## 数据与占位内容说明

全站核心展示数据与主要文案集中在 [src/data/site.js](src/data/site.js)，包括：

- 品牌信息、导航、Hero 文案
- 能力模型、产品与分类、组合方案
- 行业场景与示例案例
- 数据亮点、工作方法、关于我们、联系方式、页脚

页面级的固定小标题、表单字段标签与校验提示属于界面文案，直接写在对应视图中，不参与数据替换。

其中以下内容明确为**占位 / 示例**：

| 内容 | 状态 |
| --- | --- |
| 公司介绍、产品名称与能力描述 | 原创虚构，仅用于演示 |
| 行业场景、案例与“示例效果” | 虚构示例，不代表真实项目 |
| 首页数据亮点（6 / 4 / 12 / 0） | 描述骨架本身，不是业务指标 |
| 邮箱 `hello@example.com`、电话 `000-0000-0000`、地址 | 占位信息，请替换后再使用 |
| 联系表单 | 仅前端校验与本地成功状态，不发送任何请求 |
| 所有视觉图形 | CSS 渐变与自写 SVG，无外部素材 |

## 已实现 / 未实现

已实现：

- 完整页面骨架、动态产品详情路由与 404 兜底
- 集中式 mock 数据层，页面不硬编码业务文案
- 响应式导航、移动端折叠菜单、滚动进入动画（尊重 `prefers-reduced-motion`）
- 产品分类筛选、行业锚点导航
- 联系表单的必填、格式、长度校验与提交占位
- `npm run build` 可通过

未实现（留给后续扩展）：

- 后端接口、真实数据源与内容管理
- 表单真实提交、邮件/消息通知
- SEO 深化（预渲染或 SSR）、站点地图、访问统计
- 多语言、单元测试与部署配置

## 后续往哪里扩展

1. **替换内容**：只需修改 `src/data/site.js`；产品详情页会根据 `slug` 自动匹配，新增产品无需改路由。
2. **接入表单服务**：在 `ContactView.vue` 的 `handleSubmit` 中把本地 `setTimeout` 替换为真实请求，并补充错误与重试状态。
3. **新增页面**：在 `src/router/index.js` 注册路由，并在 `src/views` 下新建视图；导航项由 `site.js` 的 `nav` 驱动。
4. **视觉扩展**：主题色、圆角、阴影、字体栈都在 `src/assets/styles/base.css` 的 `:root` 变量中统一调整；占位视觉可替换为真实图片或视频。
5. **部署**：构建产物为静态文件；由于使用 History 路由，部署到静态托管时需要配置 SPA fallback（将未知路径重写到 `index.html`）。

## 说明

本项目仅用于个人学习与练手，不构成任何商业承诺。信息架构借鉴了同类企业站的常见组织方式，但文案、产品命名、图形与配色均为重新编写，未复制任何第三方站点的文案、图片、图标或资源文件。
