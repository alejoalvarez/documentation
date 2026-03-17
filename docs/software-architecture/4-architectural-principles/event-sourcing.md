---
title: Event Sourcing
sidebar_label: Event Sourcing
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Event Sourcing

**Event Sourcing** is an architectural pattern where instead of storing just the current state of an entity, you store the full sequence of events that led to the current state.

Instead of `UPDATE orders SET status = 'SHIPPED' WHERE id = 123`, you append an event like `OrderShipped { orderId: 123, timestamp: ... }` to an immutable log.

The current state of any entity is always derived by **replaying** all events from the beginning.

---

## Why Event Sourcing?

Traditional "CRUD" databases only store the latest snapshot of data. If a user's account balance is $1,200 right now, there is no inherent way to know *why*. Was it one large deposit? Multiple small purchases? An administrative adjustment?

Event Sourcing provides a complete, immutable audit trail of every change that has ever occurred in the system.

---

## Core Concepts

### Events
An **Event** is an immutable fact about something that happened in the past. Events are always named in the past tense.

*Examples:*
- `UserRegistered { userId, email, timestamp }`
- `OrderPlaced { orderId, items[], totalAmount, timestamp }`
- `OrderCanceled { orderId, reason, timestamp }`
- `MoneyWithdrawn { accountId, amount, timestamp }`

### Event Store
Instead of a traditional database table storing the current row state, an **Event Store** is an append-only log (like a database table or Apache Kafka) that stores every event in ordered sequence. Events are never modified or deleted.

### Aggregate Rehydration
To get the "current state" of an `Order`, the system replays all events that have an `orderId` matching the order we want:

```java
// Pseudo-code for rehydrating an Order aggregate
List<Event> events = eventStore.getEventsForAggregate("order-123");
Order order = new Order(); // empty state
for (Event event : events) {
    order.apply(event); // rebuild state step by step
}
// order.status is now the correct current state
```

---

## Benefits

1. **Complete Audit Log:** Every state change is immutable and recorded. This is invaluable for regulated industries like banking and healthcare.
2. **Temporal Queries:** Query the state of any entity at any point in time by replaying only events up to that timestamp. ("What did the customer's order look like at 3pm on March 5th?")
3. **Event Replay:** Replay events to retroactively correct bugs, migrate data to a new schema, or populate a brand-new read model (projection).
4. **Decoupled Consumers:** Multiple services can subscribe to the same event stream and independently build their own read-optimized projections of the data.

---

## Challenges

- **Complexity:** Significantly more complex than a simple CRUD approach.
- **Eventual Consistency:** Read models are often built asynchronously, so there is a brief period where queries may return slightly stale data.
- **Schema Evolution:** Changing the shape of an event is tricky when thousands of old events of the previous shape exist in the store.

---

## Event Sourcing + CQRS

Event Sourcing is almost always paired with **CQRS (Command Query Responsibility Segregation)**. Commands write events to the Event Store; projections (queries) build optimized, denormalized read models from the event stream. See [CQRS](./cqrs.md) for more detail.

---

## Real Use Cases
- **Banking & Finance:** Ledger systems where every financial transaction must be immutably recorded.
- **E-commerce Order Management:** Track every state change of an order from placement to delivery.
- **Analytics & BI Pipelines:** Event streams feed into Apache Kafka, which feeds data warehouses in near-real time.
- **Collaborative Editing (e.g., Google Docs):** Every keystroke is an event; the document's state is a projection of all keystrokes.
