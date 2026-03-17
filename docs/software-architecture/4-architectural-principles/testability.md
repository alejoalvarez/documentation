---
title: Testability
sidebar_label: Testability
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Testability

**Testability** is the degree to which a software artifact (class, module, component, or system) supports testing in a given test context. A testable system makes it easy to write automated tests that are fast, deterministic, and maintainable.

Testability is not just a QA consideration — it is a fundamental design quality attribute. Code that is hard to test is almost always exhibiting other architectural problems (tight coupling, poor separation of concerns).

---

## Characteristics of a Testable System

### 1. Controllability
You can set the system (or component) into any desired initial state before running a test. This is typically achieved through:
- **Constructor/Method Injection:** Passing dependencies in, so tests can inject mocks or stubs.
- **Test fixtures / Factory methods:** Pre-built helpers for creating test entities.

### 2. Observability
You can observe the output or state change resulting from the action being tested.
- Clean return values and published events are easy to assert against.
- Side effects buried in private state or that only manifest via UI are difficult to assert.

### 3. Isolateability
You can test a component in isolation from its dependencies. This is the core purpose of **Dependency Injection** — by coding to interfaces rather than concrete classes, tests can substitute real infrastructure (databases, HTTP clients, email services) with fast, in-memory fakes or mocks.

---

## Testability Design Guidelines

1. **Program to interfaces:** An `OrderService` that accepts a `Database` interface can be tested with an `InMemoryDatabase` mock. One that uses `new MySQLDatabase()` internally cannot.
2. **Avoid `static` methods for business logic:** Static methods cannot be stubbed or mocked.
3. **Avoid global/shared state:** Global state makes tests unpredictable — one test's state bleeds into another's.
4. **Keep constructors simple:** Constructors should only assign passed-in values. Complex initialization logic in constructors is hard to test and control.
5. **Single responsibility:** A class doing one thing has far fewer test cases than a God class doing everything.

---

## Testing Doubles Glossary

| Type | Behavior | When to Use |
|------|---------|-------------|
| **Stub** | Returns hardcoded data | When you need a dependency to return a specific value |
| **Mock** | Records calls; can be verified | When you want to assert that a dependency was called with specific args |
| **Fake** | A working, simplified implementation | When you need a functional but lightweight version (e.g., in-memory DB) |
| **Spy** | Wraps the real object, records interactions | When you want to test the real behavior but also verify calls |

---

## Architecture's Impact on Testability

The closer your architecture adheres to Clean Architecture or Hexagonal Architecture, the naturally higher your testability will be. The domain and use case layers have zero infrastructure dependencies — they can be tested with pure unit tests in milliseconds, without Docker, databases, or network calls.
