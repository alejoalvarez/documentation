---
title: Heap Sort
sidebar_label: 6 - Heap Sort
displayed_sidebar: softwareArchitectureSidebar
tags: [Sorting-Algorithms]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Sorting Algorithms</span>

# Heap Sort

**Heap Sort** is a comparison-based sorting algorithm that uses a **binary heap** data structure. It works in two phases: first it transforms the array into a **Max-Heap**, then it repeatedly extracts the maximum element and places it at the end of the array, shrinking the heap each time.

It combines the best of both worlds — the **O(n log n) guaranteed** time complexity of Merge Sort with the **in-place** property of Quick Sort — though it is generally slower in practice due to poor cache performance.

---

## Interactive Visualizer

<iframe
  src={useBaseUrl('/files/sorting-heap-sort.html')}
  title="Heap Sort Visual"
  style={{
    width: '100%',
    height: '800px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## Key Concept: Binary Heap

A **Max-Heap** is a complete binary tree stored as an array where every parent node is **greater than or equal to** its children. For a node at index `i`:

| Relationship | Index |
|---|---|
| Left child | `2i + 1` |
| Right child | `2i + 2` |
| Parent | `⌊(i - 1) / 2⌋` |

The **heapify** operation restores the max-heap property at a given node by comparing it with its children and swapping with the largest if needed, then recursing down.

### Array as a Binary Tree

Given `[9, 8, 6, 1, 3, 5]`:

```
         9        ← index 0
       /   \
      8     6     ← index 1, 2
     / \   /
    1   3 5       ← index 3, 4, 5
```

---

## How It Works

### Phase 1 — Build Max-Heap

Starting from the last non-leaf node (`⌊n/2⌋ - 1`) down to the root, call `heapify` on each node. This ensures the entire array satisfies the max-heap property in **O(n)** time.

### Phase 2 — Extract and Sort

1. The root (index 0) always holds the **maximum** element.
2. **Swap** the root with the last element of the heap.
3. **Shrink** the heap size by 1 (the swapped element is now in its sorted position).
4. **Heapify** the root again to restore the max-heap property.
5. Repeat until only one element remains.

### Step-by-step Example

Given: `[8, 3, 5, 1, 9, 6]`

**Phase 1 — Build Max-Heap:**
```
Start: [8, 3, 5, 1, 9, 6]
Heapify index 2: 5 vs children 6 → swap → [8, 3, 6, 1, 9, 5]
Heapify index 1: 3 vs children 1, 9 → swap 3 & 9 → [8, 9, 6, 1, 3, 5]
Heapify index 0: 8 vs children 9, 6 → swap 8 & 9 → [9, 8, 6, 1, 3, 5]

Max-Heap: [9, 8, 6, 1, 3, 5]
```

**Phase 2 — Extract:**
```
Extract 9 → swap with last → [5, 8, 6, 1, 3, | 9]  → heapify → [8, 5, 6, 1, 3, | 9]
Extract 8 → swap with last → [3, 5, 6, 1, | 8, 9]  → heapify → [6, 5, 3, 1, | 8, 9]
Extract 6 → swap with last → [1, 5, 3, | 6, 8, 9]  → heapify → [5, 1, 3, | 6, 8, 9]
Extract 5 → swap with last → [3, 1, | 5, 6, 8, 9]  → heapify → [3, 1, | 5, 6, 8, 9]
Extract 3 → swap with last → [1, | 3, 5, 6, 8, 9]

Result: [1, 3, 5, 6, 8, 9] ✅
```

---

## Pseudocode

```
function heapSort(array):
    n = length(array)

    // Phase 1: Build max-heap
    for i from floor(n/2) - 1 down to 0:
        heapify(array, n, i)

    // Phase 2: Extract elements one by one
    for i from n-1 down to 1:
        swap(array[0], array[i])
        heapify(array, i, 0)

function heapify(array, n, i):
    largest = i
    left    = 2*i + 1
    right   = 2*i + 2

    if left < n and array[left] > array[largest]:
        largest = left

    if right < n and array[right] > array[largest]:
        largest = right

    if largest != i:
        swap(array[i], array[largest])
        heapify(array, n, largest)
```

---

## Implementations

<details>
<summary>JavaScript</summary>

```js
function heapSort(arr) {
  const n = arr.length;

  // Build max-heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left  = 2 * i + 1;
  const right = 2 * i + 2;

  if (left  < n && arr[left]  > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

console.log(heapSort([8, 3, 5, 1, 9, 6]));
// [1, 3, 5, 6, 8, 9]
```

</details>

<details>
<summary>Python</summary>

```python
def heap_sort(arr):
    n = len(arr)

    # Build max-heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)

    return arr

def heapify(arr, n, i):
    largest = i
    left  = 2 * i + 1
    right = 2 * i + 2

    if left  < n and arr[left]  > arr[largest]: largest = left
    if right < n and arr[right] > arr[largest]: largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

print(heap_sort([8, 3, 5, 1, 9, 6]))
# [1, 3, 5, 6, 8, 9]
```

</details>

<details>
<summary>Java</summary>

```java
public class HeapSort {

    public static void heapSort(int[] arr) {
        int n = arr.length;

        // Build max-heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // Extract elements
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }

    private static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left    = 2 * i + 1;
        int right   = 2 * i + 2;

        if (left  < n && arr[left]  > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest != i) {
            int temp     = arr[i];
            arr[i]       = arr[largest];
            arr[largest] = temp;
            heapify(arr, n, largest);
        }
    }
}
```

</details>

---

## Complexity Analysis

| Case | Time Complexity | Space Complexity |
|------|-----------------|------------------|
| Best | O(n log n) | O(1) |
| Average | O(n log n) | O(1) |
| Worst | O(n log n) | O(1) |

- **Build heap O(n)** — Despite calling `heapify` O(n/2) times, the total work sums to O(n) (each node's heapify cost is proportional to its height, and the sum across all levels is bounded by n).
- **Extract phase O(n log n)** — Each of the n extractions calls `heapify` on the root which takes O(log n). Total: O(n log n).
- **Space O(1)** — Heap Sort is fully in-place. The heap is built inside the original array and no extra memory is needed (recursive `heapify` stack depth is O(log n) but is typically negligible or can be made iterative).

---

## Key Properties

| Property | Value |
|----------|-------|
| In-place | ✅ Yes |
| Stable | ❌ No |
| Adaptive | ❌ No |
| Online | ❌ No |

:::note Stability
Heap Sort is **not stable** — the heap operations (particularly the swap during extraction) can change the relative order of equal elements.
:::

:::note Why slower than Quick Sort in practice?
Even though both average O(n log n), Heap Sort has **poor cache locality**. Accessing parent/child nodes by index jumps around memory unpredictably, causing frequent cache misses. Quick Sort's sequential access patterns make it 2–5× faster in practice on modern hardware.
:::

:::tip When to Use
- When a **guaranteed O(n log n) worst-case** is required and memory must stay O(1) — Heap Sort is the only standard algorithm achieving both simultaneously.
- In **embedded or real-time systems** where predictable performance and minimal memory are both critical.
- When implementing a **priority queue** — the heap structure is directly applicable.
:::

:::caution When to Avoid
- When **stability** is needed — use Merge Sort or TimSort.
- For **general-purpose sorting** where Quick Sort's better cache performance is preferred.
- On **nearly-sorted data** — Insertion Sort will outperform Heap Sort significantly.
:::

---

## Comparison with Similar Algorithms

| Algorithm | Best | Average | Worst | Stable | In-place | Space |
|-----------|------|---------|-------|--------|----------|-------|
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | ❌ | ✅ | O(1) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | ❌ | ✅ | O(log n) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | ✅ | ❌ | O(n) |
| Insertion Sort | O(n) | O(n²) | O(n²) | ✅ | ✅ | O(1) |

---

