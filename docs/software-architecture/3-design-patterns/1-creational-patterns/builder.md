---
title: Builder
sidebar_label: 4 - Builder
displayed_sidebar: softwareArchitectureSidebar
tags: [creational-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Creational Patterns</span>

# Builder

- Purpose: To build complex objects step by step
- Alternative to: Constructors with many parameters
- Use case: StringBuilder, fluent API, building objects with multiple optional fields

## Example

```java
User user = new User.Builder()
  .setName("Juan")
  .setEmail("juan@example.com")
  .setAge(30)
  .build();
```

