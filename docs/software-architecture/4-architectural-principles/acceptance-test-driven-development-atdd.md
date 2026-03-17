---
title: Acceptance Test-Driven Development (ATDD)
sidebar_label: ATDD
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Acceptance Test-Driven Development (ATDD)

**ATDD** is a collaborative practice in which the entire development team (business analysts, developers, and QA engineers) collaboratively writes **acceptance criteria** *before* development begins. Those acceptance criteria are then automated as tests that must pass before the story is considered complete.

---

## ATDD vs. BDD vs. TDD

All three belong to the same "test-first" family, but they operate at different levels:

| Practice | Who drives it | What is tested | When? |
|----------|--------------|----------------|-------|
| **TDD** | Developer | Small units of code | During coding |
| **BDD** | Developer + QA + Business | System behavior | During feature planning |
| **ATDD** | Business + QA + Developer | Full user acceptance criteria | Before development starts |

---

## The ATDD Cycle

The foundational loop of ATDD is:

1. **Discuss:** Team + stakeholders discuss the user story. What does success look like from the customer's perspective?
2. **Distill:** Extract concrete, specific, and testable acceptance tests from the discussion.
3. **Develop:** Developers write code that satisfies the acceptance tests (using inner TDD cycles).
4. **Demo:** Stakeholders validate that the system passes the acceptance tests.

---

## Example

**User Story:** "As a customer, I want to be able to log in so that I can access my dashboard."

**Acceptance Tests (written before any code):**
1. A user with a valid username and password is redirected to their dashboard.
2. A user with a valid username and an invalid password sees the error message "Invalid credentials."
3. A user who has not verified their email sees the warning "Please verify your email."
4. After 5 failed login attempts, the account is locked for 15 minutes.

These acceptance tests are then automated using tools like **Selenium**, **Playwright**, or **Cypress** for UI flows, or **RestAssured** for API-level acceptance testing.

---

## Benefits of ATDD

1. **Alignment Before Coding Starts:** By writing acceptance tests collaboratively, the team surfaces ambiguities and hidden requirements *before* writing a single line of code — when changes are cheapest to make.
2. **Clear "Done" Criteria:** A story is only "done" when all its acceptance tests pass. There is no room for subjective interpretation.
3. **Reduces Rework:** Finding out that a feature doesn't match expectations in a test (before release) is far cheaper than hearing it from an angry customer after release.
4. **Supports Continuous Delivery:** A suite of passing acceptance tests provides the confidence needed to deploy automatically.
