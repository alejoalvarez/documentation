---
title: Test-Driven Development (TDD)
sidebar_label: Test-Driven Development (TDD)
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Test-Driven Development (TDD)

**Test-Driven Development (TDD)** is a software development process where you write a failing automated test *before* you write the production code that makes it pass. It was popularized by Kent Beck, one of the original signatories of the Agile Manifesto.

---

## The Red-Green-Refactor Cycle

TDD operates on a short, three-phase cycle repeated continuously:

1. 🔴 **Red:** Write a failing test for the next small piece of functionality. The test should fail because the code does not yet exist.
2. 🟢 **Green:** Write the *minimum* amount of production code necessary to make the test pass. Don't worry about code quality at this stage.
3. 🔵 **Refactor:** Clean up your code — extract methods, improve naming, eliminate duplication — while ensuring all tests remain green.

```
Write Failing Test (RED) → Make Test Pass (GREEN) → Clean Up Code (REFACTOR) → Repeat
```

---

## Example

Let's build a simple `BankAccount` with TDD in Java.

**Step 1 — Red (Write the failing test):**
```java
@Test
public void should_increase_balance_when_deposit_is_made() {
    BankAccount account = new BankAccount(100.0);
    account.deposit(50.0);
    assertEquals(150.0, account.getBalance(), 0.01);
}
// This fails: BankAccount class doesn't even exist yet.
```

**Step 2 — Green (Write minimum production code):**
```java
public class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        this.balance += amount;
    }

    public double getBalance() {
        return this.balance;
    }
}
// Test now passes!
```

**Step 3 — Refactor:** Review the code. Is `balance` protected well? Should `deposit` validate that `amount > 0`? Write a new Red test for the edge case and repeat the cycle.

---

## Benefits of TDD

1. **Design Pressure:** TDD naturally pushes you toward loosely coupled, testable code (since it must be testable from day one).
2. **Regression Safety Net:** A comprehensive test suite allows you to refactor fearlessly. If a change breaks something, a test immediately catches it.
3. **Living Documentation:** Tests describe exactly *what* the system is supposed to do. A JUnit test named `should_reject_withdrawal_when_balance_is_insufficient` is documentation that never goes stale.
4. **Reduced Debugging Time:** Bugs are caught within minutes of being introduced, not weeks later in production.

---

## Test Pyramid

TDD aligns with the principle of the **Test Pyramid**:
- Many **Unit Tests** (fast, isolated, cheap to run).
- Fewer **Integration Tests** (more expensive, test how layers interact).
- Very few **End-to-End Tests** (slow, brittle, expensive to maintain).

TDD is primarily applied at the unit test level, though the principles extend to all levels.
