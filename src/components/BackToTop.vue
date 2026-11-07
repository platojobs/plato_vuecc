<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const visible = ref(false)

function handleScroll() {
  visible.value = window.scrollY > 520
}

function scrollToTop() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="back-top">
    <button
      v-if="visible"
      class="back-top"
      type="button"
      aria-label="返回页面顶部"
      @click="scrollToTop"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 19V5M6 11l6-6 6 6"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-top {
  position: fixed;
  right: 22px;
  bottom: 24px;
  z-index: 40;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  background: var(--surface);
  color: var(--ink-soft);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.back-top:hover {
  color: var(--accent);
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

.back-top-enter-active,
.back-top-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.back-top-enter-from,
.back-top-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 600px) {
  .back-top {
    right: 16px;
    bottom: 18px;
    width: 40px;
    height: 40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .back-top,
  .back-top-enter-active,
  .back-top-leave-active {
    transition: none;
  }
}
</style>
