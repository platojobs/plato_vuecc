export default {
  mounted(el, binding) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    const delay = Number(binding.value) || 0
    el.classList.add('reveal')
    if (delay) el.style.transitionDelay = `${delay}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          el.classList.add('is-visible')
          observer.unobserve(el)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    el.__revealObserver = observer
  },
  unmounted(el) {
    el.__revealObserver?.disconnect()
  },
}
