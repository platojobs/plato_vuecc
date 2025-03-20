/**
 * 站点展示数据（占位 / 示例内容）
 *
 * 说明：
 * 1. 本文件集中存放全站文案与结构化数据，方便后续替换为真实内容。
 * 2. 全部公司信息、产品、案例、指标均为原创虚构的示例素材，不代表真实客户或业绩。
 * 3. 联系方式使用 example.com / 全零号码等占位值，接入真实业务前请整体替换。
 */

export const brand = {
  name: 'Plato科技',
  nameEn: 'PLATO TECHNOLOGY',
  slogan: '让技术方案，从图纸走到现场',
  description:
    'Plato科技专注于把设备接入、边缘数据处理与现场运维串成一条可交付的链路。',
}

export const nav = [
  { label: '首页', to: '/' },
  { label: '产品与解决方案', to: '/products' },
  { label: '行业应用', to: '/industries' },
  { label: '关于我们', to: '/about' },
  { label: '联系我们', to: '/contact' },
]

export const hero = {
  eyebrow: 'PLATO TECH · 边缘与场景',
  title: '让技术方案，\n从图纸走到现场',
  description:
    '我们把设备接入、数据处理与现场运维串成一条可交付的链路。不做概念堆叠，只关心一件事：方案能不能在真实的场景里稳定运转。',
  primaryCta: { label: '浏览产品与方案', to: '/products' },
  secondaryCta: { label: '聊聊你的场景', to: '/contact' },
  keywords: ['协议适配优先', '现场友好设计', '渐进式交付'],
  badges: [
    { label: '接入', value: '异构设备统一入口' },
    { label: '观测', value: '链路状态实时可见' },
    { label: '运维', value: '操作有记录可回滚' },
  ],
}

export const capabilities = [
  {
    index: '01',
    title: '连接层',
    subtitle: '设备与协议接入',
    description:
      '用统一的适配层承接不同厂商、不同年代的设备协议，先把数据稳定收上来，再谈上层的分析与展示。',
    points: ['多协议模板管理', '设备身份与分组', '断网缓存与续传'],
  },
  {
    index: '02',
    title: '数据层',
    subtitle: '边缘计算与清洗',
    description:
      '在靠近现场的位置完成过滤、聚合与缓存，减少无效数据上行，让有限的网络带宽优先服务关键业务。',
    points: ['边缘规则编排', '数据清洗与聚合', '本地缓存策略'],
  },
  {
    index: '03',
    title: '观测层',
    subtitle: '实时状态与告警',
    description:
      '把设备、链路与任务的状态放到同一块看板上，让异常先于业务暴露，而不是等用户反馈才发现。',
    points: ['统一状态看板', '分级告警策略', '历史数据回溯'],
  },
  {
    index: '04',
    title: '运维层',
    subtitle: '远程控制与流程',
    description:
      '用可回滚的操作流程替代临时脚本，每一次远程处置都有记录、有审批、有退路。',
    points: ['操作手册编排', '审批与权限', '变更审计日志'],
  },
]

export const workMethod = [
  {
    index: '01',
    title: '先看现场',
    description: '了解设备、网络、人员与既有系统，把约束条件写清楚，再决定技术选型。',
  },
  {
    index: '02',
    title: '再拆问题',
    description: '把大目标拆成可验证的小链路，明确每一步的输入、输出与验收方式。',
  },
  {
    index: '03',
    title: '小步交付',
    description: '先跑通一条端到端链路，再逐步替换与扩展，避免一次性推倒重来。',
  },
  {
    index: '04',
    title: '留下文档',
    description: '接入方式、拓扑关系、操作流程都记录在案，让后续接手的人不必靠猜。',
  },
]

export const productCategories = [
  { id: 'all', label: '全部' },
  { id: 'edge', label: '接入与边缘' },
  { id: 'insight', label: '数据与可视' },
  { id: 'ops', label: '运维与安全' },
  { id: 'studio', label: '场景工具' },
]

