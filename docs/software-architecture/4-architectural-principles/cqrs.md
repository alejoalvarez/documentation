---
title: CQRS
sidebar_label: CQRS
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# CQRS (Command Query Responsibility Segregation)

**CQRS** is an architectural pattern that separates read operations (Queries) from write operations (Commands) into entirely distinct models. The term was coined by Greg Young and builds on the CQS (Command-Query Separation) principle by Bertrand Meyer.

> *"Reads and writes are fundamentally different concerns and should be treated as such."*

---

# Structure
```text
  
  WRITE                          READ
  │                              │
  ├─> Command Handler      <─────┤
  │   ├─> Validate               │
  │   ├─> Execute                │
  │   └─> Save Event ────> Event Bus ─> Event Handler
  │                              │
  │                         Update Read Model

```


## The Problem with a Unified Model

In a traditional CRUD application, a single domain model (e.g., an `Order` class backed by a single database table) is used for both:
- **Writing:** Validating business rules, applying state changes.
- **Reading:** Displaying data, generating reports, feeding dashboards.

As systems grow, the read and write requirements diverge dramatically:
- **Reads** are frequent, often complex (multiple JOINs), and must be fast. They don't need business rule validation.
- **Writes** are less frequent, transactional, and complex from a business logic perspective. They don't need complex JOINs.

Trying to optimize a single model for both concerns leads to performance bottlenecks and architectural compromises.

---

## The Two Sides of CQRS

### Commands (Write Side)
- A Command is an **intent to change something** (e.g., `CreateOrderCommand`, `CancelOrderCommand`).
- Commands go through the full business logic validation pipeline.
- The write-side model is typically the fully-validated, rule-enforcing domain model (often backed by an RDBMS or Event Store in Event Sourcing).
- Commands return **nothing** (void) or a simple acknowledgement ID. They do NOT return data.

```java
// Command
public record CreateOrderCommand(String customerId, List<String> productIds) {}

// Command Handler
public class CreateOrderHandler {
    public void handle(CreateOrderCommand cmd) {
        // Full business logic validation here
        Order order = Order.create(cmd.customerId(), cmd.productIds());
        orderRepository.save(order);
    }
}
```

### Queries (Read Side)
- A Query is a **request for data** (e.g., `GetOrderByIdQuery`, `ListRecentOrdersForCustomerQuery`).
- Queries **bypass** the domain model entirely. They read from a separate, read-optimized store.
- The read-side model is a **Projection** (a denormalized view of the data, perfectly shaped for the UI or API consumer).
- Queries do NOT modify state. They return data.

```java
// Query — reads directly from an optimized read store (e.g. a flattened SQL view or a separate DB)
public class GetOrderSummaryQuery {
    public OrderSummaryDTO execute(String orderId) {
        // No domain validation, no business logic — just read and return
        return readDatabase.query("SELECT * FROM order_summary_view WHERE id = ?", orderId);
    }
}
```

---

## Simple CQRS vs. Full CQRS

| Level | Description |
|-------|-------------|
| **Simple CQRS** | Same database, but the application code separates Command and Query code paths. |
| **Full CQRS** | Physically separate databases: a write database (normalized, ACID) and one or more read databases (e.g., Elasticsearch, a Redis cache, a denormalized PostgreSQL read replica). Writes are propagated to read stores asynchronously. |

---

## Real Use Cases

- **E-commerce:** Write side handles strict stock reservation; read side serves a fast, pre-sorted product catalogue from Elasticsearch.
- **Banking dashboards:** Transaction commands go to ACID RDBMS; dashboards query from a pre-aggregated read model updated in near-real time.
- **Social feeds:** Posting content writes to a primary store; reading a timeline queries a pre-computed, user-personalized feed cache.
