# Veritas

`Veritas` is the canonical knowledge layer for Praxis Veritas.

Use this directory for durable, topic-oriented knowledge that future runs should trust first. Prefer stable domain or pattern files such as:

- `auth.md`
- `cards.md`
- `inter-domain-events.md`
- `testing-patterns.md`

Temporary workflow artifacts may help during active work, but after `Transmute` runs, durable knowledge belongs here.

## Structure

Prefer a small number of stable documents organized by knowledge type:

- domain docs
- pattern docs
- decision docs

Examples:

- `auth.md`
- `benefits.md`
- `migration-safety.md`
- `translation-component-patterns.md`
- `banking-transfer-confirmation-contract.md`

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
- do not store temporary narrative here
- keep summaries short and sections durable
- remove stale information instead of appending dated updates
- do not make future agents depend on `vault/` for durable understanding
- if a learning should change future agent behavior by default, also codify it in the adopted project's `AGENTS.md` or rule files during `Transmute`
