<script setup>
import PlaceholderGraphic from '@/components/PlaceholderGraphic.vue'

function openSearch() {
  window.dispatchEvent(new CustomEvent('plato:search'))
}
</script>

<template>
  <section class="not-found">
    <div class="not-found__grid" aria-hidden="true"></div>
    <div class="container not-found__inner">
      <div class="not-found__copy">
        <span class="eyebrow eyebrow--light">404 / NOT FOUND</span>
        <h1 class="not-found__title">这个页面走丢了</h1>
        <p class="not-found__desc">
          链接可能已经失效，或者地址里有一个小小的拼写错误。你可以回到首页重新开始，浏览产品列表，或者直接用站内搜索查找具体内容。
        </p>
        <div class="not-found__actions">
          <RouterLink class="btn btn--light" to="/">回到首页</RouterLink>
          <RouterLink class="btn btn--outline-light" to="/products">浏览产品</RouterLink>
          <button class="btn btn--outline-light" type="button" @click="openSearch">
            搜索站内内容
          </button>
        </div>

        <nav class="not-found__links" aria-label="常用页面">
          <span>也可能想找：</span>
          <RouterLink to="/industries">行业应用</RouterLink>
          <RouterLink to="/insights">洞察</RouterLink>
          <RouterLink to="/faq">常见问题</RouterLink>
          <RouterLink to="/contact">联系我们</RouterLink>
        </nav>
      </div>

      <div class="not-found__visual" aria-hidden="true">
        <span class="not-found__code">404</span>
        <div class="not-found__frame">
          <PlaceholderGraphic :tone="4" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  position: relative;
  overflow: hidden;
  padding: clamp(72px, 10vw, 130px) 0;
  background: var(--night);
  color: var(--on-dark);
}

.not-found__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(244, 241, 234, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(244, 241, 234, 0.04) 1px, transparent 1px);
  background-size: 84px 84px;
  mask-image: radial-gradient(circle at 30% 40%, rgba(0, 0, 0, 0.9), transparent 75%);
  -webkit-mask-image: radial-gradient(circle at 30% 40%, rgba(0, 0, 0, 0.9), transparent 75%);
}

.not-found__inner {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(32px, 6vw, 80px);
  align-items: center;
}

.not-found__title {
  margin-top: 18px;
  font-size: clamp(34px, 5vw, 60px);
  letter-spacing: -0.03em;
}

.not-found__desc {
  max-width: 460px;
  margin-top: 18px;
  font-size: 15px;
  line-height: 1.85;
  color: rgba(244, 241, 234, 0.62);
}

.not-found__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.not-found__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid rgba(244, 241, 234, 0.14);
  font-size: 12px;
  color: rgba(244, 241, 234, 0.42);
}

.not-found__links a {
  color: rgba(244, 241, 234, 0.72);
  transition: color 0.2s ease;
}

.not-found__links a:hover {
  color: var(--on-dark);
}

.not-found__visual {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 24px;
}

.not-found__code {
  position: absolute;
  top: 50%;
  left: 50%;
  font-family: var(--font-display);
  font-size: clamp(96px, 15vw, 180px);
  line-height: 1;
  letter-spacing: 0.02em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(244, 241, 234, 0.28);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.not-found__frame {
  position: relative;
  width: min(320px, 100%);
  aspect-ratio: 1;
  border-radius: var(--radius-lg);
  overflow: hidden;
  transform: rotate(4deg);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.4);
}

@media (max-width: 900px) {
  .not-found__inner {
    grid-template-columns: 1fr;
  }

  .not-found__visual {
    display: none;
  }
}

@media (max-width: 600px) {
  .not-found__actions .btn {
    flex: 1;
    min-width: 140px;
  }
}
</style>
