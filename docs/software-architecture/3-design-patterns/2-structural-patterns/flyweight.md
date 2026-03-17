---
title: Flyweight
sidebar_label: 9 - Flyweight
displayed_sidebar: softwareArchitectureSidebar
tags: [structural-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Structural Patterns</span>

# Flyweight

- Purpose: Use sharing to support large numbers of fine-grained objects efficiently.
- Use case: Rendering millions of trees in a video game (where the 3D mesh is shared, but position/scale are unique to each instance), text editors where each character shares intrinsic font properties but has unique positions.

## Example

```java
import java.util.HashMap;
import java.util.Map;

// Intrinsic State (Shared)
class TreeType {
    private String name;
    private String color;
    private String otherTreeData; // e.g. heavy 3D mesh

    public TreeType(String name, String color, String otherTreeData) {
        this.name = name;
        this.color = color;
        this.otherTreeData = otherTreeData;
    }
    
    public void draw(int x, int y) {
        System.out.println("Drawing " + color + " " + name + " tree at (" + x + "," + y + ")");
    }
}

// Extrinsic State (Unique per instance)
class Tree {
    private int x, y;
    private TreeType type;

    public Tree(int x, int y, TreeType type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
    
    public void draw() {
        type.draw(x, y); // Passes extrinsic state to intrinsic object
    }
}

// Flyweight Factory
class TreeFactory {
    static Map<String, TreeType> treeTypes = new HashMap<>();

    public static TreeType getTreeType(String name, String color, String otherTreeData) {
        TreeType result = treeTypes.get(name);
        if (result == null) {
            result = new TreeType(name, color, otherTreeData);
            treeTypes.put(name, result);
        }
        return result;
    }
}
```
