<script setup>
import { computed, ref } from 'vue'
import { insightCategories, insights } from '@/data/site'
import PlaceholderGraphic from '@/components/PlaceholderGraphic.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const activeCategory = ref('all')
const currentPage = ref(1)
const PAGE_SIZE = 4

const filteredInsights = computed(() => {
  if (activeCategory.value === 'all') return insights
  return insights.filter((item) => item.categoryId === activeCategory.value)
})

const pagedInsights = computed(() =>
  filteredInsights.value.slice(
    (currentPage.value - 1) * PAGE_SIZE,
    currentPage.value * PAGE_SIZE,
  ),
)

const categoryOptions = computed(() =>
  insightCategories.map((category) => ({
    ...category,
    count:
      category.id === 'all'
        ? insights.length
        : insights.filter((item) => item.categoryId === category.id).length,
  })),
)

function handleCategoryChange() {
  currentPage.value = 1
}

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
    '这些内容来自产品与现场的判断取舍。如果你正在面对相近的约束，可以把设备接口、点位与安装条件写下来，我们一起确认先选哪款设备。',
  primaryCta: { label: '联系我们', to: '/contact' },
  secondaryCta: { label: '浏览产品线', to: '/products' },
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
          围绕硬件选型、设备接入与现场运行，记录我们在真实约束下形成的方法。这里不追逐概念，只讨论哪些判断在产品里真正起作用。
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
        <div class="insight-filter">
          <div class="insight-filter__control">
            <span class="insight-filter__label">主题</span>
            <el-select
              v-model="activeCategory"
              class="insight-select"
              placeholder="选择主题"
              @change="handleCategoryChange"
            >
              <el-option
                v-for="category in categoryOptions"
                :key="category.id"
                :label="`${category.label}（${category.count}）`"
                :value="category.id"
              />
            </el-select>
          </div>
          <p class="insight-filter__result">
            共 <strong>{{ filteredInsights.length }}</strong> 篇内容
          </p>
        </div>

        <div class="insight-grid">
          <RouterLink
            v-for="(insight, index) in pagedInsights"
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

        <div v-if="filteredInsights.length > PAGE_SIZE" class="insight-pagination">
          <el-pagination
            v-model:current-page="currentPage"
            background
            layout="total, prev, pager, next"
            :page-size="PAGE_SIZE"
            :total="filteredInsights.length"
          />
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

@media (max-width: 600px) {
  .insight-filter {
    align-items: stretch;
    flex-direction: column;
  }

  .insight-filter__control {
    justify-content: space-between;
  }

  .insight-select {
    flex: 1;
    max-width: 220px;
  }
}

.insight-filter {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 26px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
}

.insight-filter__control {
  display: flex;
  align-items: center;
  gap: 12px;
}

.insight-filter__label {
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.insight-select {
  width: 188px;
}

.insight-select :deep(.el-select__wrapper) {
  min-height: 40px;
  border-radius: 999px;
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--line) inset;
  font-size: 13px;
}

.insight-select :deep(.el-select__wrapper:hover) {
  box-shadow: 0 0 0 1px var(--line-strong) inset;
}

.insight-select :deep(.el-select__wrapper.is-focused) {
  box-shadow: 0 0 0 1px var(--link) inset;
}

.insight-filter__result {
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.insight-filter__result strong {
  color: var(--ink);
}

.insight-pagination {
  display: flex;
  justify-content: center;
  margin-top: 34px;
  padding-top: 26px;
  border-top: 1px solid var(--line);
}

.insight-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.insight-card {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  transition: transform 0.35s var(--ease-out), box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.insight-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), transparent 72%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s var(--ease-out);
}

.insight-card:hover {
  transform: translateY(-6px);
  border-color: var(--line-strong);
  box-shadow: var(--lift);
}

.insight-card:hover::before {
  transform: scaleX(1);
}

.insight-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
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
