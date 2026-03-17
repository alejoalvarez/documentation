---
title: Law of Demeter
sidebar_label: Law of Demeter
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Law of Demeter (LoD)

The **Law of Demeter (LoD)**, also known as the *Principle of Least Knowledge*, is a design guideline for developing software, particularly object-oriented programs. It proposes a specific set of rules to reduce the coupling between classes.

The fundamental idea is simple: **"Talk only to your immediate friends, not to strangers."**

---

## The Rules of Demeter
According to the Law of Demeter, a method `m` of an object `O` should only invoke methods of the following kinds of objects:

1. The object `O` itself (`this` or `self`).
2. Objects passed as arguments to the method `m`.
3. Objects created or instantiated within the method `m`.
4. Objects held as direct components (instance variables) of `O`.

Crucially, an object should **avoid** invoking methods of a returned object (a "stranger").

---

## The Train Wreck Anti-Pattern

A classic violation of the Law of Demeter is known as a **"train wreck"**—a long chain of method calls reaching deep into the structural hierarchy of other objects.

### Bad Design (Violating LoD)

```javascript
// A customer needs a discount applied based on their zip code
function applyDiscount(customer) {
    // Train wreck: reaching through Customer -> Address -> ZipCode -> Region
    const region = customer.getAddress().getZipCode().getRegion();
    
    if (region === 'US-WEST') {
        return 10;
    }
    return 0;
}
```

**Why is this bad?**
- **Deep Coupling:** The `applyDiscount` function now knows the deep internal structure of `Customer`, `Address`, and `ZipCode`.
- **Fragility:** If the database refactors `Address` so it no longer holds a `ZipCode` directly, this method breaks.
- **Testing:** To write a unit test for `applyDiscount`, you have to mock out nested layers of objects: a `Customer` returning an `Address` returning a `ZipCode` returning a `Region`.

### Good Design (Adhering to LoD)

The `Customer` should encapsulate its own structural hierarchy. You should just ask the `Customer` for the information you need.

```javascript
// The Customer class encapsulates the nested logic
class Customer {
    getRegion() {
        // Customer is allowed to talk to its component (Address)
        return this.address.getRegion();
    }
}

class Address {
    getRegion() {
        // Address is allowed to talk to its component (ZipCode)
        return this.zipCode.getRegion();
    }
}

// The calling function only interacts with its immediate friend (Customer)
function applyDiscount(customer) {
    const region = customer.getRegion();
    
    if (region === 'US-WEST') {
        return 10;
    }
    return 0;
}
```

---

## Benefits of the Law of Demeter

1. **Information Hiding:** Inner workings of objects remain private. Changing an object's internal structure doesn't ripple out to distant parts of the application.
2. **Easier Refactoring:** Because components are loosely coupled, you can swap out an `Address` implementation or re-map how Zip Codes work without modifying the `applyDiscount` logic.
3. **Better Testing:** Mocking immediate neighbors is significantly simpler than mocking deeply nested chains of dependencies.

## Caveats: Fluent Interfaces vs. Train Wrecks
Not all chained dot notations are violations of the Law of Demeter. 

**Fluent Interfaces** (like Java Streams or JavaScript Promis chaining) are perfectly fine because they return instances of the *same type* or are designed specifically for chained configuration, rather than navigating a structural object graph.

```javascript
// Fine: This is a Fluent Interface mapping data streams, not structural navigation
users.filter(u => u.active).map(u => u.id).sort();
```
