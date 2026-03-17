---
title: State
sidebar_label: 7 - State
displayed_sidebar: softwareArchitectureSidebar
tags: [behavioral-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Behavioral Patterns</span>

# State

- Purpose: Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.
- Use case: Finite State Machines (FSM), multimedia players switching behavior between playing/paused/stopped states, vending machines validating coin inputs vs item dispensing.

## Example

```java
// State Interface
public interface State {
    public void doAction(Context context);
}

// Concrete States
public class StartState implements State {
    public void doAction(Context context) {
        System.out.println("Player is in start state");
        context.setState(this);	
    }

    public String toString(){
        return "Start State";
    }
}

public class StopState implements State {
    public void doAction(Context context) {
        System.out.println("Player is in stop state");
        context.setState(this);	
    }

    public String toString(){
        return "Stop State";
    }
}

// Context
public class Context {
    private State state;

    public Context() {
        state = null;
    }

    public void setState(State state) {
        this.state = state;		
    }

    public State getState() {
        return state;
    }
}
```
