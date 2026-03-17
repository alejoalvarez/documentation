---
title: Quality Assurance
sidebar_label: Quality Assurance
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Quality Assurance (QA)

**Quality Assurance (QA)** is a systematic process of ensuring that a software product meets defined quality standards and fulfills the requirements of its users. In modern software engineering, QA is not just a department at the end of the pipeline — it is a shared responsibility embedded throughout the entire development lifecycle.

---

## Quality Attributes (The "-ilities")

In software architecture, quality is multidimensional. Architects must explicitly define and balance these key **quality attributes** (sometimes called "non-functional requirements"):

| Quality Attribute | Question | Example Metric |
|---|---|---|
| **Availability** | Is the system up when users need it? | 99.9% uptime |
| **Reliability** | Does the system produce correct results consistently? | < 0.01% error rate |
| **Performance** | How fast does the system respond? | P99 < 200ms |
| **Scalability** | Can the system handle growing load? | Handle 10x traffic with 0 code changes |
| **Security** | Is the system protected from unauthorized access? | Zero critical CVEs |
| **Maintainability** | How easy is it to change the system? | < 2 hours to add new feature |
| **Testability** | How easy is it to write tests for the system? | > 80% test coverage |

---

## The Testing Pyramid

A healthy QA strategy distributes tests across three levels, forming a pyramid:

```
         ___________
        |  E2E Tests  |   ← Few, slow, expensive, brittle
        |_____________|
       |  Integration  |  ← Moderate, test component interactions
       |    Tests      |
       |_______________|
      |    Unit Tests   |  ← Many, fast, cheap, isolated
      |_________________|
```

1. **Unit Tests:** Validate individual functions and classes in isolation. Should be the vast majority of your tests (hundreds or thousands). Run in milliseconds.
2. **Integration Tests:** Validate how two or more components work together (e.g., service + database, service + message queue). Slower, fewer.
3. **End-to-End (E2E) Tests:** Validate the complete user journey through the running application. Slowest, most brittle, but highest confidence.

---

## Quality Gates in CI/CD

Modern QA is automated and enforced as **Quality Gates** in the CI/CD pipeline. A build is rejected if any gate fails:

1. Unit test failure → Build blocked.
2. Code coverage drops below 80% → Build blocked.
3. Static analysis / linting failures → Build blocked.
4. Security vulnerability scan finds a Critical CVE → Build blocked.
5. Performance regression test exceeds threshold → Build blocked.
