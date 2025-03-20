<script setup>
defineProps({
  tone: { type: Number, default: 1 },
  label: { type: String, default: '' },
})
</script>

<template>
  <div class="graphic" :class="`graphic--tone-${tone}`" aria-hidden="true">
    <svg class="graphic__art" viewBox="0 0 240 160" preserveAspectRatio="xMidYMid slice">
      <g v-if="tone === 1" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="1.2">
        <path d="M-20 120 90 30 200 78 280 40" />
        <path d="M-20 138 96 48 206 96 280 58" opacity="0.5" />
        <circle cx="152" cy="112" r="46" />
        <circle cx="152" cy="112" r="26" opacity="0.6" />
      </g>
      <g v-else-if="tone === 2" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.1">
        <circle cx="196" cy="34" r="30" />
        <circle cx="196" cy="34" r="54" opacity="0.7" />
        <circle cx="196" cy="34" r="78" opacity="0.45" />
        <path d="M0 96h72l26-34h96l30 38h16" />
        <circle cx="98" cy="62" r="4" fill="rgba(255,255,255,0.7)" stroke="none" />
      </g>
      <g v-else-if="tone === 3" fill="none" stroke="rgba(255,255,255,0.42)" stroke-width="1.1">
        <path d="M40 118 104 44 168 92 214 36M104 44l10 82 54-34M40 118l128 8" />
        <circle cx="40" cy="118" r="4" fill="rgba(255,255,255,0.75)" stroke="none" />
        <circle cx="104" cy="44" r="4" fill="rgba(255,255,255,0.75)" stroke="none" />
        <circle cx="168" cy="92" r="4" fill="rgba(255,255,255,0.75)" stroke="none" />
        <circle cx="214" cy="36" r="4" fill="rgba(255,255,255,0.75)" stroke="none" />
        <circle cx="114" cy="126" r="4" fill="rgba(255,255,255,0.75)" stroke="none" />
      </g>
      <g v-else-if="tone === 4" fill="rgba(255,255,255,0.22)">
        <rect x="28" y="82" width="18" height="58" rx="3" />
        <rect x="58" y="58" width="18" height="82" rx="3" />
        <rect x="88" y="96" width="18" height="44" rx="3" />
        <rect x="118" y="40" width="18" height="100" rx="3" />
        <rect x="148" y="72" width="18" height="68" rx="3" />
        <rect x="178" y="94" width="18" height="46" rx="3" />
        <circle cx="198" cy="36" r="16" fill="rgba(255,255,255,0.3)" />
      </g>
      <g v-else-if="tone === 5" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.1">
        <circle cx="70" cy="80" r="44" />
        <circle cx="120" cy="80" r="44" />
        <circle cx="170" cy="80" r="44" />
        <path d="M70 36v88M120 36v88M170 36v88" opacity="0.35" />
      </g>
      <g v-else fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.35)" stroke-width="1">
        <rect x="24" y="28" width="52" height="46" rx="4" />
        <rect x="88" y="28" width="72" height="46" rx="4" />
        <rect x="172" y="28" width="44" height="46" rx="4" />
        <rect x="24" y="86" width="88" height="46" rx="4" />
        <rect x="124" y="86" width="30" height="46" rx="4" />
        <rect x="166" y="86" width="50" height="46" rx="4" />
      </g>
    </svg>
    <span v-if="label" class="graphic__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.graphic {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
}

.graphic__art {
  width: 100%;
  height: 100%;
}

.graphic--tone-1 {
  background: linear-gradient(135deg, #12252f 0%, #245a68 52%, #c4683f 100%);
}

.graphic--tone-2 {
  background: linear-gradient(145deg, #101c2a 0%, #2b4f6d 58%, #8fb0be 100%);
}

.graphic--tone-3 {
  background: linear-gradient(135deg, #1d2620 0%, #48614f 55%, #c9bfa1 100%);
}

.graphic--tone-4 {
  background: linear-gradient(140deg, #2a1d17 0%, #7d4932 55%, #d9ad83 100%);
}

.graphic--tone-5 {
  background: linear-gradient(135deg, #191d2b 0%, #454f6a 55%, #a9b0c2 100%);
}

.graphic--tone-6 {
  background: linear-gradient(140deg, #232c34 0%, #516a70 55%, #c9b29f 100%);
}

.graphic__label {
  position: absolute;
  left: 18px;
  bottom: 16px;
  padding: 5px 11px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
}
</style>
