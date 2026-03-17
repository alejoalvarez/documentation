---
title: Security Testing
sidebar_label: Security Testing
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Security Testing

**Security Testing** is a specialized category of software testing that validates a system's defenses against unauthorized access, malicious attacks, and data breaches. It identifies weaknesses in the system before an attacker can exploit them.

---

## Types of Security Testing

### Static Application Security Testing (SAST)
Analyzes source code, bytecode, or binaries **without executing** the program. SAST tools scan for known vulnerability patterns (e.g., SQL injection opportunities, hardcoded secrets, insecure cryptography usage) directly in the codebase.

- **Tools:** SonarQube, Checkmarx, Semgrep, Snyk Code.
- **When:** Integrated into the CI/CD pipeline at every PR or commit. Fastest feedback loop.

### Dynamic Application Security Testing (DAST)
Tests a **running application** by sending malicious inputs (HTTP requests, form submissions) and analyzing responses for vulnerabilities like XSS, SQL injection, and insecure authentication.

- **Tools:** OWASP ZAP, Burp Suite.
- **When:** Run against running staging/test environments.

### Software Composition Analysis (SCA)
Scans project **dependencies** (npm packages, Maven JARs, etc.) against databases of known CVEs (Common Vulnerabilities and Exposures).

- **Tools:** Snyk Open Source, Dependabot (GitHub), OWASP Dependency-Check.
- **When:** On every dependency update and in CI/CD pipelines.

### Penetration Testing (Pen Testing)
A **simulated cyberattack** performed by ethical security professionals (either internal or an external firm). Testers attempt to breach the system using the same techniques a real attacker would use.

- **When:** Annually, or before major product launches and after significant infrastructure changes.

---

## Shift-Left Security (DevSecOps)

The principle of "shifting left" means integrating security at the earliest possible stage of software development, rather than treating it as a final-stage gate.

```
Developer's Laptop → Code Review → CI/CD Pipeline → Staging → Production
      ↑ SAST        ↑ Code Review  ↑ DAST/SCA      ↑ Pen Test
```

Every stage catches a different type of vulnerability, and the earlier a vulnerability is caught, the cheaper it is to fix.

---

## Common Vulnerabilities to Test For (OWASP Top 10)

- **SQL / NoSQL / Command Injection:** Input that manipulates backend queries or commands.
- **Cross-Site Scripting (XSS):** Injecting malicious scripts into content served to other users.
- **Broken Access Control:** Accessing resources you aren't authorized to access.
- **Security Misconfiguration:** Default credentials, verbose error messages, open cloud storage buckets.
- **Insecure Deserialization:** Exploiting the process of reconstructing serialized objects.
