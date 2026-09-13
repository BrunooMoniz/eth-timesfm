import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ForecastChart from './components/ForecastChart';
import SuperAssetSection from './components/SuperAssetSection';
import WorldComputerSection from './components/WorldComputerSection';
import ModelMethodology from './components/ModelMethodology';
import { Loader2, RefreshCw } from 'lucide-react';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
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
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <div className="text-center">
          <p className="font-semibold text-lg">Carregando Modelo Google TimesFM & Dados Ethereum...</p>
          <p className="text-xs text-slate-400 mt-1">Carregando séries temporais, quantis e métricas de consenso</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex flex-col items-center justify-center p-4">
        <div className="bg-[#0f1422] border border-rose-500/40 p-6 rounded-2xl max-w-md text-center">
          <h2 className="text-lg font-bold text-rose-400 mb-2">Não foi possível carregar os dados</h2>
          <p className="text-xs text-slate-400 mb-4">{error || 'Dataset não encontrado em /data/eth_timesfm_data.json'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold cursor-pointer transition"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const { market_history, forecasts, fundamentals, generated_at } = data;
  const currentPrice = market_history && market_history.length > 0 ? market_history[market_history.length - 1].close : null;
  const prevPrice = market_history && market_history.length > 1 ? market_history[market_history.length - 2].close : null;
  const priceChangePct = currentPrice && prevPrice ? parseFloat((((currentPrice - prevPrice) / prevPrice) * 100).toFixed(2)) : 0;

  const currentTvl = fundamentals?.current_tvl_usd ? `$${(fundamentals.current_tvl_usd / 1e9).toFixed(1)}B` : '$65.0B';
  const stakedPct = fundamentals?.triple_point_metrics?.capital_asset?.staked_pct_supply ? `${fundamentals.triple_point_metrics.capital_asset.staked_pct_supply}%` : '28.9%';

  return (
    <div className="min-h-screen bg-[#090d16] text-[#e2e8f0]">
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
        
        {/* Mega Gráfico de Previsões com TimesFM 3.0 */}
        <ForecastChart 
          marketHistory={market_history}
          forecasts={forecasts}
          indicatorsForecast={data.indicators_forecast}
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
      <footer className="border-t border-slate-800/70 bg-[#0c101a] py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Ethereum TimesFM • Plataforma Analítica & Projeções com IA Fundacional</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            Dados atualizados em: <span className="text-slate-300 font-mono">{generated_at}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
