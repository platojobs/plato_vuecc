<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { searchIndex } from '@/data/site'

const props = defineProps({
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])
const router = useRouter()

const query = ref('')
const activeIndex = ref(0)
const inputRef = ref(null)
let previousFocus = null

const hotSearches = ['设备接入', '数据观测', '现场运维', '行业场景', '常见问题']

function normalize(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[\s\u3000·\-_/,，。；：、！？（）()【】「」'"“”]+/g, '')
}

function isSubsequence(haystack, needle) {
  if (!needle) return false
  let cursor = 0
  for (const char of haystack) {
    if (char === needle[cursor]) cursor += 1
    if (cursor === needle.length) return true
  }
  return false
}

function scoreEntry(entry, rawQuery) {
  const tokens = rawQuery.toLowerCase().split(/\s+/).filter(Boolean)
  if (!tokens.length) return 0

  const title = normalize(entry.title)
  const titleEn = normalize(entry.titleEn)
  const tags = normalize((entry.tags ?? []).join(' '))
  const summary = normalize(entry.summary)
  let score = 0

  for (const rawToken of tokens) {
    const token = normalize(rawToken)
    if (!token) continue
    if (title.includes(token)) score += 14
    else if (titleEn.includes(token)) score += 12
    else if (tags.includes(token)) score += 8
    else if (summary.includes(token)) score += 5
    else if (
      isSubsequence(title, token) ||
      isSubsequence(titleEn, token) ||
      isSubsequence(tags, token)
    ) {
      score += 3
    } else {
      return 0
    }
  }

  if (normalize(entry.type).includes(normalize(rawQuery))) score += 4
  return score
}

const results = computed(() => {
  const rawQuery = query.value.trim()
  if (!rawQuery) return []

  return searchIndex
    .map((entry) => ({ entry, score: scoreEntry(entry, rawQuery) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 9)
    .map((item) => item.entry)
})

watch(
  () => props.open,
  async (open) => {
    if (open) {
      previousFocus = document.activeElement
      query.value = ''
      activeIndex.value = 0
      await nextTick()
      inputRef.value?.focus()
    } else if (previousFocus) {
      previousFocus.focus?.()
      previousFocus = null
    }
  },
)

watch(query, () => {
  activeIndex.value = 0
})

function close() {
  emit('close')
}

function fillQuery(keyword) {
  query.value = keyword
  nextTick(() => inputRef.value?.focus())
}

function moveActive(delta) {
  if (!results.value.length) return
  const total = results.value.length
  activeIndex.value = (activeIndex.value + delta + total) % total
  nextTick(() => {
    document
      .getElementById(`search-option-${activeIndex.value}`)
      ?.scrollIntoView({ block: 'nearest' })
  })
}

function goActive() {
  const entry = results.value[activeIndex.value]
  if (!entry) return
  router.push(entry.to)
  close()
}

function handleInputKeydown(event) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveActive(1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveActive(-1)
  } else if (event.key === 'Enter') {
    event.preventDefault()
    goActive()
  } else if (event.key === 'Escape') {
    event.preventDefault()
    close()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="search">
      <div v-if="open" class="search-layer" @keydown.esc.prevent="close">
        <div class="search-backdrop" aria-hidden="true" @click="close"></div>

        <section
          class="search-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-dialog-title"
        >
          <h2 id="search-dialog-title" class="sr-only">站内搜索</h2>

          <div class="search-input-row">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.2" fill="none" stroke="currentColor" stroke-width="1.6" />
              <path
                d="m15.2 15.2 4.6 4.6"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </svg>
            <input
              ref="inputRef"
              v-model="query"
              class="search-input"
              type="search"
              role="combobox"
              aria-expanded="true"
              aria-controls="search-results"
              :aria-activedescendant="
                query.trim() && results.length ? `search-option-${activeIndex}` : undefined
              "
              autocomplete="off"
              placeholder="搜索产品、方案、行业或常见问题"
              @keydown="handleInputKeydown"
            />
            <button class="search-close" type="button" aria-label="关闭搜索" @click="close">
              关闭
              <span>Esc</span>
            </button>
          </div>

          <div class="search-body">
            <template v-if="query.trim()">
              <div v-if="results.length" class="search-results-wrap">
                <p class="search-count">
                  找到 <strong>{{ results.length }}</strong> 条相关内容
                </p>
                <ul id="search-results" class="search-results" role="listbox" aria-live="polite">
                  <li
                    v-for="(entry, index) in results"
                    :key="`${entry.type}-${entry.title}`"
                    class="search-result"
                    :class="{ 'is-active': activeIndex === index }"
                    role="presentation"
                    @mouseenter="activeIndex = index"
                  >
                    <RouterLink
                      :id="`search-option-${index}`"
                      class="search-result__link"
                      :to="entry.to"
                      role="option"
                      :aria-selected="activeIndex === index"
                      @click="close"
                    >
                      <span class="search-result__type">{{ entry.type }}</span>
                      <span class="search-result__main">
                        <strong class="search-result__title">{{ entry.title }}</strong>
                        <span class="search-result__summary">{{ entry.summary }}</span>
                      </span>
                      <svg
                        class="search-result__arrow"
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                        />
                      </svg>
                    </RouterLink>
                  </li>
                </ul>
              </div>

              <div v-else class="search-empty">
                <p class="search-empty__title">没有找到与“{{ query.trim() }}”相关的内容</p>
                <p class="search-empty__desc">
                  可以换一个更具体的设备、行业或能力名称，也可以直接从下面的入口继续浏览。
                </p>
                <div class="search-empty__actions">
                  <RouterLink class="btn btn--primary" to="/products" @click="close">
                    浏览产品与方案
                  </RouterLink>
                  <RouterLink class="btn btn--ghost" to="/industries" @click="close">
                    查看行业应用
                  </RouterLink>
                  <RouterLink class="btn btn--ghost" to="/contact" @click="close">
                    描述我的场景
                  </RouterLink>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="search-idle">
                <p class="search-idle__label">常用搜索</p>
                <div class="search-chips">
                  <button
                    v-for="keyword in hotSearches"
                    :key="keyword"
                    class="search-chip"
                    type="button"
                    @click="fillQuery(keyword)"
                  >
                    {{ keyword }}
                  </button>
                </div>
              </div>

              <div class="search-quick">
                <p class="search-idle__label">快速前往</p>
                <div class="search-quick__links">
                  <RouterLink to="/products" @click="close">产品与解决方案</RouterLink>
                  <RouterLink to="/industries" @click="close">行业应用</RouterLink>
                  <RouterLink to="/insights" @click="close">洞察</RouterLink>
                  <RouterLink to="/faq" @click="close">常见问题</RouterLink>
                </div>
              </div>
            </template>
          </div>

          <div class="search-foot">
            <span><kbd>↑</kbd><kbd>↓</kbd> 选择</span>
            <span><kbd>Enter</kbd> 打开</span>
            <span><kbd>Esc</kbd> 关闭</span>
            <span class="search-foot__count">站内共 {{ searchIndex.length }} 条内容</span>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.search-layer {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  justify-content: center;
  padding: 12vh 24px 24px;
}

.search-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(8, 15, 19, 0.62);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.search-panel {
  position: relative;
  width: min(660px, 100%);
  max-height: min(620px, 76vh);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.36);
}

.search-input-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  padding: 16px 18px;
  border-bottom: 1px solid var(--line);
}

.search-icon {
  flex-shrink: 0;
  color: var(--muted);
}

.search-input {
  flex: 1;
  min-width: 0;
  padding: 6px 0;
  border: 0;
  background: transparent;
  font-size: 16px;
  outline: none;
}

.search-input::-webkit-search-cancel-button {
  display: none;
}

.search-close {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: transparent;
  font-size: 12px;
  color: var(--muted);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.search-close:hover {
  border-color: var(--line-strong);
  color: var(--ink);
}

.search-close span {
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.06em;
  opacity: 0.65;
}

.search-body {
  flex: 1;
  overflow-y: auto;
  padding: 18px;
}

.search-count {
  padding: 0 4px 12px;
  font-size: 12px;
  color: var(--muted);
}

.search-count strong {
  font-family: var(--font-display);
  color: var(--ink);
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.search-result {
  border-radius: 11px;
  transition: background 0.18s ease;
}

.search-result.is-active {
  background: var(--accent-soft);
}

.search-result__link {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 12px;
  border-radius: 11px;
}

.search-result__type {
  flex-shrink: 0;
  min-width: 52px;
  margin-top: 2px;
  padding: 2px 8px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 10.5px;
  letter-spacing: 0.06em;
  color: var(--muted);
  text-align: center;
}

.search-result.is-active .search-result__type {
  border-color: rgba(196, 104, 63, 0.32);
  color: var(--accent);
}

.search-result__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.search-result__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}

.search-result__summary {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 12px;
  line-height: 1.55;
  color: var(--muted);
}

.search-result__arrow {
  flex-shrink: 0;
  margin-top: 3px;
  color: var(--muted);
  opacity: 0;
  transform: translateX(-3px);
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.search-result.is-active .search-result__arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--accent);
}

.search-result:focus-within {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.search-result__link:focus-visible {
  outline: none;
}

.search-empty {
  padding: 20px 10px 26px;
}

.search-empty__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--ink);
}

.search-empty__desc {
  max-width: 420px;
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.75;
  color: var(--muted);
}

.search-empty__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.search-empty__actions .btn {
  padding: 10px 16px;
  font-size: 13px;
}

.search-idle__label {
  padding: 0 4px;
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.search-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.search-chip {
  padding: 7px 13px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  font-size: 12.5px;
  color: var(--ink-soft);
  transition: border-color 0.2s ease, color 0.2s ease;
}

.search-chip:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.search-quick {
  margin-top: 28px;
}

.search-quick__links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-top: 12px;
}

.search-quick__links a {
  padding: 11px 13px;
  border: 1px solid var(--line);
  border-radius: 10px;
  font-size: 13px;
  color: var(--ink-soft);
  transition: background 0.2s ease, border-color 0.2s ease;
}

.search-quick__links a:hover {
  border-color: var(--line-strong);
  background: var(--hover-soft);
}

.search-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
  padding: 11px 18px;
  border-top: 1px solid var(--line);
  font-size: 11px;
  color: var(--muted);
}

