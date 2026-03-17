---
title: Availability
sidebar_label: Availability
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Availability

**Availability** is the proportion of time a system is operational and accessible to users. It is typically expressed as a percentage over a given period (e.g., "five nines" = 99.999% availability).

High availability is a critical design goal for any production system because unplanned downtime directly translates into lost revenue and user trust.

---

## Availability Percentages vs. Downtime

| Availability | Annual Downtime | Monthly Downtime |
|---|---|---|
| 99% ("two nines") | 87.6 hours | 7.2 hours |
| 99.9% ("three nines") | 8.76 hours | 43.8 minutes |
| 99.99% ("four nines") | 52.6 minutes | 4.4 minutes |
| 99.999% ("five nines") | 5.26 minutes | 26.3 seconds |

Moving from three nines to four nines sounds small, but it's a 10x improvement in reliability and typically requires significant architectural investment.

---

## Patterns for High Availability

### Redundancy / Replication
Eliminate single points of failure by running multiple instances of every component. If one fails, traffic automatically routes to the others.

- **Active-Active:** Multiple identical instances all handle live traffic simultaneously. Maximum throughput and resilience.
- **Active-Passive (Failover):** A primary instance handles all traffic; a standby instance takes over if the primary fails. Recovery time depends on failover speed.

### Health Checks & Automatic Failover
Load balancers and container orchestrators (Kubernetes) continuously perform health checks. Unhealthy instances are automatically removed from the traffic pool and replaced.

### Multi-Region Deployment
Deploy your application in multiple geographic cloud regions (e.g., `us-east-1` and `eu-west-1`). If an entire AWS region goes down (rare but it happens), traffic fails over to the other region.

### Graceful Degradation
Design the system so that if one non-critical component fails, the rest of the system continues to function in a reduced capacity rather than failing completely.

*Example:* If the product recommendation engine fails, show the default product catalogue instead of returning a 500 error on the entire page.

---

## Availability vs. Reliability

These are related but distinct:
- **Availability** = The system is up and accessible (measured in uptime %).
- **Reliability** = The system produces correct results consistently (measured in error rate %).

A system can be highly available (always up) but unreliable (always giving wrong answers). The goal is to be both.
