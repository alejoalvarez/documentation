---
title: Design and Normalization
sidebar_label: 2 - Design and Normalization
displayed_sidebar: softwareArchitectureSidebar
tags: [Relational-databases]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Relational Databases</span>

# Design and Normalization

- Entities and relationships
- Cardinality (1:1, 1:N, N:N)
- Normalization (1NF, 2NF, 3NF, BCNF)
- Denormalization (when appropriate)
- Primary, foreign, and unique keys
- Constraints (NOT NULL, UNIQUE, CHECK, DEFAULT)
- Entity-Relationship (ER) diagrams

**Recommended resources:**

- Book: “Database Design for Mere Mortals” by Michael J. Hernandez
- Tools: Lucidchart, dbdiagram.io
- Course: “Database Design” on Coursera


**Practical Examples:**

```text
Example 1: Library System
- Entities: Book, Author, User, Loan, Reservation
- Relationships: 
  - Author 1:N Book
  - User 1:N Loan
  - Book 1:N Loan
  - Book 1:N Reservation

Example 2: E-commerce System
- Entities: User, Product, Category, Order, Order_Line, Payment
- Relationships:
  - Product M:N Category (intermediate table)
  - User 1:N Order
  - Order 1:N Order_Line
  - Product 1:N Order_Line
```

**Real-world use case:**

- Design a database for a banking system
- Design a database for a social network
- Data migration: denormalize for performance if necessary

**Exercises:**

1. Normalize a denormalized table to 3NF
2. Create an ER diagram for a complex system
3. Determine when to denormalize for performance