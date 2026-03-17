---
title: Scalability
sidebar_label: Scalability
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Scalability

**Scalability** is a system's ability to handle a growing amount of work by adding resources. A scalable system can grow to accommodate increased demand without requiring a complete architectural rewrite.

---

## Horizontal vs. Vertical Scaling

| Type | Strategy | Example | Limits |
|------|----------|---------|--------|
| **Vertical Scaling (Scale Up)** | Add more resources to existing machines | Upgrade from 4 CPU/8GB RAM to 32 CPU/64GB RAM | Physical hardware limits; single point of failure |
| **Horizontal Scaling (Scale Out)** | Add more instances of existing machines | Add 10 more application servers behind a load balancer | Nearly limitless (with stateless services) |

Modern cloud-native architectures strongly prefer **horizontal scaling** because:
- No single point of failure.
- Scales indefinitely (in theory).
- Aligns with auto-scaling (scale out on high load, scale in to save costs).

---

## Stateless Services: The Foundation of Horizontal Scaling

For horizontal scaling to work, services must be **stateless** — they must not store user session data in local memory. Any request must be handled equally by any instance.

- **Stateful (Anti-pattern for scaling):** Store user session in server memory. Requests must go to the same server (sticky sessions). Adding a new server doesn't help the original server.
- **Stateless (Scalable):** Store session data in an external store (Redis or a Database). Any server can handle any request. Add 10 more servers and load distributes immediately.

---

## Scaling the Database

Application servers are easy to scale horizontally. Databases are harder. Common strategies:

### Read Replicas
Write to a primary database, read from one or more replicas. Works for read-heavy applications (80-90% of most apps are reads).

### Sharding
Partition data across multiple database instances based on a key (e.g., userId % 10 routes to one of 10 database shards). Extremely complex but necessary for massive scale (billions of records).

### Caching
Keep frequently read data in-memory (Redis, Memcached) to offload read traffic from the database entirely.

---

## The CAP Theorem
When designing scalable distributed systems, you must understand the **CAP Theorem** (Brewer's Theorem): A distributed system can only guarantee two of the following three properties simultaneously:

- **C**onsistency: All nodes see the same data at the same time.
- **A**vailability: Every request receives a response (though it might not be the latest data).
- **P**artition Tolerance: The system continues to operate even if network communication between nodes is broken.

Since network partitions are unavoidable in distributed systems, you must choose between **CP** (consistent but sometimes unavailable) or **AP** (always available but sometimes inconsistent). Most modern databases make this explicit (MongoDB is AP, HBase is CP).
