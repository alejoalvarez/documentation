---
title: Counting Sort
sidebar_label: 8 - Counting Sort
displayed_sidebar: softwareArchitectureSidebar
tags: [Sorting-Algorithms]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Sorting Algorithms</span>

# Counting Sort

**Counting Sort** is a **non-comparative** integer sorting algorithm that operates in **linear time**, where $n$ is the number of elements and $k$ is the range of the non-negative key values.

Instead of comparing elements to determine their relative order, Counting Sort counts the number of occurrences of each distinct element. It then uses arithmetic, often a prefix sum array, to determine the exact position of each element in the sorted output array.

---

## Interactive Visualizer

<iframe
  src={useBaseUrl('/files/sorting-counting-sort.html')}
  title="Counting Sort Visual"
  style={{
    width: '100%',
    height: '900px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>


## Key Concepts

### When to Use Counting Sort
Counting Sort is highly efficient, but it has strict limitations:
1. It only works with discrete values, typically **non-negative integers**.
2. The range of values $k$ (the maximum element) must be relatively small compared to the number of elements $n$.
3. It relies heavily on arrays for lookups and acts as a stable subroutine in algorithms like **Radix Sort**.

### Stability Requirement
Counting Sort is usually implemented as a **stable** sort (it preserves the relative order of items with equal keys). Stability is crucial when Counting Sort is used as a sub-routine in string or multi-digit integer sorting (like LSD Radix Sort).

---

## How It Works

1. **Find Maximum:** Determine the maximum value $k$ in the input array to size the counting array.
2. **Count Frequencies:** Create a `count` array of size $k + 1$, initialized to zeros. Iterate through the input and increment `count[x]` every time value $x$ is encountered.
3. **Prefix Sums:** Transform the `count` array so that each element at index $i$ stores the sum of preceding counts (plus its own). This effectively records the actual ending position in the output array for each element.
4. **Place in Output (Right to Left):** Iterate through the original array in reverse (to maintain stability). Place each element $x$ into the output array at index `count[x] - 1`. Decrease `count[x]` by 1.

### Step-by-step Example

Given input: `[4, 2, 2, 8, 3, 3, 1]`

**Step 1: Find Max**
Max value $k = 8$. We need a count array of size $8 + 1 = 9$.

**Step 2: Count Frequencies**
Index: `[0, 1, 2, 3, 4, 5, 6, 7, 8]`
Count: `[0, 1, 2, 2, 1, 0, 0, 0, 1]`
*(e.g., there are two `2`s, two `3`s, one `8`)*

**Step 3: Compute Prefix Sums (Accumulate Counts)**
Count: `[0, 1, 3, 5, 6, 6, 6, 6, 7]`
*(e.g., `count[3] = 5`, meaning elements $\le 3$ will occupy up to the 5th position in output, indices 0-4)*

**Step 4: Build Output Array (Iterating Backwards for Stability)**

- Original `arr[6] = 1`: Place `1` at `output[count[1] - 1] = output[0]`. Decrease `count[1]` to 0.
- Original `arr[5] = 3`: Place `3` at `output[count[3] - 1] = output[4]`. Decrease `count[3]` to 4.
- Original `arr[4] = 3`: Place `3` at `output[count[3] - 1] = output[3]`. Decrease `count[3]` to 3.
- Original `arr[3] = 8`: Place `8` at `output[count[8] - 1] = output[6]`. Decrease `count[8]` to 6.
- Original `arr[2] = 2`: Place `2` at `output[count[2] - 1] = output[2]`. Decrease `count[2]` to 2.
- Original `arr[1] = 2`: Place `2` at `output[count[2] - 1] = output[1]`. Decrease `count[2]` to 1.
- Original `arr[0] = 4`: Place `4` at `output[count[4] - 1] = output[5]`. Decrease `count[4]` to 5.

**Result:** `[1, 2, 2, 3, 3, 4, 8]` ✅

---

## Pseudocode

```text
function countingSort(array):
    max = maximum value in array
    n = length of array

    // Step 2: Initialize count array
    count = array of size (max + 1) filled with zeros
    for i from 0 to n - 1:
        count[array[i]]++

    // Step 3: Compute prefix sums
    for i from 1 to max:
        count[i] += count[i - 1]

    // Step 4: Place elements (right to left for stability)
    output = array of size n
    for i from n - 1 down to 0:
        val = array[i]
        output[count[val] - 1] = val
        count[val]--

    return output
```

---

## Implementations

<details>
<summary>JavaScript</summary>

```js
function countingSort(arr) {
  if (arr.length === 0) return [];
  
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  const output = new Array(arr.length);
  
  // Count frequencies
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
  }
  
  // Compute prefix sums
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }
  
  // Place elements to maintain stability
  for (let i = arr.length - 1; i >= 0; i--) {
    let val = arr[i];
    output[count[val] - 1] = val;
    count[val]--;
  }
  
  return output;
}

console.log(countingSort([4, 2, 2, 8, 3, 3, 1]));
// [1, 2, 2, 3, 3, 4, 8]
```

</details>

<details>
<summary>Python</summary>

```python
def counting_sort(arr):
    if not arr:
        return []

    max_val = max(arr)
    count = [0] * (max_val + 1)
    output = [0] * len(arr)

    # Count frequencies
    for num in arr:
        count[num] += 1

    # Compute prefix sums
    for i in range(1, len(count)):
        count[i] += count[i - 1]

    # Place elements to maintain stability
    for i in range(len(arr) - 1, -1, -1):
        val = arr[i]
        output[count[val] - 1] = val
        count[val] -= 1

    return output

print(counting_sort([4, 2, 2, 8, 3, 3, 1]))
# [1, 2, 2, 3, 3, 4, 8]
```

</details>

<details>
<summary>Java</summary>

```java
import java.util.Arrays;

public class CountingSort {

    public static int[] countingSort(int[] arr) {
        if (arr.length == 0) return new int[0];

        int max = Arrays.stream(arr).max().getAsInt();
        int[] count = new int[max + 1];
        int[] output = new int[arr.length];

        // Count frequencies
        for (int i = 0; i < arr.length; i++) {
            count[arr[i]]++;
        }

        // Compute prefix sums
        for (int i = 1; i <= max; i++) {
            count[i] += count[i - 1];
        }

        // Place elements to maintain stability
        for (int i = arr.length - 1; i >= 0; i--) {
            int val = arr[i];
            output[count[val] - 1] = val;
            count[val]--;
        }

        return output;
    }
}
```

</details>

---

## Complexity Analysis

Let `n` = number of elements, and `k` = range of the non-negative key values (maximum value).

| Case | Time Complexity | Space Complexity |
|------|-----------------|------------------|
| Best | O(n + k) | O(n + k) |
| Average | O(n + k) | O(n + k) |
| Worst | O(n + k) | O(n + k) |

- **Time O(n + k)** — The algorithm comprises separate non-nested loops. We iterate through the `n` items to count them, then iterate `k` times to create prefix sums, and then `n` times to populate the output array. This gives O(2n + k) = O(n + k).
- **Space O(n + k)** — We need a `count` array of size `k` and an `output` array of size `n`.
- **When is it faster?** Usually used when k = O(n), which effectively simplifies the time complexity to O(n). If k ≫ n, Counting Sort becomes exceedingly slow and memory intensive.

---

## Key Properties

| Property | Value |
|----------|-------|
| In-place | ❌ No |
| Stable | ✅ Yes |
| Comparative | ❌ No |
| Adaptive | ❌ No |

:::note Non-comparative
Like **Radix Sort**, Counting Sort **never compares elements** against each other, circumventing the O(n log n) theoretical lower bound limit.
:::

:::tip When to Use
- **Small range integers**: Sorting user ages, grades, 8-bit image pixel colors (0-255).
- **Sub-routine for Radix Sort**: Whenever sorting objects digit-by-digit or character-by-character.
- When k = O(n) and **stability** is required.
:::

:::caution When to Avoid
- **Large key ranges**: Sorting large integers safely requires O(n log n) comparison sorts or Radix Sort. Using Counting Sort for a single element array like `[10000000]` will allocate a 10M-element `count` array, which is memory disastrous.
- **Negative Numbers, Decimals, or Objects**: Standard Counting Sort only indexes non-negative integers natively. It requires offsets and adaptations to handle negative elements.
:::

---

## Comparison with Similar Algorithms

| Algorithm | Best | Average | Worst | Stable | In-place | Comparative |
|-----------|------|---------|-------|--------|----------|-------------|
| **Counting Sort** | O(n+k) | O(n+k) | O(n+k) | ✅ | ❌ | ❌ |
| Radix Sort | O(d·n) | O(d·n) | O(d·n) | ✅ | ❌ | ❌ |
| Bucket Sort | O(n+k) | O(n+k) | O(n²) | ✅* | ❌ | ✅* |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | ✅ | ❌ | ✅ |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | ❌ | ✅ | ✅ |

---

