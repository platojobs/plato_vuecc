<script setup>
import { computed, nextTick, onBeforeUnmount, reactive, ref } from 'vue'
import { contact } from '@/data/site'

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  topic: '',
  message: '',
})

const errors = reactive({})
const touched = reactive({})
const submitting = ref(false)
const submitted = ref(false)
const ticket = ref('')
const submittedName = ref('')
const submittedTopic = ref('')

let timer = null

const validators = {
  name(value) {
    if (!value.trim()) return '请填写你的称呼'
    if (value.trim().length < 2) return '称呼至少需要 2 个字符'
    if (value.trim().length > 30) return '称呼请控制在 30 个字符以内'
    return ''
  },
  email(value) {
    if (!value.trim()) return '请填写邮箱地址'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) return '邮箱格式看起来不太对'
    return ''
  },
  phone(value) {
    if (!value.trim()) return ''
    if (!/^[0-9+\-\s()]{6,20}$/.test(value.trim())) return '电话只能包含数字、空格与常见分隔符'
    return ''
  },
  company(value) {
    if (value.trim().length > 40) return '公司或团队名称请控制在 40 个字符以内'
    return ''
  },
  topic(value) {
    if (!value) return '请选择一个咨询方向'
    return ''
  },
  message(value) {
    if (!value.trim()) return '请简单描述你的场景或问题'
    if (value.trim().length < 10) return '描述至少需要 10 个字符'
    if (value.trim().length > 500) return '描述请控制在 500 个字符以内'
    return ''
  },
}

const checkedFields = ['name', 'email', 'phone', 'company', 'topic', 'message']

function validateField(field) {
  const message = validators[field]?.(form[field]) ?? ''
  if (message) {
    errors[field] = message
  } else {
    delete errors[field]
  }
  return !message
}

function handleBlur(field) {
  touched[field] = true
  validateField(field)
}

function validateAll() {
  checkedFields.forEach((field) => {
    touched[field] = true
    validateField(field)
  })
  return !Object.keys(errors).length
}

const messageCount = computed(() => form.message.length)
const hasErrors = computed(() => Object.keys(errors).length > 0)

async function handleSubmit() {
  if (submitting.value) return
  if (!validateAll()) {
    await nextTick()
    const firstInvalid = document.querySelector(
      '.contact-form .has-error input, .contact-form .has-error textarea, .contact-form .has-error select',
    )
    firstInvalid?.focus()
    return
  }

  submitting.value = true
  timer = window.setTimeout(() => {
    submittedName.value = form.name.trim()
    submittedTopic.value = form.topic
    ticket.value = `PL-${Date.now().toString(36).toUpperCase().slice(-6)}`
    submitted.value = true
    submitting.value = false
  }, 900)
}

function resetForm() {
  Object.keys(form).forEach((key) => {
    form[key] = ''
  })
  Object.keys(errors).forEach((key) => delete errors[key])
  Object.keys(touched).forEach((key) => delete touched[key])
  submitted.value = false
  ticket.value = ''
}

onBeforeUnmount(() => {
  if (timer) window.clearTimeout(timer)
})
</script>

