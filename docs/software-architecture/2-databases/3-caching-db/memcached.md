---
title: Memcache DB
sidebar_label: 2 - Memcache DB
displayed_sidebar: softwareArchitectureSidebar
tags: [caching-db]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Caching DB</span>

# Memcache DB

- In-memory key-value store
- Simple API
- High performance
- Distributed caching
- Memory management
- Security

**Recommended resources:**

- Memcached documentation
- Book: “Memcached: A Guide to Memcached for Developers and System Administrators” by Bryan L. Cantrill

**Real-world use cases:**

- User session cache
- Database query cache
- Page fragment caching
- API response caching

**Exercises:**

1. Implement a caching pattern using Memcached
2. Design a caching system for an e-commerce site
3. Implement a distributed caching system
4. Build a caching system for an API

**Practical examples:**

```bash
Example 1: Caching System
- Key: user:123
- Value: { name: "John", email: "john@example.com" }

Example 2: Database Query Cache
- Key: products:category:electronics
- Value: [ { id: 1, name: "Laptop" }, { id: 2, name: "Phone" } ]

Example 3: Page Fragment Cache
- Key: homepage:header
- Value: "<div><h1>Welcome to our website</h1></div>"
```

```python
import memcache

# Connect to Memcached
mc = memcache.Client(['127.0.0.1:11211'], debug=0)

# Set a key-value pair
mc.set('name', 'John')

# Get a key-value pair
name = mc.get('name')
print(name)  # Output: John

# Delete a key-value pair
mc.delete('name')
```
