<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '@/data/site'
import PlaceholderGraphic from '@/components/PlaceholderGraphic.vue'
import ProductCard from '@/components/ProductCard.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const route = useRoute()

const product = computed(() => products.find((item) => item.slug === route.params.slug))

const relatedProducts = computed(() => {
  if (!product.value) return []
  const sameCategory = products.filter(
    (item) => item.category === product.value.category && item.slug !== product.value.slug,
  )
  const others = products.filter(
    (item) => item.category !== product.value.category && item.slug !== product.value.slug,
  )
  return [...sameCategory, ...others].slice(0, 2)
})

const detailCta = computed(() =>
  product.value
    ? {
        eyebrow: 'NEXT STEP',
        title: `想进一步了解${product.value.name}？`,
        description:
          '把现场的设备规模、网络条件与当前最想解决的问题写下来，我们可以一起判断这个模块是否合适，以及应该先接入哪一段。',
        primaryCta: { label: '联系我们', to: '/contact' },
        secondaryCta: { label: '返回产品列表', to: '/products' },
      }
    : null,
)
</script>

<template>
  <div v-if="product" class="product-detail">
    <Breadcrumbs
      :items="[
        { label: '首页', to: '/' },
        { label: '产品与解决方案', to: '/products' },
        { label: product.name },
      ]"
    />

    <section class="detail-hero">
      <div class="container detail-hero__inner">
        <div class="detail-copy">
          <span class="eyebrow" v-reveal>{{ product.categoryLabel }}</span>
          <h1 class="detail-title" v-reveal="60">{{ product.name }}</h1>
          <p class="detail-tagline" v-reveal="100">{{ product.tagline }}</p>
          <p class="detail-summary" v-reveal="140">{{ product.summary }}</p>
          <div class="detail-actions" v-reveal="180">
            <RouterLink class="btn btn--primary" to="/contact">
              咨询该方案
              <svg class="btn__arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
            </RouterLink>
            <RouterLink class="btn btn--ghost" to="/products">返回列表</RouterLink>
          </div>
        </div>

        <div class="detail-visual" v-reveal="120">
          <div class="detail-visual__frame">
            <PlaceholderGraphic :tone="product.tone" :label="product.nameEn" />
          </div>
          <div class="detail-visual__caption">
            <span>模块示意图</span>
            <span>基于现场链路的抽象表达</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section detail-intro">
      <div class="container detail-grid">
        <div class="detail-main">
          <span class="eyebrow" v-reveal>OVERVIEW</span>
          <h2 class="section-title" v-reveal="60">这个模块解决什么</h2>
          <p class="detail-description" v-reveal="100">{{ product.description }}</p>

          <div class="highlight-grid">
            <article
              v-for="(item, index) in product.highlights"
              :key="item.title"
              class="highlight-card"
              v-reveal="index * 60"
            >
              <span class="highlight-card__index">0{{ index + 1 }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </article>
          </div>
        </div>

        <aside class="detail-aside" v-reveal="80">
          <div class="spec-panel">
            <h3 class="spec-panel__title">能力概览</h3>
            <dl class="spec-list">
              <div v-for="spec in product.specs" :key="spec.label" class="spec-row">
                <dt>{{ spec.label }}</dt>
                <dd>{{ spec.value }}</dd>
              </div>
            </dl>
          </div>

          <div class="spec-panel spec-panel--accent">
            <h3 class="spec-panel__title">典型使用场景</h3>
            <ul class="use-case-list">
              <li v-for="useCase in product.useCases" :key="useCase">{{ useCase }}</li>
            </ul>
            <p class="spec-panel__note">具体能力范围以现场评估与实施方案为准。</p>
          </div>
        </aside>
      </div>
    </section>

    <section class="section related">
      <div class="container">
        <div class="related-head">
          <div>
            <span class="eyebrow" v-reveal>RELATED</span>
            <h2 class="section-title" v-reveal="60">可以一起使用的模块</h2>
          </div>
          <RouterLink class="link-arrow" to="/products">
            查看全部模块
            <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
          </RouterLink>
        </div>

        <div class="related-grid">
          <ProductCard
            v-for="(item, index) in relatedProducts"
            :key="item.slug"
            :product="item"
            v-reveal="index * 70"
          />
        </div>
      </div>
    </section>

    <CtaBanner v-if="detailCta" :content="detailCta" />
  </div>

  <section v-else class="missing">
    <div class="container">
      <span class="eyebrow">NOT FOUND</span>
      <h1 class="missing__title">没有找到这个产品</h1>
      <p class="missing__desc">
        链接中的产品标识可能已经变更，或该模块已调整到其他分类。你可以返回列表重新选择。
      </p>
      <div class="missing__actions">
        <RouterLink class="btn btn--primary" to="/products">返回产品列表</RouterLink>
        <RouterLink class="btn btn--ghost" to="/">回到首页</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.detail-hero {
  padding: clamp(32px, 5vw, 56px) 0 clamp(48px, 6vw, 72px);
}

.detail-hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(32px, 5vw, 64px);
  align-items: center;
}

