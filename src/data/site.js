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
  slogan: '把边缘计算，做成可交付的硬件',
  description:
    'Plato科技专注智能硬件与边缘计算设备的研发与交付，产品覆盖边缘网关、数据采集终端、工业控制器、传感与变送模块及配套设备管理平台。',
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

export const announcement = {
  id: 'insights-2026-11',
  label: '更新',
  text: '现场接入实践笔记已更新：弱网缓存策略与远程运维的回滚边界。',
  linkLabel: '查看洞察',
  to: '/insights',
}

export const hero = {
  eyebrow: 'PLATO TECH · 智能硬件与边缘计算设备',
  title: '把边缘计算，\n做成可交付的硬件',
  description:
    'Plato科技自研边缘网关、数据采集终端、工业控制器与传感通信模块，并提供配套的设备管理平台。产品按标准机型交付，接口、协议与安装方式在选型阶段确认清楚。',
  primaryCta: { label: '浏览硬件产品', to: '/products' },
  secondaryCta: { label: '聊聊选型需求', to: '/contact' },
  keywords: ['自研整机', '多协议接入', '设备统一管理'],
  badges: [
    { label: '硬件', value: '五类整机自研交付' },
    { label: '接入', value: '常用工业协议兼容' },
    { label: '平台', value: '设备身份与策略统一' },
  ],
}

export const capabilities = [
  {
    index: '01',
    title: '硬件平台',
    subtitle: '自研整机与结构',
    description:
      '从主板选型、结构设计到整机测试都由自己完成，接口数量与散热方式按现场环境取舍，而不是把通用设备简单封装。',
    points: ['导轨式与壁挂式整机', '工业级供电与宽温设计', '出厂老化与接口测试'],
  },
  {
    index: '02',
    title: '协议接入',
    subtitle: '设备与协议适配',
    description:
      '网关内置 Modbus、OPC UA 与 MQTT 等常用协议，把不同厂商的差异收敛在设备侧，平台只接收统一格式的数据。',
    points: ['Modbus RTU / TCP', 'OPC UA 与 MQTT', '点位模板与批量配置'],
  },
  {
    index: '03',
    title: '边缘计算',
    subtitle: '本地采集与控制',
    description:
      '采集周期、阈值判断与联锁逻辑在设备侧执行，网络中断时仍按既定策略运行，恢复后再把数据补传上来。',
    points: ['本地缓存与断点续传', '阈值与联锁逻辑', '固件分批升级'],
  },
  {
    index: '04',
    title: '平台配套',
    subtitle: '设备全生命周期管理',
    description:
      '云枢 DeviceOps 负责设备登记、分组、配置下发与状态监测，让批量交付后的每台设备都有身份、有记录。',
    points: ['设备身份与分组', '远程配置与升级', '在线状态与告警'],
  },
]

export const workMethod = [
  {
    index: '01',
    title: '选型与打样',
    description: '确认设备类型、接口协议、安装位置与网络条件，给出机型与配置建议。',
  },
  {
    index: '02',
    title: '样机验证',
    description: '提供样机在真实现场跑通采集与回传，确认供电、安装方式与数据口径。',
  },
  {
    index: '03',
    title: '批量交付',
    description: '固化配置，完成出厂测试与设备身份写入，按批次交付并登记台账。',
  },
  {
    index: '04',
    title: '平台接入',
    description: '设备接入管理平台，完成分组、策略与固件升级设置，留下可查的记录。',
  },
]

export const productCategories = [
  { id: 'all', label: '全部' },
  { id: 'edge', label: '边缘计算' },
  { id: 'acquisition', label: '数据采集' },
  { id: 'control', label: '工业控制' },
  { id: 'sensing', label: '传感与变送' },
  { id: 'wireless', label: '无线通信' },
  { id: 'platform', label: '设备管理' },
]

