export const translations = {
  pt: {
    // Header
    appName: "Ethereum TimesFM",
    appBadge: "Google TimesFM 3.0 SOTA",
    appSubtitle: "Projeções Fundacionais com IA, Tese de World Computer & Super Asset",
    spotPrice: "Cotação Spot:",
    tvlDefi: "TVL DeFi:",
    stakedSupply: "Supply em Staking:",
    recalculate: "Recalcular TimesFM",
    recalculating: "Processando...",

    // Knowledge Pills
    knowledgePillsTitle: "Pílulas de Conhecimento • Modelo Mental Ethereum",
    knowledgePillsSubtitle: "Conceitos estruturais essenciais explicados de forma direta e sem jargões desnecessários",
    pills: [
      {
        id: "triple-point",
        tag: "Tese Econômica",
        title: "O que é um Triple Point Asset?",
        summary: "O Ethereum é o primeiro ativo na história que acumula três propriedades econômicas simultâneas.",
        content: "1. Ativo de Capital: Gera fluxo de caixa (yield) para stakers via taxas e MEV (atualmente ~3.4% a.a.).\n2. Ativo Consumível: Cada transação queima ETH (EIP-1559), transformando atividade da rede em escassez direta de oferta.\n3. Reserva de Valor: Atua como a principal moeda colateral e unidade de liquidez em todo o ecossistema DeFi mundial."
      },
      {
        id: "hierarchical-reconciliation",
        tag: "Metodologia IA",
        title: "O que é Reconciliação Hierárquica?",
        summary: "Como o TimesFM elimina falsos sinais diários ancorando-se em ciclos macroeconômicos.",
        content: "Modelos comuns de IA tentam apenas prever o próximo candle diário e acumulam erro rapidamente. A reconciliação hierárquica projeta três séries temporais paralelas (diária, semanal e mensal) e aplica restrições lineares para que a soma dos passos micro coincida matematicamente com a tendência do ciclo macro, impedindo projeções incoerentes."
      },
      {
        id: "eip-1559",
        tag: "Mecânica On-Chain",
        title: "EIP-1559: O Dividendo Sintético",
        summary: "Em vez de pagar dividendos em conta, o Ethereum reduz o denominador de ações em circulação.",
        content: "Desde a atualização London (2021), a taxa base de cada transação é queimada permanentemente. Quando o consumo de gas supera a emissão diária do PoS, o supply total de ETH diminui. Todo detentor de ETH ganha poder de compra relativo sem sofrer tributação de proventos."
      },
      {
        id: "metcalfe-law",
        tag: "Lei de Metcalfe",
        title: "Valor de Rede Proporcional a N²",
        summary: "O valor intrínseco de uma rede financeira cresce com o quadrado dos seus nós e usuários ativos.",
        content: "Historicamente, o valor de mercado do Ethereum mantém correlação de 0.94 com o volume transacionado e o número de endereços ativos elevados à potência β = 2.02. Com as L2s expandindo o throughput, a base de nós e contratos escala sem congestionar a camada de liquidação L1."
      },
      {
        id: "the-surge",
        tag: "Escalabilidade",
        title: "The Surge & Blobs de Dados (EIP-4844)",
        summary: "Como as L2s escalam para 1.000+ TPS mantendo a segurança soberana da L1.",
        content: "Em vez de armazenar dados de rollup para sempre no estado de execução da L1, o Ethereum introduziu 'blobs' temporários (descartados após 18 dias). Isso barateou as transações em L2s em até 95% e transformou a Ethereum L1 na camada definitiva de liquidação e consenso global."
      }
    ],

    // Mental Models Diagrams
    diagramsTitle: "Diagramas Visuais • Arquitetura do Modelo Mental",
    diagramsSubtitle: "Entenda como a dinâmica on-chain do Ethereum e a inferência do TimesFM se articulam",
    flywheelTab: "1. Ciclo Virtuoso (Flywheel) do Ethereum",
    timesfmTab: "2. Pipeline de Previsão TimesFM 3.0",

    // Scenarios
    scenariosTitle: "Cenários Opinativos TimesFM 3.0",
    scenariosBadge: "Metodologia Híbrida Estrutural",
    scenariosSubtitle: "Parecer conjunto Fable 5.1 (Validação Estatística) & Astra 6 (Design Analítico)",
    scenarioBase: "Cenário Base",
    scenarioBaseProb: "55%",
    scenarioBull: "Super Asset Bullish",
    scenarioBullProb: "30%",
    scenarioBear: "Conservador / Floor",
    scenarioBearProb: "15%",

    // Chart & Controls
    forecastChartTitle: "Previsão de Preço com Google TimesFM 3.0",
    forecastChartBadge: "SOTA #1 Benchmark",
    projectionHorizon: "Projeção:",
    timeWindow: "Janela Temporal:",
    frequency: "Frequência:",
    stochasticBands: "Bandas Estocásticas:",
    fanChart: "Leque Completo (Fan Chart)",
    band80: "Banda 80% (P10-P90)",
    band60: "Banda 60% (P20-P80)",
    band40: "Banda 40% (P30-P70)",
    hideBands: "Ocultar",
    secularChannel: "Canal Secular & Pisos On-Chain:",
    channelActive: "Ativo",
    channelInactive: "Inativo",
    milestonesTitle: "Marcos Históricos da Ethereum (Clique para Explorar):",
    hideMilestones: "Ocultar Marcos",
    showMilestones: "Exibir Marcos",

    // Simulator
    simulatorTitle: "Simulador Interativo de Premissas & Valuation",
    simulatorBadge: "Tempo Real",
    simulatorSubtitle: "Altere as variáveis fundamentais da rede Ethereum para calcular instantaneamente o Preço Intrínseco Justo e observar o impacto nas curvas projetadas.",
    resetAssumptions: "Restaurar Premissas Padrão",
    presetsTitle: "Cenários Prontos com 1 Clique:",
    preset1Title: "Baseline Atual (2026)",
    preset1Sub: "Equilíbrio On-Chain",
    preset2Title: "The Surge & Hiper-L2",
    preset2Sub: "Blobs Cheios + 850 TPS",
    preset3Title: "Choque de Oferta Ultra Sound",
    preset3Sub: "40% Staked + Alta Queima",
    preset4Title: "Estresse Macro / Floor Test",
    preset4Sub: "Desaceleração de Taxas",
    marketSpotPrice: "Cotação Atual de Mercado",
    spotSub: "Preço nominal negociado nas exchanges",
    intrinsicFairValue: "Preço Justo Intrínseco Simulado",
    intrinsicSub: "Margem de segurança positiva com base nas premissas simuladas",
    triplePointDecomposition: "Decomposição de Valor (Triple Point Asset)",
    triplePointSub: "Soma dos componentes fundamentais do Ethereum",
    capitalPoS: "Capital (PoS)",
    burnConsumable: "Queima (EIP-1559)",
    storeMetcalfe: "Reserva / Metcalfe",

    // Sliders
    sliderBurn: "Queima Diária EIP-1559",
    sliderStaking: "Proporção em Staking (PoS)",
    sliderL2Tps: "Throughput de L2s (The Surge)",
    sliderMetcalfe: "Efeito de Rede de Metcalfe (β)",
    sliderPe: "Múltiplo de Fluxo de Caixa (P/E)",
    sliderDiscount: "Taxa de Desconto / Risco Macro",

    // Impact
    impactTitle: "Impacto Imediato nas Metas Projetadas pelo TimesFM 3.0:",
    impactSub: "Projeção recalibrada pelo vetor fundamental",

    // TPS Roadmap
    tpsTitle: "Escalabilidade de Execução: Throughput de L2s & Roadmap Ethereum",
    tpsBadge: "The Surge & L2 Scaling",
    tpsSubtitle: "Comparativo de TPS histórico (L1 vs Rollups L2) e projeção de capacidade após o rollout de Blobs e PeerDAS",
    currentL1Tps: "TPS Médio Atual L1",
    currentL2Tps: "TPS Agregado L2s Atuais",
    totalTps: "Throughput Total Atual",
    l2Multiple: "Multiplicador de Escala L2"
  },

  en: {
    // Header
    appName: "Ethereum TimesFM",
    appBadge: "Google TimesFM 3.0 SOTA",
    appSubtitle: "Foundational AI Projections, World Computer Thesis & Super Asset",
    spotPrice: "Spot Price:",
    tvlDefi: "DeFi TVL:",
    stakedSupply: "Staked Supply:",
    recalculate: "Recalculate TimesFM",
    recalculating: "Processing...",

    // Knowledge Pills
    knowledgePillsTitle: "Knowledge Pills • Ethereum Mental Model",
    knowledgePillsSubtitle: "Essential structural concepts explained concisely without unnecessary buzzwords",
    pills: [
      {
        id: "triple-point",
        tag: "Economic Thesis",
        title: "What is a Triple Point Asset?",
        summary: "Ethereum is the first asset in human history that combines three economic properties simultaneously.",
        content: "1. Capital Asset: Generates cash flow (yield) for stakers via base transaction fees and MEV (~3.4% APY).\n2. Consumable Asset: Every transaction permanently burns ETH (EIP-1559), turning network usage into direct supply scarcity.\n3. Store of Value: Acts as the prime pristine collateral and liquidity reserve across the global decentralized finance ecosystem."
      },
      {
        id: "hierarchical-reconciliation",
        tag: "AI Methodology",
        title: "What is Hierarchical Reconciliation?",
        summary: "How TimesFM eliminates false daily noise by anchoring to macro fundamental cycles.",
        content: "Conventional time-series AI models simply predict the next daily candle and quickly accumulate drift error. Hierarchical reconciliation forecasts across three parallel temporal frequencies (daily, weekly, monthly) and enforces linear constraints so micro-level steps mathematically match the macro cycle trajectory."
      },
      {
        id: "eip-1559",
        tag: "On-Chain Mechanics",
        title: "EIP-1559: The Synthetic Dividend",
        summary: "Instead of paying taxable cash dividends, Ethereum shrinks the circulating share count.",
        content: "Since the London hard fork (2021), base transaction fees are permanently destroyed. When gas burn exceeds PoS issuance, total ETH circulating supply contracts. Every ETH holder gains proportional purchasing power without taxable distributions."
      },
      {
        id: "metcalfe-law",
        tag: "Metcalfe's Law",
        title: "Network Value Scales with N²",
        summary: "The intrinsic valuation of a monetary financial network scales with the square of its active nodes and users.",
        content: "Historically, Ethereum's market cap maintains a 0.94 correlation with active transaction volume and daily active addresses raised to power β = 2.02. As Layer-2 rollups scale throughput, network adoption expands exponentially while anchoring security to L1."
      },
      {
        id: "the-surge",
        tag: "Scalability",
        title: "The Surge & Data Blobs (EIP-4844)",
        summary: "How Layer-2 rollups scale beyond 1,000+ TPS while preserving sovereign L1 security.",
        content: "Instead of storing rollup execution data permanently on L1 state, Ethereum introduced ephemeral 'data blobs' (pruned after 18 days). This reduced L2 transaction costs by over 95%, establishing Ethereum L1 as the supreme global settlement layer."
      }
    ],

    // Mental Models Diagrams
    diagramsTitle: "Visual Diagrams • Mental Model Architecture",
    diagramsSubtitle: "Understand how Ethereum on-chain economics and TimesFM inference operate together",
    flywheelTab: "1. Ethereum Virtuous Flywheel",
    timesfmTab: "2. TimesFM 3.0 Forecast Pipeline",

    // Scenarios
    scenariosTitle: "TimesFM 3.0 Opinionated Scenarios",
    scenariosBadge: "Hybrid Structural Methodology",
    scenariosSubtitle: "Joint assessment by Fable 5.1 (Statistical Validation) & Astra 6 (Analytical Design)",
    scenarioBase: "Base Scenario",
    scenarioBaseProb: "55%",
    scenarioBull: "Super Asset Bullish",
    scenarioBullProb: "30%",
    scenarioBear: "Conservative / Floor",
    scenarioBearProb: "15%",

    // Chart & Controls
    forecastChartTitle: "Price Forecast with Google TimesFM 3.0",
    forecastChartBadge: "SOTA #1 Benchmark",
    projectionHorizon: "Horizon:",
    timeWindow: "Time Window:",
    frequency: "Frequency:",
    stochasticBands: "Stochastic Bands:",
    fanChart: "Full Fan Chart (9 Quantiles)",
    band80: "80% Band (P10-P90)",
    band60: "60% Band (P20-P80)",
    band40: "40% Band (P30-P70)",
    hideBands: "Hide Bands",
    secularChannel: "Secular Channel & On-Chain Floor:",
    channelActive: "Active",
    channelInactive: "Inactive",
    milestonesTitle: "Ethereum Historical Milestones (Click to Inspect):",
    hideMilestones: "Hide Milestones",
    showMilestones: "Show Milestones",

    // Simulator
    simulatorTitle: "Interactive Assumptions & Valuation Simulator",
    simulatorBadge: "Real-Time",
    simulatorSubtitle: "Tweak Ethereum core economic parameters to instantly calculate Intrinsic Fair Value and witness dynamic trajectory shifts.",
    resetAssumptions: "Reset Default Assumptions",
    presetsTitle: "1-Click Presets:",
    preset1Title: "Current Baseline (2026)",
    preset1Sub: "On-Chain Equilibrium",
    preset2Title: "The Surge & Hyper-L2",
    preset2Sub: "Full Blobs + 850 TPS",
    preset3Title: "Ultra Sound Supply Shock",
    preset3Sub: "40% Staked + High Burn",
    preset4Title: "Macro Stress / Floor Test",
    preset4Sub: "Fee Deceleration",
    marketSpotPrice: "Current Market Spot Price",
    spotSub: "Nominal exchange quoted price",
    intrinsicFairValue: "Simulated Intrinsic Fair Value",
    intrinsicSub: "Positive margin of safety based on simulated fundamentals",
    triplePointDecomposition: "Value Decomposition (Triple Point Asset)",
    triplePointSub: "Fundamental economic components sum",
    capitalPoS: "Capital (PoS Yield)",
    burnConsumable: "Consumable (EIP-1559)",
    storeMetcalfe: "Store of Value / Metcalfe",

    // Sliders
    sliderBurn: "Daily EIP-1559 Burn",
    sliderStaking: "Staked Supply Ratio (PoS)",
    sliderL2Tps: "L2s Throughput (The Surge)",
    sliderMetcalfe: "Metcalfe Network Power (β)",
    sliderPe: "Cash Flow Multiple (P/E)",
    sliderDiscount: "Macro Discount Rate / Equity Risk",

    // Impact
    impactTitle: "Direct Impact on TimesFM 3.0 Projected Targets:",
    impactSub: "Recalibrated by fundamental economic vector",

    // TPS Roadmap
    tpsTitle: "Execution Scalability: L2s Throughput & Ethereum Roadmap",
    tpsBadge: "The Surge & L2 Scaling",
    tpsSubtitle: "Historical throughput comparison (L1 vs Layer-2 rollups) and projected capacity post-Blobs and PeerDAS rollout",
    currentL1Tps: "Current L1 Average TPS",
    currentL2Tps: "Aggregated Current L2 TPS",
    totalTps: "Total System Throughput",
    l2Multiple: "L2 Scaling Multiplier"
  },

  zh: {
    // Header
    appName: "以太坊 TimesFM",
    appBadge: "谷歌 TimesFM 3.0 SOTA",
    appSubtitle: "前沿基础AI时间序列预测、世界计算机假说与超级资产估值模型",
    spotPrice: "现货价格:",
    tvlDefi: "DeFi 锁仓量 (TVL):",
    stakedSupply: "质押率比例:",
    recalculate: "重新推演 TimesFM",
    recalculating: "计算中...",

    // Knowledge Pills
    knowledgePillsTitle: "知识胶囊 • 以太坊底层思维模型",
    knowledgePillsSubtitle: "剔除冗余AI套话，直击以太坊经济学与机器预测核心结构",
    pills: [
      {
        id: "triple-point",
        tag: "经济学假说",
        title: "什么是三相资产 (Triple Point Asset)?",
        summary: "以太坊是人类金融史上首个同时具备三种经济特性的资产类别。",
        content: "1. 资本资产 (Capital Asset): 质押者通过验证网络交易和MEV获得持续现金流分红 (当前年化收益率约3.4%)。\n2. 消耗型资产 (Consumable Asset): 每笔网络交易必须燃烧以太坊 (EIP-1559)，将网络活跃度直接转化为流通总量的绝对稀缺。\n3. 价值储藏 (Store of Value): 作为整个去中心化金融 (DeFi) 体系最原生、最可靠的清偿抵押品与无风险储备流动性。"
      },
      {
        id: "hierarchical-reconciliation",
        tag: "AI 预测方法论",
        title: "什么是分层时间序列调和 (Hierarchical Reconciliation)?",
        summary: "TimesFM 如何通过宏观经济周期锚定，彻底过滤日线高频伪信号。",
        content: "传统AI时序模型仅预测下一根日K线，极易迅速产生漂移误差。分层调和方法同时推演日频、周频与月频三条平行时间序列，并施加线性代数约束，使微观步长的总和在数学上与宏观长期趋势严密吻合，避免违背金融常理。"
      },
      {
        id: "eip-1559",
        tag: "链上经济机制",
        title: "EIP-1559: 合成股息分配机制",
        summary: "以太坊不直接派发现金红利，而是通过回购并注销流通总股本来赋能代币持有者。",
        content: "自伦敦升级 (2021) 以来，网络基础手续费被永久销毁。当链上Gas消耗超过PoS新增发行量时，以太坊进入通缩状态。每一位持币者无需面临分红税务损耗，其相对购买力均获得同等比例提升。"
      },
      {
        id: "metcalfe-law",
        tag: "梅特卡夫定律",
        title: "网络价值与节点规模平方成正比 (N²)",
        summary: "去中心化金融网络的内在公允价值，随活跃地址与结算规模的二次方加速攀升。",
        content: "历史数据表明，以太坊流通市值与链上结算体量及活跃地址数维持高达 0.94 的强相关性，拟合指数 β = 2.02。随着二层扩容技术 (L2 Rollups) 爆发，以太坊在保持L1底层结算安全的同时实现了用户规模的指数级渗透。"
      },
      {
        id: "the-surge",
        tag: "扩容演进",
        title: "The Surge 阶段与数据小包 (EIP-4844 Blobs)",
        summary: "二层网络如何在继承L1终极安全性的前提下突破 1,000+ TPS。",
        content: "以太坊不再将二层执行数据永久存放在昂贵的L1状态机中，而是引入了18天后自动丢弃的临时数据小包 (Data Blobs)。这一突破将L2转账成本降低了95%以上，确立了以太坊作为全球资产结算中枢的垄断地位。"
      }
    ],

    // Mental Models Diagrams
    diagramsTitle: "可视化图解 • 核心思维模型架构",
    diagramsSubtitle: "直观理解以太坊链上价值捕获飞轮与 TimesFM 3.0 预测推演管线",
    flywheelTab: "1. 以太坊价值循环飞轮",
    timesfmTab: "2. TimesFM 3.0 分层预测管线",

    // Scenarios
    scenariosTitle: "TimesFM 3.0 主观概率情景矩阵",
    scenariosBadge: "混合结构化计量方法",
    scenariosSubtitle: "Fable 5.1 (统计严密性审计) 与 Astra 6 (量化分析设计) 联合评定",
    scenarioBase: "基准基线情景",
    scenarioBaseProb: "55%",
    scenarioBull: "超级资产爆发情景",
    scenarioBullProb: "30%",
    scenarioBear: "防守筑底支撑情景",
    scenarioBearProb: "15%",

    // Chart & Controls
    forecastChartTitle: "谷歌 TimesFM 3.0 价格推演图表",
    forecastChartBadge: "全球时序第一 Benchmark",
    projectionHorizon: "推演周期:",
    timeWindow: "历史回溯周期:",
    frequency: "聚合频率:",
    stochasticBands: "随机性分位数带:",
    fanChart: "完整扇形扇面 (9个分位数)",
    band80: "80%置信区间 (P10-P90)",
    band60: "60%置信区间 (P20-P80)",
    band40: "40%置信区间 (P30-P70)",
    hideBands: "隐藏分位数带",
    secularChannel: "百年通道与链上成本底线:",
    channelActive: "开启",
    channelInactive: "关闭",
    milestonesTitle: "以太坊重大历史里程碑 (点击展开详情):",
    hideMilestones: "隐藏里程碑",
    showMilestones: "展示里程碑",

    // Simulator
    simulatorTitle: "基本面假设与估值推演模拟器",
    simulatorBadge: "实时计算",
    simulatorSubtitle: "自由调整以太坊核心基本面变量，即时计算内在公允价值并观察推演轨迹的动态修正。",
    resetAssumptions: "恢复默认基准参数",
    presetsTitle: "一键经典预设情景:",
    preset1Title: "当前基准 (2026)",
    preset1Sub: "链上稳态平衡",
    preset2Title: "The Surge 爆发",
    preset2Sub: "Blob饱和 + 850 TPS",
    preset3Title: "超强通缩供给冲击",
    preset3Sub: "40%质押 + 极速燃烧",
    preset4Title: "宏观压力测试底线",
    preset4Sub: "手续费增速放缓",
    marketSpotPrice: "当前市场现货价格",
    spotSub: "全球各大交易所撮合结算价格",
    intrinsicFairValue: "模拟内在公允价值",
    intrinsicSub: "基于模拟基本面计算的安全边际溢价/折价",
    triplePointDecomposition: "三相资产价值构成拆解",
    triplePointSub: "以太坊三项底层价值源泉加权求和",
    capitalPoS: "资本收益 (PoS质押)",
    burnConsumable: "消耗价值 (EIP-1559燃烧)",
    storeMetcalfe: "储值溢价 (梅特卡夫法则)",

    // Sliders
    sliderBurn: "每日 EIP-1559 手续费燃烧量",
    sliderStaking: "以太坊质押比例 (PoS)",
    sliderL2Tps: "二层网络吞吐量 (The Surge)",
    sliderMetcalfe: "梅特卡夫网络效应指数 (β)",
    sliderPe: "自由现金流估值倍数 (P/E)",
    sliderDiscount: "宏观折现率 / 股权风险溢价",

    // Impact
    impactTitle: "对 TimesFM 3.0 推演目标的即时冲击修正:",
    impactSub: "由底层基本面向量驱动动态重估",

    // TPS Roadmap
    tpsTitle: "执行层扩展性: 二层吞吐量与以太坊路线图",
    tpsBadge: "The Surge 与 L2 扩容",
    tpsSubtitle: "以太坊 L1 与 L2 Rollups 历史处理能力对比及 Blobs / PeerDAS 部署后容量推演",
    currentL1Tps: "当前 L1 平均处理速度",
    currentL2Tps: "二层 Rollups 聚合吞吐量",
    totalTps: "系统综合瞬时吞吐量",
    l2Multiple: "二层网络扩容倍数"
  }
};
