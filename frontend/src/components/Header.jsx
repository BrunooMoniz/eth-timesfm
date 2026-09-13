import React from 'react';
import { Activity, Cpu, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Header({ currentPrice, priceChangePct, tvlUsd, stakedPct, lastUpdated }) {
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
                Google Foundation Model 3.0
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Projeções com IA Fundacional, Tese de World Computer & Super Asset
            </p>
          </div>
        </div>

        {/* Ticker de Métricas em Tempo Real */}
        <div className="flex items-center flex-wrap gap-4 text-xs">
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

          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Inferência Pré-Calculada</span>
          </div>
        </div>

      </div>
    </header>
  );
}
