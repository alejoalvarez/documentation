---
title: Tree - Binary Search Tree
sidebar_label: Tree - Binary Search Tree
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Binary Search Tree (BST)

A `Binary Search Tree` is a node-based binary tree data structure which has the following properties:

- The Left Subtree of a node contains only nodes with keys less than the node's key.
- The Right Subtree of a node contains only nodes with keys greater than the node's key.
- No Duplicate Keys: Each node must have a unique value (in standard implementations).
- Recursive Nature: Both the left and right subtrees must also be binary search trees.

## Interactive visual - Binary Tree Search

<iframe
  src={useBaseUrl('/files/1-non-linear-binary-search-tree.html')}
  title="Linear Array Visual"
  style={{
    width: '100%',
    height: '900px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## Why use a BST?

- Faster than LinkedLists: Searching a list of 1 million items takes 1 million steps ($O(n)$). In a balanced BST, it takes only ~20 steps ($O(\log n)$).
- Dynamic Size: Like a LinkedList, it grows as needed.
- Ordered Data: It keeps data sorted naturally, unlike a Hash Table.