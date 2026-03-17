---
title: Observer
sidebar_label: 6 - Observer
displayed_sidebar: softwareArchitectureSidebar
tags: [behavioral-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Behavioral Patterns</span>

# Observer

- Purpose: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
- Use case: GUI event handling (listeners/callbacks), publish-subscribe systems like message brokers (Kafka/RabbitMQ on a smaller scale), MVC architectures linking views to models.

## Example

```java
import java.util.ArrayList;
import java.util.List;

// Subject (Observable)
public class Subject {
    private List<Observer> observers = new ArrayList<Observer>();
    private int state;

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
        notifyAllObservers(); // State change triggers an update to all
    }

    public void attach(Observer observer) {
        observers.add(observer);
    }

    public void notifyAllObservers() {
        for (Observer observer : observers) {
            observer.update();
        }
    }
}

// Observer Interface
public abstract class Observer {
    protected Subject subject;
    public abstract void update();
}

// Concrete Observers
public class BinaryObserver extends Observer {
    public BinaryObserver(Subject subject) {
        this.subject = subject;
        this.subject.attach(this);
    }

    @Override
    public void update() {
        System.out.println("Binary String: " + Integer.toBinaryString(subject.getState()));
    }
}

public class OctalObserver extends Observer {
    public OctalObserver(Subject subject) {
        this.subject = subject;
        this.subject.attach(this);
    }

    @Override
    public void update() {
        System.out.println("Octal String: " + Integer.toOctalString(subject.getState()));
    }
}
```
