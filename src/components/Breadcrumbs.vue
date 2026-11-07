<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <nav class="container breadcrumbs" aria-label="面包屑">
    <ol>
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`">
        <RouterLink v-if="item.to" :to="item.to">{{ item.label }}</RouterLink>
        <span v-else aria-current="page">{{ item.label }}</span>
        <span v-if="index < items.length - 1" class="breadcrumbs__sep" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  padding-top: 26px;
}

.breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.breadcrumbs li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--muted);
}

.breadcrumbs a {
  transition: color 0.2s ease;
}

.breadcrumbs a:hover {
  color: var(--accent);
}

.breadcrumbs [aria-current="page"] {
  color: var(--ink-soft);
}

.breadcrumbs__sep {
  color: var(--line-strong);
}

@media (max-width: 600px) {
  .breadcrumbs {
    padding-top: 20px;
  }
}
</style>
