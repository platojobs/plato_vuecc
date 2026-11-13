<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },
  duration: { type: Number, default: 1100 },
})

const display = ref(0)
const el = ref(null)
let observer = null
let frame = null

function animate() {
  const start = performance.now()
  const from = 0
  const to = props.value

  function tick(now) {
    const progress = Math.min(1, (now - start) / props.duration)
    const eased = 1 - Math.pow(1 - progress, 3)
    display.value = Math.round(from + (to - from) * eased)
    if (progress < 1) frame = requestAnimationFrame(tick)
  }

  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || typeof IntersectionObserver === 'undefined') {
    display.value = props.value
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        observer = null
        animate()
      })
    },
    { threshold: 0.45 },
  )
  observer.observe(el.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <span ref="el" class="count-up" aria-hidden="true">{{ display }}</span>
  <span class="sr-only">{{ value }}</span>
</template>

<style scoped>
.count-up {
  display: inline-block;
  font-variant-numeric: tabular-nums;
}
</style>
