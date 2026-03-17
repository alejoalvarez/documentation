---
title: Decorator
sidebar_label: 6 - Decorator
displayed_sidebar: softwareArchitectureSidebar
tags: [structural-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Structural Patterns</span>

# Decorator

- Purpose: Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality without exploding the class hierarchy.
- Use case: Adding data streams (like compression or encryption) dynamically in Java `InputStream`, or decorating UI elements with borders or scrollbars at runtime.

## Example

```java
// Component
public interface Coffee {
    double getCost();
    String getDescription();
}

// Concrete Component
public class SimpleCoffee implements Coffee {
    public double getCost() { return 1.0; }
    public String getDescription() { return "Simple coffee"; }
}

// Base Decorator
public abstract class CoffeeDecorator implements Coffee {
    protected final Coffee decoratedCoffee;
    
    public CoffeeDecorator(Coffee c) {
        this.decoratedCoffee = c;
    }
    
    public double getCost() { return decoratedCoffee.getCost(); }
    public String getDescription() { return decoratedCoffee.getDescription(); }
}

// Concrete Decorator
public class Milk extends CoffeeDecorator {
    public Milk(Coffee c) {
        super(c);
    }
    
    public double getCost() {
        return super.getCost() + 0.5;
    }
    
    public String getDescription() {
        return super.getDescription() + ", Milk";
    }
}
```
