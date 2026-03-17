---
title: LinkedList
sidebar_label: 3 - LinkedList
displayed_sidebar: softwareArchitectureSidebar
tags: [Linear-data-structures]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Linear Data Structures</span>

# LinkedList

If the Array was a fixed row of boxes and the ArrayList was an elastic row, the LinkedList is something completely different: imagine a treasure hunt. Each clue gives you an object and a piece of paper that tells you where to find the next clue.


## Interactive visual - Singly LinkedList

<iframe
  src={useBaseUrl('/files/1-linear-singly-linkedlist.html')}
  title="Linear Array Visual"
  style={{
    width: '100%',
    height: '600px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## Interactive visual - Doubly LinkedList

<iframe
  src={useBaseUrl('/files/1-linear-doubly-linkedlist.html')}
  title="Linear Array Visual"
  style={{
    width: '100%',
    height: '600px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>


## Interactive visual - Doubly LinkedList

<iframe
  src={useBaseUrl('/files/1-linear-circular-linkedlist.html')}
  title="Linear Array Visual"
  style={{
    width: '100%',
    height: '600px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## What is a LinkedList?
A Linear LinkedList is a collection of elements called Nodes. Unlike arrays, nodes are not together in memory; they can be scattered anywhere. What keeps them together is that each node knows who its successor is.

Anatomy of a Node

A node is divided into two main parts:

- Data: The value you want to store (number, text, object).
- Next (Pointer/Reference): The memory address of the next node in the list.

The last node in the list points to null, which indicates the end of the chain.


# Example

Python doesn't have built-in linked lists like some languages, but you can implement a singly linked list using a Node class with a data value and next pointer. This structure allows efficient insertions/deletions without fixed sizing, unlike lists or arrays.

```python

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    def print_list(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

```

**Usage Example**

```python
llist = LinkedList()
llist.append(1)
llist.append(2)
llist.append(3)
llist.print_list()  # Output: 1 -> 2 -> 3 -> None
```

- The `head` points to the first node; each `next` links to the subsequent one until `None`.

**Insertion at Beginning**

```python

def insert_at_beginning(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node

```

Add this method to LinkedList for O(1) prepends.


## Types of LinkedLists
Although we are talking about the linear form, there are three common variants:

- Singly Linked List (Simple): Each node points only to the next one. (One direction).
- Doubly Linked List (Double): Each node points to the next and the previous one. (Two directions).
- Circular Linked List: The last node points back to the first one, forming a ring.
