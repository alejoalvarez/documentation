---
title: Circuit Breaker
sidebar_label: Circuit Breaker
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Circuit Breaker

The **Circuit Breaker** is a resilience pattern that prevents a system from repeatedly calling a failing service, giving the failing service time to recover while protecting the caller from cascading failures.

It is named after an electrical circuit breaker that "trips" (opens) to stop current flow when it detects a short circuit — protecting the circuit from damage.

---

## The Problem: Cascading Failures

In a distributed system, if Service A depends on Service B, and Service B becomes very slow (due to overload or a bug), Service A's threads will stack up waiting for responses. Eventually Service A becomes slow too. If Service C depends on A, it cascades further. This is a **cascading failure**.

---

## The Three States of a Circuit Breaker

### 1. Closed (Normal Operation)
All requests pass through. The circuit breaker monitors for failures. If the failure rate stays below the threshold, it remains closed.

### 2. Open (Tripped State)
The failure threshold was exceeded. The circuit breaker immediately rejects all requests with a `CircuitBreakerOpenException` (no actual calls to the downstream service). This gives the downstream service time to recover, and protects upstream services from wasted threads.

### 3. Half-Open (Recovery Probe)
After a configured wait period (e.g., 30 seconds), the circuit breaker allows a limited number of "probe" requests through to test if the downstream service has recovered.
- If the probe requests succeed → Circuit transitions back to **Closed**.
- If the probe requests fail → Circuit transitions back to **Open** and waits again.

```
    Success Rate OK          Too Many Failures
[CLOSED] ──────────── … ──→ [OPEN]
   ↑                            │ (wait cooldown period)
   │ Probes succeed             ↓
   └────────────── [HALF-OPEN] ──→ (probes fail) → [OPEN]
```

---

## Example with Resilience4j (Java)

```java
@CircuitBreaker(name = "paymentService", fallbackMethod = "paymentFallback")
public PaymentResponse processPayment(PaymentRequest request) {
    return paymentClient.charge(request); // actual call to external service
}

// Fallback when circuit is open
public PaymentResponse paymentFallback(PaymentRequest request, Exception ex) {
    return PaymentResponse.queued("Payment will be processed shortly");
}
```

The `@CircuitBreaker` annotation from Resilience4j handles all state tracking and transitions automatically, based on configurable thresholds (e.g., open circuit if failure rate > 50% in a 10-request sliding window).

---

## Key Configuration Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `failureRateThreshold` | % failures to trip the circuit | 50% |
| `waitDurationInOpenState` | How long to stay open before probing | 30 seconds |
| `permittedCallsInHalfOpenState` | How many probe calls to allow | 3 |
| `slidingWindowSize` | How many recent calls to evaluate | 10 |
