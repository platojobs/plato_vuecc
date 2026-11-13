<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import {
  boardTabs,
  capabilityProjects,
  projectOwners,
  projectStatusMap,
  projectStatuses,
} from '@/data/capability-board'

const PAGE_SIZE = 5

const projects = ref(capabilityProjects.map((project) => ({ ...project })))
const loading = ref(true)
const activeTab = ref('all')
const keyword = ref('')
const ownerFilter = ref('')
const startAfter = ref('')
const overdueOnly = ref(false)
const currentPage = ref(1)
const sortProp = ref('')
const sortOrder = ref('')

let loadingTimer = null

onMounted(() => {
  loadingTimer = window.setTimeout(() => {
    loading.value = false
  }, 550)
})

onBeforeUnmount(() => {
  if (loadingTimer) window.clearTimeout(loadingTimer)
})

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

function formatDate(value) {
  if (!value) return '未安排'
  return dateFormatter.format(new Date(`${value}T00:00:00`))
}

function statusOf(value) {
  return projectStatusMap[value] ?? { label: '未设置', type: 'info' }
}

function isOverdue(project) {
  if (project.status === 'accepted') return false
  return new Date(`${project.launchDate}T23:59:59`).getTime() < Date.now()
}

const overdueProjects = computed(() => projects.value.filter(isOverdue))

const tabCounts = computed(() =>
  Object.fromEntries(
    boardTabs.map((tab) => [
      tab.id,
      tab.id === 'all'
        ? projects.value.length
        : projects.value.filter((project) => project.status === tab.id).length,
    ]),
  ),
)

const stats = computed(() => {
  const active = projects.value.filter((project) =>
    ['delivering', 'accepting', 'risk'].includes(project.status),
  ).length
  const accepted = projects.value.filter((project) => project.status === 'accepted').length
  const averageProgress = projects.value.length
    ? Math.round(
        projects.value.reduce((total, project) => total + project.progress, 0) /
          projects.value.length,
      )
    : 0
  const devices = projects.value.reduce((total, project) => total + project.devices, 0)

  return [
    { label: '在途项目', value: active, suffix: '个' },
    { label: '已验收', value: accepted, suffix: '个' },
    { label: '平均进度', value: averageProgress, suffix: '%' },
    { label: '接入设备', value: devices.toLocaleString('zh-CN'), suffix: '台' },
  ]
})

const filteredProjects = computed(() => {
  const query = keyword.value.trim().toLowerCase()
  const after = startAfter.value

  return projects.value.filter((project) => {
    if (activeTab.value !== 'all' && project.status !== activeTab.value) return false
    if (ownerFilter.value && project.owner !== ownerFilter.value) return false
    if (overdueOnly.value && !isOverdue(project)) return false
    if (after && project.startDate < after) return false

    if (!query) return true
    return [project.name, project.client, project.id, project.industry]
      .join(' ')
      .toLowerCase()
      .includes(query)
  })
})

const sortGetters = {
  startDate: (project) => project.startDate,
  launchDate: (project) => project.launchDate,
  progress: (project) => project.progress,
}

const processedProjects = computed(() => {
  const list = [...filteredProjects.value]
  const getter = sortGetters[sortProp.value]

  if (getter && sortOrder.value) {
    const direction = sortOrder.value === 'ascending' ? 1 : -1
    list.sort((a, b) => {
      const left = getter(a)
      const right = getter(b)
      if (left === right) return 0
      return left > right ? direction : -direction
    })
  }

  return list
})

const pagedProjects = computed(() =>
  processedProjects.value.slice(
    (currentPage.value - 1) * PAGE_SIZE,
    currentPage.value * PAGE_SIZE,
  ),
)

watch([activeTab, keyword, ownerFilter, startAfter, overdueOnly], () => {
  currentPage.value = 1
})

watch(
  () => processedProjects.value.length,
  (total) => {
    const maxPage = Math.max(1, Math.ceil(total / PAGE_SIZE))
    if (currentPage.value > maxPage) currentPage.value = maxPage
  },
)

function handleSortChange({ prop, order }) {
  sortProp.value = order ? prop : ''
  sortOrder.value = order ?? ''
  currentPage.value = 1
}

function resetFilters() {
  activeTab.value = 'all'
  keyword.value = ''
  ownerFilter.value = ''
  startAfter.value = ''
  overdueOnly.value = false
}

