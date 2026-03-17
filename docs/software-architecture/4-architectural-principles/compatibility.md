---
title: Compatibility
sidebar_label: Compatibility
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Compatibility

**Compatibility** is a software system's ability to work correctly with other systems, components, platforms, and versions. It is the quality attribute that governs how well different pieces of a technology ecosystem can coexist without conflict.

---

## Types of Compatibility

### Backward Compatibility
New versions of a system remain compatible with components designed for older versions. Existing clients are not broken when a new version is released.

*Example:* Java maintains strong backward compatibility — code compiled for Java 8 still runs correctly on Java 21.

### Forward Compatibility
Older versions of a system can work with data or messages produced by newer versions. Unexpected or new fields are gracefully ignored.

*Example:* A mobile app running version 3.1.0 can still communicate with a backend that has been upgraded to 3.4.0, because the backend uses additive, non-breaking API changes.

### Cross-Platform Compatibility
The software works correctly across different operating systems, browsers, or hardware architectures.

---

## API Compatibility: The Critical Concern

For systems communicating via APIs, **API contract compatibility** is the most critical concern. Changes that break existing consumers are **breaking changes**:

| Change Type | Breaking? | How to Handle |
|-------------|-----------|--------------|
| Remove a field | ✅ Yes | Version the API; deprecate the old version |
| Change a field type | ✅ Yes | Version the API |
| Rename a field | ✅ Yes | Version the API |
| Add a new required field | ✅ Yes | Version the API |
| Add a new **optional** field | ❌ No | Safe to release |
| Add a new endpoint | ❌ No | Safe to release |
| Add a new optional query parameter | ❌ No | Safe to release |

---

## Semantic Versioning (SemVer)

**SemVer** is the standard convention for communicating compatibility through version numbers: `MAJOR.MINOR.PATCH`

- **MAJOR** version bump: Breaking changes. Consumers must update their code.
- **MINOR** version bump: New backward-compatible features. Safe for consumers to upgrade.
- **PATCH** version bump: Backward-compatible bug fixes. Safe for consumers to upgrade.

*Example:* `2.5.3` — Major version 2 (breaking from v1), Minor version 5 (5 non-breaking feature additions since v2.0.0), Patch 3 (3 bug fixes since v2.5.0).

---

## Database Schema Compatibility

Database schema changes must be backward compatible during rolling deployments (where old and new version of the app run simultaneously):
- **Safe:** Adding a nullable column.
- **Unsafe:** Dropping a column (old app version still tries to read it).
- **Pattern:** Expand/Contract — Add new columns, migrate data, remove old columns in a separate later release.
