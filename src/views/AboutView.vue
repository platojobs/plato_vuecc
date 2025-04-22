<script setup>
import { about, brand } from '@/data/site'
import BrandMark from '@/components/BrandMark.vue'
import CtaBanner from '@/components/CtaBanner.vue'

const aboutCta = {
  eyebrow: 'GET IN TOUCH',
  title: '想聊产品，也可以先聊问题',
  description:
    '无论你正在评估一个具体的接入场景，还是想了解我们的方案边界，都欢迎通过联系页面留言。我们会先做初步判断，再安排后续沟通。',
  primaryCta: { label: '前往联系我们', to: '/contact' },
  secondaryCta: { label: '浏览产品模块', to: '/products' },
}

const scope = {
  done: [
    '现场调研与约束条件梳理',
    '设备接入与协议适配实施',
    '数据链路、状态看板与告警策略',
    '操作流程、交接文档与持续支持',
  ],
  todo: [
    '设备与网络条件的现场配合',
    '既有系统的接口开放范围',
    '业务规则确认与验收标准',
    '上线后的日常值守安排',
  ],
}
</script>

<template>
  <div class="about-page">
    <section class="page-head">
      <div class="container">
        <span class="eyebrow" v-reveal>{{ about.eyebrow }}</span>
        <h1 class="page-head__title" v-reveal="60">{{ about.title }}</h1>
        <p class="page-head__lead" v-reveal="120">{{ about.lead }}</p>
      </div>
    </section>

    <section class="section section--tight intro">
      <div class="container intro-grid">
        <div class="intro-copy">
          <p v-for="(paragraph, index) in about.paragraphs" :key="index" v-reveal="index * 60">
            {{ paragraph }}
          </p>
        </div>

        <aside class="identity-card" v-reveal="80">
          <div class="identity-card__art" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="86" stroke="rgba(244,241,234,0.18)" />
              <circle cx="100" cy="100" r="62" stroke="rgba(244,241,234,0.22)" />
              <path d="M100 14v172M14 100h172" stroke="rgba(244,241,234,0.12)" />
              <circle cx="152" cy="48" r="5" fill="#c4683f" />
            </svg>
          </div>
          <div class="identity-card__logo">
            <BrandMark tone="light" :size="42" />
            <div>
              <strong>{{ brand.name }}</strong>
              <span>{{ brand.nameEn }}</span>
            </div>
          </div>
          <p class="identity-card__slogan">{{ brand.slogan }}</p>
          <div class="identity-card__stack">
            <span v-for="item in about.stack" :key="item">{{ item }}</span>
          </div>
          <p class="identity-card__note">EDGE · DATA · OPS</p>
        </aside>
      </div>
    </section>

    <section class="section principles">
      <div class="container">
        <span class="eyebrow" v-reveal>PRINCIPLES</span>
        <h2 class="section-title" v-reveal="60">我们坚持的三条原则</h2>

        <div class="principle-grid">
          <article
            v-for="(item, index) in about.principles"
            :key="item.index"
            class="principle-card"
            v-reveal="index * 70"
          >
            <span class="principle-card__index">{{ item.index }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section roadmap">
      <div class="container">
        <div class="roadmap-head">
          <div>
            <span class="eyebrow" v-reveal>DELIVERY</span>
            <h2 class="section-title" v-reveal="60">从评估到推广的推进节奏</h2>
          </div>
          <p class="roadmap-note" v-reveal="80">{{ about.roadmapNote }}</p>
        </div>

        <div class="roadmap-list">
          <article
            v-for="(item, index) in about.roadmap"
            :key="item.phase"
            class="roadmap-item"
            v-reveal="index * 70"
          >
            <div class="roadmap-item__top">
              <span class="roadmap-item__phase">{{ item.phase }}</span>
              <span
                class="roadmap-item__status"
                :class="{ 'is-active': item.status === '进行中' }"
              >
                {{ item.status }}
              </span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <span class="roadmap-item__line" aria-hidden="true"></span>
          </article>
        </div>
      </div>
    </section>

    <section class="section team">
      <div class="container team-grid">
        <div class="team-intro">
          <span class="eyebrow" v-reveal>TEAM</span>
          <h2 class="section-title" v-reveal="60">团队构成</h2>
          <p class="section-lead" v-reveal="100">
            项目由三类角色共同推进，从现场调研到交付交接保持同一套判断标准。
          </p>
        </div>

        <div class="team-roles">
          <div
            v-for="(role, index) in about.team"
            :key="role.role"
            class="team-role"
            v-reveal="index * 60"
          >
            <span class="team-role__index">0{{ index + 1 }}</span>
            <h3>{{ role.role }}</h3>
            <p>{{ role.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <div class="scope-card" v-reveal>
          <div class="scope-card__head">
            <span class="eyebrow">ENGAGEMENT</span>
            <h2 class="section-title">我们的工作边界</h2>
          </div>
          <div class="scope-columns">
            <div class="scope-column">
              <h3>我们负责</h3>
              <ul>
                <li v-for="item in scope.done" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="scope-column scope-column--muted">
              <h3>需要共同确认</h3>
              <ul>
                <li v-for="item in scope.todo" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CtaBanner :content="aboutCta" />
  </div>
</template>

<style scoped>
.intro-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.8fr);
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

.intro-copy {
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 15px;
  line-height: 1.95;
  color: var(--ink-soft);
}

.identity-card {
  position: relative;
  overflow: hidden;
  padding: 28px 26px 24px;
  border-radius: var(--radius-lg);
  background: var(--brand);
  color: var(--paper);
}

.identity-card__art {
  position: absolute;
  top: -70px;
  right: -80px;
  width: 260px;
  height: 260px;
  pointer-events: none;
}

.identity-card__art svg {
  width: 100%;
  height: 100%;
}

.identity-card__logo {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
}

.identity-card__logo strong {
  display: block;
  font-size: 18px;
  font-weight: 650;
}

.identity-card__logo span {
  display: block;
  margin-top: 2px;
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: rgba(244, 241, 234, 0.5);
}

.identity-card__slogan {
  position: relative;
  margin-top: 22px;
  font-family: var(--font-display);
  font-size: 19px;
  line-height: 1.5;
  color: rgba(244, 241, 234, 0.92);
}

.identity-card__stack {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}

.identity-card__stack span {
  padding: 4px 10px;
  border: 1px solid rgba(244, 241, 234, 0.22);
  border-radius: 999px;
  font-size: 11px;
  color: rgba(244, 241, 234, 0.72);
}

.identity-card__note {
  position: relative;
  margin-top: 22px;
  padding-top: 14px;
  border-top: 1px solid rgba(244, 241, 234, 0.16);
  font-size: 10.5px;
  letter-spacing: 0.04em;
  color: rgba(244, 241, 234, 0.45);
}

.principles {
  background: var(--paper-deep);
}

.principle-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: clamp(28px, 4vw, 44px);
}

.principle-card {
  padding: 28px 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.principle-card:hover {
  transform: translateY(-4px);
  border-color: var(--line-strong);
  box-shadow: var(--shadow-sm);
}

.principle-card__index {
  font-family: var(--font-display);
  font-size: 24px;
  color: var(--accent);
}

.principle-card h3 {
  margin-top: 30px;
  font-size: 19px;
}

.principle-card p {
  margin-top: 12px;
  font-size: 13.5px;
  line-height: 1.85;
  color: var(--muted);
}

.roadmap-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 40px;
}

.roadmap-note {
  max-width: 300px;
  font-size: 11.5px;
  line-height: 1.7;
  color: var(--muted);
}

.roadmap-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.roadmap-item {
  position: relative;
  padding: 24px 22px 28px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.roadmap-item:hover {
  transform: translateY(-4px);
  border-color: var(--line-strong);
  box-shadow: var(--shadow-sm);
}

.roadmap-item__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.roadmap-item__phase {
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--muted);
}

.roadmap-item__status {
  padding: 2px 9px;
  border-radius: 999px;
  background: var(--paper-deep);
  font-size: 10.5px;
  color: var(--muted);
}

.roadmap-item__status.is-active {
  background: var(--accent-soft);
  color: var(--accent);
}

.roadmap-item h3 {
  margin-top: 16px;
  font-size: 19px;
}

.roadmap-item p {
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.8;
  color: var(--muted);
}

.roadmap-item__line {
  position: absolute;
  left: 22px;
  bottom: 0;
  width: 36px;
  height: 2px;
  background: var(--accent);
  opacity: 0.5;
}

.team {
  background: var(--paper-deep);
}

.team-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.4fr);
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

