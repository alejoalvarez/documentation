---
title: Graph Bellman-Ford
sidebar_label: 12 - Graph - Bellman-Ford
displayed_sidebar: softwareArchitectureSidebar
tags: [Non-Linear-data-structures]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Non-Linear Data Structures</span>

# Graph Bellman-Ford

Bellman-Ford algorithm computes shortest paths from a source node to all others in weighted graphs, handling negative edge weights unlike Dijkstra. It detects negative cycles where shortest paths are undefined. Runs in O(VE) time.


## Interactive visual - Bellman-Ford

<iframe
  src={useBaseUrl('/files/1-non-linear-graph-bellman-ford.html')}
  title="Graph Bellman-Ford Visual"
  style={{
    width: '100%',
    height: '650px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## Real-World Uses

```text
💰 **Arbitrage**: Currency exchange cycles (negative = profit)
📡 **RIP routing protocol**: Internet routers (handles policy weights)
🔄 **Constraint graphs**: Scheduling with penalties
```
