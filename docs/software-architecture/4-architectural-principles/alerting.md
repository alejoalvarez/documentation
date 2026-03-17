---
title: Alerting
sidebar_label: Alerting
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Alerting

**Alerting** is the automated process of notifying the appropriate people when a monitored system metric crosses a predefined threshold or an anomalous pattern is detected. It is the critical link between your monitoring data and human response.

---

## The Anatomy of a Good Alert

1. **Actionable:** Every alert should require a specific action. If an engineer receives an alert and has no idea what to do, the alert is broken.
2. **Accurate:** Alerts should only fire when there is a real problem (low false positives). Noisy alerts create **alert fatigue**, where on-call engineers begin ignoring or silencing alerts.
3. **Timely:** The alert should fire with enough lead time for an engineer to respond before customers are significantly impacted.
4. **Contextual:** The alert notification itself should include relevant context: which service, what metric, current value, expected value, a link to the relevant Grafana dashboard, and a link to the runbook.

---

## Alert Types

### Threshold-Based Alerts
The simplest type. Alert fires when a metric exceeds a static value.
- *Example:* `IF cpu_utilization > 90% FOR 5 minutes THEN alert`

**Weakness:** If your normal baseline is 70% CPU and a spike to 85% is catastrophic for you, a 90% threshold is too conservative. Static thresholds require constant manual maintenance.

### Anomaly-Based Alerts
Machine-learning based. Alert fires when a metric deviates significantly from its historical baseline pattern.
- *Example:* Alerting if order volume is 50% lower than the same time last Tuesday, even if it hasn't crossed any absolute threshold.

### Composite Alerts
Fire only when multiple conditions are satisfied simultaneously.
- *Example:* Alert if `error_rate > 5%` AND `request_rate > 100 req/s` (so you don't get paged for 1 error/second on a quiet night at 3am).

---

## Routing and Escalation

Alerts should be routed to the right team and have a clear escalation policy:

1. Primary On-Call engineer receives the alert (via PagerDuty, OpsGenie, or similar).
2. If not acknowledged within 5 minutes, the Secondary On-Call is also paged.
3. If not resolved within 30 minutes, the Engineering Manager is notified.

---

## Runbooks

Every production alert should have a corresponding **Runbook** (a document with step-by-step instructions for how to diagnose and resolve the alert). A good runbook answers:
- What does this alert mean?
- What is the typical impact on users?
- What are the first investigation steps?
- What are the known root causes and their fixes?

---

## Alert Fatigue: The Biggest Danger

Alert fatigue occurs when on-call engineers receive so many alerts (especially noisy, low-signal ones) that they begin to distrust or ignore the alerting system. When the truly critical alert fires, it gets ignored too.

**Prevention strategies:**
- Regularly audit and retire stale or noisy alerts.
- Route low-priority alerts to a Slack channel, not a phone call.
- Only page humans for P0/P1 incidents that require immediate human action.
- Use **error budgets** and **burn-rate alerts** for more intelligent SLO-based alerting.
