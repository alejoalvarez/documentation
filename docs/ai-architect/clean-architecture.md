---
id: clean-architecture
title: Clean Architecture para Proyectos AI
sidebar_label: 🧹 Clean Architecture
description: Estructura proyectos AI con Clean Architecture — separación de capas, inyección de dependencias y testing sin infraestructura.
tags: [arquitectura, clean-architecture, estructura, testing]
---

# 🧹 Clean Architecture para Proyectos AI

<span className="badge-arch">AI Architect · Fundamento</span>
<span className="badge-eng">Ambos roles</span>

Clean Architecture, popularizada por Robert C. Martin ("Uncle Bob"), proporciona una estructura de proyecto que separa responsabilidades, facilita el testing y permite cambiar tecnologías (modelos, bases de datos, APIs) sin reescribir la lógica de negocio.

**Tags:** `Clean Architecture` · `DDD` · `Dependency Inversion` · `Hexagonal` · `Use Cases`

---

## El Concepto Central: La Regla de Dependencia

La regla fundamental es que **las dependencias de código solo pueden apuntar hacia adentro**: las capas externas dependen de las internas, nunca al revés.

:::info La pregunta que Clean Architecture responde
- ¿Puedo cambiar de GPT-4 a LLaMA sin tocar mi lógica de negocio?
- ¿Puedo cambiar de Pinecone a Qdrant sin reescribir mis casos de uso?
- ¿Puedo testear mi lógica de RAG sin conectarme a ninguna API?

Si la respuesta es "no" a cualquiera, tienes un problema de arquitectura.
:::

---

## Las Capas de Clean Architecture

| Capa | Descripción | En proyectos AI |
|------|-------------|-----------------|
| **① Dominio** | Entidades y reglas de negocio puras. Sin dependencias. | `Document`, `Chunk`, `Embedding`, `SearchResult` |
| **② Casos de Uso** | Lógica de aplicación. Orquesta entidades. | `IndexDocuments`, `QueryRAG`, `RunAgent` |
| **③ Adaptadores** | Convierte entre mundo externo y casos de uso. | REST controllers, CLI, gRPC handlers |
| **④ Infraestructura** | Detalles técnicos: DBs, APIs, frameworks. | OpenAI client, Pinecone, SQLAlchemy, FastAPI |

---

## Estructura de Proyecto AI

```
ai-service/
├── src/
│   ├── domain/                    # ① NÚCLEO — sin dependencias externas
│   │   ├── entities/
│   │   │   ├── document.py        # class Document
│   │   │   ├── chunk.py           # class Chunk
│   │   │   ├── message.py         # class ConversationMessage
│   │   │   └── search_result.py   # class SearchResult
│   │   └── repositories/          # Interfaces (Protocols)
│   │       ├── document_repo.py   # Protocol: save, get, delete
│   │       ├── vector_store.py    # Protocol: index, search, delete
│   │       └── llm_gateway.py     # Protocol: complete, embed
│   │
│   ├── application/               # ② CASOS DE USO
│   │   ├── use_cases/
│   │   │   ├── index_documents.py
│   │   │   ├── query_rag.py
│   │   │   ├── run_agent.py
│   │   │   └── summarize.py
│   │   └── services/
│   │       ├── chunking_service.py
│   │       └── reranking_service.py
│   │
│   ├── adapters/                  # ③ ADAPTADORES
│   │   ├── api/
│   │   │   ├── routers/
│   │   │   │   ├── documents.py
│   │   │   │   └── chat.py
│   │   │   └── schemas/
│   │   │       ├── request.py
│   │   │       └── response.py
│   │   └── cli/
│   │       └── commands.py
│   │
│   └── infrastructure/            # ④ INFRAESTRUCTURA
│       ├── llm/
│       │   ├── openai_gateway.py
│       │   ├── anthropic_gateway.py
│       │   └── ollama_gateway.py
│       ├── vector_stores/
│       │   ├── pinecone_store.py
│       │   ├── qdrant_store.py
│       │   └── chroma_store.py    # Para testing/dev
│       ├── repositories/
│       │   ├── postgres_doc_repo.py
│       │   └── inmemory_doc_repo.py # Para testing
│       └── config/
│           ├── settings.py
│           └── container.py       # Dependency injection
│
├── tests/
│   ├── unit/                      # Sin IO — rápidos
│   ├── integration/               # Con infraestructura real
│   └── e2e/                       # Flujos completos
│
├── pyproject.toml
├── Dockerfile
└── README.md
```

---

## ① Capa de Dominio

Las entidades son objetos de negocio puros. Los repositorios son **interfaces** (Protocols), no implementaciones.

