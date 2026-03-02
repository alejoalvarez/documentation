---
id: data-consistency
title: Arquitectura de Datos y Consistencia
sidebar_label: Data Consistency
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

# Arquitectura de Datos y Consistencia

<span className="badge-arch">Data & Scale</span>

La escalabilidad real depende de cómo modelas datos y consistencia, no solo del número de réplicas.

![Replicación de datos](https://upload.wikimedia.org/wikipedia/commons/8/8f/Master-slave-database.svg)

## Decisiones clave

- **SQL vs NoSQL** según patrón de acceso, no por moda.
- **Strong vs Eventual consistency** según impacto de negocio.
- **CQRS** cuando lectura y escritura tienen necesidades muy distintas.
- **Outbox Pattern** para publicar eventos sin perder consistencia.

## Ejemplo de Outbox

```text
Transacción única:
1) INSERT order
2) INSERT outbox_event(order_created)

Worker asíncrono:
3) Lee outbox
4) Publica evento a broker
5) Marca evento como enviado
```

## Errores comunes

- Reintentos sin idempotencia.
- Eventos sin versionado de schema.
- Consultas cross-context acopladas a tablas ajenas.

## Referencias

- "Designing Data-Intensive Applications" — Martin Kleppmann
- "Building Microservices" — Sam Newman
