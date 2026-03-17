---
title: Memento
sidebar_label: 5 - Memento
displayed_sidebar: softwareArchitectureSidebar
tags: [behavioral-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Behavioral Patterns</span>

# Memento

- Purpose: Capture and externalize an object's internal state so that the object can be restored to this state later, without violating encapsulation.
- Use case: Implementing undo/redo functionality in editors, saving checkpoints in video games, database transaction rollbacks.

## Example

```java
import java.util.ArrayList;
import java.util.List;

// Memento (State snapshot)
public class Memento {
    private String state;

    public Memento(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }
}

// Originator (The object whose state needs saving)
public class Originator {
    private String state;

    public void setState(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }

    public Memento saveStateToMemento() {
        return new Memento(state);
    }

    public void getStateFromMemento(Memento memento) {
        state = memento.getState();
    }
}

// Caretaker (Manages the history)
public class Caretaker {
    private List<Memento> mementoList = new ArrayList<Memento>();

    public void add(Memento state) {
        mementoList.add(state);
    }

    public Memento get(int index) {
        return mementoList.get(index);
    }
}
```