export const products = [
  {
    slug: 'edgehub',
    name: '星图 EdgeHub',
    nameEn: 'EdgeHub',
    category: 'edge',
    categoryLabel: '接入与边缘',
    tone: 1,
    tagline: '把异构设备收进一张统一的接入表',
    summary:
      '面向多厂商、多协议现场的边缘接入网关方案，负责设备注册、协议转换与断网续传，为上层应用提供稳定的数据底座。',
    description:
      '现场设备往往是分批采购、逐年叠加的，协议版本参差不齐。星图 EdgeHub 用模板化的方式描述每种设备的接入方式，把差异收敛在适配层，上层应用不必为每台设备写一套逻辑。',
    highlights: [
      { title: '协议模板化', description: '用可复用的模板描述点位、指令与上报周期，新设备按模板接入。' },
      { title: '断网续传', description: '网络抖动时先落本地缓存，恢复后按时间顺序补传，减少数据缺口。' },
      { title: '边缘规则', description: '支持在网关侧完成阈值判断与聚合，降低上行数据量与响应延迟。' },
    ],
    specs: [
      { label: '典型部署', value: '现场网关 / 边缘服务器' },
      { label: '接入方式', value: '模板配置 + 少量自定义适配' },
      { label: '数据策略', value: '本地缓存、批量上报、按需回放' },
      { label: '适用规模', value: '数十到数百台设备的单点现场' },
    ],
    useCases: ['制造车间的多品牌设备接入', '偏远站点的弱网数据回传', '园区子系统的统一采集'],
  },
  {
    slug: 'flowlens',
    name: '澄流 FlowLens',
    nameEn: 'FlowLens',
    category: 'insight',
    categoryLabel: '数据与可视',
    tone: 2,
    tagline: '让数据链路的状态一眼可见',
    summary:
      '面向实时数据流的观测工具，呈现采集、传输、处理各环节的延迟与成功率，并支持对历史片段进行回放比对。',
    description:
      '数据出了问题，最难的不是修复，而是先找到问题发生在哪一段。澄流 FlowLens 把一条数据链路拆成若干可观测的节点，用统一的时间轴对齐，帮助定位是采集缺失、传输延迟还是处理逻辑出错。',
    highlights: [
      { title: '链路时间轴', description: '采集、传输、处理三个阶段同轴展示，延迟与缺口一目了然。' },
      { title: '片段回放', description: '选中一段时间窗口即可回放原始数据，复现问题时的现场状态。' },
      { title: '异常对照', description: '把正常样本与异常样本并排比较，减少凭经验猜测。' },
    ],
    specs: [
      { label: '观测对象', value: '数据流、任务、接口调用' },
      { label: '核心视图', value: '链路拓扑 / 时间轴 / 明细检索' },
      { label: '数据保留', value: '按窗口滚动保留，可配置' },
      { label: '典型用户', value: '数据工程与现场运维人员' },
    ],
    useCases: ['采集缺失的快速定位', '上线前的数据质量核对', '跨系统数据一致性排查'],
  },
  {
    slug: 'meshweave',
    name: '织网 MeshWeave',
    nameEn: 'MeshWeave',
    category: 'edge',
    categoryLabel: '接入与边缘',
    tone: 3,
    tagline: '把现场网络画成一张可操作的拓扑',
    summary:
      '用于梳理现场设备、网关与子系统连接关系的拓扑编排工具，支持批量配置与变更前的影响检查。',
    description:
      '当现场设备数量上升，靠表格维护连接关系很容易失真。织网 MeshWeave 用可视化的拓扑把设备与链路组织起来，配置变更前先计算影响范围，避免牵一发而动全身。',
    highlights: [
      { title: '拓扑可视化', description: '按区域、楼层或产线组织视图，支持缩放与分组折叠。' },
      { title: '批量下发', description: '对同组设备执行统一配置，减少逐台操作的重复劳动。' },
      { title: '变更预检', description: '下发前提示受影响的设备与链路，降低误操作风险。' },
    ],
    specs: [
      { label: '拓扑粒度', value: '区域 / 网关 / 设备 / 链路' },
      { label: '批量能力', value: '分组配置、模板复用、差异对比' },
      { label: '安全策略', value: '变更前预检 + 操作留痕' },
      { label: '典型规模', value: '单现场数百节点的关系梳理' },
    ],
    useCases: ['园区子系统连接关系梳理', '产线改造前的链路评估', '多站点网络结构统一管理'],
  },
  {
    slug: 'beaconops',
    name: '灯塔 BeaconOps',
    nameEn: 'BeaconOps',
    category: 'ops',
    categoryLabel: '运维与安全',
    tone: 4,
    tagline: '把临时脚本变成可回滚的操作手册',
    summary:
      '面向现场运维的自动化控制台，把常见处置动作编排成标准流程，支持审批、执行记录与失败回滚。',
    description:
      '很多现场问题靠老师傅的临时脚本解决，处理得快，但难以复用也难以追溯。灯塔 BeaconOps 把这些动作沉淀成流程：谁发起、谁审批、执行了哪些步骤、失败时如何回退，全部留有记录。',
    highlights: [
      { title: '流程编排', description: '把多条操作组合成手册，支持条件分支与人工确认节点。' },
      { title: '权限与审批', description: '按角色控制可执行范围，高风险动作必须经过审批。' },
      { title: '失败回滚', description: '每一步记录前置状态，失败时按预案回退，减少现场损失。' },
    ],
    specs: [
      { label: '核心能力', value: '手册编排 / 审批 / 执行 / 审计' },
      { label: '执行方式', value: '手动触发、定时触发、告警联动' },
      { label: '记录粒度', value: '按步骤记录输入、输出与耗时' },
      { label: '典型场景', value: '远程重启、参数下发、批量巡检' },
    ],
    useCases: ['夜间无人值守的远程处置', '批量设备参数下发', '故障处置流程标准化'],
  },
  {
    slug: 'bedrockguard',
    name: '磐石 BedrockGuard',
    nameEn: 'BedrockGuard',
    category: 'ops',
    categoryLabel: '运维与安全',
    tone: 5,
    tagline: '让设备安全基线可查、可比、可追踪',
    summary:
      '设备安全基线与配置巡检方案，定期核对固件版本、开放端口与账号策略，输出可追踪的差异报告。',
    description:
      '安全风险常常来自一台被遗忘的设备：固件过旧、端口敞开、默认账号未改。磐石 BedrockGuard 把基线定义成可执行的检查项，定期扫描并输出差异，让整改有清单、复查有依据。',
    highlights: [
      { title: '基线检查', description: '把安全要求整理为检查项，按设备类型分组执行。' },
      { title: '资产清册', description: '记录固件版本、开放服务与联系人，形成可维护的设备台账。' },
      { title: '差异追踪', description: '每次巡检与上次结果对比，只关注发生变化的部分。' },
    ],
    specs: [
      { label: '检查维度', value: '固件版本 / 账号策略 / 开放端口' },
      { label: '执行方式', value: '定期巡检、按需扫描、导入清单' },
      { label: '输出形式', value: '差异报告与整改清单' },
      { label: '适用范围', value: '现场网关、服务器与网络设备' },
    ],
    useCases: ['季度安全巡检', '新设备入网前的基线核对', '老旧设备替换优先级排序'],
  },
  {
    slug: 'scenekit',
    name: '拾光 SceneKit',
    nameEn: 'SceneKit',
    category: 'studio',
    categoryLabel: '场景工具',
    tone: 6,
    tagline: '用搭积木的方式组织一块场景看板',
    summary:
      '面向业务人员的场景看板搭建工具，通过预置组件组合出设备状态、趋势与告警视图，支持移动端预览。',
    description:
      '看板需求常常变化，每次修改都排期开发并不现实。拾光 SceneKit 提供一组经过整理的展示组件，让熟悉业务的人自行组合出需要的视图，并在桌面与移动端同步预览。',
    highlights: [
      { title: '组件化搭建', description: '状态卡、趋势线、告警列表等组件按网格自由组合。' },
      { title: '主题与密度', description: '内置深浅两套主题，可调整信息密度适配大屏与手机。' },
      { title: '多端预览', description: '搭建时同步查看桌面与移动端效果，减少返工。' },
    ],
    specs: [
      { label: '搭建方式', value: '网格拖拽 + 组件配置' },
      { label: '内置组件', value: '状态、趋势、列表、地图占位等' },
      { label: '输出形式', value: '网页看板，支持移动端预览' },
      { label: '典型用户', value: '业务运营与现场管理人员' },
    ],
    useCases: ['现场值班看板', '领导汇报用的数据摘要页', '多站点状态汇总'],
  },
]