export const products = [
  {
    slug: 'edgehub',
    name: '星图 EG-200 边缘网关',
    nameEn: 'Edge Gateway',
    category: 'edge',
    categoryLabel: '边缘计算',
    tone: 1,
    tagline: '多协议设备的现场接入与边缘计算主机',
    summary:
      '导轨式边缘网关，向下承接 PLC、仪表与传感器，向上以 MQTT / HTTP 对接平台。内置协议适配与本地缓存，断网时数据不丢。',
    description:
      '星图 EG-200 是一台面向工业现场的导轨式边缘网关。整机提供 2 路以太网、2 路 RS485 与 1 路 CAN，支持 Modbus RTU/TCP、OPC UA 与 MQTT 等常用协议。设备侧完成点位采集与协议转换，平台侧只需接收统一格式的数据。',
    highlights: [
      { title: '多接口整机', description: '双网口、双 RS485 与 CAN 集成在一台整机内，常见设备可直接接线。' },
      { title: '协议转换', description: 'Modbus、OPC UA 与 MQTT 在网关内完成映射，平台不感知厂商差异。' },
      { title: '本地缓存', description: '断网时按时间顺序落盘，恢复后自动补传，减少数据缺口。' },
    ],
    specs: [
      { label: '形态', value: '导轨式整机，金属外壳，无风扇' },
      { label: '处理器', value: '四核 ARM，2 GB 内存 / 16 GB 存储（典型配置）' },
      { label: '接口', value: '2×RJ45、2×RS485、1×CAN、1×USB' },
      { label: '协议', value: 'Modbus RTU/TCP、OPC UA、MQTT、HTTP' },
      { label: '供电', value: 'DC 12–36 V' },
      { label: '部署', value: '控制柜内 35 mm 导轨安装' },
      { label: '适用规模', value: '单台 200–500 个点位，适合单产线或单站点' },
    ],
    useCases: ['产线 PLC 与仪表统一接入', '配电房多协议设备汇聚', '冷链库房温控数据回传'],
  },
  {
    slug: 'flowlens',
    name: '澄流 DA-100 数据采集终端',
    nameEn: 'Data Terminal',
    category: 'acquisition',
    categoryLabel: '数据采集',
    tone: 2,
    tagline: '把分散的模拟量与串口设备收进一条数据流',
    summary:
      '紧凑型数据采集终端，提供多路模拟量、数字量与 RS485 输入，适合点位分散、以传感器和仪表为主的现场。',
    description:
      '澄流 DA-100 面向以传感器和仪表为主的采集场景。整机提供 8 路模拟量输入、8 路数字量输入与 2 路 RS485，可外接温湿度、压力、液位与电量等变送器。采集周期与上报策略可本地配置，弱网时先缓存再补传。',
    highlights: [
      { title: '多路采集', description: '模拟量、数字量与串口输入集成在一台终端内，减少外接模块。' },
      { title: '本地策略', description: '采集周期、死区与上报间隔可独立配置，不必改平台逻辑。' },
      { title: '安装灵活', description: '塑壳机身支持壁挂与导轨两种安装方式，适应狭小机柜。' },
    ],
    specs: [
      { label: '形态', value: '紧凑型终端，塑壳机身' },
      { label: '接口', value: '8×AI、8×DI、2×RS485、1×RJ45' },
      { label: '采集精度', value: '模拟量 16 位（典型配置）' },
      { label: '协议', value: 'Modbus RTU/TCP、MQTT' },
      { label: '供电', value: 'DC 9–30 V' },
      { label: '部署', value: '壁挂或 35 mm 导轨安装' },
      { label: '适用规模', value: '单台 8–32 路传感器，适合机房、库房与泵房' },
    ],
    useCases: ['冷库温湿度与门磁采集', '泵房液位与压力监测', '配电柜电量计量'],
  },
  {
    slug: 'meshweave',
    name: '织网 WM-50 无线通信网关',
    nameEn: 'Wireless Gateway',
    category: 'wireless',
    categoryLabel: '无线通信',
    tone: 3,
    tagline: '给布线困难的现场补一段无线链路',
    summary:
      '无线网关与节点模组组合，支持 LoRa 与 4G 回传，用于库房、园区与分散站点的补点接入。',
    description:
      '织网 WM-50 由无线网关与配套模组组成。模组安装在传感器或仪表侧，网关负责汇聚并以 4G 或以太网上行。适合布线成本高、点位分散但单点数据量不大的现场。',
    highlights: [
      { title: '无线补点', description: 'LoRa 模组与网关配对使用，免去长距离布线。' },
      { title: '双上行', description: '网关支持 4G 与以太网上行，按现场网络条件选择。' },
      { title: '低功耗', description: '模组支持间歇上报，适合电池供电的分散测点。' },
    ],
    specs: [
      { label: '形态', value: '无线网关 + 节点模组' },
      { label: '接口', value: '网关 1×RJ45、可选 4G；模组 1×RS485' },
      { label: '频段', value: 'Sub-GHz 免许可频段（按地区配置）' },
      { label: '协议', value: 'LoRa、MQTT' },
      { label: '供电', value: '网关 DC 12 V；模组电池或 DC 5–24 V' },
      { label: '部署', value: '网关壁挂或抱杆，模组就近安装' },
      { label: '适用规模', value: '单个网关接入 50–200 个模组' },
    ],
    useCases: ['冷库与仓库补点接入', '园区分散表计采集', '市政设施远程监测'],
  },
  {
    slug: 'beaconops',
    name: '灯塔 IC-300 工业控制器',
    nameEn: 'Industrial Controller',
    category: 'control',
    categoryLabel: '工业控制',
    tone: 4,
    tagline: '把逻辑控制放到设备侧，断网也能独立运行',
    summary:
      '面向设备联动的工业控制器，提供数字量输出与继电器接口，可在本地执行联锁与定时逻辑。',
    description:
      '灯塔 IC-300 是一台可编程工业控制器，用于在现场侧执行设备联锁、定时启停与阈值联动。控制逻辑保存在本地，网络中断时仍按既定策略运行；平台负责下发策略并记录执行结果。',
    highlights: [
      { title: '本地逻辑', description: '联锁与定时规则在设备侧执行，不依赖平台在线。' },
      { title: '隔离输出', description: '数字量输出与继电器通道做电气隔离，便于对接现场回路。' },
      { title: '策略下发', description: '平台统一配置策略，控制器按版本拉取并保留上一版。' },
    ],
    specs: [
      { label: '形态', value: '导轨式控制器，金属外壳' },
      { label: '接口', value: '8×DI、8×DO（继电器）、2×RS485、1×RJ45' },
      { label: '控制周期', value: '10 ms 级（典型配置）' },
      { label: '协议', value: 'Modbus RTU/TCP、MQTT' },
      { label: '供电', value: 'DC 24 V' },
      { label: '部署', value: '控制柜内导轨安装' },
      { label: '适用规模', value: '单台负责一个控制回路或一条小型产线' },
    ],
    useCases: ['产线设备联锁与启停', '冷链库房风机与除霜控制', '泵站液位联动'],
  },
  {
    slug: 'bedrockguard',
    name: '磐石 SM-10 传感与变送模块',
    nameEn: 'Sensor Module',
    category: 'sensing',
    categoryLabel: '传感与变送',
    tone: 5,
    tagline: '把温度、压力与液位变成标准信号',
    summary:
      '工业现场用的传感与变送模块，覆盖温度、压力、液位与温湿度测量，输出 4–20 mA 或 RS485。',
    description:
      '磐石 SM-10 系列把常见物理量转换为标准信号，便于接入采集终端或网关。模块按测量类型分为温度、压力、液位与温湿度几款，探头材质与安装接头按现场介质选配。',
    highlights: [
      { title: '标准输出', description: '4–20 mA 与 RS485 两种输出形态，兼容常见采集设备。' },
      { title: '按量程选型', description: '按测量范围、介质与安装方式选型，减少二次转换。' },
      { title: '批量一致', description: '同批次模块出厂前统一标定，便于现场批量替换。' },
    ],
    specs: [
      { label: '形态', value: '一体化变送模块，不锈钢或工程塑料探头' },
      { label: '测量类型', value: '温度 / 压力 / 液位 / 温湿度' },
      { label: '输出', value: '4–20 mA、RS485（Modbus RTU）' },
      { label: '供电', value: 'DC 12–24 V（两线制或三线制）' },
      { label: '部署', value: '螺纹、法兰或投入式安装' },
      { label: '适用规模', value: '单点测量，按测点数量配置' },
    ],
    useCases: ['冷库与库房温湿度测点', '水池与水箱液位测量', '管网压力监测'],
  },
  {
    slug: 'scenekit',
    name: '云枢 DeviceOps 设备管理平台',
    nameEn: 'Device Platform',
    category: 'platform',
    categoryLabel: '设备管理',
    tone: 6,
    tagline: '把每台设备的身份、状态与策略放在一处',
    summary:
      '配套的设备管理平台，负责设备注册、分组、远程配置与固件升级，是硬件交付后的统一入口。',
    description:
      '云枢 DeviceOps 是配套硬件使用的管理平台。设备出厂时写入唯一身份，接入后按项目与分组管理；平台提供在线状态、配置下发、固件升级与操作记录。平台可部署在中心侧，也可按项目部署在客户机房。',
    highlights: [
      { title: '设备身份', description: '出厂预置身份信息，接入后自动登记，减少手工台账。' },
      { title: '批量配置', description: '按分组下发采集周期、上报策略与告警阈值。' },
      { title: '远程升级', description: '固件分批升级，失败自动回退到上一版本。' },
    ],
    specs: [
      { label: '形态', value: '软件平台，随硬件配套提供' },
      { label: '部署', value: '中心侧服务器或客户机房私有化部署' },
      { label: '接入方式', value: 'Web 管理端，开放 HTTP API' },
      { label: '管理规模', value: '单实例 1,000–10,000 台设备（典型配置）' },
      { label: '配套硬件', value: '星图 EG、澄流 DA、灯塔 IC、织网 WM' },
      { label: '数据保留', value: '按项目配置，支持本地导出' },
    ],
    useCases: ['多站点设备台账与分组', '批量配置与固件升级', '设备在线状态与告警汇总'],
  },
]

