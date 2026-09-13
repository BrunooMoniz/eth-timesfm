"""
Servidor API Fast & Leve para Ethereum TimesFM
Fornece endpoints para consumo de dados e re-inferência sob demanda.
"""

import json
import os
import sys
import threading
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Diretórios
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "..", "frontend", "public", "data", "eth_timesfm_data.json")

app = FastAPI(
    title="Ethereum TimesFM API",
    description="API de Previsões com Google TimesFM 3.0 e Fundamentos de Rede",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

is_refreshing = False
refresh_lock = threading.Lock()

def do_refresh_task():
    global is_refreshing
    with refresh_lock:
        is_refreshing = True
        try:
            from pipeline import build_full_dataset
            out_dir = os.path.dirname(DATA_FILE)
            build_full_dataset(out_dir)
            print("Atualização do TimesFM 3.0 concluída com sucesso via API!")
        except Exception as e:
            print(f"Erro ao executar pipeline via API: {e}", file=sys.stderr)
        finally:
            is_refreshing = False

@app.get("/health")
def health_check():
    return {"status": "ok", "model": "Google TimesFM 3.0"}

@app.get("/api/data")
def get_data():
    if not os.path.exists(DATA_FILE):
        raise HTTPException(status_code=404, detail="Dataset ainda não gerado.")
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        return JSONResponse(content=data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/refresh")
def trigger_refresh(background_tasks: BackgroundTasks):
    global is_refreshing
    if is_refreshing:
        return {"status": "already_running", "message": "O pipeline do TimesFM 3.0 já está em execução."}
    
    background_tasks.add_task(do_refresh_task)
    return {"status": "started", "message": "Execução do Google TimesFM 3.0 iniciada em segundo plano."}

@app.get("/api/status")
def get_status():
    global is_refreshing
    return {
        "is_refreshing": is_refreshing,
        "dataset_exists": os.path.exists(DATA_FILE),
        "dataset_mtime": os.path.getmtime(DATA_FILE) if os.path.exists(DATA_FILE) else None
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
