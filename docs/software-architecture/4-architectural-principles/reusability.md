---
title: Reusability
sidebar_label: Reusability
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Reusability

**Reusability** is the degree to which an existing software asset (component, module, service, library) can be used in a new context or application without significant modification. High reusability reduces redundancy, accelerates development, and ensures that well-tested, battle-hardened code is leveraged across the organization.

---

## The Reuse Paradox

There is a fundamental tension in software: **Assets optimized for a single context are easy to write. Assets designed to be reused are harder to write but save time in the long run.**

Designing for reusability requires:
- Generalization (avoiding over-specific assumptions).
- Proper abstraction (hiding implementation details behind clean interfaces).
- Comprehensive documentation.
- Semantic versioning and backward compatibility management.

---

## Levels of Reuse

| Level | Example |
|-------|---------|
| **Code** | Utility functions, a `DateFormatter` class |
| **Component** | A React `<Button>` component in a design system |
| **Service** | An internal `AuthService` used by all products |
| **Platform** | A shared data platform or ML feature store used org-wide |

---

## Practical Reusability Patterns

### 1. Internal Libraries and SDKs
Extract common, cross-cutting concerns (logging setup, authentication clients, HTTP client wrappers) into internal private libraries published to a private npm/Maven/PyPI registry. Teams consume these libraries as dependencies.

### 2. Design Systems (UI Reusability)
A shared library of UI components, tokens, and patterns that all products consume, ensuring visual consistency and eliminating the need for each team to re-implement a `<Button>`, `<Modal>`, or `<DataTable>`.

*Examples:* Google's Material UI, Shopify's Polaris, GitHub's Primer.

### 3. Platform Services (Service Reusability)
Instead of each team building their own notification system, authentication service, or payment integration, a shared Platform team builds and maintains these as internal platform services consumed via APIs.

*Examples:*
- Single Sign-On (SSO) service for all internal apps.
- A centralized notification service (email, SMS, push) consumed by all product teams.

### 4. Infrastructure Modules (Terraform Modules)
Shared, versioned Terraform modules that standardize how infrastructure resources (VPCs, EKS clusters, RDS databases) are provisioned, enforcing best practices organization-wide.

---

## Reusability vs. DRY

Reusability is the application of [DRY](./dry.md) at a higher level. While DRY often applies within a single codebase or module, reusability applies across projects, teams, and products. Be mindful of the **Rule of Three** — don't prematurely abstract for reuse; wait until the need manifests in at least two contexts.
