<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { contact } from '@/data/site'

const DRAFT_KEY = 'plato-contact-draft'
const LAST_KEY = 'plato-contact-last'

const formRef = ref(null)

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  topic: '',
  message: '',
})

const rules = {
  name: [
    { required: true, message: '请填写你的称呼', trigger: 'blur' },
    { min: 2, max: 30, message: '称呼请控制在 2 到 30 个字符之间', trigger: 'blur' },
  ],
  company: [{ max: 40, message: '公司或团队名称请控制在 40 个字符以内', trigger: 'blur' }],
  email: [
    { required: true, message: '请填写邮箱地址', trigger: 'blur' },
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      message: '邮箱格式看起来不太对',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      pattern: /^[0-9+\-\s()]{6,20}$/,
      message: '电话只能包含数字、空格与常见分隔符',
      trigger: 'blur',
    },
  ],
  topic: [{ required: true, message: '请选择一个咨询方向', trigger: 'change' }],
  message: [
    { required: true, message: '请简单描述你的场景或问题', trigger: 'blur' },
    { min: 10, max: 500, message: '描述请控制在 10 到 500 个字符之间', trigger: 'blur' },
  ],
}

const submitting = ref(false)
const submitted = ref(false)
const ticket = ref('')
const submittedName = ref('')
const submittedTopic = ref('')
const draftRestored = ref(false)
const lastSnapshot = ref(null)

let timer = null
let draftTimer = null
let restoringDraft = false

const formFields = ['name', 'company', 'email', 'phone', 'topic', 'message']

function readStorage(key) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    return null
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    /* 本地存储不可用时不影响表单正常提交。 */
  }
}

function removeStorage(key) {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    /* 忽略存储异常。 */
  }
}

function applySnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') return
  restoringDraft = true
  formFields.forEach((field) => {
    if (typeof snapshot[field] === 'string') form[field] = snapshot[field]
  })
  nextTick(() => {
    restoringDraft = false
    formRef.value?.clearValidate()
  })
}

const draftIsEmpty = computed(() => formFields.every((field) => !form[field].trim()))
function persistDraft() {
  if (restoringDraft || submitted.value) return
  if (draftIsEmpty.value) {
    removeStorage(DRAFT_KEY)
    return
  }
  writeStorage(DRAFT_KEY, { ...form })
}

async function handleSubmit() {
  if (submitting.value || !formRef.value) return

  try {
    await formRef.value.validate()
  } catch (invalidFields) {
    await nextTick()
    const firstField = Object.keys(invalidFields ?? {})[0]
    if (firstField) {
      formRef.value.scrollToField?.(firstField)
    }
    document
      .querySelector(
        '.contact-form .el-form-item.is-error input, .contact-form .el-form-item.is-error textarea',
      )
      ?.focus()
    return
  }

  submitting.value = true
  timer = window.setTimeout(() => {
    const snapshot = { ...form }
    submittedName.value = form.name.trim()
    submittedTopic.value = form.topic
    ticket.value = `PL-${Date.now().toString(36).toUpperCase().slice(-6)}`
    lastSnapshot.value = snapshot
    writeStorage(LAST_KEY, { form: snapshot })
    removeStorage(DRAFT_KEY)
    submitted.value = true
    submitting.value = false
    ElMessage.success({
      message: `留言已提交，受理编号 ${ticket.value}`,
      duration: 3600,
    })
  }, 900)
}

function resetForm() {
  restoringDraft = true
  Object.keys(form).forEach((key) => {
    form[key] = ''
  })
  formRef.value?.clearValidate()
  submitted.value = false
  ticket.value = ''
  draftRestored.value = false
  removeStorage(DRAFT_KEY)
  nextTick(() => {
    restoringDraft = false
  })
}

function discardDraft() {
  resetForm()
}

function restoreLast() {
  if (!lastSnapshot.value) return
  submitted.value = false
  ticket.value = ''
  draftRestored.value = true
  applySnapshot(lastSnapshot.value)
  writeStorage(DRAFT_KEY, { ...lastSnapshot.value })
}

watch(
  form,
  () => {
    if (draftTimer) window.clearTimeout(draftTimer)
    draftTimer = window.setTimeout(persistDraft, 250)
  },
  { deep: true },
)

onMounted(async () => {
  const draft = readStorage(DRAFT_KEY)
  if (draft) {
    draftRestored.value = true
    applySnapshot(draft)
    await nextTick()
  }

  const saved = readStorage(LAST_KEY)
  if (saved?.form) lastSnapshot.value = saved.form
})

