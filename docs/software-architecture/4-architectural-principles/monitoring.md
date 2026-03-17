---
title: Monitoring
sidebar_label: Monitoring
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Monitoring

**Monitoring** is the process of continuously collecting, aggregating, and analyzing numerical data (metrics) about your system to ensure it is performing as expected and to proactively detect degradation or failure.

If Observability is the ability to ask arbitrary questions about a system, Monitoring is the system of watches and alarms you set up for known-bad states.

---

## Key Concepts

### Metrics
The raw numerical data points collected from your services:
- **Infrastructure Metrics:** CPU utilization, memory usage, disk I/O, network throughput.
- **Application Metrics:** Request count, error rates, response time percentiles (P50, P95, P99).
- **Business Metrics:** Orders per minute, revenue per hour, active users, failed payments.

### SLI / SLO / SLA
These three terms define the framework for measuring and committing to reliability:

| Term | Meaning | Example |
|------|---------|---------|
| **SLI (Service Level Indicator)** | A metric that measures a specific behavior | 99th percentile response latency |
| **SLO (Service Level Objective)** | A target value or range for an SLI | SLO: P99 latency < 300ms, 99.9% of the time |
| **SLA (Service Level Agreement)** | A formal, contractual commitment (with financial penalties for breach) | "We guarantee 99.9% uptime; if we fail, you get a credit" |

### Error Budget
Derived from the SLO. If your SLO is 99.9% uptime, you have 0.1% "downtime budget" per month (~43.2 minutes). The error budget is consumed by incidents. When it's exhausted, any further deployments should stop until reliability is restored.

---

## Alerting Best Practices
- **Page on symptoms, not causes:** Alert when users are experiencing something bad (high latency, elevated error rate), not just because a CPU spiked.
- **Avoid alert fatigue:** Too many noisy, unactionable alerts cause on-call engineers to ignore them. Every alert should be actionable.
- **Use multi-window, multi-burn-rate alerts:** Alert when your error budget is being consumed at an abnormal rate before the SLO is actually breached.

---

## Key Monitoring Tools

| Tool | Purpose |
|------|---------|
| **Prometheus** | Open-source metrics collection and storage |
| **Grafana** | Dashboard visualization for metrics |
| **CloudWatch** | AWS-native monitoring and alerting |
| **Datadog** | Full-stack commercial monitoring platform |
| **New Relic** | Application Performance Monitoring (APM) |

---

## The Four Golden Signals

Google's SRE book defined the **Four Golden Signals** — the most critical metrics to monitor for any service:

1. **Latency:** How long it takes to service a request.
2. **Traffic:** The volume of demand being placed on the system (requests/second).
3. **Errors:** The rate of requests that fail (HTTP 5xx, timeouts).
4. **Saturation:** How full (or close to capacity) the service is (CPU, memory, thread pool).
