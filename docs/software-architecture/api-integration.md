---
id: api-integration
title: Diseño de APIs e Integración
sidebar_label: API & Integration Design
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

# Diseño de APIs e Integración

<span className="badge-arch">Modeling & Boundaries</span>

Una buena arquitectura se rompe primero en los contratos. Diseñar APIs robustas reduce fricción entre equipos.

![API design](https://upload.wikimedia.org/wikipedia/commons/e/e0/REST_API.svg)

## Principios

- Versiona contratos (`/v1`, headers o schema registry).
- Diseña para evolución: campos opcionales y compatibilidad backward.
- Define idempotencia en operaciones críticas (`Idempotency-Key`).
- Observa contratos en runtime (errores, latencia, saturación).

## Ejemplo de contrato

```http
POST /v1/payments
Idempotency-Key: 6c74f8b2-22ea-43f6-aab1-e0c6f9f2f0d1
Content-Type: application/json

{
  "orderId": "ord_123",
  "amount": 149.90,
  "currency": "USD"
}
```

```json
{
  "paymentId": "pay_789",
  "status": "AUTHORIZED"
}
```

## Estrategias de integración

- **Sync (HTTP/gRPC)** para respuestas inmediatas.
- **Async (event bus)** para procesos largos y desacoplados.
- **Saga/Orchestration** para flujos distribuidos con compensaciones.

## Referencias

- "API Design Patterns" — JJ Geewax
- RFC 7231 (HTTP Semantics)
