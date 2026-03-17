---
title: Fibonacci Search
sidebar_label: 6 - Fibonacci Search
displayed_sidebar: softwareArchitectureSidebar
tags: [Searching-Algorithms]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Searching Algorithms</span>

# Fibonacci Search

**Fibonacci Search** is an algorithm that searches a sorted array by using numbers from the Fibonacci sequence to divide the search space. 

It works similarly to Binary Search, but instead of repeatedly dividing the array completely in half, it divides the array into unequal parts corresponding to Fibonacci numbers. This guarantees that the algorithm only performs **addition and subtraction**, completely avoiding multiplication or division operations.

---

## Interactive Visualizer

<iframe
  src={useBaseUrl('/files/searching-fibonacci.html')}
  title="Fibonacci Search Visual"
  style={{
    width: '100%',
    height: '670px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>


## Key Concepts

### Why use Fibonacci Numbers?
The Fibonacci sequence (`0, 1, 1, 2, 3, 5, 8, 13, 21...`) has a unique mathematical relationship where any number is the sum of the two preceding ones (`F_m = F_m-1 + F_m-2`). By using these lengths to jump through the array, the search space can be partitioned gracefully using purely additive math.

### Hardware Efficiency
On older or highly constrained hardware, division (`mid = (low + high) / 2`) can be a computationally expensive CPU instruction. Fibonacci search replaces this division with addition/subtraction, which are the cheapest CPU instructions available.

---

## How It Works

Let `n` be the length of the array.

1. Find the smallest Fibonacci number `F_m` that is greater than or equal to `n`.
2. Keep track of the two preceding Fibonacci numbers `F_m-1` and `F_m-2`.
3. Maintain an `offset = -1`. The offset acts as the eliminated left portion of the array.
4. While `F_m > 1`:
   - Calculate index `i = min(offset + F_m-2, n - 1)`.
   - **Match:** If `arr[i] == target`, return `i`.
   - **Target is larger:** If `arr[i] < target`, the target is to the right. Move the `offset` to `i`, and shift the Fibonacci variables down 1 step in the sequence (`F_m = F_m-1`).
   - **Target is smaller:** If `arr[i] > target`, the target is to the left. Shift the Fibonacci variables down 2 steps in the sequence (`F_m = F_m-2`).
5. If the loop ends, check the last element specifically. If `arr[offset + 1] == target`, return it. Otherwise, return `-1`.

---

## Pseudocode

```text
function fibonacciSearch(arr, target, n):
    // 1. Initialize fibonacci numbers
    fib2 = 0            // (m-2)'th Fibonacci
    fib1 = 1            // (m-1)'th Fibonacci
    fibM = fib2 + fib1  // m'th Fibonacci

    // 2. Find the smallest fibM >= n
    while fibM < n:
        fib2 = fib1
        fib1 = fibM
        fibM = fib2 + fib1

    offset = -1

    // 3. Search Loop
    while fibM > 1:
        // Use fib2 to calculate the index
        i = min(offset + fib2, n - 1)

        if arr[i] == target:
            return i
            
        // Target is greater, chop off left subarray
        if arr[i] < target:
            fibM = fib1
            fib1 = fib2
            fib2 = fibM - fib1
            offset = i
            
        // Target is less, chop off right subarray
        else:
            fibM = fib2
            fib1 = fib1 - fib2
            fib2 = fibM - fib1

    // 4. Compare the last element
    if fib1 == 1 AND arr[offset + 1] == target:
        return offset + 1

    return -1
```

---

## Implementations

<details>
<summary>JavaScript</summary>

```js
function fibonacciSearch(arr, target) {
  let n = arr.length;
  let fib2 = 0;
  let fib1 = 1;
  let fibM = fib2 + fib1;

  while (fibM < n) {
    fib2 = fib1;
    fib1 = fibM;
    fibM = fib2 + fib1;
  }

  let offset = -1;

  while (fibM > 1) {
    let i = Math.min(offset + fib2, n - 1);

    if (arr[i] === target) return i;

    if (arr[i] < target) {
      fibM = fib1;
      fib1 = fib2;
      fib2 = fibM - fib1;
      offset = i;
    } else {
      fibM = fib2;
      fib1 = fib1 - fib2;
      fib2 = fibM - fib1;
    }
  }

  if (fib1 && arr[offset + 1] === target) {
    return offset + 1;
  }

  return -1;
}

const arr = [2, 5, 8, 12, 15, 18, 21, 25, 30];
console.log(fibonacciSearch(arr, 21)); // Output: 6
```

</details>

<details>
<summary>Python</summary>

```python
def fibonacci_search(arr, target):
    n = len(arr)
    fib2 = 0
    fib1 = 1
    fibM = fib2 + fib1

    while fibM < n:
        fib2 = fib1
        fib1 = fibM
        fibM = fib2 + fib1

    offset = -1

    while fibM > 1:
        i = min(offset + fib2, n - 1)

        if arr[i] == target:
            return i

        if arr[i] < target:
            fibM = fib1
            fib1 = fib2
            fib2 = fibM - fib1
            offset = i
        else:
            fibM = fib2
            fib1 = fib1 - fib2
            fib2 = fibM - fib1

    if fib1 and offset < n - 1 and arr[offset + 1] == target:
        return offset + 1

    return -1

arr = [2, 5, 8, 12, 15, 18, 21, 25, 30]
print(fibonacci_search(arr, 21)) # Output: 6
```

</details>

<details>
<summary>Java</summary>

```java
public class FibonacciSearch {
    public static int fibonacciSearch(int[] arr, int target) {
        int n = arr.length;
        int fib2 = 0; 
        int fib1 = 1; 
        int fibM = fib2 + fib1; 

        while (fibM < n) {
            fib2 = fib1;
            fib1 = fibM;
            fibM = fib2 + fib1;
        }

        int offset = -1;

        while (fibM > 1) {
            int i = Math.min(offset + fib2, n - 1);

            if (arr[i] == target) return i;

            if (arr[i] < target) {
                fibM = fib1;
                fib1 = fib2;
                fib2 = fibM - fib1;
                offset = i;
            } else {
                fibM = fib2;
                fib1 = fib1 - fib2;
                fib2 = fibM - fib1;
            }
        }

        if (fib1 == 1 && offset < n - 1 && arr[offset + 1] == target) {
            return offset + 1;
        }

        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {2, 5, 8, 12, 15, 18, 21, 25, 30};
        System.out.println(fibonacciSearch(arr, 21)); // Output: 6
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

- **Time O(log n)** — Similar to Binary Search, it reduces the search space at a logarithmic rate. 
- **Space O(1)** — It requires only three variables to generate the Fibonacci sequence continuously, allocating constant memory.

---

## Key Properties

| Property | Value |
|----------|-------|
| Requires Sorted Data? | ✅ Yes |
| Uses Division? | ❌ No (Fast for older CPU architectures) |

:::tip When to Use
- When writing software for **embedded systems**, microcontrollers, or older hardware where the CPU lacks a fast native division instruction.
- When the data array is extremely large such that dividing bounds might cause integer overflow (though `low + (high - low)/2` usually prevents this anyway).
:::

:::caution When to Avoid
- On modern hardware (Intel/AMD/Apple Silicon), branch prediction and division are so highly optimized natively that Binary Search is functionally faster and far simpler to write and maintain than Fibonacci Search.
:::

---