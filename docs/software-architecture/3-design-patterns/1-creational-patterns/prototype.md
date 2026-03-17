---
title: Prototype
sidebar_label: 5 - Prototype
displayed_sidebar: softwareArchitectureSidebar
tags: [creational-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Creational Patterns</span>

# Prototype

- Purpose: Cloning objects without knowing their exact class
- Implementation: Cloneable interface
- Use case: Objects that are expensive to create

## Example

```java
public class Shape implements Cloneable {
  @Override
  public Shape clone() throws CloneNotSupportedException {
    return (Shape) super.clone();
  }
}
```