export const solutions = [
  {
    id: 'access',
    title: '设备统一接入方案',
    tagline: '先让数据收得上来',
    description:
      '适合设备品牌多、协议版本杂的现场。先用接入模板收敛差异，再补上拓扑梳理，避免每来一台新设备就改一次代码。',
    modules: ['edgehub', 'meshweave'],
    suited: '设备分批采购、供应商各不相同的存量现场',
  },
  {
    id: 'observability',
    title: '数据链路可观测方案',
    tagline: '出了问题，先知道问题在哪一段',
    description:
      '把采集、传输、处理拆成可观测的节点，用时间轴对齐延迟与缺口。适合对数据完整性要求较高的业务链路。',
    modules: ['flowlens', 'edgehub'],
    suited: '数据链路长、上下游系统多的场景',
  },
  {
    id: 'operations',
    title: '现场运维规范化方案',
    tagline: '把经验变成可复用的流程',
    description:
      '把高频处置动作沉淀为有审批、有记录、可回滚的操作流程，同时用安全基线巡检兜住设备侧的风险。',
    modules: ['beaconops', 'bedrockguard'],
    suited: '远程处置多、值守人员流动较快的现场',
  },
]

export const industries = [
  {
    id: 'manufacturing',
    name: '制造车间',
    nameEn: 'Manufacturing',
    tone: 1,
    scene: '多品牌设备并存，产线停机成本高，异常往往在交接班时才被发现。',
    pain: ['设备协议不统一，数据分散在各自的系统里', '告警噪音大，真正需要处理的信息被淹没', '临时处置依赖个人经验，交接容易断档'],
    approach: ['用统一接入层承接新旧设备，先解决数据完整性', '按产线组织状态看板，只保留可执行的分级告警', '把高频处置动作沉淀为标准流程并留存记录'],
    outcomes: ['减少因信息滞后造成的无效停机（示例表述）', '交接班所需的信息汇总时间缩短（示例表述）'],
    caseStudy: {
      title: '示例案例：某装配车间的接入改造',
      summary:
        '把三条产线的老旧设备接入统一网关，先用状态看板替代人工巡检，再逐步把换型操作迁移到流程化控制台。',
      note: '以上为虚构示例，用于展示页面结构，不代表真实项目。',
    },
  },
  {
    id: 'logistics',
    name: '物流仓储',
    nameEn: 'Logistics',
    tone: 2,
    scene: '扫码、分拣、称重设备品牌混杂，峰值时段链路压力集中。',
    pain: ['设备故障定位慢，影响分拣效率', '不同厂商的接口与数据格式差异大', '峰值时段的链路瓶颈缺少可视化依据'],
    approach: ['建立设备接入模板库，缩短新设备上线时间', '用链路观测工具定位瓶颈环节', '对关键设备设置分级告警与值班看板'],
    outcomes: ['设备上线配置工作量下降（示例表述）', '链路异常定位时间缩短（示例表述）'],
    caseStudy: {
      title: '示例案例：区域分拣中心的链路观测',
      summary:
        '先对分拣线上游的采集与传输环节做全链路观测，找出峰值时段的延迟集中点，再分批调整上报策略。',
      note: '以上为虚构示例，用于展示页面结构，不代表真实项目。',
    },
  },
  {
    id: 'campus',
    name: '园区楼宇',
    nameEn: 'Campus',
    tone: 3,
    scene: '门禁、照明、空调、安防各自成体系，跨系统联动困难。',
    pain: ['子系统由不同供应商维护，接口口径不一致', '跨系统联动靠人工通知，响应慢', '拓扑关系缺少统一视图，改造风险高'],
    approach: ['用拓扑工具梳理子系统与链路关系', '把跨系统联动编排成可追溯的流程', '改造前执行影响预检，降低误操作'],
    outcomes: ['跨系统联动响应更及时（示例表述）', '改造前的评估更完整（示例表述）'],
    caseStudy: {
      title: '示例案例：园区子系统的拓扑梳理',
      summary:
        '把分散在多个供应商手里的连接关系汇总到一张拓扑图上，先做只读梳理，再逐步接管配置变更。',
      note: '以上为虚构示例，用于展示页面结构，不代表真实项目。',
    },
  },
  {
    id: 'energy',
    name: '能源站点',
    nameEn: 'Energy',
    tone: 4,
    scene: '站点分散、网络不稳定，现场值守成本高。',
    pain: ['弱网环境下数据经常出现缺口', '远程操作缺少审批与回滚机制', '设备安全基线难以持续跟踪'],
    approach: ['边缘侧缓存与续传优先保障关键数据', '远程操作走审批流程并记录每一步状态', '定期巡检安全基线，输出差异清单'],
    outcomes: ['弱网下的数据完整度提升（示例表述）', '远程处置的可追溯性增强（示例表述）'],
    caseStudy: {
      title: '示例案例：偏远站点的远程巡检',
      summary:
        '在站点侧部署缓存与续传策略，配合远程巡检流程，把原本必须到场的例行检查改为线上执行。',
      note: '以上为虚构示例，用于展示页面结构，不代表真实项目。',
    },
  },
  {
    id: 'agriculture',
    name: '农业设施',
    nameEn: 'Agriculture',
    tone: 5,
    scene: '环境波动频繁，阈值设置依赖经验，移动端查看需求强。',
    pain: ['环境数据采集间隔不统一', '阈值联动规则调整不便', '现场人员更习惯用手机查看'],
    approach: ['统一采集节奏，先保证数据可比', '把阈值联动做成可调整的规则', '看板默认适配移动端浏览'],
    outcomes: ['环境异常发现更及时（示例表述）', '规则调整不再依赖开发排期（示例表述）'],
    caseStudy: {
      title: '示例案例：温室环境的阈值联动',
      summary:
        '先用统一采集节奏解决数据不可比的问题，再把通风与补光策略整理成可调整的规则，交由现场人员维护。',
      note: '以上为虚构示例，用于展示页面结构，不代表真实项目。',
    },
  },
  {
    id: 'retail',
    name: '零售门店',
    nameEn: 'Retail',
    tone: 6,
    scene: '门店数量多、单店设备少，问题往往靠电话报修。',
    pain: ['单店故障信息描述不清，远程判断困难', '设备台账分散，维保到期容易遗漏', '总部缺少跨门店的统一视图'],
    approach: ['建立轻量设备台账，记录型号与维保信息', '用统一看板汇总门店状态', '把常见故障整理成自助排查指引'],
    outcomes: ['远程判断所需信息更完整（示例表述）', '维保遗漏情况减少（示例表述）'],
    caseStudy: {
      title: '示例案例：连锁门店的设备台账',
      summary:
        '从一张可维护的设备台账开始，先解决“店里有什么设备”这个基础问题，再逐步接入状态数据。',
      note: '以上为虚构示例，用于展示页面结构，不代表真实项目。',
    },
  },
]

