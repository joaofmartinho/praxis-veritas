# Veritas

`Veritas` is the canonical knowledge layer for Praxis Veritas.

Use this directory for durable, topic-oriented knowledge that future runs should trust first. Prefer stable domain or pattern files such as:

- `auth.md`
- `cards/card-details.md`
- `cards/card-renewal.md`
- `inter-domain-events.md`
- `event-contract-patterns.md`

Temporary workflow artifacts may help during active work, but after `Transmute` runs, durable knowledge belongs here.

## Structure

Prefer a small number of stable documents organized by knowledge type:

- domain docs
- pattern docs
- decision docs

Subdirectories are encouraged when a domain has multiple durable subtopics. For example:

- `cards/card-details.md`
- `cards/card-renewal.md`
- `cards/card-lifecycle.md`

Examples:

- `auth.md`
- `cards/card-details.md`
- `benefits.md`
- `event-contract-patterns.md`
- `domain-boundary-patterns.md`
- `banking-transfer-confirmation-contract.md`

## What belongs here

Use `Veritas` for durable repository truth:

- domain understanding
- codebase patterns that explain how the repository is shaped
- durable decisions with rationale

Do not use `Veritas` for temporary run narrative.

## What belongs in project rules instead

If the main value of the learning is "future agents should always do X," it should usually become a project rule instead of a `Veritas` doc.

Common examples:

- testing conventions
- translation-writing conventions
- migration behavior when touching legacy files
- preferred component or styling systems for touched code
- integration conventions that already have dedicated project rule files

Use this rule:

- `Veritas` explains what is true about the repository.
- project rules explain how agents must behave because of that truth.

## Document shape

Most Veritas docs should read like the current best understanding of the topic, not like a dated log.

Common useful sections:

- `Summary`
- `Current Model`
- `Invariants`
- `Key Flows`
- `Patterns`
- `Pitfalls`
- `Decisions`
- `Related Docs`

Use the canonical Veritas template referenced by `px-transmute` when creating or heavily restructuring a doc. Keep this file focused on what Veritas is for, not on duplicating the full template structure.

## Rules

- prefer updating an existing Veritas doc over creating a new one
- create a new doc only when the knowledge has no good existing home
- use subdirectories when one domain has multiple durable subtopics
- do not store temporary narrative here
- do not use Veritas for always-on agent operating instructions like testing, translation, or migration rules; those belong in project rules
- do not duplicate dedicated project rule files inside Veritas
- keep summaries short and sections durable
- remove stale information instead of appending dated updates
- do not make future agents depend on `vault/` for durable understanding
- if a learning should change future agent behavior by default, also codify it in the adopted project's `AGENTS.md` or rule files during `Transmute`
