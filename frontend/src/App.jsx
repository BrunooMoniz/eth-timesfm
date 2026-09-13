import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import KnowledgePills from './components/KnowledgePills';
import MentalModelDiagrams from './components/MentalModelDiagrams';
import ForecastChart from './components/ForecastChart';
import TpsRoadmapChart from './components/TpsRoadmapChart';
import SuperAssetSection from './components/SuperAssetSection';
import WorldComputerSection from './components/WorldComputerSection';
import ModelMethodology from './components/ModelMethodology';
import InteractiveSimulator from './components/InteractiveSimulator';
import { translations } from './i18n/translations';
import { Loader2 } from 'lucide-react';

const DEFAULT_ASSUMPTIONS = {
  burnRateEthDay: 420,
  stakingRatioPct: 28.9,
  l2Tps: 125,
  metcalfeBeta: 2.02,
  peMultiple: 25.0,
  discountRatePct: 7.5
};

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState('pt');
  const [assumptions, setAssumptions] = useState(DEFAULT_ASSUMPTIONS);

  const t = translations[lang] || translations.pt;

  const loadData = React.useCallback(async () => {
    try {
      const res = await fetch(`/data/eth_timesfm_data.json?t=${Date.now()}`);
      if (!res.ok) {
        throw new Error(`Erro ao carregar dados (${res.status})`);
      }
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (err) {
      console.error("Falha ao buscar dataset:", err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function startFetching() {
      try {
        const res = await fetch(`/data/eth_timesfm_data.json?t=${Date.now()}`);
        if (!res.ok) {
          throw new Error(`Erro ao carregar dados (${res.status})`);
        }
        const json = await res.json();
        if (!ignore) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Falha ao buscar dataset:", err);
          setError(err.message);
          setLoading(false);
        }
      }
    }
    startFetching();
    return () => {
      ignore = true;
    };
  }, []);

  const historySeries = data?.full_history_daily && data.full_history_daily.length > 0 
    ? data.full_history_daily 
    : (data?.market_history || []);
  const currentPrice = historySeries.length > 0 ? historySeries[historySeries.length - 1].close : 2484;
  const prevPrice = historySeries.length > 1 ? historySeries[historySeries.length - 2].close : currentPrice;
  const priceChangePct = currentPrice && prevPrice ? parseFloat((((currentPrice - prevPrice) / prevPrice) * 100).toFixed(2)) : 0;

  // Cálculo do Modelo de Valuation Sintético Integrado (estilo ETHval)
  const valuationResults = useMemo(() => {
    const p = currentPrice || 2484;
    const supplyEth = 120.4e6;
    
    // 1. Capital Asset (Yield do Staking PoS)
    const stakingYieldPct = 3.4 * Math.sqrt(28.9 / Math.max(10, assumptions.stakingRatioPct));
    const capitalAssetVal = Math.round((p * (stakingYieldPct / 100)) / (assumptions.discountRatePct / 100));

    // 2. Consumable Asset (Queima EIP-1559 via múltiplo de fluxo de caixa)
    const annualBurnEth = assumptions.burnRateEthDay * 365;
    const annualBurnUsd = annualBurnEth * p;
    const consumableAssetVal = Math.round((annualBurnUsd * (assumptions.peMultiple / 25.0)) / supplyEth * 12);

    // 3. Store of Value & Metcalfe Adoption Premium
    const metcalfeFactor = Math.pow(assumptions.metcalfeBeta / 2.02, 2.4) * (1 + (assumptions.l2Tps - 125) / 1500);
    const storeOfValueVal = Math.round(1344 * metcalfeFactor);

    // Simulated Fair Value Total Sintético
    const simulatedFairValue = Math.round(
      3444 * 
      (0.35 + 0.35 * (assumptions.burnRateEthDay / 420) + 0.30 * (assumptions.stakingRatioPct / 28.9)) *
      metcalfeFactor *
      Math.pow(assumptions.peMultiple / 25.0, 0.22) *
      Math.pow(7.5 / assumptions.discountRatePct, 0.28)
    );

    return {
      simulatedFairValue: Math.max(1200, simulatedFairValue),
      capitalAssetVal,
      consumableAssetVal,
      storeOfValueVal,
      stakingYieldPct: stakingYieldPct.toFixed(2),
      annualBurnEth: Math.round(annualBurnEth)
    };
  }, [assumptions, currentPrice]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col items-center justify-center gap-4 p-4">
        <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xs text-center max-w-md flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-3" />
          <h2 className="font-bold text-lg text-slate-900">Carregando Modelo Google TimesFM & Dados Ethereum...</h2>
          <p className="text-xs text-slate-500 mt-1.5">
            Sincronizando séries temporais multi-timeframe (2015–2026), quantis de incerteza e reconciliação hierárquica
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-rose-200 p-6 rounded-2xl max-w-md text-center shadow-xs">
          <h2 className="text-lg font-bold text-rose-600 mb-2">Não foi possível carregar os dados</h2>
          <p className="text-xs text-slate-500 mb-4">{error || 'Dataset não encontrado em /data/eth_timesfm_data.json'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer transition shadow-xs"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const { 
    market_history, 
    full_history_daily, 
    weekly_history, 
    monthly_history, 
    forecasts, 
    weekly_forecast, 
    fundamentals, 
    tps_roadmap_data, 
    generated_at,
    scenarios,
    channel_history,
    channel_history_full,
    methodology_framework
  } = data;

  const currentTvl = fundamentals?.current_tvl_usd ? `$${(fundamentals.current_tvl_usd / 1e9).toFixed(1)}B` : '$109.0B';
  const stakedPct = fundamentals?.triple_point_metrics?.capital_asset?.staked_pct_supply ? `${fundamentals.triple_point_metrics.capital_asset.staked_pct_supply}%` : '28.9%';

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Top Navbar com Seletor de Idiomas */}
      <Header 
        currentPrice={currentPrice}
        priceChangePct={priceChangePct}
        tvlUsd={currentTvl}
        stakedPct={stakedPct}
        lastUpdated={generated_at}
        onRefreshSuccess={loadData}
        lang={lang}
        setLang={setLang}
        t={t}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Pílulas de Conhecimento: Modelo Mental Sem Slop */}
        <KnowledgePills t={t} />

        {/* Diagramas Visuais do Modelo Mental (Flywheel & Pipeline TimesFM) */}
        <MentalModelDiagrams t={t} />

        {/* Mega Gráfico de Previsões com TimesFM 3.0, Toda a Linha Temporal e Reconciliação */}
        <ForecastChart 
          marketHistory={market_history || []}
          fullHistoryDaily={full_history_daily || []}
          weeklyHistory={weekly_history || []}
          monthlyHistory={monthly_history || []}
          forecasts={forecasts || {}}
          scenarios={scenarios || {}}
          channelHistory={channel_history || []}
          channelHistoryFull={channel_history_full || []}
          methodologyFramework={methodology_framework || {}}
          weeklyForecast={weekly_forecast || []}
          indicatorsForecast={data.indicators_forecast || {}}
          simulatedFairValue={valuationResults.simulatedFairValue}
        />

        {/* Simulador Interativo de Premissas & Valuation (Estilo ETHval) */}
        <InteractiveSimulator 
          assumptions={assumptions}
          setAssumptions={setAssumptions}
          defaultAssumptions={DEFAULT_ASSUMPTIONS}
          currentPrice={currentPrice}
          valuationResults={valuationResults}
          onResetAll={() => setAssumptions(DEFAULT_ASSUMPTIONS)}
        />

        {/* Gráfico Dedicado de Throughput (TPS) & Roadmap de Escalabilidade */}
        <TpsRoadmapChart 
          tpsRoadmapData={tps_roadmap_data}
        />

        {/* Seção 1: O Ethereum como Super Asset (Triple Point Asset) */}
        <SuperAssetSection 
          triplePointMetrics={fundamentals?.triple_point_metrics}
        />

        {/* Seção 2: O Ethereum como World Computer */}
        <WorldComputerSection 
          worldComputerMetrics={fundamentals?.world_computer_metrics}
        />

        {/* Seção 3: Metodologia e Fundamentos do TimesFM */}
        <ModelMethodology 
          methodologyFramework={methodology_framework}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Ethereum TimesFM • Plataforma Analítica & Projeções com IA Fundacional</p>
          <p className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            {generated_at ? `Dados atualizados em: ${generated_at}` : 'Dataset sincronizado em tempo real'}
          </p>
        </div>
      </footer>
    </div>
  );
}