```python title="src/domain/entities/document.py"
from __future__ import annotations
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from uuid import UUID, uuid4

class DocumentStatus(Enum):
    PENDING   = "pending"
    INDEXED   = "indexed"
    FAILED    = "failed"

@dataclass
class Document:
    """Entidad de dominio — sin dependencias externas."""
    id: UUID = field(default_factory=uuid4)
    title: str = ""
    content: str = ""
    source_url: str | None = None
    status: DocumentStatus = DocumentStatus.PENDING
    created_at: datetime = field(default_factory=datetime.utcnow)
    metadata: dict = field(default_factory=dict)

    def mark_indexed(self) -> None:
        if self.status == DocumentStatus.FAILED:
            raise ValueError("Cannot index a failed document without reset")
        self.status = DocumentStatus.INDEXED

    def is_ready_for_indexing(self) -> bool:
        return bool(self.content.strip()) and self.status == DocumentStatus.PENDING
```

```python title="src/domain/repositories/vector_store.py — Interfaces (Protocol)"
from typing import Protocol, runtime_checkable

@runtime_checkable
class VectorStore(Protocol):
    """
    Interfaz del vector store.
    El dominio define QUÉ necesita, la infra define CÓMO.
    """
    async def index_chunks(self, chunks: list[Chunk]) -> None: ...
    async def search(self, query_embedding: list[float], top_k: int = 5) -> list[SearchResult]: ...
    async def delete_by_document_id(self, document_id: str) -> None: ...

@runtime_checkable
class LLMGateway(Protocol):
    async def complete(self, messages: list[dict], **kwargs) -> str: ...
    async def embed(self, texts: list[str]) -> list[list[float]]: ...
```

---

## ② Casos de Uso

Los casos de uso contienen la lógica de aplicación. Reciben interfaces a través de inyección de dependencias, **nunca instancian infraestructura directamente**.

```python title="src/application/use_cases/query_rag.py"
from dataclasses import dataclass
from ...domain.repositories.vector_store import VectorStore, LLMGateway

@dataclass
class QueryRAGRequest:
    question: str
    conversation_history: list[dict] = None
    top_k: int = 5
    temperature: float = 0.3

@dataclass
class QueryRAGResponse:
    answer: str
    sources: list[str]
    confidence: float

class QueryRAGUseCase:
    """
    Solo conoce interfaces, no implementaciones concretas.
    Se puede cambiar OpenAI por Anthropic sin tocar esta clase.
    """
    def __init__(
        self,
        vector_store: VectorStore,   # Interface, no Pinecone concreto
        llm: LLMGateway,             # Interface, no OpenAI concreto
    ):
        self._vector_store = vector_store
        self._llm = llm

    async def execute(self, request: QueryRAGRequest) -> QueryRAGResponse:
        # 1. Embed la query
        [query_embedding] = await self._llm.embed([request.question])

        # 2. Recuperar chunks relevantes
        results = await self._vector_store.search(
            query_embedding, top_k=request.top_k
        )

        if not results:
            return QueryRAGResponse(
                answer="No encontré información relevante.",
                sources=[], confidence=0.0
            )

        # 3. Construir contexto y prompt
        context = "\n\n---\n\n".join([r.text for r in results])
        sources = list({r.source_url for r in results if r.source_url})

        messages = [
            {"role": "system", "content": f"Responde SOLO basándote en:\n\n{context}"},
            *(request.conversation_history or []),
            {"role": "user", "content": request.question}
        ]

        # 4. Generar respuesta
        answer = await self._llm.complete(messages, temperature=request.temperature)
        avg_score = sum(r.score for r in results) / len(results)

        return QueryRAGResponse(answer=answer, sources=sources, confidence=avg_score)
```

:::tip Por qué esto es poderoso
Este caso de uso no sabe si el vector store es Pinecone, Qdrant o una lista en memoria. Puedes cambiar cualquiera **sin tocar este archivo**.
:::

---

## ③ Adaptadores

Los adaptadores traducen entre el "mundo externo" y los casos de uso. **No contienen lógica de negocio.**

```python title="src/adapters/api/routers/chat.py"
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from ...application.use_cases.query_rag import QueryRAGUseCase, QueryRAGRequest
from ...infrastructure.config.container import get_query_rag_use_case

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatRequest(BaseModel):
    question: str
    conversation_history: list[dict] = []

class ChatResponse(BaseModel):
    answer: str
    sources: list[str]
    confidence: float

@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    use_case: QueryRAGUseCase = Depends(get_query_rag_use_case)
):
    # Adapter: HTTP request → use case request
    result = await use_case.execute(QueryRAGRequest(
        question=request.question,
        conversation_history=request.conversation_history,
    ))
    # Adapter: use case response → HTTP response
    return ChatResponse(answer=result.answer, sources=result.sources, confidence=result.confidence)
```

