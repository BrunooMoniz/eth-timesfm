import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

export default function KnowledgePills({ t, lang = 'pt' }) {
  const tt = t?.thesis || t || {};
  const pillsList = t?.pills || [];
  const [openPillId, setOpenPillId] = useState(pillsList[0]?.id || "triple-point");

  const togglePill = (id) => {
    setOpenPillId(prev => prev === id ? null : id);
  };

  const badgeText = lang === 'en' ? 'Signal Focus' : lang === 'zh' ? '纯干货' : 'Sem Slop';
  const countLabel = lang === 'en' ? 'core concepts' : lang === 'zh' ? '个底层核心概念' : 'conceitos fundamentais';

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 tracking-tight">
              {tt.pillsTitle || "Pílulas de Conhecimento • Conceitos Fundamentais"}
            </h3>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
              {badgeText}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {tt.pillsSubtitle || "Conceitos estruturais essenciais explicados de forma direta e sem jargões desnecessários"}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{pillsList.length} {countLabel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {pillsList.map((pill) => {
          const isOpen = openPillId === pill.id;
          return (
            <div 
              key={pill.id}
              onClick={() => togglePill(pill.id)}
              className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                isOpen 
                  ? 'bg-blue-50/50 border-blue-300 shadow-xs ring-1 ring-blue-400/20' 
                  : 'bg-slate-50/70 border-slate-200 hover:border-blue-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                    {pill.tag}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </div>

                <h4 className="font-bold text-sm text-slate-900 leading-snug mb-1.5">
                  {pill.title}
                </h4>
                
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pill.summary}
                </p>
              </div>

              {isOpen && (
                <div className="mt-3 pt-3 border-t border-blue-200/60 text-xs text-slate-700 whitespace-pre-line leading-relaxed font-normal bg-white p-3 rounded-lg border border-slate-200/80 animate-in fade-in duration-150">
                  {pill.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
