---
title: Linear Search
sidebar_label: 1 - Linear Search
displayed_sidebar: softwareArchitectureSidebar
tags: [Searching-Algorithms]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Searching Algorithms</span>

# Linear Search

**Linear Search** (or Sequential Search) is the simplest and most fundamental searching algorithm. It sequentially checks each element in a list one by one until a match is found or the entire list has been traversed.

Because it examines elements sequentially, it does not require the data to be sorted beforehand.

---

## Interactive Visualizer

<iframe
  src={useBaseUrl('/files/searching-linear-search.html')}
  title="Linear Search Visual"
  style={{
    width: '100%',
    height: '600px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>


## Key Concepts

### When to Use Linear Search
Linear search is incredibly basic, but it has specific use cases where it shines:
1. **Unsorted Data:** If an array is completely unsorted, linear search is the only option without preprocessing the array.
2. **Small Datasets:** For very small arrays (e.g., $< 50$ elements), the overhead of more complex algorithms or sorting is often greater than just traversing the list.
3. **Hardware-Level Caching:** Because arrays are stored contiguously in memory, linear search heavily benefits from CPU cache prefetching, making it surprisingly fast in practice for small to medium-sized datasets.

### Early Exit Option
A linear search stops the moment the target is found. This means if the target is the first element, the search completes in $O(1)$ time. 

---

## How It Works

1. Start at the first element (index `0`) of the array.
2. Compare the current element with the target value.
3. If they match, return the current index (Target Found).
4. If they do not match, move to the next element.
5. Repeat steps 2-4 until the end of the array is reached.
6. If the end of the array is reached without a match, return `-1` (Target Not Found).

### Step-by-step Example

Given input array: `[8, 3, 15, 6, 12, 9, 2, 18]`  
Target value: `6`

- **Index 0:** Compare `8` with `6`. No match.
- **Index 1:** Compare `3` with `6`. No match.
- **Index 2:** Compare `15` with `6`. No match.
- **Index 3:** Compare `6` with `6`. **Match!** Return index `3`. ✅

*(If the target was `100`, it would check all 8 elements and return `-1`)*

---

## Pseudocode

```text
function linearSearch(array, target):
    for i from 0 to length(array) - 1:
        if array[i] == target:
            return i    // Target found
            
    return -1           // Target not found
```

---

## Implementations

<details>
<summary>JavaScript</summary>

```js
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return the index of the found element
    }
  }
  return -1; // Return -1 if the target is not found
}

const array = [8, 3, 15, 6, 12, 9, 2, 18];
console.log(linearSearch(array, 6)); 
// Output: 3
```

*(Note: JavaScript has built-in linear search methods like `Array.prototype.indexOf()` and `Array.prototype.findIndex()`)*

</details>

<details>
<summary>Python</summary>

```python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Return the index of the found element
            
    return -1  # Return -1 if the target is not found

array = [8, 3, 15, 6, 12, 9, 2, 18]
print(linear_search(array, 6))
# Output: 3
```

*(Note: Python's `in` keyword and `list.index()` use linear search under the hood)*

</details>

<details>
<summary>Java</summary>

```java
public class LinearSearch {

    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Return the index of the found element
            }
        }
        return -1; // Return -1 if the target is not found
    }

    public static void main(String[] args) {
        int[] array = {8, 3, 15, 6, 12, 9, 2, 18};
        System.out.println(linearSearch(array, 6)); 
        // Output: 3
    }
}
```

</details>

---

## Complexity Analysis

Let $n$ = number of elements in the array.

| Case | Time Complexity | Space Complexity |
|------|-----------------|------------------|
| Best | $O(1)$ | $O(1)$ |
| Average | $O(n)$ | $O(1)$ |
| Worst | $O(n)$ | $O(1)$ |

- **Time $O(n)$** — In the worst-case scenario, the target element is at the very end of the array, or it is not in the array at all. We must check exactly $n$ elements.
- **Space $O(1)$** — Linear search only requires continuous traversal using a single loop, needing no auxiliary data structures. It strictly allocates constant memory.

---

## Key Properties

| Property | Value |
|----------|-------|
| Requires Sorted Data? | ❌ No |
| In-place | ✅ Yes |

:::tip When to Use
- You are searching an **unsorted** list or array.
- The dataset is **very small** (e.g., $< 50$ elements).
- You are writing a quick one-off script where development time is more critical than execution performance.
- When you are searching through a linked list (since you have to traverse nodes sequentially anyway).
:::

:::caution When to Avoid
- **Large Datasets:** A linear search checking 1,000,000 elements is vastly slower than a Binary Search, which would only take ~20 checks.
- When you need to make **many searches** on the same data. In this case, it is usually more efficient to sort the data once using O(n log n) time, and then use Binary Search O(log n) for every subsequent query.
:::

---

## Comparison with Similar Algorithms

| Algorithm | Best Time | Average Time | Worst Time | Requires Sorted Data | Space |
|-----------|-----------|--------------|------------|----------------------|-------|
| **Linear Search** | $O(1)$ | $O(n)$ | $O(n)$ | ❌ No | $O(1)$ |
| Binary Search | $O(1)$ | $O(\log n)$ | $O(\log n)$ | ✅ Yes | $O(1)$ |
| Hash Table Lookup | $O(1)$ | $O(1)$ | $O(n)$ | ❌ No | $O(n)$ |

---

