import React from 'react';
import { Layers, ShieldCheck, Zap, Network } from 'lucide-react';

export default function WorldComputerSection({ worldComputerMetrics }) {
  if (!worldComputerMetrics) return null;

  const { l2_ecosystem, total_l2_tps, l1_settlement_volume_daily_usd, uptime, active_developers } = worldComputerMetrics;

  return (
    <section className="mt-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Arquitetura de Rede</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-500">Global State Machine</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Ethereum: O Computador Mundial Descentralizado
          </h2>
        </div>
        <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
          Uma máquina de estados global, imutável e descentralizada, garantindo que contratos e aplicações financeiras operem ininterruptamente sem dependência de servidores centralizados ou governos.
        </p>
      </div>

      {/* Grid com Destaques e Tabela de L2s */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Coluna 1: Pilares da Computação Mundial */}
        <div className="space-y-4">
          
          <div className="bg-white border border-slate-200 hover:border-emerald-300 transition duration-300 rounded-2xl p-4.5 shadow-xs flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 shrink-0 mt-0.5 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Disponibilidade Contínua</h4>
              <p className="text-xs text-emerald-700 font-bold mt-0.5">{uptime}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Sem pontos únicos de falha. A rede processa blocos ininterruptamente há quase uma década, validada por centenas de milhares de nós independentes.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 hover:border-blue-300 transition duration-300 rounded-2xl p-4.5 shadow-xs flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 shrink-0 mt-0.5 shadow-2xs">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Settlement Layer Suprema</h4>
              <p className="text-xs text-blue-700 font-bold mt-0.5">{l1_settlement_volume_daily_usd} / dia</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                A camada 1 do Ethereum é a câmara de compensação definitiva para valor global, liquidando volumes superiores a redes financeiras tradicionais.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 hover:border-indigo-300 transition duration-300 rounded-2xl p-4.5 shadow-xs flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/80 shrink-0 mt-0.5 shadow-2xs">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Efeito de Rede de Desenvolvedores</h4>
              <p className="text-xs text-indigo-700 font-bold mt-0.5">EVM como Padrão Global</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {active_developers}. Todas as principais inovações financeiras, DeFi, stablecoins e tokens nascem sob a arquitetura EVM.
              </p>
            </div>
          </div>

        </div>

        {/* Colunas 2 e 3: O Ecossistema Modular de Layer 2s */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-200 gap-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Escala Modular via Layer 2s (Rollups)</h3>
                <p className="text-xs text-slate-500">
                  Execução paralela de alta velocidade com liquidação segura e barata ancorada na Camada 1
                </p>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200/80 self-start shadow-2xs">
                <span className="text-[11px] uppercase text-slate-500 font-semibold">TPS Agregado L2:</span>
                <span className="text-xs font-bold text-blue-700 font-mono">{total_l2_tps} tx/s</span>
              </div>
            </div>

            {/* Tabela de L2s */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-200 text-[11px] uppercase tracking-wider bg-slate-50/60">
                    <th className="py-2.5 px-3 font-semibold text-slate-600 rounded-l-lg">Rede L2</th>
                    <th className="py-2.5 px-2 font-semibold text-slate-600">Tipo</th>
                    <th className="py-2.5 px-2 font-semibold text-slate-600 text-right">Velocidade (TPS)</th>
                    <th className="py-2.5 px-2 font-semibold text-slate-600 text-right">TVL em Custódia</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600 text-right rounded-r-lg">Liquidação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {l2_ecosystem && l2_ecosystem.map((l2, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition">
                      <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        {l2.name}
                      </td>
                      <td className="py-3 px-2 text-slate-500 font-mono text-[11px]">{l2.type}</td>
                      <td className="py-3 px-2 text-right font-bold text-emerald-700 font-mono">{l2.tps} tx/s</td>
                      <td className="py-3 px-2 text-right font-bold text-blue-700 font-mono">{l2.tvl_usd}</td>
                      <td className="py-3 px-3 text-right text-[11px] text-slate-500 font-medium">Ethereum L1 (Blobs)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 bg-slate-50 -mx-5 -mb-5 p-4 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600 shrink-0" />
              Upgrade Dencun (EIP-4844) reduziu as taxas de dados de rollup em até 95%.
            </span>
            <span className="font-bold text-blue-800 bg-blue-100/70 border border-blue-200 px-2 py-0.5 rounded-md text-[11px]">
              Ethereum L1 = Âncora de Segurança
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
