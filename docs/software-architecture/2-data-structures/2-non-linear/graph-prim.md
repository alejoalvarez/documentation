---
title: Graph Prim
sidebar_label: Graph - Prim
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Graph Prim

Prim's algorithm builds the Minimum Spanning Tree (MST) by growing a single tree from a starting vertex, always adding the cheapest edge connecting a tree vertex to a non-tree vertex. Vertex-centric approach, O(E log V) with priority queue.

Core Concept
Start with one vertex → repeatedly add minimum-weight edge crossing cut (tree vs non-tree) → repeat until V-1 edges. Greedy choice property guarantees optimality.

## Interactive visual - Prim

<iframe
  src={useBaseUrl('/files/1-non-linear-graph-prim.html')}
  title="Graph Prim Visual"
  style={{
    width: '100%',
    height: '650px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## Real-World Applications


- 🌐 **Circuit design**: Minimum wire length
- 🗺️ **Map clustering**: Road network partitioning
- 📡 **Cluster analysis**: K-means initialization
- 🖥️ **Matrix computations**: Graph Laplacian

## Key Properties

- ✅ Works with NEGATIVE weights (if connected)
- ✅ Single connected component guaranteed
- ✅ Greedy: Always picks globally optimal edge
- ✅ O(V²) dense, O(E log V) sparse

**Sweet spot**: Dense graphs where adjacency matrix fits memory. Kruskal wins sparse graphs. Both use Cut Property: safest edge across any cut is always in some MST.