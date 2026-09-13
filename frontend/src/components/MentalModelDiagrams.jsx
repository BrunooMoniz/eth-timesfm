import React, { useState } from 'react';
import { GitCompare, RefreshCw, Cpu, Database, Flame, ShieldCheck, ArrowRight, TrendingUp } from 'lucide-react';

export default function MentalModelDiagrams({ t, lang = 'pt' }) {
  const [activeTab, setActiveTab] = useState('flywheel');
  const tt = t?.thesis || t || {};

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 tracking-tight">
              {tt.diagramsTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {tt.diagramsSubtitle}
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
            {tt.flywheelTab}
          </button>
          <button
            onClick={() => setActiveTab('timesfm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              activeTab === 'timesfm'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tt.timesfmTab}
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
                <h4 className="font-bold text-sm text-slate-900 mb-1">{tt.step1Title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {tt.step1Desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-medium text-blue-700">
                {tt.step1Tag}
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
                <h4 className="font-bold text-sm text-slate-900 mb-1">{tt.step2Title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {tt.step2Desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-medium text-amber-700">
                {tt.step2Tag}
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
                <h4 className="font-bold text-sm text-slate-900 mb-1">{tt.step3Title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {tt.step3Desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-medium text-emerald-700">
                {tt.step3Tag}
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
                <h4 className="font-bold text-sm text-slate-900 mb-1">{tt.step4Title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {tt.step4Desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-medium text-purple-700">
                {tt.step4Tag}
              </div>
            </div>
          </div>

          <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-3 text-center text-xs text-blue-900 font-medium flex items-center justify-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '8s' }} />
            <span>{tt.flywheelCycleText}</span>
          </div>
        </div>
      ) : (
        /* Diagrama 2: Pipeline de Previsão TimesFM 3.0 */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Camada Micro */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">{tt.layerMicroTitle}</span>
                <span className="text-xs font-semibold text-slate-500">{tt.layerMicroFreq}</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">{tt.layerMicroHeader}</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {tt.layerMicroDesc}
              </p>
              <div className="bg-white p-2 rounded border border-slate-200 text-[11px] text-slate-600 font-mono">
                {tt.layerMicroContext}
              </div>
            </div>

            {/* Camada Meso */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">{tt.layerMesoTitle}</span>
                <span className="text-xs font-semibold text-slate-500">{tt.layerMesoFreq}</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">{tt.layerMesoHeader}</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {tt.layerMesoDesc}
              </p>
              <div className="bg-white p-2 rounded border border-slate-200 text-[11px] text-slate-600 font-mono">
                {tt.layerMesoContext}
              </div>
            </div>

            {/* Camada Macro */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">{tt.layerMacroTitle}</span>
                <span className="text-xs font-semibold text-slate-500">{tt.layerMacroFreq}</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">{tt.layerMacroHeader}</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {tt.layerMacroDesc}
              </p>
              <div className="bg-white p-2 rounded border border-slate-200 text-[11px] text-slate-600 font-mono">
                {tt.layerMacroContext}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-3 text-center text-xs text-slate-800 font-medium flex items-center justify-center gap-2">
            <GitCompare className="w-4 h-4 text-blue-600" />
            <span>{tt.mintReconciliationText}</span>
          </div>
        </div>
      )}
    </section>
  );
}
