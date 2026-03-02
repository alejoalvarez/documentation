---
title: Array
sidebar_label: Array
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Array

An ```array``` stores contiguous elements in memory, allowing access by index in constant time.

It's basically the “Hello World” of data structures: simple, straightforward, and the basis for almost everything we use in programming.

## Interactive visual

<iframe
  src={useBaseUrl('/files/1-linear-array.html')}
  title="Linear Array Visual"
  style={{
    width: '100%',
    height: '600px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## Characteristics

- Homogeneity: All elements must be of the same type (all integers, all characters, etc.).
- Random Access: You can jump directly to any element if you know its index. You don't have to go through it from the beginning.
- Fixed Size: Traditionally, once you define the size of an array in memory, you cannot change it (although modern languages use “dynamic arrays” to simulate this).

##  Advantages and Disadvantages
👍 Advantages:
Access speed: It is extremely fast for reading data.

Simple iteration: It is very easy to traverse with a simple for loop.

Memory efficiency: It does not waste space on extra “pointers” like linked lists.

👎 Disadvantages:
Inflexibility: If you run out of space, you have to create a new, larger array and copy everything.

Editing cost: Inserting or deleting elements in the middle is computationally expensive.

## Example

```python title="example-array.py"
import array

int_array = array.array('i', [1, 2, 3, 4])
float_array = array.array('f', [1.1, 2.2, 3.3])

print(int_array)  # array('i', [1, 2, 3, 4])
print(float_array)  # array('f', [1.1, 2.2, 3.3])

```

**Access by index**: 
```python
int_array[0] 
```


Result ```1```

```python
int_array.append(5)      # add at the end: [1,2,3,4,5]
int_array.insert(1, 10)  # Insert 10 in index 1: [1,10,2,3,4,5]
int_array.pop(2)         # remove index 2: [1,10,3,4,5]
print(int_array[1:4])    # slice: array('i', [10,3,4])
```