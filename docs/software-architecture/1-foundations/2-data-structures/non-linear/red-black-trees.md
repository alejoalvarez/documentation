---
title: Red black tree
sidebar_label: 4 - Tree - Red black tree
displayed_sidebar: softwareArchitectureSidebar
tags: [Non-Linear-data-structures]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Non-Linear Data Structures</span>

# Red - Black Tree

A Red-Black Tree is a self-balancing binary search tree where each node has a color (red or black) to maintain balance through specific rules. It guarantees O(log n) operations while allowing fewer rotations than AVL trees, making it widely used in standard libraries like C++'s std::map and Java's TreeMap.

## Interactive visual - Red Black Tree

<iframe
  src={useBaseUrl('/files/1-non-linear-red-black-trees.html')}
  title="AVL Tree Visual"
  style={{
    width: '100%',
    height: '900px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>