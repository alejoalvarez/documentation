---
title: Performance Testing
sidebar_label: Performance Testing
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Performance Testing

**Performance Testing** is a type of non-functional testing that validates a system's speed, responsiveness, and stability under a given workload. The goal is to identify bottlenecks, establish performance baselines, and ensure the system meets defined performance requirements *before* a failure occurs in production.

---

## Types of Performance Tests

| Test Type | Purpose | Key Question |
|-----------|---------|-------------|
| **Load Test** | Simulate expected user traffic | Does the system meet SLOs under normal expected load? |
| **Stress Test** | Push beyond normal limits | At what point does the system break? |
| **Spike Test** | Simulate sudden bursts of extreme traffic | Can the system handle a sudden 10x traffic spike (e.g., a product launch)? |
| **Soak/Endurance Test** | Run at normal load for an extended time | Are there memory leaks or resource degradation over time? |
| **Scalability Test** | Gradually increase load while scaling infrastructure | Does performance scale linearly with added resources? |

---

## Key Metrics

- **Throughput:** Requests per second (RPS) the system can process.
- **Response Time (Latency):** Time from request sent to response received. Report as percentiles: P50, P90, P95, P99.
- **Error Rate:** Percentage of requests that result in an error (5xx, timeouts).
- **Resource Utilization:** CPU, memory, disk I/O, network during the test.
- **Concurrent Users:** Number of simultaneous users the system can handle.

---

## Performance Testing Tools

| Tool | Type | Language |
|------|------|----------|
| **Gatling** | Load testing, code-based scenarios | Scala/Java |
| **k6** | Load testing, scriptable, CI-friendly | JavaScript |
| **JMeter** | Load & performance testing with GUI | Java |
| **Locust** | Distributed load testing | Python |
| **Artillery** | Cloud-native load testing | YAML/JavaScript |

---

## Example: k6 Load Test

```javascript
// k6 load test scenario
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up to 100 users over 2 minutes
    { duration: '5m', target: 100 },  // Stay at 100 users for 5 minutes
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(99)<500'], // P99 latency must be under 500ms
    http_req_failed: ['rate<0.01'],   // Error rate must be below 1%
  },
};

export default function () {
  const res = http.get('https://api.myapp.com/health');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
```

---

## When to Run Performance Tests

- **Baseline establishment:** After a new system is built.
- **Before major releases:** Any significant feature addition or refactor.
- **After infrastructure changes:** Scaling up/down, migrating databases.
- **In CI/CD pipelines** (lightweight smoke load tests on every PR).
