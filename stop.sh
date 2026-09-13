#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="${SCRIPT_DIR}/.services.pid"

if [ -f "$PID_FILE" ]; then
    echo "Encerrando serviços anteriores..."
    while read -r pid; do
        if kill -0 "$pid" 2>/dev/null; then
            kill "$pid" 2>/dev/null || true
        fi
    done < "$PID_FILE"
    rm -f "$PID_FILE"
    echo "Serviços encerrados."
else
    # Fallback: mata processos por porta
    fuser -k 8000/tcp 2>/dev/null || true
    fuser -k 4173/tcp 2>/dev/null || true
    echo "Portas 8000 e 4173 liberadas."
fi
