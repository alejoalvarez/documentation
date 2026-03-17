---
title: Tracing
sidebar_label: Tracing
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Distributed Tracing

**Distributed Tracing** is an observability technique that tracks the path a single request takes as it propagates through a distributed system (a set of microservices). It allows engineers to visualize the complete end-to-end journey of a transaction and pinpoint exactly which service is responsible for excessive latency or errors.

---

## Core Concepts

### Trace
A **Trace** represents the entire end-to-end journey of a single request. It has a globally unique `traceId`.

### Span
A **Span** represents an individual unit of work within a trace (e.g., one service processing the request, one database query, one outbound HTTP call). Spans have:
- A unique `spanId`
- A `parentSpanId` (the span that triggered this one — forming a tree)
- `startTime` and `endTime` (allowing duration calculation)

### Context Propagation
For tracing to work across services, the `traceId` and `spanId` must be **propagated** as HTTP headers with every outbound call. The industry standard for this is the **W3C Trace Context** header: `traceparent`.

---

## How It Works

1. User sends a request to the **API Gateway**.
2. The Gateway generates a new `traceId` and creates a root Span.
3. The Gateway calls the **Order Service**, injecting the `traceparent` header with the `traceId`.
4. The Order Service creates a child Span, calls the **Payment Service** (injecting the same header), and also calls the **Inventory Service**.
5. Each service reports its span data to a central **Trace Collector**.
6. The collector assembles the spans into a **Flame Graph (Gantt Chart)**, showing the complete timeline.

```
Request Timeline (traceId: abc-123)
│
├─ API Gateway [0ms - 25ms] (root span)
│   ├─ Order Service [5ms - 120ms]
│   │   ├─ DB Query [10ms - 35ms]
│   │   ├─ Payment Service [40ms - 95ms]   ← SLOW! This is the bottleneck
│   │   └─ Inventory Service [40ms - 55ms]
│   └─ Notification Service [100ms - 115ms]
```

---

## Tracing Tools

| Tool | Type |
|------|------|
| **Jaeger** | Open-source distributed tracing (CNCF project) |
| **Zipkin** | Open-source, lightweight tracing (Twitter) |
| **AWS X-Ray** | AWS-native application tracing |
| **Datadog APM** | Commercial full-stack tracing |
| **OpenTelemetry** | Open-source standard for instrumentation (vendor-neutral) |

---

## OpenTelemetry
**OpenTelemetry (OTel)** is the modern industry standard. Instead of tying your application to Jaeger or Datadog, you instrument your code once using the OTel SDK, then route telemetry to any compatible backend. This prevents vendor lock-in for your observability stack.
