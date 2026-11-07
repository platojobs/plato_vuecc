<script setup>
import { nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { faqGroups } from '@/data/site'
import CtaBanner from '@/components/CtaBanner.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const route = useRoute()

const faqCta = {
  eyebrow: 'STILL HAVE QUESTIONS',
  title: '没有找到答案？',
  description:
    '常见问题覆盖的是通用情况。具体项目的接入条件、网络环境与交付节奏往往不同，把你的现场写下来，我们会给出更贴近实际的回答。',
  primaryCta: { label: '提交你的问题', to: '/contact' },
  secondaryCta: { label: '浏览产品与方案', to: '/products' },
}

function openSearch() {
  window.dispatchEvent(new CustomEvent('plato:search'))
}

function openHashItem() {
  const id = decodeURIComponent(route.hash.replace(/^#/, ''))
  if (!id) return
  const target = document.getElementById(id)
  if (target instanceof HTMLDetailsElement && !target.open) {
    target.open = true
  }
}

onMounted(async () => {
  await nextTick()
  openHashItem()
})

watch(
  () => route.hash,
  async () => {
    await nextTick()
    openHashItem()
  },
)
</script>

<template>
  <div class="faq-page">
    <Breadcrumbs :items="[{ label: '首页', to: '/' }, { label: '常见问题' }]" />

    <section class="page-head">
      <div class="container">
        <span class="eyebrow" v-reveal>FAQ</span>
        <h1 class="page-head__title" v-reveal="60">常见问题</h1>
        <p class="page-head__lead" v-reveal="120">
          这里整理了产品能力、接入部署、交付支持与安全数据四类问题。答案以我们的实际做法为出发点，具体范围仍以现场评估与项目约定为准。
        </p>
        <div class="faq-head__actions" v-reveal="180">
          <button class="btn btn--ghost" type="button" @click="openSearch">
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
              <circle
                cx="10.5"
                cy="10.5"
                r="6.2"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
              />
              <path
                d="m15.2 15.2 4.6 4.6"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
            搜索站内内容
          </button>
          <RouterLink class="btn btn--primary" to="/contact">直接提问</RouterLink>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container faq-layout">
        <aside class="faq-nav" aria-label="问题分类">
          <p class="faq-nav__label">问题分类</p>
          <RouterLink
            v-for="(group, index) in faqGroups"
            :key="group.id"
            class="faq-nav__item"
            :to="{ path: '/faq', hash: `#faq-${group.id}` }"
          >
            <span class="faq-nav__index">0{{ index + 1 }}</span>
            {{ group.title }}
          </RouterLink>
        </aside>

        <div class="faq-groups">
          <section
            v-for="(group, groupIndex) in faqGroups"
            :id="`faq-${group.id}`"
            :key="group.id"
            class="faq-group"
          >
            <div class="faq-group__head" v-reveal>
              <span class="faq-group__index">0{{ groupIndex + 1 }}</span>
              <div>
                <h2>{{ group.title }}</h2>
                <p>{{ group.description }}</p>
              </div>
            </div>

            <div class="faq-list">
              <details
                v-for="(item, itemIndex) in group.items"
                :id="item.id"
                :key="item.id"
                class="faq-item"
                v-reveal="itemIndex * 40"
              >
                <summary>
                  <span class="faq-item__question">{{ item.question }}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M8 2.5v11M2.5 8h11"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </svg>
                </summary>
                <div class="faq-item__answer">
                  <p>{{ item.answer }}</p>
                </div>
              </details>
            </div>
          </section>
        </div>
      </div>
    </section>

    <CtaBanner :content="faqCta" />
  </div>
</template>

<style scoped>
.faq-head__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}

.faq-head__actions .btn svg {
  margin-right: 2px;
}

.faq-layout {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: clamp(28px, 4vw, 64px);
  align-items: start;
}

.faq-nav {
  position: sticky;
  top: calc(var(--header-height) + 24px);
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.faq-nav__label {
  padding: 0 8px 10px;
  font-family: var(--font-display);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.faq-nav__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 8px;
  border-radius: 8px;
  font-size: 13px;
  color: var(--ink-soft);
  transition: background 0.2s ease, color 0.2s ease;
}

.faq-nav__item:hover {
  background: var(--hover-soft);
  color: var(--ink);
}

.faq-nav__index {
  font-family: var(--font-display);
  font-size: 10.5px;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.faq-groups {
  display: flex;
  flex-direction: column;
  gap: clamp(36px, 5vw, 54px);
}

.faq-group {
  scroll-margin-top: 100px;
}

.faq-group__head {
  display: flex;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line-strong);
}

.faq-group__index {
  flex-shrink: 0;
  padding-top: 4px;
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--accent);
}

.faq-group__head h2 {
  font-size: clamp(22px, 2.6vw, 28px);
  line-height: 1.3;
  letter-spacing: -0.015em;
}

.faq-group__head p {
  margin-top: 8px;
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--muted);
}

.faq-list {
  display: flex;
  flex-direction: column;
}

.faq-item {
  scroll-margin-top: 100px;
  border-bottom: 1px solid var(--line);
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 20px 2px;
  cursor: pointer;
  font-size: 15.5px;
  font-weight: 600;
  color: var(--ink);
  list-style: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary svg {
  flex-shrink: 0;
  color: var(--muted);
  transition: transform 0.25s ease, color 0.25s ease;
}

.faq-item summary:hover svg {
  color: var(--accent);
}

.faq-item[open] summary svg {
  transform: rotate(45deg);
  color: var(--accent);
}

.faq-item summary:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.faq-item__answer {
  padding: 0 2px 20px;
}

.faq-item__answer p {
  max-width: 720px;
  font-size: 14px;
  line-height: 1.85;
  color: var(--ink-soft);
}

@media (max-width: 900px) {
  .faq-layout {
    grid-template-columns: 1fr;
  }

  .faq-nav {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: 12px;
    gap: 6px;
  }

  .faq-nav__label {
    width: 100%;
    padding: 0 6px 6px;
  }

  .faq-nav__item {
    padding: 7px 10px;
    border: 1px solid var(--line);
    border-radius: 999px;
    font-size: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq-item summary svg {
    transition: none;
  }
}
</style>
