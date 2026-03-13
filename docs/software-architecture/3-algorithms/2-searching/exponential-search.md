---
title: Exponential Search
sidebar_label: Exponential Search
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Exponential Search

**Exponential Search** (also known as *Doubling Search* or *Galloping Search*) is a searching algorithm used on sorted arrays. It operates in two distinct phases: finding a bounded range where the element *could* exist by jumping exponentially, and then performing a standard Binary Search within that bounded range.

Exponential Search is particularly powerful for unbounded or infinitely growing arrays (streams).

---


## Interactive Visualizer

<iframe
  src={useBaseUrl('/files/searching-exponential.html')}
  title="Exponential Search Visual"
  style={{
    width: '100%',
    height: '670px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>


## Key Concepts

### Phase 1: Exponential Jumping (Galloping)
Instead of searching linearly point by point, the algorithm leaps through the array. It checks indices at powers of two: `1, 2, 4, 8, 16, 32...` 
It stops leaping the moment it finds a value that is **greater than** the target value.

### Phase 2: Binary Search Isolation
Once a boundary is overshot, we know the target must be trapped somewhere between the previous leap and the current leap (between `i/2` and `i`). A Binary Search is then executed strictly within this tiny subspace, ignoring the rest of the array.

---

## How It Works

1. Check if the element is at index `0`. If so, return `0`.
2. Start an index pointer at `i = 1`.
3. **Phase 1:** While `i < length` and `arr[i] <= target`:
   - Multiply `i` by 2 (`i = i * 2`).
4. **Phase 2:** Perform a standard Binary Search on the subarray bounded by:
   - `low = i / 2`
   - `high = min(i, length - 1)` (to prevent out of bounds errors)

---

## Pseudocode

```text
function exponentialSearch(arr, target):
    n = length(arr)

    if arr[0] == target:
        return 0

    // Phase 1: Expansion
    i = 1
    while i < n AND arr[i] <= target:
        i = i * 2
        
    // Phase 2: Binary Search within bounded region
    low = i / 2
    high = min(i, n - 1)
    
    return binarySearch(arr, target, low, high)
```

---

## Implementations

<details>
<summary>JavaScript</summary>

```js
function exponentialSearch(arr, target) {
  let n = arr.length;

  if (arr[0] === target) return 0;

  // Phase 1: Find range
  let i = 1;
  while (i < n && arr[i] <= target) {
    i = i * 2;
  }

  // Phase 2: Binary Search in range
  let low = Math.floor(i / 2);
  let high = Math.min(i, n - 1);

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    
    if (arr[mid] === target) return mid;
    
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }

  return -1;
}

const arr = [2, 5, 8, 12, 15, 18, 21, 25, 30, 35, 40, 45, 50];
console.log(exponentialSearch(arr, 35)); // Output: 9
```

</details>

<details>
<summary>Python</summary>

```python
def binary_search(arr, target, low, high):
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

def exponential_search(arr, target):
    n = len(arr)

    if arr[0] == target:
        return 0

    # Phase 1: Find Range
    i = 1
    while i < n and arr[i] <= target:
        i *= 2

    # Phase 2: Binary Search
    return binary_search(arr, target, i // 2, min(i, n - 1))

arr = [2, 5, 8, 12, 15, 18, 21, 25, 30, 35, 40, 45, 50]
print(exponential_search(arr, 35)) # Output: 9
```

</details>

<details>
<summary>Java</summary>

```java
import java.util.Arrays;

public class ExponentialSearch {
    public static int exponentialSearch(int[] arr, int target) {
        int n = arr.length;

        if (arr[0] == target) return 0;

        // Phase 1: Find range
        int i = 1;
        while (i < n && arr[i] <= target) {
            i = i * 2;
        }

        // Phase 2: System provided Binary Search
        int low = i / 2;
        int high = Math.min(i, n - 1) + 1; // +1 because Arrays.binarySearch right-bound is exclusive
        
        int result = Arrays.binarySearch(arr, low, high, target);
        
        return (result < 0) ? -1 : result;
    }

    public static void main(String[] args) {
        int[] arr = {2, 5, 8, 12, 15, 18, 21, 25, 30, 35, 40, 45, 50};
        System.out.println(exponentialSearch(arr, 35)); // Output: 9
    }
}
```

</details>

---

## Complexity Analysis

Let `n` = number of elements in the array, and let `i` = index position of the target being queried.

| Case | Time Complexity | Space Complexity |
|------|-----------------|------------------|
| Best | O(1) | O(1) |
| Average | O(log i) | O(1) |
| Worst | O(log i) | O(1) |

- **Time O(log i)** — Note that complexity is denoted relative to `i` (the location of the element), **not** `n` (the length of the entire array). It takes `O(log i)` steps to find the upper bound by doubling, and then the Binary Search takes another `O(log i)` steps to search that localized subsection. `O(2 log i) -> O(log i)`.
- **Space O(1)** — Iterative tracking of bounds requires only constant space.

---

## Key Properties

| Property | Value |
|----------|-------|
| Requires Sorted Data? | ✅ Yes |
| Needs upper boundaries | ❌ No (Works on infinite lists) |

:::tip When to Use
- When the target element is expected to be positioned near the **front** of a massive array, making it significantly faster than doing a global Binary Search.
- **Unbounded Arrays / Streams:** If the upper size of the database/array is completely unknown or infinite, Binary Search will fail because it requires a `high` bound to start. Exponential Search discovers the upper bound dynamically.
:::

:::caution When to Avoid
- If the entire array size is known in advance and queries are totally random across the dataset, a standard Binary Search is just as efficient and marginally simpler to write.
:::

---
