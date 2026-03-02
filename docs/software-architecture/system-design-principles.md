---
id: system-design-principles
title: Principios de System Design
sidebar_label: System Design Principles
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

# Principios de System Design

<span className="badge-arch">Foundations</span>

El diseño arquitectónico empieza con atributos de calidad: **disponibilidad, latencia, escalabilidad, seguridad, mantenibilidad y costo**.

![Diagrama de disponibilidad](https://upload.wikimedia.org/wikipedia/commons/9/9a/Three-tier_architecture.svg)

## Marco práctico de decisiones

Usa este orden para tomar decisiones:

1. Define SLOs: p95 latencia, disponibilidad, error budget.
2. Identifica cuellos de botella: CPU, IO, red, base de datos.
3. Propón opciones y trade-offs.
4. Documenta en ADR con impacto esperado.

## Ejemplo rápido

```text
Problema: Checkout lento en hora pico
Opción A: Escalar vertical DB
Opción B: Cache + cola asíncrona + read replicas
Decisión: B (mejor costo/escala; más complejidad operacional)
Métrica objetivo: p95 < 400ms
```

## Checklist mínimo

- ¿Qué pasa si el servicio downstream falla?
- ¿Cuál es la estrategia de degradación?
- ¿Cómo se observa el sistema en tiempo real?
- ¿Cuál es el plan de rollback?

## Referencias

- "Designing Data-Intensive Applications" — Martin Kleppmann
- "The Art of Scalability" — Abbott/Fisher
