# Ethereum TimesFM

Plataforma analítica que combina o modelo fundacional **Google TimesFM 3.0** com a tese fundamental do Ethereum como **World Computer** e **Super Asset (Triple Point Asset)**.

---

## 🎯 Arquitetura da Solução

1. **Pipeline de Inferência (Python 3 + Google TimesFM 3.0 PyTorch):**
   * Coleta diária de OHLCV do Ethereum via Binance API e métricas on-chain (TVL da DefiLlama, Staking ratio, queima EIP-1559, atividade de L2s).
   * Execução do modelo fundacional `google/timesfm-3.0-pytorch` para projetar horizontes de 7, 30 e 90 dias com cálculo completo de quantis probabilísticos (P10, P25, P50 mediana, P75, P90).
   * Geração de análises qualitativas contextuais para cada horizonte temporal.
   * Exportação estática para `frontend/public/data/eth_timesfm_data.json`.

2. **Frontend Web & Mega Gráfico (React + Vite + Tailwind CSS + TradingView Lightweight Charts):**
   * Mega Gráfico financeiro com suporte a Candlesticks e Linha histórica, integrado às bandas de incerteza do TimesFM.
   * Alternância dinâmica de horizontes temporais (7D Tático, 30D Médio Prazo, 90D Estratégico).
   * Painel interativo do **Triple Point Asset**: Capital Asset (Staking yield), Consumable Asset (EIP-1559 gas burning), Store of Value (Ultra Sound Money).
   * Painel de infraestrutura do **World Computer**: Tabela e TPS de Layer 2s (Base, Arbitrum, Optimism, zkSync, Scroll), uptime contínuo de 100% desde 2015 e camada de liquidação institucional na L1.
   * Seção explicativa da metodologia estatística do modelo do Google Research.

---

## 🚀 Como Executar

### 1. Atualizar Previsões com o TimesFM
```bash
./run_pipeline.sh
```

### 2. Rodar o Frontend em Desenvolvimento
```bash
cd frontend
npm run dev
```

### 3. Build de Produção
```bash
cd frontend
npm run build
npm run preview
```

---

## 🔬 Pesos e Recursos do Modelo

* Modelo: `google/timesfm-3.0-pytorch` (Hugging Face)
* Parâmetros: 200M / Transformer Decoder-only
* Consumo em disco dos pesos: ~1.26 GB (armazenados em cache local)
* Inferência: CPU compatível (PyTorch 2.14+cpu), sem necessidade de GPU em produção
