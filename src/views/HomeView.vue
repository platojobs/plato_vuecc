<script setup>
import { computed } from 'vue'
import {
  capabilities,
  hero,
  homeCta,
  industries,
  products,
  stats,
  statsNote,
  workMethod,
} from '@/data/site'
import SectionHead from '@/components/SectionHead.vue'
import ProductCard from '@/components/ProductCard.vue'
import PlaceholderGraphic from '@/components/PlaceholderGraphic.vue'
import CtaBanner from '@/components/CtaBanner.vue'

const featuredProducts = computed(() => {
  const picks = ['edgehub', 'flowlens', 'beaconops', 'scenekit']
  return picks.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean)
})
const featuredIndustries = computed(() => industries.slice(0, 6))
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero__grid" aria-hidden="true"></div>
      <div class="hero__glow" aria-hidden="true"></div>

      <div class="container hero__inner">
        <div class="hero__copy">
          <span class="eyebrow eyebrow--light" v-reveal>{{ hero.eyebrow }}</span>
          <h1 class="hero__title" v-reveal="80">{{ hero.title }}</h1>
          <p class="hero__desc" v-reveal="160">{{ hero.description }}</p>

          <div class="hero__actions" v-reveal="220">
            <RouterLink class="btn btn--accent" :to="hero.primaryCta.to">
              {{ hero.primaryCta.label }}
              <svg class="btn__arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
            </RouterLink>
            <RouterLink class="btn btn--outline-light" :to="hero.secondaryCta.to">
              {{ hero.secondaryCta.label }}
            </RouterLink>
          </div>

          <ul class="hero__keywords" v-reveal="280">
            <li v-for="keyword in hero.keywords" :key="keyword">{{ keyword }}</li>
          </ul>
        </div>

        <div class="hero__visual" v-reveal="180">
          <div class="visual-ring" aria-hidden="true"></div>
          <div class="visual-frame">
            <PlaceholderGraphic :tone="2" />
            <span class="visual-frame__label">现场视图 · 占位图形</span>
          </div>

          <div class="visual-card">
            <div class="visual-card__head">
              <span>现场状态</span>
              <span class="visual-card__dot"></span>
            </div>
            <div class="visual-card__row">
              <span>接入设备</span>
              <strong>128 <em>台</em></strong>
            </div>
            <div class="visual-card__row">
              <span>链路延迟</span>
              <strong>42 <em>ms</em></strong>
            </div>
            <div class="visual-card__row">
              <span>待处理告警</span>
              <strong class="is-accent">3 <em>条</em></strong>
            </div>
            <p class="visual-card__note">示例数据 · 仅用于界面演示</p>
          </div>

          <div class="visual-chip">
            <span>EDGE</span>
            <span>DATA</span>
            <span>OPS</span>
          </div>
        </div>
      </div>
    </section>

    <div class="hero-strip-wrap">
      <div class="container">
        <div class="hero-strip">
          <div v-for="badge in hero.badges" :key="badge.label" class="hero-strip__item">
            <span class="hero-strip__label">{{ badge.label }}</span>
            <span class="hero-strip__value">{{ badge.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Capabilities -->
    <section class="section capabilities">
      <div class="container">
        <SectionHead
          eyebrow="CAPABILITIES"
          title="四层能力，一条能跑通的链路"
          lead="从设备接入到远程运维，每一层都只解决一类问题。分层不是为了好看，而是为了让每一段都能被单独验证。"
        />

        <div class="capability-grid">
          <article
            v-for="(item, index) in capabilities"
            :key="item.index"
            class="capability-card"
            v-reveal="index * 70"
          >
            <div class="capability-card__index">{{ item.index }}</div>
            <div>
              <h3 class="capability-card__title">{{ item.title }}</h3>
              <p class="capability-card__subtitle">{{ item.subtitle }}</p>
            </div>
            <p class="capability-card__desc">{{ item.description }}</p>
            <ul class="capability-card__points">
              <li v-for="point in item.points" :key="point">{{ point }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section class="section products">
      <div class="container">
        <SectionHead
          eyebrow="PRODUCTS"
          title="按场景组合出的产品模块"
          lead="每个模块只覆盖一段能力，可以单独使用，也可以组合成完整链路。以下名称与描述均为原创示例。"
        >
          <template #action>
            <RouterLink class="link-arrow" to="/products">
              查看全部 {{ products.length }} 个模块
              <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
            </RouterLink>
          </template>
        </SectionHead>

        <div class="product-grid">
          <ProductCard
            v-for="(product, index) in featuredProducts"
            :key="product.slug"
            :product="product"
            v-reveal="index * 60"
          />
        </div>
      </div>
    </section>

    <!-- Industries -->
    <section class="section industries">
      <div class="container">
        <SectionHead
          eyebrow="INDUSTRIES"
          title="先理解现场，再谈方案"
          lead="不同行业的设备、网络和人员习惯都不一样。下面列出的只是示例场景，用来展示信息如何组织。"
        >
          <template #action>
            <RouterLink class="link-arrow" to="/industries">
              浏览行业应用
              <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
            </RouterLink>
          </template>
        </SectionHead>

        <div class="industry-grid">
          <RouterLink
            v-for="(industry, index) in featuredIndustries"
            :key="industry.id"
            class="industry-row"
            to="/industries"
            v-reveal="index * 50"
          >
            <span class="industry-row__index">0{{ index + 1 }}</span>
            <div class="industry-row__main">
              <div class="industry-row__title">
                <h3>{{ industry.name }}</h3>
                <span>{{ industry.nameEn }}</span>
              </div>
              <p>{{ industry.scene }}</p>
            </div>
            <span class="industry-row__arrow" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
            </span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="section stats-section">
      <div class="container">
        <SectionHead
          eyebrow="AT A GLANCE"
          title="一些用于占位的数字"
          lead="这些数字只描述本项目骨架本身，用来展示数据排版的节奏，不代表任何真实业务指标。"
          light
        />

        <div class="stat-grid">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="stat-item"
            v-reveal="index * 60"
          >
            <div class="stat-item__value">
              {{ stat.value }}<span class="stat-item__unit">{{ stat.unit }}</span>
            </div>
            <div class="stat-item__label">{{ stat.label }}</div>
            <p class="stat-item__desc">{{ stat.description }}</p>
          </div>
        </div>

        <p class="stats-note">{{ statsNote }}</p>
      </div>
    </section>

    <!-- Method -->
    <section class="section method">
      <div class="container">
        <SectionHead
          eyebrow="HOW WE WORK"
          title="把大目标拆成能验证的小步骤"
          lead="方法并不复杂，难的是每一步都留下可检查的结果。以下四步是我们虚构的工作方式。"
        />

        <div class="method-track">
          <div
            v-for="(step, index) in workMethod"
            :key="step.index"
            class="method-step"
            v-reveal="index * 70"
          >
            <div class="method-step__num">{{ step.index }}</div>
            <h3 class="method-step__title">{{ step.title }}</h3>
            <p class="method-step__desc">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <CtaBanner :content="homeCta" />
  </div>
</template>

<style scoped>
/* Hero */
.hero {
  position: relative;
  overflow: hidden;
  padding: clamp(56px, 8vw, 96px) 0 0;
  background: var(--night);
  color: var(--paper);
}

.hero__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(244, 241, 234, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(244, 241, 234, 0.045) 1px, transparent 1px);
  background-size: 78px 78px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), transparent 85%);
  -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), transparent 85%);
}

