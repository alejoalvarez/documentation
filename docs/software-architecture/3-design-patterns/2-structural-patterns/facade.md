---
title: Facade
sidebar_label: 7 - Facade
displayed_sidebar: softwareArchitectureSidebar
tags: [structural-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Structural Patterns</span>

# Facade

- Purpose: Provide a unified interface to a set of interfaces in a subsystem. Define a higher-level interface that makes the subsystem easier to use and completely hides its complex internal gears from the client.
- Use case: Exposing a simplified video conversion API that wraps complex audio extractors, bit rate adjusters, and frame manipulation under the hood.

## Example

```java
// Complex Subsystem Parts
class CPU {
    public void freeze() { ... }
    public void jump(long position) { ... }
    public void execute() { ... }
}
class Memory {
    public void load(long position, byte[] data) { ... }
}
class HardDrive {
    public byte[] read(long lba, int size) { return new byte[size]; }
}

// Facade
public class ComputerFacade {
    private CPU processor;
    private Memory ram;
    private HardDrive hd;

    public ComputerFacade() {
        this.processor = new CPU();
        this.ram = new Memory();
        this.hd = new HardDrive();
    }

    // Simplified Interface for the Client
    public void start() {
        processor.freeze();
        ram.load(0x00, hd.read(0x00, 1024));
        processor.jump(0x00);
        processor.execute();
    }
}
```
