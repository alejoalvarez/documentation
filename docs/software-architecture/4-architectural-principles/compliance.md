---
title: Compliance
sidebar_label: Compliance
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Compliance

**Compliance** in software architecture refers to the adherence to laws, regulations, industry standards, and internal policies that govern how systems must collect, store, process, and protect data.

Non-compliance is not just a technical issue — it carries significant legal, financial, and reputational consequences.

---

## Why Compliance Matters for Architects

Architects must design systems with compliance requirements baked in from the start. Retrofitting a non-compliant system is orders of magnitude more expensive than designing it correctly the first time.

Compliance shapes critical technical decisions:
- **Data residency:** Where can data be stored? (e.g., GDPR requires EU citizen data to stay within the EU)
- **Encryption standards:** What encryption algorithms and key lengths are required?
- **Data retention:** How long must data be kept, and when must it be deleted?
- **Access controls & auditing:** Who accessed what data, and when?

---

## Key Compliance Frameworks

### GDPR (General Data Protection Regulation)
- **Jurisdiction:** European Union
- **Scope:** Applies to any company processing personal data of EU residents, regardless of where the company is based.
- **Key Requirements:** Right to be forgotten (data deletion), data portability, consent management, breach notification within 72 hours, Privacy by Design.
- **Penalties:** Up to €20 million or 4% of global annual turnover.

### HIPAA (Health Insurance Portability and Accountability Act)
- **Jurisdiction:** United States
- **Scope:** Healthcare providers, health plans, and their business associates handling Protected Health Information (PHI).
- **Key Requirements:** Encryption of PHI at rest and in transit, access controls, audit trails, Business Associate Agreements (BAAs).

### PCI DSS (Payment Card Industry Data Security Standard)
- **Jurisdiction:** Global (required by Visa, Mastercard, etc.)
- **Scope:** Any company that stores, processes, or transmits cardholder data.
- **Key Requirements:** Never store CVV codes, encrypt cardholder data, restrict access, conduct regular security vulnerability scans.

### SOC 2 (System and Organization Controls)
- **Jurisdiction:** United States (widely recognized globally)
- **Scope:** SaaS companies and service providers.
- **Key Requirements:** Security, Availability, Processing Integrity, Confidentiality, and Privacy controls. Requires an independent audit.

---

## Compliance as Code

Modern DevSecOps practices treat compliance as automated, continuously enforced policies rather than annual paper audits:
- **AWS Config / Azure Policy:** Automatically detect and remediate non-compliant infrastructure configurations.
- **OPA (Open Policy Agent):** Policy-as-code for Kubernetes, Terraform, and microservices.
- **Automated auditing:** Security Information and Event Management (SIEM) systems aggregate logs and generate compliance reports automatically.
