---
title: Template Method
sidebar_label: 8 - Template Method
displayed_sidebar: softwareArchitectureSidebar
tags: [behavioral-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Behavioral Patterns</span>

# Template Method

- Purpose: Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.
- Use case: Frameworks defining lifecycles where users hook into `onStart()`, `onUpdate()`, or `onDestroy()`, standardizing build tools where compilation steps are fixed but specific language compilation details vary.

## Example

```java
// Abstract Class outlining the template method
public abstract class Game {
    abstract void initialize();
    abstract void startPlay();
    abstract void endPlay();

    // The Template Method (made final so it cannot be overridden)
    public final void play() {
        initialize(); // Initialize the game
        startPlay();  // Start playing
        endPlay();    // End the game
    }
}

// Concrete Implementations
public class Cricket extends Game {
    @Override
    void endPlay() {
        System.out.println("Cricket Game Finished!");
    }

    @Override
    void initialize() {
        System.out.println("Cricket Game Initialized! Start playing.");
    }

    @Override
    void startPlay() {
        System.out.println("Cricket Game Started. Enjoy the game!");
    }
}

public class Football extends Game {
    @Override
    void endPlay() {
        System.out.println("Football Game Finished!");
    }

    @Override
    void initialize() {
        System.out.println("Football Game Initialized! Start playing.");
    }

    @Override
    void startPlay() {
        System.out.println("Football Game Started. Enjoy the game!");
    }
}
```
