<script setup>
import { brand, footer } from '@/data/site'
import BrandMark from './BrandMark.vue'
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <RouterLink class="footer-logo" to="/">
            <BrandMark tone="light" :size="36" />
            <span class="footer-logo__text">
              <strong>{{ brand.name }}</strong>
              <span>{{ brand.nameEn }}</span>
            </span>
          </RouterLink>
          <p class="footer-blurb">{{ footer.blurb }}</p>
          <div class="footer-tags">
            <span class="footer-tag">边缘接入</span>
            <span class="footer-tag">数据观测</span>
            <span class="footer-tag">现场运维</span>
          </div>
        </div>

        <div class="footer-columns">
          <div v-for="column in footer.columns" :key="column.title" class="footer-column">
            <h3 class="footer-column__title">{{ column.title }}</h3>
            <RouterLink
              v-for="link in column.links"
              :key="link.label"
              class="footer-link"
              :to="link.to"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>{{ footer.copyright }}</p>
        <p class="footer-bottom__note">{{ brand.slogan }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: clamp(48px, 8vw, 96px);
  padding: clamp(48px, 7vw, 72px) 0 28px;
  background: var(--night);
  color: rgba(244, 241, 234, 0.62);
}

.footer-top {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.4fr);
  gap: clamp(40px, 6vw, 88px);
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(244, 241, 234, 0.12);
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.footer-logo__text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.footer-logo__text strong {
  font-size: 17px;
  font-weight: 650;
  color: var(--paper);
}

.footer-logo__text span {
  margin-top: 2px;
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.16em;
  color: rgba(244, 241, 234, 0.45);
}

.footer-blurb {
  max-width: 360px;
  margin-top: 18px;
  font-size: 13px;
  line-height: 1.8;
}

.footer-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.footer-tag {
  padding: 4px 10px;
  border: 1px solid rgba(244, 241, 234, 0.16);
  border-radius: 999px;
  font-size: 11px;
  letter-spacing: 0.04em;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-column__title {
  margin-bottom: 4px;
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(244, 241, 234, 0.4);
}

.footer-link {
  width: fit-content;
  font-size: 13px;
  color: rgba(244, 241, 234, 0.7);
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--paper);
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 22px;
  font-size: 12px;
  color: rgba(244, 241, 234, 0.42);
}

.footer-bottom__note {
  letter-spacing: 0.04em;
}

@media (max-width: 900px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}

@media (max-width: 600px) {
  .footer-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px;
  }
}
</style>
