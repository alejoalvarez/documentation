---
title: Efficiency
sidebar_label: Efficiency
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Efficiency

**Efficiency** in software architecture refers to the ability of a system to accomplish its goals while consuming the minimum necessary resources — CPU time, memory, network bandwidth, and cloud spend.

An efficient system delivers the same value at a significantly lower cost, or significantly more value at the same cost.

---

## Why Efficiency Matters

- **Cost:** Cloud infrastructure is billed by usage. Inefficient code running on 50 EC2 instances could be replaced by efficient code on 5.
- **Latency:** Efficient algorithms produce faster responses, directly improving the user experience.
- **Environmental Impact:** Less compute = less energy consumption = smaller carbon footprint.
- **Capacity:** An efficient system has more headroom to absorb traffic spikes without needing to scale.

---

## Efficiency at the Algorithm Level

The most impactful improvements come from choosing the right algorithm. A poor algorithm choice can be many orders of magnitude slower than a good one, regardless of the hardware.

| Algorithm | Time Complexity | Use for |
|-----------|----------------|---------|
| Linear search | O(n) | Small, unsorted arrays |
| Binary search | O(log n) | Large, sorted arrays |
| HashMap lookup | O(1) average | Frequent key lookups |
| Nested loop join | O(n²) | Avoid for large datasets |

---

## Efficiency at the System Level

### Connection Pooling
Instead of opening a new database connection for every request (expensive!), maintain a pool of pre-opened connections that can be reused. Libraries like HikariCP (Java) handle this automatically.

### Caching
Avoid re-computing or re-fetching data that hasn't changed. Caching at the right layer (in-memory, Redis, CDN) can reduce database load by 90%+ for read-heavy workloads.

### Async and Non-Blocking I/O
Instead of blocking a thread while waiting for a database response (wasting CPU), use async/event-driven approaches (Node.js, Java Reactive, Go routines) to handle many concurrent requests on fewer threads.

### Batching
When writing to a database or calling an external API, group multiple operations into a single request instead of making individual calls.

```java
// Inefficient: N individual database inserts
for (User user : newUsers) {
    database.insert(user); // N round trips to DB
}

// Efficient: One batch insert
database.bulkInsert(newUsers); // 1 round trip to DB
```

---

## Efficiency vs. Premature Optimization

> *"Premature optimization is the root of all evil."* — Donald Knuth

This means: don't obsess over micro-optimizations before you have measured where the actual bottleneck is. First, **profile** your system to find the real bottleneck, then optimize *that* specific bottleneck.

A common approach:
1. Make it work correctly.
2. Make it clearly readable and maintainable.
3. **Measure** performance against SLOs.
4. If SLOs are not met, **profile** to find the bottleneck.
5. Optimize the bottleneck.
