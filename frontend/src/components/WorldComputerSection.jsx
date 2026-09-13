import React from 'react';
import { Cpu, Server, Network, Layers, ShieldCheck, Zap } from 'lucide-react';

export default function WorldComputerSection({ worldComputerMetrics }) {
  if (!worldComputerMetrics) return null;

  const { l2_ecosystem, total_l2_tps, l1_settlement_volume_daily_usd, uptime, active_developers } = worldComputerMetrics;

  return (
    <section className="mt-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Arquitetura de Rede</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Global State Machine</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
            Ethereum: O Computador Mundial Descentralizado
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-xl">
          Uma máquina de estados global, imutável e descentralizada, garantindo que contratos e aplicações financeiras operem ininterruptamente sem dependência de corporações ou governos.
        </p>
      </div>

      {/* Grid com Destaques e Tabela de L2s */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Coluna 1: Pilares da Computação Mundial */}
        <div className="space-y-4">
          
          <div className="bg-[#0f1422] border border-slate-800/90 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Disponibilidade Contínua</h4>
              <p className="text-xs text-emerald-400 font-semibold mt-0.5">{uptime}</p>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Nenhum ponto único de falha. A rede processa blocos ininterruptamente há quase uma década, validada por centenas de milhares de nós independentes.
              </p>
            </div>
          </div>

          <div className="bg-[#0f1422] border border-slate-800/90 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shrink-0 mt-0.5">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Settlement Layer Suprema</h4>
              <p className="text-xs text-cyan-400 font-semibold mt-0.5">{l1_settlement_volume_daily_usd} / dia</p>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                A camada 1 do Ethereum é a câmara de compensação definitiva para valor global, liquidando volumes comparáveis às maiores redes de pagamentos institucionais.
              </p>
            </div>
          </div>

          <div className="bg-[#0f1422] border border-slate-800/90 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 shrink-0 mt-0.5">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Efeito de Rede de Desenvolvedores</h4>
              <p className="text-xs text-purple-300 font-semibold mt-0.5">EVM como Padrão Global</p>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {active_developers}. Todas as principais inovações financeiras, DeFi, stablecoins e tokens nascem sob a EVM (Ethereum Virtual Machine).
              </p>
            </div>
          </div>

        </div>

        {/* Colunas 2 e 3: O Ecossistema Modular de Layer 2s */}
        <div className="lg:col-span-2 bg-[#0f1422] border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div>
                <h3 className="font-bold text-white text-sm">Escala Modular via Layer 2s (Rollups)</h3>
                <p className="text-[11px] text-slate-400">
                  Execução paralela de alta velocidade com liquidação segura e barata na Camada 1
                </p>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 self-start">
                <span className="text-[10px] uppercase text-slate-400 font-medium">TPS Agregado L2:</span>
                <span className="text-xs font-bold text-cyan-400">{total_l2_tps} tx/s</span>
              </div>
            </div>

            {/* Tabela de L2s */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                    <th className="pb-2.5 font-semibold">Rede L2</th>
                    <th className="pb-2.5 font-semibold">Tipo</th>
                    <th className="pb-2.5 font-semibold text-right">Velocidade (TPS)</th>
                    <th className="pb-2.5 font-semibold text-right">TVL em Custódia</th>
                    <th className="pb-2.5 font-semibold text-right">Liquidação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {l2_ecosystem && l2_ecosystem.map((l2, i) => (
                    <tr key={i} className="hover:bg-slate-900/40 transition">
                      <td className="py-2.5 font-semibold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        {l2.name}
                      </td>
                      <td className="py-2.5 text-slate-400 font-mono text-[11px]">{l2.type}</td>
                      <td className="py-2.5 text-right font-bold text-emerald-400">{l2.tps} tx/s</td>
                      <td className="py-2.5 text-right font-bold text-purple-300">{l2.tvl_usd}</td>
                      <td className="py-2.5 text-right text-[11px] text-slate-400 font-medium">Ethereum L1 (Blobs)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 bg-slate-900/40 -mx-5 -mb-5 p-4 rounded-b-2xl flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              Upgrade Dencun (EIP-4844) reduziu as taxas de dados de rollup em até 95%.
            </span>
            <span className="font-semibold text-slate-300">Ethereum L1 = Âncora de Segurança</span>
          </div>
        </div>

      </div>
    </section>
  );
}
