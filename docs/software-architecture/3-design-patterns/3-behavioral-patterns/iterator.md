---
title: Iterator
sidebar_label: 3 - Iterator
displayed_sidebar: softwareArchitectureSidebar
tags: [behavioral-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Behavioral Patterns</span>

# Iterator

- Purpose: Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation (like arrays, trees, hash maps).
- Use case: Iterating over UI components, navigating through DOM trees, streaming data elements sequentially.

## Example

```java
// Iterator Interface
public interface Iterator {
    boolean hasNext();
    Object next();
}

// Aggregate Interface
public interface Container {
    Iterator getIterator();
}

// Concrete Aggregate
public class NameRepository implements Container {
    public String[] names = {"Robert" , "John" ,"Julie" , "Lora"};

    @Override
    public Iterator getIterator() {
        return new NameIterator();
    }

    // Inner Concrete Iterator
    private class NameIterator implements Iterator {
        int index;

        @Override
        public boolean hasNext() {
            if (index < names.length) {
                return true;
            }
            return false;
        }

        @Override
        public Object next() {
            if (this.hasNext()) {
                return names[index++];
            }
            return null;
        }
    }
}
```
