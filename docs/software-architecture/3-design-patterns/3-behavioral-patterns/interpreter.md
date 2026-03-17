---
title: Interpreter
sidebar_label: 2 - Interpreter
displayed_sidebar: softwareArchitectureSidebar
tags: [behavioral-patterns]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Behavioral Patterns</span>

# Interpreter

- Purpose: Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.
- Use case: Parsing mathematical expressions, SQL query builders, simple scripting languages, regular expression engines.

## Example

```java
// Expression Interface
public interface Expression {
    boolean interpret(String context);
}

// Terminal Expression
public class TerminalExpression implements Expression {
    private String data;

    public TerminalExpression(String data) {
        this.data = data;
    }

    @Override
    public boolean interpret(String context) {
        if(context.contains(data)){
            return true;
        }
        return false;
    }
}

// Non-Terminal Expression (OR)
public class OrExpression implements Expression {
    private Expression expr1 = null;
    private Expression expr2 = null;

    public OrExpression(Expression expr1, Expression expr2) {
        this.expr1 = expr1;
        this.expr2 = expr2;
    }

    @Override
    public boolean interpret(String context) {
        return expr1.interpret(context) || expr2.interpret(context);
    }
}

// Client
// Expression isMarriedWoman = new OrExpression(new TerminalExpression("Julie"), new TerminalExpression("Married"));
// isMarriedWoman.interpret("Married Julie"); // Returns true
```
