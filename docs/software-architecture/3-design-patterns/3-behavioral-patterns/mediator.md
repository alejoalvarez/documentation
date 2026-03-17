---
title: Mediator
sidebar_label: 4 - Mediator
displayed_sidebar: softwareArchitectureSidebar
tags: [behavioral-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Behavioral Patterns</span>

# Mediator

- Purpose: Reduce chaotic dependencies between objects by forcing them to collaborate only via a mediator object.
- Use case: Chat room apps where users don't talk directly to one another but message the room, aircraft control systems where planes interact with the tower instead of each other.

## Example

```java
import java.util.Date;

// Mediator
public class ChatRoom {
    public static void showMessage(User user, String message) {
        System.out.println(new Date().toString() + " [" + user.getName() + "] : " + message);
    }
}

// Colleague
public class User {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User(String name) {
        this.name = name;
    }

    public void sendMessage(String message) {
        // Colleague delegates communication to the mediator
        ChatRoom.showMessage(this, message);
    }
}

// Client usage
// User robert = new User("Robert");
// User john = new User("John");
// robert.sendMessage("Hi! John!");
// john.sendMessage("Hello! Robert!");
```
