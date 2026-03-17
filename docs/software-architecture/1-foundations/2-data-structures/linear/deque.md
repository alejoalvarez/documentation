---
title: Deque
sidebar_label: 6 - Deque
displayed_sidebar: softwareArchitectureSidebar
tags: [Linear-data-structures]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Linear Data Structures</span>

# Deque

A `Deque`, short for `Double-Ended Queue`, is a linear data structure that allows you to insert and delete elements from both the front and the rear.

Think of it as a hybrid between a Stack and a Queue. Depending on how you use it, it can behave like either one:
- If you only use one end, it’s a Stack.
- If you insert at one end and remove from the other, it’s a Queue.

## Interactive visual - Deque

<iframe
  src={useBaseUrl('/files/1-linear-deque.html')}
  title="Linear Array Visual"
  style={{
    width: '100%',
    height: '600px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>


## Core Operations

A Deque provides four primary operations, all of which typically run in O(1) time:
- `Insert Front`: Adds an item to the beginning of the Deque.
- `Insert Rear`: Adds an item to the end (like a normal Queue).
- `Delete Front`: Removes the first item.
- `Delete Rear`: Removes the last item (like a Stack).

Additional helper methods:
- `getFront / getRear`: Inspects the elements at the ends without removing them.
- `isEmpty / isFull`: Checks the status of the underlying storage.

## Real-World Applications

Why would you need a Deque instead of a simple Queue?

- `Undo/Redo History`: Many software applications use Deques to manage history. You add new actions to the end, but if the history gets too long, the oldest actions are removed from the front to save memory.

- `A-Steal Scheduling`: In multi-core processing, if one processor finishes its tasks, it can "steal" a task from the back of another processor's Deque to keep the system balanced.

- `Palindrome Checker`: Because you can remove characters from both ends simultaneously, Deques are the go-to structure for checking if a word is the same backward and forward.

- `Web Browser Cache`: Recent URLs are added to the front; if the cache limit is reached, the least recently used (LRU) URL is removed from the rear.