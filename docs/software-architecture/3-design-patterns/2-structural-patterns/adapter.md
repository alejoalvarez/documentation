---
title: Adapter
sidebar_label: 3 - Adapter
displayed_sidebar: softwareArchitectureSidebar
tags: [structural-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Structural Patterns</span>

# Adapter

- Purpose: Adapt incompatible interfaces
- Use case: Integration with legacy libraries and plugin adapters

```java
// Legacy class with a different interface
public class LegacyPaymentSystem {
  public void processPayment(String accountNumber, double amount) { ... }
}

// Expected new interface
public interface PaymentProcessor {
  void pay(PaymentDetails details);
}

// Adapter
public class PaymentAdapter implements PaymentProcessor {
  private LegacyPaymentSystem legacySystem;
  
  @Override
  public void pay(PaymentDetails details) {
    legacySystem.processPayment(details.account, details.amount);
  }
}
```