---
title: Binary Search Tree (BST)
sidebar_label: Binary Search Tree
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Binary Search Tree (BST)

A **Binary Search Tree (BST)** is a node-based, hierarchical data structure that stores elements in a highly organized way to allow for fast search, insertion, and deletion operations.

Unlike searching an array, a BST natively handles **frequent data modifications** while maintaining its sorted property, giving it the search speed of Binary Search with the dynamic flexibility of a linked list.

---


## Interactive Visualizer

<iframe
  src={useBaseUrl('/files/searching-binary-search-tree.html')}
  title="Binary Search Tree Visualizer"
  style={{
    width: '100%',
    height: '800px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## Key Concepts

### The BST Property
For any given node in a valid Binary Search Tree:
- **Left Subtree:** Contains only nodes with values **strictly less** than the parent node's value.
- **Right Subtree:** Contains only nodes with values **strictly greater** than the parent node's value.
- Both the left and right subtrees must themselves be valid BSTs.

### Node Structure
A BST is composed of `Nodes`. Each node holds:
1. `value`: The data itself.
2. `left`: A pointer/reference to the left child node.
3. `right`: A pointer/reference to the right child node.

---

## Core Operations

### 1. Search (Find)
To find a value, start at the `root`:
1. If the target matches the current node, return the node.
2. If the target is **smaller** than the current node, move to the **left** child.
3. If the target is **larger** than the current node, move to the **right** child.
4. Repeat until found, or until a `null` child is reached (Target Not Found).

### 2. Insert
To insert a new value, traverse the tree exactly as if searching for it. When a `null` spot is found (an empty leaf position), attach the new node there.

### 3. Delete
Deletion is the most complex operation in a BST due to structural maintenance. It has three cases:
- **Case 1 (Leaf Node):** The node has no children. Simply remove it.
- **Case 2 (One Child):** The node has one child. Replace the node with its child.
- **Case 3 (Two Children):** The node has two children. Find its **In-Order Successor** (the smallest value in its right subtree), copy that successor's value to the node, and then recursively delete the original successor node.

---

## Traversals (Printing the Tree)

Because a BST is non-linear, there are multiple ways to read its contents.

1. **In-Order (Left, Root, Right):** Visits elements in ascending sorted order. Highly useful for extracting sorted arrays.
2. **Pre-Order (Root, Left, Right):** Used to create a copy of the tree.
3. **Post-Order (Left, Right, Root):** Used to safely delete the tree from the bottom up.

---

## Pseudocode

```text
// Node structure
class Node:
    value
    left
    right

// Search
function search(node, target):
    if node is NULL or node.value == target:
        return node
    
    if target < node.value:
        return search(node.left, target)
    else:
        return search(node.right, target)

// Insert
function insert(node, value):
    if node is NULL:
        return new Node(value)
    
    if value < node.value:
        node.left = insert(node.left, value)
    else if value > node.value:
        node.right = insert(node.right, value)
        
    return node
```

---

## Complexity Analysis

Let `n` = number of nodes in the tree, and `h` = the height of the tree.

| Case | Search | Insert | Delete |
|------|--------|--------|--------|
| **Best** (Balanced) | O(log n) | O(log n) | O(log n) |
| **Average** | O(log n) | O(log n) | O(log n) |
| **Worst** (Unbalanced) | O(n) | O(n) | O(n) |

- **Average Case O(log n)** — If the tree stays relatively balanced, every step down the tree eliminates half of the remaining nodes, identical to a Binary Search on an array.
- **Worst Case O(n)** — If items are inserted in already sorted order (e.g., 1, 2, 3, 4, 5), the tree degrades into a straight vertical line—essentially a Linked List. Operations degrade to O(n) time. *Advanced trees like AVL Trees or Red-Black Trees solve this by automatically self-balancing.*
- **Space Complexity** — O(n) to store the `n` nodes. Recursive operations require O(h) call stack memory, where `h` is the tree height.

---

## Key Properties

| Property | Value |
|----------|-------|
| Internal Ordering | ✅ Yes (Left < Root < Right) |
| Duplicate Handling | Varies (Usually restricted or put on right) |

:::tip When to Use
- **Dynamic Data:** When you need fast O(log n) searches on data that frequently undergoes *Insertions* and *Deletions*. (An array takes O(n) to shift elements upon insertion).
- **Sorted Extraction:** When you need the ability to quickly extract all elements in sorted order (via In-Order Traversal).
:::

:::caution When to Avoid
- **Degeneration Risk:** A vanilla BST can degrade to O(n) performance if given sorted input. Always use a balanced variant (Red-Black, AVL, B-Tree) in production databases.
- **Cache Locality:** Trees allocate nodes dynamically across the heap. They lack the contiguous memory cache-locality of arrays, meaning traversing a BST can be slower in real-world hardware than binary searching an array.
:::

---

## Comparison with Similar Structures

| Data Structure | Search (Avg) | Insert (Avg) | Delete (Avg) | Ordered? | Cache Friendly? |
|----------------|--------------|--------------|--------------|----------|-----------------|
| Sorted Array | O(log n) | O(n) | O(n) | ✅ Yes | ✅ Yes |
| Linked List | O(n) | O(1)* | O(1)* | ❌ No | ❌ No |
| Hash Table | O(1) | O(1) | O(1) | ❌ No | ❌ No |
| **Binary Search Tree** | O(log n) | O(log n) | O(log n) | ✅ Yes | ❌ No |

*(Linked List Insert/Delete is O(1) only if you already hold a pointer to the exact node node; otherwise finding the node takes O(n))*

---
