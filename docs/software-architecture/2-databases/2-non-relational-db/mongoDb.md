---
title: Mongo DB
sidebar_label: 1 - MongoDB
displayed_sidebar: softwareArchitectureSidebar
tags: [Non-relational-databases]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Non-relational Databases</span>

# MongoDB

- BSON structure
- Collections and Documents
- CRUD operations
- Basic and advanced queries
- Indexing in MongoDB
- Aggregation Pipeline
- Schema validation

**Recommended resources:**

- MongoDB documentation
- Book: “MongoDB in Action” by Kyle Banker

Practical examples:

```bash
Example 1: E-commerce Database
- Collections: users, products, orders, order_items
- Documents: 
  - users: { _id, name, email, address }
  - products: { _id, name, price, category }
  - orders: { _id, user_id, order_date, total }
  - order_items: { _id, order_id, product_id, quantity }

Example 2: Blog Database
- Collections: users, posts, comments
- Documents:
  - users: { _id, username, email, bio }
  - posts: { _id, user_id, title, content, created_at }
  - comments: { _id, post_id, user_id, content, created_at }
```

```typescript
// Insert
db.users.insertOne({
  _id: ObjectId(),
  name: "Juan",
  email: "juan@example.com",
  orders: [
    { id: 1, total: 100, date: new Date() },
    { id: 2, total: 150, date: new Date() }
  ]
});

// Find
db.users.find({ email: "juan@example.com" });

// Aggregation Pipeline
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$user_id", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
]);
```

**Real-world use cases:**

- Storing flexible user data
- Blog system with nested comments
- Mobile app with hierarchical data

**Exercises:**

1. Design collections for an e-commerce site
2. Write an aggregation pipeline for analytics
3. Compare indexes in MongoDB vs. SQL