---
title: Graph Topological Sort
sidebar_label: Graph - Topological Sort
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Graph Topological Sort

Topological sort orders vertices in a Directed Acyclic Graph (DAG) so for every edge (u→v), u comes before v in the ordering. Linearizes dependencies: task scheduling, build systems, course prerequisites. O(V+E) time.

## Interactive visual - Topological Sort

<iframe
  src={useBaseUrl('/files/1-non-linear-graph-topological-sort.html')}
  title="Graph Topological Sort Visual"
  style={{
    width: '100%',
    height: '650px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## Real-World Applications


- 🔨 **Build systems**: make/gcc (file deps)
- 📚 **Course scheduling**: Prerequisites
- 💻 **Task scheduling**: Job queues
- 🔍 **Dependency resolution**: npm/pip
- 📊 **Data pipelines**: ETL ordering