export const solutions = [
  {
    id: 'line-access',
    title: '产线设备接入组合',
    tagline: '网关 + 采集 + 平台',
    description:
      '用星图边缘网关承接产线 PLC 与仪表，澄流采集终端补齐传感器测点，云枢平台统一完成设备登记、配置与升级。',
    modules: ['edgehub', 'flowlens', 'scenekit'],
    suited: '设备品牌多、点位分散、需要分批改造的产线',
  },
  {
    id: 'coldchain',
    title: '冷链与环境监测组合',
    tagline: '传感 + 无线 + 采集',
    description:
      '磐石传感模块负责现场测点，织网无线网关解决库房与分散点位的布线难题，澄流终端汇总数据并本地缓存。',
    modules: ['bedrockguard', 'meshweave', 'flowlens'],
    suited: '冷库、库房、泵房与室外分散监测点',
  },
  {
    id: 'device-ops',
    title: '设备远程运维组合',
    tagline: '平台 + 网关 + 控制器',
    description:
      '云枢平台负责设备身份与策略，星图网关打通现场网络，灯塔控制器执行本地联锁，批量设备可由平台统一配置与升级。',
    modules: ['scenekit', 'edgehub', 'beaconops'],
    suited: '多站点、无人值守、需要远程升级的现场',
  },
]

