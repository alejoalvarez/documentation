---
title: Domain-Driven Design (DDD)
sidebar_label: Domain-Driven Design (DDD)
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Domain-Driven Design (DDD)

**Domain-Driven Design (DDD)** is an approach to software development introduced by Eric Evans in his 2003 book. It focuses the design on the core "domain" (the sphere of knowledge or activity around which the application logic revolves) and domain logic.

DDD fundamentally changes how teams construct complex software by centering technical architecture around deep business understanding.

---

## The Core Problem DDD Solves
Often, software developers and business experts (Domain Experts) speak two different languages. The product team discusses "invoices," "chargebacks," and "subscriptions," while developers discuss "database tables," "REST endpoints," and "cron jobs." This translation barrier causes bugs, misaligned requirements, and rigid architectures.

DDD aims to bridge this gap primarily through the **Ubiquitous Language**: a shared language established by both developers and domain experts that is used consistently everywhere, from daily emails to actual class and variable names in the codebase.

---

## Strategic Design (High Level)
Strategic design is about analyzing the business, dividing it into manageable sections, and defining how those sections integrate.

### Bounded Contexts
A **Bounded Context** is a logical boundary within which a particular domain model applies. The meaning of a term might completely change when moving between bounded contexts.

*Example:* In an e-commerce platform, what is a "Product"?
- In the **Inventory Context**, a Product is a physical item with dimensions and quantity-in-stock.
- In the **Sales Context**, a Product is something with a price, discount limits, and marketing tags.

Rather than creating a massive `Product` god-class connecting everything, you create two distinct `Product` entities scoped strictly to their respective bounded contexts. This forms the perfect foundation for mapping **Microservices** (1 Bounded Context = 1 Microservice).

### Context Maps
A visual representation of how different Bounded Contexts communicate (e.g., via APIs or message queues).

---

## Tactical Design (Code Level)
Tactical design dictates the specific code patterns used to implement the domain model within a bounded context.

### Entities
Objects defined by a unique identity, rather than their attributes. For instance, a `User` entity is defined by its `userId`. Even if the user changes their name or email, they are fundamentally the same `User`.

### Value Objects
Objects defined *only* by their attributes. They have no conceptual identity and should be immutable. 
*Example:* `Money(amount, currency)` or `Coordinates(latitude, longitude)`.

### Aggregates
A cluster of associated objects (Entities and Value Objects) that are treated as a single unit for data changes. Everything inside the aggregate is saved or updated together. Every aggregate has an **Aggregate Root**, which is the single entry-point Entity controlling access to the group.

*Example:* An `Order` aggregate contains multiple `OrderLineItem` entities. Code outside the aggregate cannot manipulate an `OrderLineItem` directly; it must ask the `Order` root to do it, guaranteeing business invariants (like total cost validity).

### Services
Sometimes, a business operation doesn't naturally belong to any single Entity or Value Object. This behavior is captured in a **Domain Service**.

*Example:* Transferring money between two `Account` entities shouldn't necessarily be a method on `Account1` reaching into `Account2`. It can reside in a `FundTransferService`.

### Repositories
An abstraction over the database. Instead of writing raw SQL in your business logic, the Repository provides an interface that mimics a collection of domain objects (e.g., `OrderRepository.findById(123)`).

---

## Is DDD Always the Right Choice?

**No.** DDD requires immense effort, deep structural commitment, and constant collaboration with business owners to extract complex logic.

- **Use DDD when:** The business domain is highly complex, involves sophisticated rules, and you are building a core product expected to live and evolve for many years.
- **Avoid DDD when:** You are building a simple CRUD application, a proof-of-concept, or a data-driven system with little to no behavioral business logic. The tactical patterns of DDD will just add unnecessary boilerplate to a simple app.


## Example

