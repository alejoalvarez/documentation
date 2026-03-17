---
title: YAGNI
sidebar_label: YAGNI
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# YAGNI (You Aren't Gonna Need It)

**YAGNI** is a principle of Extreme Programming (XP) that states a programmer should not add functionality until deemed strictly necessary.

> *"Always implement things when you actually need them, never when you just foresee that you need them."*  — Ron Jeffries

---

## The Trap of "Future-Proofing"
Developers often attempt to anticipate future requirements. They build generalized frameworks, multiple abstract interfaces, caching layers, and plugin systems because *"we might need this down the road."* 

This foresight, while well-intentioned, often leads to:
- **Wasted Time:** You spent 20 hours building a dynamic plugin system for a feature the client ends up canceling.
- **Code Bloat:** Unused features still require compilation, deployment space, and memory overhead.
- **Maintenance Burden:** Even if the code isn't actively used, other developers still have to read around it, navigate its abstractions, and ensure refactors don't break it.

## How to Apply YAGNI

1. **Strictly Build the Specs:** Focus on implementing exactly what the current Jira ticket or user story asks for, and nothing more.
2. **Refactor as Needed:** Rely on automated testing and continuous refactoring. If a new requirement *does* emerge later, refactor the simple code to handle the complexity *at that time*, not before.
3. **Ask "Why?":** If a developer suggests adding a feature because "it'll be useful later", push back and ask if it provides tangible business value *today*. 

---

## Example

Imagine building a simple blog platform.

**Bad Approach (Violating YAGNI):**
The developer decides that *eventually*, the blog might need to support multiple database backends, a GraphQL API, a highly scalable Redis caching layer, and OAuth2 social logins.

They spend three weeks writing an abstract Database Connection Pooler, setting up GraphQL schemas, wiring up Redis containers, and implementing complex login flows. The client hasn't even written their first post yet.

**Good Approach (YAGNI):**
The developer writes a basic CRUD application mapping directly to SQLite or PostgreSQL, using simple JWT or Session auth. The app is launched in 3 days. 

*Six months later*, if traffic actually spikes so high that a cache is needed, the developer implements Redis *then*.

---

## YAGNI vs. Architecture
Does YAGNI mean you shouldn't plan your architecture? Absolutely not. 

Architecture is about establishing the foundational structures (like choosing microservices vs. monolith, establishing CI/CD, selecting the primary tech stack) that are hard to change later. YAGNI is specifically about **features and code abstractions**. 

You should design your architecture to handle change gracefully, but avoid writing code for problems you do not currently have.
