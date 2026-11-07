<script setup>
import { computed, ref } from 'vue'
import { insightCategories, insights } from '@/data/site'
import PlaceholderGraphic from '@/components/PlaceholderGraphic.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const activeCategory = ref('all')

const filteredInsights = computed(() => {
  if (activeCategory.value === 'all') return insights
  return insights.filter((item) => item.categoryId === activeCategory.value)
})

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

function formatDate(value) {
  return dateFormatter.format(new Date(value))
}

const insightsCta = {
  eyebrow: 'FROM READING TO PRACTICE',
  title: '看到类似的问题，想谈谈具体现场？',
  description:
    '这些内容来自项目中的判断与取舍。如果你正在面对相近的约束，可以把设备、网络与流程现状写下来，我们一起梳理先做哪一段。',
  primaryCta: { label: '联系我们', to: '/contact' },
  secondaryCta: { label: '浏览产品与方案', to: '/products' },
}
</script>

<template>
  <div class="insights-page">
    <Breadcrumbs :items="[{ label: '首页', to: '/' }, { label: '洞察' }]" />

    <section class="page-head">
      <div class="container">
        <span class="eyebrow" v-reveal>INSIGHTS</span>
        <h1 class="page-head__title" v-reveal="60">洞察与实践笔记</h1>
        <p class="page-head__lead" v-reveal="120">
          围绕设备接入、数据链路与现场运维，记录我们在真实约束下形成的方法。这里不追逐概念，只讨论哪些判断在项目里真正起作用。
        </p>
        <div class="page-head__meta" v-reveal="180">
          <span>{{ insights.length }} 篇内容</span>
          <span class="dot"></span>
          <span>接入 · 数据 · 运维 · 行业</span>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <div class="insight-filter" role="group" aria-label="按主题筛选洞察">
          <button
            v-for="category in insightCategories"
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
                  ? insights.length
                  : insights.filter((item) => item.categoryId === category.id).length
              }}
            </span>
          </button>
        </div>

        <div class="insight-grid">
          <RouterLink
            v-for="(insight, index) in filteredInsights"
            :key="insight.slug"
            class="insight-card"
            :to="`/insights/${insight.slug}`"
            v-reveal="index * 60"
          >
            <div class="insight-card__media">
              <PlaceholderGraphic :tone="insight.tone" :label="insight.category" />
              <span class="insight-card__category">{{ insight.category }}</span>
            </div>
            <div class="insight-card__body">
              <div class="insight-card__meta">
                <span>{{ formatDate(insight.date) }}</span>
                <span class="dot"></span>
                <span>{{ insight.readingTime }}</span>
              </div>
              <h2 class="insight-card__title">{{ insight.title }}</h2>
              <p class="insight-card__excerpt">{{ insight.excerpt }}</p>
              <div class="insight-card__footer">
                <div class="insight-card__tags">
                  <span v-for="tag in insight.tags.slice(0, 2)" :key="tag">{{ tag }}</span>
                </div>
                <span class="insight-card__read">
                  阅读全文
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <CtaBanner :content="insightsCta" />
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

.insight-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 26px;
}

.insight-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.insight-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.insight-card:hover {
  transform: translateY(-4px);
  border-color: transparent;
  box-shadow: var(--shadow);
}

.insight-card__media {
  position: relative;
  aspect-ratio: 16 / 7.5;
}

.insight-card__category {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 4px 11px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
}

.insight-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 22px 24px 20px;
}

.insight-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.05em;
  color: var(--muted);
}

.insight-card__title {
  margin-top: 12px;
  font-size: clamp(20px, 2.2vw, 24px);
  line-height: 1.35;
  letter-spacing: -0.015em;
}

.insight-card__excerpt {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.75;
  color: var(--muted);
}

.insight-card__footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-top: auto;
  padding-top: 24px;
}

.insight-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.insight-card__tags span {
  padding: 3px 9px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 10.5px;
  color: var(--muted);
}

.insight-card__read {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--link);
}

.insight-card__read svg {
  transition: transform 0.25s ease;
}

.insight-card:hover .insight-card__read svg {
  transform: translateX(4px);
}

@media (max-width: 900px) {
  .insight-grid {
    grid-template-columns: 1fr;
  }
}
</style>
