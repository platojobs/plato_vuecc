<script setup>
defineProps({
  tone: { type: String, default: 'dark' },
  size: { type: Number, default: 32 },
})
</script>

<template>
  <svg
    class="brand-mark"
    :class="`brand-mark--${tone}`"
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    role="img"
    aria-label="Plato科技标识"
  >
    <rect width="32" height="32" rx="8" />
    <path d="M11 24V8h6.5a5.5 5.5 0 0 1 0 11H11" fill="none" stroke-width="2.4" />
    <circle cx="21.5" cy="21.5" r="2.4" />
  </svg>
</template>

<style scoped>
.brand-mark--dark rect {
  fill: var(--ink);
}

.brand-mark--dark path {
  stroke: var(--paper);
}

.brand-mark--dark circle {
  fill: var(--accent);
}

.brand-mark--light rect {
  fill: var(--paper);
}

.brand-mark--light path {
  stroke: var(--ink);
}

.brand-mark--light circle {
  fill: var(--accent);
}
</style>
