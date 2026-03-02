---
title: Heaps
sidebar_label: Tree - Heaps
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Heaps

A heap is a complete binary tree data structure that satisfies the heap property: parent nodes are either greater than (max-heap) or smaller than (min-heap) their children. Stored in arrays for cache efficiency, it's the backbone of priority queues with O(log n) insert/extract operations.

Two Properties
1. Heap Property:

- Max-heap: Parent ≥ children (root = maximum)
- Min-heap: Parent ≤ children (root = minimum)

2. Shape Property: Complete binary tree (all levels filled left→right)
## Interactive visual - Heaps

<iframe
  src={useBaseUrl('/files/1-non-linear-heaps.html')}
  title="Heaps  Visual"
  style={{
    width: '100%',
    height: '900px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>