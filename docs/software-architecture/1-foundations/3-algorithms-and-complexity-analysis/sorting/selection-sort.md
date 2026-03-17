---
title: Selection Sort
sidebar_label: 2 - Selection Sort
displayed_sidebar: softwareArchitectureSidebar
tags: [Sorting-Algorithms]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Sorting Algorithms</span>

# Selection Sort

**Selection Sort** is a simple comparison-based sorting algorithm. On each pass, it finds the **minimum element** from the unsorted portion of the array and places it at the beginning of that portion, progressively growing the sorted region from left to right.

Unlike Bubble Sort, Selection Sort always performs exactly **O(n²)** comparisons regardless of the input, but minimizes the number of swaps — at most **n − 1** swaps total.

## Interactive Visualizer

<iframe
  src={useBaseUrl('/files/sorting-selection-sort.html')}
  title="Selection Sort Visual"
  style={{
    width: '100%',
    height: '800px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>
---

## How It Works

1. Divide the array conceptually into a **sorted** (left) and **unsorted** (right) region.
2. Scan the entire unsorted region to find the **minimum** element.
3. **Swap** that minimum with the first element of the unsorted region.
4. Expand the sorted region by one element and repeat until the array is fully sorted.

### Step-by-step Example

Given: `[7, 4, 9, 2, 6, 1]`

| Pass | Action | Array State |
|------|--------|-------------|
| 1 | Find min (1), swap with index 0 | `[1, 4, 9, 2, 6, 7]` |
| 2 | Find min (2), swap with index 1 | `[1, 2, 9, 4, 6, 7]` |
| 3 | Find min (4), swap with index 2 | `[1, 2, 4, 9, 6, 7]` |
| 4 | Find min (6), swap with index 3 | `[1, 2, 4, 6, 9, 7]` |
| 5 | Find min (7), swap with index 4 | `[1, 2, 4, 6, 7, 9]` |
| 6 | Single element left — done | `[1, 2, 4, 6, 7, 9]` ✅ |

---

## Pseudocode

```
for i from 0 to n - 1:
    minIndex = i
    for j from i + 1 to n - 1:
        if array[j] < array[minIndex]:
            minIndex = j
    if minIndex != i:
        swap(array[i], array[minIndex])
```

---

## Implementations

<details>
<summary>JavaScript</summary>

```js
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

console.log(selectionSort([7, 4, 9, 2, 6, 1]));
// [1, 2, 4, 6, 7, 9]
```

</details>

<details>
<summary>Python</summary>

```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_index = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr

print(selection_sort([7, 4, 9, 2, 6, 1]))
# [1, 2, 4, 6, 7, 9]
```

</details>

<details>
<summary>Java</summary>

```java
public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex != i) {
                int temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
    }
}
```

</details>

---

## Complexity Analysis

| Case | Time Complexity | Space Complexity |
|------|-----------------|------------------|
| Best | O(n²) | O(1) |
| Average | O(n²) | O(1) |
| Worst | O(n²) | O(1) |

- **Time** — Two nested loops always run regardless of the input order, giving O(n²) comparisons in all cases.
- **Space** — Sorting is done in-place; only a constant amount of extra memory is needed.
- **Swaps** — At most **n − 1** swaps, making it efficient when write operations are expensive (e.g., flash memory).

---

## Key Properties

| Property | Value |
|----------|-------|
| In-place | ✅ Yes |
| Stable | ❌ No |
| Adaptive | ❌ No |
| Online | ❌ No |

:::note Stability
Selection Sort is **not stable** — equal elements may be reordered relative to each other because swaps can move a later element ahead of an earlier equal one.
:::

:::tip When to Use
- When **write operations are costly** (minimizes swaps to at most n − 1).
- For **small datasets** where simplicity is preferred over performance.
- As an educational algorithm for understanding in-place selection patterns.
:::

:::caution When to Avoid
- On **large datasets** — O(n²) makes it significantly slower than O(n log n) algorithms like Merge Sort or Quick Sort.
- When **stability** is required — use Merge Sort or Insertion Sort instead.
:::

---

## Comparison with Similar Algorithms

| Algorithm | Best | Average | Worst | Stable | Swaps |
|-----------|------|---------|-------|--------|-------|
| **Selection Sort** | O(n²) | O(n²) | O(n²) | ❌ | O(n) |
| Bubble Sort | O(n) | O(n²) | O(n²) | ✅ | O(n²) |
| Insertion Sort | O(n) | O(n²) | O(n²) | ✅ | O(n²) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | ✅ | O(n log n) |

---
