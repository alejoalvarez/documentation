---
title: B trees
sidebar_label: Tree - B tress
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# B Trees

A B-Tree is a self-balancing tree data structure designed for efficient disk-based storage and retrieval, where each node can have multiple children (not just 2 like binary trees). It's widely used in databases (MySQL, PostgreSQL) and filesystems (NTFS, ext4) because it minimizes disk I/O by keeping data highly local.

## Interactive visual - B Trees

<iframe
  src={useBaseUrl('/files/1-non-linear-b-trees.html')}
  title="B Tree Visual"
  style={{
    width: '100%',
    height: '900px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## Real-World Example
MySQL InnoDB uses B+Trees (B-Tree variant):

```
Indexes: 100 keys/node → height=3 for 1B rows
Query: SELECT * FROM users WHERE age BETWEEN 25-35
→ 3 disk reads vs 27 for binary tree
```


B+Tree Variant (Most Common)
- Leaves linked: Sequential scan without traversing tree
- Internal nodes: Only indexes (no data)

```
[10,20,30] → [40,50] → [60]
↓linked leaves with actual data
```

Why B-Trees win: Designed for block storage where each read costs 10ms. A height of 4 means 40ms vs 200ms+ for unbalanced trees.