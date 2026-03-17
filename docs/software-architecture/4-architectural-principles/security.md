---
title: Security
sidebar_label: Security
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Security (Secure by Design)

**Security** in software architecture is not just a feature — it is a cross-cutting principle that must be embedded into every layer of a system from day one. The "Secure by Design" philosophy advocates for identifying and mitigating potential threats during the design phase, rather than bolting security on after a system is built.

---

## Core Security Principles

### 1. Defense in Depth
Never rely on a single security control. Layer multiple independent controls so that even if one is bypassed, others remain. Think of it as multiple rings of security around your most valuable assets.

*Example layering:*
- Network perimeter firewall (Layer 1)
- API Gateway with rate limiting and WAF (Layer 2)
- Server-side authentication + authorization (Layer 3)
- Database-level access controls and encryption at rest (Layer 4)

### 2. Principle of Least Privilege
Every user, process, and service should operate with only the minimum permissions necessary to do their job.

*Example:* A read-only reporting Lambda should have IAM permissions to `s3:GetObject` only on the reporting bucket — not `s3:*` on all buckets.

### 3. Fail Securely
When a system encounters an error or unexpected input, it should default to a secure state, not an open one.

*Example:* If an authorization check throws an unexpected error, the system should DENY the request, not ALLOW it because "the check didn't return false."

### 4. Zero Trust Architecture
Treat every request as if it comes from an untrusted source, regardless of whether it originates from inside or outside the network perimeter.

- **Traditional model:** Anything inside the corporate VPN is trusted.
- **Zero Trust model:** Verify identity, device health, and permissions for every single request, everywhere.

---

## The OWASP Top 10
The **OWASP Top 10** is the most widely recognized list of the most critical web application security risks. Every developer should be familiar with these:

1. Broken Access Control
2. Cryptographic Failures
3. Injection (SQL, Command, etc.)
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable and Outdated Components
7. Identification and Authentication Failures
8. Software and Data Integrity Failures
9. Security Logging and Monitoring Failures
10. Server-Side Request Forgery (SSRF)

---

## Threat Modeling
**Threat Modeling** is a structured approach to identifying security threats and mitigating them during the design phase, before any code is written.

A popular framework is **STRIDE**:
- **S**poofing (Is identity verified?)
- **T**ampering (Can data be modified in transit?)
- **R**epudiation (Can users deny their actions if there are no logs?)
- **I**nformation Disclosure (Is sensitive data exposed unnecessarily?)
- **D**enial of Service (Can a bad actor overwhelm the system?)
- **E**levation of Privilege (Can a user gain more access than intended?)
