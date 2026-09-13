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

function getPageFromPath(path) {
  if (path.includes('/valuation')) return 'valuation';
  if (path.includes('/escalabilidade')) return 'escalabilidade';
  if (path.includes('/tese')) return 'tese';
  if (path.includes('/metodologia')) return 'metodologia';
  return 'previsao';
}

function getPathFromPage(page) {
  switch (page) {
    case 'valuation': return '/valuation';
    case 'escalabilidade': return '/escalabilidade';
    case 'tese': return '/tese';
    case 'metodologia': return '/metodologia';
    default: return '/';
  }
}

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState('pt');
  const [activePage, setActivePage] = useState(() => getPageFromPath(window.location.pathname));
  const [assumptions, setAssumptions] = useState(DEFAULT_ASSUMPTIONS);

  const t = translations[lang] || translations.pt;

  const navigateTo = (page) => {
    setActivePage(page);
    const newPath = getPathFromPage(page);
    if (window.location.pathname !== newPath) {
      window.history.pushState({ page }, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getPageFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
          <h2 className="font-bold text-lg text-slate-900">Carregando Plataforma Ethereum TimesFM...</h2>
          <p className="text-xs text-slate-500 mt-1.5">
            Sincronizando séries temporais multi-timeframe (2015–2026), quantis e fundamentação on-chain
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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col justify-between">
      <div>
        {/* Top Navbar com Abas de Navegação Multi-Páginas */}
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
          activePage={activePage}
          onNavigate={navigateTo}
        />

        {/* Conteúdo da Página Selecionada (Sem Slop de Tudo de uma Vez) */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* PÁGINA 1: Terminal de Previsão (Foco Puro no Gráfico & Projeções) */}
          {activePage === 'previsao' && (
            <div className="space-y-6">
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
            </div>
          )}

          {/* PÁGINA 2: Simulador de Valuation Dedicado (Estilo ETHval) */}
          {activePage === 'valuation' && (
            <div className="space-y-6">
              <InteractiveSimulator 
                assumptions={assumptions}
                setAssumptions={setAssumptions}
                defaultAssumptions={DEFAULT_ASSUMPTIONS}
                currentPrice={currentPrice}
                valuationResults={valuationResults}
                onResetAll={() => setAssumptions(DEFAULT_ASSUMPTIONS)}
              />
            </div>
          )}

          {/* PÁGINA 3: Escalabilidade & L2s Roadmap (The Surge & PeerDAS) */}
          {activePage === 'escalabilidade' && (
            <div className="space-y-6">
              <TpsRoadmapChart 
                tpsRoadmapData={tps_roadmap_data}
              />
            </div>
          )}

          {/* PÁGINA 4: Tese Econômica & Modelos Mentais */}
          {activePage === 'tese' && (
            <div className="space-y-6">
              {/* Diagramas Visuais do Modelo Mental */}
              <MentalModelDiagrams t={t} />

              {/* Pílulas de Conhecimento Práticas */}
              <KnowledgePills t={t} />

              {/* O Ethereum como Super Asset */}
              <SuperAssetSection 
                triplePointMetrics={fundamentals?.triple_point_metrics}
              />

              {/* O Ethereum como World Computer */}
              <WorldComputerSection 
                worldComputerMetrics={fundamentals?.world_computer_metrics}
              />
            </div>
          )}

          {/* PÁGINA 5: Metodologia e Fundamentos do TimesFM */}
          {activePage === 'metodologia' && (
            <div className="space-y-6">
              <ModelMethodology 
                methodologyFramework={methodology_framework}
              />
            </div>
          )}

        </main>
      </div>

      {/* Footer Limpo e Profissional */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Ethereum TimesFM • Arquitetura Modular & IA Fundacional</p>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => navigateTo('previsao')} className="hover:text-blue-600 transition">Previsão</button>
            <button onClick={() => navigateTo('valuation')} className="hover:text-blue-600 transition">Valuation</button>
            <button onClick={() => navigateTo('escalabilidade')} className="hover:text-blue-600 transition">Escalabilidade</button>
            <button onClick={() => navigateTo('tese')} className="hover:text-blue-600 transition">Tese</button>
            <button onClick={() => navigateTo('metodologia')} className="hover:text-blue-600 transition">Metodologia</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
