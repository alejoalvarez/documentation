---
title: Interpolation Search
sidebar_label: Interpolation Search
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Interpolation Search

**Interpolation Search** is an advanced searching algorithm that is an improvement over Binary Search for instances where the values in a sorted array are **uniformly distributed**. 

Instead of always checking the exact middle element, it mathematically estimates (interpolates) the probable position of the target element based on the values at the `low` and `high` boundaries of the search space.

---

## Interactive Visualizer

<iframe
  src={useBaseUrl('/files/searching-interpolation.html')}
  title="Interpolation Search Visual"
  style={{
    width: '100%',
    height: '600px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>


## Key Concepts

### The Dictionary Analogy
Think of how you search for a word in a dictionary. If you are looking for the word "Zebra," you don't open the dictionary exactly to the middle (like Binary Search). Instead, you open it near the very end, because you intuitively know "Z" is at the end of the alphabet. Interpolation Search applies this exact human intuition mathematically.

### The Estimation Formula
Instead of `mid = (low + high) / 2`, Interpolation search calculates a `pos` (position) using: 
```text
pos = low + floor( ((target - arr[low]) * (high - low)) / (arr[high] - arr[low]) )
```
This formula creates a linear interpolation between the values, guessing exactly where the number *should* be if the array data scales evenly.

---

## How It Works

1. Start with `low = 0` and `high = length(array) - 1`.
2. Ensure the `target` is within the bounds of `arr[low]` and `arr[high]`. (If it isn't, the element cannot be in the array).
3. Calculate the estimated `pos` using the formula above.
4. Compare `arr[pos]` with `target`:
   - **Match:** Target found at `pos`.
   - **Target is smaller:** Target must be to the left. Update `high = pos - 1`.
   - **Target is larger:** Target must be to the right. Update `low = pos + 1`.
5. Repeat until the target is found or the bounds cross.

---

## Pseudocode

```text
function interpolationSearch(arr, target):
    low = 0
    high = length(arr) - 1

    while low <= high AND target >= arr[low] AND target <= arr[high]:
        // Prevent division by zero if all elements are the same
        if arr[high] == arr[low]:
            if arr[low] == target: return low
            else: return -1
            
        // The Probing Formula
        pos = low + floor( ((target - arr[low]) * (high - low)) / (arr[high] - arr[low]) )

        if arr[pos] == target:
            return pos

        if arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1

    return -1
```

---

## Implementations

<details>
<summary>JavaScript</summary>

```js
function interpolationSearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) {
      if (arr[low] === target) return low;
      return -1;
    }

    let pos = Math.floor(
      low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );

    if (arr[pos] === target) return pos;

    if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  return -1;
}

const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
console.log(interpolationSearch(arr, 70)); // Output: 6
```

</details>

<details>
<summary>Python</summary>

```python
def interpolation_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high and target >= arr[low] and target <= arr[high]:
        if low == high:
            if arr[low] == target:
                return low
            return -1
            
        # Prevent division by zero
        if arr[high] == arr[low]:
            break

        pos = low + int(((float(high - low) / (arr[high] - arr[low])) * (target - arr[low])))

        if arr[pos] == target:
            return pos

        if arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1

    return -1

arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
print(interpolation_search(arr, 70)) # Output: 6
```

</details>

<details>
<summary>Java</summary>

```java
public class InterpolationSearch {

    public static int interpolationSearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high && target >= arr[low] && target <= arr[high]) {
            if (low == high) {
                if (arr[low] == target) return low;
                return -1;
            }

            int pos = low + (((high - low) / (arr[high] - arr[low])) * (target - arr[low]));

            if (arr[pos] == target) {
                return pos;
            }

            if (arr[pos] < target) {
                low = pos + 1;
            } else {
                high = pos - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
        System.out.println(interpolationSearch(arr, 70)); // Output: 6
    }
}
```

</details>

---

## Complexity Analysis

Let `n` = number of elements in the array.

| Case | Time Complexity | Space Complexity |
|------|-----------------|------------------|
| Best | O(1) | O(1) |
| Average | O(log(log n)) | O(1) |
| Worst | O(n) | O(1) |

- **Average Time O(log(log n))** — If the elements are uniformly distributed, Interpolation Search is astronomically fast. While `log n` for 1 billion items takes ~30 steps, `log(log n)` takes barely ~5 steps.
- **Worst Time O(n)** — If the data increases exponentially or entirely unevenly (e.g., `[1, 2, 3, 10000]`), the math formula will guess poorly, resulting in checking almost every element linearly.
- **Space O(1)** — It requires only pointers and mathematical variables, using constant memory.

---

## Key Properties

| Property | Value |
|----------|-------|
| Requires Sorted Data? | ✅ Yes |
| Requires Uniform Distribution? | ⚠️ Highly Recommended |

:::tip When to Use
- You are searching a massive, **uniformly distributed** dataset (like a phonebook or a list of evenly-spaced IDs).
- When calculation costs are significantly lower than disk/memory access costs (making the complex math formula worth the price).
:::

:::caution When to Avoid
- **Unevenly Distributed Data:** If your data clumps up wildly, Binary Search is strictly safer and faster.
- **Strings/Objects:** Interpolation Search relies on arithmetic. You cannot easily do math on strings or complex objects without expensive translation functions.
:::

---

