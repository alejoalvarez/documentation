---
title: Onion Architecture
sidebar_label: Onion Architecture
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Onion Architecture

**Onion Architecture** was introduced by Jeffrey Palermo in 2008. Like an onion, it is structured in concentric layers, where the innermost layers contain business logic and the outermost layers contain infrastructure concerns.

It is conceptually very similar to Hexagonal and Clean Architecture, but was formalized independently. Together, these three are often referred to as "the family of clean architecture patterns."

---

## The Core Dependency Rule

Like a real onion, you can only peel inward. **Dependencies flow from outside to inside.** Outer layers know about inner layers, but inner layers know **nothing** about outer layers.

```
+-------------------------------------------+
|  Infrastructure (Databases, Web, UI)        |
|  +--------------------------------------+  |
|  |  Application Services (Use Cases)    |  |
|  |  +-------------------------------+   |  |
|  |  |  Domain Services              |   |  |
|  |  |  +------------------------+   |   |  |
|  |  |  |  Domain Model (Core)   |   |   |  |
|  |  |  |   Entities & VOs       |   |   |  |
|  |  |  +------------------------+   |   |  |
|  |  +-------------------------------+   |  |
|  +--------------------------------------+  |
+-------------------------------------------+
         Dependencies point INWARD -->
```

---

## The Layers

### 1. Domain Model (Core — Innermost)
The very center contains **Entities** and **Value Objects**. These are pure business objects with no dependencies whatsoever — no framework imports, no database annotations, no HTTP types.

### 2. Domain Services
Sits just outside the Domain Model. Implements business operations that don't naturally belong to a single Entity. Depends only on the Domain Model layer.

*Example:* `PricingService` that calculates order prices using several different `Product` entities and discount rules.

### 3. Application Services (Use Cases)
Orchestrates the flow of a complete use case, coordinating Domain Services and Repositories. This layer defines **Repository Interfaces** (contracts for how data is persisted), but does not implement them.

*Example:* `OrderApplicationService.placeOrder(dto)` — validates, creates an Order entity, calls `PricingService`, calls `orderRepository.save()`.

### 4. Infrastructure (Outermost)
Contains the concrete implementations of everything the inner layers defined as interfaces: database repositories, email senders, REST controllers, queue publishers, etc.

---

## How It Differs from Classic Layered Architecture

| Classic Layered | Onion Architecture |
|---|---|
| UI → Business Logic → Data Layer | Domain Core → App Services → Infrastructure |
| Data layer is the foundation | Domain Model is the foundation |
| Business logic often depends on data access layer | Business logic has zero database dependencies |
| Frameworks can invade business logic | Frameworks are strictly contained in the outer layer |

---

## Example: E-Commerce Order Flow

1. **HTTP Request** hits `OrderController` (Infrastructure layer).
2. `OrderController` calls `OrderApplicationService.placeOrder(dto)` (Application Services layer).
3. `OrderApplicationService` creates an `Order` entity (Domain Model layer).
4. `OrderApplicationService` calls `PricingService.calculateTotal(order)` (Domain Services layer).
5. `OrderApplicationService` calls `orderRepository.save(order)` — but `orderRepository` is an **interface** defined in the Application layer.
6. The **concrete** `JpaOrderRepository` (Infrastructure layer) picks up the call and executes the SQL.

The Domain Model and Domain Services have zero knowledge of SQL, HTTP, or Spring. They could be tested with a simple `ArrayList` as the "repository."
