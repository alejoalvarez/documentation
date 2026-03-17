---
title: Usability Testing
sidebar_label: Usability Testing
displayed_sidebar: softwareArchitectureSidebar
tags: [architectural-principles]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<span className="badge-arch">Architectural Principles</span>

# Usability Testing

**Usability Testing** is a user experience (UX) research technique where real users attempt to complete tasks using a product while observers watch, listen, and take notes. The goal is to identify usability problems, collect qualitative and quantitative data, and determine participants' satisfaction with the product.

---

## Core Goals of Usability Testing

A good usability test measures three things:
1. **Effectiveness:** Can users complete the tasks successfully?
2. **Efficiency:** How much time and effort is required to complete tasks?
3. **Satisfaction:** How do users feel about the experience?

---

## Types of Usability Testing

### Moderated Testing
A facilitator is present (in-person or via video call) to guide the participant, probe with follow-up questions, and observe reactions in real time.
- **Best for:** Deep qualitative insights; complex or novel interactions.
- **Tools:** Zoom, UserTesting.com (live sessions).

### Unmoderated Testing
Participants complete tasks independently at their own pace, recorded by software. The facilitator reviews recordings afterward.
- **Best for:** Larger sample sizes; faster turnaround; quantitative benchmarking.
- **Tools:** UserTesting.com, Maze, Lookback.

### A/B Testing
Two variants (A and B) of a design are shown to different user segments simultaneously. Metrics determine which performs better.
- **Best for:** Validating specific design choices at scale (e.g., button color, CTA text, checkout flow).
- **Tools:** LaunchDarkly, Optimizely, GrowthBook.

---

## How to Conduct a Usability Test

1. **Define objectives:** What specific questions do you want to answer? *"Can users find the subscription settings without help?"*
2. **Create task scenarios:** Write realistic, neutral tasks that don't lead participants. *"You just moved. Update your billing address."* (Not: *"Click on Account Settings."*)
3. **Recruit participants:** 5-8 participants from your target demographic typically reveal 80%+ of major usability issues.
4. **Conduct sessions:** Ask participants to "think aloud" as they work through tasks.
5. **Analyze findings:** Categorize issues by severity (critical, major, minor). Identify patterns across sessions.
6. **Iterate:** Fix the most critical issues and re-test to validate improvements.

---

## Nielsen's 10 Usability Heuristics

Jakob Nielsen's widely used heuristic evaluation framework for assessing UI usability:

1. Visibility of system status
2. Match between system and the real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize, diagnose, and recover from errors
10. Help and documentation
