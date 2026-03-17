---
title: KISS
sidebar_label: KISS
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# KISS (Keep It Simple, Stupid)

**KISS** is a design principle that originated in the U.S. Navy in 1960. The principle asserts that most systems work best if they are kept simple rather than made complicated. 

In software engineering, this implies that **simplicity** should be a key goal in design, and unnecessary complexity should be actively avoided.

---

## Why Simplicity Matters
Complex code is:
- **Harder to read:** Developers spend more time figuring out *what* the code does rather than improving it.
- **Harder to test:** High cyclomatic complexity requires drastically more unit test cases just to reach adequate coverage.
- **Harder to debug:** Finding a needle in a haystack is tough. Finding a bug in a multi-layered, overly-abstracted framework takes exponentially longer.

## How to Apply KISS

1. **Avoid Over-Engineering:** Don't implement complex design patterns (like Abstract Factories or massive event-buses) for a simple CRUD script. 
2. **Clear Naming Conventions:** Names of variables, functions, and classes should immediately reflect their purpose without needing a comment.
3. **Small Functions:** Functions should do one thing clearly (aligning closely with the single-responsibility principle).
4. **Use Established Tools:** Instead of reinventing the wheel with a custom cryptography library, use well-established community libraries. Let the standard tools handle the heavy lifting.

---

## Example 

Let's say we want to find if a day of the week is a weekend.

**Bad Design (Overly Complex):**
```javascript
function isWeekend(dayString) {
    const days = [
        { name: "Monday", isWeekend: false },
        { name: "Tuesday", isWeekend: false },
        { name: "Wednesday", isWeekend: false },
        { name: "Thursday", isWeekend: false },
        { name: "Friday", isWeekend: false },
        { name: "Saturday", isWeekend: true },
        { name: "Sunday", isWeekend: true }
    ];
    
    const result = days.find(d => d.name.toLowerCase() === dayString.toLowerCase());
    return result ? result.isWeekend : false;
}
```

**Good Design (KISS):**
```javascript
function isWeekend(dayString) {
    const normalized = dayString.toLowerCase();
    return normalized === 'saturday' || normalized === 'sunday';
}
```

---

## KISS vs. Other Principles
It's common for developers to conflict KISS with other design principles like DRY or SOLID. 

- If adhering strictly to SOLID requires creating 15 new abstraction layers, interfaces, and DTOs just to return a simple "Hello World" endpoint, you are violating KISS.
- True software architecture mastery lies in balancing these principles. The goal is maintainability, and code that is "simple" is often the easiest to maintain.
