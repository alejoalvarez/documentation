---
title: Observability
sidebar_label: Observability
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Observability

**Observability** is the ability to understand the internal state of a system by examining its external outputs. A system is considered "observable" if you can answer questions about its behavior and health without deploying new code or adding additional instrumentation on-the-fly.

The term originates from control theory, and was popularized in software engineering by the rise of distributed microservices, where understanding a single user request's journey across dozens of services is otherwise nearly impossible.

---

## The Three Pillars of Observability

Observability stands on three foundational data types, often called the "Three Pillars":

### 1. Metrics
Numeric, time-series data measuring something in aggregate over time.
- *Examples:* CPU usage (%), HTTP request rate (req/s), P99 latency (ms), error rate (%), database connection pool usage.
- **Tools:** Prometheus, CloudWatch, DataDog, Grafana.

### 2. Logs
Discrete, timestamped records of events that occurred within a system.
- *Examples:* Error stack traces, user authentication events, payment processing records.
- **Tools:** Elasticsearch + Kibana (ELK Stack), CloudWatch Logs, Datadog Logs, Loki + Grafana.

### 3. Traces
A record of a single request's complete journey across multiple services. Each service's work on the request is one "span," and together the spans form a "trace."
- *Example:* Tracing a checkout purchase as it flows from API Gateway → Order Service → Payment Service → Inventory Service → Notification Service.
- **Tools:** Jaeger, Zipkin, AWS X-Ray, Datadog APM.

---

## Observability vs. Monitoring

These terms are often confused:

- **Monitoring** asks: *"Is the system healthy right now?"* You define known failure conditions upfront (thresholds) and alert when they are breached. It is reactive.
- **Observability** asks: *"Why is the system behaving this way?"* It gives you the tools to explore and debug unknown failure modes you didn't predict. It is exploratory.

A well-monitored system tells you *that* something is broken. A well-observable system tells you *where and why* it is broken.

---

## The "Shift Left on Observability" Practice

Modern engineering philosophy advocates building observability into services from day one:

1. **Instrument your code** with structured logging from the start.
2. **Emit custom business metrics** (e.g., `orders_placed_per_minute`, `payment_failures_per_hour`).
3. **Propagate trace context** (a `traceId` and `spanId` header) on every outbound service call.
4. **Define SLOs** (Service Level Objectives) and alert on SLO budget burns, not just metric thresholds.

---

## Real Use Cases

- **E-Commerce:** Tracing a slow checkout to discover that a third-party payment gateway is adding 4 seconds of latency.
- **Microservices Cluster:** Discovering that a high error rate on the `OrderService` is caused by a cascading failure originating in the `InventoryService`.
- **Proactive Capacity Planning:** Using historical metric trends to predict when current infrastructure will be insufficient before it actually becomes insufficient.
