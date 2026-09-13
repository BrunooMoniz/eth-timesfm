import React, { useState } from 'react';
import { Activity, Cpu, Sparkles, TrendingUp, ShieldCheck, RefreshCw, Check } from 'lucide-react';

export default function Header({ currentPrice, priceChangePct, tvlUsd, stakedPct, lastUpdated, onRefreshSuccess }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshDone, setRefreshDone] = useState(false);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setRefreshDone(false);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/refresh', { method: 'POST' });
      if (res.ok) {
        // Aguarda execução do modelo em background (~8s)
        setTimeout(async () => {
          if (onRefreshSuccess) {
            await onRefreshSuccess();
          }
          setIsRefreshing(false);
          setRefreshDone(true);
          setTimeout(() => setRefreshDone(false), 4000);
        }, 8500);
      } else {
        setIsRefreshing(false);
      }
    } catch (e) {
      console.warn("API de re-inferência local em 8000 não conectada ou ocupada:", e);
      setIsRefreshing(false);
    }
  };

  return (
    <header className="border-b border-slate-800/80 bg-[#0d111a]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Logo & Marca */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-[#0b0e17] rounded-[10px] flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-300" viewBox="0 0 784.37 1277.39" fill="currentColor">
                <path d="M392.07 0L383.5 29.11V873.74L392.07 882.29L784.13 650.54L392.07 0Z" fillOpacity="0.75" />
                <path d="M392.07 0L0 650.54L392.07 882.29V472.33V0Z" />
                <path d="M392.07 956.52L387.24 962.41V1263.03L392.07 1277.38L784.37 724.89L392.07 956.52Z" fillOpacity="0.75" />
                <path d="M392.07 1277.38V956.52L0 724.89L392.07 1277.38Z" />
                <path d="M392.07 882.29L784.13 650.54L392.07 472.33V882.29Z" fillOpacity="0.5" />
                <path d="M0 650.54L392.07 882.29V472.33L0 650.54Z" fillOpacity="0.25" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">Ethereum TimesFM</h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                <Sparkles className="w-3 h-3 text-purple-400" />
                Google TimesFM 3.0 SOTA
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Projeções com IA Fundacional, Tese de World Computer & Super Asset
            </p>
          </div>
        </div>

        {/* Ticker de Métricas & Ações */}
        <div className="flex items-center flex-wrap gap-3 text-xs">
          
          {/* Cotação ETH */}
          <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-slate-400">ETH:</span>
            <span className="font-semibold text-white">
              {currentPrice ? `$${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '...'}
            </span>
            {priceChangePct !== undefined && (
              <span className={`flex items-center font-medium ${priceChangePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {priceChangePct >= 0 ? '+' : ''}{priceChangePct}%
              </span>
            )}
          </div>

          {/* TVL Global */}
          <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-slate-400">TVL DeFi:</span>
            <span className="font-semibold text-cyan-300">{tvlUsd || '$65.0B'}</span>
          </div>

          {/* Staking Ratio */}
          <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-slate-400">Supply Staked:</span>
            <span className="font-semibold text-purple-300">{stakedPct || '28.9%'}</span>
          </div>

          {/* Botão de Re-inferência sob demanda */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer border ${
              refreshDone
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : isRefreshing
                ? 'bg-purple-900/30 text-purple-300 border-purple-500/30 opacity-80 cursor-wait'
                : 'bg-purple-600 hover:bg-purple-500 text-white border-purple-500/50 shadow-md shadow-purple-600/20'
            }`}
            title="Dispara o modelo Google TimesFM 3.0 para recalcular todas as previsões"
          >
            {refreshDone ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Atualizado!</span>
              </>
            ) : isRefreshing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                <span>Processando IA...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Recalcular TimesFM</span>
              </>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
