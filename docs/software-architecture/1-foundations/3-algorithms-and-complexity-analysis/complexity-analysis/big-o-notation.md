---
title: Big O Notation
sidebar_label: Big O Notation
displayed_sidebar: softwareArchitectureSidebar
tags: [Complexity-Analysis]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Complexity Analysis</span>

# Big O Notation

**Big O Notation** is the mathematical language used in computer science to describe how an algorithm's runtime or space requirements scale as the data input grows toward infinity. It establishes the "worst-case" boundary of your code.

Instead of measuring code execution in *seconds* (which varies randomly by CPU, background tasks, and hardware), Big O measures efficiency in **number of operations** relative to the input size (`n`).

---

## Interactive Visualizer

Adjust the **Input Size (n)** slider and click the algorithms in the legend to observe how different complexities explode at different rates. *Hover over the curves to trace their trajectories.*

<iframe
  src={useBaseUrl('/files/complexity-big-o.html')}
  title="Big O Visualizer"
  style={{
    width: '100%',
    height: '670px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
    marginBottom: '20px'
  }}
/>

---

## The 7 Standard Orders of Growth

Ranked from excellent to absolutely disastrous:

### 1. `O(1)` - Constant Time (Excellent)
The algorithm executes in the exact same amount of time, regardless of how huge the data gets.
- **Examples:** Finding an element in a Hash Map, reading an Array by index, checking if a number is even.
```python
def is_first_item_null(my_list):
    return my_list[0] == None
```

### 2. `O(log n)` - Logarithmic (Great)
The data set is halved during every step. It grows extremely slowly. A billion items take barely 30 operations.
- **Examples:** Binary Search, looking up a value in a balanced Binary Search Tree limit.
```python
# Continually chopping the search space in half
def binary_search(arr, val):
    # operations drop exponentially...
```

### 3. `O(n)` - Linear Time (Fair)
If you double the input, the time exactly doubles. You are visiting every element once.
- **Examples:** Linear Search, iterating down a linked list, reading a file line-by-line.
```python
def find_max(my_list):
    max_val = 0
    for num in my_list:
        if num > max_val: max_val = num
    return max_val
```

### 4. `O(n log n)` - Linearithmic (Bad/Fair)
The physical bottleneck of most comparison-based sorting algorithms. For every element `n`, it performs a `log n` operation.
- **Examples:** Merge Sort, Quick Sort (average case), Heap Sort.

### 5. `O(n²)` - Quadratic Time (Horrible)
If you double the input, the time quadruples. Generally caused by nested loops over the data.
- **Examples:** Bubble Sort, Selection Sort, generating 2D grids, comparing every element to every other element.
```python
def find_duplicates(my_list):
    for i in range(len(my_list)):
        for j in range(len(my_list)):
            if i != j and my_list[i] == my_list[j]:
                return True
```

### 6. `O(2ⁿ)` - Exponential (Disastrous)
Operations wildly double with every single additional item added to the input. Only viable for incredibly tiny `n` values (e.g., `n < 20`).
- **Examples:** Finding all subsets of a set, brute-force password cracking, recursive Fibonacci without memoization.

### 7. `O(n!)` - Factorial (Catastrophic)
Operations grow by a multiple of the current input limit. To compute `n=100`, there are roughly `9.3 × 10^157` operations (vastly more than atoms in the universe).
- **Examples:** Traveling Salesperson Problem (Brute Force), generating all permutations of a string.

---

## Big O Rules & Realities

### 1. Drop the Constants
In hardware engineering, an algorithm that is $O(2n)$ vs $O(n)$ absolutely matters. However, in complexity analysis, we strip constant multipliers. Both simply become $O(n)$. We don't care how steep the slope is, only the *shape* of the curve at infinity.
- `O(500 * n)` becomes **O(n)**
- `O(14 * log n)` becomes **O(log n)**

### 2. Drop Non-Dominant Terms
If a function does a quadratic nested loop, and then a linear loop right after, the $O(n^2)$ completely eclipses the $O(n)$ as `n` gets huge.
- `O(n² + n + 50)` becomes **O(n²)**
- `O(n + log n)` becomes **O(n)**

### 3. "Worst Case" Focus
Big O traditionally expresses the absolute worst-case scenario. If a Linear Search finds a target on the very first try, that specific instance was incredibly fast, but the *algorithm's theoretical bounds* remain constrained by $O(n)$.
