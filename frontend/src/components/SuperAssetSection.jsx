import React from 'react';
import { Flame, Coins, Vault, ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function SuperAssetSection({ triplePointMetrics }) {
  if (!triplePointMetrics) return null;

  const { capital_asset, consumable_asset, store_of_value } = triplePointMetrics;

  return (
    <section className="mt-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Tese Econômica</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Triple Point Asset</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
            Ethereum: A Estrutura de um Super Ativo
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-xl">
          Ao contrário de qualquer ativo financeiro tradicional, o ETH reúne três características simultâneas:
          gera rendimento de fluxo de caixa, é consumido para executar computação e serve como reserva de valor escassa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* 1. Capital Asset */}
        <div className="bg-[#0f1422] border border-slate-800/90 rounded-2xl p-5 hover:border-purple-500/40 transition duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Capital Asset</h3>
                  <span className="text-[11px] text-purple-300 font-medium">Rendimento Real (Cash Flow)</span>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300">
                {capital_asset.staking_apr}% APR
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800/60">
                <p className="text-[10px] uppercase text-slate-400 font-semibold">Total Staked</p>
                <p className="text-sm font-bold text-white mt-0.5">
                  {(capital_asset.staked_eth_total / 1e6).toFixed(1)}M ETH
                </p>
                <span className="text-[10px] text-slate-400">{capital_asset.staked_pct_supply}% da oferta</span>
              </div>
              <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800/60">
                <p className="text-[10px] uppercase text-slate-400 font-semibold">Validadores</p>
                <p className="text-sm font-bold text-white mt-0.5">
                  {(capital_asset.active_validators / 1e6).toFixed(2)}M
                </p>
                <span className="text-[10px] text-emerald-400">Consenso descentralizado</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {capital_asset.insight}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Rendimento anual gerado</span>
            <span className="font-semibold text-white">{capital_asset.annual_issuance_reward_usd}</span>
          </div>
        </div>

        {/* 2. Consumable Asset */}
        <div className="bg-[#0f1422] border border-slate-800/90 rounded-2xl p-5 hover:border-amber-500/40 transition duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Consumable Asset</h3>
                  <span className="text-[11px] text-amber-300 font-medium">Petróleo da Computação</span>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300">
                EIP-1559
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800/60">
                <p className="text-[10px] uppercase text-slate-400 font-semibold">ETH Queimado</p>
                <p className="text-sm font-bold text-amber-300 mt-0.5">
                  {(consumable_asset.burned_eth_total / 1e6).toFixed(2)}M ETH
                </p>
                <span className="text-[10px] text-slate-400">Destruído para sempre</span>
              </div>
              <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800/60">
                <p className="text-[10px] uppercase text-slate-400 font-semibold">Transações L2 / Dia</p>
                <p className="text-sm font-bold text-white mt-0.5">
                  {(consumable_asset.l2_daily_txs / 1e6).toFixed(2)}M
                </p>
                <span className="text-[10px] text-cyan-400">Escala de Rollups</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {consumable_asset.insight}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Custo de Blob (EIP-4844)</span>
            <span className="font-semibold text-emerald-400">Redução de {consumable_asset.blob_fees_reduction}</span>
          </div>
        </div>

        {/* 3. Store of Value */}
        <div className="bg-[#0f1422] border border-slate-800/90 rounded-2xl p-5 hover:border-cyan-500/40 transition duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  <Vault className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Store of Value</h3>
                  <span className="text-[11px] text-cyan-300 font-medium">Ultra Sound Money</span>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300">
                {store_of_value.net_annual_inflation <= 0 ? 'Deflacionário' : 'Equilíbrio'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800/60">
                <p className="text-[10px] uppercase text-slate-400 font-semibold">Oferta Total</p>
                <p className="text-sm font-bold text-white mt-0.5">
                  {(store_of_value.total_supply / 1e6).toFixed(1)}M ETH
                </p>
                <span className="text-[10px] text-emerald-400">Crescimento ~0% a.a.</span>
              </div>
              <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800/60">
                <p className="text-[10px] uppercase text-slate-400 font-semibold">Colateral em DeFi</p>
                <p className="text-sm font-bold text-cyan-300 mt-0.5">
                  {store_of_value.defi_collateral_usd}
                </p>
                <span className="text-[10px] text-slate-400">Garantia líquida global</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {store_of_value.insight}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Holdings Institucionais em ETFs</span>
            <span className="font-semibold text-white">{(store_of_value.etf_institutional_holdings_eth / 1e6).toFixed(2)}M ETH</span>
          </div>
        </div>

      </div>
    </section>
  );
}
