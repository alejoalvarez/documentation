---
title: Chain of Responsibility
sidebar_label: 1 - Chain of Responsibility
displayed_sidebar: softwareArchitectureSidebar
tags: [behavioral-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Behavioral Patterns</span>

# Chain of Responsibility

- Purpose: Pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.
- Use case: Request filtering, middlewares in web servers (like Express.js), logging pipelines where different severity levels are handled by different targets.

## Example

```java
// Handler Interface
public abstract class Logger {
    public static int INFO = 1;
    public static int DEBUG = 2;
    public static int ERROR = 3;

    protected int mask;
    protected Logger next; // The next element in the chain

    public Logger setNext(Logger nextlogger) {
        this.next = nextlogger;
        return nextlogger;
    }

    public void message(String msg, int priority) {
        if (priority <= mask) {
            writeMessage(msg);
        }
        if (next != null) {
            next.message(msg, priority);
        }
    }
    
    abstract protected void writeMessage(String msg);
}

// Concrete Handlers
public class ConsoleLogger extends Logger {
    public ConsoleLogger(int mask) { this.mask = mask; }
    protected void writeMessage(String msg) {
        System.out.println("Console: " + msg);
    }
}

public class EmailLogger extends Logger {
    public EmailLogger(int mask) { this.mask = mask; }
    protected void writeMessage(String msg) {
        System.out.println("Emailing: " + msg);
    }
}
```
