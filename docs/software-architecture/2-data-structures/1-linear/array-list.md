---
title: Array List
sidebar_label: Array List
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Array List

An ```ArrayList``` (also known as a Dynamic Array) is a data structure that uses an internal Array to store elements, but has the ability to automatically resize itself.

## Interactive visual

<iframe
  src={useBaseUrl('/files/1-linear-arraylist.html')}
  title="Linear Array Visual"
  style={{
    width: '100%',
    height: '650px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>


## When to use an array and when to use an arraylist?
- Use an ```Array``` if:

    - The size of your data is constant and known (e.g., the months of the year).
    - Extreme performance and memory savings are critical (embedded systems).

- Use an ```ArrayList``` if:

    - You don't know how many elements you will receive (e.g., a list of users from a database).
    - You need convenient built-in methods to easily search, sort, or delete.

## Example

Python does not have ArrayList like Java, but lists act as dynamic lists of variable size, equivalent to ArrayList. They are mutable, ordered, and support fast append/remove operations.

```python 
# empty list
my_list = []

# Initialize with values
my_list = [1, 2, 3, "text1", 4.5]

print(my_list)  # [1, 2, 3, 'text1', 4.5]

```

**Access by index:**

```python
my_lista[0]
```

Result `1`. 

**Some common operations:**
- Add: `my_list.append(99)` → adds to the end.
- Insert: `my_list.insert(2, 50)` → at position 2.
- Delete: `my_list.pop(1)` → removes index 1; my_list.remove(3) → first 3.
- Size: `len(my_list)`.