---
id: security-resilience
title: Seguridad Arquitectónica y Resilience
sidebar_label: Security & Resilience
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

# Seguridad Arquitectónica y Resilience

<span className="badge-arch">Security & Operations</span>

La seguridad útil se diseña desde arquitectura: identidad, secretos, cifrado, segmentación y trazabilidad.

![Security layers](https://upload.wikimedia.org/wikipedia/commons/0/0f/Defense_in_depth.png)

## Controles esenciales

- Zero Trust para servicios internos (mTLS + policies).
- Secret management centralizado (rotación y auditoría).
- Principio de menor privilegio en IAM.
- Threat modeling por dominio crítico.

## Ejemplo de threat model (resumen)

```text
Activo: datos de pago
Amenaza: exfiltración vía endpoint vulnerable
Mitigaciones:
- WAF + schema validation
- tokenización de datos sensibles
- cifrado en tránsito y reposo
- alertas por patrones anómalos
```

## Qué revisar en cada release

- Dependencias con CVEs críticos.
- Rotación de llaves y certificados.
- Logs firmados y trazabilidad de acciones privilegiadas.

## Referencias

- OWASP ASVS
- NIST Cybersecurity Framework
