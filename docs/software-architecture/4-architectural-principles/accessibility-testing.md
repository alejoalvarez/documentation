---
title: Accessibility Testing
sidebar_label: Accessibility Testing
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Accessibility Testing (a11y)

**Accessibility Testing** (commonly abbreviated **a11y**) verifies that a software product can be used effectively by people with disabilities, including those with visual, auditory, motor, and cognitive impairments.

An accessible application is not just an ethical obligation — it is a legal requirement in many jurisdictions and expands your potential user base.

---

## Why Accessibility Matters

- **Legal compliance:** Many countries require digital accessibility under law (e.g., ADA in the US, EAA in the EU). Non-compliant products face lawsuits and fines.
- **Wider audience:** ~15% of the global population lives with some form of disability.
- **SEO benefits:** Semantic, accessible HTML (proper headings, alt text, ARIA labels) also helps search engines index content.

---

## WCAG: The Standard

The **Web Content Accessibility Guidelines (WCAG)**, managed by the W3C, are the universally recognized standards for web accessibility. WCAG 2.1 AA compliance is the most commonly required level.

WCAG is organized around four principles (the **POUR** framework):

| Principle | Meaning | Example Requirement |
|-----------|---------|---------------------|
| **Perceivable** | Information must be presentable in ways users can perceive | Alternative text for all images; captions for videos |
| **Operable** | UI components must be operable using keyboard alone | No keyboard trap; all interactive elements focusable via Tab |
| **Understandable** | Information and UI operation must be understandable | Clear error messages; consistent navigation |
| **Robust** | Content must be interpretable by assistive technologies | Valid HTML; proper ARIA attributes |

---

## Assistive Technology Testing

To truly test accessibility, test with the assistive technologies your users rely on:
- **Screen readers:** NVDA + Firefox (Windows), JAWS (Windows), VoiceOver (macOS/iOS), TalkBack (Android).
- **Keyboard-only navigation:** Tab, Shift+Tab, Enter, Space, arrow keys must cover all interactive flows.
- **Browser zoom:** Content must be usable at 200%+ zoom without horizontal scrolling or content clipping.

---

## Automated Accessibility Testing Tools

Automated tools can catch ~30-40% of accessibility issues:

| Tool | Use |
|------|-----|
| **axe-core** | JavaScript library; integrates with Cypress, Playwright, Jest |
| **Lighthouse (Chrome)** | Built-in browser audit for accessibility score |
| **WAVE** | Browser extension that visually highlights accessibility errors |
| **Pa11y** | CLI tool for automated a11y checks in CI/CD |

```javascript
// Example: axe-core integrated with Cypress
it('should have no accessibility violations', () => {
    cy.visit('/checkout');
    cy.injectAxe();
    cy.checkA11y(); // Fails the test if a11y violations are found
});
```

---

## Common Accessibility Issues

1. Missing `alt` text on images (screen readers skip the image silently).
2. Form inputs without associated `<label>` elements.
3. Insufficient color contrast ratio (< 4.5:1 for normal text).
4. Interactive elements that are only accessible by mouse (not keyboard).
5. Missing focus indicators (removing `outline: none` without a replacement).
6. Modals that don't trap focus inside (screen reader leaks outside the modal).
