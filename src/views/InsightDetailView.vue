<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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

const articleRef = ref(null)
const progress = ref(0)
const activeHeading = ref('')

const tocItems = computed(() => {
  if (!insight.value) return []
  return insight.value.sections.map((section, index) => ({
    id: `${insight.value.slug}-section-${index + 1}`,
    label: section.heading,
  }))
})

const progressStyle = computed(() => ({ transform: `scaleX(${progress.value})` }))

let frame = null

function updateReadingState() {
  frame = null
  const article = articleRef.value
  if (!article) return

  const rect = article.getBoundingClientRect()
  const scrollable = article.offsetHeight - window.innerHeight + 160
  const passed = -rect.top + 120
  progress.value = scrollable > 0 ? Math.min(1, Math.max(0, passed / scrollable)) : 0

  let current = tocItems.value[0]?.id ?? ''
  tocItems.value.forEach((item) => {
    const el = document.getElementById(item.id)
    if (el && el.getBoundingClientRect().top <= 150) current = item.id
  })
  activeHeading.value = current
}

function scheduleReadingState() {
  if (frame) return
  frame = requestAnimationFrame(updateReadingState)
}

onMounted(() => {
  nextTick(updateReadingState)
  window.addEventListener('scroll', scheduleReadingState, { passive: true })
  window.addEventListener('resize', scheduleReadingState)
})

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
  window.removeEventListener('scroll', scheduleReadingState)
  window.removeEventListener('resize', scheduleReadingState)
})

watch(
  () => route.fullPath,
  async () => {
    progress.value = 0
    activeHeading.value = tocItems.value[0]?.id ?? ''
    await nextTick()
    updateReadingState()
  },
)

function legacyCopy(text) {
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.top = '-999px'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  document.execCommand('copy')
  document.body.removeChild(area)
}

async function copyLink() {
  const url = window.location.href
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url)
    } else {
      legacyCopy(url)
    }
    ElMessage.success('链接已复制')
  } catch (error) {
    try {
      legacyCopy(url)
      ElMessage.success('链接已复制')
    } catch (fallbackError) {
      ElMessage.error('复制失败，请手动复制地址栏链接')
    }
  }
}

async function shareInsight() {
  if (!insight.value) return
  const url = window.location.href

  if (navigator.share) {
    try {
      await navigator.share({
        title: insight.value.title,
        text: insight.value.excerpt,
        url,
      })
      return
    } catch (error) {
      if (error?.name === 'AbortError') return
    }
  }

  await copyLink()
}
</script>

<template>
  <div v-if="insight" class="insight-detail">
    <div class="reading-progress" aria-hidden="true">
      <span :style="progressStyle"></span>
    </div>

    <Breadcrumbs
      :items="[
        { label: '首页', to: '/' },
        { label: '洞察', to: '/insights' },
        { label: insight.title },
      ]"
    />

    <article ref="articleRef">
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

          <div class="insight-hero__bar" v-reveal="220">
            <div class="insight-share" role="group" aria-label="分享本文">
              <button type="button" @click="shareInsight">
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M8 1.8v8.4M5 4.6 8 1.8l3 2.8M3 8.6v3.6h10V8.6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                分享
              </button>
              <button type="button" @click="copyLink">
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <rect
                    x="5.5"
                    y="5.5"
                    width="7"
                    height="7"
                    rx="1.4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.4"
                  />
                  <path
                    d="M10.5 3.4H4.4a1 1 0 0 0-1 1v6.1"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.4"
                    stroke-linecap="round"
                  />
                </svg>
                复制链接
              </button>
            </div>
            <span class="insight-hero__reading">
              {{ Math.round(progress * 100) }}% · {{ insight.readingTime }}
            </span>
          </div>
        </div>
      </header>

      <div class="container">
        <details class="toc-mobile no-print">
          <summary>
            <span>本页目录</span>
            <span class="toc-mobile__meta">{{ tocItems.length }} 节 · 当前 {{ Math.round(progress * 100) }}%</span>
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M4 6.5 8 10.5 12 6.5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
          </summary>
          <ol>
            <li v-for="(item, index) in tocItems" :key="item.id">
              <a
                :href="`#${item.id}`"
                :class="{ 'is-active': activeHeading === item.id }"
                @click="$event.currentTarget.closest('details').open = false"
              >
                <span class="insight-toc__num">0{{ index + 1 }}</span>
                {{ item.label }}
              </a>
            </li>
          </ol>
        </details>
      </div>

      <div class="container insight-layout">
        <aside class="insight-aside" v-reveal="80">
          <nav class="insight-toc no-print" aria-label="本页目录">
            <span class="insight-toc__label">本页目录</span>
            <ol>
              <li v-for="(item, index) in tocItems" :key="item.id">
                <a
                  :href="`#${item.id}`"
                  :class="{ 'is-active': activeHeading === item.id }"
                  :aria-current="activeHeading === item.id ? 'location' : undefined"
                >
                  <span class="insight-toc__num">0{{ index + 1 }}</span>
                  <span>{{ item.label }}</span>
                </a>
              </li>
            </ol>
          </nav>

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
            <h2 :id="tocItems[index]?.id">{{ section.heading }}</h2>
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

    <section class="section section--snug related">
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
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 70;
  height: 3px;
  pointer-events: none;
}

