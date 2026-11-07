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
        'Plato科技为制造、物流、园区与能源场景提供设备接入、边缘数据处理与现场运维能力，把分散的设备与系统整理成一条可交付的链路。',
    },
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/ProductsView.vue'),
    meta: {
      title: '产品与解决方案',
      description:
        '六个产品模块覆盖设备接入、边缘数据处理、数据观测、远程运维与场景搭建，并按接入、可观测与运维目标组合成方案。',
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
        '按制造、物流、园区、能源、农业与零售现场整理的常见问题、处理方式与实施路径，帮助判断方案应该先解决哪一段。',
    },
  },
  {
    path: '/insights',
    name: 'insights',
    component: () => import('@/views/InsightsView.vue'),
    meta: {
      title: '洞察',
      description:
        '围绕设备接入、数据链路、远程运维与行业现场整理的实践笔记，记录我们在真实约束下形成的方法与判断。',
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
        '关于产品能力、设备接入、部署节奏、交付支持、权限审计与数据归属的常见问题解答。',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: '关于我们',
      description:
        'Plato科技以现场为起点，围绕连接、数据、观测与运维四层能力，把设备与流程整理成可交付、可维护的系统。',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: {
      title: '联系我们',
      description:
        '如果你正在面对设备接入、数据链路或现场运维的问题，可以把现场情况写下来，我们会先做一次初步判断。',
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
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 92, behavior: 'smooth' }
    return { top: 0 }
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
