---
title: High Cohesion
sidebar_label: High Cohesion
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# High Cohesion

**Cohesion** refers to the degree to which the elements inside a module (such as a class, package, or microservice) belong together. 

**High Cohesion** means that the responsibilities of a module are strongly related and highly focused. Every method, field, and dependency inside that module exists to achieve a single, unified purpose.

---

## Why High Cohesion is Desirable

1. **Readability & Comprehension:** A highly cohesive class is easy to understand because everything in it revolves around a single core concept.
2. **Maintainability:** When a business requirement changes, the necessary code modifications are typically localized within a single, cohesive module, reducing the risk of side effects.
3. **Reusability:** A highly focused component (e.g., a `MathUtils` class or an `EmailSender` module) is easy to extract and reuse in other projects because it doesn't drag along unrelated baggage.

---

## Low Cohesion vs. High Cohesion

### Bad Design (Low Cohesion / "God Class")
A class with low cohesion takes on many unrelated responsibilities. It acts like a junk drawer.

```java
// Low Cohesion: What is the actual purpose of this class?
public class SystemManager {
    // User auth logic
    public boolean loginUser(String username, String password) { ... }
    
    // Database connection logic
    public DBConnection openDatabase() { ... }
    
    // UI processing logic
    public void renderDashboard() { ... }
    
    // Utility logic
    public String parseXmlFile(File doc) { ... }
}
```
*Problems:* 
- Changes to XML parsing might accidentally break the database connection logic. 
- It has dozens of imports.
- It is impossible to name accurately (hence vague names like `Manager`, `Helper`, or `Processor`).

### Good Design (High Cohesion)
To achieve high cohesion, we split the "God Class" up so that each class focuses on exactly one related set of behaviors.

```java
// High Cohesion: Focused solely on Authentication
public class AuthenticationService {
    public boolean loginUser(String username, String password) { ... }
    public void logoutUser(String sessionId) { ... }
}

// High Cohesion: Focused solely on Database access
public class DatabaseManager {
    public DBConnection openDatabase() { ... }
    public void closeDatabase() { ... }
}

// High Cohesion: Focused solely on XML File parsing
public class XmlParser {
    public String parse(File doc) { ... }
}
```

---

## Cohesion vs. Coupling

Cohesion is almost always talked about in conjunction with [Coupling](./low-coupling.md). 

A standard architectural goal is: **High Cohesion and Low Coupling**.
- **Cohesion (Internal Metric):** How closely related are the things *inside* the box? (We want this to be HIGH).
- **Coupling (External Metric):** How strongly does this box depend on *other* boxes? (We want this to be LOW).

If you increase cohesion by breaking a giant class into 50 tiny classes, but those 50 classes have to constantly call each other in an intricate web to accomplish anything, you have sacrificed Low Coupling to achieve High Cohesion. **Architecture is the art of balancing both.**
