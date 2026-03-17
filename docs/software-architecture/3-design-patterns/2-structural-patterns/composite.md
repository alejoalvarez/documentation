---
title: Composite
sidebar_label: 5 - Composite
displayed_sidebar: softwareArchitectureSidebar
tags: [structural-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Structural Patterns</span>

# Composite

- Purpose: Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.
- Use case: File system directories (where a folder can contain files or other folders), UI Components, Document DOM structures.

## Example

```java
import java.util.ArrayList;
import java.util.List;

// Component
public interface Graphic {
    void draw();
}

// Leaf
public class Ellipse implements Graphic {
    public void draw() {
        System.out.println("Ellipse");
    }
}

// Composite
public class CompositeGraphic implements Graphic {
    private List<Graphic> childGraphics = new ArrayList<>();

    public void add(Graphic graphic) {
        childGraphics.add(graphic);
    }

    public void remove(Graphic graphic) {
        childGraphics.remove(graphic);
    }

    public void draw() {
        for (Graphic graphic : childGraphics) {
            graphic.draw(); // Delegates the draw operation to children indiscriminately
        }
    }
}
```
