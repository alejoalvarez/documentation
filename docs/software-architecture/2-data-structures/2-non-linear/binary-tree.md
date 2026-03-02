---
title: Binary Tree
sidebar_label: Tree - Binary Tree
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Binary Tree

Python does not have native binary trees, but they are implemented with a Node class that contains data and left/right pointers. Each node can have up to 2 children, which is useful for efficient searches (O(log n)).

## Interactive visual - Binary tree

<iframe
  src={useBaseUrl('/files/1-non-linear-binary-tree.html')}
  title="Linear Array Visual"
  style={{
    width: '100%',
    height: '900px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>


## Node Class and Basic Tree 
```python

class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

# Create tree manually
root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)

```

## Common Traversals

```python 

def inorder(node):  # left → root → right (ordened in BST)
    if node:
        inorder(node.left)
        print(node.data, end=" ")
        inorder(node.right)

def preorder(node):  # root → left → right
    if node:
        print(node.data, end=" ")
        preorder(node.left)
        preorder(node.right)

def postorder(node):  # left → right → root
    if node:
        postorder(node.left)
        postorder(node.right)
        print(node.data, end=" ")

# use
inorder(root)   # 4 2 5 1 3
print()
preorder(root)  # 1 2 4 5 3


```

## Insertion into a Binary Search Tree (BST)

```python

class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, data):
        if not self.root:
            self.root = Node(data)
        else:
            self._insert_recursive(self.root, data)
    
    def _insert_recursive(self, node, data):
        if data < node.data:
            if node.left is None:
                node.left = Node(data)
            else:
                self._insert_recursive(node.left, data)
        else:
            if node.right is None:
                node.right = Node(data)
            else:
                self._insert_recursive(node.right, data)

bst = BST()
bst.insert(50)
bst.insert(30)
bst.insert(70)
inorder(bst.root)  # 30 50 70


```