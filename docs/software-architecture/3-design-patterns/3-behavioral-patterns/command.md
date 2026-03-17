---
title: Command
sidebar_label: 10 - Command
displayed_sidebar: softwareArchitectureSidebar
tags: [behavioral-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Behavioral Patterns</span>

# Command

- Purpose: Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.
- Use case: GUI buttons and menu items executing actions, macro recording, implementing Undo/Redo features by keeping a history of executed command objects.

## Example

```java
import java.util.ArrayList;
import java.util.List;

// Command Interface
public interface Command {
    void execute();
}

// Receiver
public class Light {
    public void turnOn() {
        System.out.println("The light is on");
    }
    public void turnOff() {
        System.out.println("The light is off");
    }
}

// Concrete Commands
public class TurnOnLightCommand implements Command {
    private Light light;

    public TurnOnLightCommand(Light light) {
        this.light = light;
    }

    public void execute() {
        light.turnOn();
    }
}

public class TurnOffLightCommand implements Command {
    private Light light;

    public TurnOffLightCommand(Light light) {
        this.light = light;
    }

    public void execute() {
        light.turnOff();
    }
}

// Invoker
public class Switch {
    private List<Command> history = new ArrayList<>();

    public void storeAndExecute(Command command) {
        this.history.add(command); // optional: used for undo
        command.execute();
    }
}
```
