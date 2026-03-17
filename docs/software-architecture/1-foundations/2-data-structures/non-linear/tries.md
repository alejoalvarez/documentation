---
title: Tries
sidebar_label: 6 - Tree - Tries
displayed_sidebar: softwareArchitectureSidebar
tags: [Non-Linear-data-structures]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Non-Linear Data Structures</span>

# Tries

A Trie (prefix tree) is a tree-like data structure that stores a dynamic set of strings efficiently, optimized for prefix-based operations like autocomplete, spell-checking, and IP routing. Each node represents one character, and paths from root to leaf spell complete words.

Core Properties
Root node: Empty (start of all strings)

Edges: Labeled with single characters (26 for lowercase letters)

End-of-word flag: Marks complete words (not just prefixes)

Prefix sharing: Common prefixes share nodes (space-efficient)

## Interactive visual - B Trees

<iframe
  src={useBaseUrl('/files/1-non-linear-tries.html')}
  title="Triesnpm  Visual"
  style={{
    width: '100%',
    height: '900px',
    border: 'none',
    borderRadius: '12px',
    background: '#030507',
  }}
/>

## Real-World Uses
- Google search autocomplete
- Mobile keyboards (T9 predictive text)
- DNS routing (IP prefix matching)
- Compiler symbol tables