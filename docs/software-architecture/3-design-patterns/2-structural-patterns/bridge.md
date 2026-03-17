---
title: Bridge
sidebar_label: 4 - Bridge
displayed_sidebar: softwareArchitectureSidebar
tags: [structural-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Structural Patterns</span>

# Bridge

- Purpose: Decouple an abstraction from its implementation so that the two can vary independently.
- Use case: Cross-platform development, UI frameworks where the interface and rendering engine need to be developed and swapped out dynamically without rebuilding the entire inheritance tree.

## Example

```java
// Implementation interface
public interface RenderingAPI {
    void renderCircle(float x, float y, float radius);
}

// Concrete Implementations
public class WindowsRenderer implements RenderingAPI {
    public void renderCircle(float x, float y, float radius) {
        System.out.println("Windows rendering circle at " + x + ":" + y + " radius " + radius);
    }
}
public class MacRenderer implements RenderingAPI {
    public void renderCircle(float x, float y, float radius) {
        System.out.println("Mac rendering circle at " + x + ":" + y + " radius " + radius);
    }
}

// Abstraction
public abstract class Shape {
    protected RenderingAPI renderingAPI;
    
    protected Shape(RenderingAPI renderingAPI) {
        this.renderingAPI = renderingAPI;
    }
    public abstract void draw();
}

// Refined Abstraction
public class Circle extends Shape {
    private float x, y, radius;
    
    public Circle(float x, float y, float radius, RenderingAPI renderingAPI) {
        super(renderingAPI);
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    
    public void draw() {
        renderingAPI.renderCircle(x, y, radius);
    }
}
```
