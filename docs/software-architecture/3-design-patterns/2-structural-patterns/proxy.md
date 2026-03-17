---
title: Proxy
sidebar_label: 8 - Proxy
displayed_sidebar: softwareArchitectureSidebar
tags: [structural-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Structural Patterns</span>

# Proxy

- Purpose: Provide a surrogate or placeholder for another object to control access to it.
- Use case: Lazy Initialization (Virtual Proxy), Access Control (Protection Proxy), Remote Method Invocation (Remote Proxy), or Logging.

## Example

```java
// Subject Interface
public interface Image {
    void display();
}

// Real Subject
public class RealImage implements Image {
    private String filename;
    
    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();
    }
    
    private void loadFromDisk() {
        System.out.println("Loading huge image file " + filename);
    }
    
    public void display() {
        System.out.println("Displaying " + filename);
    }
}

// Proxy
public class ProxyImage implements Image {
    private RealImage realImage;
    private String filename;
    
    public ProxyImage(String filename) {
        this.filename = filename;
    }
    
    public void display() {
        // Intercepts the call and delays loading until strictly necessary
        if (realImage == null) {
            realImage = new RealImage(filename);
        }
        realImage.display();
    }
}
```
