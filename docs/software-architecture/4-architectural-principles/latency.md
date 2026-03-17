---
title: Latency
sidebar_label: Latency
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Latency

**Latency** is the time delay between a user or system initiating a request and receiving the first byte of the response. It is typically measured in milliseconds (ms) and is one of the most user-noticeable performance characteristics.

> Amazon research found that every 100ms of latency reduces sales by 1%. Google found that a 500ms increase in search latency reduced revenue by 20%.

---

## Measuring Latency Correctly: Percentiles

Average latency is a misleading metric. A few extremely slow requests (outliers) create a high tail latency while the average still looks fine. Always measure and report latency as **percentiles**:

| Percentile | Meaning | Importance |
|------------|---------|-----------|
| **P50** | 50% of requests are faster than this | The "typical" experience |
| **P90** | 90% of requests are faster than this | What most users experience |
| **P95** | 95% faster | High-performance target |
| **P99** | 99% faster | Tail latency — what heavy users (and churned users) experience |
| **P99.9** | 99.9% faster | Reserved for mission-critical systems |

Always define your **SLO** for latency as a percentile, not a mean: `P99 < 200ms`.

---

## Sources of Latency

Understanding where latency originates is key to reducing it:

1. **Network latency:** The physical distance data must travel. Speed of light in fiber is the hard limit (~67ms coast-to-coast in US). Mitigate with edge CDNs, geographic data replication.
2. **Queuing latency:** A request waiting in a queue to be processed (thread pool exhaustion, database connection pool exhaustion). Mitigate with proper capacity planning and backpressure mechanisms.
3. **Processing/computation latency:** CPU time to execute business logic. Mitigate with algorithm optimization and caching.
4. **Database query latency:** Slow queries due to missing indexes or full table scans. Mitigate with proper indexing and query optimization.
5. **Serialization latency:** Converting objects to JSON and back. Mitigate with efficient serialization formats (Protocol Buffers, Avro vs. verbose JSON).

---

## Latency Reduction Strategies

| Strategy | Applies To |
|----------|-----------|
| **Caching** (Redis, Memcached, CDN) | Eliminate repeat computation or database reads |
| **Database Indexing** | Eliminate full table scans |
| **Async / Parallelism** | Execute independent operations concurrently instead of sequentially |
| **Connection Pooling** | Eliminate connection establishment overhead |
| **gRPC + Protocol Buffers** | Replace verbose JSON REST with binary serialization |
| **Edge Computing / CDN** | Move computation closer to the user |
| **Precomputation / Pre-warming** | Cache computed results before the user asks (e.g., pre-generate the daily report at 6am) |
