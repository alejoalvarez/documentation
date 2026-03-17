---
title: GRASP
sidebar_label: GRASP
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# GRASP (General Responsibility Assignment Software Patterns)

**GRASP** is a set of nine fundamental principles in object-oriented design and responsibility assignment, created by Craig Larman. While SOLID principles are heavily focused on class dependencies and architecture, GRASP is heavily focused on answering one core question during the design phase: 

> *"Who should be responsible for what?"*

---

## The 9 Patterns of GRASP

### 1. Information Expert
**Problem:** What is a general principle of assigning responsibilities to objects?
**Solution:** Assign a responsibility to the class that has the information necessary to fulfill it.
**Example:** If you need to calculate the grand total of a `Sale`, the `Sale` class should do it (because it knows about all its `LineItems`), rather than having an external `SalesCalculator` pull the data out of the `Sale` to do the math.

### 2. Creator
**Problem:** Who should be responsible for creating a new instance of an object?
**Solution:** Assign class `B` the responsibility to create instances of class `A` if:
- B contains or compositely aggregates A.
- B records A.
- B closely uses A.
- B has the initializing data that will be passed to A when it is created.

**Example:** An `Order` class should be responsible for creating `OrderLineItem` instances, rather than the UI controller creating the line items and attaching them to the order.

### 3. Controller
**Problem:** Who should be responsible for handling an input system event?
**Solution:** Assign the responsibility to a class representing one of the following:
- The overall "system", "root object", or device (Facade Controller).
- A use case or session within which the system event occurs (Use Case Controller).

**Example:** In an MVC application, the `UserController` handles the HTTP POST request to `/users/register`, before delegating the actual creation to a domain service.

### 4. Low Coupling
**Problem:** How to support low dependency, low change impact, and increased reuse?
**Solution:** Assign responsibilities so that unnecessary coupling remains low. Avoid having classes depend heavily on the concrete implementations of many other classes. (See [Low Coupling](./low-coupling.md) for more).

### 5. High Cohesion
**Problem:** How to keep objects focused, understandable, and manageable?
**Solution:** Assign responsibilities so that cohesion remains high. A class should not do too much non-related work. (See [High Cohesion](./high-cohesion.md) for more).

### 6. Polymorphism
**Problem:** How handle alternatives based on type? 
**Solution:** When related alternatives or behaviors vary by type (class), use polymorphic operations to assign responsibility for the behavior to the types themselves, rather than using `if-else` or `switch` statements.

### 7. Pure Fabrication
**Problem:** What do you do when you are desperate, and implementing a behavior in the "Information Expert" class would violate High Cohesion and Low Coupling?
**Solution:** Invent an artificial class (a "pure fabrication" that does not represent a real-world domain concept) to handle the behavior.
**Example:** Saving a `User` to a database. The domain `User` shouldn't know about databases. So we fabricate a `UserRepository` object to handle the persistence.

### 8. Indirection
**Problem:** How to assign responsibility to avoid direct coupling between two or more elements?
**Solution:** Assign the responsibility to an intermediate object to mediate between other components or services so they are not directly coupled.
**Example:** An Event Bus or Message Queue sitting between the `OrderService` and the `EmailService`.

### 9. Protected Variations
**Problem:** How to design objects, subsystems, and systems so that the variations or instability in these elements do not have an undesirable impact on other elements?
**Solution:** Identify points of predicted variation or instability and create a stable interface around them. (This is closely related to the Open-Closed Principle).
