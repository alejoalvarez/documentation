---
title: SOLID
sidebar_label: SOLID
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# SOLID Principles

The **SOLID** acronym represents five core design principles intended to make software designs more understandable, flexible, and maintainable. Introduced by Robert C. Martin (Uncle Bob), these principles are the foundational pillars of Object-Oriented Design (OOD).

---

## 1. Single Responsibility Principle (SRP)
**"A class should have one, and only one, reason to change."**

This implies that a class or module should only have a single responsibility. If a class takes on too many responsibilities, they become coupled. A change to one responsibility might impair or inhibit the class's ability to meet the others.

- **Bad Design:** A `User` class that handles database connections, data validation, and sending welcome emails.
- **Good Design:** Three separate classes: `UserRepository` (database), `UserValidator` (validation), and `EmailService` (emails).



<details>
<summary>❌ Bad Example — SRP Violation</summary>

```javan
// BAD: One class handles persistence, validation, AND email logic
public class UserService {

    public void registerUser(String name, String email) {
        // Validation logic
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }

        // Database logic — direct SQL
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/db");
        PreparedStatement stmt = conn.prepareStatement(
            "INSERT INTO users (name, email) VALUES (?, ?)");
        stmt.setString(1, name);
        stmt.setString(2, email);
        stmt.executeUpdate();

        // Email notification logic
        Properties props = new Properties();
        Session session = Session.getDefaultInstance(props);
        MimeMessage message = new MimeMessage(session);
        message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
        message.setSubject("Welcome!");
        Transport.send(message);
    }
}
// This class has 3 reasons to change: business validation rules, DB schema, email template
```

</details>

<details>
<summary>✅ Good Example — SRP Applied</summary>

```java
// GOOD: Each class has a single, well-defined responsibility

public class UserValidator {
    public void validate(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
    }
}

public class UserRepository {
    public void save(String name, String email) {
        // Only DB persistence logic lives here
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/db");
        PreparedStatement stmt = conn.prepareStatement(
            "INSERT INTO users (name, email) VALUES (?, ?)");
        stmt.setString(1, name);
        stmt.setString(2, email);
        stmt.executeUpdate();
    }
}

public class EmailService {
    public void sendWelcome(String email) {
        // Only email logic lives here
        System.out.println("Sending welcome email to: " + email);
    }
}

// Orchestrator — stays thin, delegates to specialists
public class UserRegistrationService {
    private final UserValidator validator;
    private final UserRepository repository;
    private final EmailService emailService;

    public UserRegistrationService(UserValidator validator,
                                   UserRepository repository,
                                   EmailService emailService) {
        this.validator = validator;
        this.repository = repository;
        this.emailService = emailService;
    }

    public void register(String name, String email) {
        validator.validate(email);
        repository.save(name, email);
        emailService.sendWelcome(email);
    }
}
```

</details>

---

## 2. Open-Closed Principle (OCP)
**"Software entities should be open for extension, but closed for modification."**

You should be able to add new functionality without changing existing code. This relies heavily on interfaces, abstract classes, and polymorphism.

- **Bad Design:** A `DiscountCalculator` class with a massive `switch` statement for different customer types (`VIP`, `Regular`, `Employee`). Adding a new type requires modifying the existing class.
- **Good Design:** A `DiscountStrategy` interface. Create `VipDiscount`, `RegularDiscount`, and `EmployeeDiscount` classes that implement this interface. Expanding means adding a new class, not touching existing ones!

<details>
<summary>❌ Bad Example — OCP Violation</summary>

```java
// BAD: Every time a new customer type is added, this existing class must be modified
public class DiscountCalculator {

    public double calculate(String customerType, double price) {
        if (customerType.equals("REGULAR")) {
            return price * 0.05;
        } else if (customerType.equals("VIP")) {
            return price * 0.15;
        } else if (customerType.equals("EMPLOYEE")) {
            return price * 0.30;
        }
        // Adding "PARTNER" type requires modifying this method ❌
        return 0;
    }
}
```

