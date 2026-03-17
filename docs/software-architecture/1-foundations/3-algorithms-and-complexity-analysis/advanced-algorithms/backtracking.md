---
title: Backtracking
sidebar_label: 4 - Backtracking
displayed_sidebar: softwareArchitectureSidebar
tags: [Advanced-Algorithms]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Advanced Algorithms</span>

# Backtracking

Backtracking is an algorithmic paradigm designed to exhaustively search for every possible combination in order to solve a computational problem. It is mathematically classified as an optimized, systematic version of **Brute Force Depth-First Search.**

In Backtracking, the algorithm builds candidate solutions piece by piece. However, the absolute second it dynamically evaluates that a partially-built solution *cannot possibly be compiled into a valid final answer*, it entirely abandons it (it **"backtracks"**) and skips testing any downstream branches, saving massive amounts of computational time compared to pure brute-force traversal.

---

## Interactive Visualizer: N-Queens (4x4)
The **N-Queens Puzzle** challenges us to place 4 Queens on a 4x4 board so that absolutely no two queens share the same row, column, or diagonal attacking corridor.

Click `Solve Puzzle` to watch Backtracking search dynamically trace a massive $O(N!)$ state space. Notice what happens when it hits a conflict (`Collision Detected`): It aggressively strips the offending piece off the board and brutally drops the path to backtrack to an earlier valid state.

<iframe
  src={useBaseUrl('/files/paradigm-backtracking.html')}
  title="Backtracking Algorithm Visualizer"
  style={{
    width: '100%',
    height: '610px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
    marginBottom: '20px'
  }}
/>

---

## When to use Backtracking?

You should heavily consider implementing Backtracking if a problem meets the following parameters:
- You need to generate **ALL** possible valid solutions (e.g., all permutations of a string, all subsets of a matrix).
- The solution relies heavily on sequential boundary constraints (such as physical game grids: Sudoku, Chess, Mazes).
- The answer space is heavily combinatorial, operating in realms of $O(2^N)$ or $O(N!)$.

> *Note: If you only need to find a single shortest path to a goal on a 2D grid, use `Breadth-First Search (BFS)`. It is staggeringly faster than Backtracking.*

---

## The Mechanical Implementation

A typical Backtracking algorithm is physically composed using recursive stacks, and operates strictly via these steps:
1. **Choose/Commit:** Make an explorative choice in the current state.
2. **Explore:** Call recursion traversing downward into the downstream state space.
3. **Un-choose (Backtrack):** Strip the explorative choice immediately upon returning up the call stack, restoring the exact previous state mathematically. Return false.

```python title="Backtracking Pseudocode Flow"
def solve_puzzle(state):
    # 1. Base Case: Victory detection
    if valid_goal_found(state):
        return True
    
    # 2. Iterate through all possible options dynamically
    for option in get_available_options(state):
        if is_valid(option, state):
            
            # CHOOSE: Place piece / add to set
            state.add(option)
            
            # EXPLORE: Recursively drill downward
            if solve_puzzle(state) == True:
                return True # We solved the whole board! bubble victory up
                
            # UN-CHOOSE (BACKTRACK): We hit a mathematical dead end.
            # Undo the state mutation and try the next loop option!
            state.remove(option)
            
    # Completely exhausted all options in this recursive frame
    return False 
```

### Avoiding Infinite Loops
Because Backtracking operates by blindly firing through thousands of state spaces dynamically, it is imperative to track which nodes have been `visited`—especially if you are attempting to trace routes across a mapped matrix layout. Failure to mark and revert `visited` states appropriately mathematically loops the algorithm into an endlessly spinning `StackOverflow` crash sequence.
