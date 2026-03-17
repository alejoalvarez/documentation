---
title: Flexibility
sidebar_label: Flexibility
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Flexibility

**Flexibility** in software architecture is the capacity of a system to adapt to changing requirements, business conditions, and technology landscapes with minimal rework. A flexible system can accommodate new features, changed processes, and shifting constraints without requiring a full rewrite.

---

## Flexibility vs. Extensibility vs. Adaptability

These terms are closely related but distinct:
- **Extensibility:** Adding new capabilities (adding new payment methods).
- **Flexibility:** Changing existing behavior (changing validation rules).
- **Adaptability:** Surviving major environmental changes (migrating from on-premise to cloud).

---

## Achieving Flexibility

### 1. Configuration Over Code
Behavior that is likely to change should be driven by configuration, not hardcoded in source code.

```yaml
# Instead of hardcoding feature flags and thresholds in code:
feature-flags:
  new-checkout-flow: true
  
business-rules:
  max-retry-attempts: 3
  payment-timeout-seconds: 10
```

### 2. Feature Flags (Feature Toggles)
Enable or disable specific features at runtime without deploying new code. This decouples deployment from release and enables:
- **Canary releases:** Enable the feature for 1% of users first.
- **A/B testing:** Show different behaviors to different user segments.
- **Emergency kill switches:** Instantly disable a problematic feature.

Popular tools: **LaunchDarkly**, **GrowthBook**, **AWS AppConfig**, **Unleash**.

### 3. Rule Engines
For frequently changing business logic (pricing rules, discount logic, compliance checks), consider a rule engine (Drools, Easy Rules) that allows business analysts to modify rules without code deployments.

### 4. Pluggable Architecture
See [Extensibility](./extensibility.md) — design hotspots as explicit extension points where different implementations can be plugged in.

---

## The Cost of Flexibility

Flexibility has a real cost in complexity and abstraction. Not every part of the system needs to be flexible. Focus architectural flexibility investments on:
- Business rules that change frequently.
- Integration points with third-party services.
- Regulatory and compliance requirements that vary by jurisdiction.
- Pricing, discount, and fee structures.
