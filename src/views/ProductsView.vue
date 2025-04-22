<script setup>
import { computed, ref } from 'vue'
import { productCategories, products, solutions } from '@/data/site'
import ProductCard from '@/components/ProductCard.vue'
import CtaBanner from '@/components/CtaBanner.vue'

const activeCategory = ref('all')

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') return products
  return products.filter((product) => product.category === activeCategory.value)
})

function moduleOf(slug) {
  return products.find((product) => product.slug === slug)
}

const productsCta = {
  eyebrow: 'STILL EXPLORING',
  title: '还没确定要选哪个模块？',
  description:
    '产品只是能力的容器，真正需要先确认的是你的现场条件与当前最想解决的问题。把现状说清楚，我们再一起决定从哪里开始。',
  primaryCta: { label: '聊聊你的场景', to: '/contact' },
  secondaryCta: { label: '查看行业应用', to: '/industries' },
}
</script>

<template>
  <div class="products-page">
    <section class="page-head">
      <div class="container">
        <span class="eyebrow" v-reveal>PRODUCTS &amp; SOLUTIONS</span>
        <h1 class="page-head__title" v-reveal="60">产品与解决方案</h1>
        <p class="page-head__lead" v-reveal="120">
          六个模块覆盖接入、观测、运维与场景搭建；三组方案把它们按目标组合起来。每个模块既可单独部署，也能随项目推进逐步扩展。
        </p>
        <div class="page-head__meta" v-reveal="180">
          <span>{{ products.length }} 个产品模块</span>
          <span class="dot"></span>
          <span>{{ solutions.length }} 组组合方案</span>
          <span class="dot"></span>
          <span>4 层能力模型</span>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <div class="filter-bar" role="group" aria-label="按类别筛选产品">
          <button
            v-for="category in productCategories"
            :key="category.id"
            class="filter-chip"
            :class="{ 'is-active': activeCategory === category.id }"
            type="button"
            :aria-pressed="activeCategory === category.id"
            @click="activeCategory = category.id"
          >
            {{ category.label }}
            <span class="filter-chip__count">
              {{
                category.id === 'all'
                  ? products.length
                  : products.filter((item) => item.category === category.id).length
              }}
            </span>
          </button>
        </div>

        <div class="product-grid">
          <ProductCard
            v-for="(product, index) in filteredProducts"
            :key="product.slug"
            :product="product"
            v-reveal="index * 50"
          />
        </div>

        <p class="note">
          模块可独立部署，也可按场景组合；具体组合方式与实施顺序以现场评估结果为准。
        </p>
      </div>
    </section>

    <section class="section solutions">
      <div class="container">
        <div class="solutions-head">
          <span class="eyebrow" v-reveal>SOLUTIONS</span>
          <h2 class="section-title" v-reveal="60">按目标组合，而不是按功能表堆叠</h2>
          <p class="section-lead" v-reveal="120">
            同一组模块，面对不同现场会有不同的组合顺序。以下三组方案给出了常见的目标组合，实际项目仍需从现场条件出发调整。
          </p>
        </div>

        <div class="solution-grid">
          <article
            v-for="(solution, index) in solutions"
            :key="solution.id"
            class="solution-card"
            v-reveal="index * 70"
          >
            <div class="solution-card__top">
              <span class="solution-card__index">0{{ index + 1 }}</span>
              <span class="solution-card__tagline">{{ solution.tagline }}</span>
            </div>
            <h3 class="solution-card__title">{{ solution.title }}</h3>
            <p class="solution-card__desc">{{ solution.description }}</p>

            <div class="solution-card__modules">
              <RouterLink
                v-for="slug in solution.modules"
                :key="slug"
                class="solution-module"
                :to="`/products/${slug}`"
              >
                {{ moduleOf(slug)?.name }}
                <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
              </RouterLink>
            </div>

            <div class="solution-card__suited">
              <span>适用</span>
              {{ solution.suited }}
            </div>
          </article>
        </div>
      </div>
    </section>

    <CtaBanner :content="productsCta" />
  </div>
</template>

<style scoped>
.page-head__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 28px;
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--line-strong);
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  font-size: 13px;
  color: var(--ink-soft);
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.filter-chip:hover {
  border-color: var(--line-strong);
}

.filter-chip.is-active {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--paper);
}

.filter-chip__count {
  font-family: var(--font-display);
  font-size: 11px;
  opacity: 0.65;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.solutions {
  background: var(--paper-deep);
}

.solutions-head {
  max-width: 680px;
  margin-bottom: clamp(32px, 5vw, 52px);
}

.solution-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.solution-card {
  display: flex;
  flex-direction: column;
  padding: 26px 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.solution-card:hover {
  transform: translateY(-4px);
  border-color: var(--line-strong);
  box-shadow: var(--shadow-sm);
}

.solution-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 22px;
}

.solution-card__index {
  font-family: var(--font-display);
  font-size: 24px;
  line-height: 1;
  color: var(--accent);
}

.solution-card__tagline {
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--muted);
  text-align: right;
}

.solution-card__title {
  font-size: 19px;
}

.solution-card__desc {
  margin-top: 12px;
  font-size: 13.5px;
  line-height: 1.85;
  color: var(--ink-soft);
}

.solution-card__modules {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
}

.solution-module {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--brand);
  transition: border-color 0.2s ease, background 0.2s ease;
}

.solution-module:hover {
  border-color: var(--brand);
  background: rgba(21, 50, 70, 0.04);
}

.solution-card__suited {
  margin-top: auto;
  padding-top: 20px;
  font-size: 12px;
  line-height: 1.7;
  color: var(--muted);
}

.solution-card__suited span {
  margin-right: 8px;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 11px;
}

@media (max-width: 1024px) {
  .product-grid,
  .solution-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .product-grid,
  .solution-grid {
    grid-template-columns: 1fr;
  }
}
</style>
