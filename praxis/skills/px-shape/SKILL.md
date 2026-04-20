---
name: px-shape
description: "Shape work before implementation by combining discovery and planning into one step. Use before px-implement."
argument-hint: "topic, problem, feature, bug, or area to shape"
---

# Shape

Shape a piece of work before implementation. The goal is to understand the problem, consult canonical knowledge, inspect the codebase, test assumptions, and leave the session with an actionable implementation shape.

`px-shape` is the repository's shaping step. It is allowed to discuss technical direction, architecture, rollout boundaries, and implementation sequencing, but it must not write production code.

## Canonical-first rule

Before doing broad exploration:

1. Read the relevant documents in `.ai-workflow/veritas/`.
2. Treat `Veritas` as the canonical source of repository knowledge.
3. Do **not** read `.ai-workflow/vault/` by default.
4. Only consult `vault/` if the user explicitly asks for vault history or provenance.

## How a session works

### 1. Clarify the problem

Understand:

- what needs to change
- why it matters
- what success looks like
- what constraints already exist

Push for clarity. If the task is vague, help the user narrow it into something implementable.

### 2. Build context

Read the relevant `Veritas` docs first, then inspect the codebase. Use focused sub-agents when useful:

- `codebase-explorer` — find relevant code, existing patterns, and likely touch points
- `knowledge-reviewer` — surface prior lessons or reusable patterns
- `external-researcher` — fetch external best practices or docs when needed

### 3. Challenge assumptions

Help the user avoid weak plans:

- question hidden constraints
- surface alternatives
- identify rollout or migration risks
- call out dependencies and sequencing
- separate must-haves from follow-ups

### 4. Converge on the implementation shape

By the end of the session, the work should have:

- a clear goal
- the chosen direction
- the main affected areas
- risks and rollout notes
- concrete acceptance criteria

If multiple phases are needed, break them into explicit phases. Each phase should be independently valuable.

### 5. Write the shape document

Always write a **non-canonical shape document** into `.ai-workflow/vault/shapes/` using the template in `.ai-workflow/vault/shapes/template.md`.

This document is the implementation brief for `px-implement`.

Rules:

- shape documents are required
- they live in `vault/shapes/`, not in `local/`
- name them `.ai-workflow/vault/shapes/YYYYMMDD-slug-shape.md`
- for multi-phase work, use `.ai-workflow/vault/shapes/YYYYMMDD-slug-phase-1-shape.md`
- they are non-canonical support material, not repository truth
- they should capture the goal, chosen direction, scope, constraints, and acceptance criteria clearly enough for implementation to follow without ambiguity
- they should include concrete implementation steps, targeted files/modules, and validation expectations whenever that information is known
- anything future-important must eventually be transmuted into `Veritas`

### 6. Hand off cleanly

End the shaping session with a concise implementation handoff that points to the vault shape document:

- what we are changing
- why this direction was chosen
- what areas are in scope
- what is explicitly out of scope
- how review should judge success

Make the shape document path explicit so `px-implement` can use it directly.

If the user wants, move directly into `px-implement`.

## Behavioral rules

- Do not write production code.
- Start from `Veritas`, not from historical artifacts.
- Be a thinking partner, not just a scribe.
- Leave the work more concrete than you found it.
- Prefer clarity and boundaries over exhaustive speculation.