---

## ④ Infraestructura e Inyección de Dependencias

```python title="src/infrastructure/llm/openai_gateway.py"
from openai import AsyncOpenAI

class OpenAIGateway:
    """Implementa LLMGateway con OpenAI. El dominio NUNCA importa esto."""
    def __init__(self, api_key: str, model: str = "gpt-4o"):
        self._client = AsyncOpenAI(api_key=api_key)
        self._model = model

    async def complete(self, messages: list[dict], **kwargs) -> str:
        response = await self._client.chat.completions.create(
            model=self._model, messages=messages, **kwargs
        )
        return response.choices[0].message.content

    async def embed(self, texts: list[str]) -> list[list[float]]:
        response = await self._client.embeddings.create(
            model="text-embedding-3-small", input=texts
        )
        return [e.embedding for e in response.data]
```

```python title="src/infrastructure/config/container.py — El 'pegamento'"
from functools import lru_cache
from .settings import Settings
from ..llm.openai_gateway import OpenAIGateway
from ..vector_stores.qdrant_store import QdrantVectorStore
from ...application.use_cases.query_rag import QueryRAGUseCase

@lru_cache
def get_settings() -> Settings:
    return Settings()

def get_query_rag_use_case() -> QueryRAGUseCase:
    # Para cambiar de Qdrant a Pinecone: solo cambias esta línea
    return QueryRAGUseCase(
        vector_store=QdrantVectorStore(url=get_settings().qdrant_url),
        llm=OpenAIGateway(api_key=get_settings().openai_api_key)
    )
```

---

## Testing por Capas

La mayor ventaja: **los casos de uso se testean con mocks, sin infraestructura real**.

```python title="tests/unit/application/test_query_rag.py"
import pytest
from unittest.mock import AsyncMock
from src.application.use_cases.query_rag import QueryRAGUseCase, QueryRAGRequest

@pytest.mark.asyncio
async def test_returns_answer_with_sources():
    # Arrange: mocks puros, sin API keys ni conexiones
    mock_vs = AsyncMock()
    mock_vs.search.return_value = [
        SearchResult(text="Python es interpretado.", score=0.95, source_url="https://python.org"),
    ]
    mock_llm = AsyncMock()
    mock_llm.embed.return_value = [[0.1, 0.2, 0.3]]
    mock_llm.complete.return_value = "Python es un lenguaje interpretado."

    use_case = QueryRAGUseCase(vector_store=mock_vs, llm=mock_llm)

    # Act
    response = await use_case.execute(QueryRAGRequest(question="¿Qué es Python?"))

    # Assert
    assert "Python" in response.answer
    assert len(response.sources) == 1
    assert response.confidence > 0.8
    mock_llm.complete.assert_called_once()

@pytest.mark.asyncio
async def test_handles_empty_results():
    mock_vs = AsyncMock()
    mock_vs.search.return_value = []  # Sin resultados
    mock_llm = AsyncMock()
    mock_llm.embed.return_value = [[0.1, 0.2]]

    use_case = QueryRAGUseCase(vector_store=mock_vs, llm=mock_llm)
    response = await use_case.execute(QueryRAGRequest(question="Pregunta sin respuesta"))

    assert response.confidence == 0.0
    mock_llm.complete.assert_not_called()  # No llamar al LLM sin contexto
```

---

## Comparativa

| Situación | ❌ Sin Clean Arch | ✅ Con Clean Arch |
|-----------|-------------------|-------------------|
| Cambiar de OpenAI a Anthropic | Modificar 15+ archivos | Crear `AnthropicGateway`, cambiar 1 línea en `container.py` |
| Testear lógica RAG | Necesitas API keys reales | Mocks puros, tests en < 1 segundo |
| Cambiar de Pinecone a Qdrant | Refactoring masivo | Crear `QdrantStore`, cambiar `container.py` |
| Añadir CLI además de HTTP | Duplicar lógica | Nuevo adapter que usa el mismo use case |
| Onboarding de nuevo dev | "El código está en varios sitios" | Estructura predecible y documentada |

:::caution Cuándo NO usar Clean Architecture
Para prototipos rápidos, scripts one-off o proyectos de menos de 2 semanas. Clean Architecture añade overhead innecesario en estos casos.
:::

---

## Fuentes

| Recurso | Tipo |
|---------|------|
| **Clean Architecture** — Robert C. Martin | Libro fundacional |
| [The Clean Architecture (blog)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) | Blog post original |
| [Architecture Patterns with Python](https://www.cosmicpython.com/) | Libro gratuito online |
| [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/) | Paper original |
| [FastAPI Clean Architecture Example](https://github.com/whiteducksoftware/fastapi-clean-architecture) | GitHub |
