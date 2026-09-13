#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=== [Ethereum TimesFM] Iniciando atualização de inferência pré-calculada ==="
echo "1. Ativando ambiente Python..."
source "${SCRIPT_DIR}/backend/.venv/bin/activate"

echo "2. Executando pipeline com Google TimesFM 3.0..."
python "${SCRIPT_DIR}/backend/pipeline.py"

echo "3. Dados atualizados em frontend/public/data/eth_timesfm_data.json"
echo "=== Concluído com sucesso ==="
