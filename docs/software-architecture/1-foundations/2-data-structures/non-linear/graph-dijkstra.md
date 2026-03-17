---
title: Graph dijkstra
sidebar_label: 11 - Graph - dijkstra
displayed_sidebar: softwareArchitectureSidebar
tags: [Non-Linear-data-structures]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Non-Linear Data Structures</span>

# Graph dijkstra

Uses a priority queue to always expand the closest unvisited node. Greedily selects the node with smallest known distance, then "relaxes" its edges (updates neighbors if shorter path found).



## Interactive visual - dijkstra

<iframe
  src={useBaseUrl('/files/1-non-linear-graph-dijkstra.html')}
  title="Graph dijkstra Visual"
  style={{
    width: '100%',
    height: '650px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## Key Properties
- ✅ Non-negative weights only (use Bellman-Ford for negatives)
- ✅ Single source (all destinations)
- ✅ Greedy: Never revisits settled nodes
- ✅ Optimal substructure: Shortest path through u + edge = global shortest

## Real-World Uses

```text

🗺️  GPS: Shortest route (Amsterdam→Rotterdam)
🌐 Network routing: OSPF protocol
📦 Logistics: Warehouse picking paths
🎮 Games: Pathfinding AI
Stops early for single target (when target extracted). O((V+E)log V) makes it practical for road networks (millions nodes).

```