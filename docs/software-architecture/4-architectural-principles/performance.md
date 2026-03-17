---
title: Performance
sidebar_label: Performance
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Performance

**Performance** is a broad quality attribute encompassing how well a system uses its resources to respond promptly to user requests and processes data under load. It is typically measured across several sub-dimensions: latency, throughput, and resource utilization.

---

## Performance Dimensions

| Dimension | Measures | Goal |
|-----------|---------|------|
| **Latency** | Time for a single request to complete | Minimize (see [Latency](./latency.md)) |
| **Throughput** | Requests processed per unit time | Maximize (see [Throughput](./throughput.md)) |
| **Resource Utilization** | CPU, memory, disk, network usage | Optimize (see [Resource Utilization](./resource-utilization.md)) |

---

## Performance Engineering Mindset

Performance is not a feature to add later — it is a quality attribute to engineer for from the beginning. Key architectural decisions that determine performance outcomes:

### 1. Data Access Patterns
The single biggest performance impact in most applications. 

- Use database indexes strategically on query-heavy columns.
- Avoid N+1 query problems (fetching a list of items, then querying each item individually in a loop).
- Use database connection pooling.
- Cache frequently read data.

**N+1 Problem Example:**
```java
// BAD: N+1 queries — 1 query to get all orders + 1 query per order to get its customer
List<Order> orders = orderRepo.findAll();
for (Order order : orders) {
    Customer customer = customerRepo.findById(order.getCustomerId()); // N queries!
}

// GOOD: 1 query with a JOIN
List<OrderWithCustomer> results = orderRepo.findAllWithCustomers(); // JOIN in SQL
```

### 2. Asynchronous Processing
Move long-running, non-user-facing work (sending emails, generating reports, processing images) off the critical request path and onto background workers via message queues (SQS, Kafka, RabbitMQ). The user gets an instant `202 Accepted` response.

### 3. Connection Pooling
Opening a new database or HTTP connection for every request is expensive. Connection pools maintain a set of pre-opened, ready-to-use connections.

### 4. CDN for Static Assets
Serve static assets (images, CSS, JS) from a Content Delivery Network (CDN) whose edge nodes are geographically close to the user, dramatically reducing latency.

---

## Performance Profiling

> *"Measure first, optimize second."*

Never optimize without first profiling to find the actual bottleneck. Tools:
- **APM (Application Performance Monitoring):** Datadog, New Relic — profiles real production traffic.
- **Java Profilers:** JProfiler, async-profiler — CPU and memory flame graphs.
- **Database Query Analyzers:** `EXPLAIN ANALYZE` in PostgreSQL; `EXPLAIN` in MySQL.
- **Browser DevTools:** Network panel to identify slow assets; Lighthouse for web performance scores.
