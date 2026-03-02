---
title: Stack
sidebar_label: Stack
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Stack

A stack is a linear data structure that follows the LIFO (Last-In, First-Out) principle, which means that the last element to enter is the first to leave.

You cannot remove an element from the middle without first removing the ones above it. It is a restricted structure, but that restriction is precisely what makes it so powerful for certain problems.


## Interactive visual - Stack

<iframe
  src={useBaseUrl('/files/1-linear-stack.html')}
  title="Linear Array Visual"
  style={{
    width: '100%',
    height: '770px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## Fundamental Operations
- Unlike arrays, where you can access any index, in a stack we only interact with the top.
- Push: Adds an element to the top of the stack.
- Pop: Removes and returns the element at the top.
- Peek (or Top): View the top element without removing it.
- isEmpty: Check if the stack is empty.

## Real-Life Use Cases

Stacks are everywhere, even if you can't see them:

- The “Back” button on your browser: Each page you visit is pushed onto the stack. When you go back, it pops off the stack.
- Undo (Ctrl + Z): Text editors save your changes on a stack. When you undo, they remove the last change.
- Recursion: When a function calls itself, the computer uses a “Call Stack” to remember where each call left off.
- Balancing parentheses: Compilers use stacks to check that each ( has its ).

## Example
Python does not have native stacks, but you can implement one using lists with append() and pop() for LIFO (Last In, First Out). Here is a complete example of a Stack class.

```python 

class Stack:
    def __init__(self):
        self.items = []  # intern list
    
    def push(self, item):
        self.items.append(item)  # Add to "top"
    
    def pop(self):
        if self.is_empty():
            raise Exception("Stack vacío")
        return self.items.pop()  # Remove "top"
    
    def peek(self):
        if self.is_empty():
            raise Exception("Stack vacío")
        return self.items[-1]  # Look at the top without removing it
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)

```

## Use example

```python

stack = Stack()

# Push elements
stack.push(1)
stack.push(2)
stack.push(3)
print(stack.size())  # 3

# Peek (look top)
print(stack.peek())  # 3

# Pop (remove top)
print(stack.pop())   # 3
print(stack.pop())   # 2

print(stack.is_empty())  # False


```

## Print Stack

```python

def __str__(self):
    return str(self.items[::-1])  # Invest to show top first

print(stack)  # [1] after pops

```