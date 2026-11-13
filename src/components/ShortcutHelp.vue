<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const open = ref(false)
const panelRef = ref(null)
const closeRef = ref(null)
let lastFocused = null

const shortcuts = [
  { keys: ['⌘', 'K'], alt: 'Ctrl + K', label: '打开站内搜索' },
  { keys: ['?'], label: '打开或关闭快捷键帮助' },
  { keys: ['Esc'], label: '关闭弹层、菜单或搜索结果' },
  { keys: ['Tab'], label: '在当前区域的控件间移动焦点' },
  { keys: ['Shift', 'Tab'], label: '反向移动焦点' },
]

function isTypingTarget(target) {
  if (!target || typeof target.closest !== 'function') return false
  return Boolean(target.closest('input, textarea, select, [contenteditable="true"]'))
}

function openHelp() {
  if (open.value) return
  lastFocused = document.activeElement
  open.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => closeRef.value?.focus())
}

function closeHelp() {
  if (!open.value) return
  open.value = false
  document.body.style.overflow = ''
  if (lastFocused && typeof lastFocused.focus === 'function') {
    lastFocused.focus()
  }
  lastFocused = null
}

function handleKeydown(event) {
  if (event.defaultPrevented) return

  if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    closeHelp()
    return
  }

  if (event.key !== '?' || event.metaKey || event.ctrlKey || event.altKey) return
  if (isTypingTarget(event.target)) return
  if (!open.value && document.body.style.overflow === 'hidden') return

  event.preventDefault()
  openHelp()
}

function handlePanelKeydown(event) {
  if (event.key !== 'Tab') return
  const nodes = panelRef.value?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )
  if (!nodes?.length) return
  const first = nodes[0]
  const last = nodes[nodes.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

function handleOpenRequest() {
  openHelp()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  window.addEventListener('plato:shortcuts', handleOpenRequest)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('plato:shortcuts', handleOpenRequest)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="help">
      <div v-if="open" class="shortcut-help no-print" @click.self="closeHelp">
        <div
          ref="panelRef"
          class="shortcut-help__panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcut-title"
          @keydown="handlePanelKeydown"
        >
          <div class="shortcut-help__head">
            <div>
              <span class="eyebrow">KEYBOARD</span>
              <h2 id="shortcut-title" class="shortcut-help__title">快捷键</h2>
            </div>
            <button
              ref="closeRef"
              class="shortcut-help__close"
              type="button"
              aria-label="关闭快捷键帮助"
              @click="closeHelp"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
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

          <ul class="shortcut-help__list">
            <li v-for="item in shortcuts" :key="item.label" class="shortcut-help__row">
              <span class="shortcut-help__label">{{ item.label }}</span>
              <span class="shortcut-help__keys">
                <template v-for="(key, index) in item.keys" :key="key">
                  <kbd>{{ key }}</kbd>
                  <span v-if="index < item.keys.length - 1" class="shortcut-help__plus">+</span>
                </template>
                <span v-if="item.alt" class="shortcut-help__alt">或 {{ item.alt }}</span>
              </span>
            </li>
          </ul>

          <p class="shortcut-help__note">
            在页面任意位置按 <kbd>?</kbd> 可再次打开此面板，按 <kbd>Esc</kbd> 关闭。
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.shortcut-help {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(9, 15, 19, 0.52);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.shortcut-help__panel {
  width: min(480px, 100%);
  max-height: calc(100dvh - 48px);
  overflow-y: auto;
  padding: 26px 26px 22px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--lift);
}

.shortcut-help__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.shortcut-help__title {
  margin-top: 10px;
  font-size: 24px;
  letter-spacing: -0.02em;
}

.shortcut-help__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  color: var(--muted);
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.shortcut-help__close:hover {
  border-color: var(--line-strong);
  background: var(--paper-deep);
  color: var(--ink);
}

.shortcut-help__close:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.shortcut-help__list {
  display: flex;
  flex-direction: column;
  margin-top: 6px;
}

.shortcut-help__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 13px 0;
  border-bottom: 1px dashed var(--line);
}

.shortcut-help__row:last-child {
  border-bottom: 0;
}

.shortcut-help__label {
  font-size: 13.5px;
  color: var(--ink-soft);
}

.shortcut-help__keys {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}

.shortcut-help__keys kbd,
.shortcut-help__note kbd {
  min-width: 26px;
  padding: 3px 7px;
  border: 1px solid var(--line-strong);
  border-bottom-width: 2px;
  border-radius: 6px;
  background: var(--paper-deep);
  font-family: var(--font-display);
  font-size: 11.5px;
  line-height: 1.4;
  text-align: center;
  color: var(--ink);
}

.shortcut-help__plus {
  font-size: 10px;
  color: var(--muted);
}

.shortcut-help__alt {
  margin-left: 4px;
  font-size: 10.5px;
  color: var(--muted);
}

.shortcut-help__note {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  font-size: 12px;
  line-height: 1.8;
  color: var(--muted);
}

.shortcut-help__note kbd {
  display: inline-block;
  padding: 0 5px;
  min-width: 0;
  font-size: 10.5px;
}

.help-enter-active,
.help-leave-active {
  transition: opacity 0.2s ease;
}

.help-enter-active .shortcut-help__panel,
.help-leave-active .shortcut-help__panel {
  transition: transform 0.25s var(--ease-out), opacity 0.25s ease;
}

.help-enter-from,
.help-leave-to {
  opacity: 0;
}

.help-enter-from .shortcut-help__panel,
.help-leave-to .shortcut-help__panel {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

@media (max-width: 600px) {
  .shortcut-help {
    align-items: flex-end;
    padding: 16px;
  }

  .shortcut-help__panel {
    padding: 22px 20px 18px;
  }

  .shortcut-help__row {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .help-enter-active,
  .help-leave-active,
  .help-enter-active .shortcut-help__panel,
  .help-leave-active .shortcut-help__panel {
    transition: none;
  }
}
</style>
