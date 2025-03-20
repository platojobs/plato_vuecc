<script setup>
import { industries } from '@/data/site'
import PlaceholderGraphic from '@/components/PlaceholderGraphic.vue'
import CtaBanner from '@/components/CtaBanner.vue'

const industriesCta = {
  eyebrow: 'YOUR SCENARIO',
  title: '你的现场不在列表里？',
  description:
    '行业只是分类方式，真正决定方案的是设备、网络、人员与业务流程。把你的现场条件讲清楚，比套用一个行业模板更有用。',
  primaryCta: { label: '描述你的场景', to: '/contact' },
  secondaryCta: { label: '了解我们的能力', to: '/products' },
}
</script>

<template>
  <div class="industries-page">
    <section class="page-head">
      <div class="container">
        <span class="eyebrow" v-reveal>INDUSTRIES</span>
        <h1 class="page-head__title" v-reveal="60">行业应用与示例案例</h1>
        <p class="page-head__lead" v-reveal="120">
          不同现场的约束条件，决定了方案应该先解决哪一段。下面按行业整理了虚构的场景、处理思路与示例案例，用来演示内容如何组织。
        </p>

        <nav class="anchor-nav" aria-label="行业快速导航" v-reveal="180">
          <RouterLink
            v-for="industry in industries"
            :key="industry.id"
            class="anchor-chip"
            :to="{ path: '/industries', hash: `#${industry.id}` }"
          >
            {{ industry.name }}
          </RouterLink>
        </nav>
      </div>
    </section>

    <div class="container">
      <p class="mock-notice">
        提示：以下行业场景、处理方式、效果描述与案例均为虚构示例，仅用于展示页面结构，不代表真实客户或项目成果。
      </p>
    </div>

    <section class="section section--tight">
      <div class="container">
        <div class="industry-list">
          <article
            v-for="(industry, index) in industries"
            :id="industry.id"
            :key="industry.id"
            class="industry-block"
          >
            <div class="industry-visual" v-reveal>
              <div class="industry-visual__frame">
                <PlaceholderGraphic :tone="industry.tone" />
              </div>
              <div class="industry-visual__meta">
                <span class="industry-visual__index">0{{ index + 1 }}</span>
                <span class="industry-visual__en">{{ industry.nameEn }}</span>
              </div>
            </div>

            <div class="industry-content" v-reveal="60">
              <span class="eyebrow">SCENARIO 0{{ index + 1 }}</span>
              <h2 class="industry-title">{{ industry.name }}</h2>
              <p class="industry-scene">{{ industry.scene }}</p>

              <div class="industry-columns">
                <div class="industry-column">
                  <h3 class="industry-column__title">现场常见问题</h3>
                  <ul class="industry-list-points">
                    <li v-for="pain in industry.pain" :key="pain">{{ pain }}</li>
                  </ul>
                </div>
                <div class="industry-column">
                  <h3 class="industry-column__title">我们的处理方式</h3>
                  <ul class="industry-list-points industry-list-points--approach">
                    <li v-for="step in industry.approach" :key="step">{{ step }}</li>
                  </ul>
                </div>
              </div>

              <div class="outcome-row">
                <span class="outcome-row__label">示例效果</span>
                <span v-for="outcome in industry.outcomes" :key="outcome" class="outcome-chip">
                  {{ outcome }}
                </span>
              </div>

              <div class="case-card">
                <div class="case-card__head">
                  <span class="case-card__label">示例案例</span>
                  <span class="case-card__tag">虚构内容</span>
                </div>
                <h3>{{ industry.caseStudy.title }}</h3>
                <p>{{ industry.caseStudy.summary }}</p>
                <p class="case-card__note">{{ industry.caseStudy.note }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <CtaBanner :content="industriesCta" />
  </div>
</template>

<style scoped>
.anchor-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 28px;
}

.anchor-chip {
  padding: 8px 15px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  font-size: 12.5px;
  color: var(--ink-soft);
  transition: border-color 0.2s ease, color 0.2s ease;
}

.anchor-chip:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.mock-notice {
  margin-top: 8px;
  padding: 14px 18px;
  border-left: 2px solid var(--accent);
  background: var(--accent-soft);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: 12.5px;
  line-height: 1.75;
  color: #6b3c24;
}

.industry-list {
  border-top: 1px solid var(--line);
}

.industry-block {
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.3fr);
  gap: clamp(32px, 5vw, 64px);
  padding: clamp(44px, 6vw, 68px) 0;
  border-bottom: 1px solid var(--line);
  scroll-margin-top: calc(var(--header-height) + 24px);
}

.industry-visual__frame {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius);
  overflow: hidden;
}

.industry-visual__meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
}

.industry-visual__index {
  font-family: var(--font-display);
  font-size: 30px;
  line-height: 1;
  color: var(--accent);
}

.industry-visual__en {
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--muted);
}

.industry-title {
  margin-top: 12px;
  font-size: clamp(28px, 3.2vw, 38px);
  letter-spacing: -0.02em;
}

.industry-scene {
  margin-top: 14px;
  padding-left: 16px;
  border-left: 2px solid var(--accent);
  font-size: 15px;
  line-height: 1.85;
  color: var(--ink-soft);
}

.industry-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
  margin-top: 32px;
}

.industry-column__title {
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.industry-list-points {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
  counter-reset: point;
}

.industry-list-points li {
  position: relative;
  padding-left: 26px;
  font-size: 13px;
  line-height: 1.75;
  color: var(--ink-soft);
  counter-increment: point;
}

.industry-list-points li::before {
  content: counter(point, decimal-leading-zero);
  position: absolute;
  top: 0;
  left: 0;
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.industry-list-points--approach li::before {
  content: "→";
  font-size: 11px;
  color: var(--accent);
}

.outcome-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
}

.outcome-row__label {
  margin-right: 4px;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.outcome-chip {
  padding: 5px 12px;
  border-radius: 999px;
  background: var(--paper-deep);
  font-size: 11.5px;
  color: var(--ink-soft);
}

.case-card {
  margin-top: 28px;
  padding: 22px 24px;
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius);
  background: var(--surface);
}

.case-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.case-card__label {
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--accent);
  text-transform: uppercase;
}

.case-card__tag {
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--accent-soft);
  font-size: 10px;
  color: var(--accent);
}

.case-card h3 {
  margin-top: 12px;
  font-size: 15px;
}

.case-card p {
  margin-top: 8px;
  font-size: 12.5px;
  line-height: 1.8;
  color: var(--muted);
}

.case-card__note {
  padding-top: 10px;
  border-top: 1px dashed var(--line);
  font-size: 11px;
}

@media (max-width: 1024px) {
  .industry-block {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .industry-visual {
    max-width: 480px;
  }
}

@media (max-width: 700px) {
  .industry-columns {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .industry-visual {
    max-width: none;
  }
}
</style>
