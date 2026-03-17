---
title: Authorization
sidebar_label: Authorization
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Authorization

**Authorization** is the process of determining whether an **authenticated** identity (user, service, device) has the **permission** to perform a specific action on a specific resource. It answers the question: *"What are you allowed to do?"*

Authorization happens *after* successful authentication.

---

## Authorization Models

### 1. Role-Based Access Control (RBAC)
Permissions are assigned to **roles**, and users are assigned to roles.

```
User "alice"  → Role "EDITOR"  → Permissions: [articles:read, articles:write]
User "bob"    → Role "VIEWER"  → Permissions: [articles:read]
```

**Pros:** Simple to understand and manage in small-to-medium organizations.
**Cons:** "Role explosion" — in complex systems you end up with hundreds of micro-roles.

### 2. Attribute-Based Access Control (ABAC)
Authorization decisions are based on attributes of the **user**, the **resource**, the **environment**, and the **action**.

*Example:* Allow access if `user.department == resource.department AND user.clearanceLevel >= resource.sensitivityLevel AND environment.time is between 9am-5pm`.

**Pros:** Extremely flexible; can model very complex, context-aware policies.
**Cons:** Complex to design, debug, and audit.

### 3. Policy-Based Access Control
Policies are written as explicit rules (often in code or a policy language like **OPA Rego**) and evaluated centrally.

```rego
# OPA Policy (Rego) — Allow access if user is the owner of the resource
allow {
    input.user.id == input.resource.ownerId
    input.action == "delete"
}
```

---

## Authorization as a Centralized Service

In microservices, implementing authorization logic independently in every service leads to inconsistency and is a maintenance nightmare. Better approaches:

1. **API Gateway Authorization:** Enforce coarse-grained policies (is the user authenticated? Do they have the right role?) at the gateway before requests reach services.
2. **Centralized Policy Engine:** Use **Open Policy Agent (OPA)** or **AWS IAM** as a sidecar or centralized service that all microservices query for authorization decisions.

---

## The Principle of Least Privilege Applied to Authorization
Every user and service should only be granted the minimum permissions necessary:
- An HR system should not be able to read financial records.
- A read-only reporting API key should not be able to delete data.
- A developer's staging credentials should not have access to production systems.

---

## Ownership-Based Authorization (Common Pattern)

Many resources (documents, orders, profiles) are owned by a specific user. A common authorization check:

```java
public void deleteOrder(String orderId, String currentUserId) {
    Order order = orderRepository.findById(orderId);
    
    // Check 1: Resource exists
    if (order == null) throw new NotFoundException();
    
    // Check 2: User owns the resource, OR is an admin
    if (!order.getOwnerId().equals(currentUserId) && !currentUser.hasRole("ADMIN")) {
        throw new ForbiddenException();
    }
    
    orderRepository.delete(orderId);
}
```
