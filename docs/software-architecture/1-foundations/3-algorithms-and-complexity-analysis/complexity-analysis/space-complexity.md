---
title: Space Complexity
sidebar_label: Space Complexity
displayed_sidebar: softwareArchitectureSidebar
tags: [Complexity-Analysis]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Complexity Analysis</span>

# Space Complexity

While **Time Complexity** measures total processing steps, **Space Complexity** strictly measures *how much physical system memory (RAM)* an algorithm allocates to successfully complete, relative to the data input size `N`. 

Good software architecture demands a balancing act between speed and memory length constraint—often relying on memory tradeoffs to compute things faster.

---

## Interactive Visualizer: RAM Allocation

This visualization demonstrates how assigning temporary variables vs creating new 1D arrays vs generating 2D matrices occupies exponentially different memory blocks in the application heap.

<iframe
  src={useBaseUrl('/files/complexity-space.html')}
  title="Space Complexity Visual"
  style={{
    width: '100%',
    height: '500px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
    marginBottom: '20px'
  }}
/>

---

## Auxiliary Space vs Total Space

When reviewing algorithms, it's vital to distinguish between two terms:

1. **Total Space Complexity:** The memory required by the initial input data `n`, *plus* the extra memory the algorithm requires to do its calculation.
2. **Auxiliary Space:** ONLY the extra, temporary memory instantiated by the algorithm during runtime. 

In almost every technical discussion, when people say "Space Complexity", they are explicitly referring to **Auxiliary Space**. 

## Examples of Space Complexity

### O(1) Constant Space
Memory allocation does not grow, regardless of how large the input `n` array gets. The algorithm only uses a few independent variables (like a loop counter, or independent temporary cache pointers).
- **Example:** Bubble Sort, tracking pointer locations in a Linked List.
```python
def get_sum(my_list):
    total_value = 0 # Allocates 1 temp variable memory block
    for num in my_list:
        total_value += num
    return total_value
```

### O(n) Linear Space
The algorithm requires memory allocation directly proportional to the size of the input data. Often occurs when creating a "copy" of the array, or storing data in a Hash Map to do fast `O(1)` lookups.
- **Example:** Pushing all items into a Dictionary, or duplicating an Array.
```python
def double_list(my_list):
    new_list = [] # Allocates a brand new list in memory
    for num in my_list:
        new_list.append(num * 2) # Pushes exactly N items into it
    return new_list
```

### O(n²) Quadratic Space
The algorithm requires a catastrophic amount of memory scaling quadratically to the input data. This usually denotes generating a multi-dimensional structure over singular data inputs.
- **Example:** Building a mathematical Adjacency Matrix (Graph) mapping the connections of every node to every other node.
```python
def create_grid(n):
    grid = []
    for i in range(n):       # Loops N times...
        row = []
        for j in range(n):   # ...and creates N items each time.
            row.append(0) 
        grid.append(row)
    return grid
```

---

## Call Stack Memory (The Recursion Trap)

A common mistake is forgetting that Recursive function calls cost memory!

Every time a function calls itself recursively, the compiler suspends the first function state and allocates memory to track the second call on the "Call Stack".

```python
def recursive_countdown(n):
    if n == 0: return
    recursive_countdown(n - 1)
```

The algorithm above has `0` variables explicitly declared inside of it, so it feels like it uses `O(1)` space. However, because it recursively stacks `n` execution frames continuously until hitting `0`, the Call Stack occupies **`O(n)` Space**.

This is why Iterative Loops (`while/for`) are often preferred to recursion if you want to aggressively optimize system memory.
