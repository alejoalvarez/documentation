---
title: Dynamic Programming
sidebar_label: 2 - Dynamic Programming
displayed_sidebar: softwareArchitectureSidebar
tags: [Advanced-Algorithms]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Advanced Algorithms</span>

# Dynamic Programming (DP)

Dynamic Programming (DP) is an optimization technique applied to Divide and Conquer. Wait, isn't Divide and Conquer already fast? Yes, but *only* if the sub-problems are independent. 

If sub-problems endlessly perfectly overlap and repeat themselves, a pure Divide and Conquer approach will calculate the exact same paths millions of times, triggering an $O(2^n)$ runtime catastrophe. Dynamic Programming solves this by **remembering the answers to sub-problems** it has already solved so it never computes them twice. This drops runtime from $O(2^n)$ down to a blazing fast $O(N)$.

---

## Interactive Visualizer: Brute Force vs Memoization
This visualizer computes the `Fibonacci(6)` tree. 
- Try running the **Brute Force** algorithm. Notice how the right branches repeatedly recalculate red nodes (e.g. `f(2)` is calculated 5 separate times!).
- Run the **Memoized DP**. Notice how the memory cache immediately returns answers in $O(1)$ time, skipping entire massive sub-tree computations. 

<iframe
  src={useBaseUrl('/files/paradigm-dp.html')}
  title="Dynamic Programming Visualizer"
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

## The Two Core Principles
To prove a problem can be solved with DP, it must possess two mathematical characteristics:

1. **Optimal Substructure:** Expanding the solution of the simplest base case eventually perfectly pieces together the solution to the grandest large problem.
2. **Overlapping Subproblems:** The exact same subproblem occurs wildly over and over again throughout the recursion tree.

---

## The Two DP Implementations

There are two opposing mechanical ways to engineer Dynamic Programming code: **Top-Down (Memoization)** and **Bottom-Up (Tabulation)**.

### 1. Memoization (Top-Down / Recursive)
You start at the massive target goal (e.g., `Fib(6)`) and recursively drill all the way down. Before executing an expensive recursive branch, you check a "cache" (Dictionary/Hash Map). If the answer is there, instantly return it. If not, calculate it, save the answer to the cache, and return it.

```python title="Top-Down DP (Memoization)"
def fib_memo(n, cache={}):
    if n in cache: # Instantly intercept overlapping subproblems in O(1)!
        return cache[n]
        
    if n <= 1:
        return n
        
    result = fib_memo(n-1, cache) + fib_memo(n-2, cache)
    cache[n] = result # Drop new calculations into the cache
    
    return result
```
* **Pros:** Extremely intuitive to write if you understand recursion. Only computes branches strictly required by the goal.
* **Cons:** Recursion allocates $O(N)$ Space Complexity on the Call Stack. Massive $N$ values will trigger a catastrophic Stack Overflow crash.

### 2. Tabulation (Bottom-Up / Iterative)
You abandon recursion entirely. You start at the ultimate base cases `[0, 1]` and use an iterative `for` loop to manually tabulate every single step sequentially inside an Array, walking upwards until you reach the target.

```python title="Bottom-Up DP (Tabulation)"
def fib_tab(n):
    if n <= 1: return n
    
    # 1. Allocate DP table
    dp_table = [0] * (n + 1)
    dp_table[1] = 1 # Define Base Cases
    
    # 2. Iterate "Bottom-Up"
    for i in range(2, n + 1):
        dp_table[i] = dp_table[i-1] + dp_table[i-2]
        
    return dp_table[n]
```
* **Pros:** No recursion! No Call Stack memory! Can be mathematically optimized to run extremely fast without crashing.
* **Cons:** Less intuitive to map mentally. Often computes some array values you physically don't even need for your specific answer, just to fill the table out sequentially.

---

## The Space Optimization Secret
Have you noticed in the `Tabulation` example above, to compute `fib_tab(500)`, we only actually need the values of `499` and `498`? We totally abandon indices `0` through `497`. 

Therefore, allocating an entire `dp_table` array of size `500` is incredibly wasteful memory architecture. We can crush the **Space Complexity from $O(N)$ down to an elite $O(1)$** by only holding variables for the last two states!

```python title="Elite Space-Optimized DP"
def fib_elite(n):
    if n <= 1: return n
    
    a, b = 0, 1 # Only tracking the "2 previous steps"
    for _ in range(2, n + 1):
        a, b = b, a + b # Shift variables forward
        
    return b
```
