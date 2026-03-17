---
title: Throughput
sidebar_label: Throughput
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Throughput

**Throughput** is the number of operations a system can process per unit of time. For a web service, this is typically expressed as **Requests Per Second (RPS)** or **Transactions Per Second (TPS)**.

While **Latency** measures how fast *one* request is processed, **Throughput** measures how many requests can be processed *simultaneously*.

---

## Latency vs. Throughput Trade-offs

Latency and throughput are related but not the same, and can sometimes be in tension:

- **Batching** increases throughput by processing many requests together, but increases average latency (a request must wait for the batch to fill up).
- **Pipelining** increases throughput by overlapping operations, sometimes at the cost of additional complexity.

For a given system capacity, you can usually trade one for the other.

---

## Factors That Limit Throughput

### Thread Pool Size
A synchronous, blocking server can only handle as many concurrent requests as it has threads. Threads are expensive (each uses ~1MB of stack). A 1000-thread pool maxes out at 1000 concurrent requests.

**Solution:** Switch to a non-blocking, event-loop model (Node.js, Java Reactive with Project Reactor, Go) where a handful of threads can multiplex thousands of concurrent I/O operations.

### Database Throughput
The database is usually the bottleneck. A single primary RDBMS has a finite write TPS (Amazon Aurora PostgreSQL can do ~60k write IOPS with io2 storage). 

**Solutions:** Connection pooling (PgBouncer), read replicas, write sharding, NoSQL alternatives for write-heavy loads.

### Network Bandwidth
If responses are large (megabytes of data), network bandwidth limits how many responses can be sent per second.

**Solutions:** Response compression (gzip, brotli), pagination (avoid returning 10,000 rows at once), binary serialization formats.

---

## Little's Law

**Little's Law** is a fundamental theorem from queuing theory that relates three system metrics:

```
L = λ × W
```

Where:
- **L** = Average number of requests in the system (concurrency)
- **λ** = Average throughput (requests per second)
- **W** = Average latency (seconds per request)

*Example:* If your service processes 500 RPS with an average latency of 200ms, then at any given moment there are `500 × 0.2 = 100` requests in-flight simultaneously. You need at least 100 thread slots (or async I/O capacity) to handle this.

---

## Increasing Throughput

1. **Horizontal Scaling:** Add more application server instances behind a load balancer.
2. **Caching:** Serve cached responses without hitting the database at all.
3. **Async / Non-blocking I/O:** Handle more concurrent requests per thread.
4. **Efficient Serialization:** Reduce CPU time spent on JSON parsing (use Protocol Buffers).
5. **Database Optimization:** Query optimization, read replicas, connection pooling.
