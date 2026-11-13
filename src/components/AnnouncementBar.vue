<script setup>
import { computed, ref } from 'vue'
import { announcement } from '@/data/site'

const STORAGE_KEY = `plato-announcement:${announcement.id}`

function readDismissed() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'dismissed'
  } catch (error) {
    return false
  }
}

const visible = ref(!readDismissed())
const hasLink = computed(() => Boolean(announcement.to && announcement.linkLabel))

function dismiss() {
  visible.value = false
  try {
    window.localStorage.setItem(STORAGE_KEY, 'dismissed')
  } catch (error) {
    // 隐私模式下无法写入时仅关闭当前会话。
  }
}
</script>

<template>
  <Transition name="announce">
    <div v-if="visible" class="announcement-bar" role="region" aria-label="站内公告">
      <div class="container announcement-bar__inner">
        <span class="announcement-bar__label">{{ announcement.label }}</span>
        <p class="announcement-bar__text">{{ announcement.text }}</p>
        <RouterLink v-if="hasLink" class="announcement-bar__link" :to="announcement.to">
          {{ announcement.linkLabel }}
          <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            />
          </svg>
        </RouterLink>
        <button
          class="announcement-bar__close"
          type="button"
          aria-label="关闭公告"
          @click="dismiss"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M4 4l8 8M12 4l-8 8"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.announcement-bar {
  position: relative;
  z-index: 49;
  border-bottom: 1px solid var(--line);
  background: linear-gradient(90deg, var(--accent-soft), var(--paper-deep) 58%, var(--paper));
  color: var(--ink-soft);
}

.announcement-bar__inner {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 44px;
  padding: 8px 0;
}

.announcement-bar__label {
  flex-shrink: 0;
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--accent);
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #fff;
}

.announcement-bar__text {
  flex: 1;
  min-width: 0;
  font-size: 13px;
  line-height: 1.5;
}

.announcement-bar__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--link);
}

.announcement-bar__link svg {
  transition: transform 0.25s var(--ease-out);
}

.announcement-bar__link:hover svg {
  transform: translateX(3px);
}

.announcement-bar__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  color: var(--muted);
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.announcement-bar__close:hover {
  border-color: var(--line-strong);
  background: var(--surface);
  color: var(--ink);
}

.announcement-bar__close:focus-visible,
.announcement-bar__link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.announce-enter-active,
.announce-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.announce-enter-from,
.announce-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 600px) {
  .announcement-bar__inner {
    flex-wrap: wrap;
    gap: 8px 10px;
    padding: 10px 0;
  }

  .announcement-bar__text {
    flex-basis: calc(100% - 78px);
    font-size: 12.5px;
  }

  .announcement-bar__link {
    order: 3;
    margin-left: 0;
  }

  .announcement-bar__close {
    order: 4;
    margin-left: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .announce-enter-active,
  .announce-leave-active {
    transition: none;
  }
}
</style>