onBeforeUnmount(() => {
  if (timer) window.clearTimeout(timer)
  if (draftTimer) window.clearTimeout(draftTimer)
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
            <el-form
              v-if="!submitted"
              ref="formRef"
              class="contact-form"
              :model="form"
              :rules="rules"
              label-position="top"
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

              <div v-if="draftRestored || lastSnapshot" class="draft-banner">
                <span>
                  {{
                    draftRestored
                      ? '已恢复上次未提交的草稿，可以继续补充。'
                      : '上次提交的内容已保存在本机，可随时恢复。'
                  }}
                </span>
                <div class="draft-banner__actions">
                  <button
                    v-if="lastSnapshot"
                    type="button"
                    class="draft-banner__link"
                    @click="restoreLast"
                  >
                    恢复上次提交内容
                  </button>
                  <button
                    v-if="draftRestored"
                    type="button"
                    class="draft-banner__link"
                    @click="discardDraft"
                  >
                    清除草稿
                  </button>
                </div>
              </div>

              <div class="form-grid">
                <el-form-item label="称呼" prop="name">
                  <el-input
                    id="field-name"
                    v-model="form.name"
                    autocomplete="name"
                    placeholder="怎么称呼你"
                  />
                </el-form-item>

                <el-form-item label="公司 / 团队" prop="company">
                  <el-input
                    id="field-company"
                    v-model="form.company"
                    autocomplete="organization"
                    placeholder="选填"
                  />
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                  <el-input
                    id="field-email"
                    v-model="form.email"
                    type="email"
                    autocomplete="email"
                    placeholder="you@company.com"
                  />
                </el-form-item>

                <el-form-item label="电话" prop="phone">
                  <el-input
                    id="field-phone"
                    v-model="form.phone"
                    type="tel"
                    autocomplete="tel"
                    placeholder="选填"
                  />
                </el-form-item>

                <el-form-item class="form-item--full" label="咨询方向" prop="topic">
                  <el-select id="field-topic" v-model="form.topic" placeholder="请选择一个方向">
                    <el-option
                      v-for="topic in contact.topics"
                      :key="topic"
                      :label="topic"
                      :value="topic"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item class="form-item--full" label="场景描述" prop="message">
                  <el-input
                    id="field-message"
                    v-model="form.message"
                    type="textarea"
                    :rows="5"
                    :maxlength="500"
                    show-word-limit
                    placeholder="设备情况、网络条件、目前最想解决的问题……"
                  />
                </el-form-item>
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
            </el-form>

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
                <button
                  v-if="lastSnapshot"
                  class="btn btn--ghost"
                  type="button"
                  @click="restoreLast"
                >
                  恢复刚才内容
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

.draft-banner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 18px;
  padding: 11px 14px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--paper-deep);
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--ink-soft);
}

.draft-banner__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.draft-banner__link {
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--link);
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.draft-banner__link:hover {
  color: var(--accent);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 16px;
  margin-top: 24px;
}

.form-grid :deep(.el-form-item) {
  margin-bottom: 0;
}

.form-item--full {
  grid-column: 1 / -1;
}

.contact-form :deep(.el-form-item__label) {
  padding-bottom: 6px;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--ink-soft);
}

.contact-form :deep(.el-form-item.is-required .el-form-item__label::before) {
  color: var(--accent);
}

.contact-form :deep(.el-input__wrapper),
.contact-form :deep(.el-select__wrapper) {
  min-height: 44px;
  padding: 2px 13px;
  border-radius: var(--radius-sm);
  background: var(--paper);
  box-shadow: 0 0 0 1px var(--line-strong) inset;
  transition: box-shadow 0.2s ease, background 0.2s ease;
}

.contact-form :deep(.el-input__wrapper:hover),
.contact-form :deep(.el-select__wrapper:hover) {
  box-shadow: 0 0 0 1px var(--line-strong) inset;
  background: var(--surface);
}

.contact-form :deep(.el-input__wrapper.is-focus),
.contact-form :deep(.el-select__wrapper.is-focused) {
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--link) inset, 0 0 0 3px var(--hover-soft);
}

.contact-form :deep(.el-input__inner),
.contact-form :deep(.el-select__selected-item) {
  font-size: 14px;
  color: var(--ink);
}

.contact-form :deep(.el-input__inner::placeholder),
.contact-form :deep(.el-textarea__inner::placeholder) {
  color: var(--muted);
}

.contact-form :deep(.el-textarea__inner) {
  min-height: 126px !important;
  padding: 11px 13px;
  border-radius: var(--radius-sm);
  background: var(--paper);
  font-size: 14px;
  line-height: 1.7;
  color: var(--ink);
  box-shadow: 0 0 0 1px var(--line-strong) inset;
  transition: box-shadow 0.2s ease, background 0.2s ease;
}

.contact-form :deep(.el-textarea__inner:hover) {
  background: var(--surface);
}

.contact-form :deep(.el-textarea__inner:focus) {
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--link) inset, 0 0 0 3px var(--hover-soft);
}

.contact-form :deep(.el-input__count) {
  background: transparent;
  font-family: var(--font-display);
  font-size: 11px;
  color: var(--muted);
}

.contact-form :deep(.el-form-item.is-error .el-input__wrapper),
.contact-form :deep(.el-form-item.is-error .el-select__wrapper),
.contact-form :deep(.el-form-item.is-error .el-textarea__inner) {
  box-shadow: 0 0 0 1px var(--danger) inset;
}

.contact-form :deep(.el-form-item__error) {
  padding-top: 4px;
  font-size: 11.5px;
  color: var(--danger);
}

.contact-form :deep(.el-select) {
  width: 100%;
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
