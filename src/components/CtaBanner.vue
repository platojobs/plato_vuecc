<script setup>
defineProps({
  content: { type: Object, required: true },
})
</script>

<template>
  <section class="cta-banner">
    <div class="container cta-inner">
      <div class="cta-copy">
        <span class="eyebrow eyebrow--light">{{ content.eyebrow }}</span>
        <h2 class="cta-title">{{ content.title }}</h2>
        <p class="cta-desc">{{ content.description }}</p>
        <div class="cta-actions">
          <RouterLink class="btn btn--accent" :to="content.primaryCta.to">
            {{ content.primaryCta.label }}
            <svg class="btn__arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
          </RouterLink>
          <RouterLink class="btn btn--outline-light" :to="content.secondaryCta.to">
            {{ content.secondaryCta.label }}
          </RouterLink>
        </div>
      </div>

      <div class="cta-art" aria-hidden="true">
        <svg viewBox="0 0 220 220" fill="none">
          <circle cx="110" cy="110" r="96" stroke="rgba(244,241,234,0.16)" />
          <circle cx="110" cy="110" r="68" stroke="rgba(244,241,234,0.22)" />
          <circle cx="110" cy="110" r="40" stroke="rgba(244,241,234,0.3)" />
          <path d="M110 14v192M14 110h192" stroke="rgba(244,241,234,0.14)" />
          <circle cx="168" cy="52" r="6" fill="#c4683f" />
          <circle cx="42" cy="150" r="4" fill="rgba(244,241,234,0.6)" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-banner {
  position: relative;
  padding: clamp(52px, 7vw, 84px) 0;
  background: var(--night);
  color: var(--on-dark);
  overflow: hidden;
}

.cta-banner::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 78% 22%, rgba(196, 104, 63, 0.18), transparent 52%);
  pointer-events: none;
}

.cta-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
}

.cta-copy {
  max-width: 640px;
}

.cta-title {
  margin-top: 16px;
  font-size: clamp(28px, 3.6vw, 44px);
  letter-spacing: -0.025em;
  white-space: pre-line;
  color: var(--on-dark);
}

.cta-desc {
  max-width: 540px;
  margin-top: 18px;
  font-size: 15px;
  line-height: 1.8;
  color: rgba(244, 241, 234, 0.62);
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.cta-art {
  flex-shrink: 0;
  width: 220px;
  height: 220px;
}

@media (max-width: 900px) {
  .cta-art {
    display: none;
  }
}

@media (max-width: 600px) {
  .cta-actions .btn {
    flex: 1;
    min-width: 150px;
  }
}
</style>
