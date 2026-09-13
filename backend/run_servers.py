"""
Supervisor dos serviços Ethereum TimesFM.
Inicia o backend Uvicorn (porta 8000) e o frontend Vite Preview (porta 4173)
e mantém ambos vivos.
"""

import os
import signal
import subprocess
import sys
import time

SCRIPT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PYTHON_BIN = os.path.join(SCRIPT_DIR, "backend", ".venv", "bin", "python")
FRONTEND_DIR = os.path.join(SCRIPT_DIR, "frontend")

procs = []

def cleanup(sig=None, frame=None):
    print("\nEncerrando serviços...")
    for p in procs:
        try:
            p.terminate()
            p.wait(timeout=2)
        except Exception:
            p.kill()
    sys.exit(0)

signal.signal(signal.SIGINT, cleanup)
signal.signal(signal.SIGTERM, cleanup)

print("Iniciando backend Uvicorn na porta 8000...")
p_backend = subprocess.Popen(
    [PYTHON_BIN, "-m", "uvicorn", "server:app", "--app-dir", os.path.join(SCRIPT_DIR, "backend"), "--host", "127.0.0.1", "--port", "8000"],
    stdout=sys.stdout,
    stderr=sys.stderr
)
procs.append(p_backend)

print("Iniciando frontend Vite Preview na porta 4173...")
p_frontend = subprocess.Popen(
    ["npm", "run", "preview", "--", "--port", "4173", "--host"],
    cwd=FRONTEND_DIR,
    stdout=sys.stdout,
    stderr=sys.stderr
)
procs.append(p_frontend)

print("\n" + "="*50)
print("  🚀 Ethereum TimesFM Rodando!")
print("  🌐 Frontend: http://localhost:4173/")
print("  ⚙️  API:      http://127.0.0.1:8000/docs")
print("="*50 + "\n")

# Mantém processo rodando
while True:
    for p in procs:
        if p.poll() is not None:
            print(f"Processo {p.pid} encerrou inesperadamente.")
            cleanup()
    time.sleep(1)