const detailOpen = ref(false)
const activeProjectId = ref('')
const activeProject = computed(
  () => projects.value.find((project) => project.id === activeProjectId.value) ?? null,
)

let detailTrigger = null

function openDetail(project, event) {
  detailTrigger = event?.currentTarget ?? null
  activeProjectId.value = project.id
  detailOpen.value = true
}

function restoreDetailFocus() {
  detailTrigger?.focus?.()
  detailTrigger = null
}

const deliverySteps = [
  { title: '现场勘察', description: '确认设备清单、网络条件与可用的停机窗口' },
  { title: '接入联调', description: '完成协议适配、边缘部署与数据一致性校验' },
  { title: '试运行', description: '观察关键指标、告警阈值与现场值班流程' },
  { title: '验收交接', description: '整理文档、完成培训并移交运维责任' },
]

const stepActive = computed(() => {
  const progress = activeProject.value?.progress ?? 0
  if (progress >= 100) return deliverySteps.length
  if (progress >= 80) return 3
  if (progress >= 40) return 2
  if (progress >= 10) return 1
  return 0
})

const editOpen = ref(false)
const editFormRef = ref(null)
const editingId = ref('')
const editForm = reactive({
  name: '',
  owner: '',
  status: '',
  launchDate: '',
  priority: false,
})

const editRules = {
  name: [
    { required: true, message: '请填写项目名称', trigger: 'blur' },
    { min: 4, max: 30, message: '项目名称请控制在 4 到 30 个字符之间', trigger: 'blur' },
  ],
  owner: [{ required: true, message: '请选择负责人', trigger: 'change' }],
  status: [{ required: true, message: '请选择项目状态', trigger: 'change' }],
  launchDate: [{ required: true, message: '请选择计划上线日期', trigger: 'change' }],
}

let editTrigger = null

function openEdit(project, event) {
  editTrigger = event?.currentTarget ?? document.activeElement
  editingId.value = project.id
  editForm.name = project.name
  editForm.owner = project.owner
  editForm.status = project.status
  editForm.launchDate = project.launchDate
  editForm.priority = project.priority
  editOpen.value = true
  nextTick(() => editFormRef.value?.clearValidate())
}

function editFromDetail() {
  if (activeProject.value) openEdit(activeProject.value)
}

async function submitEdit() {
  if (!editFormRef.value) return

  try {
    await editFormRef.value.validate()
  } catch {
    return
  }

  const target = projects.value.find((project) => project.id === editingId.value)
  if (!target) return

  target.name = editForm.name.trim()
  target.owner = editForm.owner
  target.status = editForm.status
  target.launchDate = editForm.launchDate
  target.priority = editForm.priority
  if (target.status === 'accepted') target.progress = 100

  editOpen.value = false
  ElMessage.success({
    message: `${target.name} 的信息已更新`,
    duration: 3000,
  })
}

function restoreEditFocus() {
  editTrigger?.focus?.()
  editTrigger = null
}
</script>

