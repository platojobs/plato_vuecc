import { computed, ref } from 'vue'

const STORAGE_KEY = 'plato-theme'

const stored = ref(null)
const systemDark = ref(false)
let mediaQuery = null
let initialized = false

function readStored() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'dark' || value === 'light' ? value : null
  } catch (error) {
    return null
  }
}

function effectiveDark(value) {
  if (value === 'dark') return true
  if (value === 'light') return false
  return mediaQuery ? mediaQuery.matches : false
}

function applyPreference(value) {
  const root = document.documentElement
  if (value === 'dark' || value === 'light') {
    root.setAttribute('data-theme', value)
  } else {
    root.removeAttribute('data-theme')
  }

  const dark = effectiveDark(value)
  // Element Plus 的深色变量挂在 html.dark 上，需要与站点主题同步。
  root.classList.toggle('dark', dark)
  root.style.colorScheme = dark ? 'dark' : 'light'
}

function updateMetaColor(dark) {
  const meta = document.querySelector('meta[name="theme-color"]:not([media])')
  if (meta) meta.setAttribute('content', dark ? '#0f161b' : '#f4f1ea')
}

function initialize() {
  if (initialized || typeof window === 'undefined') return
  initialized = true
  stored.value = readStored()
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  systemDark.value = mediaQuery.matches
  mediaQuery.addEventListener('change', (event) => {
    systemDark.value = event.matches
    if (!stored.value) {
      applyPreference(null)
      updateMetaColor(event.matches)
    }
  })
  applyPreference(stored.value)
  updateMetaColor(stored.value ? stored.value === 'dark' : systemDark.value)
}

const isDark = computed(() => {
  const current = stored.value ?? (systemDark.value ? 'dark' : 'light')
  return current === 'dark'
})

export function useTheme() {
  initialize()

  function toggle() {
    const next = isDark.value ? 'light' : 'dark'
    stored.value = next
    applyPreference(next)
    updateMetaColor(next === 'dark')
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch (error) {
      /* 浏览器禁用本地存储时，仅保留当前会话内的切换效果。 */
    }
  }

  return { isDark, toggle }
}
