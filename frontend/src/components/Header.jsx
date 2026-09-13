import React, { useState } from 'react';
import { Sparkles, RefreshCw, Check, Clock } from 'lucide-react';

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
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Logo & Marca */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 p-0.5 shadow-sm shadow-blue-500/20">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 784.37 1277.39" fill="currentColor">
                <path d="M392.07 0L383.5 29.11V873.74L392.07 882.29L784.13 650.54L392.07 0Z" fillOpacity="0.85" />
                <path d="M392.07 0L0 650.54L392.07 882.29V472.33V0Z" />
                <path d="M392.07 956.52L387.24 962.41V1263.03L392.07 1277.38L784.37 724.89L392.07 956.52Z" fillOpacity="0.85" />
                <path d="M392.07 1277.38V956.52L0 724.89L392.07 1277.38Z" />
                <path d="M392.07 882.29L784.13 650.54L392.07 472.33V882.29Z" fillOpacity="0.6" />
                <path d="M0 650.54L392.07 882.29V472.33L0 650.54Z" fillOpacity="0.35" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Ethereum TimesFM</h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                <Sparkles className="w-3 h-3 text-blue-600" />
                Google TimesFM 3.0 SOTA
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Projeções com IA Fundacional, Tese de World Computer & Super Asset
            </p>
          </div>
        </div>

        {/* Ticker de Métricas & Ações */}
        <div className="flex items-center flex-wrap gap-2.5 text-xs">
          
          {/* Cotação ETH */}
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xs">
            <span className="text-slate-500 font-medium">ETH:</span>
            <span className="font-bold text-slate-900 font-mono">
              {currentPrice ? `$${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '...'}
            </span>
            {priceChangePct !== undefined && (
              <span className={`inline-flex items-center font-semibold px-1.5 py-0.5 rounded text-[11px] ${
                priceChangePct >= 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-rose-50 text-rose-700 border border-rose-200/60'
              }`}>
                {priceChangePct >= 0 ? '+' : ''}{priceChangePct}%
              </span>
            )}
          </div>

          {/* TVL Global */}
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xs">
            <span className="text-slate-500 font-medium">TVL DeFi:</span>
            <span className="font-bold text-blue-700 font-mono">{tvlUsd || '$65.0B'}</span>
          </div>

          {/* Staking Ratio */}
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xs">
            <span className="text-slate-500 font-medium">Supply Staked:</span>
            <span className="font-bold text-indigo-700 font-mono">{stakedPct || '28.9%'}</span>
          </div>

          {/* Última Atualização */}
          {lastUpdated && (
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{lastUpdated}</span>
            </div>
          )}

          {/* Botão de Re-inferência sob demanda */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer border shadow-xs ${
              refreshDone
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : isRefreshing
                ? 'bg-blue-50 text-blue-700 border-blue-200 opacity-80 cursor-wait'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-blue-600 hover:border-blue-700 shadow-blue-600/20'
            }`}
            title="Dispara o modelo Google TimesFM 3.0 para recalcular todas as previsões"
          >
            {refreshDone ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Atualizado!</span>
              </>
            ) : isRefreshing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
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
