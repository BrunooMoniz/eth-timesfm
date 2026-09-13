import React, { useState } from 'react';
import { Sparkles, RefreshCw, Check, Clock, Globe, LineChart, Sliders, Layers, Lightbulb, Binary } from 'lucide-react';

export default function Header({ 
  currentPrice, 
  priceChangePct, 
  tvlUsd, 
  stakedPct, 
  lastUpdated, 
  onRefreshSuccess,
  lang = 'pt',
  setLang,
  t,
  activePage = 'previsao',
  onNavigate
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshDone, setRefreshDone] = useState(false);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setRefreshDone(false);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/refresh', { method: 'POST' });
      if (res.ok) {
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

  const navItems = [
    { id: 'previsao', label: t?.navForecast || 'Terminal de Previsão', icon: LineChart, path: '/' },
    { id: 'valuation', label: t?.navValuation || 'Simulador de Valuation', icon: Sliders, path: '/valuation' },
    { id: 'escalabilidade', label: t?.navScaling || 'Escalabilidade & L2s', icon: Layers, path: '/escalabilidade' },
    { id: 'tese', label: t?.navThesis || 'Tese Econômica', icon: Lightbulb, path: '/tese' },
    { id: 'metodologia', label: t?.navMethodology || 'Metodologia IA', icon: Binary, path: '/metodologia' },
  ];

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xs">
      {/* Top Bar: Marca, Ticker & Ações */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Logo & Marca */}
        <div 
          onClick={() => onNavigate && onNavigate('previsao')}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 p-0.5 shadow-sm shadow-blue-500/20 shrink-0">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" viewBox="0 0 784.37 1277.39" fill="currentColor">
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
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">{t?.appName || "Ethereum TimesFM"}</h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                <Sparkles className="w-2.5 h-2.5 text-blue-600" />
                TimesFM 3.0
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {t?.appSubtitle || "Projeções com IA Fundacional & Análise On-Chain"}
            </p>
          </div>
        </div>

        {/* Ticker de Métricas & Idioma */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          
          {/* Cotação ETH */}
          <div className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs">
            <span className="text-slate-500 font-medium">{t?.spotPrice || "ETH:"}</span>
            <span className="font-bold text-slate-900 font-mono">
              {currentPrice ? `$${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '...'}
            </span>
            {priceChangePct !== undefined && (
              <span className={`inline-flex items-center font-semibold px-1 py-0.2 rounded text-[10px] ${
                priceChangePct >= 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-rose-50 text-rose-700 border border-rose-200/60'
              }`}>
                {priceChangePct >= 0 ? '+' : ''}{priceChangePct}%
              </span>
            )}
          </div>

          {/* TVL Global */}
          <div className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs">
            <span className="text-slate-500 font-medium">{t?.tvlDefi || "TVL:"}</span>
            <span className="font-bold text-blue-700 font-mono">{tvlUsd || '$109.0B'}</span>
          </div>

          {/* Staking Ratio */}
          <div className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs">
            <span className="text-slate-500 font-medium">{t?.stakedSupply || "Staked:"}</span>
            <span className="font-bold text-indigo-700 font-mono">{stakedPct || '28.9%'}</span>
          </div>

          {/* Seletor de Idioma (i18n: PT / EN / ZH) */}
          <div className="bg-slate-100 border border-slate-200 p-0.5 rounded-lg flex items-center gap-0.5">
            <Globe className="w-3 h-3 text-slate-500 ml-1 mr-0.5" />
            <button
              onClick={() => setLang('pt')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                lang === 'pt' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PT
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                lang === 'en' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('zh')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                lang === 'zh' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              中文
            </button>
          </div>

          {/* Botão de Re-inferência sob demanda */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer border shadow-xs text-[11px] ${
              refreshDone
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : isRefreshing
                ? 'bg-blue-50 text-blue-700 border-blue-200 opacity-80 cursor-wait'
                : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-blue-600/20'
            }`}
          >
            {refreshDone ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span>OK!</span>
              </>
            ) : isRefreshing ? (
              <>
                <RefreshCw className="w-3 h-3 text-blue-600 animate-spin" />
                <span>{t?.recalculating || "..."}</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-3 h-3" />
                <span>{t?.recalculate || "Recalcular"}</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Navigation Bar: Abas / Páginas Dedicadas */}
      <div className="border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate && onNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
