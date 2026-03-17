---
title: API Design
sidebar_label: API Design
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# API Design Principles

A well-designed API is a contract between the system and its consumers. Like any contract, it must be clear, consistent, stable, and easy to understand. Good API design is one of the most high-leverage architectural investments — a great API enables integrations in hours; a poor one causes months of frustration.

---

## REST API Design Best Practices

### Resource-Oriented URLs
URLs represent **resources** (nouns), not actions (verbs). HTTP methods represent the action.

| Bad (Action-oriented) | Good (Resource-oriented) |
|-----------------------|--------------------------|
| `GET /getUser?id=42` | `GET /users/42` |
| `POST /createUser` | `POST /users` |
| `POST /deleteUser?id=42` | `DELETE /users/42` |

### Use Correct HTTP Methods
- `GET` → Read resource (idempotent, safe).
- `POST` → Create new resource.
- `PUT` → Fully replace/update a resource.
- `PATCH` → Partially update a resource.
- `DELETE` → Remove a resource.

### Use Correct HTTP Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| `200 OK` | Success | Successful GET, PUT, PATCH |
| `201 Created` | Resource created | Successful POST |
| `204 No Content` | Success, no body | Successful DELETE |
| `400 Bad Request` | Invalid input | Validation errors |
| `401 Unauthorized` | Not authenticated | Missing or invalid token |
| `403 Forbidden` | Not authorized | Valid token, insufficient permissions |
| `404 Not Found` | Resource doesn't exist | GET/DELETE on non-existent ID |
| `409 Conflict` | State conflict | Creating duplicate resource |
| `422 Unprocessable Entity` | Business rule violation | Semantic validation failure |
| `500 Internal Server Error` | Unexpected server error | Bugs, unhandled exceptions |

---

## Versioning

API contracts must change over time while maintaining backward compatibility for existing consumers.

**Strategies:**
1. **URL path versioning:** `/v1/users`, `/v2/users` (most common, most visible).
2. **Header versioning:** `API-Version: 2` header.
3. **Query parameter:** `/users?version=2`.

**Rule:** Never make **breaking changes** to an existing API version. Breaking change = removing a field, changing a field's type, changing a URL. Non-breaking = adding a new optional field.

---

## Pagination

Never return unbounded lists. Paginate all collection endpoints:

```json
// Cursor-based pagination (preferred for large datasets)
GET /users?cursor=eyJpZCI6MTAwfQ&limit=20

{
  "data": [...],
  "nextCursor": "eyJpZCI6MTIwfQ",
  "hasMore": true
}
```

---

## Error Response Format

Provide structured, actionable error responses:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request body is invalid.",
    "details": [
      { "field": "email", "message": "Must be a valid email address." },
      { "field": "age", "message": "Must be a positive integer." }
    ],
    "traceId": "abc-123-xyz"
  }
}
```
