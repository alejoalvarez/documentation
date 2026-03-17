---
title: Data Privacy
sidebar_label: Data Privacy
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Data Privacy

**Data Privacy** is the principle that individuals should have control over their personal data — how it is collected, stored, processed, shared, and deleted. From a software architecture perspective, privacy is not just a legal checkbox; it must be a first-class design concern.

---

## Privacy by Design (PbD)

**Privacy by Design** is a framework developed by Ann Cavoukian that advocates for embedding privacy into the system's design from the outset, rather than treating it as an add-on afterthought. Its seven foundational principles:

1. **Proactive, not reactive:** Prevent privacy issues before they happen.
2. **Privacy as the default setting:** No action required by the user to protect their privacy — it's automatic.
3. **Privacy embedded into design:** Not added on as an afterthought.
4. **Full functionality (positive-sum, not zero-sum):** Privacy doesn't require sacrificing functionality.
5. **End-to-end security:** Full lifecycle protection of data.
6. **Visibility and transparency:** Keep operations transparent and verifiable.
7. **Respect for user privacy:** Keep it user-centric.

---

## Key Data Privacy Concepts for Architects

### Data Minimization
Collect only the data that is strictly necessary for the stated purpose. If your app only needs a user's email to send them receipts, don't also collect their date of birth, phone number, and location.

### Data Classification
Not all data is equally sensitive. Classify data to apply proportionate protections:
- **Public:** No restrictions (product descriptions, blog posts).
- **Internal:** Limited to employees (business plans).
- **Confidential:** Further restricted (HR records, source code).
- **Restricted / PII:** Highest protection (social security numbers, health records, payment data).

### Anonymization vs. Pseudonymization
- **Anonymization:** Remove all personally identifiable information so that reidentification is impossible. Safe to share with third parties.
- **Pseudonymization:** Replace PII with a pseudonym (e.g., replace `email` with a UUID). The link between the pseudonym and the real identity is kept in a separate, secured mapping table. Reversible, but controlled.

### Data Subject Rights (GDPR)
Architects must design systems that can support these rights:
- **Right to Access:** A user can request all data held about them.
- **Right to Rectification:** A user can request corrections to incorrect data.
- **Right to Erasure ("Right to be Forgotten"):** A user can request deletion of their data. This requires careful system design — especially in Event-Sourced or immutable log systems.
- **Data Portability:** A user can request their data in a machine-readable format to take to a competitor.

---

## Practical Architecture Decisions

| Decision | Privacy-Aware Approach |
|----------|----------------------|
| Logging | Mask or exclude PII from all log outputs |
| Analytics | Use anonymous or aggregated data; avoid logging user IDs |
| Backups | Apply same encryption/access controls as primary data |
| Third-party integrations | Vet vendors for privacy compliance; use data processing agreements |
| Data residency | Store EU user data in EU regions to comply with GDPR |
