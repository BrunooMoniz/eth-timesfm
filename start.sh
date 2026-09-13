#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="${SCRIPT_DIR}/.services.pid"

# Para instâncias antigas se existirem
"${SCRIPT_DIR}/stop.sh" >/dev/null 2>&1 || true

echo "=== Iniciando Ethereum TimesFM ==="

# 1. Inicia API FastAPI no backend
echo "1. Iniciando API Backend (Porta 8000)..."
nohup "${SCRIPT_DIR}/backend/.venv/bin/python" -m uvicorn server:app --app-dir "${SCRIPT_DIR}/backend" --host 127.0.0.1 --port 8000 </dev/null > "${SCRIPT_DIR}/backend.log" 2>&1 &
BACKEND_PID=$!
disown $BACKEND_PID

# 2. Inicia Frontend Vite Preview (Porta 4173)
echo "2. Iniciando Frontend Web (Porta 4173)..."
nohup npm --prefix "${SCRIPT_DIR}/frontend" run preview -- --port 4173 --host </dev/null > "${SCRIPT_DIR}/frontend.log" 2>&1 &
FRONTEND_PID=$!
disown $FRONTEND_PID

# Salva PIDs
echo "$BACKEND_PID" > "$PID_FILE"
echo "$FRONTEND_PID" >> "$PID_FILE"

# Aguarda inicialização
sleep 2

# Verificação
if curl -s http://127.0.0.1:8000/health >/dev/null && curl -s http://localhost:4173/ >/dev/null; then
    echo "================================================="
    echo "  🚀 Ethereum TimesFM Rodando com Sucesso!"
    echo "  🌐 Acesse no seu navegador:"
    echo "     👉 http://localhost:4173/"
    echo "  ⚙️  API de Inferência TimesFM 3.0:"
    echo "     👉 http://127.0.0.1:8000/docs"
    echo "================================================="
else
    echo "Aviso: Verificando logs dos serviços..."
fi
