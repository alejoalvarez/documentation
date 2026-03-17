---
title: Logging
sidebar_label: Logging
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Logging

**Logging** is the practice of recording discrete, timestamped events that occur during the execution of a software application. Logs are the most fundamental form of observability and are often the first place engineers look when diagnosing a problem.

---

## Log Levels

Most logging frameworks follow a severity hierarchy. Only log at the appropriate level:

| Level | When to Use | Example |
|-------|-------------|---------|
| **TRACE** | Extremely detailed debug info (usually disabled in production) | Entering method `calculateTax` with params `{amount: 100}` |
| **DEBUG** | Detailed information for diagnosing problems | `Found 3 matching records in DB for userId=42` |
| **INFO** | Normal operational events, key milestones | `Order #8823 placed successfully by userId=42` |
| **WARN** | Something unexpected happened, but the system recovered | `Payment gateway timeout. Retrying (attempt 2/3)...` |
| **ERROR** | A serious failure occurred; an operation did not complete | `Failed to save order #8823: DB connection refused` |
| **FATAL** | A catastrophic failure; the application will shut down | `Cannot connect to database on startup. Exiting.` |

---

## Structured Logging

Avoid plain text log messages. Use **Structured Logging**, which outputs logs in machine-parseable JSON format. This makes logs easily searchable, filterable, and aggregatable in log management tools.

**Bad (Plain Text Logging):**
```
2024-03-17 10:30:01 ERROR Failed to process payment for order 8823
```

**Good (Structured JSON Logging):**
```json
{
  "timestamp": "2024-03-17T10:30:01Z",
  "level": "ERROR",
  "service": "payment-service",
  "traceId": "abc-123-xyz",
  "spanId": "def-456",
  "orderId": "8823",
  "userId": "42",
  "message": "Payment processing failed",
  "error": "Gateway timeout after 5000ms",
  "attempt": 3
}
```

With structured logs: filtering every error for `orderId=8823` across all services is a single query. With plain text logs, it's a regex nightmare.

---

## Logging Best Practices

1. **Include a Trace/Correlation ID:** Every log line should include a `traceId` that ties all log lines from a single user request together, even across multiple services.
2. **Never log sensitive data:** Do not log passwords, full credit card numbers, social security numbers, or API secrets.
3. **Log at boundaries:** Log incoming requests and outgoing responses at service boundaries (e.g., the start and end of an HTTP request).
4. **Use a centralized log aggregator:** In a distributed system, logs from all services must be shipped to a central location (e.g., ELK Stack, CloudWatch Logs, Datadog) for cross-service correlation.
5. **Set appropriate retention policies:** Logs are expensive to store. Define retention policies aligned with debugging needs and legal compliance requirements.

---

## Popular Logging Stack

```
Application (emits JSON logs)
    → Log Shipper (Fluentd, Logstash, Fluent Bit)
        → Log Storage (Elasticsearch, CloudWatch, Loki)
            → Visualization (Kibana, Grafana)
```
