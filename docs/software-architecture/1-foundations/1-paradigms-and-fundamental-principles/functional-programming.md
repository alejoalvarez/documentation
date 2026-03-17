---
id: functional-programming
title: Functional Programming
sidebar_label: 2 - Functional Programming
displayed_sidebar: softwareArchitectureSidebar
tags: [Paradigms-and-fundamental-principles]
---

<span className="badge-arch">Paradigms and fundamental principles</span>

# Functional Programming

**Topics to master:**

- First-order functions
- Pure functions and side effects
- Immutability
- Function composition
- Higher-order functions (map, filter, reduce)
- Closures
- Currying and partial application
- Monads and Functors (conceptually)

**Recommended resources:**

- Book: “Functional Programming in Scala” by Paul Chiusano
- Course: “Functional Programming Fundamentals” on edX
- Tutorial: “Learn You a Haskell for Great Good”
- JavaScript ES6+ documentation (accessible for beginners)

**Practical examples:**

- Use map, filter, reduce in JavaScript/Python to process data
- Create pure functions that transform data without modifying the original
- Implement composition: compose(formatUser, validateUser, parseUser)
- Using closures to create counters or private state

**Real-world use case:**

- Data processing system: using pure functions to transform user logs
- Processing pipeline: read data -> validate -> transform -> save (using composition)
- Report generator using reduce to aggregate data

**Exercises:**

1. Convert imperative operations to functional ones (loops to map/filter/reduce)
2. Create a library of reusable functions (compose, pipe)
3. Implement a small functional library with higher-order functions