</details>

<details>
<summary>✅ Good Example — OCP Applied</summary>

```java
// GOOD: The interface is the stable contract — the class is closed for modification
public interface DiscountStrategy {
    double calculate(double price);
}

// Each type is an extension — adding a new one never touches existing code ✅
public class RegularDiscount implements DiscountStrategy {
    public double calculate(double price) { return price * 0.05; }
}

public class VipDiscount implements DiscountStrategy {
    public double calculate(double price) { return price * 0.15; }
}

public class EmployeeDiscount implements DiscountStrategy {
    public double calculate(double price) { return price * 0.30; }
}

// Adding "PartnerDiscount" = just a new class, zero modifications to existing code ✅
public class PartnerDiscount implements DiscountStrategy {
    public double calculate(double price) { return price * 0.20; }
}

// Consumer — never changes regardless of how many new strategies are added
public class OrderService {
    public double applyDiscount(double price, DiscountStrategy strategy) {
        return price - strategy.calculate(price);
    }
}
```

</details>

---

## 3. Liskov Substitution Principle (LSP)
**"Derived classes must be substitutable for their base classes."**

If program module *A* uses a base class *B*, its behavior shouldn't be negatively altered if it receives an instance of a subclass *C* instead of *B*. Subclasses should override methods of the base class without breaking the expected behavior.

