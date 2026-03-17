---
title: Encryption
sidebar_label: Encryption
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Encryption

**Encryption** is the process of converting readable data (plaintext) into an unreadable format (ciphertext) using a cryptographic algorithm and a key, so that only authorized parties with the correct key can decode it. It is the foundational security control for protecting data confidentiality.

---

## The Two Fundamental States to Encrypt

### 1. Encryption in Transit (Data in Motion)
Protects data as it moves across a network between two endpoints (e.g., a browser and a server, or two microservices).

- **Standard Protocol:** **TLS (Transport Layer Security)** — the protocol behind HTTPS.
- **Architect's Responsibility:** Enforce HTTPS on all external endpoints. Use mutual TLS (mTLS) for service-to-service communication inside a cluster. Never allow HTTP fallback in production.

### 2. Encryption at Rest (Data Stored)
Protects data stored on disk — in databases, file systems, S3 buckets, and backups.

- **Common Approaches:** Database-level encryption (e.g., AWS RDS encryption), file system encryption (EBS encryption), application-level field encryption for PII.
- **Architect's Responsibility:** Enable encryption at rest on all persistent storage. For highly sensitive fields (passwords, SSNs, credit card numbers), apply application-level encryption even before data reaches the database.

---

## Symmetric vs. Asymmetric Encryption

| Type | How it works | Performance | Key Use Cases |
|------|-------------|-------------|---------------|
| **Symmetric** | Same key encrypts and decrypts | Fast / efficient | Encrypting large volumes of data at rest (AES-256) |
| **Asymmetric** | Public key encrypts, private key decrypts | Slower | TLS handshake, digital signatures, key exchange |

In practice, TLS uses **asymmetric encryption** (RSA or ECDH) to securely exchange a **symmetric session key** (AES), then uses that fast symmetric key for the rest of the communication. Best of both worlds.

---

## Hashing vs. Encryption (Critical Distinction)

Passwords should **NEVER** be encrypted — they should be **hashed**.

| Property | Encryption | Hashing |
|----------|-----------|---------|
| Reversible? | Yes (with the key) | No (one-way) |
| Used for | Protecting data you need to read back | Storing passwords |
| Attack vector | Key theft | Rainbow table attacks |
| Password standard | Never | `bcrypt`, `Argon2`, `scrypt` with salt |

---

## Key Management

Encryption is only as strong as the security of its keys. A perfectly encrypted database is useless if the key is stored in the same repository as the code.

**Best Practices:**
- Use a dedicated **Key Management Service (KMS)**: AWS KMS, HashiCorp Vault, Azure Key Vault.
- Rotate encryption keys on a defined schedule.
- Separate keys by environment (production keys must never be accessible from dev/staging).
- Use envelope encryption: encrypt data with a Data Encryption Key (DEK), then encrypt the DEK with a Key Encryption Key (KEK) managed by the KMS.
