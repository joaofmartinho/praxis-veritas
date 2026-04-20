---
name: px-shape
description: "Shape work before implementation by combining discovery and planning into one step. Use before px-implement."
argument-hint: "topic, problem, feature, bug, or area to shape"
---

# Shape

Shape a piece of work before implementation. The goal is to understand the problem, consult `Veritas`, inspect the codebase, and leave the session with an actionable implementation shape.

## How a session works

### 1. Clarify the problem

Understand what needs to change, why it matters, what success looks like, and what constraints already exist.

### 2. Build context

Read the relevant `Veritas` docs first, then inspect the codebase. Do not read `vault/` unless the user explicitly asks for vault history or provenance.

Use focused sub-agents when useful:

- `codebase-explorer` — find relevant code, existing patterns, and likely touch points
- `knowledge-reviewer` — surface prior lessons or reusable patterns
- `external-researcher` — fetch external best practices or docs when needed

### 3. Challenge assumptions

Surface hidden constraints, alternatives, rollout risks, dependencies, and sequencing.

### 4. Converge on the implementation shape

By the end of the session, the work should have a clear goal, chosen direction, main affected areas, risks, and concrete acceptance criteria.

If multiple phases are needed, break them into explicit phases that are independently valuable.

### 5. Write the shape document

Always write a **non-canonical shape document** into `.ai-workflow/vault/shapes/` using the template in `.ai-workflow/vault/shapes/template.md`.

This document is the implementation brief for `px-implement`. Name it `.ai-workflow/vault/shapes/YYYYMMDD-slug-shape.md`. For multi-phase work, use `.ai-workflow/vault/shapes/YYYYMMDD-slug-phase-1-shape.md`.

### 6. Hand off cleanly

End with a concise implementation handoff that includes the shape path, what is changing, what is out of scope, and how review should judge success.

## Behavioral rules

- Do not write production code.
- Start from `Veritas`, not from `vault/`.
- Leave the work more concrete than you found it.
- Prefer clarity and boundaries over exhaustive speculation.