- **Bad Design:** A `Square` class deriving from `Rectangle` breaks the expected behavior (setting width shouldn't change height in a Rectangle).
- **Good Design:** Introduce a `Shape` interface and have both `Rectangle` and `Square` implement it independently.

<details>
<summary>❌ Bad Example — LSP Violation</summary>

```java
// BAD: Square inherits from Rectangle but breaks its contract
public class Rectangle {
    protected int width;
    protected int height;

    public void setWidth(int width)   { this.width = width; }
    public void setHeight(int height) { this.height = height; }
    public int area() { return width * height; }
}

public class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        // Square forces both sides equal — violates Rectangle's behavior
        this.width = width;
        this.height = width;
    }

    @Override
    public void setHeight(int height) {
        this.width = height;
        this.height = height;
    }
}

// This function expects a Rectangle but is silently broken by a Square
public void testArea(Rectangle rect) {
    rect.setWidth(4);
    rect.setHeight(5);
    // Expected: 20. Actual with Square: 25 — LSP violated ❌
    assert rect.area() == 20;
}
```

</details>

<details>
<summary>✅ Good Example — LSP Applied</summary>

```java
// GOOD: Use a shared abstraction instead of inheritance
public interface Shape {
    int area();
}

public class Rectangle implements Shape {
    private final int width;
    private final int height;

    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }

    public int area() { return width * height; }
}

public class Square implements Shape {
    private final int side;

    public Square(int side) {
        this.side = side;
    }

    public int area() { return side * side; }
}

// Works correctly with any Shape — LSP satisfied ✅
public void printArea(Shape shape) {
    System.out.println("Area: " + shape.area());
}
```

</details>

---

## 4. Interface Segregation Principle (ISP)
**"Clients should not be forced to depend upon interfaces that they do not use."**

It is better to have many small, specific interfaces than one large, generalized, "fat" interface. This prevents implementing classes from having to write dummy/empty methods for functionalities they don't actually support.

- **Bad Design:** An `IWorker` interface with `work()` and `eat()` methods. If a `Robot` implements `IWorker`, it must implement an unnatural `eat()` method.
- **Good Design:** Two distinct interfaces: `IWorkable` and `IFeedable`. Humans implement both, Robots only implement `IWorkable`.

<details>
<summary>❌ Bad Example — ISP Violation</summary>

```java
// BAD: Fat interface forces all implementors to define methods they don't need
public interface IWorker {
    void work();
    void eat();      // Robots don't eat — forced to implement a meaningless method ❌
    void sleep();    // Robots don't sleep either ❌
}

public class HumanWorker implements IWorker {
    public void work()  { System.out.println("Human working"); }
    public void eat()   { System.out.println("Human eating"); }
    public void sleep() { System.out.println("Human sleeping"); }
}

public class RobotWorker implements IWorker {
    public void work()  { System.out.println("Robot working"); }
    public void eat()   { /* Robots don't eat — meaningless stub */ }  // ❌
    public void sleep() { /* Robots don't sleep — meaningless stub */ } // ❌
}
```

</details>

<details>
<summary>✅ Good Example — ISP Applied</summary>

```java
// GOOD: Segregated, focused interfaces
public interface IWorkable {
    void work();
}

public interface IFeedable {
    void eat();
}

public interface ISleepable {
    void sleep();
}

// Human implements all relevant interfaces
public class HumanWorker implements IWorkable, IFeedable, ISleepable {
    public void work()  { System.out.println("Human working"); }
    public void eat()   { System.out.println("Human eating"); }
    public void sleep() { System.out.println("Human sleeping"); }
}

// Robot only implements what it actually supports ✅
public class RobotWorker implements IWorkable {
    public void work() { System.out.println("Robot working"); }
}
```

</details>

---

## 5. Dependency Inversion Principle (DIP)
**"Depend on abstractions, not on concretions."**

1. High-level modules should not depend on low-level modules. Both should depend on abstractions.
2. Abstractions should not depend on details. Details should depend on abstractions.

- **Bad Design:** An `OrderProcessor` directly instantiating a `MySQLDatabase` connection. Migrating to PostgreSQL requires modifying the processor.
- **Good Design:** An `OrderProcessor` depending on an `IDatabase` abstraction injected at runtime.

<details>
<summary>❌ Bad Example — DIP Violation</summary>

```java
// BAD: High-level OrderProcessor is tightly coupled to low-level MySQLDatabase
public class MySQLDatabase {
    public void saveOrder(Order order) {
        System.out.println("Saving order to MySQL: " + order.getId());
    }
}

public class OrderProcessor {
    // Directly instantiates the concrete class — impossible to swap DB ❌
    private MySQLDatabase database = new MySQLDatabase();

    public void process(Order order) {
        // Business logic...
        database.saveOrder(order);
    }
}
// To switch to PostgreSQL, OrderProcessor itself must be modified ❌
```

</details>

<details>
<summary>✅ Good Example — DIP Applied</summary>

```java
// GOOD: Both layers depend on the abstraction (interface)

// Abstraction — the stable contract both layers depend on
public interface Database {
    void saveOrder(Order order);
}

// Low-level detail — depends on the abstraction (implements the interface)
public class MySQLDatabase implements Database {
    public void saveOrder(Order order) {
        System.out.println("Saving to MySQL: " + order.getId());
    }
}

// Another concrete implementation — swap in without touching OrderProcessor ✅
public class PostgreSQLDatabase implements Database {
    public void saveOrder(Order order) {
        System.out.println("Saving to PostgreSQL: " + order.getId());
    }
}

// High-level module — depends only on the abstraction, never on a concrete class ✅
public class OrderProcessor {
    private final Database database; // Interface, not MySQLDatabase

    // Dependency injected from outside — caller decides which DB to use
    public OrderProcessor(Database database) {
        this.database = database;
    }

    public void process(Order order) {
        // Business logic...
        database.saveOrder(order);
    }
}

// Wiring (e.g., in a Spring Boot config or main method)
Database db = new PostgreSQLDatabase();       // Swap here, nowhere else ✅
OrderProcessor processor = new OrderProcessor(db);
```

</details>

---

## Real Use Cases & Benefits
- **Testing:** High adherence to SOLID (especially Dependency Inversion) makes unit testing seamless since dependencies can be easily mocked using abstractions.
- **Scaling Teams:** Because classes have a single responsibility, multiple engineers can work on different components with minimal merge conflicts.
- **Framework Architecture:** Modern backend frameworks like Spring Boot, NestJS, and .NET Core rely inherently on these principles (especially IoC/DIP) for their underlying architectures.