.hero__glow {
  position: absolute;
  top: -180px;
  right: -80px;
  width: 620px;
  height: 620px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(196, 104, 63, 0.26), transparent 62%);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  padding-bottom: clamp(64px, 8vw, 92px);
}

.hero__title {
  margin-top: 22px;
  font-size: clamp(38px, 5.6vw, 72px);
  line-height: 1.1;
  letter-spacing: -0.035em;
  white-space: pre-line;
}

.hero__desc {
  max-width: 520px;
  margin-top: 24px;
  font-size: 16px;
  line-height: 1.85;
  color: rgba(244, 241, 234, 0.66);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.hero__keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: rgba(244, 241, 234, 0.5);
}

.hero__keywords li {
  position: relative;
  padding-left: 14px;
}

.hero__keywords li::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  transform: translateY(-50%);
}

.hero__visual {
  position: relative;
  min-height: 440px;
  padding: 34px;
}

.visual-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 104%;
  aspect-ratio: 1;
  border: 1px dashed rgba(244, 241, 234, 0.16);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.visual-frame {
  position: relative;
  display: flex;
  flex-direction: column;
  aspect-ratio: 5 / 4;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.35);
  transform: rotate(-2deg);
  animation: float 9s ease-in-out infinite;
}

.visual-frame__label {
  position: absolute;
  right: 16px;
  top: 14px;
  padding: 4px 10px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.75);
  background: rgba(13, 26, 36, 0.25);
  backdrop-filter: blur(6px);
}

.visual-card {
  position: absolute;
  right: -8px;
  bottom: -26px;
  width: min(272px, 82%);
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--ink);
  box-shadow: 0 22px 48px rgba(0, 0, 0, 0.28);
}

.visual-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.visual-card__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4f9c7f;
  box-shadow: 0 0 0 4px rgba(79, 156, 127, 0.16);
}

.visual-card__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 9px 0;
  font-size: 13px;
  color: var(--ink-soft);
}

.visual-card__row strong {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  color: var(--ink);
}

.visual-card__row strong em {
  font-family: var(--font-sans);
  font-size: 11px;
  font-style: normal;
  color: var(--muted);
}

.visual-card__row strong.is-accent {
  color: var(--accent);
}

