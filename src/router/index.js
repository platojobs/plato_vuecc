import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: '首页' },
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/ProductsView.vue'),
    meta: { title: '产品与解决方案' },
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
    meta: { title: '行业应用' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: '关于我们' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: '联系我们' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '页面不存在' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 92, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const suffix = to.meta?.title ? `${to.meta.title} · Plato科技` : 'Plato科技'
  document.title = suffix
})

export default router
