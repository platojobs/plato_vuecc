<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  light: { type: Boolean, default: false },
})
</script>

<template>
  <div class="section-head" :class="{ 'section-head--light': light }">
    <div class="section-head__main">
      <span v-if="eyebrow" class="eyebrow" :class="{ 'eyebrow--light': light }">
        {{ eyebrow }}
      </span>
      <h2 class="section-title">{{ title }}</h2>
      <p v-if="lead" class="section-lead">{{ lead }}</p>
    </div>
    <div v-if="$slots.action" class="section-head__action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
.section-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: clamp(32px, 5vw, 52px);
}

.section-head__main {
  max-width: 680px;
}

.section-head__action {
  padding-bottom: 4px;
}

.section-head--light .section-title {
  color: var(--paper);
}

.section-head--light .section-lead {
  color: rgba(244, 241, 234, 0.6);
}
</style>