export const industries = [
  {
    id: 'manufacturing',
    name: '工业设备与产线',
    nameEn: 'Industrial Equipment',
    tone: 1,
    scene: 'PLC、仪表与专机品牌混杂，停机成本高，数据分散在各家系统里。',
    pain: ['新旧设备协议不统一，采集改造牵一发动全身', '停机原因缺少统一口径，复盘依赖个人记忆', '现场控制依赖人工经验，交接容易断档'],
    approach: ['用边缘网关承接 PLC 与仪表，先统一协议与点位', '采集终端补充传感器测点，控制策略在本地执行', '平台登记设备身份，批量下发配置与固件'],
    outcomes: ['设备与产线状态在同一视图内可查', '停机与换型记录具备可比口径'],
    caseStudy: {
      title: '多产线设备的渐进式接入',
      summary:
        '先从一条产线接入网关与采集终端，验证点位与协议覆盖；稳定后再逐条产线复制，控制器负责本地联锁，平台统一管理设备。',
    },
  },
  {
    id: 'coldchain',
    name: '冷链与仓储',
    nameEn: 'Cold Chain & Warehousing',
    tone: 2,
    scene: '冷库与库房温度敏感，墙体对无线信号衰减明显，测点分散且布线成本高。',
    pain: ['温湿度测点分散，有线改造代价高', '超温告警滞后，责任界定困难', '扫码、分拣与温控设备品牌混杂，接口不一'],
    approach: ['传感模块与无线网关组合，减少库内布线', '采集终端按库房分组，阈值与补传策略本地配置', '平台汇总各库温度曲线与告警记录'],
    outcomes: ['库房温度曲线完整可回溯', '超温事件与处置记录对应得上'],
    caseStudy: {
      title: '冷库温控的补点接入',
      summary:
        '先用无线模组覆盖布线困难的库区，再用采集终端汇总测点；平台按库房配置阈值，超温时同时通知值班与区域负责人。',
    },
  },
  {
    id: 'campus',
    name: '楼宇与园区',
    nameEn: 'Buildings & Campuses',
    tone: 3,
    scene: '门禁、照明、空调与能耗表计各自成体系，跨系统联动困难。',
    pain: ['子系统由不同供应商维护，接口口径不一致', '跨系统联动靠人工通知，响应慢', '改造前缺少统一的设备与链路视图'],
    approach: ['网关承接各子系统协议，统一汇入平台', '采集终端补齐能耗与环境测点', '控制器在本地执行照明与空调联动'],
    outcomes: ['子系统数据在同一平台内可查', '联动策略可在本地独立运行'],
    caseStudy: {
      title: '园区能耗与设备台账',
      summary:
        '先把总表、分表与重点设备接入统一采集口径，再逐步把照明与空调联动交给本地控制器，平台只负责策略下发与记录。',
    },
  },
  {
    id: 'energy',
    name: '能源与电力',
    nameEn: 'Energy & Power',
    tone: 4,
    scene: '变电站、配电房与新能源场站分散，值守成本高，遥测数据要求连续。',
    pain: ['站点分布广，网络条件不稳定', '遥测与计量数据缺口难以及时发现', '现场操作缺少记录，处置难以复核'],
    approach: ['网关与采集终端支持本地缓存与断点续传', '无线模组补齐布线困难的测点', '平台统一查看在线状态与告警'],
    outcomes: ['关键遥测数据在弱网下保持连续', '设备与测点状态可远程确认'],
    caseStudy: {
      title: '配电房的边缘采集改造',
      summary:
        '先把配电房内的多功能电表与温湿度测点接入采集终端，再通过网关汇聚上行；平台按站点分组管理，异常时先远程确认再安排到场。',
    },
  },
  {
    id: 'transport',
    name: '交通与市政设施',
    nameEn: 'Transport & Municipal',
    tone: 5,
    scene: '道路、隧道与市政设施点位分散，供电与网络条件差异大，巡检半径长。',
    pain: ['点位分布广，人工巡检成本高', '供电与网络条件受限，设备经常离线', '故障发现依赖巡路或市民反馈'],
    approach: ['低功耗无线模组承担分散测点回传', '网关按区域汇聚，断网时本地缓存', '平台按设施分组，离线与异常自动提醒'],
    outcomes: ['设施状态可在平台上按区域查看', '离线与异常从被动接报转为主动发现'],
    caseStudy: {
      title: '隧道环境与照明监测',
      summary:
        '先在高架与隧道布设环境与照明测点，用无线模组回传，网关按路段汇聚；平台按设施分组配置告警，减少巡路频次。',
    },
  },
  {
    id: 'environment',
    name: '环境与水务监测',
    nameEn: 'Environment & Water',
    tone: 6,
    scene: '泵站、河道与排水管网分布分散，液位与水质数据需要长期连续记录。',
    pain: ['监测点远离机房，供电与网络受限', '液位、流量数据缺失后难以补测', '多部门查看口径不一致'],
    approach: ['低功耗采集终端与传感模块组合部署', '本地缓存保证断网期间数据不丢', '平台按站点与指标统一口径'],
    outcomes: ['液位与水质数据形成连续记录', '跨部门查看同一套口径'],
    caseStudy: {
      title: '泵站液位与水质监测',
      summary:
        '先在重点泵站部署液位与水质测点，终端本地缓存并定时回传；平台按站点汇总曲线，异常时先核对数据再安排现场处置。',
    },
  },
]

