---
title: Factory Method
sidebar_label: 2 - Factory Method
displayed_sidebar: softwareArchitectureSidebar
tags: [creational-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Creational Patterns</span>

# Factory Method

- Purpose: Create objects without specifying specific classes
- Advantages: Decoupling, facilitates extension
- Use case: DocumentFactory (PDF, Word, Excel), TransportFactory (HTTP, FTP, SFTP)

## Example

```java
public interface Document { void open(); }
public class PDFDocument implements Document { ... }
public class WordDocument implements Document { ... }

public abstract class DocumentFactory {
  public abstract Document createDocument();
}

public class PDFFactory extends DocumentFactory {
  @Override
  public Document createDocument() {
    return new PDFDocument();
  }
}
```

