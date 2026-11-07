<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { insights } from '@/data/site'
import PlaceholderGraphic from '@/components/PlaceholderGraphic.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const route = useRoute()

const insight = computed(() => insights.find((item) => item.slug === route.params.slug))

const relatedInsights = computed(() => {
  if (!insight.value) return []
  const others = insights.filter((item) => item.slug !== insight.value.slug)
  const sameCategory = others.filter((item) => item.categoryId === insight.value.categoryId)
  const rest = others.filter((item) => item.categoryId !== insight.value.categoryId)
  return [...sameCategory, ...rest].slice(0, 2)
})

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

function formatDate(value) {
  return dateFormatter.format(new Date(value))
}

const detailCta = computed(() =>
  insight.value
    ? {
        eyebrow: 'NEXT STEP',
        title: '想把文中的判断用到你的现场？',
        description:
          '把设备类型、网络条件与当前最想解决的问题写下来。我们会先判断你的现场与文中场景的差异，再讨论从哪里开始。',
        primaryCta: { label: '联系我们', to: '/contact' },
        secondaryCta: { label: '继续阅读洞察', to: '/insights' },
      }
    : null,
)
</script>

<template>
  <div v-if="insight" class="insight-detail">
    <Breadcrumbs
      :items="[
        { label: '首页', to: '/' },
        { label: '洞察', to: '/insights' },
        { label: insight.title },
      ]"
    />

    <article>
      <header class="insight-hero">
        <div class="container insight-hero__inner">
          <span class="eyebrow" v-reveal>{{ insight.category }}</span>
          <h1 class="insight-hero__title" v-reveal="60">{{ insight.title }}</h1>
          <p class="insight-hero__lead" v-reveal="100">{{ insight.lead }}</p>

          <div class="insight-hero__meta" v-reveal="140">
            <span>{{ formatDate(insight.date) }}</span>
            <span class="dot"></span>
            <span>{{ insight.readingTime }}</span>
            <span class="dot"></span>
            <span>Plato 技术团队</span>
          </div>

          <div class="insight-hero__tags" v-reveal="180">
            <span v-for="tag in insight.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </header>

      <div class="container insight-layout">
        <aside class="insight-aside" v-reveal="80">
          <div class="insight-aside__visual">
            <PlaceholderGraphic :tone="insight.tone" :label="insight.category" />
          </div>
          <div class="insight-aside__card">
            <span class="insight-aside__label">本篇要点</span>
            <ul>
              <li v-for="point in insight.takeaways" :key="point">{{ point }}</li>
            </ul>
          </div>
        </aside>

        <div class="insight-body">
          <section
            v-for="(section, index) in insight.sections"
            :key="section.heading"
            class="insight-section"
            v-reveal="index * 40"
          >
            <h2>{{ section.heading }}</h2>
            <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
            <ul v-if="section.points" class="insight-section__points">
              <li v-for="point in section.points" :key="point">{{ point }}</li>
            </ul>
          </section>

          <div class="insight-note">
            <span class="insight-note__label">实践提示</span>
            <p>
              文中的做法需要结合现场条件调整，不构成固定承诺。涉及设备、网络与流程的判断，建议在实施前完成一次现场确认。
            </p>
          </div>

          <div class="insight-footer">
            <RouterLink class="btn btn--ghost" to="/insights">
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M13.5 8h-10M7.5 3.5 3 8l4.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
              返回洞察列表
            </RouterLink>
            <RouterLink class="btn btn--primary" to="/contact">聊聊这个场景</RouterLink>
          </div>
        </div>
      </div>
    </article>

    <section class="section related">
      <div class="container">
        <div class="related-head">
          <div>
            <span class="eyebrow" v-reveal>KEEP READING</span>
            <h2 class="section-title" v-reveal="60">继续阅读</h2>
          </div>
          <RouterLink class="link-arrow" to="/insights">
            全部洞察
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
          <RouterLink
            v-for="(item, index) in relatedInsights"
            :key="item.slug"
            class="related-card"
            :to="`/insights/${item.slug}`"
            v-reveal="index * 70"
          >
            <div class="related-card__media">
              <PlaceholderGraphic :tone="item.tone" :label="item.category" />
            </div>
            <div class="related-card__body">
              <div class="related-card__meta">
                <span>{{ item.category }}</span>
                <span class="dot"></span>
                <span>{{ formatDate(item.date) }}</span>
              </div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.excerpt }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <CtaBanner v-if="detailCta" :content="detailCta" />
  </div>

  <section v-else class="missing">
    <div class="container">
      <span class="eyebrow">NOT FOUND</span>
      <h1 class="missing__title">没有找到这篇内容</h1>
      <p class="missing__desc">
        链接中的内容标识可能已经调整，或该文章已归入其他主题。你可以返回洞察列表重新选择。
      </p>
      <div class="missing__actions">
        <RouterLink class="btn btn--primary" to="/insights">返回洞察列表</RouterLink>
        <RouterLink class="btn btn--ghost" to="/">回到首页</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.insight-hero {
  padding: clamp(30px, 4.5vw, 54px) 0 clamp(34px, 4vw, 48px);
}