export const stats = [
  { value: '6', unit: '款', label: '产品', description: '五类硬件整机与一套配套设备管理平台。' },
  { value: '4', unit: '层', label: '能力模型', description: '硬件、接入、边缘计算与平台配套。' },
  { value: '6', unit: '类', label: '行业场景', description: '工业、能源、冷链、楼宇、交通与水务。' },
  { value: '3', unit: '组', label: '组合方案', description: '按产线、冷链与远程运维场景组合产品。' },
]

export const statsNote = '以上为当前产品与场景的覆盖范围，具体型号与配置以选型沟通结果为准。'

export const homeCta = {
  eyebrow: '下一步',
  title: '从一台样机，\n开始验证你的现场',
  description:
    '不需要一次定完整配置。把设备类型、接口协议、网络条件与安装位置讲清楚，我们可以先提供样机与接入建议，再谈批量交付。',
  primaryCta: { label: '联系选型', to: '/contact' },
  secondaryCta: { label: '查看产品线', to: '/products' },
}

export const about = {
  eyebrow: 'ABOUT PLATO',
  title: '一支把硬件做进现场的团队',
  lead:
    'Plato科技专注智能硬件与边缘计算设备。我们自研边缘网关、数据采集终端、工业控制器与传感通信模块，并提供配套的设备管理平台。',
  paragraphs: [
    '我们的产品从现场约束出发：接口够不够、供电稳不稳、机柜里装不装得下、断网之后数据怎么办。这些问题的答案会直接落到整机形态与固件策略上，而不是停在架构图里。',
    '硬件与软件由同一支团队负责。设备出厂前完成接口测试与老化验证，接入平台后按项目分组管理；固件升级、配置下发与状态监测走同一套流程，减少交付后的扯皮。',
    '我们不承接行业工程总包，也不做纯咨询。产品按标准机型交付，接口、协议与安装方式在选型阶段确认清楚；现场安装由客户或集成商完成，我们提供配置与技术支持。',
  ],
  principles: [
    {
      index: '01',
      title: '现场优先',
      description: '先回答设备在现场装不装得下、接不接得上，再讨论参数表。脱离安装条件的配置，再漂亮也落不了地。',
    },
    {
      index: '02',
      title: '标准机型',
      description: '优先用标准机型覆盖大多数场景，把定制收敛在接口与结构的小范围里，保证交付一致、备件可替换。',
    },
    {
      index: '03',
      title: '可维护',
      description: '每台设备有身份、每次变更留记录、每版固件可回退。设备交付之后，维护不该依赖某个人的记忆。',
    },
  ],
  roadmap: [
    {
      phase: '阶段一',
      title: '选型与打样',
      description: '确认设备类型、接口协议、安装位置与网络条件，给出机型与配置建议。',
      status: '1–2 周',
    },
    {
      phase: '阶段二',
      title: '样机验证',
      description: '提供样机在真实现场跑通采集与回传，确认供电、安装方式与数据口径。',
      status: '2–4 周',
    },
    {
      phase: '阶段三',
      title: '批量交付',
      description: '固化配置，完成出厂测试与设备身份登记，按批次交付并接入平台。',
      status: '按数量排产',
    },
  ],
  roadmapNote: '实际周期取决于机型、配置与批量大小，以上为常规交付节奏。',
  team: [
    { role: '硬件研发', description: '负责主板、结构与整机设计，完成供电、散热与接口验证。' },
    { role: '嵌入式与平台', description: '负责固件、协议适配与设备管理平台，保证设备可配置、可升级。' },
    { role: '交付与支持', description: '负责选型确认、出厂配置、批量交付与上线后的技术支持。' },
  ],
  stack: ['边缘计算', '工业控制', '无线通信', '传感采集', '设备管理'],
}

