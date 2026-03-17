---
title: Singleton
sidebar_label: 1 - Singleton
displayed_sidebar: softwareArchitectureSidebar
tags: [creational-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Creational Patterns</span>

# Singleton

- Purpose: A single global instance
- Structure
- Thread-safe implementation
- Anti-pattern: makes testing difficult
- Use case: Logger, ConfigurationManager, DatabaseConnection pool

## Example

```java
public class DatabaseConnection {
  private static DatabaseConnection instance;
  
  private DatabaseConnection() {}
  
  public synchronized static DatabaseConnection getInstance() {
    if (instance == null) {
      instance = new DatabaseConnection();
    }
    return instance;
  }
}
```