```python
# 1. Ubiquitous Language (Shared Vocabulary)
# The team agrees that "Customer" is the correct term, not "User" or "Client".
# This name appears in code, database tables, and business meetings.

# 2. Bounded Context (Inventory vs. Sales)
# The word "Product" means different things in different parts of the business.

# Inventory Context: Focus on stock levels and physical attributes
class InventoryProduct:
    def __init__(self, sku: str, quantity: int, dimensions: tuple):
        self.sku = sku
        self.quantity = quantity  # Stock count
        self.dimensions = dimensions

# Sales Context: Focus on price and marketing
class SalesProduct:
    def __init__(self, product_id: str, price: float, is_discountable: bool):
        self.product_id = product_id
        self.price = price
        self.is_discountable = is_discountable

# 3. Aggregate (Order Management)
# An Order is the Aggregate Root. It protects the internal OrderLines.
# You cannot modify an OrderLine directly; you must go through the Order.

class Order:
    def __init__(self, order_id: str, customer_id: str):
        self.order_id = order_id
        self.customer_id = customer_id
        self.lines = []  # List of OrderLine objects
        self.status = "PENDING"

    def add_item(self, product_id: str, quantity: int, price: float):
        # Business Rule: Check if product is discountable
        if not self.is_product_discountable(product_id):
            raise ValueError("Cannot apply discount to this product")
        
        # Business Rule: Ensure quantity is positive
        if quantity <= 0:
            raise ValueError("Quantity must be positive")

        self.lines.append(OrderLine(product_id, quantity, price))
        self._recalculate_total()

    def _recalculate_total(self):
        # Logic is encapsulated inside the aggregate
        self.total = sum(line.price * line.quantity for line in self.lines)

# 4. Domain Service (Cross-Aggregate Logic)
# Transferring funds involves two separate accounts (two potential aggregates).
# It's cleaner to handle this logic in a service.

class FundTransferService:
    def transfer(self, from_account: Account, to_account: Account, amount: float):
        # Business Rule: Check if sender has sufficient funds
        if from_account.balance < amount:
            raise InsufficientFundsError("Insufficient balance")
        
        # Business Rule: Amount must be positive
        if amount <= 0:
            raise ValueError("Transfer amount must be positive")

        from_account.withdraw(amount)
        to_account.deposit(amount)

# 5. Repository (Data Access Abstraction)
# The business logic doesn't know or care about SQL or MongoDB.

class OrderRepository:
    def find_by_id(self, order_id: str) -> Order:
        # Implementation details (SQL query, ORM mapping) hidden here
        pass

    def save(self, order: Order) -> None:
        # Implementation details hidden here
        pass
```

Let’s consider an e-commerce domain:

```java
// Common Entities: Cart, Product, CartItem, Total

// Value Object (no identity, immutable)
public class Money {
  private final BigDecimal amount;
  private final Currency currency;
  
  private Money(BigDecimal amount, Currency currency) {
    this.amount = amount;
    this.currency = currency;
  }
  
  public Money add(Money other) {
    return new Money(amount.add(other.amount), currency);
  }
}

// Entity (with identity)
public class Product {
  private final ProductId id;
  private String name;
  private Money price;
  
  public Product(ProductId id, String name, Money price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
  
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Product) ) return false;
    Product product = (Product) o;
    return id.equals(product.id);
  }
}

// Aggregate Root
public class Cart {
  private final CartId id;
  private List<CartLine> cartLines;
  
  public void addProduct(Product product, Quantity quantity) {
    CartLine line = new CartLine(product, quantity);
    cartLines.add(line);
  }
  
  public Money calculateTotal() {
    return lineas.stream()
      .map(l -> l.getTotal())
      .reduce(Money.ZERO, Money::add);
  }
}

// Repository
public interface CartRepository {
  Cart getById(CartId id);
  void save(Cart cart);
}

// Domain Service
public class OrderProcessingService {
  private CartRepository cartRepository;
  private OrderRepository orderRepository;
  
  public void processCart(CartId cartId) {
    Cart cart = cartRepository.getById(cartId);
    Order order = new Order(cart.getItems(), cart.calculateTotal());
    orderRepository.save(order);
  }
}
```

**Bounded Contexts:**

In a large system, different teams may work within different contexts:

- **Context: Catalog** - manages products and inventory
- **Context: Orders** - manages shopping carts and orders
- **Context: Payments** - manages transactions
- **Context: Shipping** - manages deliveries

Each context has its own domain model, and they communicate via well-defined APIs.

**Real-world use case:**

- Banking system: different bounded contexts for accounts, transactions, and loans
- Social network: contexts for users, posts, and messages
- E-commerce: contexts for the product catalog, shopping cart, payments, and shipping