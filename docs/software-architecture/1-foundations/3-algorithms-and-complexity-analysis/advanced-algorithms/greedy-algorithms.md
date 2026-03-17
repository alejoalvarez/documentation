---
title: Greedy Algorithms
sidebar_label: 3 - Greedy Algorithms
displayed_sidebar: softwareArchitectureSidebar
tags: [Advanced-Algorithms]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Advanced Algorithms</span>

# Greedy Algorithms

A **Greedy Algorithm** is an approach that repeatedly makes the locally optimal, immediately obvious choice at each specific stage—with the hope that these localized "quick wins" will somehow miraculously lead to a globally optimal final goal.

In plain English: *It never looks back. It never re-evaluates. It simply grabs the biggest piece of cake in front of it right now.*

---

## Interactive Visualizer: Coin Change

The standard US Coin Change problem (`[25, 10, 5, 1]`) is flawlessly solved using a Greedy approach. The algorithm strictly grabs the largest chunk it possibly can `(25)` without overshooting the target, and then blindly repeats the process until the target is hit.

<iframe
  src={useBaseUrl('/files/paradigm-greedy.html')}
  title="Greedy Algorithm Visualizer"
  style={{
    width: '100%',
    height: '670px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
    marginBottom: '20px'
  }}
/>

---

## When to use Greedy?

To successfully use a Greedy layout without failure, the problem must possess the **Greedy Choice Property**. This means a global (overall) optimal solution can absolutely be reached perfectly by just choosing the local (smallest) optimal choices at each step.

### Famous Greedy Implementations
1. **Dijkstra's Algorithm:** Finding the shortest path on a map. At every intersection, the machine blindly turns down the shortest immediate connecting road leading toward the destination.
2. **Kruskal / Prim’s Algorithms:** Generating a Minimum Spanning Tree across network points.
3. **Huffman Coding:** Heavily used in file compression (ZIP files) to greedily assign the shortest binary codes to the most frequently used characters.
4. **Fractional Knapsack problem:** A robber filling a bag dynamically by selecting the purest highest-value-per-weight items first.

---

## The Danger of Greedy (Why DP Exists)

Greedy Algorithms are extraordinarily fast ($O(N)$ or $O(N \log N)$) and use practically zero memory caching constraint. However, **they are incredibly dangerous.** If the dataset doesn't strictly adhere to the Greedy-Choice Property, a Greedy algorithm will return a mathematically incorrect failure.

### The Coin Change Failure
Imagine you use a strange system of currencies: `Coins = [4, 3, 1]`. 
You need to return **6 cents.**

- **The Greedy Engine:** Looks around locally. It sees a massive `4` and greedily grabs it. Now it needs `2`. It looks for a `3`, too big. It grabs a `1` and another `1`. Total coins returned: **3 coins `[4, 1, 1]`**.
- **The Correct Answer:** The absolute best answer was **2 coins `[3, 3]`**.

The Greedy Engine completely failed the mission because making the mathematically local "best choice" (grabbing a `4`) instantly sabotaged the future global path to a `[3, 3]` victory. 

*(This is precisely why we learned **Dynamic Programming (DP)** natively; DP checks all overlapping branching paths to guarantee it never misses the optimal routing).*

---

## Summary

- **Design Protocol:** Grab the localized smartest-looking step imaginable -> Do it -> Repeat until finished.
- **Speed:** Staggeringly fast, usually bound merely by sorting execution ($O(N \log N)$).
- **Caveat:** Highly susceptible to tunnel-vision failure if path-branching complexities exist.
