<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { brand, industries, nav, products } from '@/data/site'
import BrandMark from './BrandMark.vue'

const route = useRoute()
const menuOpen = ref(false)
const openMenu = ref(null)
const mobileGroups = ref({})
const desktopNavRef = ref(null)
const menuToggleRef = ref(null)
let desktopQuery = null

const navItems = computed(() =>
  nav.map((item) => {
    const active = item.to === '/' ? route.path === '/' : route.path.startsWith(item.to)

    if (item.to === '/products') {
      return {
        ...item,
        key: 'products',
        active,
        menuLabel: '产品模块',
        menuFooter: '查看全部产品与方案',
        children: products.map((product) => ({
          key: product.slug,
          label: product.name,
          meta: product.categoryLabel,
          to: `/products/${product.slug}`,
          active: route.path === `/products/${product.slug}`,
        })),
      }
    }

    if (item.to === '/industries') {
      return {
        ...item,
        key: 'industries',
        active,
        menuLabel: '行业场景',
        menuFooter: '查看全部行业应用',
        children: industries.map((industry) => ({
          key: industry.id,
          label: industry.name,
          meta: industry.nameEn,
          to: { path: '/industries', hash: `#${industry.id}` },
          active: route.path === '/industries' && route.hash === `#${industry.id}`,
        })),
      }
    }

    return { ...item, key: item.to, active }
  }),
)

function closeMenus() {
  openMenu.value = null
  menuOpen.value = false
}

function handleNavEnter(item) {
  openMenu.value = item.children ? item.key : null
}

function handleNavLeave(item, event) {
  if (openMenu.value !== item.key) return
  const panel = event.currentTarget.querySelector('.dropdown')
  if (panel?.contains(document.activeElement)) return
  openMenu.value = null
}

function toggleMenu(item) {
  openMenu.value = openMenu.value === item.key ? null : item.key
}

function handleFocusOut(event, item) {
  if (openMenu.value !== item.key) return
  if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) return
  openMenu.value = null
}

function handleEscape() {
  if (openMenu.value) {
    const key = openMenu.value
    openMenu.value = null
    const trigger = desktopNavRef.value?.querySelector(`[data-menu-key="${key}"]`)
    trigger?.focus()
    return
  }

  if (menuOpen.value) {
    menuOpen.value = false
    menuToggleRef.value?.focus()
  }
}

function handleDocumentPointerDown(event) {
  if (!openMenu.value) return
  if (desktopNavRef.value?.contains(event.target)) return
  openMenu.value = null
}

function handleDocumentKeyDown(event) {
  if (event.key !== 'Escape' || event.defaultPrevented) return
  if (!openMenu.value && !menuOpen.value) return
  event.preventDefault()
  handleEscape()
}

function toggleMobileGroup(key) {
  mobileGroups.value = {
    ...mobileGroups.value,
    [key]: !mobileGroups.value[key],
  }
}

function isMobileGroupOpen(key) {
  return Boolean(mobileGroups.value[key])
}

function handleDesktopChange(event) {
  if (event.matches) {
    menuOpen.value = false
    openMenu.value = null
  }
}

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
    openMenu.value = null
  },
)

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''

  if (open) {
    const expanded = {}
    navItems.value.forEach((item) => {
      if (item.children) expanded[item.key] = true
    })
    mobileGroups.value = expanded
    openMenu.value = null
  }
})

