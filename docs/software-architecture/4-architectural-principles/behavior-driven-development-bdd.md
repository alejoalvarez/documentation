---
title: Behavior-Driven Development (BDD)
sidebar_label: Behavior-Driven Development (BDD)
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Behavior-Driven Development (BDD)

**Behavior-Driven Development (BDD)** is an agile software development process that emerged from TDD. It encourages collaboration between developers, QA, and non-technical business stakeholders by using a shared language to describe how an application *should behave*.

BDD bridges the gap between business specifications and technical tests.

---

## How BDD Differs from TDD

| TDD | BDD |
|-----|-----|
| Centered on developer testing units of code | Centered on specifying system behavior from the user's perspective |
| Uses a technical vocabulary | Uses a shared, natural language vocabulary |
| Tests are written by developers | Scenarios are written collaboratively with business stakeholders |
| Focuses on HOW the code works | Focuses on WHAT the system should do |

---

## The Gherkin Language

BDD scenarios are written in a structured natural language called **Gherkin**, using the keywords `Given`, `When`, and `Then` (plus `And`, `But`, `Background`).

### Gherkin Scenario Example

```gherkin
# File: features/bank_account.feature

Feature: Bank Account Management
  As a bank customer
  I want to be able to deposit and withdraw money
  So that I can manage my finances effectively

  Scenario: Successful deposit
    Given I have a bank account with a balance of $100
    When I deposit $50
    Then my account balance should be $150

  Scenario: Rejected withdrawal due to insufficient funds
    Given I have a bank account with a balance of $50
    When I withdraw $200
    Then the transaction should be rejected
    And my account balance should remain $50
```

---

## Mapping Scenarios to Code (Step Definitions)

The Gherkin scenarios are then mapped to executable code through **Step Definitions**. Popular BDD frameworks include **Cucumber** (Java/JavaScript), **SpecFlow** (.NET), and **Behave** (Python).

```java
// Cucumber Step Definition (Java)
public class BankAccountSteps {

    private BankAccount account;
    private boolean transactionRejected;

    @Given("I have a bank account with a balance of ${double}")
    public void i_have_a_bank_account_with(double balance) {
        this.account = new BankAccount(balance);
    }

    @When("I deposit ${double}")
    public void i_deposit(double amount) {
        account.deposit(amount);
    }

    @When("I withdraw ${double}")
    public void i_withdraw(double amount) {
        try {
            account.withdraw(amount);
            transactionRejected = false;
        } catch (InsufficientFundsException e) {
            transactionRejected = true;
        }
    }

    @Then("my account balance should be ${double}")
    public void my_balance_should_be(double expectedBalance) {
        assertEquals(expectedBalance, account.getBalance(), 0.01);
    }

    @Then("the transaction should be rejected")
    public void the_transaction_should_be_rejected() {
        assertTrue(transactionRejected);
    }
}
```

---

## Benefits of BDD

1. **Shared Understanding:** Business stakeholders can read and validate the `.feature` files, closing the communication gap between business and development.
2. **Living Documentation:** Feature files serve as always up-to-date, executable documentation of how the system behaves.
3. **Regression Coverage:** Each scenario becomes an automated regression test.
4. **Focus on Value:** By writing scenarios from a user's perspective first, the team stays focused on delivering real business value rather than over-engineering technical solutions.
