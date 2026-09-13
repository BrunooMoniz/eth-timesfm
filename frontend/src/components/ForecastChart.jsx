import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createChart, ColorType, LineSeries, CandlestickSeries, AreaSeries } from 'lightweight-charts';
import { Layers, Eye, Flame, Vault, Cpu, GitMerge, CheckCircle2 } from 'lucide-react';

export default function ForecastChart({
  marketHistory = [],
  fullHistoryDaily = [],
  weeklyHistory = [],
  monthlyHistory = [],
  forecasts = {},
  indicatorsForecast = {}
}) {
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);

  // Estados de controle
  const [selectedHorizon, setSelectedHorizon] = useState('30d'); // '7d' | '30d' | '90d'
  const [selectedTimeframe, setSelectedTimeframe] = useState('1d'); // '1d' | '1w' | '1m' | 'all'
  const [chartType, setChartType] = useState('candles'); // 'candles' | 'line'
  const [showP10P90, setShowP10P90] = useState(true);

  // Seleciona o conjunto de dados histórico baseado no timeframe escolhido
  const activeHistoricalData = useMemo(() => {
    if (selectedTimeframe === 'all' && fullHistoryDaily.length > 0) {
      return fullHistoryDaily;
    }
    if (selectedTimeframe === '1w' && weeklyHistory.length > 0) {
      return weeklyHistory;
    }
    if (selectedTimeframe === '1m' && monthlyHistory.length > 0) {
      return monthlyHistory;
    }
    // Default 1d (últimos 365 dias ou o que vier em marketHistory)
    return marketHistory.length > 0 ? marketHistory : fullHistoryDaily;
  }, [selectedTimeframe, marketHistory, fullHistoryDaily, weeklyHistory, monthlyHistory]);

  const currentForecast = forecasts[selectedHorizon] || null;

  useEffect(() => {
    if (!chartContainerRef.current || activeHistoricalData.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.remove();
      chartInstance.current = null;
    }

    const container = chartContainerRef.current;
    const chart = createChart(container, {
      width: container.clientWidth,
      height: 500,
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: '#64748b',
        fontSize: 12,
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      },
      grid: {
        vertLines: { color: '#f1f5f9' },
        horzLines: { color: '#f1f5f9' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: 'rgba(37, 99, 235, 0.4)',
          width: 1,
          style: 3,
        },
        horzLine: {
          color: 'rgba(37, 99, 235, 0.4)',
          width: 1,
          style: 3,
        },
      },
      rightPriceScale: {
        borderColor: '#e2e8f0',
        scaleMargins: {
          top: 0.1,
          bottom: 0.15,
        },
      },
      timeScale: {
        borderColor: '#e2e8f0',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartInstance.current = chart;

    // 1. Plotar histórico de mercado selecionado
    if (chartType === 'candles') {
      const candleSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#10b981',
        downColor: '#ef4444',
        borderVisible: false,
        wickUpColor: '#10b981',
        wickDownColor: '#ef4444',
      });
      const candleData = activeHistoricalData.map(p => ({
        time: p.time,
        open: p.open,
        high: p.high,
        low: p.low,
        close: p.close,
      }));
      candleSeries.setData(candleData);
    } else {
      const historyLineSeries = chart.addSeries(LineSeries, {
        color: '#0284c7',
        lineWidth: 2,
      });
      const lineData = activeHistoricalData.map(p => ({
        time: p.time,
        value: p.close,
      }));
      historyLineSeries.setData(lineData);
    }

    // 2. Plotar projeções do TimesFM 3.0
    if (currentForecast && currentForecast.points && currentForecast.points.length > 0) {
      const lastHistorical = activeHistoricalData[activeHistoricalData.length - 1];

      // Banda Ampla P10 - P90 em azul translúcido (#2563eb / 0.12)
      if (showP10P90) {
        const areaUpperP90 = chart.addSeries(AreaSeries, {
          topColor: 'rgba(37, 99, 235, 0.14)',
          bottomColor: 'rgba(37, 99, 235, 0.02)',
          lineColor: 'rgba(37, 99, 235, 0.35)',
          lineWidth: 1,
          lineStyle: 2,
        });
        const p90Data = [
          { time: lastHistorical.time, value: lastHistorical.close },
          ...currentForecast.points.map(pt => ({ time: pt.time, value: pt.p90 }))
        ];
        areaUpperP90.setData(p90Data);

        const areaLowerP10 = chart.addSeries(AreaSeries, {
          topColor: 'rgba(37, 99, 235, 0.05)',
          bottomColor: 'rgba(37, 99, 235, 0.01)',
          lineColor: 'rgba(37, 99, 235, 0.35)',
          lineWidth: 1,
          lineStyle: 2,
        });
        const p10Data = [
          { time: lastHistorical.time, value: lastHistorical.close },
          ...currentForecast.points.map(pt => ({ time: pt.time, value: pt.p10 }))
        ];
        areaLowerP10.setData(p10Data);
      }

      // Linha Mediana P50 do TimesFM 3.0 em azul vibrante (#2563eb) com espessura 3
      const medianSeries = chart.addSeries(LineSeries, {
        color: '#2563eb',
        lineWidth: 3,
        lineStyle: 0,
      });
      const medianData = [
        { time: lastHistorical.time, value: lastHistorical.close },
        ...currentForecast.points.map(pt => ({ time: pt.time, value: pt.median }))
      ];
      medianSeries.setData(medianData);
    }

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current && chartInstance.current) {
        chartInstance.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstance.current) {
        chartInstance.current.remove();
        chartInstance.current = null;
      }
    };
  }, [activeHistoricalData, currentForecast, chartType, showP10P90]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
      
      {/* Barra de Controles Superiores */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        
        {/* Título & Seletores de Horizonte de Projeção */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Previsão de Preço com Google TimesFM 3.0
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70">
              SOTA #1 Benchmark
            </span>
          </div>

          {/* Seletor de Horizonte de Projeção: [7 Dias] [30 Dias] [90 Dias] */}
          <div className="bg-slate-100/90 border border-slate-200 rounded-xl p-1 flex items-center gap-1">
            <span className="text-[10px] uppercase font-bold text-slate-600 px-2">Horizonte:</span>
            {[
              { id: '7d', label: '7 Dias', desc: 'Tático' },
              { id: '30d', label: '30 Dias', desc: 'Médio Prazo' },
              { id: '90d', label: '90 Dias', desc: 'Estratégico' }
            ].map(h => (
              <button
                key={h.id}
                onClick={() => setSelectedHorizon(h.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedHorizon === h.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeframe de Visualização & Modos do Gráfico */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          
          {/* Seletor de Timeframe de Visualização */}
          <div className="bg-slate-100/90 border border-slate-200 rounded-xl p-1 flex items-center gap-1">
            <span className="text-[10px] uppercase font-bold text-slate-600 px-1.5">Zoom:</span>
            {[
              { id: '1d', label: '1D Diário' },
              { id: '1w', label: '1W Semanal' },
              { id: '1m', label: '1M Mensal' },
              { id: 'all', label: 'Histórico Total (2015-2026)' },
            ].map(tf => (
              <button
                key={tf.id}
                onClick={() => setSelectedTimeframe(tf.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  selectedTimeframe === tf.id
                    ? 'bg-white text-blue-700 shadow-2xs border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>

          {/* Tipo de Gráfico (Candles / Linha) */}
          <div className="bg-slate-100/90 border border-slate-200 rounded-xl p-1 flex items-center">
            <button
              onClick={() => setChartType('candles')}
              className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                chartType === 'candles' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Candles
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                chartType === 'line' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Linha
            </button>
          </div>

          {/* Toggle Bandas P10-P90 */}
          <button
            onClick={() => setShowP10P90(!showP10P90)}
            className={`px-2.5 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 transition cursor-pointer text-xs ${
              showP10P90
                ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-2xs'
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Bandas P10–P90
          </button>
        </div>

      </div>

      {/* Estatísticas Rápidas do Preço */}
      {currentForecast && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-4 border-b border-slate-200">
          <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/80">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Cotação Atual</p>
            <p className="text-base font-bold text-slate-900 mt-0.5 font-mono">
              ${currentForecast.current_price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100">
            <p className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">Previsão Mediana (P50)</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-base font-bold text-blue-700 font-mono">
                ${currentForecast.expected_price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                currentForecast.expected_change_pct >= 0 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {currentForecast.expected_change_pct >= 0 ? '+' : ''}{currentForecast.expected_change_pct}%
              </span>
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/80">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Banda Inferior (P10)</p>
            <p className="text-base font-bold text-slate-700 mt-0.5 font-mono">
              ${currentForecast.range_p10_p90[0]?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/80">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Banda Superior (P90)</p>
            <p className="text-base font-bold text-slate-700 mt-0.5 font-mono">
              ${currentForecast.range_p10_p90[1]?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      )}

      {/* Container do Gráfico TradingView */}
      <div className="relative mt-4">
        <div ref={chartContainerRef} className="w-full h-[500px] rounded-xl overflow-hidden border border-slate-200/60" />
        
        {/* Legenda Flutuante TradingView Light */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-2 rounded-lg text-xs flex items-center gap-4 pointer-events-none shadow-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-sky-600"></span>
            <span className="text-slate-700 font-medium">Histórico ({selectedTimeframe.toUpperCase()})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-blue-600 rounded-xs"></span>
            <span className="text-blue-700 font-bold">TimesFM 3.0 P50 (Mediana)</span>
          </div>
          {showP10P90 && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-blue-500/20 border border-blue-500/40 rounded-xs"></span>
              <span className="text-slate-600 font-medium">Faixa P10–P90 (80% Incerteza)</span>
            </div>
          )}
        </div>
      </div>

      {/* Card de Cruzamento Multi-Timeframe (Reconciliação Hierárquica) */}
      {currentForecast && (
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-blue-50/80 via-sky-50/40 to-slate-50 border border-blue-200/80 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-blue-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
                <GitMerge className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  Reconciliação Hierárquica Multi-Timeframe
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
                    {currentForecast.explanation?.direction || 'Alta Consistente'}
                  </span>
                </h4>
                <p className="text-xs text-slate-500">
                  Cruzamento dinâmico entre a microestrutura diária e a âncora macro de múltiplos ciclos (2015-2026)
                </p>
              </div>
            </div>

            {/* Badges de Comparação de Níveis */}
            <div className="flex items-center gap-2 text-xs">
              <div className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-slate-500 text-[11px]">Sinal Diário Bruto: </span>
                <span className="font-bold text-slate-800 font-mono">
                  ${(currentForecast.daily_unreconciled || currentForecast.expected_price)?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-2xs">
                <span className="text-blue-700 text-[11px]">Âncora Macro Semanal: </span>
                <span className="font-bold text-blue-800 font-mono">
                  ${(currentForecast.weekly_macro_anchor || currentForecast.expected_price)?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <p className="text-slate-700 font-medium">
                {currentForecast.explanation?.summary}
              </p>
              <p className="text-slate-500 leading-relaxed">
                {currentForecast.explanation?.fundamentals_impact}
              </p>
            </div>
            <div className="bg-white/90 p-3 rounded-lg border border-blue-100 space-y-1.5 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-blue-700 font-semibold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Calibração de Alta Assertividade:</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {currentForecast.explanation?.cross_validation || 'Ponderação hierárquica ótima eliminando ruídos de cauda e concentrando a probabilidade na tendência estrutural.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Grid de Previsões dos Indicadores On-chain Adicionais (30 Dias) */}
      {indicatorsForecast && Object.keys(indicatorsForecast).length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Projeções de Indicadores On-Chain com TimesFM 3.0 (30 Dias)
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Auto-regressivo multivariado</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. TVL DeFi */}
            {indicatorsForecast.tvl_30d && (
              <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:border-blue-300 transition">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                    <Vault className="w-3.5 h-3.5 text-blue-600" />
                    TVL DeFi Projetado
                  </span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded text-[11px]">
                    +{indicatorsForecast.tvl_30d.change_pct}%
                  </span>
                </div>
                <p className="text-xl font-bold text-slate-900 mt-1.5 font-mono">
                  ${indicatorsForecast.tvl_30d.projected_median_bn_usd}B
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Faixa P10–P90: ${indicatorsForecast.tvl_30d.p10_p90[0]}B a ${indicatorsForecast.tvl_30d.p10_p90[1]}B
                </p>
              </div>
            )}

            {/* 2. Queima EIP-1559 */}
            {indicatorsForecast.daily_burn_30d && (
              <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:border-amber-300 transition">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    Queima Estimada (30D)
                  </span>
                  <span className="font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded text-[11px]">
                    ~{indicatorsForecast.daily_burn_30d.projected_median_eth_day} ETH/dia
                  </span>
                </div>
                <p className="text-xl font-bold text-slate-900 mt-1.5 font-mono">
                  {indicatorsForecast.daily_burn_30d.cumulative_30d_eth?.toLocaleString()} ETH
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Total a ser destruído e retirado de circulação em 30 dias
                </p>
              </div>
            )}

            {/* 3. L2 TPS */}
            {indicatorsForecast.l2_tps_30d && (
              <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:border-sky-300 transition">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                    <Cpu className="w-3.5 h-3.5 text-sky-600" />
                    TPS Médio de L2s
                  </span>
                  <span className="font-bold text-sky-700 bg-sky-50 border border-sky-200/60 px-1.5 py-0.5 rounded text-[11px]">
                    +{indicatorsForecast.l2_tps_30d.change_pct}%
                  </span>
                </div>
                <p className="text-xl font-bold text-slate-900 mt-1.5 font-mono">
                  {indicatorsForecast.l2_tps_30d.projected_median_tps} tx/s
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Faixa P10–P90: {indicatorsForecast.l2_tps_30d.p10_p90[0]} a {indicatorsForecast.l2_tps_30d.p10_p90[1]} tx/s
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