onMounted(() => {
  desktopQuery = window.matchMedia('(min-width: 901px)')
  desktopQuery.addEventListener('change', handleDesktopChange)
  document.addEventListener('pointerdown', handleDocumentPointerDown)
  document.addEventListener('keydown', handleDocumentKeyDown)
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  desktopQuery?.removeEventListener('change', handleDesktopChange)
  document.removeEventListener('pointerdown', handleDocumentPointerDown)
  document.removeEventListener('keydown', handleDocumentKeyDown)
})
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink class="brand" to="/" aria-label="Plato科技首页">
        <BrandMark :size="34" />
        <span class="brand-text">
          <span class="brand-name">Plato科技</span>
          <span class="brand-sub">PLATO TECHNOLOGY</span>
        </span>
      </RouterLink>

      <nav ref="desktopNavRef" class="desktop-nav" aria-label="主导航">
        <div
          v-for="item in navItems"
          :key="item.key"
          class="nav-item"
          :class="{ 'is-open': openMenu === item.key }"
          @mouseenter="handleNavEnter(item)"
          @mouseleave="handleNavLeave(item, $event)"
          @focusout="handleFocusOut($event, item)"
        >
          <button
            v-if="item.children"
            type="button"
            class="nav-link nav-trigger"
            :class="{ 'is-active': item.active }"
            :data-menu-key="item.key"
            :aria-expanded="openMenu === item.key"
            :aria-controls="`desktop-menu-${item.key}`"
            @click="toggleMenu(item)"
          >
            {{ item.label }}
            <svg
              class="nav-trigger__chevron"
              width="12"
              height="12"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                d="M4 6.5 8 10.5 12 6.5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
          </button>

          <RouterLink
            v-else
            class="nav-link"
            :class="{ 'is-active': item.active }"
            :to="item.to"
          >
            {{ item.label }}
          </RouterLink>

          <div
            v-if="item.children && openMenu === item.key"
            :id="`desktop-menu-${item.key}`"
            class="dropdown"
          >
            <div
              class="dropdown__panel"
              :class="{ 'dropdown__panel--wide': item.key === 'products' }"
            >
              <div class="dropdown__head">
                <span>{{ item.menuLabel }}</span>
                <span>{{ item.children.length }} 项</span>
              </div>

              <div class="dropdown__grid">
                <RouterLink
                  v-for="child in item.children"
                  :key="child.key"
                  class="dropdown-link"
                  :class="{ 'is-active': child.active }"
                  :to="child.to"
                  :aria-current="child.active ? 'page' : undefined"
                  @click="openMenu = null"
                >
                  <span class="dropdown-link__name">{{ child.label }}</span>
                  <span class="dropdown-link__meta">{{ child.meta }}</span>
                </RouterLink>
              </div>

              <RouterLink
                class="dropdown__more"
                :to="item.to"
                @click="openMenu = null"
              >
                {{ item.menuFooter }}
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>
      </nav>

      <div class="header-actions">
        <RouterLink class="btn btn--primary header-cta" to="/contact">
          聊聊需求
          <svg class="btn__arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            />
          </svg>
        </RouterLink>

        <button
          ref="menuToggleRef"
          class="menu-toggle"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? '关闭导航菜单' : '打开导航菜单'"
          @click="menuOpen = !menuOpen"
        >
          <span class="menu-toggle__bars" :class="{ 'is-open': menuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-if="menuOpen" id="mobile-menu" class="mobile-panel">
        <nav class="mobile-nav" aria-label="移动端导航">
          <template v-for="(item, index) in navItems" :key="item.key">
            <div v-if="item.children" class="mobile-group">
              <button
                type="button"
                class="mobile-link mobile-link--trigger"
                :class="{ 'is-active': item.active }"
                :aria-expanded="isMobileGroupOpen(item.key)"
                :aria-controls="`mobile-sub-${item.key}`"
                @click="toggleMobileGroup(item.key)"
              >
                <span class="mobile-link__index">0{{ index + 1 }}</span>
                <span class="mobile-link__text">{{ item.label }}</span>
                <svg
                  class="mobile-chevron"
                  :class="{ 'is-open': isMobileGroupOpen(item.key) }"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6.5 8 10.5 12 6.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
              </button>

              <div
                v-if="isMobileGroupOpen(item.key)"
                :id="`mobile-sub-${item.key}`"
                class="mobile-sub"
              >
                <RouterLink class="mobile-sub__all" :to="item.to" @click="closeMenus">
                  {{ item.menuFooter }}
                  <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                  </svg>
                </RouterLink>

                <RouterLink
                  v-for="child in item.children"
                  :key="child.key"
                  class="mobile-sub__item"
                  :class="{ 'is-active': child.active }"
                  :to="child.to"
                  :aria-current="child.active ? 'page' : undefined"
                  @click="closeMenus"
                >
                  <span class="mobile-sub__dot" aria-hidden="true"></span>
                  <span class="mobile-sub__name">{{ child.label }}</span>
                  <span class="mobile-sub__meta">{{ child.meta }}</span>
                </RouterLink>
              </div>
            </div>

            <RouterLink
              v-else
              class="mobile-link"
              :class="{ 'is-active': item.active }"
              :to="item.to"
            >
              <span class="mobile-link__index">0{{ index + 1 }}</span>
              <span class="mobile-link__text">{{ item.label }}</span>
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
            </RouterLink>
          </template>
        </nav>

        <div class="mobile-foot">
          <RouterLink class="btn btn--accent mobile-cta" to="/contact" @click="closeMenus">
            聊聊你的场景
          </RouterLink>
          <p class="mobile-note">{{ brand.description }}</p>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--line);
  background: rgba(244, 241, 234, 0.88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: var(--header-height);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.brand-name {
  font-size: 17px;
  font-weight: 650;
  letter-spacing: 0.01em;
}

.brand-sub {
  margin-top: 3px;
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--muted);
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-item {
  position: relative;
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.7;
  color: var(--ink-soft);
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
}

.nav-link:hover {
  color: var(--ink);
  background: rgba(20, 26, 32, 0.05);
}

.nav-link.is-active {
  color: var(--ink);
  font-weight: 600;
}

.nav-link.is-active::after {
  content: "";
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: var(--accent);
}

.nav-trigger__chevron {
  opacity: 0.6;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.nav-item.is-open .nav-trigger__chevron {
  opacity: 1;
  transform: rotate(180deg);
}

.nav-link:focus-visible,
.dropdown-link:focus-visible,
.dropdown__more:focus-visible,
.mobile-link:focus-visible,
.mobile-sub__item:focus-visible,
.mobile-sub__all:focus-visible,
.menu-toggle:focus-visible,
.header-cta:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 55;
  padding-top: 10px;
  transform: translateX(-50%);
}

.dropdown__panel {
  width: min(360px, calc(100vw - 48px));
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow);
  animation: dropdown-in 0.18s ease both;
}

