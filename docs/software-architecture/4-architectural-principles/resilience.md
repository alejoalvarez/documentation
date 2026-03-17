---
title: Resilience
sidebar_label: Resilience
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Resilience

**Resilience** is a system's ability to withstand and recover gracefully from unexpected failures, adversarial conditions, and high-load situations, while continuing to provide a meaningful service level to its users.

A resilient system doesn't just avoid failures — it anticipates them, contains their blast radius, and recovers automatically.

---

## Resilience vs. Reliability vs. Availability

| Quality | Definition |
|---------|-----------|
| **Reliability** | System consistently produces correct results |
| **Availability** | System is up and accessible |
| **Resilience** | System withstands and recovers from failures gracefully |

Resilience is the *active* quality — it's what allows the other two to hold in adversarial conditions.

---

## The Pillars of Resilience

### 1. Redundancy
Never have a single point of failure. Every critical component should have at least one backup. Use multi-AZ (Availability Zone) deployments for databases and services.

### 2. Circuit Breaker
Stop sending requests to a service that is failing. This prevents cascading failures across the whole system. (See [Circuit Breaker](./circuit-breaker.md)).

### 3. Bulkhead Isolation
Isolate different parts of the system so that a failure in one part doesn't consume resources needed by another. Named after the watertight compartments in ship hulls.

*Example:* Give each downstream dependency its own dedicated thread pool. If the Payment Service becomes slow and its thread pool fills up, it doesn't starve the thread pool used by the Inventory Service.

### 4. Timeout
Never wait forever for a response. Set aggressive timeouts on all network calls so that a slow dependency doesn't cascade into your service becoming slow too.

### 5. Retry with Backoff
Transiently retry failed requests with exponential backoff, but don't retry indefinitely. Combine with a circuit breaker to avoid retry storms.

### 6. Graceful Degradation
Design fallback behaviors so that if a non-critical dependency fails, the core user experience still works in a reduced capacity.

*Example:* If the personalization service is down, show a generic product list instead of a personalized one.

---

## Chaos Engineering
**Chaos Engineering** is the discipline of proactively injecting failures into a production system to discover resilience weaknesses before an uncontrolled failure occurs.

Netflix's **Chaos Monkey** famously terminates random production instances to continuously verify that the system can survive instance loss. This culture ensures that resilience mechanisms are not just theoretical — they are continuously proven in production.
