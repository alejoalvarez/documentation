---
id: python-avanzado
title: Python Avanzado
sidebar_label: 🐍 Python Avanzado
description: Domina Python a nivel avanzado para proyectos de AI — tipado estático, async, NumPy vectorizado y profiling.
tags: [python, fundamentos, fase-1]
---

# 🐍 Python Avanzado

<span className="badge-eng">AI Engineer · Fase 1</span>

Dominar Python a nivel avanzado es el punto de partida obligatorio para cualquier AI Engineer. No basta con saber el lenguaje: necesitas entender sus internals para escribir código eficiente, mantenible y apto para producción.

**Tags:** `Python 3.10+` · `NumPy` · `Pandas` · `asyncio` · `typing`

---

## Tipado Estático con mypy

A partir de Python 3.10, el sistema de tipos es maduro y potente. Usar tipado estático mejora la mantenibilidad, detecta bugs temprano y facilita el trabajo en equipo.

```python title="Tipos avanzados en Python 3.11"
from __future__ import annotations
from typing import TypeVar, Generic, Protocol
from dataclasses import dataclass, field
import numpy as np
from numpy.typing import NDArray

# TypeVar para generics en clases
T = TypeVar("T")
FloatArray = NDArray[np.float64]

@dataclass
class ModelOutput:
    embeddings: FloatArray
    logits: FloatArray
    metadata: dict[str, float] = field(default_factory=dict)

# Protocol para duck typing estructural
class Vectorizer(Protocol):
    def encode(self, texts: list[str]) -> FloatArray: ...
    def encode_batch(self, texts: list[str], batch_size: int = 32) -> FloatArray: ...

def process_embeddings(
    model: Vectorizer,
    texts: list[str],
    *,  # keyword-only arguments
    normalize: bool = True,
    dtype: np.dtype = np.float32
) -> FloatArray:
    embeddings = model.encode(texts)
    if normalize:
        norms = np.linalg.norm(embeddings, axis=-1, keepdims=True)
        embeddings = embeddings / (norms + 1e-8)
    return embeddings.astype(dtype)
```

---

## Programación Asíncrona para AI

Cuando construyes pipelines que llaman a APIs de LLMs, el código asíncrono puede multiplicar el throughput por **10x–50x** al procesar múltiples requests en paralelo.

```python title="Llamadas paralelas a LLM API"
import asyncio
import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(stop=stop_after_attempt(3), wait=wait_exponential(min=1, max=10))
async def call_llm(client: httpx.AsyncClient, prompt: str) -> str:
    response = await client.post(
        "https://api.openai.com/v1/chat/completions",
        json={"model": "gpt-4o", "messages": [{"role": "user", "content": prompt}]},
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]

async def batch_process(prompts: list[str], concurrency: int = 10) -> list[str]:
    semaphore = asyncio.Semaphore(concurrency)  # Límite de concurrencia

    async def bounded_call(client, prompt):
        async with semaphore:
            return await call_llm(client, prompt)

    async with httpx.AsyncClient(timeout=30.0) as client:
        tasks = [bounded_call(client, p) for p in prompts]
        return await asyncio.gather(*tasks)

# 100 prompts en ~2s en lugar de ~200s secuencialmente
results = asyncio.run(batch_process(prompts, concurrency=20))
```

:::tip Regla de oro del async
Úsalo cuando tienes IO-bound operations (llamadas a APIs, lecturas de disco, queries a DB). No para CPU-bound como entrenamiento de modelos — para eso usa multiprocessing.
:::

---

## NumPy Vectorizado

Entender NumPy es crucial para evitar loops lentos. El principio: **nunca iterar elemento a elemento cuando puedes usar broadcasting**.

```python
import numpy as np

# ❌ LENTO: loop Python — O(N) llamadas Python
similarities = []
for emb in embeddings:
    sim = np.dot(query, emb) / (np.linalg.norm(query) * np.linalg.norm(emb))
    similarities.append(sim)

# ✅ RÁPIDO: operación vectorizada — ~100x más rápido
# query: (768,)  |  embeddings: (N, 768)
query_norm = query / np.linalg.norm(query)
emb_norms = embeddings / np.linalg.norm(embeddings, axis=1, keepdims=True)
similarities = query_norm @ emb_norms.T  # (N,)
```

---

## Profiling y Optimización

:::warning Regla de oro
Nunca optimices sin medir. Primero haz funcionar el código, luego identifica los cuellos de botella reales con profiling.
:::

```bash
# Profiling con cProfile
python -m cProfile -s cumulative train.py

# Line profiler (pip install line-profiler)
kernprof -l -v script.py
```

---

## Recursos

| Recurso | Tipo | Nivel |
|---------|------|-------|
| [Python Typing Docs](https://docs.python.org/3/library/typing.html) | Documentación | ⭐⭐ |
| [Real Python: Async IO](https://realpython.com/async-io-python/) | Tutorial | ⭐⭐ |
| [NumPy Broadcasting Guide](https://numpy.org/doc/stable/user/basics.broadcasting.html) | Documentación | ⭐⭐⭐ |
| **Fluent Python** (Ramalho, 2022) | Libro | ⭐⭐⭐⭐ |
| [ArjanCodes](https://www.youtube.com/@ArjanCodes) | YouTube | ⭐⭐⭐ |
