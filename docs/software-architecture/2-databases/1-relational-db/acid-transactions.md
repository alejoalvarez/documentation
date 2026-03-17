---
title: ACID Transactions
sidebar_label: 4 - ACID Transactions
displayed_sidebar: softwareArchitectureSidebar
tags: [Relational-databases]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Relational Databases</span>

# ACID Transactions

- ACID (Atomicity, Consistency, Isolation, Durability)
- Transaction isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable)
- Locking mechanisms
- Deadlocks
- Concurrency control
- Write-Ahead Logging (WAL)
- Race conditions and deadlocks
- Optimistic vs. pessimistic locking
- Savepoints
- Row-level locks, table-level locks

**Recommended resources:**

- PostgreSQL transactions documentation
- Book: “Designing Data-Intensive Applications,” Chapter 7

**Real-world use case:**

- Transferring money between accounts
- Updating inventory
- Processing payments

**Exercises:**

1. Simulate a race condition and resolve it using a transaction
2. Explain deadlocks and how to avoid them
3. Implement optimistic locking