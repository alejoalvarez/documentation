---
title: Localization (l10n)
sidebar_label: Localization (l10n)
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Localization (l10n)

**Localization (l10n)** is the process of adapting an internationalized application for a specific locale — combining a particular language with a particular geographic region. The "10" represents the 10 letters between "l" and "n."

While [Internationalization](./internationalization.md) is the technical preparation, Localization is the actual adaptation work for each target market.

---

## What Localization Covers

Localization is far more than just translation. A fully localized product adapts:

| Component | Example |
|-----------|---------|
| **Language & Translation** | UI text, error messages, documentation in target language |
| **Date formats** | `MM/DD/YYYY` (US) vs. `DD/MM/YYYY` (UK/EU) |
| **Time formats** | 12-hour clock (US) vs. 24-hour clock (EU) |
| **Number formats** | `1,234.56` (US) vs. `1.234,56` (Germany) |
| **Currency** | US$10 vs. €10 vs. ¥10 (also format position varies) |
| **Units of measurement** | Miles vs. Kilometers; Fahrenheit vs. Celsius |
| **Images/Icons** | Hand gestures that are offensive in some cultures; religious symbols |
| **Colors** | White = purity in Western cultures; mourning in some Asian cultures |
| **Payment methods** | Credit cards in US; iDEAL in Netherlands; Pix in Brazil |
| **Legal text** | Privacy policies, terms of service must meet local legal requirements |

---

## Locale Identifiers

Locales are commonly identified using **BCP 47** language tags:
- `en-US` → English, United States
- `en-GB` → English, United Kingdom
- `es-MX` → Spanish, Mexico
- `zh-CN` → Chinese (Simplified), Mainland China
- `zh-TW` → Chinese (Traditional), Taiwan
- `ar-SA` → Arabic, Saudi Arabia

---

## The Localization Workflow

1. **Extract strings** from the codebase into resource files (`.json`, `.po`, `.xliff`).
2. **Send to translators** (can use professional translation agencies, or tools like Crowdin, Transifex, Lokalise).
3. **Receive translated files** and import them back into the project.
4. **QA & Review:** Native speakers validate translations for accuracy and cultural appropriateness.
5. **Pseudolocalization Testing:** Before actual translations exist, use a tool to automatically transform English strings (e.g., `"Submit"` → `"[Šüḃmïẗ ~20%]"`) to test for UI layout issues (texts often expand 20-30% when translated from English).

---

## Common Pitfalls

- **String concatenation:** Don't build sentences by concatenating translated fragments. Different languages have different word orders.
  - BAD: `t("you_have") + count + t("messages")` → breaks in many languages.
  - GOOD: `t("you_have_n_messages", { count })` → the entire sentence is one translatable key with a placeholder.
- **Pluralization:** Languages have different plural rules. Use ICU message format or library equivalents to handle plurals properly.
- **Context:** The same English word may need different translations depending on context. Provide context notes to translators.
