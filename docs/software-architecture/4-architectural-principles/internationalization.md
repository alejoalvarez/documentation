---
title: Internationalization (i18n)
sidebar_label: Internationalization (i18n)
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Internationalization (i18n)

**Internationalization (i18n)** is the process of designing and engineering a software application so that it can be adapted to different languages, regions, and cultures **without engineering changes**. The number 18 in "i18n" represents the 18 letters between the "i" and the "n."

It is the *preparation* step; the actual adaptation for a specific locale is called [Localization (l10n)](./localization.md).

---

## Why "i18n" and "l10n" Are Separate

An analogy: **i18n** is designing a car that can accept either left-hand or right-hand drive configurations. **l10n** is actually configuring the car for the UK market (right-hand drive, miles, miles per gallon).

By separating the two concerns, engineers can add a new locale (e.g., Japanese) by translating strings and providing locale-specific formats, without touching any application logic.

---

## Core i18n Concerns for Software Architects

### 1. Text Extraction (Externalized Strings)
**Never hardcode** user-visible text in source code. Every string that users see must be extracted into locale-specific resource files.

```
// BAD — hardcoded English
String greeting = "Welcome back, " + user.getName() + "!";

// GOOD — externalized, translatable
String greeting = i18n.translate("greeting.welcome", user.getName());
// en.json: { "greeting.welcome": "Welcome back, {name}!" }
// es.json: { "greeting.welcome": "¡Bienvenido, {name}!" }
```

### 2. Date and Time Formatting
`2024-03-17` means different things to different people: US (March 17th), EU (17th March). Use locale-aware date formatting libraries, never manual string concatenation.

### 3. Number and Currency Formatting
`1,234.56` in US = `1.234,56` in Germany. Currency symbols vary, and their position (before or after the number) varies by locale.

### 4. Text Direction (BiDi)
Arabic and Hebrew are **right-to-left (RTL)** languages. CSS layouts must support `direction: rtl` and `logical properties` (e.g., `margin-inline-start` instead of `margin-left`).

### 5. Character Encoding
Always use **UTF-8** encoding everywhere (database, APIs, HTML) to support all world scripts.

### 6. Time Zones
Store all timestamps in UTC internally. Convert to the user's local time zone only at the display layer.

---

## i18n Libraries

| Platform | Library |
|---------|---------|
| JavaScript/React | `react-i18next`, `Format.js` |
| Java | `MessageFormat`, Spring `MessageSource` |
| Python | `gettext`, `Babel` |
| iOS (Swift) | `NSLocalizedString` |
| Android | String resource files (`res/values-es/strings.xml`) |
