---
title: AVL Tree
sidebar_label: 3 - Tree - AVL Tree
displayed_sidebar: softwareArchitectureSidebar
tags: [Non-Linear-data-structures]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Non-Linear Data Structures</span>

# AVL Tree

An AVL tree is a self-balancing binary search tree where the height difference between the left and right subtrees of each node is at most 1. Invented in 1962 by Adelson-Velskii and Landis, it guarantees O(log n) operations.

## Interactive visual - AVL Tree

<iframe
  src={useBaseUrl('/files/1-non-linear-AVL-tree.html')}
  title="AVL Tree Visual"
  style={{
    width: '100%',
    height: '900px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>