<template>
  <div class="contact-page">
    <section class="page-head">
      <div class="container">
        <span class="eyebrow" v-reveal>{{ contact.eyebrow }}</span>
        <h1 class="page-head__title" v-reveal="60">{{ contact.title }}</h1>
        <p class="page-head__lead" v-reveal="120">{{ contact.lead }}</p>
      </div>
    </section>

    <section class="section section--tight contact-section">
      <div class="container contact-grid">
        <aside class="contact-info" v-reveal>
          <div class="channel-list">
            <div v-for="channel in contact.channels" :key="channel.label" class="channel-row">
              <span class="channel-row__label">{{ channel.label }}</span>
              <div>
                <p class="channel-row__value">{{ channel.value }}</p>
                <p class="channel-row__note">{{ channel.note }}</p>
              </div>
            </div>
          </div>

          <div class="prepare-card">
            <h3>交流前可以先准备</h3>
            <ul>
              <li>现场大概有多少台设备，分属哪些厂商</li>
              <li>网络条件与是否允许上外网</li>
              <li>目前最想解决的一个具体问题</li>
              <li>已有系统与可接受的改动范围</li>
            </ul>
          </div>

        </aside>

        <div class="form-card" v-reveal="80">
          <Transition name="fade" mode="out-in">
            <form
              v-if="!submitted"
              class="contact-form"
              novalidate
              @submit.prevent="handleSubmit"
            >
              <div class="form-head">
                <div>
                  <h2>留言给我们</h2>
                  <p>带 * 的字段为必填项，请尽量填写具体信息。</p>
                </div>
                <span class="form-head__badge">商务咨询</span>
              </div>

              <div class="form-grid">
                <div class="field" :class="{ 'has-error': touched.name && errors.name }">
                  <label for="field-name">称呼 <span>*</span></label>
                  <input
                    id="field-name"
                    v-model="form.name"
                    type="text"
                    autocomplete="name"
                    placeholder="怎么称呼你"
                    :aria-invalid="Boolean(touched.name && errors.name)"
                    :aria-describedby="touched.name && errors.name ? 'error-name' : undefined"
                    @blur="handleBlur('name')"
                    @input="touched.name && validateField('name')"
                  />
                  <p v-if="touched.name && errors.name" id="error-name" class="field-error">
                    {{ errors.name }}
                  </p>
                </div>

                <div class="field" :class="{ 'has-error': touched.company && errors.company }">
                  <label for="field-company">公司 / 团队</label>
                  <input
                    id="field-company"
                    v-model="form.company"
                    type="text"
                    autocomplete="organization"
                    placeholder="选填"
                    :aria-invalid="Boolean(touched.company && errors.company)"
                    :aria-describedby="
                      touched.company && errors.company ? 'error-company' : undefined
                    "
                    @blur="handleBlur('company')"
                    @input="touched.company && validateField('company')"
                  />
                  <p v-if="touched.company && errors.company" id="error-company" class="field-error">
                    {{ errors.company }}
                  </p>
                </div>

                <div class="field" :class="{ 'has-error': touched.email && errors.email }">
                  <label for="field-email">邮箱 <span>*</span></label>
                  <input
                    id="field-email"
                    v-model="form.email"
                    type="email"
                    autocomplete="email"
                    placeholder="you@company.com"
                    :aria-invalid="Boolean(touched.email && errors.email)"
                    :aria-describedby="touched.email && errors.email ? 'error-email' : undefined"
                    @blur="handleBlur('email')"
                    @input="touched.email && validateField('email')"
                  />
                  <p v-if="touched.email && errors.email" id="error-email" class="field-error">
                    {{ errors.email }}
                  </p>
                </div>

                <div class="field" :class="{ 'has-error': touched.phone && errors.phone }">
                  <label for="field-phone">电话</label>
                  <input
                    id="field-phone"
                    v-model="form.phone"
                    type="tel"
                    autocomplete="tel"
                    placeholder="选填"
                    :aria-invalid="Boolean(touched.phone && errors.phone)"
                    :aria-describedby="touched.phone && errors.phone ? 'error-phone' : undefined"
                    @blur="handleBlur('phone')"
                    @input="touched.phone && validateField('phone')"
                  />
                  <p v-if="touched.phone && errors.phone" id="error-phone" class="field-error">
                    {{ errors.phone }}
                  </p>
                </div>

                <div class="field field--full" :class="{ 'has-error': touched.topic && errors.topic }">
                  <label for="field-topic">咨询方向 <span>*</span></label>
                  <select
                    id="field-topic"
                    v-model="form.topic"
                    :aria-invalid="Boolean(touched.topic && errors.topic)"
                    :aria-describedby="touched.topic && errors.topic ? 'error-topic' : undefined"
                    @blur="handleBlur('topic')"
                    @change="touched.topic && validateField('topic')"
                  >
                    <option value="" disabled>请选择一个方向</option>
                    <option v-for="topic in contact.topics" :key="topic" :value="topic">
                      {{ topic }}
                    </option>
                  </select>
                  <p v-if="touched.topic && errors.topic" id="error-topic" class="field-error">
                    {{ errors.topic }}
                  </p>
                </div>

                <div
                  class="field field--full"
                  :class="{ 'has-error': touched.message && errors.message }"
                >
                  <div class="field-label-row">
                    <label for="field-message">场景描述 <span>*</span></label>
                    <span class="field-counter">{{ messageCount }} / 500</span>
                  </div>
                  <textarea
                    id="field-message"
                    v-model="form.message"
                    rows="5"
                    placeholder="设备情况、网络条件、目前最想解决的问题……"
                    :aria-invalid="Boolean(touched.message && errors.message)"
                    :aria-describedby="
                      touched.message && errors.message ? 'error-message' : undefined
                    "
                    @blur="handleBlur('message')"
                    @input="touched.message && validateField('message')"
                  ></textarea>
                  <p v-if="touched.message && errors.message" id="error-message" class="field-error">
                    {{ errors.message }}
                  </p>
                </div>
              </div>

              <div class="form-foot">
                <p class="form-foot__note">{{ contact.formNote }}</p>
                <button class="btn btn--accent submit-btn" type="submit" :disabled="submitting">
                  {{ submitting ? '正在处理…' : '提交留言' }}
                  <svg
                    v-if="!submitting"
                    class="btn__arrow"
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
                </button>
              </div>

              <p v-if="hasErrors && submitting === false" class="form-error-summary" role="alert">
                请先修正标红的字段，再提交留言。
              </p>
            </form>

            <div v-else class="success-panel" role="status">
              <div class="success-panel__icon" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 12.5 9.5 18 20 7"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <h2>{{ submittedName }}，你的留言已提交</h2>
              <p class="success-panel__desc">
                我们会根据你描述的场景安排后续沟通。如需补充信息，可直接回复我们联系你的邮件。
              </p>
              <div class="success-panel__meta">
                <div>
                  <span>咨询方向</span>
                  <strong>{{ submittedTopic }}</strong>
                </div>
                <div>
                  <span>受理编号</span>
                  <strong>{{ ticket }}</strong>
                </div>
              </div>
              <div class="success-panel__actions">
                <button class="btn btn--primary" type="button" @click="resetForm">
                  再填一份
                </button>
                <RouterLink class="btn btn--ghost" to="/products">先看看产品</RouterLink>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

