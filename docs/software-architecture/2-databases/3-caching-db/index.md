---
id: index
title: Non-relational Databases
sidebar_label: Non-relational Databases
displayed_sidebar: softwareArchitectureSidebar
---

# Non-relational Databases

- [Redis](./redis.md)
- [Memcached](./memcached.md)
- [DragonflyDB](./dragonflyDb.md)

# Caching DB

- Key-value pairs
- CRUD operations
- Data structures (strings, lists, sets, sorted sets, hashes)
- Transactions
- Pub/Sub
- Clustering
- Sharding
- Persistence (RDB, AOF)
- Security


**Recommended resources:**

- Redis documentation
- Book: “Redis in Action” by Salvatore Sanfilippo

**Real-world use cases:**

- User session cache
- Leaderboards in games
- Rate limiting
- Pub/Sub for real-time chat

**Exercises:**

1. Implement a caching pattern using Redis
2. Create a leaderboard using Sorted Sets
3. Implement Pub/Sub for notifications
4. Design a caching system for an e-commerce site
5. Implement a leaderboard system
6. Build a Pub/Sub system for real-time notifications

**Practical examples:**

```bash
Example 1: Caching System
- Key: user:123
- Value: { name: "John", email: "john@example.com" }

Example 2: Leaderboard System
- Key: leaderboard:global
- Value: { "user1": 100, "user2": 200, "user3": 300 }

Example 3: Pub/Sub System
- Key: chat:room1
- Value: { message: "Hello, world!" }
```

**Code examples:**

```python
import redis

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)

# Set a key-value pair
r.set('name', 'John')

# Get a key-value pair
name = r.get('name')
print(name)  # Output: b'John'

# Delete a key-value pair
r.delete('name')
```