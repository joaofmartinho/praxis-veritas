---
name: px-transmute
description: "Convert completed work into durable repository knowledge. Update Veritas first, then write the non-canonical run record."
argument-hint: "current run, file paths, or a short run identifier"
---

# Transmute

Transmute completed work into durable repository knowledge.

The purpose of `px-transmute` is to ensure future sessions can rely on `Veritas` instead of rediscovering context through temporary notes, git history, or memory. `px-transmute` always updates `Veritas`, applies recurring operating rules to the adopted project's agent instructions when needed, and only then writes a compact run record into `.ai-workflow/vault/`.

## The authority rule

- `Veritas` is canonical.
- `vault/` is not canonical.
- No durable knowledge should remain only in a run record after transmutation.

## Veritas structure

`Veritas` should be organized by stable knowledge types, not by date.

Prefer these categories:

### 1. Domain docs

Use for stable understanding of a business or technical area.

Examples:

- `auth.md`
- `cards.md`
- `benefits.md`
- `inter-domain-events.md`

Good contents:

- current mental model
- important invariants
- key flows
- known pitfalls
- related patterns

### 2. Pattern docs

Use for reusable implementation patterns or conventions that apply across multiple tasks.

Examples:

- `testing-patterns.md`
- `migration-safety.md`
- `translation-component-patterns.md`

Good contents:

- when to use the pattern
- how the pattern is typically implemented
- anti-patterns to avoid
- examples of good usage

### 3. Decision docs

Use for durable choices with rationale.

Examples:

- `banking-transfer-confirmation-contract.md`
- `prefer-query-key-factories.md`

Good contents:

- decision
- rationale
- tradeoffs
- consequences for future work

## How to choose where knowledge goes

When transmuting:

1. Prefer updating an existing `Veritas` doc.
2. Create a new doc only if the knowledge has no good existing home.
3. Keep the number of docs low and the content dense with signal.

Ask:

- Is this a domain understanding change?
- Is this a reusable engineering pattern?
- Is this a durable decision?

If the answer is no, it may belong only in the run record.

Then ask one more question:

- Should this become a standing instruction that future agents must follow automatically?

If yes, it does not belong only in `Veritas`. It should also update the adopted project's agent instructions.

## Veritas document anatomy

A good `Veritas` doc should usually contain:

- a short frontmatter block
- a clear title
- a concise current-state summary
- stable sections such as:
  - `Current Model`
  - `Patterns`
  - `Pitfalls`
  - `Decisions`
  - `Related Docs`

Avoid writing `Veritas` docs as dated diaries. They should read like the current best understanding of the topic.

## When to update project agent rules

Some learnings should become always-on instructions, not just repository knowledge.

When transmuting inside a project that uses Praxis Veritas, update the nearest project instruction surface as well:

- `AGENTS.md`
- local `AGENTS.md` files in the relevant workspace
- project rule files such as `.agents/rules/*.md`

Do this when the learning means future agents should consistently behave differently, for example:

- preferred component or styling systems
- required migration behavior when touching legacy files
- mandatory testing or translation conventions
- integration patterns that should always be followed

Use this rule:

- `Veritas` explains what is true about the repository.
- project agent rules explain how agents must behave because of that truth.

If a learning should change default future agent behavior, update the project rules during transmutation instead of leaving it only as a note in `Veritas`.

## How a session works

### 1. Load context

Gather context from:

- the current chat/session
- implementation work
- review findings
- existing `Veritas`
- git history when needed

### 2. Identify durable knowledge

Separate:

- knowledge that future runs must know
- temporary narrative about what happened this time

Only the first category belongs in `Veritas`.

### 3. Update Veritas first

Update the relevant canonical docs before writing any history.

Rules:

- normalize durable knowledge into the right doc type
- prefer editing an existing doc over creating a new one
- remove ambiguity if the run clarified something previously fuzzy
- keep docs concise and scan-friendly

### 4. Update project agent rules when behavior should change

If the run produced a reusable operating rule for future agents, update the adopted project's instruction files before writing history.

Examples:

- a workspace must use a specific styling system for touched code
- a translation rule must always use a specific component pattern
- a migration should be proposed or enforced whenever an agent edits a legacy surface

Do not rely on `Veritas` alone for these cases. Make the instruction executable by placing it where future agents will read it as part of their normal workflow.

### 5. Write the run record

After `Veritas` is updated, write a compact run record into `.ai-workflow/vault/` using the template in `reference/template.md`.

The run record is for:

- provenance
- narrative of what changed
- notable review findings
- references to updated `Veritas` docs

It is not the main knowledge base.

### 6. Confirm transmutation

A run is only complete when:

- `Veritas` has been updated
- project agent rules have been updated when the learning changes default future agent behavior
- the vault record has been written
- no future-important knowledge remains only in temporary artifacts

## Behavioral rules

- `Veritas` first, vault second.
- Update project agent rules when a learning should become an always-on behavior.
- Prefer updating existing docs.
- Do not create unnecessary doc sprawl.
- Keep run records compact.
- Preserve durable knowledge as current truth, not as dated notes.
