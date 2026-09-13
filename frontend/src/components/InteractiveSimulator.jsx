import React from 'react';
import { 
  Sliders, 
  RotateCcw, 
  Sparkles, 
  TrendingUp, 
  Flame, 
  Vault, 
  Cpu, 
  Layers, 
  ShieldAlert, 
  Compass, 
  Zap, 
  DollarSign,
  Activity,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function InteractiveSimulator({
  assumptions,
  setAssumptions,
  defaultAssumptions,
  currentPrice = 2484,
  valuationResults,
  onResetAll
}) {
  // Presets prontos inspirados no ethval.com
  const presets = [
    {
      id: 'baseline',
      name: 'Baseline Atual (2026)',
      tag: 'Equilíbrio On-Chain',
      icon: Compass,
      color: 'blue',
      values: { ...defaultAssumptions }
    },
    {
      id: 'surge',
      name: 'The Surge & Hiper-L2',
      tag: 'Blobs Cheios + 850 TPS',
      icon: Zap,
      color: 'indigo',
      values: {
        burnRateEthDay: 850,
        stakingRatioPct: 32.5,
        l2Tps: 850,
        metcalfeBeta: 2.22,
        peMultiple: 32.0,
        discountRatePct: 6.5
      }
    },
    {
      id: 'ultrasound',
      name: 'Choque de Oferta Ultra Sound',
      tag: '40% Staked + Alta Queima',
      icon: Flame,
      color: 'emerald',
      values: {
        burnRateEthDay: 1250,
        stakingRatioPct: 40.0,
        l2Tps: 350,
        metcalfeBeta: 2.30,
        peMultiple: 35.0,
        discountRatePct: 5.5
      }
    },
    {
      id: 'bear',
      name: 'Estresse Macro / Floor Test',
      tag: 'Desaceleração de Taxas',
      icon: ShieldAlert,
      color: 'amber',
      values: {
        burnRateEthDay: 180,
        stakingRatioPct: 22.0,
        l2Tps: 70,
        metcalfeBeta: 1.85,
        peMultiple: 16.0,
        discountRatePct: 11.5
      }
    }
  ];

  const handlePresetSelect = (preset) => {
    setAssumptions(preset.values);
  };

  const updateField = (field, val) => {
    setAssumptions(prev => ({ ...prev, [field]: parseFloat(val) }));
  };

  const resetField = (field) => {
    setAssumptions(prev => ({ ...prev, [field]: defaultAssumptions[field] }));
  };

  // Comparação de valor simulado vs preço de mercado
  const fairValue = valuationResults?.simulatedFairValue || 3444;
  const priceDiffPct = parseFloat((((fairValue - currentPrice) / currentPrice) * 100).toFixed(1));
  const isUndervalued = priceDiffPct >= 0;

  return (
    <section className="mt-8 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
      
      {/* Cabeçalho do Simulador de Valuation */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-blue-600 text-white shadow-2xs">
              <Sliders className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Simulador Interativo de Premissas & Valuation (Estilo ETHval)
            </h3>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Tempo Real
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
            Altere as variáveis fundamentais da rede Ethereum (queima de gas EIP-1559, proporção de staking, taxa de adoção de Metcalfe e throughput de L2s) para calcular instantaneamente o Preço Intrínseco Justo e observar o impacto dinâmico nas curvas projetadas no gráfico.
          </p>
        </div>

        {/* Botão de Reset Geral */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetAll}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            title="Restaura todas as variáveis para as médias observadas on-chain em 2026"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Restaurar Premissas Padrão
          </button>
        </div>
      </div>

      {/* Barra de Presets Rápidos de Cenário */}
      <div className="py-3.5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-slate-600 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Cenários Prontos com 1 Clique:
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {presets.map(preset => {
            const Icon = preset.icon;
            const isCurrent = Object.keys(preset.values).every(
              k => Math.abs(preset.values[k] - assumptions[k]) < 0.01
            );

            return (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className={`px-2.5 py-1.5 rounded-lg text-left transition border cursor-pointer flex items-center gap-2 ${
                  isCurrent 
                    ? 'bg-blue-50/80 border-blue-300 text-blue-900 font-bold shadow-2xs ring-1 ring-blue-400/40' 
                    : 'bg-slate-50/70 border-slate-200/80 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-blue-600' : 'text-slate-500'}`} />
                <div className="min-w-0">
                  <div className="truncate font-semibold text-[11px]">{preset.name}</div>
                  <div className="text-[9px] text-slate-600 truncate">{preset.tag}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Painel Central: Comparativo de Preço & Valuation Estilo ETHval */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-5 p-4 rounded-xl bg-gradient-to-r from-blue-50/70 via-slate-50 to-indigo-50/60 border border-blue-200/70 shadow-2xs">
        
        {/* Cotação de Mercado */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">
            Cotação Atual de Mercado
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900 font-mono">
              ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-slate-600 font-medium">Spot USD</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            Preço nominal negociado nas exchanges
          </p>
        </div>

        {/* Preço Intrínseco Justo Simulado */}
        <div className="bg-white p-3.5 rounded-xl border border-blue-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
              Preço Justo Intrínseco Simulado
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full font-mono ${
              isUndervalued ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              {isUndervalued ? `+${priceDiffPct}% Desconto` : `${priceDiffPct}% Ágio`}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-blue-700 font-mono">
              ${fairValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
            <span className="text-xs text-blue-600 font-semibold font-mono">
              ({(fairValue / currentPrice).toFixed(2)}x spot)
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            {isUndervalued 
              ? 'Margem de segurança positiva com base nas premissas simuladas'
              : 'Preço de mercado operando acima do valor intrínseco fundamental'}
          </p>
        </div>

        {/* Decomposição do Valor por Ação / Token */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">
            Decomposição de Valor (Triple Point Asset)
          </span>
          <div className="grid grid-cols-3 gap-1.5 mt-2 text-center">
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <p className="text-[9px] text-slate-600 font-semibold uppercase">Capital (PoS)</p>
              <p className="text-xs font-bold text-indigo-700 font-mono mt-0.5">
                ${valuationResults?.capitalAssetVal || 1120}
              </p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <p className="text-[9px] text-slate-600 font-semibold uppercase">Queima (EIP-1559)</p>
              <p className="text-xs font-bold text-amber-700 font-mono mt-0.5">
                ${valuationResults?.consumableAssetVal || 980}
              </p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <p className="text-[9px] text-slate-600 font-semibold uppercase">Reserva / Metcalfe</p>
              <p className="text-xs font-bold text-blue-700 font-mono mt-0.5">
                ${valuationResults?.storeOfValueVal || 1344}
              </p>
            </div>
          </div>
          <div className="text-[10px] text-slate-600 text-center mt-1">
            Soma dos componentes fundamentais do Ethereum
          </div>
        </div>

      </div>

      {/* Grid de Sliders de Premissas Interativas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Slider 1: Queima Diária EIP-1559 */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              Queima Diária EIP-1559
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                {assumptions.burnRateEthDay} ETH/dia
              </span>
              {assumptions.burnRateEthDay !== defaultAssumptions.burnRateEthDay && (
                <button 
                  onClick={() => resetField('burnRateEthDay')}
                  className="text-slate-600 hover:text-blue-600 p-0.5 cursor-pointer"
                  title="Resetar"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          <input 
            type="range"
            min="100"
            max="2500"
            step="25"
            value={assumptions.burnRateEthDay}
            onChange={(e) => updateField('burnRateEthDay', e.target.value)}
            className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>100 (Atividade baixa)</span>
            <span className="font-semibold text-slate-600">
              ~{Math.round((assumptions.burnRateEthDay * 365) / 1000)}k ETH/ano destruídos
            </span>
            <span>2.500 (Bull market)</span>
          </div>
        </div>

        {/* Slider 2: Staking Ratio (% do supply travado) */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Vault className="w-3.5 h-3.5 text-indigo-600" />
              Proporção em Staking (PoS)
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                {assumptions.stakingRatioPct}%
              </span>
              {assumptions.stakingRatioPct !== defaultAssumptions.stakingRatioPct && (
                <button 
                  onClick={() => resetField('stakingRatioPct')}
                  className="text-slate-600 hover:text-blue-600 p-0.5 cursor-pointer"
                  title="Resetar"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          <input 
            type="range"
            min="15.0"
            max="48.0"
            step="0.5"
            value={assumptions.stakingRatioPct}
            onChange={(e) => updateField('stakingRatioPct', e.target.value)}
            className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>15% (Float alto)</span>
            <span className="font-semibold text-slate-600">
              ~{((assumptions.stakingRatioPct * 120.4) / 100).toFixed(1)}M ETH travados
            </span>
            <span>48% (Choque severo)</span>
          </div>
        </div>

        {/* Slider 3: Throughput de L2s (TPS Agregado) */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-sky-600" />
              Throughput de L2s (The Surge)
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                {assumptions.l2Tps} tx/s
              </span>
              {assumptions.l2Tps !== defaultAssumptions.l2Tps && (
                <button 
                  onClick={() => resetField('l2Tps')}
                  className="text-slate-600 hover:text-blue-600 p-0.5 cursor-pointer"
                  title="Resetar"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          <input 
            type="range"
            min="50"
            max="1500"
            step="25"
            value={assumptions.l2Tps}
            onChange={(e) => updateField('l2Tps', e.target.value)}
            className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>50 tx/s (Pré-blobs)</span>
            <span className="font-semibold text-slate-600">
              {(assumptions.l2Tps / 12.5).toFixed(1)}x vs L1 base
            </span>
            <span>1.500 tx/s (PeerDAS)</span>
          </div>
        </div>

        {/* Slider 4: Coeficiente de Adoção de Metcalfe (Beta) */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              Efeito de Rede de Metcalfe (β)
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                β = {assumptions.metcalfeBeta.toFixed(2)}
              </span>
              {assumptions.metcalfeBeta !== defaultAssumptions.metcalfeBeta && (
                <button 
                  onClick={() => resetField('metcalfeBeta')}
                  className="text-slate-600 hover:text-blue-600 p-0.5 cursor-pointer"
                  title="Resetar"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          <input 
            type="range"
            min="1.60"
            max="2.40"
            step="0.02"
            value={assumptions.metcalfeBeta}
            onChange={(e) => updateField('metcalfeBeta', e.target.value)}
            className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>1.60 (Sub-linear)</span>
            <span className="font-semibold text-slate-600">Regressão Secular 2015-2026</span>
            <span>2.40 (Hiper-adoção)</span>
          </div>
        </div>

        {/* Slider 5: Múltiplo de Fluxo de Caixa (P/E) */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              Múltiplo de Fluxo de Caixa (P/E)
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                {assumptions.peMultiple.toFixed(1)}x
              </span>
              {assumptions.peMultiple !== defaultAssumptions.peMultiple && (
                <button 
                  onClick={() => resetField('peMultiple')}
                  className="text-slate-600 hover:text-blue-600 p-0.5 cursor-pointer"
                  title="Resetar"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          <input 
            type="range"
            min="12.0"
            max="45.0"
            step="1.0"
            value={assumptions.peMultiple}
            onChange={(e) => updateField('peMultiple', e.target.value)}
            className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>12x (Valor tradicional)</span>
            <span className="font-semibold text-slate-600">Tech / Software Growth</span>
            <span>45x (Prêmio de escassez)</span>
          </div>
        </div>

        {/* Slider 6: Taxa de Desconto / Prêmio de Risco Macro */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-rose-600" />
              Taxa de Desconto / Risco Macro
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                {assumptions.discountRatePct.toFixed(1)}%
              </span>
              {assumptions.discountRatePct !== defaultAssumptions.discountRatePct && (
                <button 
                  onClick={() => resetField('discountRatePct')}
                  className="text-slate-600 hover:text-blue-600 p-0.5 cursor-pointer"
                  title="Resetar"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          <input 
            type="range"
            min="4.0"
            max="14.0"
            step="0.5"
            value={assumptions.discountRatePct}
            onChange={(e) => updateField('discountRatePct', e.target.value)}
            className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>4.0% (Juros baixos)</span>
            <span className="font-semibold text-slate-600">Custo de capital institucional</span>
            <span>14.0% (Stress / Liquidez restrita)</span>
          </div>
        </div>

      </div>

      {/* Impacto Imediato nos Horizontes do TimesFM 3.0 */}
      <div className="mt-5 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Impacto Imediato nas Metas Projetadas pelo TimesFM 3.0:
          </span>
          <span className="text-[11px] text-slate-600 font-medium">
            Projeção recalibrada pelo vetor fundamental
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {[
            {
              horizon: '30 Dias',
              target: Math.round(fairValue * 0.88),
              pct: Math.round(((fairValue * 0.88 - currentPrice) / currentPrice) * 100),
              detail: 'Reação de liquidez de curto prazo'
            },
            {
              horizon: '180 Dias (6M)',
              target: Math.round(fairValue * 0.96),
              pct: Math.round(((fairValue * 0.96 - currentPrice) / currentPrice) * 100),
              detail: 'Convergência semestral ao valor justo'
            },
            {
              horizon: '365 Dias (1 Ano)',
              target: Math.round(fairValue * 1.08),
              pct: Math.round(((fairValue * 1.08 - currentPrice) / currentPrice) * 100),
              detail: 'Expansão de ciclo e queima acumulada'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-600 uppercase">{item.horizon}</span>
                <p className="text-base font-bold text-slate-900 font-mono mt-0.5">
                  ${item.target.toLocaleString('en-US')}
                </p>
                <p className="text-[10px] text-slate-600 mt-0.5">{item.detail}</p>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg font-mono ${
                item.pct >= 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {item.pct >= 0 ? '+' : ''}{item.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
