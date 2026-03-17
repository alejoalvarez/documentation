---
title: Amortized Complexity
sidebar_label: Amortized Complexity
displayed_sidebar: softwareArchitectureSidebar
tags: [Complexity-Analysis]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Complexity Analysis</span>

# Amortized Complexity

Sometimes looking strictly at the "Worst Case Big O" limits actually portrays a data structure as far worse than it genuinely performs in real life.

**Amortized Complexity** considers the *average performance over a sequence of operations*. It is used when an algorithm has one single, catastrophically expensive operation that happens extremely rarely, but the overwhelming majority of subsequent operations are blazingly fast.

Rather than classifying the algorithm by the rare disaster, we *amortize* (spread) the heavy cost across the many fast operations, resulting in an "average" time complexity.

---

## Interactive Visualizer: The Dynamic Array

The most famous example of Amortized Complexity is inserting an element into an `ArrayList` (Dynamic Array). 

Click `array.push()` below continuously. Watch how most insertions are fast `O(1)` operations, but when the allocated memory capacity peaks, the array hits a terrifying `O(n)` penalty to copy the data—which immediately grants capacity for many more cheap `O(1)` pushes.

<iframe
  src={useBaseUrl('/files/complexity-amortized.html')}
  title="Amortized Complexity Visual"
  style={{
    width: '100%',
    height: '400px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
    marginBottom: '20px'
  }}
/>

---

## The Dynamic Array Explanation

In standard strict Big O notation, pushing an item to the end of a Dynamic Array is considered **$O(n)$ Worst Case Time**. 

Why? Because Arrays are strictly contiguous in memory. If your array hits its maximum allocated capacity constraint, the CPU physically cannot just slot the new item next door.

The CPU must:
1. Find a brand new patch of memory large enough to hold double the current capacity.
2. Visit every single element in the old array and painstakingly copy it into the new array segment (`N` operations).
3. Insert the new element.

However, because the engine specifically **doubled** the capacity, we are mathematically guaranteed that the next `N` times you push an element, nothing will need to be resized. The next `N` pushes will be $O(1)$.

### The Math:
If we make `N` push operations, `N - 1` operations take $O(1)$ time. Exactly 1 operation takes $O(n)$ time.

`$$\frac{n + 1 + 1 + 1 \dots}{n} = \sim O(1)$$`

Thus, we say that pushing to a Dynamic array has an **Amortized Time Complexity of $O(1)$**, even though strictly speaking, the worst case event is $O(n)$.

---

## Differences from "Average Case"

It's easy to confuse **Amortized Time** with **Average Case Time**.

- **Average Case** relies on probability and luck constraints. Quick Sort has an Average Case of $O(n \log n)$, but a badly shuffled, cursed data set could absolutely cause it to mathematically roll the "Unlucky" dice and hit $O(n^2)$ worst case every single time.
- **Amortized Case** relies on strict system constraints. It is impossible to hit the "Unlucky" $O(n)$ scenario repeatedly in sequence. The system physically guarantees that if it executes the $O(n)$ hit, the next operations strictly *must* be $O(1)$. There is no luck involved.
