---
title: Strategy
sidebar_label: 11 - Strategy
displayed_sidebar: softwareArchitectureSidebar
tags: [behavioral-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Behavioral Patterns</span>

# Strategy

- Purpose: Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.
- Use case: Routing algorithms in a GPS device (Fastest, Shortest, Avoid Tolls), payment methods in an e-commerce checkout (Credit Card, PayPal, Crypto), different sorting algorithms depending on data size.

## Example

```java
// Strategy Interface
public interface PaymentStrategy {
    void pay(int amount);
}

// Concrete Strategies
public class CreditCardStrategy implements PaymentStrategy {
    private String name;
    private String cardNumber;

    public CreditCardStrategy(String name, String cardNumber) {
        this.name = name;
        this.cardNumber = cardNumber;
    }

    @Override
    public void pay(int amount) {
        System.out.println(amount + " paid with credit/debit card.");
    }
}

public class PayPalStrategy implements PaymentStrategy {
    private String emailId;
    private String password;

    public PayPalStrategy(String emailId, String password) {
        this.emailId = emailId;
        this.password = password;
    }

    @Override
    public void pay(int amount) {
        System.out.println(amount + " paid using PayPal.");
    }
}

// Context
public class ShoppingCart {
    private int totalAmount;

    public void addAmount(int amount) {
        this.totalAmount += amount;
    }

    public void pay(PaymentStrategy paymentMethod) {
        if (totalAmount > 0) {
            paymentMethod.pay(totalAmount);
        }
    }
}
```
