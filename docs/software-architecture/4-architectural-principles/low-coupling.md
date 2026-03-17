---
title: Low Coupling
sidebar_label: Low Coupling
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Low Coupling

**Coupling** refers to the degree of direct knowledge or interdependence that one class, module, or system has on another. 

**Low Coupling** (or loose coupling) means that components of a system are as independent as possible. Changes to one component should have a minimal or zero impact on other components.

---

## Why Low Coupling is Desirable

1. **Isolation of Changes:** When components are loosely coupled, you can refactor or completely rewrite an internal module without breaking the modules that rely on it.
2. **Independent Deployments:** In microservices, low coupling means Team A can deploy an update to the Payment Service without forcing Team B to simultaneously update the Notification Service.
3. **Testability:** Loosely coupled classes rely on abstractions (interfaces), making it incredibly easy to swap out a tough real-world dependency (like a live SQL database) for a mock or stub during unit testing.

---

## Tight Coupling vs. Loose Coupling

### Bad Design (Tight Coupling)
Tight coupling occurs when Class A explicitly knows the deeply nested internal details of Class B, or when Class A directly instantiates Class B.

```java
public class OrderProcessor {
    // Tight Coupling: OrderProcessor is hardcoded to depend exactly on MySQLDatabase.
    // It is impossible to use OrderProcessor with a different database.
    private MySQLDatabase database = new MySQLDatabase();

    public void processPattern(Order order) {
        // Tight Coupling: Knows the internal SQL string building logic
        database.executeInsert("INSERT INTO orders VALUES (" + order.getId() + ")");
    }
}
```

### Good Design (Loose Coupling)
Loose coupling is achieved by programming to abstractions/interfaces and utilizing Dependency Injection.

```java
// Abstraction (Interface)
public interface Database {
    void save(Order order);
}

// Low Coupling
public class OrderProcessor {
    // OrderProcessor doesn't care if this is MySQL, MongoDB, or an In-Memory Mock.
    private Database database;

    // Dependency Injection allows the concrete implementation to be passed in.
    public OrderProcessor(Database database) {
        this.database = database;
    }

    public void processPattern(Order order) {
        // Talks via a stable contract (the interface)
        database.save(order);
    }
}
```

---

## Forms of Coupling

Coupling isn't just about object instantiation. It can manifest in several architectural layers:

### 1. Code Coupling (Classes/Modules)
As seen above, when classes directly rely on concrete implementations rather than interfaces.

### 2. Data/Schema Coupling
When two microservices read from the exact same physical database table. If Service A decides to rename a column or drop a table, Service B immediately crashes. Loose schema coupling is achieved through strict API contracts and the "Database-per-service" pattern.

### 3. Temporal (Time) Coupling
When Operation B must happen exactly right after Operation A, and the thread blocks waiting for it. Loose temporal coupling is achieved through asynchronous Event-Driven Architectures (Message Queues, Kafka), where Operation A fires off an event and doesn't care when Operation B handles it.
