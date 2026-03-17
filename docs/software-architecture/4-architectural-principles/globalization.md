---
title: Globalization (g11n)
sidebar_label: Globalization (g11n)
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Globalization (g11n)

**Globalization (g11n)** is the combined practice of designing, building, and delivering software products that work effectively for users in any country or region in the world. It is the all-encompassing umbrella that includes both [Internationalization (i18n)](./internationalization.md) and [Localization (l10n)](./localization.md).

```
Globalization (g11n)
├── Internationalization (i18n)   — Engineering: "Can the app handle multiple locales?"
└── Localization (l10n)           — Adaptation: "Does the app work correctly for locale X?"
```

---

## A Global Product Strategy Checklist

When building a globally-ready product, architects and product teams must address:

### Technical Requirements
- [ ] All UI text externalized (no hardcoded strings in source code)
- [ ] UTF-8 encoding used universally (database, APIs, file storage)
- [ ] All timestamps stored in UTC; displayed in user's local time zone
- [ ] Currency handling uses a multi-currency data model
- [ ] Number, date, and address formatting uses locale-aware libraries
- [ ] RTL layout support (CSS logical properties, bidirectional text)
- [ ] Input fields accept Unicode characters (names, addresses in non-Latin scripts)

### Business & Legal Requirements
- [ ] Data residency requirements mapped per target region (GDPR for EU, LGPD for Brazil)
- [ ] Locally required payment methods supported per market
- [ ] Privacy policy and terms of service localized and reviewed by local legal counsel
- [ ] Tax calculation handles VAT, GST, and region-specific tax rules

### UX Requirements
- [ ] Cultural review of icons, images, colors, and metaphors
- [ ] User research conducted with representative users in target market
- [ ] Native language customer support or at minimum comprehensive localized help documentation

---

## Globalization Anti-Patterns

1. **Assuming English only:** Designing layouts sized exactly for English text. Many languages expand text by 20-50%.
2. **US-centric defaults:** Defaulting to US date format (MM/DD), imperial units, USD without locale detection.
3. **Phone number validation based on US format:** International phone numbers are highly variable in length and format.
4. **Name field assumptions:** Single "First name / Last name" split fails for names in many cultures (mononyms, name order varies).
5. **Address form assumptions:** A rigid "Street / City / State / Zip" form doesn't work for Japanese, Brazilian, or UK addresses.