export const stats = [
  { value: '6', unit: '个', label: '产品模块', description: '覆盖接入、观测、运维与场景搭建。' },
  { value: '4', unit: '层', label: '能力模型', description: '从连接到运维的递进式结构。' },
  { value: '12', unit: '类', label: '场景模板', description: '示例行业场景，可在数据文件中继续扩展。' },
  { value: '0', unit: '依赖', label: '后端服务', description: '纯前端骨架，所有展示数据来自本地 mock。' },
]

export const statsNote = '以上数字仅用于演示页面结构与排版，不代表真实业绩或客户规模。'

export const homeCta = {
  eyebrow: '下一步',
  title: '把你的场景说清楚，\n剩下的我们一起拆',
  description:
    '不需要一开始就想完整方案。把现场的设备、网络和最难处理的那个环节讲明白，我们就可以从一条小链路开始验证。',
  primaryCta: { label: '前往联系我们', to: '/contact' },
  secondaryCta: { label: '先看看产品', to: '/products' },
}

export const about = {
  eyebrow: 'ABOUT PLATO',
  title: '一支相信“现场验证”的小团队',
  lead:
    'Plato科技是一个用于个人练手的品牌站点设定。它虚构了一家专注于边缘接入与现场运维的技术团队，用来承载页面结构、内容组织与交互设计的练习。',
  paragraphs: [
    '我们不喜欢把技术讲得比实际更复杂。一个方案好不好，最终要看它在现场能不能被安装、被理解、被维护。所以在这里，产品介绍会先讲适用场景与边界，再讲能力清单。',
    '对“能落地”的判断标准很朴素：数据能不能稳定收上来，异常能不能被及时发现，操作失败时有没有退路。围绕这三点，我们把能力整理成连接、数据、观测、运维四层。',
    '需要说明的是，本站所有公司叙述、客户案例与指标均为示例内容，仅用于展示站点骨架，不构成任何真实业务承诺。',
  ],
  principles: [
    {
      index: '01',
      title: '现场优先',
      description: '先回答“在现场能不能用”，再讨论指标与架构。脱离现场条件的方案，再漂亮也只是图纸。',
    },
    {
      index: '02',
      title: '少即是多',
      description: '一个场景只解决最关键的两三个问题。功能表堆得再长，没人用也等于零。',
    },
    {
      index: '03',
      title: '可解释',
      description: '每一个自动动作都应该能被回溯、被暂停、被人工接管，而不是一个无法干预的黑盒。',
    },
  ],
  roadmap: [
    {
      phase: '阶段一',
      title: '骨架搭建',
      description: '确定信息架构、设计语言与 mock 数据层，跑通首页到详情页的完整浏览路径。',
      status: '进行中',
    },
    {
      phase: '阶段二',
      title: '内容完善',
      description: '补齐产品详情、案例细节与多语言文案，替换全部示例素材。',
      status: '规划中',
    },
    {
      phase: '阶段三',
      title: '能力接入',
      description: '接入真实数据源与表单服务，增加内容管理能力，补齐 SEO 与埋点。',
      status: '规划中',
    },
  ],
  roadmapNote: '以上为示例路线图，用于展示页面结构，不代表真实开发计划。',
  team: [
    { role: '产品与体验', description: '梳理场景、定义信息结构，判断一个功能是否值得做。' },
    { role: '前端工程', description: '负责页面实现、交互细节与性能，把设计稿变成可用的界面。' },
    { role: '内容与运营', description: '整理产品叙述与案例表达，确保对外信息准确、可读。' },
  ],
  stack: ['Vue 3', 'Vite', 'Vue Router', 'Composition API', 'CSS Variables'],
}

