---
title: Queue
sidebar_label: 5 - Queue
displayed_sidebar: softwareArchitectureSidebar
tags: [Linear-data-structures]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Linear Data Structures</span>

# Queue

A queue is a linear data structure that follows the FIFO (First-In, First-Out) principle, which means that the first item to enter is the first to leave.

It is the fairest structure that exists: the item that has been waiting the longest is the one that is processed first.


## Interactive visual - Queue

<iframe
  src={useBaseUrl('/files/1-linear-queue.html')}
  title="Linear Array Visual"
  style={{
    width: '100%',
    height: '600px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## Fundamental Operations

Unlike a Stack (where everything happens at the “Top”), in a Queue we work with two ends: the Front and the Rear/Back.

- `Enqueue`: Adds an element to the end of the queue.
- `Dequeue`: Removes and returns the element at the front of the queue.
- `Front` (or Peek): Looks at who is first in line without removing them.
- `isEmpty`: Checks if there is no one waiting.

## Variations of the Queue

Sometimes a simple queue is not enough, so there are variants:

- `Priority Queue`: The first item to arrive is not the first to leave, but rather the one that is “most important” (like a hospital emergency room).
- `Deque (Double-Ended Queue)`: You can insert and remove items from both the front and the end. It is a hybrid between a Stack and a Queue.
- `Circular Queue`: The last position connects to the first to take advantage of the memory gaps left when someone leaves the queue.

## Real-world use cases

Queues are vital for managing shared resources:

- Printers: Documents are printed in the order they were sent.
- Web servers: When thousands of people visit a site, the server puts them in a queue to handle requests one by one.
- Operating Systems: To decide which process should use the processor (CPU Scheduling).
- Video Buffers: When you watch YouTube, the video is downloaded into a queue so that you always have fragments ready to play.