.dropdown__panel--wide {
  width: min(560px, calc(100vw - 48px));
}

.dropdown__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 2px 10px 12px;
  border-bottom: 1px solid var(--line);
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.dropdown__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2px;
  padding: 8px 0;
}

.dropdown__panel--wide .dropdown__grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.dropdown-link {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 9px 10px;
  border-radius: 9px;
  transition: background 0.2s ease, color 0.2s ease;
}

.dropdown-link:hover {
  background: var(--paper);
}

.dropdown-link.is-active {
  background: var(--accent-soft);
}

.dropdown-link__name {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--ink-soft);
}

.dropdown-link.is-active .dropdown-link__name {
  color: var(--accent);
}

.dropdown-link__meta {
  font-size: 10.5px;
  letter-spacing: 0.03em;
  color: var(--muted);
}

.dropdown__more {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 4px;
  padding: 12px 10px 4px;
  border-top: 1px solid var(--line);
  font-size: 12px;
  font-weight: 600;
  color: var(--brand);
}

.dropdown__more svg {
  transition: transform 0.2s ease;
}

.dropdown__more:hover svg {
  transform: translateX(3px);
}

@keyframes dropdown-in {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-cta {
  padding: 10px 18px;
  font-size: 13px;
}

.menu-toggle {
  display: none;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line-strong);
  border-radius: 12px;
  background: transparent;
}

.menu-toggle__bars {
  position: relative;
  display: block;
  width: 18px;
  height: 12px;
}

.menu-toggle__bars span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: var(--ink);
  transition: transform 0.25s ease, opacity 0.25s ease, top 0.25s ease;
}

.menu-toggle__bars span:nth-child(1) {
  top: 0;
}

.menu-toggle__bars span:nth-child(2) {
  top: 5px;
}

.menu-toggle__bars span:nth-child(3) {
  top: 10px;
}

.menu-toggle__bars.is-open span:nth-child(1) {
  top: 5px;
  transform: rotate(45deg);
}

.menu-toggle__bars.is-open span:nth-child(2) {
  opacity: 0;
}

.menu-toggle__bars.is-open span:nth-child(3) {
  top: 5px;
  transform: rotate(-45deg);
}

.mobile-panel {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  height: calc(100dvh - var(--header-height));
  overflow-y: auto;
  padding: 28px 24px 40px;
  background: var(--paper);
  border-top: 1px solid var(--line);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
}

.mobile-group {
  border-bottom: 1px solid var(--line);
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 4px;
  border-bottom: 1px solid var(--line);
  font-size: 17px;
  color: var(--ink-soft);
}

.mobile-link--trigger {
  width: 100%;
  border: 0;
  background: transparent;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
}

.mobile-group .mobile-link {
  border-bottom: 0;
}

.mobile-link.is-active {
  color: var(--ink);
  font-weight: 600;
}

.mobile-link svg {
  margin-left: auto;
  color: var(--muted);
}

.mobile-link__text {
  flex: 1;
}

.mobile-link__index {
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--accent);
}

.mobile-chevron {
  transition: transform 0.2s ease;
}

.mobile-chevron.is-open {
  transform: rotate(180deg);
}

.mobile-sub {
  display: flex;
  flex-direction: column;
  margin: 0 0 12px 20px;
  padding-left: 16px;
  border-left: 1px solid var(--line-strong);
  animation: submenu-in 0.18s ease both;
}

.mobile-sub__all {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 0 11px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--brand);
}

.mobile-sub__item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 0;
  border-bottom: 1px solid var(--line);
  font-size: 13.5px;
  color: var(--ink-soft);
}

.mobile-sub__item:last-child {
  border-bottom: 0;
}

.mobile-sub__item.is-active {
  color: var(--accent);
  font-weight: 600;
}

.mobile-sub__dot {
  width: 5px;
  height: 5px;
  border: 1px solid var(--muted);
  border-radius: 50%;
  flex-shrink: 0;
}

.mobile-sub__item.is-active .mobile-sub__dot {
  border-color: var(--accent);
  background: var(--accent);
}

.mobile-sub__meta {
  margin-left: auto;
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--muted);
  white-space: nowrap;
}

@keyframes submenu-in {
  from {
    opacity: 0;
    transform: translateY(-3px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-foot {
  margin-top: 32px;
}

.mobile-cta {
  width: 100%;
}

.mobile-note {
  margin-top: 16px;
  font-size: 13px;
  color: var(--muted);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 900px) {
  .desktop-nav,
  .header-cta {
    display: none;
  }

  .menu-toggle {
    display: inline-flex;
  }
}

@media (min-width: 901px) {
  .mobile-panel {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-toggle__bars span,
  .nav-trigger__chevron,
  .mobile-chevron,
  .dropdown__more svg {
    transition: none;
  }

  .dropdown__panel,
  .mobile-sub {
    animation: none;
  }
}
</style>