export const contact = {
  eyebrow: 'CONTACT',
  title: '从设备选型开始聊',
  lead:
    '如果正在确定机型、接口或部署方式，可以把设备类型、协议、点位数量与安装环境写下来。我们会先给出选型建议，再确认样机与交期。',
  channels: [
    { label: '需求沟通', value: '通过本页表单提交', note: '说明设备类型、接口协议、点位数量与安装环境' },
    { label: '响应安排', value: '工作日 24 小时内', note: '收到完整信息后，我们会给出初步选型建议' },
    { label: '样机与报价', value: '1–3 个工作日', note: '根据配置与数量提供样机安排与报价' },
    { label: '服务时间', value: '工作日 09:30 – 18:30', note: '非工作时间的紧急事项，请在留言中注明' },
  ],
  topics: ['产品选型', '样机申请', '批量采购', '技术支持'],
  formNote: '提交后我们会按响应安排与你联系，请尽量填写设备与接口信息。',
}

export const footer = {
  blurb:
    'Plato科技自研边缘网关、数据采集终端、工业控制器与传感通信模块，配套设备管理平台，为现场提供可交付、可维护的智能硬件。',
  columns: [
    {
      title: '导航',
      links: [
        { label: '首页', to: '/' },
        { label: '产品与解决方案', to: '/products' },
        { label: '行业应用', to: '/industries' },
        { label: '洞察', to: '/insights' },
        { label: '能力看板', to: '/showcase' },
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
        { label: '星图 EG-200 边缘网关', to: '/products/edgehub' },
        { label: '澄流 DA-100 采集终端', to: '/products/flowlens' },
        { label: '云枢 DeviceOps 平台', to: '/products/scenekit' },
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
    tags: ['设备接入', '协议适配', '选型与配置'],
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
          '在样机验证阶段，我们会先用一台代表性设备把模板跑通，再逐步加入同类型的其他设备。这样新增设备时，只需要补充差异项，不必重新走一遍完整流程。',
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
    title: '产品与选型',
    description: '关于机型、接口、部署方式与适用规模的常见问题。',
    items: [
      {
        id: 'faq-single-module',
        question: '产品可以单独购买吗？',
        answer:
          '可以。五类硬件与设备管理平台都按标准机型提供，平台可单独部署，也可以与硬件配套。实际选型时，我们会先确认接口、点位与安装条件，再给出机型与配置建议。',
      },
      {
        id: 'faq-capability-boundary',
        question: '如何判断哪款机型适合我的现场？',
        answer:
          '通常从设备类型、接口协议、点位数量、供电与安装方式五个方面判断。把现场情况写清楚后，我们会给出机型建议与需要现场确认的前提，而不是先给一个笼统的结论。',
      },
      {
        id: 'faq-deployment-mode',
        question: '支持定制吗？',
        answer:
          '支持在标准机型上做有限定制，例如接口组合、外壳开孔、协议扩展与出厂配置。涉及结构或主板改动的需求，会先评估可行性与最小起订量。',
      },
    ],
  },
  {
    id: 'access',
    title: '接入与交付',
    description: '设备接入、网络条件与交付节奏相关的问题。',
    items: [
      {
        id: 'faq-prepare',
        question: '接入前需要准备哪些信息？',
        answer:
          '建议先整理设备清单、厂商与型号、通信协议、点位表，以及供电与安装位置。信息不必一次齐全，但应区分已知事实与待现场确认项，这能显著减少反复沟通。',
      },
      {
        id: 'faq-legacy-device',
        question: '老旧设备还能接入吗？',
        answer:
          '取决于设备是否具备可用接口与协议文档。具备 RS485、以太网或脉冲输出的设备，通常可以通过网关或采集终端接入；完全没有通信接口的设备，需要增加传感或采集模块。',
      },
      {
        id: 'faq-network',
        question: '现场网络不稳定怎么办？',
        answer:
          '硬件侧支持本地缓存与断点续传，关键数据优先保留；无线场景可用 LoRa 模组补点。网络条件无法改善时，采集与上报策略比增加带宽更有效。',
      },
      {
        id: 'faq-timeline',
        question: '交付周期一般多久？',
        answer:
          '样机通常在确认配置后 1–2 周内发出；批量交付取决于数量、配置与排产情况，会在报价时明确，不按固定模板承诺。',
      },
    ],
  },
  {
    id: 'delivery',
    title: '交付与支持',
    description: '发货、文档与上线后的支持安排。',
    items: [
      {
        id: 'faq-project-flow',
        question: '产品通常如何交付？',
        answer:
          '按订单配置完成出厂测试与设备身份写入后发货，随货提供接线说明、接口定义与配置清单。批量项目可按批次交付，并同步接入设备管理平台。',
      },
      {
        id: 'faq-docs',
        question: '会提供哪些文档与培训？',
        answer:
          '提供产品规格书、接口定义、接线与配置说明。批量交付时可安排一次线上或现场培训，内容包括安装、配置与常见问题处理。',
      },
      {
        id: 'faq-support',
        question: '上线后如何获得支持？',
        answer:
          '支持方式与响应安排会在订单或服务约定中明确。固件问题通过版本升级解决，硬件故障按约定走返修或换机流程。',
      },
    ],
  },
  {
    id: 'security',
    title: '安全与数据',
    description: '权限、数据归属与固件升级相关问题。',
    items: [
      {
        id: 'faq-permission',
        question: '权限与操作记录如何管理？',
        answer:
          '平台按角色划分可执行范围，配置下发与固件升级需要相应权限。操作记录包含发起人、设备、参数与结果，便于事后复核。',
      },
      {
        id: 'faq-data-location',
        question: '数据保存在哪里？',
        answer:
          '平台可部署在中心侧或客户机房。设备采集的数据默认上传到客户指定的平台实例，本地缓存数据在补传完成后按策略清理。',
      },
      {
        id: 'faq-security-baseline',
        question: '固件升级失败怎么办？',
        answer:
          '设备保留上一版固件，升级失败后自动回退；批量升级支持分批灰度，确认稳定后再扩大范围。',
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
