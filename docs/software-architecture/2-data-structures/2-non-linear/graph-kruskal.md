---
title: Graph Kruskal
sidebar_label: Graph - Kruskal
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Graph Kruskal

Kruskal's algorithm finds the Minimum Spanning Tree (MST) of a connected, undirected, weighted graph by greedily selecting edges from lowest to highest weight without forming cycles. Created by Joseph Kruskal in 1956, runs in O(E log E) time using Union-Find.

## Interactive visual - Kruskal

<iframe
  src={useBaseUrl('/files/1-non-linear-graph-kruskal.html')}
  title="Graph Kruskal Visual"
  style={{
    width: '100%',
    height: '650px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## Core Idea
Sort all edges → add smallest edge that doesn't create cycle → repeat until V-1 edges. MST connects all vertices with minimum total edge weight.

## Real-World Applications

```text

🌐 **Network design**: Minimum cost to connect cities
🚢 **Clustering**: K-means initialization
📡 **Clustering**: Computer vision segmentation
💰 **Matrix-tree theorem**: Determinant calculation

```

## Edge Cases

```text

✅ Disconnected: Returns MST forest (multiple trees)
✅ Same weights: Any valid MST (not unique)
❌ Directed graphs: Use other algorithms
❌ Negative weights: OK (MST doesn't care)

```

Key insight: Greedy works because adding heaviest edge in cycle to MST always creates suboptimal tree (Cut Property). Perfect for sparse graphs and parallelization.