.reading-progress span {
  display: block;
  height: 100%;
  transform-origin: left center;
  background: linear-gradient(90deg, var(--accent), #eab48f);
  transition: transform 0.12s linear;
}

.insight-hero {
  position: relative;
  overflow: hidden;
  padding: clamp(34px, 5vw, 64px) 0 clamp(30px, 4vw, 46px);
  background-image:
    radial-gradient(ellipse 680px 340px at 88% -6%, var(--hero-glow), transparent 70%),
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: auto, 72px 72px, 72px 72px;
}

.insight-hero::after {
  content: "";
  position: absolute;
  top: 18%;
  right: -120px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: repeating-radial-gradient(
    circle at 50% 50%,
    transparent 0 38px,
    var(--line) 38px 39px
  );
  mask-image: radial-gradient(circle, #000 0 60%, transparent 76%);
  -webkit-mask-image: radial-gradient(circle, #000 0 60%, transparent 76%);
  pointer-events: none;
}

.insight-hero__inner {
  position: relative;
  z-index: 1;
  max-width: 880px;
}

.insight-hero__title {
  margin-top: 16px;
  font-size: clamp(34px, 4.6vw, 58px);
  line-height: 1.08;
  letter-spacing: -0.032em;
  text-wrap: balance;
}

.insight-hero__lead {
  max-width: 62ch;
  margin-top: 20px;
  font-size: clamp(16px, 1.8vw, 19px);
  line-height: 1.8;
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
  background: var(--surface);
  font-size: 11.5px;
  color: var(--ink-soft);
}

.insight-hero__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}

.insight-share {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.insight-share button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink-soft);
  transition: transform 0.25s var(--ease-out), color 0.25s ease,
    border-color 0.25s ease, background 0.25s ease;
}

.insight-share button:hover {
  transform: translateY(-1px);
  border-color: var(--accent);
  color: var(--accent);
}

.insight-share button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.insight-hero__reading {
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.toc-mobile {
  display: none;
}

.insight-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.62fr) minmax(0, 1.38fr);
  gap: clamp(30px, 4.5vw, 64px);
  padding-bottom: clamp(48px, 6vw, 80px);
}

.insight-aside {
  position: sticky;
  top: calc(var(--header-height) + 24px);
  align-self: start;
  max-height: calc(100vh - var(--header-height) - 48px);
  overflow-y: auto;
  padding-right: 4px;
  scrollbar-width: thin;
  scrollbar-color: var(--line-strong) transparent;
}

.insight-toc {
  padding: 16px 18px 14px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.insight-toc__label {
  display: block;
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

.insight-toc ol {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.insight-toc a {
  display: flex;
  gap: 8px;
  padding: 8px 10px;
  border-left: 2px solid transparent;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--muted);
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.insight-toc a:hover {
  background: var(--paper-deep);
  color: var(--ink);
}

.insight-toc a.is-active {
  border-left-color: var(--accent);
  background: linear-gradient(90deg, var(--accent-soft), transparent);
  color: var(--ink);
  font-weight: 600;
}

.insight-toc a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}

.insight-toc__num {
  flex-shrink: 0;
  padding-top: 2px;
  font-family: var(--font-display);
  font-size: 10px;
  color: var(--accent);
}

.insight-aside__visual {
  margin-top: 18px;
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
  max-width: 740px;
}

.insight-section + .insight-section {
  margin-top: 44px;
}

.insight-section h2 {
  scroll-margin-top: 132px;
  font-size: clamp(21px, 2.4vw, 27px);
  line-height: 1.3;
  letter-spacing: -0.018em;
  text-wrap: balance;
}

.insight-section p {
  max-width: var(--measure);
  margin-top: 15px;
  font-size: 16px;
  line-height: 1.92;
  color: var(--ink-soft);
}

.insight-section:first-child p:first-of-type {
  font-size: 17.5px;
  line-height: 1.85;
  color: var(--ink);
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

.related-card::before {
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

.related-card:hover {
  transform: translateY(-6px);
  border-color: var(--line-strong);
  box-shadow: var(--lift);
}

.related-card:hover::before {
  transform: scaleX(1);
}

.related-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
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
    position: static;
    max-height: none;
    overflow: visible;
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: start;
  }

  .insight-toc {
    display: none;
  }

  .toc-mobile {
    display: block;
    margin: 0 0 clamp(26px, 4vw, 38px);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: var(--surface);
  }

  .toc-mobile summary {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    list-style: none;
    font-size: 13px;
    font-weight: 600;
    color: var(--ink);
    cursor: pointer;
  }

  .toc-mobile summary::-webkit-details-marker {
    display: none;
  }

  .toc-mobile summary svg {
    margin-left: auto;
    color: var(--muted);
    transition: transform 0.25s ease;
  }

  .toc-mobile[open] summary svg {
    transform: rotate(180deg);
  }

  .toc-mobile__meta {
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.02em;
    color: var(--muted);
  }

  .toc-mobile ol {
    display: flex;
    flex-direction: column;
    padding: 0 10px 10px;
    border-top: 1px solid var(--line);
  }

  .toc-mobile a {
    display: flex;
    gap: 8px;
    padding: 10px 8px;
    border-radius: 8px;
    font-size: 13px;
    color: var(--ink-soft);
  }

  .toc-mobile a.is-active {
    background: var(--accent-soft);
    color: var(--accent);
    font-weight: 600;
  }

  .toc-mobile a:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
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

  .insight-hero__bar {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
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

@media (prefers-reduced-motion: reduce) {
  .reading-progress span {
    transition: none;
  }
}
</style>
