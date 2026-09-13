import React from 'react';
import { Flame, Coins, Vault } from 'lucide-react';

export default function SuperAssetSection({ triplePointMetrics, t, lang = 'pt' }) {
  if (!triplePointMetrics) return null;

  const tt = t?.thesis || t || {};
  const { capital_asset, consumable_asset, store_of_value } = triplePointMetrics;

  return (
    <section className="mt-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {tt.thesisBadge || "Tese Econômica"}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-500">
              {tt.triplePointBadge || "Triple Point Asset"}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {tt.superAssetTitle || "Ethereum: A Estrutura de um Super Ativo"}
          </h2>
        </div>
        <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
          {tt.superAssetSubtitle || "Ao contrário de qualquer ativo financeiro tradicional, o ETH reúne três características simultâneas: gera rendimento de fluxo de caixa, é consumido para executar computação e atua como reserva de valor escassa e colateralizada."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* 1. Capital Asset */}
        <div className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition duration-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 shadow-2xs">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {tt.capitalTitle || "Capital Asset"}
                  </h3>
                  <span className="text-[11px] text-blue-700 font-semibold">
                    {tt.capitalSub || "Rendimento Real (Cash Flow)"}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 font-mono">
                {capital_asset.staking_apr}% APR
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 my-4">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
                <p className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">
                  {tt.totalStaked || "Total Staked"}
                </p>
                <p className="text-base font-bold text-slate-900 mt-0.5 font-mono">
                  {(capital_asset.staked_eth_total / 1e6).toFixed(1)}M ETH
                </p>
                <span className="text-[11px] text-blue-700 font-medium">{capital_asset.staked_pct_supply}%</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
                <p className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">
                  {tt.validators || "Validadores"}
                </p>
                <p className="text-base font-bold text-slate-900 mt-0.5 font-mono">
                  {(capital_asset.active_validators / 1e6).toFixed(2)}M
                </p>
                <span className="text-[11px] text-emerald-700 font-medium">
                  {tt.posConsensus || "Consenso global PoS"}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {capital_asset.insight}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{tt.annualYield || "Rendimento anual gerado"}</span>
            <span className="font-bold text-slate-900 font-mono">{capital_asset.annual_issuance_reward_usd}</span>
          </div>
        </div>

        {/* 2. Consumable Asset */}
        <div className="bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md transition duration-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/80 shadow-2xs">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {tt.consumableTitle || "Consumable Asset"}
                  </h3>
                  <span className="text-[11px] text-amber-700 font-semibold">
                    {tt.consumableSub || "Petróleo da Computação"}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 font-mono">
                EIP-1559
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 my-4">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
                <p className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">
                  {tt.burnedEth || "ETH Queimado"}
                </p>
                <p className="text-base font-bold text-amber-700 mt-0.5 font-mono">
                  {(consumable_asset.burned_eth_total / 1e6).toFixed(2)}M ETH
                </p>
                <span className="text-[11px] text-slate-500 font-medium">
                  {tt.burnedForever || "Destruído perpetuamente"}
                </span>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
                <p className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">
                  {tt.l2TxsDaily || "Transações L2 / Dia"}
                </p>
                <p className="text-base font-bold text-slate-900 mt-0.5 font-mono">
                  {(consumable_asset.l2_daily_txs / 1e6).toFixed(2)}M
                </p>
                <span className="text-[11px] text-blue-700 font-medium">
                  {tt.rollupScale || "Escala de Rollups"}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {consumable_asset.insight}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{tt.blobCost || "Custo de Blob (EIP-4844)"}</span>
            <span className="font-bold text-emerald-700">
              {tt.blobReduction || "Redução de"} {consumable_asset.blob_fees_reduction}
            </span>
          </div>
        </div>

        {/* 3. Store of Value */}
        <div className="bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition duration-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-200/80 shadow-2xs">
                  <Vault className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {tt.storeTitle || "Store of Value"}
                  </h3>
                  <span className="text-[11px] text-sky-700 font-semibold">
                    {tt.storeSub || "Ultra Sound Money"}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800 font-mono">
                {store_of_value.net_annual_inflation <= 0 ? (tt.deflationary || 'Deflacionário') : (tt.equilibrium || 'Equilíbrio')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 my-4">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
                <p className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">
                  {tt.totalSupply || "Oferta Total"}
                </p>
                <p className="text-base font-bold text-slate-900 mt-0.5 font-mono">
                  {(store_of_value.total_supply / 1e6).toFixed(1)}M ETH
                </p>
                <span className="text-[11px] text-emerald-700 font-medium">
                  {tt.supplyGrowth || "Crescimento ~0% a.a."}
                </span>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
                <p className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">
                  {tt.defiCollateral || "Colateral em DeFi"}
                </p>
                <p className="text-base font-bold text-sky-700 mt-0.5 font-mono">
                  {store_of_value.defi_collateral_usd}
                </p>
                <span className="text-[11px] text-slate-500 font-medium">
                  {tt.globalGuarantee || "Garantia líquida global"}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {store_of_value.insight}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{tt.etfHoldings || "Holdings Institucionais em ETFs"}</span>
            <span className="font-bold text-slate-900 font-mono">{(store_of_value.etf_institutional_holdings_eth / 1e6).toFixed(2)}M ETH</span>
          </div>
        </div>

      </div>
    </section>
  );
}