.channel-list {
  border-top: 1px solid var(--line-strong);
}

.channel-row {
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr);
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}

.channel-row__label {
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--accent);
  text-transform: uppercase;
}

.channel-row__value {
  font-size: 15px;
  color: var(--ink);
}

.channel-row__note {
  margin-top: 3px;
  font-size: 11px;
  color: var(--muted);
}

.prepare-card {
  margin-top: 28px;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.prepare-card h3 {
  font-size: 14px;
}

.prepare-card ul {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 14px;
}

.prepare-card li {
  position: relative;
  padding-left: 16px;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--muted);
}

.prepare-card li::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 0;
  width: 7px;
  height: 1px;
  background: var(--accent);
}

.form-card {
  padding: clamp(24px, 4vw, 36px);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}

.form-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--line);
}

.form-head h2 {
  font-size: 22px;
}

.form-head p {
  margin-top: 6px;
  font-size: 12.5px;
  color: var(--muted);
}

.form-head__badge {
  padding: 3px 9px;
  border-radius: 999px;
  background: var(--accent-soft);
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--accent);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 16px;
  margin-top: 24px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field--full {
  grid-column: 1 / -1;
}

.field label {
  font-size: 12.5px;
  color: var(--ink-soft);
}

.field label span {
  color: var(--accent);
}

.field-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.field-counter {
  font-family: var(--font-display);
  font-size: 11px;
  color: var(--muted);
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  background: var(--paper);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.field textarea {
  min-height: 126px;
  resize: vertical;
  line-height: 1.7;
}

.field select {
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--muted) 50%),
    linear-gradient(135deg, var(--muted) 50%, transparent 50%);
  background-position: calc(100% - 18px) 50%, calc(100% - 13px) 50%;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: var(--brand);
  background: var(--surface);
  box-shadow: 0 0 0 3px rgba(21, 50, 70, 0.1);
}

.field.has-error input,
.field.has-error select,
.field.has-error textarea {
  border-color: var(--danger);
}

.field.has-error input:focus,
.field.has-error select:focus,
.field.has-error textarea:focus {
  box-shadow: 0 0 0 3px rgba(166, 63, 44, 0.12);
}

.field-error {
  font-size: 11.5px;
  color: var(--danger);
}

.form-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px solid var(--line);
}

.form-foot__note {
  flex: 1;
  min-width: 200px;
  font-size: 11px;
  line-height: 1.65;
  color: var(--muted);
}

.submit-btn:disabled {
  cursor: progress;
  opacity: 0.7;
}

.form-error-summary {
  margin-top: 14px;
  font-size: 12px;
  color: var(--danger);
}

.success-panel {
  padding: 12px 4px;
}

.success-panel__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: rgba(47, 111, 94, 0.12);
  color: var(--success);
}

.success-panel h2 {
  margin-top: 22px;
  font-size: 24px;
}

.success-panel__desc {
  max-width: 460px;
  margin-top: 12px;
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--muted);
}

.success-panel__meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 26px;
  padding: 18px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.success-panel__meta span {
  display: block;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.success-panel__meta strong {
  display: block;
  margin-top: 4px;
  font-size: 15px;
  color: var(--ink);
}

.success-panel__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .form-card {
    max-width: none;
  }
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .channel-row {
    grid-template-columns: 70px minmax(0, 1fr);
  }

  .form-foot .submit-btn {
    width: 100%;
  }
}
</style>
