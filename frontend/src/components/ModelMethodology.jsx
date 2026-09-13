import React from 'react';
import { Brain, Sliders, Database, AlertCircle, GitMerge } from 'lucide-react';

export default function ModelMethodology({ t, lang = 'pt' }) {
  const tm = t?.methodology || {};

  return (
    <section className="mt-10 mb-12">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {tm.aiBadge || "Inteligência Artificial Fundacional"}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-medium text-slate-500">
            {tm.googleResearchSub || "Google Research & Temporal Hierarchical Ensemble"}
          </span>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          {tm.title || "Como o Google TimesFM 3.0 Modela a Trajetória do Ethereum"}
        </h2>

        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl mb-6">
          {tm.methodologyDesc || "O TimesFM (Time Series Foundation Model) é o modelo fundacional de séries temporais de grande escala desenvolvido pelo Google Research."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-2.5">
                <Brain className="w-4 h-4 text-blue-600" />
                {tm.transformerDecoder || "Transformer Decoder"}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tm.transformerDecoderDesc || "Utiliza blocos de autoatenção causal com patching temporal para codificar milhares de pontos históricos e aprender dependências de longo prazo sem saturação de gradiente."}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200 text-[11px] text-blue-700 font-medium">
              {tm.transformerTag || "Atenção Temporal Profunda"}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-2.5">
                <GitMerge className="w-4 h-4 text-indigo-600" />
                {tm.hierarchicalReconciliation || "Reconciliação Hierárquica"}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tm.hierarchicalReconciliationDesc || "Combina frequências cruzadas (1D diário e 1W semanal). O sinal micro diário é calibrado pela âncora secular de 2015-2026, mitigando ruídos passageiros de cauda e aumentando a assertividade."}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200 text-[11px] text-indigo-700 font-medium">
              {tm.hierarchicalTag || "Consistência Multi-Escala"}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-sky-700 font-bold text-sm mb-2.5">
                <Sliders className="w-4 h-4 text-sky-600" />
                {tm.quantilesP10P90 || "Faixas de Quantil P10–P90"}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tm.quantilesP10P90Desc || "Emite previsões quantílicas contínuas. A mediana P50 representa o cenário de maior probabilidade, enquanto a banda P10-P90 cobre 80% do espaço amostral para mensuração estrita de risco."}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200 text-[11px] text-sky-700 font-medium">
              {tm.quantilesTag || "Calibração Estocástica"}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2.5">
                <Database className="w-4 h-4 text-emerald-600" />
                {tm.zeroShotInference || "Inferência Zero-Shot SOTA"}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tm.zeroShotInferenceDesc || "Pré-treinado em mais de 100 bilhões de pontos temporais sintéticos e reais, o modelo oferece capacidade de generalização imediata com suporte nativo a covariáveis de volume e volatilidade."}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200 text-[11px] text-emerald-700 font-medium">
              {tm.zeroShotTag || "Top-1 em GIFT-Eval e TIME"}
            </div>
          </div>

        </div>

        {/* Disclaimer Educacional / Risco */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-500">
          <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-700">{tm.riskDisclaimerTitle || "Aviso de Risco & Metodologia:"}</strong> {tm.riskDisclaimerDesc || "As projeções apresentadas são geradas por modelos estatísticos fundacionais de séries temporais com finalidade analítica, de pesquisa e educacional. Criptoativos possuem volatilidade inerente e choques macroeconômicos imprevisíveis. Não constituem recomendação de investimento nem garantia de retorno."}
          </p>
        </div>

      </div>
    </section>
  );
}