.insight-hero__inner {
  max-width: 880px;
}

.insight-hero__title {
  margin-top: 16px;
  font-size: clamp(32px, 4.4vw, 54px);
  line-height: 1.16;
  letter-spacing: -0.028em;
}

.insight-hero__lead {
  max-width: 760px;
  margin-top: 20px;
  font-size: clamp(16px, 1.8vw, 19px);
  line-height: 1.75;
  color: var(--ink-soft);
}

.insight-hero__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 24px;
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.insight-hero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.insight-hero__tags span {
  padding: 5px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 11.5px;
  color: var(--ink-soft);
}

.insight-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.62fr) minmax(0, 1.38fr);
  gap: clamp(30px, 4.5vw, 64px);
  padding-bottom: clamp(48px, 6vw, 80px);
}

.insight-aside {
  align-self: start;
}

.insight-aside__visual {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: var(--radius);
}

.insight-aside__card {
  margin-top: -22px;
  margin-left: 18px;
  margin-right: 18px;
  padding: 20px 20px 22px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}

.insight-aside__label {
  font-family: var(--font-display);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

.insight-aside__card ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
}

.insight-aside__card li {
  position: relative;
  padding-left: 14px;
  font-size: 13px;
  line-height: 1.7;
  color: var(--ink-soft);
}

.insight-aside__card li::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
}

.insight-body {
  max-width: 760px;
}

.insight-section + .insight-section {
  margin-top: 36px;
}

.insight-section h2 {
  font-size: clamp(21px, 2.4vw, 26px);
  line-height: 1.35;
  letter-spacing: -0.015em;
}

.insight-section p {
  margin-top: 14px;
  font-size: 15.5px;
  line-height: 1.9;
  color: var(--ink-soft);
}

.insight-section__points {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 18px;
  padding: 16px 18px;
  border-left: 2px solid var(--accent);
  background: var(--paper-deep);
}

.insight-section__points li {
  position: relative;
  padding-left: 14px;
  font-size: 14px;
  line-height: 1.75;
  color: var(--ink-soft);
}

.insight-section__points li::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
}

.insight-note {
  margin-top: 40px;
  padding: 22px 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.insight-note__label {
  font-family: var(--font-display);
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.insight-note p {
  margin-top: 8px;
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--muted);
}

.insight-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
  padding-top: 26px;
  border-top: 1px solid var(--line);
}

.related-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.related-head .section-title {
  margin-top: 12px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.related-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.related-card:hover {
  transform: translateY(-4px);
  border-color: transparent;
  box-shadow: var(--shadow);
}

.related-card__media {
  aspect-ratio: 16 / 6.5;
}

.related-card__body {
  padding: 20px 22px 24px;
}

.related-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  letter-spacing: 0.05em;
  color: var(--muted);
}

.related-card__meta > span:first-child {
  color: var(--accent);
}

.related-card h3 {
  margin-top: 10px;
  font-size: 19px;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.related-card p {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.7;
  color: var(--muted);
}

.missing {
  padding: clamp(72px, 10vw, 120px) 0;
  text-align: center;
}

.missing__title {
  margin-top: 16px;
  font-size: clamp(32px, 4vw, 46px);
}

.missing__desc {
  max-width: 520px;
  margin: 16px auto 0;
  color: var(--muted);
}

.missing__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--line-strong);
}

@media (max-width: 900px) {
  .insight-layout {
    grid-template-columns: 1fr;
  }

  .insight-aside {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: start;
  }

  .insight-aside__card {
    margin-top: 0;
    margin-left: 18px;
    margin-right: 0;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .insight-aside {
    grid-template-columns: 1fr;
  }

  .insight-aside__card {
    margin: -18px 14px 0;
  }

  .related-head {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }
}
</style>
