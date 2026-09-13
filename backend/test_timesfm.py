import sys
import numpy as np
import torch

print(f"Python: {sys.version}")
print(f"PyTorch: {torch.__version__}, Device: {'cuda' if torch.cuda.is_available() else 'cpu'}")

try:
    from timesfm import TimesFM3Forecaster
    print("Carregando TimesFM 3.0 (google/timesfm-3.0-pytorch)...")
    forecaster = TimesFM3Forecaster()
    print("Modelo carregado com sucesso!")
    
    # Teste simples com uma série sintética
    x = np.sin(np.linspace(0, 20, 100)).astype(np.float32)
    output = forecaster.predict(x, horizon=14, return_quantiles=True)
    print("Previsão ponto central:", output.forecast[:5])
    print("Quantis formato:", output.quantiles.shape)
    print("Teste finalizado com sucesso!")
except Exception as e:
    print(f"Erro durante teste: {e}", file=sys.stderr)
    raise e