.visual-card__note {
  margin-top: 8px;
  padding-top: 10px;
  border-top: 1px dashed var(--line);
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.visual-chip {
  position: absolute;
  top: 0;
  right: 6px;
  display: flex;
  gap: 6px;
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.14em;
}

.visual-chip span {
  padding: 5px 9px;
  border: 1px solid rgba(244, 241, 234, 0.2);
  border-radius: 6px;
  color: rgba(244, 241, 234, 0.6);
}

.hero-strip-wrap {
  position: relative;
  z-index: 2;
  margin-top: -46px;
}

.hero-strip {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid rgba(244, 241, 234, 0.14);
  border-radius: var(--radius);
  background: var(--surface);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.hero-strip__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 22px 26px;
  color: var(--ink);
}

.hero-strip__item + .hero-strip__item {
  border-left: 1px solid var(--line);
}

.hero-strip__label {
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--accent);
  text-transform: uppercase;
}

.hero-strip__value {
  font-size: 15px;
  font-weight: 600;
}

@keyframes float {
  0%,
  100% {
    transform: rotate(-2deg) translateY(0);
  }
  50% {
    transform: rotate(-1deg) translateY(-10px);
  }
}

/* Capabilities */
.capability-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.capability-card {
  display: flex;
  flex-direction: column;
  padding: 26px 22px 28px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.capability-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-sm);
}

.capability-card__index {
  margin-bottom: 34px;
  font-family: var(--font-display);
  font-size: 26px;
  color: var(--accent);
  line-height: 1;
}

.capability-card__title {
  font-size: 18px;
}

.capability-card__subtitle {
  margin-top: 4px;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.capability-card__desc {
  margin-top: 16px;
  font-size: 13.5px;
  line-height: 1.85;
  color: var(--ink-soft);
}

.capability-card__points {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  padding-top: 22px;
}

.capability-card__points li {
  position: relative;
  padding-left: 14px;
  font-size: 12.5px;
  color: var(--muted);
}

.capability-card__points li::before {
  content: "";
  position: absolute;
  top: 9px;
  left: 0;
  width: 6px;
  height: 1px;
  background: var(--accent);
}

/* Products */
.products {
  background: var(--paper-deep);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

/* Industries */
.industry-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 48px;
  border-top: 1px solid var(--line);
}

.industry-row {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 26px 4px;
  border-bottom: 1px solid var(--line);
  transition: background 0.25s ease, padding-left 0.25s ease;
}

.industry-row:hover {
  background: rgba(255, 253, 248, 0.55);
  padding-left: 12px;
}

.industry-row__index {
  padding-top: 3px;
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--accent);
}

.industry-row__main {
  flex: 1;
}

.industry-row__title {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px;
}

.industry-row__title h3 {
  font-size: 18px;
}

.industry-row__title span {
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.industry-row__main p {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.75;
  color: var(--muted);
}

.industry-row__arrow {
  margin-top: 4px;
  color: var(--muted);
  transition: transform 0.25s ease, color 0.25s ease;
}

.industry-row:hover .industry-row__arrow {
  transform: translateX(4px);
  color: var(--accent);
}

/* Stats */
.stats-section {
  background: var(--brand);
  color: var(--paper);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.stat-item {
  padding: 26px 0 0;
  border-top: 1px solid rgba(244, 241, 234, 0.2);
}

.stat-item__value {
  font-family: var(--font-display);
  font-size: clamp(44px, 5vw, 64px);
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--paper);
}

.stat-item__unit {
  margin-left: 6px;
  font-family: var(--font-sans);
  font-size: 13px;
  color: rgba(244, 241, 234, 0.55);
}

.stat-item__label {
  margin-top: 14px;
  font-size: 14px;
  font-weight: 600;
}

.stat-item__desc {
  margin-top: 8px;
  font-size: 12.5px;
  line-height: 1.75;
  color: rgba(244, 241, 234, 0.55);
}

.stats-note {
  margin-top: 40px;
  font-size: 11.5px;
  letter-spacing: 0.03em;
  color: rgba(244, 241, 234, 0.42);
}

/* Method */
.method-track {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.method-step {
  position: relative;
  padding-top: 26px;
  border-top: 1px solid var(--line-strong);
}

.method-step::before {
  content: "";
  position: absolute;
  top: -5px;
  left: 0;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--accent);
}

.method-step__num {
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--accent);
}

.method-step__title {
  margin-top: 12px;
  font-size: 19px;
}

.method-step__desc {
  margin-top: 10px;
  font-size: 13.5px;
  line-height: 1.85;
  color: var(--muted);
}

@media (max-width: 1024px) {
  .capability-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px 24px;
  }

  .method-track {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px 24px;
  }
}

@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: 1fr;
  }

  .hero__visual {
    display: none;
  }

  .hero-strip-wrap {
    margin-top: -36px;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }

  .industry-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .hero {
    padding-top: 48px;
  }

  .hero__actions .btn {
    flex: 1;
    min-width: 150px;
  }

  .hero-strip {
    grid-template-columns: 1fr;
  }

  .hero-strip-wrap {
    margin-top: -28px;
  }

  .hero-strip__item + .hero-strip__item {
    border-left: none;
    border-top: 1px solid var(--line);
  }

  .capability-grid,
  .stat-grid,
  .method-track {
    grid-template-columns: 1fr;
  }

  .industry-row {
    padding: 20px 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .visual-frame {
    animation: none;
  }
}
</style>