<template>
  <div class="showcase-page">
    <Breadcrumbs :items="[{ label: '首页', to: '/' }, { label: '能力看板' }]" />

    <section class="page-head">
      <div class="container">
        <span class="eyebrow" v-reveal>CAPABILITY BOARD</span>
        <h1 class="page-head__title" v-reveal="60">能力看板</h1>
        <p class="page-head__lead" v-reveal="120">
          把正在推进的设备接入与数据链路项目放在同一张看板上：谁在负责、推进到哪一段、哪些节点需要提前协调。这里的判断来自现场，不追求好看的完成率。
        </p>
        <div class="page-head__meta" v-reveal="180">
          <span>{{ projects.length }} 个项目</span>
          <span class="dot"></span>
          <span>制造 · 物流 · 园区 · 能源</span>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <div class="board-summary">
          <article v-for="item in stats" :key="item.label" class="summary-card">
            <span class="summary-card__label">{{ item.label }}</span>
            <p class="summary-card__value">
              {{ item.value }}<span>{{ item.suffix }}</span>
            </p>
          </article>
        </div>

        <div class="board-shell">
          <el-alert
            v-if="!loading && overdueProjects.length"
            class="board-alert"
            type="warning"
            :closable="false"
            show-icon
            :title="`${overdueProjects.length} 个项目已超出计划上线日期`"
            :description="`${overdueProjects.map((project) => project.name).join('、')}。建议先确认验收条件与现场资源，再调整后续排期。`"
          />

          <el-tabs v-model="activeTab" class="board-tabs">
            <el-tab-pane
              v-for="tab in boardTabs"
              :key="tab.id"
              :label="`${tab.label} ${tabCounts[tab.id]}`"
              :name="tab.id"
            />
          </el-tabs>

          <div class="board-filters">
            <el-input
              v-model="keyword"
              class="filter-input"
              placeholder="搜索项目、客户或编号"
              clearable
            >
              <template #prefix>
                <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                  <circle
                    cx="10.5"
                    cy="10.5"
                    r="6.2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                  />
                  <path
                    d="m15.2 15.2 4.6 4.6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                </svg>
              </template>
            </el-input>

            <el-select
              v-model="ownerFilter"
              class="filter-select"
              placeholder="全部负责人"
              clearable
            >
              <el-option
                v-for="owner in projectOwners"
                :key="owner"
                :label="owner"
                :value="owner"
              />
            </el-select>

            <el-date-picker
              v-model="startAfter"
              class="filter-date"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="立项日期起"
              clearable
            />

            <label class="filter-switch">
              <span>只看超期</span>
              <el-switch v-model="overdueOnly" />
            </label>

            <el-button class="filter-reset" text @click="resetFilters">重置筛选</el-button>
          </div>

          <div v-if="loading" class="board-loading">
            <el-skeleton :rows="3" animated />
            <el-skeleton :rows="5" animated />
          </div>

          <template v-else>
            <div class="board-table-wrap">
              <el-table
                :data="pagedProjects"
                row-key="id"
                class="board-table"
                @sort-change="handleSortChange"
              >
                <el-table-column label="项目" min-width="245">
                  <template #default="{ row }">
                    <div class="cell-project">
                      <span class="cell-project__id">{{ row.id }}</span>
                      <strong>{{ row.name }}</strong>
                      <span class="cell-project__client">{{ row.client }} · {{ row.industry }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="负责人" prop="owner" width="92" />
                <el-table-column label="立项日期" prop="startDate" width="118" sortable="custom">
                  <template #default="{ row }">{{ formatDate(row.startDate) }}</template>
                </el-table-column>
                <el-table-column label="计划上线" prop="launchDate" width="118" sortable="custom">
                  <template #default="{ row }">
                    <span :class="{ 'is-overdue': isOverdue(row) }">
                      {{ formatDate(row.launchDate) }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="进度" prop="progress" width="132" sortable="custom">
                  <template #default="{ row }">
                    <div class="cell-progress">
                      <el-progress :percentage="row.progress" :stroke-width="6" :show-text="false" />
                      <span>{{ row.progress }}%</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="状态" width="106">
                  <template #default="{ row }">
                    <el-tag :type="statusOf(row.status).type" effect="light" round>
                      {{ statusOf(row.status).label }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="118" fixed="right">
                  <template #default="{ row }">
                    <el-button link type="primary" @click="openDetail(row, $event)">详情</el-button>
                    <el-button link type="primary" @click="openEdit(row, $event)">编辑</el-button>
                  </template>
                </el-table-column>

                <template #empty>
                  <el-empty description="没有符合条件的项目" :image-size="72">
                    <el-button @click="resetFilters">清除筛选条件</el-button>
                  </el-empty>
                </template>
              </el-table>
            </div>

            <div class="board-footer">
              <span class="board-footer__count">
                当前显示 {{ processedProjects.length }} 个项目，共 {{ projects.length }} 个
              </span>
              <el-pagination
                v-model:current-page="currentPage"
                :page-size="PAGE_SIZE"
                :total="processedProjects.length"
                layout="prev, pager, next"
                background
              />
            </div>
          </template>
        </div>
      </div>
    </section>

    <el-drawer
      v-model="detailOpen"
      class="board-drawer"
      :title="activeProject?.name ?? '项目详情'"
      size="min(560px, 92vw)"
      @closed="restoreDetailFocus"
    >
      <div v-if="activeProject" class="detail-body">
        <div class="detail-head">
          <el-tag :type="statusOf(activeProject.status).type" effect="light" round>
            {{ statusOf(activeProject.status).label }}
          </el-tag>
          <span>{{ activeProject.id }}</span>
          <span class="dot"></span>
          <span>{{ activeProject.industry }}</span>
        </div>

        <p class="detail-summary">{{ activeProject.summary }}</p>

        <div class="detail-progress">
          <div class="detail-progress__head">
            <span>交付进度</span>
            <strong>{{ activeProject.progress }}%</strong>
          </div>
          <el-progress
            :percentage="activeProject.progress"
            :stroke-width="8"
            :show-text="false"
          />
        </div>

        <el-descriptions :column="1" border class="detail-descriptions">
          <el-descriptions-item label="客户">{{ activeProject.client }}</el-descriptions-item>
          <el-descriptions-item label="负责人">{{ activeProject.owner }}</el-descriptions-item>
          <el-descriptions-item label="立项日期">
            {{ formatDate(activeProject.startDate) }}
          </el-descriptions-item>
          <el-descriptions-item label="计划上线">
            {{ formatDate(activeProject.launchDate) }}
          </el-descriptions-item>
          <el-descriptions-item label="接入设备">
            {{ activeProject.devices.toLocaleString('zh-CN') }} 台
          </el-descriptions-item>
          <el-descriptions-item label="边缘网关">
            {{ activeProject.gateways }} 台
          </el-descriptions-item>
          <el-descriptions-item label="重点关注">
            {{ activeProject.priority ? '是' : '否' }}
          </el-descriptions-item>
        </el-descriptions>

        <section class="detail-block">
          <h3>交付范围</h3>
          <div class="detail-tags">
            <el-tag
              v-for="item in activeProject.scope"
              :key="item"
              effect="plain"
              round
              type="info"
            >
              {{ item }}
            </el-tag>
          </div>
        </section>

        <section class="detail-block">
          <h3>推进阶段</h3>
          <el-steps
            :active="stepActive"
            direction="vertical"
            finish-status="success"
            class="detail-steps"
          >
            <el-step
              v-for="step in deliverySteps"
              :key="step.title"
              :title="step.title"
              :description="step.description"
            />
          </el-steps>
        </section>
      </div>

      <template #footer>
        <div class="detail-actions">
          <el-button @click="detailOpen = false">关闭</el-button>
          <el-button type="primary" @click="editFromDetail">编辑项目</el-button>
        </div>
      </template>
    </el-drawer>

    <el-dialog
      v-model="editOpen"
      class="board-dialog"
      title="更新项目信息"
      width="min(560px, 92vw)"
      @closed="restoreEditFocus"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editRules"
        label-position="top"
        class="edit-form"
        @submit.prevent="submitEdit"
      >
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="editForm.name" maxlength="30" show-word-limit />
        </el-form-item>

        <div class="edit-grid">
          <el-form-item label="负责人" prop="owner">
            <el-select v-model="editForm.owner" placeholder="选择负责人">
              <el-option
                v-for="owner in projectOwners"
                :key="owner"
                :label="owner"
                :value="owner"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="项目状态" prop="status">
            <el-select v-model="editForm.status" placeholder="选择状态">
              <el-option
                v-for="status in projectStatuses"
                :key="status.value"
                :label="status.label"
                :value="status.value"
              />
            </el-select>
          </el-form-item>
        </div>

        <div class="edit-grid">
          <el-form-item label="计划上线" prop="launchDate">
            <el-date-picker
              v-model="editForm.launchDate"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="选择日期"
              class="edit-date"
            />
          </el-form-item>

          <el-form-item label="重点关注">
            <el-switch v-model="editForm.priority" active-text="是" inactive-text="否" />
          </el-form-item>
        </div>

        <p class="edit-hint">保存后会更新当前看板中的项目信息与统计。</p>
      </el-form>

      <template #footer>
        <div class="detail-actions">
          <el-button @click="editOpen = false">取消</el-button>
          <el-button type="primary" @click="submitEdit">保存更新</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--line-strong);
}

.page-head__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 28px;
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.board-summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.summary-card {
  padding: 18px 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.summary-card__label {
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.summary-card__value {
  margin-top: 8px;
  font-family: var(--font-display);
  font-size: clamp(26px, 3vw, 34px);
  font-weight: 600;
  line-height: 1.1;
  color: var(--ink);
}

.summary-card__value span {
  margin-left: 4px;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 400;
  color: var(--muted);
}

.board-shell {
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.board-alert {
  margin-bottom: 18px;
}

.board-tabs :deep(.el-tabs__header) {
  margin-bottom: 18px;
}

.board-tabs :deep(.el-tabs__nav-wrap::after) {
  height: 1px;
  background-color: var(--line);
}

.board-tabs :deep(.el-tabs__item) {
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.board-tabs :deep(.el-tabs__item.is-active) {
  color: var(--accent);
}

.board-tabs :deep(.el-tabs__active-bar) {
  background-color: var(--accent);
}

.board-tabs :deep(.el-tabs__content) {
  display: none;
}

.board-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.filter-input {
  width: 250px;
}

.filter-select {
  width: 150px;
}

.filter-date {
  width: 180px;
}

.filter-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  font-size: 13px;
  color: var(--muted);
}

.filter-reset {
  color: var(--muted);
}

.board-loading {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;
}

.board-table-wrap {
  width: 100%;
}

.board-table {
  width: 100%;
  --el-table-bg-color: var(--surface);
  --el-table-tr-bg-color: var(--surface);
  --el-table-header-bg-color: var(--paper-deep);
  --el-table-row-hover-bg-color: var(--hover-soft);
  --el-table-border-color: var(--line);
  --el-table-text-color: var(--ink-soft);
  --el-table-header-text-color: var(--muted);
}

.board-table :deep(th.el-table__cell) {
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.08em;
}

.board-table :deep(.el-table__inner-wrapper::before) {
  background-color: var(--line);
}

.cell-project {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px 0;
}

.cell-project__id {
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.cell-project strong {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--ink);
}

.cell-project__client {
  font-size: 12px;
  color: var(--muted);
}

.cell-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cell-progress :deep(.el-progress) {
  flex: 1;
}

.cell-progress span {
  width: 34px;
  font-size: 12px;
  text-align: right;
  color: var(--muted);
}

.is-overdue {
  color: var(--danger);
  font-weight: 600;
}

.board-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}

.board-footer__count {
  font-size: 12px;
  color: var(--muted);
}

.board-footer :deep(.el-pagination) {
  flex-wrap: wrap;
}

.detail-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.detail-summary {
  margin-top: 16px;
  font-size: 14px;
  line-height: 1.85;
  color: var(--ink-soft);
}

.detail-progress {
  margin: 22px 0;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--paper);
}

.detail-progress__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 12px;
  color: var(--muted);
}

.detail-progress__head strong {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  color: var(--ink);
}

.detail-descriptions {
  margin-top: 6px;
}

.detail-descriptions :deep(.el-descriptions__label) {
  width: 104px;
  font-size: 12px;
  color: var(--muted);
}

.detail-descriptions :deep(.el-descriptions__content) {
  font-size: 13px;
  color: var(--ink-soft);
}

.detail-block {
  margin-top: 26px;
}

.detail-block h3 {
  margin-bottom: 12px;
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.detail-steps {
  padding-left: 2px;
}

.detail-steps :deep(.el-step__title) {
  font-size: 13px;
  font-weight: 600;
}

.detail-steps :deep(.el-step__description) {
  font-size: 12px;
  line-height: 1.7;
}

.detail-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.edit-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 16px;
}

.edit-form :deep(.el-form-item__label) {
  font-size: 12.5px;
  color: var(--ink-soft);
}

.edit-form :deep(.el-select) {
  width: 100%;
}

.edit-date {
  width: 100%;
}

.edit-hint {
  font-size: 12px;
  color: var(--muted);
}

@media (max-width: 900px) {
  .board-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .filter-input,
  .filter-select,
  .filter-date {
    flex: 1;
    width: auto;
    min-width: 160px;
  }

  .filter-switch {
    margin-left: 0;
  }
}

@media (max-width: 600px) {
  .board-shell {
    padding: 16px;
    border-radius: var(--radius);
  }

  .board-summary {
    gap: 10px;
  }

  .summary-card {
    padding: 14px 16px;
  }

  .filter-input,
  .filter-select,
  .filter-date {
    flex: none;
    width: 100%;
    min-width: 0;
  }

  .filter-reset {
    width: 100%;
  }

  .board-footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .edit-grid {
    grid-template-columns: 1fr;
  }
}
</style>
