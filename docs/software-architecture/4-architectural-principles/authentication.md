---
title: Authentication
sidebar_label: Authentication
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Authentication

**Authentication** is the process of verifying the **identity** of a user, service, or device that is attempting to access the system. It answers the question: *"Who are you?"*

This is distinct from **Authorization**, which asks: *"What are you allowed to do?"*

---

## Authentication Factors

Authentication can use one or more of the following factors to verify identity:

| Factor | Type | Examples |
|--------|------|---------|
| **Something you know** | Knowledge | Password, PIN, security question |
| **Something you have** | Possession | Mobile phone (OTP), hardware key (YubiKey) |
| **Something you are** | Inherence | Fingerprint, face recognition |

**Multi-Factor Authentication (MFA)** requires at least two different factor types. Even if a password is stolen, an attacker without the user's phone cannot authenticate.

---

## Session-Based vs. Token-Based Authentication

### Session-Based (Stateful)
1. User logs in with credentials.
2. Server creates a session, stores session data in memory/DB, and returns a session ID cookie.
3. On each subsequent request, the browser sends the cookie. Server looks up the session.

**Drawbacks:** State is stored server-side. Doesn't scale horizontally without a shared session store (e.g., Redis). Doesn't work well for mobile/API clients.

### Token-Based (Stateless) — JWT
1. User logs in with credentials.
2. Server validates credentials and returns a signed **JSON Web Token (JWT)**.
3. Client stores the JWT (in memory or a secure cookie). Sends it in the `Authorization: Bearer <token>` header on every request.
4. Server validates the JWT's cryptographic signature — no database lookup needed.

**Benefits:** Stateless, scales horizontally, works great for APIs and microservices.

```
JWT Structure:
eyJhbGciOiJSUzI1NiJ9    <-- Header (algorithm)
.eyJ1c2VySWQiOiI0MiJ9   <-- Payload (claims: userId, roles, expiry)
.SflKxwRJSMeKKF2QT4f... <-- Signature (verifies token hasn't been tampered with)
```

---

## OAuth 2.0 and OpenID Connect (OIDC)

For third-party logins ("Login with Google/GitHub"), use the **OAuth 2.0** framework with **OpenID Connect (OIDC)** as the identity layer on top.

The flow (Authorization Code Grant) in brief:
1. User clicks "Login with Google."
2. App redirects to Google's authorization server.
3. User authenticates with Google and grants consent.
4. Google redirects back with an authorization code.
5. App exchanges the code for tokens (access token + ID token).
6. App reads the ID token (OIDC) to get the user's identity (email, name).

---

## Password Best Practices

Never store plain text or encrypted passwords. Always store a **salted, one-way hash**:
- **Recommended algorithms:** `bcrypt`, `Argon2id`, `scrypt`.
- **Never use:** MD5, SHA-1, SHA-256 (without proper salting/stretching) — these are too fast and vulnerable to brute force.
