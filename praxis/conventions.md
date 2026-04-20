# Shared Conventions

## Directory structure

- `.ai-workflow/veritas/` — canonical repository knowledge
- `.ai-workflow/vault/` — non-canonical run documents, run records, and archived workflow artifacts
- `.ai-workflow/local/` — optional gitignored scratch space for the active local session only
- `.ai-workflow/tags` — shared tag registry used across Veritas and run artifacts

`Veritas` is the authoritative knowledge layer. Temporary run artifacts are working memory only and must never remain the only place where durable knowledge lives after transmutation.

Run documents and run history belong in `.ai-workflow/vault/`, not in the canonical knowledge layer. Archived workflow artifacts may exist there as well, but they are non-canonical and should be treated as provenance only.

## File naming

- Veritas domain and pattern docs prefer stable topic-based names (for example `auth.md`, `cards.md`, `inter-domain-events.md`).
- Temporary run artifacts use dated slugs: `YYYYMMDD-slug.md` (for example `20260222-offline-first-sync.md`).

Shape documents use dated run slugs ending in `-shape.md`: `YYYYMMDD-slug-shape.md`.

If a run needs multiple phased records, append the phase before the suffix: `YYYYMMDD-slug-phase-1-shape.md`.

## Tags

All tracked knowledge artifacts share a single tag registry at `.ai-workflow/tags` (one tag per line, lowercase, alphabetically sorted).

Before assigning tags, read `.ai-workflow/tags` and reuse existing tags whenever they fit. Only create a new tag when nothing existing covers the concept — if you do, append it to `.ai-workflow/tags` maintaining alphabetical order.

Prefer domain-oriented tags over incidental task tags. The goal is to improve retrieval into `Veritas`, not to preserve every temporary workflow distinction forever.

## Git conventions

### Commits

Commit message format:

```
Single sentence summarizing what the commit does, ending with a full stop.

Longer description with more details about the change. Explain the why,
not just the what. Reference the plan step if helpful for context.
```

The first line must be a complete, well-formed sentence with a final full stop.

Only stage files directly related to the current change — never use `git add -A` or `git add .`.

### Branches

Use the `implement/` prefix for implementation branch names: `implement/run-slug` (e.g., `implement/offline-first-sync-phase-1`).

## Knowledge authority and retrieval

- Agents must consult `.ai-workflow/veritas/` before looking at temporary run artifacts.
- Temporary run artifacts are allowed during active work, but they are never the final source of truth.
- After `Transmute` runs, no durable knowledge should remain only in run artifacts.
- `.ai-workflow/vault/` is historical output, not canonical retrieval input. Agents should not read the vault by default when `Veritas` already contains the durable knowledge.
- Archived workflow documents may still be searched for provenance, but they must not override `Veritas`.
- If a learning changes how agents should behave in future runs, `Transmute` must also update the adopted project's `AGENTS.md` or rule files so the instruction becomes part of the normal workflow.

## Workflow stages

- `Shape` — clarify the problem, research the domain, and leave the step with an actionable implementation shape.
- `Shape` writes a non-canonical shape document into `.ai-workflow/vault/` for implementation to follow.
- `Execute` — implement the shaped work using the vault shape document as the working brief.
- `Review` — run reviewers and capture findings.
- `Transmute` — update `Veritas` first, then write the compact historical run record into `.ai-workflow/vault/`, and only then consider the work cycle complete.
- `Transmute` also updates project agent rules when the run produced a standing instruction that future agents should follow automatically.

## Status values

### Veritas documents
- `canonical` — authoritative and current
- `draft` — still being shaped before becoming canonical
- `superseded` — kept for historical context but no longer authoritative

### Run history
- Run lifecycle is tracked in `.ai-workflow/vault/`, not in the canonical knowledge layer.
- A run is not complete until `Transmute` has updated `Veritas` and written the run record.
