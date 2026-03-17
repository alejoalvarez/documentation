---
title: Load Balancing
sidebar_label: Load Balancing
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Load Balancing

**Load Balancing** is the process of distributing incoming network traffic across multiple backend servers (a "pool" or "farm") to ensure no single server becomes overloaded. It increases availability, throughput, and reliability.

---

## Why Load Balancing is Critical

Without a load balancer, all requests hit a single server. When that server's CPU or memory is exhausted:
- Response times degrade.
- Eventually the server crashes.
- All users experience downtime.

A load balancer sits in front of the server pool, distributing traffic so that load is spread and a single server failure doesn't take down the service.

---

## Load Balancing Algorithms

| Algorithm | How it Works | Best For |
|-----------|-------------|---------|
| **Round Robin** | Routes requests sequentially to each server in turn | Servers with equal capacity and similar request processing times |
| **Least Connections** | Routes to the server with the fewest active connections | Long-lived connections (WebSocket, streaming) |
| **Weighted Round Robin** | Round Robin but high-capacity servers get more requests | Heterogeneous server pools |
| **IP Hash** | Routes based on client IP hash (always same server) | Stateful session consistency (legacy apps) |
| **Least Response Time** | Routes to the server with the fastest recent response | Latency-sensitive applications |

---

## Layer 4 vs. Layer 7 Load Balancing

| Type | OSI Layer | What it routes on | Examples |
|------|-----------|-------------------|----|
| **L4 (Transport)** | TCP/UDP | IP address + port number | AWS NLB, HAProxy (TCP mode) |
| **L7 (Application)** | HTTP | URL path, headers, cookies, request body | AWS ALB, Nginx, Envoy |

**L7 load balancers** are more powerful — they can route `/api/*` requests to the API fleet and `/static/*` requests to a CDN origin, enable SSL termination, add sticky sessions, and perform health checks at the HTTP level.

---

## Health Checks

Load balancers continuously poll backend servers with health checks (HTTP GET to `/health`). If a server fails to respond (or returns a non-200 status), the load balancer automatically removes it from the routing pool until it recovers.

---

## Modern Load Balancing: Service Mesh

In microservices deployments, traffic routing between services is often handled by a **Service Mesh** (Istio, Linkerd). The service mesh injects a sidecar proxy into every pod that handles load balancing, retries, timeouts, circuit breaking, and mTLS — all without any code changes in the application.
