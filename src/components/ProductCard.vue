<script setup>
import PlaceholderGraphic from './PlaceholderGraphic.vue'

defineProps({
  product: { type: Object, required: true },
})
</script>

<template>
  <RouterLink class="product-card" :to="`/products/${product.slug}`">
    <div class="product-card__media">
      <PlaceholderGraphic :tone="product.tone" />
      <span class="product-card__category">{{ product.categoryLabel }}</span>
    </div>
    <div class="product-card__body">
      <div class="product-card__title">
        <h3>{{ product.name }}</h3>
        <span class="product-card__en">{{ product.nameEn }}</span>
      </div>
      <p class="product-card__tagline">{{ product.tagline }}</p>
      <div class="product-card__footer">
        <span>查看详情</span>
        <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          />
        </svg>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  border-color: transparent;
  box-shadow: var(--shadow);
}

.product-card__media {
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: 0;
}

.product-card__category {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 4px 11px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
}

.product-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 22px 22px 20px;
}

.product-card__title {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
}

.product-card__title h3 {
  font-size: 19px;
  letter-spacing: -0.01em;
}

.product-card__en {
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.product-card__tagline {
  margin-top: 10px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
}

.product-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 18px;
  font-size: 13px;
  font-weight: 600;
  color: var(--link);
}

.product-card__footer svg {
  transition: transform 0.25s ease;
}

.product-card:hover .product-card__footer svg {
  transform: translateX(4px);
}
</style>
