---
title: Insertion Sort
sidebar_label: Insertion Sort
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Insertion Sort

**Insertion Sort** builds the final sorted array one element at a time. It takes each element from the unsorted region and **inserts it into its correct position** within the already-sorted region by shifting larger elements one step to the right.

It works similarly to how most people sort a hand of playing cards — pick up a new card and slide it into the correct spot among the cards already in your hand.

---

## How It Works

1. Treat the first element as the **sorted region** (a single element is always sorted).
2. Pick the **next element** from the unsorted region — this is the *key*.
3. Compare the key with elements in the sorted region from right to left.
4. **Shift** all sorted elements that are greater than the key one position to the right.
5. **Insert** the key at the gap left behind.
6. Repeat until all elements are in the sorted region.

### Step-by-step Example

Given: `[8, 3, 5, 1, 9, 6]`

| Pass | Key | Action | Array State |
|------|-----|--------|-------------|
| 1 | 3 | Shift 8 right, insert 3 at index 0 | `[3, 8, 5, 1, 9, 6]` |
| 2 | 5 | Shift 8 right, insert 5 at index 1 | `[3, 5, 8, 1, 9, 6]` |
| 3 | 1 | Shift 8, 5, 3 right, insert 1 at index 0 | `[1, 3, 5, 8, 9, 6]` |
| 4 | 9 | Already in place, no shifts | `[1, 3, 5, 8, 9, 6]` |
| 5 | 6 | Shift 9, 8 right, insert 6 at index 4 | `[1, 3, 5, 6, 8, 9]` ✅ |

---

## Pseudocode

```
for i from 1 to n - 1:
    key = array[i]
    j = i - 1
    while j >= 0 and array[j] > key:
        array[j + 1] = array[j]
        j = j - 1
    array[j + 1] = key
```

---

## Implementations

<details>
<summary>JavaScript</summary>

```js
function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

console.log(insertionSort([8, 3, 5, 1, 9, 6]));
// [1, 3, 5, 6, 8, 9]
```

</details>

<details>
<summary>Python</summary>

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

print(insertion_sort([8, 3, 5, 1, 9, 6]))
# [1, 3, 5, 6, 8, 9]
```

</details>

<details>
<summary>Java</summary>

```java
public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}
```

</details>

---

## Complexity Analysis

| Case | Time Complexity | Space Complexity |
|------|-----------------|------------------|
| Best | O(n) | O(1) |
| Average | O(n²) | O(1) |
| Worst | O(n²) | O(1) |

- **Best case O(n)** — When the array is already sorted, the inner `while` loop never executes. Only one comparison per pass is needed.
- **Average / Worst O(n²)** — When elements are in random or reverse order, each key must be compared and shifted against all previously sorted elements.
- **Space O(1)** — Sorting is done in-place; only a single `key` variable is used as extra storage.

---

## Key Properties

| Property | Value |
|----------|-------|
| In-place | ✅ Yes |
| Stable | ✅ Yes |
| Adaptive | ✅ Yes |
| Online | ✅ Yes |

:::note Stability
Insertion Sort is **stable** — elements with equal values retain their original relative order, since the inner loop only shifts elements that are **strictly greater** than the key.
:::

:::note Adaptive
Insertion Sort is **adaptive** — it runs faster on partially sorted data. When input is nearly sorted, very few shifts are needed, bringing performance close to O(n).
:::

:::note Online
Insertion Sort is **online** — it can sort a list as it receives elements one at a time, without needing the entire input upfront.
:::

:::tip When to Use
- For **small datasets** where the overhead of more complex algorithms isn't justified.
- When the input is **already nearly sorted** — Insertion Sort can outperform O(n log n) algorithms in this case.
- As the base case in **hybrid algorithms** like TimSort and IntroSort.
- When elements arrive **one at a time** (online scenario).
:::

:::caution When to Avoid
- On **large unsorted datasets** — O(n²) average complexity makes it significantly slower than Merge Sort or Quick Sort.
- When **minimizing writes** is important — it can perform many shifts (unlike Selection Sort which does at most n − 1 swaps).
:::

---

## Comparison with Similar Algorithms

| Algorithm | Best | Average | Worst | Stable | Adaptive | Online |
|-----------|------|---------|-------|--------|----------|--------|
| **Insertion Sort** | O(n) | O(n²) | O(n²) | ✅ | ✅ | ✅ |
| Bubble Sort | O(n) | O(n²) | O(n²) | ✅ | ✅ | ❌ |
| Selection Sort | O(n²) | O(n²) | O(n²) | ❌ | ❌ | ❌ |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | ✅ | ❌ | ❌ |

---

## Interactive Visualizer

<iframe
  src={useBaseUrl('/files/sorting-insertion-sort.html')}
  title="Insertion Sort Visual"
  style={{
    width: '100%',
    height: '800px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>
