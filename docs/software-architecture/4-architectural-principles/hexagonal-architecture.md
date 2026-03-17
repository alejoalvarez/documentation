---
title: Hexagonal Architecture
sidebar_label: Hexagonal Architecture
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Hexagonal Architecture (Ports and Adapters)

**Hexagonal Architecture**, also known as the **Ports and Adapters** pattern, was introduced by Alistair Cockburn in 2005. The core goal is to allow an application to be driven equally by users, programs, automated tests, or batch scripts, and to be developed and tested in isolation from its eventual run-time devices and databases.

> *"Allow an application to equally be driven by users, programs, automated test or batch scripts, and to be developed and tested in isolation from its eventual run-time devices and databases."* — Alistair Cockburn

---

## The Key Problem It Solves

Traditional layered architectures can become rigid because they allow the UI layer to directly call the data layer, and the business logic layer often gets "polluted" by infrastructure concerns (e.g., SQL queries, HTTP parsing logic, email SDK configurations). The business logic becomes inseparable from its delivery mechanisms.

Hexagonal Architecture draws a hard boundary around the **Application Core** (your business logic), protecting it from the outside world.

---

## The Architecture

Imagine a hexagon in the center. This is the **Application Core**, which contains your domain model, use cases, and business rules. Everything outside this hexagon is an external actor.

### Ports
A **Port** is an **interface** (a contract) defined *by the application core* itself. It describes how the application wants to interact with the outside world, without knowing anything about the outside world's implementation details.

There are two types:
- **Driving Ports (Primary):** Interfaces that *are called by* the outside world to drive the application. *Example:* `ICreateOrderUseCase.execute(dto)`.
- **Driven Ports (Secondary):** Interfaces that *the application calls* to reach external resources like databases. *Example:* `IOrderRepository.save(order)`.

### Adapters
An **Adapter** is a concrete implementation that translates between an external technology and a Port.

There are two types:
- **Driving Adapters (Primary):** Incoming adapters that call the Driving Ports. *Examples:* REST Controller, CLI command, GraphQL Resolver, Message Consumer.
- **Driven Adapters (Secondary):** Outgoing adapters that implement the Driven Ports. *Examples:* JPA/Hibernate Repository, Email SMTP Sender, Redis Cache Client.

---

## Example architecture

```text
┌─────────────────────────────────┐
│   Application/UI/Web            │  <- Outgoing Adapters
├─────────────────────────────────┤
│                                 │
│   Ports (Interfaces)          │
│                                 │
│   ┌─────────────────────────┐   │
│   │  Business Logic         │   │  <- Core (independent of frameworks)
│   │  (Use Cases, Services)  │   │
│   └─────────────────────────┘   │
│                                 │
│   Ports (Interfaces)          │
│                                 │
├─────────────────────────────────┤
│   Database, APIs, etc           │  <- Incoming Adapters
└─────────────────────────────────┘
```

## Example folder Structure

```
my-app/
├── application/               (Application Core - NO framework imports)
│   ├── domain/                (Entities, Value Objects, Aggregates)
│   │   └── Order.java
│   ├── ports/
│   │   ├── in/                (Driving Ports / Use Case Interfaces)
│   │   │   └── ICreateOrderUseCase.java
│   │   └── out/               (Driven Ports / Repository Interfaces)
│   │       └── IOrderRepository.java
│   └── services/              (Use Case Implementations)
│       └── CreateOrderService.java
│
├── adapters/                  (Infrastructure - Framework imports are allowed here)
│   ├── in/
│   │   └── rest/              (Driving Adapter: REST Controller)
│   │       └── OrderController.java
│   └── out/
│       └── persistence/       (Driven Adapter: JPA Repository)
│           └── JpaOrderRepository.java
```

---

## Example code

```java
// Interface: What our business logic needs
public interface UserRepository {
  void save(User user);
  Optional<User> findById(UserId id);
}

public interface EmailService {
  void sendWelcomeEmail(User user);
}

// Business Logic (framework-independent)
public class RegisterUserUseCase {
  private UserRepository userRepository;
  private EmailService emailService;
  
  public void execute(RegisterUserCommand command) {
    User user = new User(command.getName(), command.getEmail());
    userRepository.save(user);
    emailService.sendWelcomeEmail(user);
  }
}

// Input adapter: REST API
@RestController
@RequestMapping("/users")
public class RegisterUserController {
  private RegisterUserUseCase useCase;
  
  @PostMapping
  public ResponseEntity<Void> register(@RequestBody RegisterUserRequest req) {
    useCase.execute(new RegisterUserCommand(req.getName(), req.getEmail()));
    return ResponseEntity.created(null).build();
  }
}

// Output adapter: Database
@Repository
public class JpaUserRepository implements UserRepository {
  private UserJpaRepository jpaRepository;
  
  @Override
  public void save(User user) {
    UserEntity entity = new UserEntity(user.getId(), user.getName());
    jpaRepository.save(entity);
  }
}

// Output adapter: Email
@Service
public class SmtpEmailService implements EmailService {
  private JavaMailSender mailSender;
  
  @Override
  public void sendWelcomeEmail(User user) {
    // send email via SMTP
  }
}
```

## Real Use Cases & Benefits

1. **Independent Testability:** Your entire business logic (`CreateOrderService`) can be tested with a simple in-memory repository mock—no Spring Boot context, no Dockerized database needed. Tests run in milliseconds.
2. **Technology Swap:** Want to migrate from REST to GraphQL? Just add a new `GraphQLOrderAdapter` that calls the same `ICreateOrderUseCase` port. The business logic is completely untouched.
3. **Database Migration:** Want to move from Hibernate to jOOQ? Replace the `JpaOrderRepository` with a `JooqOrderRepository`. Zero impact on business logic.