.section-lead {
  max-width: 420px;
}

.team-roles {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--line-strong);
}

.team-role {
  display: grid;
  grid-template-columns: 40px minmax(0, 0.6fr) minmax(0, 1fr);
  gap: 18px;
  align-items: baseline;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
}

.team-role__index {
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--accent);
}

.team-role h3 {
  font-size: 16px;
}

.team-role p {
  font-size: 13px;
  line-height: 1.75;
  color: var(--muted);
}

.scope-card {
  padding: clamp(28px, 4vw, 40px);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.scope-card__head h2 {
  margin-top: 12px;
  font-size: clamp(26px, 3vw, 34px);
}

.scope-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  margin-top: 28px;
}

.scope-column h3 {
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--success);
}

.scope-column--muted h3 {
  color: var(--muted);
}

.scope-column ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
}

.scope-column li {
  position: relative;
  padding-left: 20px;
  font-size: 13px;
  line-height: 1.7;
  color: var(--ink-soft);
}

.scope-column li::before {
  content: "";
  position: absolute;
  top: 9px;
  left: 0;
  width: 7px;
  height: 7px;
  border: 1px solid var(--success);
  border-radius: 50%;
}

.scope-column--muted li::before {
  border-color: var(--line-strong);
}

@media (max-width: 1024px) {
  .intro-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }

  .principle-grid,
  .roadmap-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .identity-card {
    max-width: 420px;
  }
}

@media (max-width: 700px) {
  .principle-grid,
  .roadmap-list,
  .scope-columns {
    grid-template-columns: 1fr;
  }

  .team-role {
    grid-template-columns: 28px 1fr;
    gap: 6px 14px;
  }

  .team-role p {
    grid-column: 2;
  }

  .identity-card {
    max-width: none;
  }
}
</style>
