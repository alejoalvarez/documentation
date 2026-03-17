---
title: Merge Sort
sidebar_label: 4 - Merge Sort
displayed_sidebar: softwareArchitectureSidebar
tags: [Sorting-Algorithms]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Sorting Algorithms</span>

# Merge Sort

**Merge Sort** is a classic **divide and conquer** sorting algorithm. It recursively splits the array into two halves, sorts each half independently, then **merges** the two sorted halves back into one sorted array.

Its key advantage over O(n²) algorithms is that it guarantees **O(n log n)** performance in all cases — best, average, and worst — at the cost of O(n) extra space for the merge step.


## Interactive Visualizer

<iframe
  src={useBaseUrl('/files/sorting-merge-sort.html')}
  title="Merge Sort Visual"
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

1. **Divide** — Split the array in half at the midpoint.
2. **Conquer** — Recursively sort each half (left and right).
3. **Merge** — Compare elements from both halves one by one, placing the smaller element into the result array until both halves are exhausted.
4. The recursion bottoms out when a subarray has one element (a single element is always sorted).

### Step-by-step Example

Given: `[8, 3, 5, 1, 9, 6]`

```
Split:
  [8, 3, 5, 1, 9, 6]
       ↙          ↘
  [8, 3, 5]     [1, 9, 6]
   ↙     ↘       ↙     ↘
 [8]  [3, 5]  [1]   [9, 6]
       ↙  ↘          ↙  ↘
      [3] [5]       [9] [6]

Merge:
 [3] + [5]  → [3, 5]
 [8] + [3, 5] → [3, 5, 8]
 [6] + [9]  → [6, 9]   (note: 6 < 9)
 [1] + [6, 9] → [1, 6, 9]
 [3, 5, 8] + [1, 6, 9] → [1, 3, 5, 6, 8, 9] ✅
```

### Merge step detail

Given sorted halves `[3, 5, 8]` and `[1, 6, 9]`:

| Step | Left ptr | Right ptr | Output so far |
|------|----------|-----------|---------------|
| 1 | 3 | **1** ← smaller | `[1]` |
| 2 | **3** ← smaller | 6 | `[1, 3]` |
| 3 | **5** ← smaller | 6 | `[1, 3, 5]` |
| 4 | **8** ← smaller | 6 | wait — 6 < 8 → `[1, 3, 5, 6]` |
| 5 | **8** ← smaller | 9 | `[1, 3, 5, 6, 8]` |
| 6 | exhausted | **9** | `[1, 3, 5, 6, 8, 9]` |

---

## Pseudocode

```
function mergeSort(array):
    if length(array) <= 1:
        return array

    mid = length(array) / 2
    left  = mergeSort(array[0 .. mid - 1])
    right = mergeSort(array[mid .. end])

    return merge(left, right)

function merge(left, right):
    result = []
    while left and right are not empty:
        if left[0] <= right[0]:
            append left[0] to result
            remove left[0] from left
        else:
            append right[0] to result
            remove right[0] from right
    append remaining elements of left to result
    append remaining elements of right to result
    return result
```

---

## Implementations

<details>
<summary>JavaScript</summary>

```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

console.log(mergeSort([8, 3, 5, 1, 9, 6]));
// [1, 3, 5, 6, 8, 9]
```

</details>

<details>
<summary>Python</summary>

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(merge_sort([8, 3, 5, 1, 9, 6]))
# [1, 3, 5, 6, 8, 9]
```

</details>

<details>
<summary>Java</summary>

```java
public class MergeSort {

    public static void mergeSort(int[] arr, int l, int r) {
        if (l >= r) return;

        int mid = (l + r) / 2;
        mergeSort(arr, l, mid);
        mergeSort(arr, mid + 1, r);
        merge(arr, l, mid, r);
    }

    private static void merge(int[] arr, int l, int mid, int r) {
        int[] left  = Arrays.copyOfRange(arr, l, mid + 1);
        int[] right = Arrays.copyOfRange(arr, mid + 1, r + 1);
        int i = 0, j = 0, k = l;

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
        }
        while (i < left.length)  arr[k++] = left[i++];
        while (j < right.length) arr[k++] = right[j++];
    }
}
```

</details>

---

## Complexity Analysis

| Case | Time Complexity | Space Complexity |
|------|-----------------|------------------|
| Best | O(n log n) | O(n) |
| Average | O(n log n) | O(n) |
| Worst | O(n log n) | O(n) |

- **Time O(n log n)** — The array is split log n times (depth of recursion tree), and at each level the merge step processes all n elements in O(n). Total: O(n log n) in all cases.
- **Space O(n)** — Merging requires a temporary auxiliary array of size n to hold the merged result before writing back.
- **Recursion depth** — O(log n) stack frames are maintained during the divide phase.

---

## Key Properties

| Property | Value |
|----------|-------|
| In-place | ❌ No |
| Stable | ✅ Yes |
| Adaptive | ❌ No |
| Online | ❌ No |

:::note Stability
Merge Sort is **stable** — when merging, equal elements from the left subarray are always placed before equal elements from the right subarray (`left[i] <= right[j]`), preserving their original relative order.
:::

:::note Not In-place
Unlike Bubble, Selection, or Insertion Sort, Merge Sort requires **O(n) extra memory** for the temporary merge buffer. In-place merge sort implementations exist but are significantly more complex and usually slower in practice.
:::

:::tip When to Use
- When **guaranteed O(n log n)** performance is required (Quick Sort has O(n²) worst case).
- When sorting **linked lists** — Merge Sort is the preferred algorithm since it doesn't require random access.
- When **stability** is needed alongside speed (e.g., sorting records by multiple fields).
- As the basis for **external sorting** of data too large for memory (sorts chunks, merges from disk).
:::

:::caution When to Avoid
- When **memory is constrained** — O(n) extra space may be prohibitive.
- On **small arrays** — the overhead of recursion and allocation makes Insertion Sort faster in practice (why hybrid algorithms like TimSort switch at small sizes).
:::

---

## Comparison with Similar Algorithms

| Algorithm | Best | Average | Worst | Stable | In-place | Space |
|-----------|------|---------|-------|--------|----------|-------|
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | ✅ | ❌ | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | ❌ | ✅ | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | ❌ | ✅ | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | ✅ | ✅ | O(1) |

---
