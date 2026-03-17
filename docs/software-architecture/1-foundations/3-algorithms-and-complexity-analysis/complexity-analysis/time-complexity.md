---
title: Time Complexity
sidebar_label: Time Complexity
displayed_sidebar: softwareArchitectureSidebar
tags: [Complexity-Analysis]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Complexity Analysis</span>

# Time Complexity

Because every computer runs code at different physical speeds (a 1990s desktop vs a modern cloud supercomputer), we cannot measure an algorithm's speed strictly in *"seconds"*. 

Instead, **Time Complexity** calculates the *number of fundamental operations* a CPU must execute to solve the problem, as the total input data `N` scales toward infinity.

---

## Interactive Visualizer: The Execution Race

This simulation directly contrasts how rapidly CPU instructions multiply for different loop formats on the exact same `n=16` array size.

<iframe
  src={useBaseUrl('/files/complexity-time.html')}
  title="Time Complexity Visual"
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

## Measuring Operations, Not Time

To measure Time Complexity, we count logical steps: variables assigned, mathematical operators (`+`, `-`, `*`, `/`), array lookups (`arr[x]`), and logic checks (`a > b`).

### Example 1: Constant Operations O(1)
```python
def print_first(items):
    print(items[0]) # 1 Operation
```
No matter if `items` contains 1 element or 10 billion elements, the CPU only requires 1 operation to fetch index `0`. This is considered **O(1) Time**.

### Example 2: Linear Operations O(n)
```python
def print_all(items):
    for item in items: # N loop executions
        print(item)    # 1 Operation per loop
```
If `items` has 10 elements, the loop runs 10 times. If `items` has 10 billion elements, the loop runs 10 billion times. The total operations scale perfectly identically alongside `n`. This is **O(n) Time**.

### Example 3: Nested Quadratic Operations O(n²)
```python
def print_all_pairs(items):
    for i in items:           # N loop executions
        for j in items:       # N loop executions
            print(i, j)       # 1 Operation
```
If `n = 10`, the inner loop runs 10 times for *every single iteration* of the outer loop. Thus, it runs `10 * 10 = 100` operations. If `n = 1000`, it takes `1,000,000` operations. This is **O(n²) Time**.

---

## Asymptotic Notation (The Big 3)

When quantifying Time Complexity, you can describe three different bounding scenarios:

### 1. Big O (Upper Bound / Worst Case) - $O(n)$
This bounds the algorithm from above. It describes the absolute maximum number of operations an algorithm might potentially take. It guarantees "execution will NEVER be slower than this."

### 2. Big Omega (Lower Bound / Best Case) - $\Omega(n)$
This bounds the algorithm from below. It describes the absolute minimum number of operations possible. For example, if array sorting successfully finishes on the first pass.

### 3. Big Theta (Tight Bound / Average) - $\Theta(n)$
This implies precision. It means the upper bound `O` and the lower bound `\Omega` grow at exactly the same rate. This precisely represents the average, typical execution.

> For software architecture, **Big O** is used 99% of the time, because system engineers must plan constraints strictly around the worst-case scenario.

---

## Best Practices

- **Avoid Nested Loops**: Any loop running fully inside another loop that scales with the input volume should trigger a refactor consideration. Look to replace O(N²) quadratic loops with a `HashMap` (Dictionary) lookup, returning performance to $O(N)$.
- **Careful with System Libraries**: When calling functions like `array.sort()`, `list.contains()`, or `string.replace()`, be highly aware of the hidden Time Complexity under the hood. For instance, putting `if x in list:` inside a `for x in otherList:` is a hidden O(n²) disaster.
