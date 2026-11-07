<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import BackToTop from '@/components/BackToTop.vue'

const route = useRoute()
const mainRef = ref(null)
const routeLoading = ref(true)
let loadingTimer = null
let initialTimer = null

function clearTimers() {
  if (loadingTimer) window.clearTimeout(loadingTimer)
  if (initialTimer) window.clearTimeout(initialTimer)
}

router.beforeEach((to, from) => {
  if (from.name && to.path !== from.path) routeLoading.value = true
})

router.afterEach(() => {
  if (loadingTimer) window.clearTimeout(loadingTimer)
  loadingTimer = window.setTimeout(() => {
    routeLoading.value = false
  }, 160)
})

function playPageIn() {
  const el = mainRef.value
  if (!el) return
  el.classList.remove('page-in')
  void el.offsetWidth
  el.classList.add('page-in')
}

watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    playPageIn()
  },
)

onMounted(() => {
  playPageIn()
  initialTimer = window.setTimeout(() => {
    routeLoading.value = false
  }, 180)
})

onBeforeUnmount(() => {
  clearTimers()
})
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#main">跳到主要内容</a>
    <AppHeader />
    <main id="main" ref="mainRef">
      <RouterView />
    </main>
    <AppFooter />
    <BackToTop />

    <div v-if="routeLoading" class="route-skeleton" aria-hidden="true">
      <div class="container route-skeleton__inner">
        <span class="skeleton skeleton--eyebrow"></span>
        <span class="skeleton skeleton--title"></span>
        <span class="skeleton skeleton--lead"></span>
        <div class="route-skeleton__grid">
          <span class="skeleton skeleton--card"></span>
          <span class="skeleton skeleton--card"></span>
          <span class="skeleton skeleton--card"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1;
}

main.page-in {
  animation: page-in 0.35s ease both;
}

@keyframes page-in {
  from {
    opacity: 0.72;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skip-link {
  position: absolute;
  top: -60px;
  left: 16px;
  z-index: 60;
  padding: 10px 16px;
  border-radius: 8px;
  background: var(--ink);
  color: var(--paper);
  font-size: 13px;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 12px;
}

.route-skeleton {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  z-index: 45;
  pointer-events: none;
  padding: 32px 0 38px;
  border-bottom: 1px solid var(--line);
  background: var(--paper);
}

.route-skeleton__inner {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton {
  display: block;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    var(--paper-deep) 25%,
    var(--surface) 37%,
    var(--paper-deep) 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

.skeleton--eyebrow {
  width: 124px;
  height: 12px;
}

.skeleton--title {
  width: min(560px, 62%);
  height: 34px;
}

.skeleton--lead {
  width: min(440px, 48%);
  height: 14px;
}

.route-skeleton__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 14px;
}

.skeleton--card {
  height: 118px;
  border-radius: var(--radius);
}

@keyframes shimmer {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: 0 0;
  }
}

@media (max-width: 900px) {
  .route-skeleton__grid {
    grid-template-columns: 1fr;
  }

  .skeleton--card {
    height: 92px;
  }
}

@media (prefers-reduced-motion: reduce) {
  main.page-in {
    animation: none;
  }

  .skeleton {
    animation: none;
  }
}
</style>
