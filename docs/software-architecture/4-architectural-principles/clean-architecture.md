---
title: Clean Architecture
sidebar_label: Clean Architecture
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Clean Architecture

**Clean Architecture** was formalized by Robert C. Martin (Uncle Bob) in his 2017 book. It builds on previous architectural ideas (Hexagonal Architecture, Onion Architecture) to propose a universal, language-agnostic structure for all software systems.

The central theme is the **Dependency Rule**: *source code dependencies can only point inward.* Nothing in an inner circle can know anything about something in an outer circle.

---

## The Concentric Circles

Clean Architecture is often depicted as a series of concentric circles, each representing a different area of software. The further inward you go, the higher the level of policy (business); the further outward, the lower the level (infrastructure detail).

### Circle 1 — Entities (Innermost)
Enterprise-wide Business Rules. These are the core objects of the business—the most stable and least likely to change. They should have absolutely zero knowledge of databases, frameworks, or UI.

*Examples:* `Order`, `Customer`, `Payment` — plain domain objects with business rule methods directly embedded.

### Circle 2 — Use Cases
Application-specific Business Rules. These contain the orchestration logic for each use case of the system (e.g., "Create Order," "Cancel Subscription," "Process Payment"). They know about Entities but know nothing about the web, database, or UI.

### Circle 3 — Interface Adapters
A set of adapters that convert data from the format most convenient for Use Cases and Entities, to the format most convenient for some external agency such as the web or database. This is where **Controllers**, **Presenters**, and **Gateways** (Repository interfaces) live.

### Circle 4 — Frameworks & Drivers (Outermost)
The outermost ring is composed of frameworks and tools: the database, the web framework, message queues, etc. The code in this layer "plugs in" to the inner circles via the Interface Adapters. This is intentionally the **most volatile** layer — you should be able to swap Spring Boot for Micronaut or PostgreSQL for MongoDB without ever touching use case or entity code.

---

## The Dependency Rule Illustrated

```
+---------------------------------------------------------+
|  Frameworks & Drivers (Spring, React, Hibernate)        |
|  +-------------------------------------------------+    |
|  |  Interface Adapters (Controllers, Repositories) |    |
|  |  +-------------------------------------------+  |    |
|  |  |  Use Cases (Application Business Rules)   |  |    |
|  |  |  +-----------------------------------+    |  |    |
|  |  |  |  Entities (Enterprise Rules)      |    |  |    |
|  |  |  |  (Core Domain Objects)            |    |  |    |
|  |  |  +-----------------------------------+    |  |    |
|  |  +-------------------------------------------+  |    |
|  +-------------------------------------------------+    |
+---------------------------------------------------------+
   Dependencies flow INWARD only ---->
```

---

## Example Project Structure

```
src/
├── domain/                 (Entities - Circle 1)
│   ├── entities/
│   │   └── Order.java
│   └── exceptions/
│       └── OrderNotFoundException.java
│
├── application/            (Use Cases - Circle 2)
│   ├── usecases/
│   │   └── CreateOrderUseCase.java
│   └── ports/              (Boundary Interfaces)
│       └── out/
│           └── OrderRepository.java   (interface, no SQL)
│
├── adapters/               (Interface Adapters - Circle 3)
│   ├── controllers/
│   │   └── OrderController.java       (Spring REST Controller)
│   └── persistence/
│       └── JpaOrderRepository.java    (implements OrderRepository)
│
└── config/                 (Frameworks & Drivers - Circle 4)
    └── AppConfig.java
```

---

## Key Benefits

- **Testability:** The entire application can be tested without any framework, database, UI, or web server.
- **Framework Independence:** The business logic never imports from Spring, Django, or any framework. Frameworks are just tools, not the foundation.
- **Database Independence:** You can swap SQL for NoSQL or vice versa. Business rules are not bound to a specific storage technology.
