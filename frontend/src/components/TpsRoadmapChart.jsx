import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createChart, ColorType, LineSeries, AreaSeries } from 'lightweight-charts';
import { Cpu, Sparkles, Compass, Eye } from 'lucide-react';

export default function TpsRoadmapChart({ tpsRoadmapData, t, lang = 'pt' }) {
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);
  const tsc = t?.scaling || {};

  const [tpsHorizon, setTpsHorizon] = useState('365d'); // '30d' | '90d' | '180d' | '365d'
  const [showFanBands, setShowFanBands] = useState(true);
  const [showL1, setShowL1] = useState(true);
  const [showL2History, setShowL2History] = useState(true);
  const [showTotalHistory, setShowTotalHistory] = useState(true);

  const safeData = tpsRoadmapData || {};
  const {
    l1_current_tps = 12.6,
    l2_current_aggregated_tps = 114.9,
    total_current_tps = 127.5,
    l1_history = [],
    l2_history = [],
    total_history = [],
    l2_forecast_365d = {},
    roadmap_phases = []
  } = safeData;

  // Filtra os pontos de projeção pelo horizonte selecionado
  const projectedPoints = useMemo(() => {
    const allPoints = l2_forecast_365d.points || [];
    if (tpsHorizon === '30d') return allPoints.slice(0, 30);
    if (tpsHorizon === '90d') return allPoints.slice(0, 90);
    if (tpsHorizon === '180d') return allPoints.slice(0, 180);
    return allPoints; // 365d
  }, [l2_forecast_365d, tpsHorizon]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.remove();
      chartInstance.current = null;
    }

    const container = chartContainerRef.current;
    const chart = createChart(container, {
      width: container.clientWidth,
      height: 440,
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

    // 1. Plotar Histórico L1 (Slate)
    if (showL1 && l1_history.length > 0) {
      const l1Series = chart.addSeries(LineSeries, {
        color: '#64748b',
        lineWidth: 1.5,
        title: 'L1 Base TPS',
      });
      l1Series.setData(l1_history);
    }

    // 2. Plotar Histórico L2s Agregado (Sky)
    if (showL2History && l2_history.length > 0) {
      const l2Series = chart.addSeries(LineSeries, {
        color: '#0284c7',
        lineWidth: 2,
        title: 'L2s Agregado Real',
      });
      l2Series.setData(l2_history);
    }

    // 3. Plotar Histórico TPS Total (Marinho / Indigo)
    if (showTotalHistory && total_history.length > 0) {
      const totalSeries = chart.addSeries(LineSeries, {
        color: '#1e3a8a',
        lineWidth: 2,
        title: 'Total Throughput',
      });
      totalSeries.setData(total_history);
    }

    // 4. Plotar Projeção TimesFM 3.0 para L2s
    if (projectedPoints.length > 0 && l2_history.length > 0) {
      const lastL2Point = l2_history[l2_history.length - 1];

      // Bandas de Incerteza / Fan Chart em degradê azul
      if (showFanBands) {
        // Camada Externa P10-P90
        const areaP90 = chart.addSeries(AreaSeries, {
          topColor: 'rgba(37, 99, 235, 0.10)',
          bottomColor: 'rgba(37, 99, 235, 0.01)',
          lineColor: 'rgba(37, 99, 235, 0.25)',
          lineWidth: 1,
          lineStyle: 2,
        });
        areaP90.setData([
          { time: lastL2Point.time, value: lastL2Point.value },
          ...projectedPoints.map(p => ({ time: p.time, value: p.p90 }))
        ]);

        const areaP10 = chart.addSeries(AreaSeries, {
          topColor: 'rgba(37, 99, 235, 0.04)',
          bottomColor: 'rgba(37, 99, 235, 0.01)',
          lineColor: 'rgba(37, 99, 235, 0.25)',
          lineWidth: 1,
          lineStyle: 2,
        });
        areaP10.setData([
          { time: lastL2Point.time, value: lastL2Point.value },
          ...projectedPoints.map(p => ({ time: p.time, value: p.p10 }))
        ]);

        // Camada Interna P25-P75
        const areaP75 = chart.addSeries(AreaSeries, {
          topColor: 'rgba(37, 99, 235, 0.15)',
          bottomColor: 'rgba(37, 99, 235, 0.03)',
          lineColor: 'rgba(37, 99, 235, 0.40)',
          lineWidth: 1,
          lineStyle: 1,
        });
        areaP75.setData([
          { time: lastL2Point.time, value: lastL2Point.value },
          ...projectedPoints.map(p => ({ time: p.time, value: p.p70 ?? p.p80 ?? p.p90 }))
        ]);

        const areaP25 = chart.addSeries(AreaSeries, {
          topColor: 'rgba(37, 99, 235, 0.06)',
          bottomColor: 'rgba(37, 99, 235, 0.02)',
          lineColor: 'rgba(37, 99, 235, 0.40)',
          lineWidth: 1,
          lineStyle: 1,
        });
        areaP25.setData([
          { time: lastL2Point.time, value: lastL2Point.value },
          ...projectedPoints.map(p => ({ time: p.time, value: p.p30 ?? p.p20 ?? p.p10 }))
        ]);
      }

      // Linha Mediana P50 da Projeção de L2 TPS com Google TimesFM 3.0
      const medianSeries = chart.addSeries(LineSeries, {
        color: '#2563eb',
        lineWidth: 3,
        lineStyle: 0,
        title: 'TimesFM 3.0 Projeção L2',
      });
      medianSeries.setData([
        { time: lastL2Point.time, value: lastL2Point.value },
        ...projectedPoints.map(p => ({ time: p.time, value: p.median }))
      ]);
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
  }, [l1_history, l2_history, total_history, projectedPoints, showL1, showL2History, showTotalHistory, showFanBands]);

  return (
    <section className="mt-10">
      
      {/* Título & Descrição do Roadmap */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {tsc.badge || "Roadmap de Escalabilidade"}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-500">The Surge & PeerDAS</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {tsc.title || "Throughput de Rede (TPS) & Projeção TimesFM 3.0"}
          </h2>
        </div>
        <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
          {tsc.subtitle || "Monitoramento do throughput histórico entre a Camada 1 e o ecossistema de Rollups (L2s), com projeção estocástica do Google TimesFM 3.0 rumo aos 10.000+ TPS sob o avanço de PeerDAS."}
        </p>
      </div>

      {/* KPI Cards de Throughput */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
        
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">
              {tsc.currentL1 || "L1 Base TPS"}
            </span>
            <span className="p-1 rounded-md bg-slate-100 text-slate-600 font-mono text-[10px]">L1</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 font-mono mt-1">
            {l1_current_tps} <span className="text-xs font-normal text-slate-500">tx/s</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {tsc.currentL1Sub || "Câmara de compensação definitiva"}
          </p>
        </div>

        <div className="bg-white border border-sky-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-sky-700">
            <span className="font-semibold uppercase tracking-wider text-[10px]">
              {tsc.currentL2 || "L2s Agregado Atual"}
            </span>
            <span className="p-1 rounded-md bg-sky-50 text-sky-700 font-mono text-[10px]">Rollups</span>
          </div>
          <p className="text-2xl font-bold text-sky-700 font-mono mt-1">
            {l2_current_aggregated_tps} <span className="text-xs font-normal text-sky-600">tx/s</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {tsc.currentL2Sub || "Escala de execução paralela"}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">
              {tsc.totalTps || "Throughput Global"}
            </span>
            <span className="p-1 rounded-md bg-blue-50 text-blue-700 font-mono text-[10px]">L1 + L2s</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 font-mono mt-1">
            {total_current_tps} <span className="text-xs font-normal text-slate-500">tx/s</span>
          </p>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">
            {tsc.multiplierLabel || "+890% vs capacidade L1 pura"}
          </p>
        </div>

        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-blue-700">
            <span className="font-bold uppercase tracking-wider text-[10px]">
              {tsc.projection365d || "Projeção 365D (TimesFM)"}
            </span>
            <span className="p-1 rounded-md bg-blue-100 text-blue-800 font-mono text-[10px]">PeerDAS</span>
          </div>
          <p className="text-2xl font-bold text-blue-800 font-mono mt-1">
            ~{l2_forecast_365d.expected_365d_tps || 339.9} <span className="text-xs font-normal text-blue-600">tx/s</span>
          </p>
          <p className="text-[11px] text-blue-700 mt-1">
            {tsc.rangePrefix || "Faixa P10–P90:"} {l2_forecast_365d.range_p10_p90_365d?.[0] || 184.5} a {l2_forecast_365d.range_p10_p90_365d?.[1] || 415.2} tx/s
          </p>
        </div>

      </div>

      {/* Container do Gráfico Dedicado de TPS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        
        {/* Controles do Gráfico */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 text-xs">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-600" />
              {tsc.horizonSelector || "Projeção de Escalabilidade:"}
            </span>
            <div className="bg-slate-100 border border-slate-200 rounded-xl p-1 flex items-center gap-1">
              {[
                { id: '30d', label: tsc.horizon30 || '30 Dias' },
                { id: '90d', label: tsc.horizon90 || '90 Dias' },
                { id: '180d', label: tsc.horizon180 || '180 Dias' },
                { id: '365d', label: tsc.horizon365 || '365 Dias (1 Ano)' },
              ].map(h => (
                <button
                  key={h.id}
                  onClick={() => setTpsHorizon(h.id)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                    tpsHorizon === h.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles de Séries & Bandas */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowFanBands(!showFanBands)}
              className={`px-2.5 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition cursor-pointer text-xs ${
                showFanBands ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {tsc.fanBandsToggle || "Bandas Fan Chart"}
            </button>

            <button
              onClick={() => setShowL1(!showL1)}
              className={`px-2.5 py-1.5 rounded-lg border font-medium transition cursor-pointer text-xs ${
                showL1 ? 'bg-slate-100 text-slate-800 border-slate-300' : 'text-slate-400 border-slate-200'
              }`}
            >
              {tsc.showL1Toggle || "L1 Base"}
            </button>
            <button
              onClick={() => setShowL2History(!showL2History)}
              className={`px-2.5 py-1.5 rounded-lg border font-medium transition cursor-pointer text-xs ${
                showL2History ? 'bg-sky-50 text-sky-700 border-sky-300 font-semibold' : 'text-slate-400 border-slate-200'
              }`}
            >
              {tsc.showL2Toggle || "L2 Real"}
            </button>
            <button
              onClick={() => setShowTotalHistory(!showTotalHistory)}
              className={`px-2.5 py-1.5 rounded-lg border font-medium transition cursor-pointer text-xs ${
                showTotalHistory ? 'bg-indigo-50 text-indigo-800 border-indigo-300 font-semibold' : 'text-slate-400 border-slate-200'
              }`}
            >
              {tsc.showTotalToggle || "Total"}
            </button>
          </div>

        </div>

        {/* Canvas do Gráfico TradingView Light */}
        <div className="relative mt-4">
          <div ref={chartContainerRef} className="w-full h-[440px] rounded-xl overflow-hidden border border-slate-200/60" />
          
          {/* Legenda Flutuante */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-2 rounded-lg text-xs flex flex-wrap items-center gap-3.5 pointer-events-none shadow-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-slate-500"></span>
              <span className="text-slate-600 font-medium">{tsc.legendL1 || "L1 TPS (12.6 tx/s)"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-sky-600"></span>
              <span className="text-slate-700 font-medium">{tsc.legendL2 || "L2s Agregado (114.9 tx/s)"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-indigo-900"></span>
              <span className="text-slate-800 font-medium">{tsc.legendTotal || "Total (127.5 tx/s)"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-blue-600 rounded-xs"></span>
              <span className="text-blue-700 font-bold">TimesFM 3.0 L2 ({tpsHorizon.toUpperCase()})</span>
            </div>
          </div>
        </div>

        {/* Milestones de Escalabilidade do TimesFM */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-200 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
            <p className="text-[10px] uppercase font-bold text-slate-500">{tsc.target30 || "Alvo 30 Dias (Tático)"}</p>
            <p className="text-base font-bold text-slate-900 font-mono mt-0.5">
              {l2_forecast_365d.expected_30d_tps || 131.9} tx/s
            </p>
            <span className="text-[11px] text-emerald-700 font-semibold">+14.8%</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
            <p className="text-[10px] uppercase font-bold text-slate-500">{tsc.target90 || "Alvo 90 Dias (Médio)"}</p>
            <p className="text-base font-bold text-slate-900 font-mono mt-0.5">
              {l2_forecast_365d.expected_90d_tps || 151.0} tx/s
            </p>
            <span className="text-[11px] text-emerald-700 font-semibold">+31.4%</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
            <p className="text-[10px] uppercase font-bold text-slate-500">{tsc.target180 || "Alvo 180 Dias (Semestral)"}</p>
            <p className="text-base font-bold text-blue-700 font-mono mt-0.5">
              {l2_forecast_365d.expected_180d_tps || 208.3} tx/s
            </p>
            <span className="text-[11px] text-blue-700 font-semibold">+81.2%</span>
          </div>

          <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200">
            <p className="text-[10px] uppercase font-bold text-blue-800">{tsc.target365 || "Alvo 365 Dias (1 Ano)"}</p>
            <p className="text-base font-bold text-blue-800 font-mono mt-0.5">
              {l2_forecast_365d.expected_365d_tps || 339.9} tx/s
            </p>
            <span className="text-[11px] text-blue-700 font-semibold">+195.8%</span>
          </div>
        </div>

      </div>

      {/* Painel das Fases do Roadmap Atualizado da Ethereum */}
      <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                {tsc.roadmapTitle || "Fases do Roadmap Oficial do Ethereum"}
              </h3>
              <p className="text-xs text-slate-500">
                {tsc.roadmapSub || "Evolução contínua da arquitetura modular delineada pelos pesquisadores da Ethereum Foundation"}
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
            <Sparkles className="w-3.5 h-3.5" />
            {tsc.currentFocusBadge || "The Surge em Execução"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {roadmap_phases.map((phase, idx) => {
            const isSurge = phase.phase.includes('The Surge');
            const isMerge = phase.phase.includes('The Merge');
            
            return (
              <div
                key={idx}
                className={`rounded-xl p-4 flex flex-col justify-between transition duration-300 ${
                  isSurge
                    ? 'bg-gradient-to-b from-blue-50/90 to-sky-50/40 border-2 border-blue-500 shadow-sm relative'
                    : isMerge
                    ? 'bg-emerald-50/50 border border-emerald-200'
                    : 'bg-slate-50 border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {isSurge && (
                  <div className="absolute -top-2.5 right-3 bg-blue-600 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                    {tsc.currentFocus || "Foco Atual"}
                  </div>
                )}
                
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {tsc.phasePrefix || "Fase"} {idx + 1}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isSurge
                        ? 'bg-blue-600 text-white'
                        : isMerge
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {phase.status}
                    </span>
                  </div>

                  <h4 className={`text-sm font-bold mb-1.5 ${isSurge ? 'text-blue-900' : 'text-slate-900'}`}>
                    {phase.phase}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {phase.impact || phase.target}
                  </p>

                  {phase.milestones && (
                    <div className="mt-2.5 pt-2 border-t border-blue-200 text-[11px] text-blue-800 font-medium">
                      <strong>{tsc.milestonesLabel || "Marcos:"}</strong> {phase.milestones}
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-2 text-[11px] font-semibold flex items-center gap-1">
                  {isMerge && <span className="text-emerald-700">{tsc.deliveredSuccess || "✓ Entregue com Sucesso"}</span>}
                  {isSurge && <span className="text-blue-700 font-bold">{tsc.acceleratingAdoption || "⚡ Acelerando Adoção"}</span>}
                  {!isMerge && !isSurge && <span className="text-slate-500">{tsc.futureRoadmap || "Futuro Roadmap"}</span>}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