export const contact = {
  eyebrow: 'CONTACT',
  title: '从一个具体问题开始聊',
  lead:
    '如果你也正在面对设备接入、数据链路或现场运维的难题，可以把现状写下来发给我们。以下联系方式与表单均为演示占位。',
  channels: [
    { label: '邮箱', value: 'hello@example.com', note: '占位邮箱，请替换为真实地址' },
    { label: '电话', value: '000-0000-0000', note: '占位号码，仅用于页面展示' },
    { label: '地址', value: '示例地址 · 某市某区某某路 8 号', note: '虚构地址，不指向真实地点' },
    { label: '工作时间', value: '工作日 09:30 – 18:30', note: '示例时间安排' },
  ],
  topics: ['产品咨询', '方案交流', '合作洽谈', '其他问题'],
  formNote: '本表单仅做前端校验与提交占位，不会把内容发送到任何服务器。',
}

export const footer = {
  blurb:
    'Plato科技是一个纯前端的品牌站点骨架，用于练习信息架构、页面布局与交互实现。站内内容均为示例素材。',
  columns: [
    {
      title: '导航',
      links: [
        { label: '首页', to: '/' },
        { label: '产品与解决方案', to: '/products' },
        { label: '行业应用', to: '/industries' },
      ],
    },
    {
      title: '了解我们',
      links: [
        { label: '关于我们', to: '/about' },
        { label: '联系我们', to: '/contact' },
      ],
    },
    {
      title: '产品',
      links: [
        { label: '星图 EdgeHub', to: '/products/edgehub' },
        { label: '澄流 FlowLens', to: '/products/flowlens' },
        { label: '灯塔 BeaconOps', to: '/products/beaconops' },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Plato科技 · 演示站点`,
}
