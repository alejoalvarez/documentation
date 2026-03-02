---
id: architectural-patterns
title: Patrones Arquitectónicos
sidebar_label: Architectural Patterns
displayed_sidebar: softwareArchitectureSidebar
tags: [software-architecture]
---

# Patrones Arquitectónicos

<span className="badge-arch">Foundations</span>

Elegir patrón no es una preferencia estética: define acoplamiento, velocidad de entrega y costos operativos.

![Patrones de arquitectura](https://upload.wikimedia.org/wikipedia/commons/6/61/Microservices.png)

## Cuándo usar cada patrón

| Patrón | Útil cuando | Riesgo principal |
|---|---|---|
| Monolito modular | Equipo pequeño/mediano, dominio estable | Convertirse en "big ball of mud" |
| Microservicios | Dominios bien separados, equipos autónomos | Complejidad operativa y de observabilidad |
| Event-driven | Procesos desacoplados y asincronía | Consistencia eventual mal gestionada |
| Hexagonal | Necesidad de aislar dominio del framework | Sobreingeniería temprana |

## Ejemplo de elección

```text
Contexto: SaaS B2B, 8 engineers, una sola base de datos, releases semanales
Decisión: Monolito modular + eventos internos
Razón: Maximiza velocidad sin pagar costo operativo de microservicios
Evolución: Extraer servicios solo donde exista cuello de botella organizacional o técnico
```

## Señales de que debes cambiar

- Un deploy rompe áreas no relacionadas.
- El tiempo de build/release crece de forma sostenida.
- Un equipo bloquea a otros equipos por dependencias.

## Referencias

- "Fundamentals of Software Architecture" — Richards/Ford
- "Clean Architecture" — Robert C. Martin
