import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, LineSeries, CandlestickSeries, AreaSeries } from 'lightweight-charts';
import { Calendar, TrendingUp, AlertCircle, Info, Layers, Eye, Sparkles } from 'lucide-react';

export default function ForecastChart({ marketHistory = [], forecasts = {} }) {
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);

  // Estados de controle
  const [selectedHorizon, setSelectedHorizon] = useState('30d');
  const [chartType, setChartType] = useState('candles'); // 'candles' | 'line'
  const [showP10P90, setShowP10P90] = useState(true);
  const [showP25P75, setShowP25P75] = useState(true);

  const currentForecast = forecasts[selectedHorizon] || null;

  useEffect(() => {
    if (!chartContainerRef.current || marketHistory.length === 0) return;

    // Remove gráfico anterior se houver
    if (chartInstance.current) {
      chartInstance.current.remove();
      chartInstance.current = null;
    }

    const container = chartContainerRef.current;
    const chart = createChart(container, {
      width: container.clientWidth,
      height: 480,
      layout: {
        background: { type: ColorType.Solid, color: '#0d111a' },
        textColor: '#94a3b8',
        fontSize: 12,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
      grid: {
        vertLines: { color: 'rgba(51, 65, 85, 0.25)' },
        horzLines: { color: 'rgba(51, 65, 85, 0.25)' },
      },
      crosshair: {
        mode: 1, // Magnet
        vertLine: {
          color: 'rgba(168, 85, 247, 0.6)',
          width: 1,
          style: 3,
        },
        horzLine: {
          color: 'rgba(168, 85, 247, 0.6)',
          width: 1,
          style: 3,
        },
      },
      rightPriceScale: {
        borderColor: 'rgba(51, 65, 85, 0.5)',
        scaleMargins: {
          top: 0.1,
          bottom: 0.15,
        },
      },
      timeScale: {
        borderColor: 'rgba(51, 65, 85, 0.5)',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartInstance.current = chart;

    // 1. Plotar histórico de mercado
    if (chartType === 'candles') {
      const candleSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#10b981',
        downColor: '#f43f5e',
        borderVisible: false,
        wickUpColor: '#10b981',
        wickDownColor: '#f43f5e',
      });
      const candleData = marketHistory.map(p => ({
        time: p.time,
        open: p.open,
        high: p.high,
        low: p.low,
        close: p.close,
      }));
      candleSeries.setData(candleData);
    } else {
      const historyLineSeries = chart.addSeries(LineSeries, {
        color: '#38bdf8',
        lineWidth: 2,
      });
      const lineData = marketHistory.map(p => ({
        time: p.time,
        value: p.close,
      }));
      historyLineSeries.setData(lineData);
    }

    // 2. Se houver projeção selecionada, plotar as bandas e a mediana
    if (currentForecast && currentForecast.points && currentForecast.points.length > 0) {
      const lastHistorical = marketHistory[marketHistory.length - 1];

      // Banda Ampla P10 - P90 (Área superior e inferior)
      if (showP10P90) {
        const areaUpperP90 = chart.addSeries(AreaSeries, {
          topColor: 'rgba(168, 85, 247, 0.12)',
          bottomColor: 'rgba(168, 85, 247, 0.01)',
          lineColor: 'rgba(168, 85, 247, 0.4)',
          lineWidth: 1,
          lineStyle: 2, // Dashed
        });
        const p90Data = [
          { time: lastHistorical.time, value: lastHistorical.close },
          ...currentForecast.points.map(pt => ({ time: pt.time, value: pt.p90 }))
        ];
        areaUpperP90.setData(p90Data);

        const areaLowerP10 = chart.addSeries(AreaSeries, {
          topColor: 'rgba(168, 85, 247, 0.05)',
          bottomColor: 'rgba(168, 85, 247, 0.01)',
          lineColor: 'rgba(168, 85, 247, 0.4)',
          lineWidth: 1,
          lineStyle: 2,
        });
        const p10Data = [
          { time: lastHistorical.time, value: lastHistorical.close },
          ...currentForecast.points.map(pt => ({ time: pt.time, value: pt.p10 }))
        ];
        areaLowerP10.setData(p10Data);
      }

      // Linha Central do TimesFM (Mediana / P50)
      const medianSeries = chart.addSeries(LineSeries, {
        color: '#c084fc', // Lilás elétrico
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
  }, [marketHistory, currentForecast, chartType, showP10P90, showP25P75]);

  return (
    <div className="bg-[#0f1422] border border-slate-800/90 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
      
      {/* Barra de Controles Superiores */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        
        {/* Título & Seletores de Horizonte */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Previsão de Preço com Google TimesFM
            </h2>
          </div>

          {/* Horizontes */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-1 flex items-center gap-1">
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
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles de Visualização */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Tipo de Gráfico */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-1 flex items-center">
            <button
              onClick={() => setChartType('candles')}
              className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                chartType === 'candles' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Candles
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                chartType === 'line' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Linha
            </button>
          </div>

          {/* Toggle Bandas P10-P90 */}
          <button
            onClick={() => setShowP10P90(!showP10P90)}
            className={`px-2.5 py-1.5 rounded-xl border font-medium flex items-center gap-1.5 transition cursor-pointer ${
              showP10P90
                ? 'bg-purple-950/40 border-purple-500/40 text-purple-300'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Bandas P10–P90
          </button>
        </div>

      </div>

      {/* Estatísticas Rápidas do Horizonte */}
      {currentForecast && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4 border-b border-slate-800/70">
          <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800/50">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Cotação Atual</p>
            <p className="text-base font-bold text-white mt-0.5">
              ${currentForecast.current_price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800/50">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Previsão Mediana (P50)</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-base font-bold text-purple-300">
                ${currentForecast.expected_price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                currentForecast.expected_change_pct >= 0 
                  ? 'bg-emerald-500/15 text-emerald-400' 
                  : 'bg-rose-500/15 text-rose-400'
              }`}>
                {currentForecast.expected_change_pct >= 0 ? '+' : ''}{currentForecast.expected_change_pct}%
              </span>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800/50">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Banda Inferior (P10)</p>
            <p className="text-base font-bold text-slate-300 mt-0.5">
              ${currentForecast.range_p10_p90[0]?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800/50">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Banda Superior (P90)</p>
            <p className="text-base font-bold text-slate-300 mt-0.5">
              ${currentForecast.range_p10_p90[1]?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      )}

      {/* Container do Gráfico TradingView */}
      <div className="relative mt-4">
        <div ref={chartContainerRef} className="w-full h-[480px] rounded-xl overflow-hidden" />
        
        {/* Legenda Flutuante */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-2 rounded-lg text-xs flex items-center gap-4 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-sky-400"></span>
            <span className="text-slate-300 font-medium">Histórico</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-purple-400"></span>
            <span className="text-purple-300 font-medium">TimesFM P50 (Mediana)</span>
          </div>
          {showP10P90 && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-purple-500/20 border border-purple-500/40 rounded-xs"></span>
              <span className="text-slate-400 font-medium">Faixa P10–P90 (80% Incerteza)</span>
            </div>
          )}
        </div>
      </div>

      {/* Explicação Qualitativa do Horizonte Gerada pelo Modelo */}
      {currentForecast && currentForecast.explanation && (
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-purple-950/30 via-slate-900/50 to-indigo-950/20 border border-purple-500/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 mt-0.5 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-white text-sm">
                  {currentForecast.explanation.title}
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 uppercase">
                  {currentForecast.explanation.direction}
                </span>
              </div>
              <p className="text-slate-300 font-medium">
                {currentForecast.explanation.summary}
              </p>
              <p className="text-slate-400 leading-relaxed">
                <strong className="text-slate-200">Impacto Fundamental:</strong> {currentForecast.explanation.fundamentals_impact}
              </p>
              <p className="text-[11px] text-slate-500 italic">
                {currentForecast.explanation.probability_band}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
