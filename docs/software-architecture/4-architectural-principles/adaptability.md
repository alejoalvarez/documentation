---
title: Adaptability
sidebar_label: Adaptability
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Adaptability

**Adaptability** is a system's ability to remain useful and functional in the face of significant changes to its surrounding environment — including new business models, technology migrations, regulatory shifts, and major platform changes.

Where **Flexibility** handles daily rule changes and **Extensibility** handles new feature additions, **Adaptability** handles major tectonic shifts.

---

## Real-World Adaptability Scenarios

1. **On-premise to Cloud Migration:** Moving a monolith from a self-hosted data center to AWS without a rewrite.
2. **Database migration:** Switching from Oracle to PostgreSQL, or from SQL to a NoSQL store.
3. **API protocol change:** Moving from REST to GraphQL or from HTTP to gRPC.
4. **Regulatory changes:** GDPR coming into effect; the application must now support data deletion and data portability requests.
5. **New market entry:** The application was US-only; now it must support EU currencies, languages, and data residency requirements.

---

## Architecture Patterns that Maximize Adaptability

### Anti-Corruption Layer (ACL)
When integrating with a legacy system or a third-party vendor, don't let their data model "pollute" your domain model. Create an Anti-Corruption Layer — a translation layer that converts between the external model and your internal model.

When you eventually replace that vendor, you only change the ACL — the rest of your domain is untouched.

### Dependency Inversion / Ports and Adapters
See [Hexagonal Architecture](./hexagonal-architecture.md). By programming to interfaces (Ports), your business logic is completely isolated from the specific technology it runs on. Swapping out technology means swapping the adapter implementation, not the business logic.

### Strangler Fig Pattern
When migrating a legacy monolith to a modern architecture, don't attempt a risky "big bang" rewrite. Instead, gradually build the new system alongside the old one. Route increasingly more traffic to the new system, and slowly "strangle" the old one.

```
Stage 1: 100% → Legacy Monolith
Stage 2:  80% → Legacy, 20% → New Service (Users module migrated)
Stage 3:  20% → Legacy, 80% → New Service (Orders module migrated)
Stage 4: 100% → New Service (Legacy decommissioned)
```

---

## Organizational Adaptability: Conway's Law

> *"Organizations which design systems are constrained to produce designs which are copies of the communication structures of those organizations."* — Melvin Conway

For a system to be architecturally adaptable, the teams building it must also be structurally adaptable. **Team topologies** (Stream-Aligned teams, Platform teams, Enable teams) are the organizational answer to maximizing system adaptability.