.search-foot span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.search-foot kbd {
  padding: 1px 5px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--paper);
  font-family: var(--font-display);
  font-size: 10px;
  color: var(--muted);
}

.search-foot__count {
  margin-left: auto;
  letter-spacing: 0.03em;
}

.search-enter-active,
.search-leave-active {
  transition: opacity 0.22s ease;
}

.search-enter-active .search-panel,
.search-leave-active .search-panel {
  transition: transform 0.22s ease, opacity 0.22s ease;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
}

.search-enter-from .search-panel,
.search-leave-to .search-panel {
  transform: translateY(-10px) scale(0.99);
  opacity: 0;
}

@media (max-width: 640px) {
  .search-layer {
    padding: 0;
    align-items: flex-start;
  }

  .search-panel {
    width: 100%;
    max-height: 100dvh;
    min-height: 100dvh;
    border-radius: 0;
    border: 0;
  }

  .search-input-row {
    padding: 14px 16px;
  }

  .search-body {
    padding: 14px;
  }

  .search-close span {
    display: none;
  }

  .search-result__type {
    min-width: 46px;
    padding: 2px 6px;
  }

  .search-quick__links {
    grid-template-columns: 1fr;
  }

  .search-foot {
    gap: 10px;
    padding: 10px 16px;
  }

  .search-foot__count {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .search-enter-active,
  .search-leave-active,
  .search-enter-active .search-panel,
  .search-leave-active .search-panel,
  .search-result,
  .search-result__arrow {
    transition: none;
  }
}
</style>
