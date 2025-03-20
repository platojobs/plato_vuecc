<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#main">跳到主要内容</a>
    <AppHeader />
    <main id="main">
      <RouterView />
    </main>
    <AppFooter />
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
</style>
