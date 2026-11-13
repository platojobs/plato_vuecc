import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { brand, insights, products } from '@/data/site'

const SITE_ORIGIN = 'https://platojobs.github.io'
const BASE_URL = import.meta.env.BASE_URL

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '首页',
      description:
        'Plato科技自研边缘网关、数据采集终端、工业控制器与传感通信模块，并提供配套设备管理平台，为工业、能源、冷链、楼宇、交通与水务场景交付智能硬件。',
    },
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/ProductsView.vue'),
    meta: {
      title: '产品与解决方案',
      description:
        '五类硬件整机与一套设备管理平台，覆盖边缘网关、数据采集终端、工业控制器、传感与变送模块、无线通信网关与设备管理，并按现场目标组合交付。',
    },
  },
  {
    path: '/products/:slug',
    name: 'product-detail',
    component: () => import('@/views/ProductDetailView.vue'),
    meta: { title: '产品详情' },
  },
  {
    path: '/industries',
    name: 'industries',
    component: () => import('@/views/IndustriesView.vue'),
    meta: {
      title: '行业应用',
      description:
        '覆盖工业设备与产线、能源与电力、冷链与仓储、楼宇与园区、交通与市政设施、环境与水务监测六类现场，说明常见约束、对应机型与典型接入方式。',
    },
  },
  {
    path: '/insights',
    name: 'insights',
    component: () => import('@/views/InsightsView.vue'),
    meta: {
      title: '洞察',
      description:
        '围绕硬件选型、设备接入、边缘计算与远程运维整理的实践笔记，记录产品在真实现场的形成过程与判断。',
    },
  },
  {
    path: '/insights/:slug',
    name: 'insight-detail',
    component: () => import('@/views/InsightDetailView.vue'),
    meta: { title: '洞察详情' },
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/views/FaqView.vue'),
    meta: {
      title: '常见问题',
      description:
        '关于产品选型、接口协议、接入条件、交付周期、文档支持、权限与数据归属的常见问题解答。',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: '关于我们',
      description:
        'Plato科技专注智能硬件与边缘计算设备，自研边缘网关、数据采集终端、工业控制器与传感通信模块，并提供配套设备管理平台。',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: {
      title: '联系我们',
      description:
        '如果你正在确定机型、接口或部署方式，可以把设备类型、协议、点位数量与安装环境写下来，我们会先给出选型建议。',
    },
  },
  {
    path: '/showcase',
    name: 'showcase',
    component: () => import('@/views/ShowcaseView.vue'),
    meta: {
      title: '能力看板',
      description:
        '把硬件交付项目的负责人、进度、上线计划与风险节点放在同一张看板上，便于持续跟进设备与平台的交付状态。',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: '页面不存在',
      description: '该页面可能已经迁移或链接有误，可以通过首页、产品列表或站内搜索继续查找。',
    },
  },
]

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 前进/后退：等懒加载页面完成首屏布局后再恢复，避免高度不足被截断。
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          window.setTimeout(() => resolve({ ...savedPosition, behavior: 'auto' }), 60)
        })
      })
    }

    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
    return { top: 0, behavior: 'auto' }
  },
})

function truncate(text, max = 160) {
  const value = String(text ?? '').replace(/\s+/g, ' ').trim()
  return value.length > max ? `${value.slice(0, max - 1)}…` : value
}

function resolveMeta(to) {
  let title = to.meta?.title || '页面不存在'
  let description = to.meta?.description || brand.description
  let type = 'website'
  let publishedTime = ''

  if (to.name === 'product-detail') {
    const product = products.find((item) => item.slug === to.params.slug)
    title = product ? product.name : '产品未找到'
    description = product
      ? `${product.tagline}。${product.summary}`
      : '该产品标识可能已经调整，可以返回产品列表重新选择。'
  }

  if (to.name === 'insight-detail') {
    const insight = insights.find((item) => item.slug === to.params.slug)
    title = insight ? insight.title : '内容未找到'
    description = insight
      ? insight.excerpt
      : '这篇内容可能已经调整，可以返回洞察列表继续浏览。'
    type = insight ? 'article' : 'website'
    publishedTime = insight?.date ?? ''
  }

  const fullTitle = to.name === 'home' ? `${brand.name} · ${brand.slogan}` : `${title} · ${brand.name}`
  const canonical = `${SITE_ORIGIN}${BASE_URL}${to.path.replace(/^\//, '')}`
  const image = `${SITE_ORIGIN}${BASE_URL}share.png`

  return {
    title: fullTitle,
    description: truncate(description),
    type,
    canonical,
    image,
    publishedTime,
  }
}

function upsertMeta(attribute, key, content) {
  if (!content) return
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

router.afterEach((to) => {
  const meta = resolveMeta(to)
  document.title = meta.title

  upsertMeta('name', 'description', meta.description)
  upsertMeta('name', 'robots', to.name === 'not-found' ? 'noindex,follow' : 'index,follow')
  upsertMeta('property', 'og:title', meta.title)
  upsertMeta('property', 'og:description', meta.description)
  upsertMeta('property', 'og:type', meta.type)
  upsertMeta('property', 'og:url', meta.canonical)
  upsertMeta('property', 'og:image', meta.image)
  upsertMeta('property', 'article:published_time', meta.publishedTime)
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', meta.title)
  upsertMeta('name', 'twitter:description', meta.description)
  upsertMeta('name', 'twitter:image', meta.image)
  upsertCanonical(meta.canonical)
})

export default router