.detail-title {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 14px;
  margin-top: 16px;
  font-size: clamp(34px, 4.4vw, 54px);
  letter-spacing: -0.03em;
}

.detail-tagline {
  margin-top: 14px;
  font-size: 18px;
  color: var(--accent);
}

.detail-summary {
  max-width: 560px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.85;
  color: var(--muted);
}

.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.detail-visual__frame {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.detail-visual__caption {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.detail-intro {
  border-top: 1px solid var(--line);
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 0.8fr);
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

.detail-description {
  margin-top: 18px;
  font-size: 15px;
  line-height: 1.95;
  color: var(--ink-soft);
}

.highlight-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.highlight-card {
  padding: 20px 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--surface);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.highlight-card:hover {
  border-color: var(--line-strong);
  box-shadow: var(--shadow-sm);
}

.highlight-card__index {
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--accent);
}

.highlight-card h3 {
  margin-top: 10px;
  font-size: 15px;
}

.highlight-card p {
  margin-top: 8px;
  font-size: 12.5px;
  line-height: 1.8;
  color: var(--muted);
}

.detail-aside {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: calc(var(--header-height) + 24px);
}

.spec-panel {
  padding: 24px 22px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.spec-panel--accent {
  background: var(--paper-deep);
}

.spec-panel__title {
  font-size: 14px;
  letter-spacing: 0.02em;
}

.spec-list {
  margin: 14px 0 0;
}

.spec-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 0;
  border-top: 1px solid var(--line);
}

.spec-row:first-child {
  border-top: none;
  padding-top: 0;
}

.spec-row dt {
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.spec-row dd {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-soft);
}

.use-case-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
}

.use-case-list li {
  position: relative;
  padding-left: 16px;
  font-size: 13px;
  line-height: 1.7;
  color: var(--ink-soft);
}

.use-case-list li::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 0;
  width: 7px;
  height: 1px;
  background: var(--accent);
}

.spec-panel__note {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed var(--line);
  font-size: 10.5px;
  color: var(--muted);
}

.related {
  background: var(--paper-deep);
}

.related-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 32px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.missing {
  padding: clamp(80px, 12vw, 140px) 0;
}

.missing__title {
  margin-top: 16px;
  font-size: clamp(32px, 4.4vw, 48px);
}

.missing__desc {
  max-width: 520px;
  margin-top: 16px;
  color: var(--muted);
}

.missing__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

@media (max-width: 1024px) {
  .detail-hero__inner {
    grid-template-columns: 1fr;
  }

  .detail-visual {
    max-width: 560px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-aside {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .highlight-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .highlight-grid,
  .detail-aside,
  .related-grid {
    grid-template-columns: 1fr;
  }

  .detail-actions .btn {
    flex: 1;
    min-width: 140px;
  }
}
</style>
