---
title: Quick Sort
sidebar_label: Quick Sort
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Quick Sort

**Quick Sort** is a highly efficient **divide and conquer** sorting algorithm. It works by selecting a **pivot** element and **partitioning** the array into two groups: elements smaller than the pivot go to the left, and elements greater go to the right. It then recursively sorts each partition.

Unlike Merge Sort it is **in-place** (no auxiliary array needed) and typically faster in practice due to better cache performance — despite sharing the same average time complexity of O(n log n).

---
## Interactive Visualizer

<iframe
  src={useBaseUrl('/files/sorting-quick-sort.html')}
  title="Quick Sort Visual"
  style={{
    width: '100%',
    height: '800px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## How It Works

1. **Choose a pivot** — commonly the last element, first element, or a random one.
2. **Partition** — rearrange the array so that all elements smaller than the pivot are to its left and all larger elements are to its right. The pivot is now in its **final sorted position**.
3. **Recurse** — apply quick sort recursively to the left subarray and the right subarray.
4. The recursion bottoms out when a subarray has 0 or 1 element.

### Step-by-step Example

Given: `[8, 3, 5, 1, 9, 6]` (pivot = last element)

**Pass 1 — pivot = 6:**
```
[8, 3, 5, 1, 9, | 6]
 Compare each element with pivot 6:
  3 < 6 → move to left side
  5 < 6 → move to left side
  1 < 6 → move to left side
  8 > 6 → stays right
  9 > 6 → stays right
 Place pivot: [3, 5, 1, →6←, 8, 9]
```

After partition: `[3, 5, 1, 6, 8, 9]` — 6 is in final position.

**Recurse left `[3, 5, 1]` — pivot = 1:**
- 3 > 1, 5 > 1 → `[1, 5, 3]` — 1 is in final position.
- Recurse on `[5, 3]` — pivot = 3: `[3, 5]` ✅

**Recurse right `[8, 9]` — pivot = 9:**
- 8 < 9 → already in place: `[8, 9]` ✅

**Final result:** `[1, 3, 5, 6, 8, 9]` ✅

---

## Pseudocode

```
function quickSort(array, low, high):
    if low < high:
        pivotIndex = partition(array, low, high)
        quickSort(array, low, pivotIndex - 1)
        quickSort(array, pivotIndex + 1, high)

function partition(array, low, high):
    pivot = array[high]
    i = low - 1

    for j from low to high - 1:
        if array[j] < pivot:
            i = i + 1
            swap(array[i], array[j])

    swap(array[i + 1], array[high])
    return i + 1
```

---

## Implementations

<details>
<summary>JavaScript</summary>

```js
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

console.log(quickSort([8, 3, 5, 1, 9, 6]));
// [1, 3, 5, 6, 8, 9]
```

</details>

<details>
<summary>Python</summary>

```python
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

print(quick_sort([8, 3, 5, 1, 9, 6]))
# [1, 3, 5, 6, 8, 9]
```

</details>

<details>
<summary>Java</summary>

```java
public class QuickSort {

    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}
```

</details>

---

## Pivot Selection Strategies

The choice of pivot significantly affects performance. A poor pivot (e.g., always the minimum or maximum) leads to O(n²).

| Strategy | Description | Notes |
|----------|-------------|-------|
| **Last element** | Always pick `arr[high]` | Simple; degrades on sorted/reverse-sorted input |
| **First element** | Always pick `arr[low]` | Same weakness as last element |
| **Median-of-three** | Median of first, middle, last | Better average performance; avoids common worst cases |
| **Random** | Pick a random element, swap to end | Expected O(n log n); avoids adversarial worst cases |

:::tip Recommended
Use **random pivot** or **median-of-three** in production to avoid the O(n²) worst case on already-sorted or nearly-sorted arrays.
:::

---

## Complexity Analysis

| Case | Time Complexity | Space Complexity |
|------|-----------------|------------------|
| Best | O(n log n) | O(log n) |
| Average | O(n log n) | O(log n) |
| Worst | O(n²) | O(n) |

- **Best / Average O(n log n)** — When the pivot consistently divides the array near the middle, the recursion tree has depth log n, and each level processes O(n) elements total.
- **Worst O(n²)** — When the pivot is always the minimum or maximum (e.g., already sorted array with last-element pivot), one partition has n−1 elements and the other has 0, creating n levels of recursion.
- **Space O(log n)** — In-place partitioning uses no extra array, but the recursion stack takes O(log n) on average (O(n) worst case).

---

## Key Properties

| Property | Value |
|----------|-------|
| In-place | ✅ Yes |
| Stable | ❌ No |
| Adaptive | ❌ No |
| Online | ❌ No |

:::note Stability
Quick Sort is **not stable** — equal elements may be reordered during partitioning, depending on the pivot placement and swap logic.
:::

:::note In-place
Unlike Merge Sort, Quick Sort does not require an auxiliary array. All swaps happen within the original array, making it much more memory-efficient — only O(log n) stack space for recursion.
:::

:::tip When to Use
- For **general-purpose sorting** of large datasets — typically the fastest in practice due to cache efficiency.
- When **memory is constrained** — in-place with only O(log n) extra space.
- When average-case performance matters more than worst-case guarantees.
- Used internally in most standard library sort implementations (e.g., C++ `std::sort`, Java's `Arrays.sort` for primitives).
:::

:::caution When to Avoid
- When **stability** is required — use Merge Sort or TimSort instead.
- When **worst-case O(n²) is unacceptable** — use Merge Sort or Heap Sort for guaranteed O(n log n).
- On **already-sorted or nearly-sorted** data with a naive pivot strategy — always use randomized or median-of-three pivot in those scenarios.
:::

---

## Comparison with Similar Algorithms

| Algorithm | Best | Average | Worst | Stable | In-place | Space |
|-----------|------|---------|-------|--------|----------|-------|
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | ❌ | ✅ | O(log n) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | ✅ | ❌ | O(n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | ❌ | ✅ | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | ✅ | ✅ | O(1) |

---


