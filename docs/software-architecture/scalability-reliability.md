---
id: scalability-reliability
title: Escalabilidad y Confiabilidad
sidebar_label: Scalability & Reliability
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

# Escalabilidad y Confiabilidad

<span className="badge-arch">Data & Scale</span>

Escalar no es solo "más pods": implica capacidad, degradación controlada y recuperación rápida.

![Escalado horizontal](https://upload.wikimedia.org/wikipedia/commons/3/3a/Scalability.svg)

## Toolkit de resiliencia

- Timeouts y retries con jitter.
- Circuit breaker para cortar cascadas de fallos.
- Bulkheads para aislar recursos.
- Rate limiting para proteger servicios críticos.
- Caching por capa (edge, app, DB).

## Ejemplo de política de resiliencia

```yaml
service: checkout-api
timeout_ms: 800
retry:
  max_attempts: 2
  backoff: exponential_jitter
circuit_breaker:
  error_threshold_percent: 50
  open_state_seconds: 30
```

## Métricas mínimas

- p50/p95/p99 latency
- error rate por endpoint
- saturation (CPU/memoria/conexiones)
- SLO compliance y burn rate

## Referencias

- Google SRE Book
- "Release It!" — Michael Nygard
