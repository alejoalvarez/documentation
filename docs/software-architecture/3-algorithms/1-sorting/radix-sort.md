---
title: Radix Sort
sidebar_label: Radix Sort
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Radix Sort

**Radix Sort** is a **non-comparative** integer sorting algorithm. Instead of comparing elements directly, it sorts them digit by digit — from the **least significant digit (LSD)** to the **most significant digit (MSD)** — using a stable sub-sort (typically Counting Sort) at each digit position.

Because it never compares elements, it can break through the O(n log n) lower bound for comparison-based sorting, achieving **O(d · n)** time where `d` is the number of digits.

---

## Interactive Visualizer

<iframe
  src={useBaseUrl('/files/sorting-radix-sort.html')}
  title="Radix Sort Visual"
  style={{
    width: '100%',
    height: '900px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>


## Key Concepts

### LSD vs MSD Radix Sort

| Variant | Direction | Notes |
|---------|-----------|-------|
| **LSD** (Least Significant Digit) | Right → Left | Simpler, works well for fixed-length integers and strings |
| **MSD** (Most Significant Digit) | Left → Right | Better for variable-length strings; can be done in-place |

The most common implementation is **LSD Radix Sort**, used below.

### Counting Sort as a sub-routine

For each digit position, Radix Sort uses **Counting Sort** — a stable O(n + k) sort where `k` is the number of distinct digit values (0–9 for base 10). Stability is critical: equal-digit elements must retain their relative order from the previous pass.

---

## How It Works (LSD, Base 10)

1. Find the **maximum value** to determine the number of digit positions `d`.
2. For each digit position (ones → tens → hundreds → …):
   - Run a **stable Counting Sort** on that digit.
   - The array is now sorted relative to all digits processed so far.
3. After all `d` passes, the array is fully sorted.

### Step-by-step Example

Given: `[170, 45, 75, 90, 802, 24, 2, 66]`

**Pass 1 — Sort by ones digit:**

| Value | Ones digit |
|-------|-----------|
| 170 | 0 |
| 45 | 5 |
| 75 | 5 |
| 90 | 0 |
| 802 | 2 |
| 24 | 4 |
| 2 | 2 |
| 66 | 6 |

Result: `[170, 90, 802, 2, 24, 45, 75, 66]`

**Pass 2 — Sort by tens digit:**

| Value | Tens digit |
|-------|-----------|
| 170 | 7 |
| 90 | 9 |
| 802 | 0 |
| 2 | 0 |
| 24 | 2 |
| 45 | 4 |
| 75 | 7 |
| 66 | 6 |

Result: `[802, 2, 24, 45, 66, 170, 75, 90]`

**Pass 3 — Sort by hundreds digit:**

Result: `[2, 24, 45, 66, 75, 90, 170, 802]` ✅

---

## Pseudocode

```
function radixSort(array):
    max = maximum value in array

    for exp = 1 while max / exp > 0:
        countingSort(array, exp)
        exp = exp * 10

function countingSort(array, exp):
    n      = length(array)
    output = array of size n
    count  = array of size 10, all zeros

    // Count occurrences of each digit
    for i from 0 to n-1:
        digit = (array[i] / exp) % 10
        count[digit]++

    // Accumulate counts (prefix sum)
    for i from 1 to 9:
        count[i] += count[i-1]

    // Place elements from right to left (for stability)
    for i from n-1 down to 0:
        digit = (array[i] / exp) % 10
        output[count[digit] - 1] = array[i]
        count[digit]--

    // Copy output back to array
    copy output into array
```

---

## Implementations

<details>
<summary>JavaScript</summary>

```js
function radixSort(arr) {
  const max = Math.max(...arr);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    arr = countingSort(arr, exp);
  }

  return arr;
}

function countingSort(arr, exp) {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count  = new Array(10).fill(0);

  for (let i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }

  return output;
}

console.log(radixSort([170, 45, 75, 90, 802, 24, 2, 66]));
// [2, 24, 45, 66, 75, 90, 170, 802]
```

</details>

<details>
<summary>Python</summary>

```python
def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        arr = counting_sort(arr, exp)
        exp *= 10
    return arr

def counting_sort(arr, exp):
    n = len(arr)
    output = [0] * n
    count  = [0] * 10

    for i in range(n):
        index = (arr[i] // exp) % 10
        count[index] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    for i in range(n - 1, -1, -1):
        index = (arr[i] // exp) % 10
        output[count[index] - 1] = arr[i]
        count[index] -= 1

    return output

print(radix_sort([170, 45, 75, 90, 802, 24, 2, 66]))
# [2, 24, 45, 66, 75, 90, 170, 802]
```

</details>

<details>
<summary>Java</summary>

```java
public class RadixSort {

    public static void radixSort(int[] arr) {
        int max = Arrays.stream(arr).max().getAsInt();
        for (int exp = 1; max / exp > 0; exp *= 10) {
            countingSort(arr, exp);
        }
    }

    private static void countingSort(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count  = new int[10];

        for (int i = 0; i < n; i++) {
            count[(arr[i] / exp) % 10]++;
        }

        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (int i = n - 1; i >= 0; i--) {
            int digit = (arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }

        System.arraycopy(output, 0, arr, 0, n);
    }
}
```

</details>

---

## Complexity Analysis

Let `n` = number of elements, `d` = number of digits in the maximum value, `k` = base (10 for decimal).

| Case | Time Complexity | Space Complexity |
|------|-----------------|------------------|
| Best | O(d · (n + k)) | O(n + k) |
| Average | O(d · (n + k)) | O(n + k) |
| Worst | O(d · (n + k)) | O(n + k) |

- **Time O(d · (n + k))** — `d` passes of Counting Sort, each O(n + k). For base 10 integers up to 10^d, `d = log₁₀(max)` and `k = 10`, giving effectively **O(n)** when `d` is constant.
- **Space O(n + k)** — The output buffer holds `n` elements, and the count array holds `k` buckets. Not in-place.
- **When is it faster?** When `d · (n + k) < n log n` — typically when `d` is small and `n` is large.

---

## Key Properties

| Property | Value |
|----------|-------|
| In-place | ❌ No |
| Stable | ✅ Yes |
| Comparative | ❌ No |
| Adaptive | ❌ No |

:::note Non-comparative
Radix Sort **never compares elements** against each other. It distributes them by digit value. This allows it to break the O(n log n) theoretical lower bound that applies only to comparison-based algorithms.
:::

:::note Stability requirement
Each digit pass **must** use a stable sort. Processing from right to left (for LSD) and iterating elements from right to left during placement preserves the relative order of equal-digit elements — which is essential for correctness across passes.
:::

:::tip When to Use
- Sorting **large collections of integers** with a small, bounded number of digits (e.g., IDs, phone numbers, ZIP codes).
- When you need **O(n) average** sorting and elements are non-negative integers or fixed-length strings.
- When **stability** is required alongside near-linear speed.
:::

:::caution When to Avoid
- For **floating-point numbers** — requires adaptation (e.g., treating IEEE 754 bits carefully).
- For **general objects** with complex comparison logic — comparison-based sorts are more flexible.
- When `d` is large relative to `log n` — in that case, O(n log n) algorithms like Merge Sort or Quick Sort will be faster.
- **Space is constrained** — the O(n + k) auxiliary buffer may be prohibitive.
:::

---

## Comparison with Similar Algorithms

| Algorithm | Best | Average | Worst | Stable | In-place | Comparative |
|-----------|------|---------|-------|--------|----------|-------------|
| **Radix Sort** | O(d·n) | O(d·n) | O(d·n) | ✅ | ❌ | ❌ |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | ✅ | ❌ | ❌ |
| Bucket Sort | O(n+k) | O(n+k) | O(n²) | ✅* | ❌ | ✅* |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | ✅ | ❌ | ✅ |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | ❌ | ✅ | ✅ |

---

