---
title: Reliability
sidebar_label: Reliability
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Reliability

**Reliability** is the probability that a system will perform its required function correctly for a specified period under stated conditions. A reliable system is one you can depend on to produce correct, consistent results — not just one that is "up."

---

## Key Reliability Metrics

| Metric | Full Name | Measures |
|--------|-----------|---------|
| **MTBF** | Mean Time Between Failures | Average time between system failures (higher is better) |
| **MTTR** | Mean Time To Repair/Recover | Average time to restore service after a failure (lower is better) |
| **Error Rate** | — | Percentage of requests that return an error response |

---

## Fault Tolerance as a Foundation for Reliability

Faults are inevitable in distributed systems. Reliable systems are built to **tolerate faults** without impacting users.

### Retries with Exponential Backoff
When a remote service call fails transiently (network blip, momentary overload), automatically retry the request with increasing delays between attempts.

```java
// Retry with exponential backoff (pseudo-code)
for (int attempt = 1; attempt <= 3; attempt++) {
    try {
        return callExternalPaymentService(request);
    } catch (TransientException e) {
        if (attempt == 3) throw e;
        Thread.sleep((long) Math.pow(2, attempt) * 100); // 200ms, 400ms
    }
}
```

### Idempotency
Design write operations so they can be safely retried without causing duplicate side effects. 

*Example:* A payment API should accept a `requestId`. If the same `requestId` is submitted twice (because the first succeeded but the response was lost), the second call should return the result of the first charge — not charge the card twice.

### Circuit Breaker Pattern
Prevent a cascade failure (where one slow service causes all callers to also block and timeout) by detecting sustained failures and "opening the circuit" — immediately rejecting requests to the failing service for a cooldown period.

### Chaos Engineering
Proactively inject failures into your production system (Netflix's "Simian Army / Chaos Monkey") to verify that your fault tolerance mechanisms actually work before a real incident occurs.

---

## Testing Reliability

Reliability testing strategies include:
- **Fault injection testing:** Intentionally kill pods, introduce network latency, simulate DB outages.
- **Game Days:** Simulated failure scenarios where the on-call team practices responding to incidents.
- **Runbooks:** Pre-written, verified playbooks for common failure modes.
