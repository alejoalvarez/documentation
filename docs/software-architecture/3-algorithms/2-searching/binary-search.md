---
title: Binary Search
sidebar_label: Binary Search
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Binary Search

**Binary Search** is a fast, efficient **divide-and-conquer** searching algorithm. It works by repeatedly dividing the search interval in half. 

Because it eliminates half of the remaining elements with each comparison, it operates in **logarithmic time** $O(\log n)$. However, it comes with one strict requirement: **the dataset must be sorted beforehand**.

---

## Interactive Visualizer

<iframe
  src={useBaseUrl('/files/searching-binary-search.html')}
  title="Binary Search Visual"
  style={{
    width: '100%',
    height: '600px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>


## Key Concepts

### Divide and Conquer
Instead of checking every element (like Linear Search), Binary Search compares the target value to the **middle element** of the array. If they are unequal, the half in which the target cannot lie is eliminated, and the search continues on the remaining half.

### The Pointers (`low`, `high`, `mid`)
Binary Search relies on three indices to track the search space:
- **`low` (Left Pointer):** The start index of the current search space.
- **`high` (Right Pointer):** The end index of the current search space.
- **`mid` (Middle Pointer):** The calculated center of the search space: `mid = Math.floor((low + high) / 2)`.

---

## How It Works

1. Establish the initial search space: `low = 0` and `high = length - 1`.
2. While `low <= high`, continue searching:
   - Calculate `mid`.
   - **Match:** If `array[mid] == target`, return `mid`.
   - **Target is smaller:** If `array[mid] > target`, the target must be in the left half. Update `high = mid - 1`.
   - **Target is larger:** If `array[mid] < target`, the target must be in the right half. Update `low = mid + 1`.
3. If the loop ends (`low > high`), the target is not in the array. Return `-1`.

### Step-by-step Example

Given a **sorted** array: `[2, 5, 8, 12, 15, 18, 21, 25, 30]`  
Target value: `18`

**Step 1:**
- `low = 0`, `high = 8`
- `mid = (0 + 8) / 2 = 4` (value `15`)
- `15 < 18`. Target is larger, so we discard the left half. Update `low = mid + 1 = 5`.

**Step 2:**
- `low = 5`, `high = 8`
- `mid = (5 + 8) / 2 = 6` (value `21`)
- `21 > 18`. Target is smaller, so we discard the right half. Update `high = mid - 1 = 5`.

**Step 3:**
- `low = 5`, `high = 5`
- `mid = (5 + 5) / 2 = 5` (value `18`)
- `18 == 18`. **Match found!** Return index `5`. ✅

*(It took only 3 comparisons to find the target among 9 elements, compared to 6 comparisons for a Linear Search).*

---

## Pseudocode

```text
function binarySearch(array, target):
    low = 0
    high = length(array) - 1

    while low <= high:
        mid = floor((low + high) / 2)

        if array[mid] == target:
            return mid                 // Target found

        if array[mid] < target:
            low = mid + 1              // Search right half
        else:
            high = mid - 1             // Search left half

    return -1                          // Target not found
```

---

## Implementations

<details>
<summary>JavaScript</summary>

```js
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      return mid; // Target found
    }

    if (arr[mid] < target) {
      low = mid + 1; // Discard left half
    } else {
      high = mid - 1; // Discard right half
    }
  }

  return -1; // Target not found
}

const arr = [2, 5, 8, 12, 15, 18, 21, 25, 30];
console.log(binarySearch(arr, 18)); 
// Output: 5
```

</details>

<details>
<summary>Python</summary>

```python
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2

        if arr[mid] == target:
            return mid  # Target found

        if arr[mid] < target:
            low = mid + 1  # Discard left half
        else:
            high = mid - 1  # Discard right half

    return -1  # Target not found

arr = [2, 5, 8, 12, 15, 18, 21, 25, 30]
print(binary_search(arr, 18))
# Output: 5
```

</details>

<details>
<summary>Java</summary>

```java
public class BinarySearch {

    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2; // Prevents integer overflow in Java

            if (arr[mid] == target) {
                return mid; // Target found
            }

            if (arr[mid] < target) {
                low = mid + 1; // Discard left half
            } else {
                high = mid - 1; // Discard right half
            }
        }
        return -1; // Target not found
    }

    public static void main(String[] args) {
        int[] arr = {2, 5, 8, 12, 15, 18, 21, 25, 30};
        System.out.println(binarySearch(arr, 18));
        // Output: 5
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
| Average | O(log n) | O(1) |
| Worst | O(log n) | O(1) |

- **Time O(log n)** — In each step, the algorithm reduces the size of the search array by half. Therefore, the maximum number of iterations is $\approx \log_2(n)$. Searching through an array of 1,000,000 elements takes at most ~20 comparisons.
- **Space O(1)** — The iterative implementation uses a constant amount of memory for pointers `low`, `high`, and `mid` regardless of array size. (A *recursive* implementation would use O(log n) space for the call stack).

---

## Key Properties

| Property | Value |
|----------|-------|
| Requires Sorted Data? | ✅ Yes |
| In-place | ✅ Yes |

:::tip When to Use
- **Large Datasets:** Binary Search is incredibly fast for large arrays.
- **Read-Heavy Workloads:** If a dataset is queried frequently but updated rarely, sorting it once `O(n log n)` and using Binary Search `O(log n)` repeatedly is highly optimal.
:::

:::caution When to Avoid
- **Unsorted Data:** If the array is unsorted, Binary Search will fail completely. Sorting the array explicitly just to do a single search takes `O(n log n)`, which is worse than a simple `O(n)` Linear Search.
- **Frequent Inserts/Deletes:** Arrays are expensive to modify. If data changes constantly, maintaining the sorted order for Binary Search becomes a bottleneck `O(n)`. A **Binary Search Tree (BST)** or Hash Table is vastly superior in this scenario.
:::

---

## Comparison with Similar Algorithms

| Algorithm | Best Time | Average Time | Worst Time | Requires Sorted Data | Space |
|-----------|-----------|--------------|------------|----------------------|-------|
| Linear Search | O(1) | O(n) | O(n) | ❌ No | O(1) |
| **Binary Search** | O(1) | O(log n) | O(log n) | ✅ Yes | O(1) |
| BST Search | O(1) | O(log n) | O(n) | ❌ No (Self-sorting) | O(n) |
| Hash Table Lookup | O(1) | O(1) | O(n) | ❌ No | O(n) |

---

