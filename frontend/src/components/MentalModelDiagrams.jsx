import React, { useState } from 'react';
import { GitCompare, RefreshCw, Cpu, Database, Flame, ShieldCheck, ArrowRight, TrendingUp } from 'lucide-react';

export default function MentalModelDiagrams({ t }) {
  const [activeTab, setActiveTab] = useState('flywheel');

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 tracking-tight">
              {t.diagramsTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.diagramsSubtitle}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('flywheel')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              activeTab === 'flywheel'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.flywheelTab}
          </button>
          <button
            onClick={() => setActiveTab('timesfm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              activeTab === 'timesfm'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.timesfmTab}
          </button>
        </div>
      </div>

      {activeTab === 'flywheel' ? (
        /* Diagrama 1: Flywheel de Valor do Ethereum */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Passo 1 */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Passo 1</span>
                  <Database className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Adoção em L2s</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Milhões de usuários transacionam em Arbitrum, Base e Optimism a custo sub-centavo.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-medium text-blue-700">
                &gt; 120 tx/s agregados
              </div>
            </div>

            {/* Passo 2 */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Passo 2</span>
                  <Flame className="w-4 h-4 text-amber-600" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Queima de Blobs (L1)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  L2s publicam provas de estado e dados pagando gas na L1, ativando a queima EIP-1559.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-medium text-amber-700">
                Combustão permanente
              </div>
            </div>

            {/* Passo 3 */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Passo 3</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Choque de Oferta</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A queima supera ou neutraliza a emissão PoS, tornando o ativo deflacionário ou ultra-escasso.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-medium text-emerald-700">
                120.4M ETH supply fixo
              </div>
            </div>

            {/* Passo 4 */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">Passo 4</span>
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Segurança Econômica</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ETH mais valorizado aumenta o custo de ataque (PoS), atraindo mais liquidez institucional e DeFi.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-medium text-purple-700">
                $109B TVL protegido
              </div>
            </div>
          </div>

          <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-3 text-center text-xs text-blue-900 font-medium flex items-center justify-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Ciclo Autossustentável: Maior segurança atrai novas L2s e aplicações financeiras, reiniciando o ciclo com maior volume.</span>
          </div>
        </div>
      ) : (
        /* Diagrama 2: Pipeline de Previsão TimesFM 3.0 */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Camada Micro */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Camada Micro (1D)</span>
                <span className="text-xs font-semibold text-slate-500">Alta Frequência</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">Volatilidade & Candles</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Captura dinâmicas de liquidez spot diárias, desvios padrão e reversão à média estatística.
              </p>
              <div className="bg-white p-2 rounded border border-slate-200 text-[11px] text-slate-600 font-mono">
                Contexto: 4.064 dias (2015–2026)
              </div>
            </div>

            {/* Camada Meso */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">Camada Meso (1W)</span>
                <span className="text-xs font-semibold text-slate-500">Média Frequência</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">Ciclos de Liquidez</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Isola ruído intra-semana e estabelece canais de tendência intermediária e suporte on-chain.
              </p>
              <div className="bg-white p-2 rounded border border-slate-200 text-[11px] text-slate-600 font-mono">
                581 semanas agregadas
              </div>
            </div>

            {/* Camada Macro */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">Camada Macro (1M)</span>
                <span className="text-xs font-semibold text-slate-500">Âncora Secular</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">Lei de Metcalfe & Fundamentos</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Projeção do canal logarítmico secular, taxas de crescimento de TVL e queima acumulada.
              </p>
              <div className="bg-white p-2 rounded border border-slate-200 text-[11px] text-slate-600 font-mono">
                134 meses históricos
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-3 text-center text-xs text-slate-800 font-medium flex items-center justify-center gap-2">
            <GitCompare className="w-4 h-4 text-blue-600" />
            <span><strong>Reconciliação Hierárquica MinT:</strong> As 3 projeções são ajustadas linearmente para garantir consistência aditiva perfeita e eliminar alucinações de IA.</span>
          </div>
        </div>
      )}
    </section>
  );
}
