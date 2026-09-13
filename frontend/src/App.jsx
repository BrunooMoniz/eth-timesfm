import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ForecastChart from './components/ForecastChart';
import TpsRoadmapChart from './components/TpsRoadmapChart';
import SuperAssetSection from './components/SuperAssetSection';
import WorldComputerSection from './components/WorldComputerSection';
import ModelMethodology from './components/ModelMethodology';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const { market_history, full_history_daily, weekly_history, monthly_history, forecasts, weekly_forecast, fundamentals, tps_roadmap_data, generated_at } = data;
  const historySeries = full_history_daily && full_history_daily.length > 0 ? full_history_daily : (market_history || []);
  const currentPrice = historySeries.length > 0 ? historySeries[historySeries.length - 1].close : null;
  const prevPrice = historySeries.length > 1 ? historySeries[historySeries.length - 2].close : null;
  const priceChangePct = currentPrice && prevPrice ? parseFloat((((currentPrice - prevPrice) / prevPrice) * 100).toFixed(2)) : 0;

  const currentTvl = fundamentals?.current_tvl_usd ? `$${(fundamentals.current_tvl_usd / 1e9).toFixed(1)}B` : '$65.0B';
  const stakedPct = fundamentals?.triple_point_metrics?.capital_asset?.staked_pct_supply ? `${fundamentals.triple_point_metrics.capital_asset.staked_pct_supply}%` : '28.9%';

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Top Navbar */}
      <Header 
        currentPrice={currentPrice}
        priceChangePct={priceChangePct}
        tvlUsd={currentTvl}
        stakedPct={stakedPct}
        lastUpdated={generated_at}
        onRefreshSuccess={loadData}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Mega Gráfico de Previsões com TimesFM 3.0 e Cruzamento Multi-Timeframe */}
        <ForecastChart 
          marketHistory={market_history || []}
          fullHistoryDaily={full_history_daily || []}
          weeklyHistory={weekly_history || []}
          monthlyHistory={monthly_history || []}
          forecasts={forecasts || {}}
          weeklyForecast={weekly_forecast || []}
          indicatorsForecast={data.indicators_forecast || {}}
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
        <ModelMethodology />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Ethereum TimesFM • Plataforma Analítica & Projeções com IA Fundacional</p>
          <p className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Dados atualizados em: <span className="text-slate-800 font-mono">{generated_at}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
