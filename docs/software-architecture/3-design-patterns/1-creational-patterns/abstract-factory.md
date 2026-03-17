---
title: Abstract Factory
sidebar_label: 3 - Abstract Factory
displayed_sidebar: softwareArchitectureSidebar
tags: [creational-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Creational Patterns</span>

# Abstract Factory

- Purpose: To create families of related objects
- Difference from the Factory Method: multiple creation methods
- Use cases: UIFactory (Windows, Mac), DatabaseFactory (MySQL, PostgreSQL)

## Example

```java
public interface UIFactory {
  Button createButton();
  TextBox createTextBox();
}
public class WindowsUIFactory implements UIFactory { ... }
public class MacUIFactory implements UIFactory { ... }
```

