---
id: reactive-programming
title: Reactive Programming
sidebar_label: 3 - Reactive Programming
displayed_sidebar: softwareArchitectureSidebar
tags: [Paradigms-and-fundamental-principles]
---

<span className="badge-arch">Paradigms and fundamental principles</span>

# Reactive Programming

**Topics to master:**

- Observables and Observers
- Data streams
- Transformation operators (map, filter, flatMap, merge, etc.)
- Hot vs Cold observables
- Error handling in streams
- Backpressure
- Marble diagrams
- Subject (BehaviorSubject, ReplaySubject)

**Recommended resources:**

- Official RxJS / Project Reactor documentation
- Book: “Learning RxJava” by Nick Pollack
- Course: “RxJS in Practice” on Udemy
- Interactive tutorial: RxJSMarbles.com

**Practical examples:**

- Create a reactive autocomplete that searches as the user types
- Implement a mouse event listener with debounce and throttle
- Handle multiple streams (user + API data) with merge/combineLatest
- Create a reactive shopping cart

**Real-world use case:**

- Real-time dashboard: multiple data sources that are constantly updated
- Notification system: events that are processed and transformed reactively
- WebSocket listener: automatically connect/reconnect with retries

**Exercises:**

1. Implement a counter that increments every second and can be reset
2. Create a search system where debounces + cancel if there is another search
3. Simulate a shopping cart with reactive changes to the total