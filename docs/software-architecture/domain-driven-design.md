---
id: domain-driven-design
title: Domain-Driven Design (DDD)
sidebar_label: Domain-Driven Design
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

# Domain-Driven Design (DDD)

<span className="badge-arch">Modeling & Boundaries</span>

DDD ayuda a convertir complejidad del negocio en software mantenible, separando contextos y lenguaje.

![Domain model](https://upload.wikimedia.org/wikipedia/commons/3/3b/Entity-relationship-model-example.svg)

## Conceptos clave

- **Bounded Context**: frontera donde un modelo tiene significado consistente.
- **Ubiquitous Language**: términos compartidos entre negocio y tecnología.
- **Aggregates**: unidad de consistencia transaccional.
- **Context Mapping**: relación entre modelos de distintos equipos.

## Ejemplo práctico (e-commerce)

```text
Contextos:
- Catalog: productos, categorías, precios públicos
- Checkout: carrito, promociones, total
- Billing: facturas, impuestos, cobro

Regla: Checkout no escribe tablas de Billing directamente.
Integración: evento "OrderConfirmed" + contrato de API.
```

## Antipatrones frecuentes

- Un "Shared Kernel" gigante para todo el negocio.
- Entidades anémicas sin reglas de dominio.
- Microservicios por capa técnica, no por dominio.

## Referencias

- "Domain-Driven Design" — Eric Evans
- "Implementing Domain-Driven Design" — Vaughn Vernon
