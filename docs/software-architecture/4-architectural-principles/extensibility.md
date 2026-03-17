---
title: Extensibility
sidebar_label: Extensibility
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Extensibility

**Extensibility** is a design principle that refers to a system's ability to be extended with new functionality without modifying existing, working code. An extensible system makes adding new features straightforward, cheap, and low-risk.

Extensibility is the practical application of the **Open-Closed Principle (OCP)** from SOLID at the system design level.

---

## The Core Problem with Non-Extensible Systems

In a non-extensible system, adding a new feature requires:
1. Finding and modifying existing logic.
2. Introducing the risk of breaking something that was already working.
3. Requiring heavy regression testing of existing functionality just to validate a new addition.

---

## Patterns for Extensibility

### 1. Plug-in / Extension Point Architecture
Define formal extension points where new functionality can be registered and discovered without touching the core codebase.

*Examples:*
- **VSCode Extensions:** The editor core defines APIs; extensions add features without modifying VSCode itself.
- **Spring Boot `@Autowired` beans:** Define a new `PaymentProcessor` implementation, register it as a Bean; Spring discovers and injects it.
- **Webpack Plugins/Loaders:** The bundler core is stable; plugins extend it.

### 2. Strategy Pattern
Encapsulate interchangeable algorithms behind an interface. Adding a new algorithm means adding a new class that implements the interface — zero modification to existing code.

```java
public interface ShippingCostStrategy {
    double calculate(Order order);
}

// Adding a new shipping option = adding a new class, NOT modifying existing classes
public class SameDayShipping implements ShippingCostStrategy {
    public double calculate(Order order) { return order.getWeight() * 15.0; }
}
```

### 3. Event-Driven Architecture
Producers publish events without knowing who consumes them. New functionality is added by spinning up a new consumer that reacts to existing events.

*Example:* An `OrderPlaced` event already exists. To add a new feature (e.g., "send a Slack notification when an order is placed"), you add a new Slack consumer listening to that event. Zero change to the `OrderService` or other consumers.

### 4. Webhook Systems
Provide external extensibility by letting users/partners register callbacks (webhooks) that are triggered on system events. This is how Stripe allows businesses to react to payment events without Stripe building every possible integration themselves.

---

## Extensibility vs. Over-Engineering

Just like YAGNI cautions against building features you don't need, you should avoid building extension points for scenarios you haven't identified yet. Build extensibility at proven hotspots (payment methods, notification channels, authentication providers), not everywhere.
