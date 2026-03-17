---
title: DRY
sidebar_label: DRY
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# DRY (Don't Repeat Yourself)

**DRY** is a fundamental software engineering principle that stands for **"Don't Repeat Yourself"**. Formulated by Andy Hunt and Dave Thomas in *The Pragmatic Programmer*, it states:

> *"Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."*

When the DRY principle is applied correctly, a modification of any single element of a system doesn't require a modification to other logically unrelated elements. Furthermore, elements that are logically related change predictably and uniformly.

---

## The Danger of WET Code
The opposite of DRY is commonly referred to as **WET**: 
- *Write Everything Twice*
- *We Enjoy Typing*
- *Waste Everyone's Time*

WET code causes a major maintenance nightmare. For instance, if you have the same validation logic spread across 14 different files, discovering a bug in that logic means you have to patch it in 14 distinct places.

## Types of Repetition

1. **Code Duplication:** The most obvious form. Copy-pasting chunks of code across different services or classes.
2. **Knowledge/Logic Duplication:** Two completely different code structures that essentially do the exact same business logic calculation.
3. **Data Duplication (Schema):** Having to update database schemas, GraphQL definitions, and TypeScript interfaces identically every time a field is added.

---

## How to achieve DRY

- **Functions & Methods:** Extract repeated blocks of code into a single, reusable function.
- **Inheritance & Composition:** Share common behaviors across classes. (Favor composition over inheritance).
- **Automation & Code Generators:** Use tools like OpenAPI (Swagger) to automatically generate frontend client interfaces from the backend schema, instead of maintaining both manually.
- **Constants & Configuration:** Magic numbers and hardcoded strings should be pushed to configuration files or constants. 

### Example

**Bad Design (WET Code):**
```javascript
function calculateRegularUserDiscount(price) {
    const tax = price * 0.15;
    const finalPrice = price + tax;
    return finalPrice - 10; // fixed discount
}

function calculateVIPUserDiscount(price) {
    const tax = price * 0.15; // Duplicated knowledge of tax rate
    const finalPrice = price + tax;
    return finalPrice - 30; // VIP discount
}
```

**Good Design (DRY Code):**
```javascript
const TAX_RATE = 0.15;

function applyTax(price) {
    return price + (price * TAX_RATE);
}

function calculateDiscount(price, discountAmount) {
    return applyTax(price) - discountAmount;
}
```

---

## Caveats and Exceptions
While DRY is critical, blindly applying it can lead to **premature abstractions** and tightly coupled code. 

### "The Rule of Three"
A common approach is the **Rule of Three**: Let code be duplicated twice. But when you find yourself writing the exact same code a **third** time, that is when you should refactor it into an abstraction.

### Accidental Duplication
Sometimes, two blocks of code look exactly the same today, but they actually represent two *different* concepts that might change independently in the future. In these cases, it is better to leave them duplicated. Forcing an abstraction over two unrelated concepts creates rigid and confusing code.
