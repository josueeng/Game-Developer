"""Gera public/textura-papel.jpg: textura de papel bege procedural (sem direitos de terceiros).

Uso: python3 scripts/gerar-textura.py
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

W, H = 2200, 1300  # um pouco maior que 1920x1080 para permitir zoom/pan
rng = np.random.default_rng(2026)


def ruido(escala: int) -> np.ndarray:
    """Ruído suave: grade aleatória pequena ampliada com interpolação bicúbica."""
    pequeno = rng.random((H // escala + 2, W // escala + 2))
    img = Image.fromarray((pequeno * 255).astype(np.uint8)).resize(
        (W + 2 * escala, H + 2 * escala), Image.BICUBIC
    )
    return np.asarray(img, dtype=np.float32)[:H, :W] / 255.0


# Mistura de oitavas: manchas grandes + granulação fina
base = 0.45 * ruido(260) + 0.30 * ruido(90) + 0.15 * ruido(25) + 0.10 * ruido(6)
grao = rng.normal(0, 1, (H, W)).astype(np.float32)

# Fibras: traços finos horizontais/aleatórios borrados
fa = np.zeros((H, W), dtype=np.float32)
for _ in range(1800):
    x, y = rng.integers(0, W), rng.integers(0, H)
    comp = rng.integers(10, 60)
    ang = rng.normal(0, 0.6)
    xs = (x + np.arange(comp) * np.cos(ang)).astype(int) % W
    ys = (y + np.arange(comp) * np.sin(ang)).astype(int) % H
    fa[ys, xs] += rng.uniform(0.3, 1.0)
fibras = np.asarray(
    Image.fromarray(np.clip(fa * 120, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8)),
    dtype=np.float32,
) / 255.0

# Vinheta suave nas bordas
yy, xx = np.mgrid[0:H, 0:W]
d = np.sqrt(((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2)
vinheta = np.clip(d - 0.55, 0, 1) ** 1.6

bege = np.array([236, 225, 202], dtype=np.float32)  # #ECE1CA
luz = (base - 0.5) * 22 + grao * 3.2 - fibras * 10 - vinheta * 38
img = bege[None, None, :] + luz[..., None] * np.array([1.0, 0.97, 0.9])
img = np.clip(img, 0, 255).astype(np.uint8)

saida = Path(__file__).resolve().parent.parent / "public" / "textura-papel.jpg"
Image.fromarray(img, "RGB").save(saida, quality=90)
print(f"Textura salva em {saida}")
