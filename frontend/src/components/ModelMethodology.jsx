import React from 'react';
import { Brain, Sliders, Database, AlertCircle } from 'lucide-react';

export default function ModelMethodology() {
  return (
    <section className="mt-10 mb-12">
      <div className="bg-[#0f1422] border border-slate-800/90 rounded-2xl p-6">
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Inteligência Artificial Fundacional</span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-400">Google Research</span>
        </div>
        
        <h2 className="text-xl font-bold text-white tracking-tight mb-2">
          Como o Google TimesFM Modela a Trajetória do Ethereum
        </h2>

        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl mb-6">
          O TimesFM (Time Series Foundation Model) é um modelo de aprendizado profundo de grande escala
          desenvolvido pelo time do Google Research. Em vez de estimar apenas uma média linear, ele modela a distribuição 
          probabilística completa de séries temporais não-estacionárias.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4">
            <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm mb-2">
              <Brain className="w-4 h-4 text-purple-400" />
              Arquitetura Transformer Decoder
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Diferente de redes recorrentes ou modelos clássicos (como ARIMA), o TimesFM utiliza blocos de autoatenção temporal 
              com patching de sequência para capturar dependências de longo prazo, ciclos sazonais e regimes de volatilidade.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm mb-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Previsão com Intervalos de Quantil
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              O modelo prevê múltiplos quantis simultâneos (de P10 a P90). A linha central (P50) representa o valor mais provável,
              enquanto as margens P10 e P90 formam uma faixa de 80% de densidade de probabilidade para calibrar o risco.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm mb-2">
              <Database className="w-4 h-4 text-emerald-400" />
              Pipeline de Inferência Pré-Calculada
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Para máxima agilidade e sem custos excessivos de servidores de GPU, a inferência profunda é executada em lotes
              consolidados. O site consome os datasets estáticos com renderização instantânea no navegador.
            </p>
          </div>

        </div>

        {/* Disclaimer Educacional / Risco */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-500">
          <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Aviso de Risco & Metodologia:</strong> As projeções apresentadas são geradas por modelos estatísticos fundacionais de séries temporais com finalidade analítica e educacional. Criptoativos possuem volatilidade inerente e choques exógenos imprevisíveis. Não constituem recomendação de investimento.
          </p>
        </div>

      </div>
    </section>
  );
}
