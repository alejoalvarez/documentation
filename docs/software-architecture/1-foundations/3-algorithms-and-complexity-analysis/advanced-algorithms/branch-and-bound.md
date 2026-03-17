---
title: Branch and Bound
sidebar_label: 5 - Branch and Bound
displayed_sidebar: softwareArchitectureSidebar
tags: [Advanced-Algorithms]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Advanced Algorithms</span>

# Branch and Bound

**Branch and Bound (B&B)** is an algorithmic engine specifically designed to solve **Optimization Problems** mathematically (such as minimizing the highest cost or maximizing the absolute highest profit).

At first glance, it looks heavily related to Backtracking because it exhaustively explores state spaces. However, unlike Backtracking which blindly iterates through *every possible path* until it crashes into a literal boundary violation—Branch and Bound actively evaluates the numerical **Bounds/Cost** of a path. If the engine mathematically deduces that the current path cannot possibly yield a *better numerical score* than a solution it already discovered earlier, it aggressively severs (prunes) the branch and immediately saves vast processing time.

---

## Interactive Visualizer: Search Space Pruning
Watch how Branch and Bound operates on a state tree. It constantly maintains a `Global Upper Bound (Best Found)`. 

Whenever the engine touches a node (e.g. `Node B`) and determines that the node's baseline mathematical `Bound` (`14`) is physically worse than the `Best Found` so far (`12`), it **prunes** the node entirely—discarding it and all of its unseen children under the absolute mathematical certainty that they will never yield an optimal score.

<iframe
  src={useBaseUrl('/files/paradigm-branch-bound.html')}
  title="Branch and Bound Algorithm Visualizer"
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

## When to use Branch and Bound?

You construct a Branch and Bound algorithm almost entirely for combinatorial optimization targets:
- **The Traveling Salesman Problem (TSP):** Finding the mathematically shortest routing across N cities.
- **The 0/1 Knapsack Problem:** Finding the absolute highest value of fractional weights.
- **Job Assignment Problem:** Assigning N jobs to N workers to minimize structural computational cost.

---

## The Core Mechanisms

Branch and Bound functions natively via two core pillars:

### 1. Branching (State Space Division)
Taking the overarching large problem and fractionally slicing the decision tree into several smaller states (e.g. Knapsack: "Do I include this item? YES branch / NO branch").

### 2. Bounding (The Estimator)
This is the heart of B&B. At every single state node, the machine calculates a mathematical **Upper Bound** or **Lower Bound** estimation of what the lowest cost down this path *could possibly* be. 

If this optimistic estimate is physically worse than a complete solution path you already recorded previously, the entire branch is mathematically proven to be useless and physically eradicated (Pruning).

---

## Backtracking vs Branch and Bound

While visually similar, they serve entirely different goals:

| Metric | Backtracking | Branch and Bound |
|---|---|---|
| **Goal Focus** | Generates *every possible valid* completion path. | Searches for the singular *mathematically supreme/optimal* path. |
| **Pruning Mechanic** | Prunes strictly when a physics logic constraint is violated (e.g., placing a queen illegally). | Prunes when numerical value trajectory falls behind the global high-score. |
| **Problem Type** | Decision Problems / Constraint mapping. | Heavy Optimization logic. |

---

## Algorithm Drawbacks

- Branch and Bound relies intimately on the **quality of the Bounding Function**. If your numerical estimator logic is weak and loosely calculated, it won't sever branches effectively, and your algorithm silently degenerates back into an $O(N!)$ or $O(2^N)$ Brute Force catastrophe.
- Extremely complicated to map heuristically. Usually requires implementing dynamic Priority Queues to strictly route the CPU to explore the branch holding the most optimal theoretical Bound value first.
