/**
 * 站点展示数据
 *
 * 说明：
 * 1. 本文件集中存放全站文案与结构化数据，页面只负责呈现，不重复硬编码业务文案。
 * 2. 修改公司叙述、产品、方案、行业场景或指标时，只需更新本文件。
 * 3. 新增产品会按 slug 自动匹配 /products/:slug 详情路由，无需改动路由表。
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
  { label: '洞察', to: '/insights' },
  { label: '常见问题', to: '/faq' },
  { label: '关于我们', to: '/about' },
  { label: '联系我们', to: '/contact' },
]

export const hero = {
  eyebrow: 'PLATO TECH · 边缘接入与现场运维',
  title: '让技术方案，\n从图纸走到现场',
  description:
    'Plato科技为制造、物流、园区与能源场景提供设备接入、边缘数据处理与远程运维能力。我们把分散的设备、协议与系统收敛成一条可交付的链路，让现场状态可观测、处置可追溯。',
  primaryCta: { label: '浏览产品与方案', to: '/products' },
  secondaryCta: { label: '聊聊你的场景', to: '/contact' },
  keywords: ['多协议适配', '边缘侧数据处理', '运维流程闭环'],
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
      '面向多厂商、多协议现场的边缘接入网关，负责设备注册、协议转换与断网续传，为上层应用提供稳定的数据底座。',
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
      '数据出了问题，最难的不是修复，而是先找到问题发生在哪一段。澄流 FlowLens 把一条数据链路拆成若干可观测的节点，用统一的时间轴对齐，帮助判断是采集缺失、传输延迟还是处理逻辑出错。',
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
      '很多现场问题靠临时脚本解决，处理得快，但难以复用也难以追溯。灯塔 BeaconOps 把这些动作沉淀成流程：谁发起、谁审批、执行了哪些步骤、失败时如何回退，全部留有记录。',
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
      { label: '内置组件', value: '状态卡、趋势线、列表、拓扑图等' },
      { label: '输出形式', value: '网页看板，支持移动端预览' },
      { label: '典型用户', value: '业务运营与现场管理人员' },
    ],
    useCases: ['现场值班看板', '管理层数据摘要页', '多站点状态汇总'],
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
    outcomes: ['设备与产线状态在同一视图内可查', '交接班所需的信息在系统中直接取用'],
    caseStudy: {
      title: '多产线设备的渐进式接入',
      summary:
        '先从一条产线的老旧设备入手，接入统一网关并用状态看板替代人工巡检；验证稳定后，再把换型操作迁移到流程化控制台，逐条产线复制。',
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
    outcomes: ['新设备接入从逐台配置转为模板复用', '链路瓶颈可以由数据定位而非经验推测'],
    caseStudy: {
      title: '分拣中心的全链路观测',
      summary:
        '先对分拣线上游的采集与传输环节建立全链路观测，找出峰值时段的延迟集中点，再分批调整上报策略，并用看板持续验证效果。',
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
    outcomes: ['子系统关系形成一张可持续维护的拓扑图', '改造前的影响范围有据可查'],
    caseStudy: {
      title: '园区子系统的拓扑梳理',
      summary:
        '把分散在多个供应商手里的连接关系汇总到一张拓扑图上，先做只读梳理与现状确认，再逐步接管配置变更，避免一次性切换带来的风险。',
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
    outcomes: ['关键数据在弱网条件下仍能保持连续', '远程处置的每一步都可追溯、可回退'],
    caseStudy: {
      title: '偏远站点的远程巡检',
      summary:
        '在站点侧部署缓存与续传策略，配合远程巡检流程，把原本必须到场的例行检查改为线上执行，并保留完整操作记录供复核。',
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
    outcomes: ['不同批次的环境数据具备可比性', '规则调整可由现场人员自行完成'],
    caseStudy: {
      title: '温室环境的阈值联动',
      summary:
        '先用统一采集节奏解决数据不可比的问题，再把通风与补光策略整理成可调整的规则，交由现场人员维护，技术团队只负责规则模板与边界。',
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
    outcomes: ['远程判断所需信息在台账中可直接获取', '维保到期与设备变更可提前安排'],
    caseStudy: {
      title: '连锁门店的设备台账',
      summary:
        '从一张可维护的设备台账开始，先解决“每家店有什么设备”这个基础问题，再逐步接入状态数据与自助排查指引，降低对电话报修的依赖。',
    },
  },
]

export const stats = [
  { value: '6', unit: '个', label: '产品模块', description: '覆盖接入、观测、运维与场景搭建四类能力。' },
  { value: '4', unit: '层', label: '能力模型', description: '连接、数据、观测、运维的递进式结构。' },
  { value: '6', unit: '类', label: '行业场景', description: '沉淀常见现场约束与可复用的实施路径。' },
  { value: '3', unit: '组', label: '组合方案', description: '按接入、可观测与运维目标组合模块。' },
]

export const statsNote = '以上为当前产品与场景的覆盖范围，具体能力边界以项目评估结果为准。'

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
  title: '一支以现场为起点的工程团队',
  lead:
    'Plato科技专注于边缘接入与现场运维。我们的工作从现场条件出发，把设备、数据与流程整理成一套可持续运行的系统。',
  paragraphs: [
    '我们面对的现场通常并不完美：设备来自不同厂商，网络时好时坏，系统在多年间逐步叠加。我们的做法是先厘清约束，再决定技术选型，而不是先交出一张漂亮的架构图。',
    '判断一个方案是否成立，我们看三件事：数据能不能稳定收上来，异常能不能被及时发现，操作失败时有没有退路。围绕这三点，能力被整理成连接、数据、观测、运维四层。',
    '交付不止于上线。接入方式、拓扑关系与操作流程都会整理成文档，让现场团队能够独立维护，也让后续扩展有据可依。',
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
      description: '一个场景先解决最关键的两三个问题。功能表堆得再长，没人用也等于零。',
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
      title: '现场评估',
      description: '走访设备、网络与业务流程，明确约束条件、优先级与验收口径。',
      status: '1–2 周',
    },
    {
      phase: '阶段二',
      title: '试点验证',
      description: '选择一条代表性链路完成端到端验证，用实际数据校准方案。',
      status: '2–4 周',
    },
    {
      phase: '阶段三',
      title: '推广与交接',
      description: '把验证过的配置、流程与文档复制到其余现场，完成团队交接。',
      status: '按范围推进',
    },
  ],
  roadmapNote: '实际周期取决于现场规模、设备条件与系统改造范围，以上为常规项目的推进节奏。',
  team: [
    { role: '现场工程', description: '负责设备勘察、接入实施与现场联调，确保方案经得起真实环境。' },
    { role: '平台研发', description: '负责接入层、数据链路与运维平台的设计与实现。' },
    { role: '交付与支持', description: '负责项目推进、文档整理与上线后的持续支持。' },
  ],
  stack: ['边缘接入', '协议适配', '数据观测', '远程运维', '场景看板'],
}

export const contact = {
  eyebrow: 'CONTACT',
  title: '从一个具体问题开始聊',
  lead:
    '如果正在面对设备接入、数据链路或现场运维的问题，可以把现状写下来。我们会先做一次初步判断，再决定是否需要进一步沟通。',
  channels: [
    { label: '需求沟通', value: '通过本页表单提交', note: '说明设备规模、网络条件与当前最想解决的问题' },
    { label: '响应安排', value: '工作日 24 小时内', note: '收到完整信息后，我们会给出初步判断与下一步建议' },
    { label: '方案评估', value: '1–3 个工作日', note: '根据现场条件梳理可行路径与需要共同确认的前提' },
    { label: '服务时间', value: '工作日 09:30 – 18:30', note: '非工作时间的紧急事项，请在留言中注明' },
  ],
  topics: ['产品咨询', '方案交流', '合作洽谈', '其他问题'],
  formNote: '提交后我们会按响应安排与你联系，请尽量填写具体信息。',
}

export const footer = {
  blurb:
    'Plato科技专注设备接入、边缘数据处理与现场运维，把分散的设备与系统整理成一条可交付、可维护的链路。',
  columns: [
    {
      title: '导航',
      links: [
        { label: '首页', to: '/' },
        { label: '产品与解决方案', to: '/products' },
        { label: '行业应用', to: '/industries' },
        { label: '洞察', to: '/insights' },
        { label: '常见问题', to: '/faq' },
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
  copyright: `© ${new Date().getFullYear()} Plato科技`,
}

export const insightCategories = [
  { id: 'all', label: '全部' },
  { id: 'access', label: '接入实践' },
  { id: 'data', label: '数据观测' },
  { id: 'ops', label: '运维方法' },
  { id: 'industry', label: '行业观察' },
]

export const insights = [
  {
    slug: 'protocol-template-first',
    title: '设备接入先做模板化，后面才谈得上扩展',
    category: '接入实践',
    categoryId: 'access',
    date: '2026-10-14',
    readingTime: '6 分钟',
    tone: 1,
    excerpt:
      '现场设备来自不同厂商、不同年代。与其为每台设备写一套逻辑，不如先把接入方式整理成可复用的模板，让差异停留在适配层。',
    tags: ['设备接入', '协议适配', '实施方法'],
    lead:
      '接入工作的难点通常不在协议数量，而在差异有没有被收拢。模板化的意义不是省掉配置，而是让每一次新设备上线都沿着同一条路径完成。',
    sections: [
      {
        heading: '问题往往不在协议本身',
        paragraphs: [
          '同一类设备，不同厂商对点位命名、上报周期与异常码的定义可能完全不同。如果每一台设备都单独处理，代码会越来越长，排查也会越来越依赖具体经办人。',
          '我们的做法是先按设备类型归类，再把点位、指令、上报周期写成同一张模板。厂商差异作为模板里的可选项存在，而不是散落在业务代码中。',
        ],
        points: [
          '按设备类型归类，避免按厂商无限拆分',
          '把点位、指令与周期收敛到同一份描述里',
          '为字段缺失预留人工确认的入口',
        ],
      },
      {
        heading: '模板要能承接差异，也要能被看懂',
        paragraphs: [
          '模板不是越抽象越好。现场工程师需要能直接读懂某个点位对应哪台设备、哪条指令会改变什么状态。因此，模板里的字段命名应尽量贴近现场语言，而不是内部代号。',
          '在实施阶段，我们会先用一台代表性设备把模板跑通，再逐步加入同类型的其他设备。这样新增设备时，只需要补充差异项，不必重新走一遍完整流程。',
        ],
      },
      {
        heading: '上线之后如何维护',
        paragraphs: [
          '模板需要版本记录。一次字段调整可能影响多台设备，变更前应能看到受影响的设备清单，变更后应能回退到上一版。没有版本管理的模板，很快就会退化成另一份难以维护的表格。',
          '当模板数量增长到一定程度，可以按现场或产线建立模板分组，让新项目的起点来自已验证的组合，而不是从空白开始。',
        ],
      },
    ],
    takeaways: [
      '先归类设备类型，再谈协议差异',
      '模板字段使用现场语言，降低理解成本',
      '模板需要版本与影响范围，才能长期维护',
    ],
  },
  {
    slug: 'data-gap-diagnosis',
    title: '数据出现缺口时，先分清是哪一段丢了数据',
    category: '数据观测',
    categoryId: 'data',
    date: '2026-08-26',
    readingTime: '5 分钟',
    tone: 2,
    excerpt:
      '数据缺口可能发生在采集、传输或处理任一环节。先把链路拆开，再判断问题属于哪一类，比直接更换设备更有效。',
    tags: ['数据链路', '观测', '排障'],
    lead:
      '看到数据不连续时，最容易出现的反应是检查设备。但缺口也可能来自网络抖动、缓存策略或处理逻辑。先定位环节，才能避免把时间花在错误的方向。',
    sections: [
      {
        heading: '采集侧：设备是否按预期上报',
        paragraphs: [
          '先核对设备的实际上报记录，而不是看平台最终收到的数据。如果设备侧本身就没有产生记录，问题在采集配置、设备状态或供电网络，而不在数据链路。',
        ],
        points: [
          '核对上报周期与设备时钟是否一致',
          '确认设备是否处于离线或低功耗状态',
          '检查采集程序是否被重启或中断',
        ],
      },
      {
        heading: '传输侧：数据是否在路上丢失',
        paragraphs: [
          '网络抖动时，数据可能先进入本地缓存，再在恢复后补传。如果缓存策略与补传顺序没有对齐，就会出现看似丢失、实际延迟到达的情况。时间轴能帮助区分这两种状态。',
        ],
      },
      {
        heading: '处理侧：规则是否过滤了数据',
        paragraphs: [
          '清洗规则、阈值判断与聚合窗口都可能改变最终结果。排查时应暂时关闭非必要规则，用原始数据与处理结果并排比对，确认差异来自规则还是来自输入。',
          '当链路各段都有记录，问题就不再依赖经验判断。即使暂时无法修复，也能清楚说明缺口发生在哪里、影响哪些业务。',
        ],
      },
    ],
    takeaways: [
      '先看设备侧原始记录，再看平台结果',
      '延迟到达与真正丢失需要用时间轴区分',
      '处理规则应可暂时关闭，便于对照排查',
    ],
  },
  {
    slug: 'remote-ops-rollback',
    title: '远程运维的边界：哪些动作必须保留回滚路径',
    category: '运维方法',
    categoryId: 'ops',
    date: '2026-06-18',
    readingTime: '6 分钟',
    tone: 4,
    excerpt:
      '远程操作的效率来自减少到场，但前提是每一步都能被复核、被暂停。没有回滚路径的自动化，只是把风险集中到了更快的时间尺度上。',
    tags: ['远程运维', '流程编排', '回滚'],
    lead:
      '并非所有操作都适合远程执行。判断标准不是技术能否做到，而是失败之后是否还能回到可控状态。把这条边界画清楚，自动化才有意义。',
    sections: [
      {
        heading: '先区分可逆与不可逆',
        paragraphs: [
          '重启服务、调整参数、切换备用链路通常具备回退条件；而格式化存储、覆盖固件、批量删除配置则往往不可逆。后一类操作即使远程可执行，也应保留现场确认环节。',
        ],
      },
      {
        heading: '回滚不是一句“恢复默认”',
        paragraphs: [
          '有效的回滚需要记录操作前的状态，并确认回滚动作本身不会引入新的问题。流程设计时，应把前置状态、影响范围和验证方式一起写入步骤，而不是只写执行命令。',
        ],
        points: [
          '每一步记录输入参数与执行前状态',
          '高风险动作设置审批或双人确认',
          '失败分支明确回退顺序与验证点',
        ],
      },
      {
        heading: '把经验变成可复用的手册',
        paragraphs: [
          '临时脚本解决的是当下问题，流程手册解决的是下一次同类问题。把高频处置动作整理成有条件的步骤，可以让不同值班人员得到一致的处理结果，也便于事后复盘。',
          '流程不必一次做全。先从一条最常发生的处置开始，跑通记录、审批与回退，再逐步扩展。',
        ],
      },
    ],
    takeaways: [
      '不可逆动作应保留现场确认',
      '回滚需要前置状态与验证点，而不只是恢复命令',
      '先沉淀一条高频流程，再逐步扩展',
    ],
  },
  {
    slug: 'campus-topology-first',
    title: '园区改造前，先把子系统拓扑梳理清楚',
    category: '行业观察',
    categoryId: 'industry',
    date: '2026-04-09',
    readingTime: '5 分钟',
    tone: 3,
    excerpt:
      '门禁、照明、空调与安防往往由不同供应商维护。改造前如果缺少一张统一的拓扑图，影响范围就只能靠经验推测。',
    tags: ['园区', '拓扑梳理', '改造评估'],
    lead:
      '园区改造的风险，很多时候不在新系统本身，而在旧系统的连接关系没有被完整记录。拓扑梳理不是画一张好看的图，而是把变更前必须确认的事实摆到桌面上。',
    sections: [
      {
        heading: '先做只读梳理',
        paragraphs: [
          '在接管配置权之前，先以只读方式记录设备、网关与子系统之间的连接关系。这个阶段不追求完整，而追求准确：每一条记录的来源、确认方式与责任人应当清楚。',
        ],
        points: [
          '按区域与楼层建立视图，避免一张图承载全部细节',
          '记录设备型号、通信方式与维护联系人',
          '标注不确定项，而不是用推测填补空白',
        ],
      },
      {
        heading: '变更前计算影响范围',
        paragraphs: [
          '拓扑的价值在变更时体现。一次网关升级、一条链路调整，可能影响多个子系统。提前列出受影响的设备与业务，再决定变更窗口与回退方案，比事后补救更省成本。',
        ],
      },
      {
        heading: '让拓扑持续可用',
        paragraphs: [
          '拓扑图如果只在项目开始时更新，很快会与实际脱节。把变更记录与拓扑维护放在同一个流程里，才能让后来的人信任这张图。',
        ],
      },
    ],
    takeaways: [
      '先只读梳理，确认事实再接管配置',
      '不确定项应显式标注，避免推测扩散',
      '拓扑维护要与变更流程绑定',
    ],
  },
  {
    slug: 'weak-network-cache',
    title: '弱网站点的缓存策略，先确定哪些数据不能丢',
    category: '接入实践',
    categoryId: 'access',
    date: '2026-02-19',
    readingTime: '5 分钟',
    tone: 6,
    excerpt:
      '弱网环境下，所有数据都实时上传并不现实。缓存策略的关键不是存多少，而是明确哪些数据必须连续、哪些可以延后。',
    tags: ['弱网', '边缘缓存', '数据连续性'],
    lead:
      '网络条件无法改变时，能调整的是数据策略。先按业务影响给数据分级，再决定缓存位置、保留时长与补传顺序，链路才能在波动中保持可用。',
    sections: [
      {
        heading: '先给数据分级',
        paragraphs: [
          '告警、控制反馈与计量数据对连续性要求不同。把所有数据放在同一优先级，会导致真正关键的数据被大量非关键数据挤占带宽。分级不是技术细节，而是业务判断。',
        ],
        points: [
          '关键状态优先保留，允许非关键数据降频',
          '按时间顺序补传，避免恢复后再次拥塞',
          '为缓存容量设置明确上限与清理规则',
        ],
      },
      {
        heading: '缓存不是无限期的保险箱',
        paragraphs: [
          '本地存储有容量与寿命限制。需要明确数据保留窗口，并在容量接近上限时按优先级清理。没有清理规则的缓存，最终会以另一种方式影响业务。',
        ],
      },
      {
        heading: '恢复之后要能验证连续性',
        paragraphs: [
          '网络恢复并不代表数据一定完整。补传完成后应能核对缺口区间，确认哪些时段的数据仍然缺失。观测工具与缓存策略配合使用，才能把“看起来恢复了”变成“确认连续了”。',
        ],
      },
    ],
    takeaways: [
      '按业务影响给数据分级，而不是一律实时',
      '缓存需要容量上限与清理规则',
      '补传后要核对缺口区间，而不是只看恢复状态',
    ],
  },
]

export const faqGroups = [
  {
    id: 'product',
    title: '产品与能力',
    description: '关于模块边界、部署方式与适用范围的常见问题。',
    items: [
      {
        id: 'faq-single-module',
        question: '产品模块可以单独部署吗？',
        answer:
          '可以。每个模块对应一段相对独立的能力，例如接入网关、链路观测或运维流程。实际项目中，我们会先确认当前最需要解决的那一段，再判断它是单独部署更合适，还是需要与相邻模块组合。',
      },
      {
        id: 'faq-capability-boundary',
        question: '如何判断你们的能力是否覆盖我的场景？',
        answer:
          '通常从设备类型、协议数量、网络条件和运维方式四个方面做初步判断。把现场现状写清楚后，我们会给出能力边界与需要共同确认的前提，而不是先给一个笼统的“可以”。',
      },
      {
        id: 'faq-deployment-mode',
        question: '支持私有化部署吗？',
        answer:
          '部署方式需要结合现场网络、数据归属与运维责任来确定。我们会在评估阶段明确哪些组件部署在现场、哪些部署在中心侧，以及相应的访问与维护方式。',
      },
    ],
  },
  {
    id: 'access',
    title: '接入与部署',
    description: '设备接入、网络条件与实施节奏相关的问题。',
    items: [
      {
        id: 'faq-prepare',
        question: '接入前需要准备哪些信息？',
        answer:
          '建议先整理设备清单、厂商与型号、通信协议、网络拓扑，以及现有系统的接口情况。信息不必一次齐全，但应说明哪些是已知事实、哪些还需要现场确认，这能显著减少反复沟通。',
      },
      {
        id: 'faq-legacy-device',
        question: '老旧设备还能接入吗？',
        answer:
          '取决于设备是否具备可用的通信接口，以及协议文档是否完整。部分设备可以通过网关或串口转换接入，部分则需要补充采集硬件。我们会先做一次可行性确认，再给出实施顺序。',
      },
      {
        id: 'faq-network',
        question: '现场网络不稳定怎么办？',
        answer:
          '通常从边缘缓存、数据分级与补传策略入手，优先保障关键状态连续。网络条件无法改善时，策略设计比增加带宽更重要。',
      },
      {
        id: 'faq-timeline',
        question: '部署周期一般如何安排？',
        answer:
          '周期取决于现场规模、设备数量与系统改造范围。常规做法是先完成一条代表性链路的验证，再按现场分批推广。具体节奏会在评估后给出，不按固定模板承诺。',
      },
    ],
  },
  {
    id: 'delivery',
    title: '交付与支持',
    description: '项目推进方式、文档与上线后的支持安排。',
    items: [
      {
        id: 'faq-project-flow',
        question: '项目通常如何推进？',
        answer:
          '按现场评估、试点验证、推广交接三个阶段推进。每个阶段都有明确的输入与验收方式，避免在方案尚未验证时一次性铺开。',
      },
      {
        id: 'faq-docs',
        question: '会提供哪些文档与培训？',
        answer:
          '接入方式、拓扑关系、操作流程与日常维护要点会整理成文档，并在交接阶段与现场团队一起过一遍。目标是让现场具备独立处理常规问题的能力。',
      },
      {
        id: 'faq-support',
        question: '上线后如何获得支持？',
        answer:
          '支持方式与响应安排会在项目约定中明确。常规问题通过工单或约定渠道提交，涉及变更的事项走变更流程并保留记录。',
      },
    ],
  },
  {
    id: 'security',
    title: '安全与数据',
    description: '权限、审计、数据归属与安全基线相关问题。',
    items: [
      {
        id: 'faq-permission',
        question: '权限与操作记录如何管理？',
        answer:
          '按角色划分可执行范围，高风险动作需要审批或二次确认。操作记录包含发起人、执行步骤、输入参数与结果，便于事后复核。',
      },
      {
        id: 'faq-data-location',
        question: '数据保存在哪里？',
        answer:
          '根据项目约定确定数据存放位置与保留周期。涉及现场敏感数据时，会在方案阶段明确哪些数据不出场、哪些需要脱敏或聚合后再上传。',
      },
      {
        id: 'faq-security-baseline',
        question: '设备安全基线如何跟踪？',
        answer:
          '把固件版本、开放端口与账号策略整理为可执行的检查项，定期巡检并输出差异清单。重点是持续跟踪变化，而不是做一次性的安全检查。',
      },
    ],
  },
]

export const searchIndex = [
  ...products.map((product) => ({
    type: '产品',
    title: product.name,
    titleEn: product.nameEn,
    summary: `${product.tagline} ${product.summary}`,
    tags: [product.categoryLabel, product.nameEn, ...product.useCases],
    to: `/products/${product.slug}`,
  })),
  ...solutions.map((solution) => ({
    type: '方案',
    title: solution.title,
    summary: solution.description,
    tags: [
      solution.tagline,
      ...solution.modules.map(
        (slug) => products.find((product) => product.slug === slug)?.name ?? '',
      ),
    ],
    to: `/products#solution-${solution.id}`,
  })),
  ...industries.map((industry) => ({
    type: '行业',
    title: industry.name,
    titleEn: industry.nameEn,
    summary: industry.scene,
    tags: [industry.nameEn, ...industry.pain],
    to: `/industries#${industry.id}`,
  })),
  ...insights.map((insight) => ({
    type: '洞察',
    title: insight.title,
    summary: insight.excerpt,
    tags: [insight.category, ...insight.tags],
    to: `/insights/${insight.slug}`,
  })),
  ...faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      type: '常见问题',
      title: item.question,
      summary: item.answer,
      tags: [group.title, '常见问题'],
      to: `/faq#${item.id}`,
    })),
  ),
]
