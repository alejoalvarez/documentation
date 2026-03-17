---
title: Separation of Concerns (SoC)
sidebar_label: Separation of Concerns
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Separation of Concerns (SoC)

**Separation of Concerns (SoC)** is one of the most fundamental principles in software design. It dictates that a computer program should be divided into distinct, independent sections, where each section addresses a separate "concern" (a specific piece of functionality, logic, or data).

> When a system is cleanly separated, modifications to one concern do not unexpectedly break or require modifications to a completely different concern.

---

## What is a "Concern"?
A concern can be thought of as a set of information that affects the code of a computer program. Examples include:
- **Presentation Layer:** How data is displayed to the user (HTML/CSS, React components, iOS views).
- **Business Logic Layer:** How data is transformed, validated, and processed according to real-world business rules.
- **Data Access Layer / Persistence:** How data is written to or retrieved from a database or file system.
- **Infrastructure:** Network routing, logging, caching, and security authentication.

---

## Examples of SoC in Practice

### 1. HTML, CSS, and JavaScript
The original architectural triumph of the web is based on SoC:
- **HTML** handles structural layout (The *What*).
- **CSS** handles visual styling (The *Look*).
- **JavaScript** handles interactivity and behavior (The *Action*).

### 2. Model-View-Controller (MVC)
MVC is a classic architectural pattern directly derived from SoC:
- **Model:** Manages the data and rules of the application.
- **View:** Manages the visual output.
- **Controller:** Accepts input and converts it to commands for the Model or View.

---

## Bad Design vs. Good Design

### Bad Design (Spaghetti Code / God Object)
A single PHP or Node.js file that:
1. Queries the database directly using raw SQL.
2. Validates the incoming HTTP request payload.
3. Calculates tax based on business rules.
4. Returns an HTML string formatted with CSS.

*Why is this bad?* If the database transitions from MySQL to PostgreSQL, the developer must carefully navigate through HTML generation and tax calculation logic just to update the connection strings and queries.

### Good Design (Clean Separation)
- **`UserController.js`**: Receives the HTTP request and passes the payload to the service.
- **`UserService.js`**: Contains purely the business logic (tax calculations, formatting) and calls the repository.
- **`UserRepository.js`**: Contains only the DB-specific logic (SQL queries).
- **`user-template.hbs`**: An HTML template that merely displays the final data it is handed, blind to how it was calculated.

---

## Benefits of SoC

1. **Independent Development:** Frontend teams can build React components (View) while backend teams build the APIs (Model/Controller) simultaneously.
2. **Reusability:** A well-separated `AuthService` can be reused by a web app, a mobile app, and a CLI tool. If auth logic was tangled into the web view, it couldn't be reused by the mobile app.
3. **Maintainability:** Bugs are easily isolated. A database error is immediately traced to the Data Access Layer, not the UI layer.
4. **Testability:** You can write automated tests for business logic without needing to render UI components or spin up a real database.
