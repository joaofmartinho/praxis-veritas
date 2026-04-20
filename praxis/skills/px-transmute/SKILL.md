---
name: px-transmute
description: "Convert completed work into durable repository knowledge. Update Veritas first, then write the non-canonical transmutation receipt."
argument-hint: "current run, file paths, or a short run identifier"
---

# Transmute

Transmute completed work into durable repository knowledge. Update `Veritas` first, update project rules when behavior should change, then write the transmutation receipt.

## The authority rule

- `Veritas` is canonical.
- `vault/` is not canonical.
- No durable knowledge should remain only in a transmutation receipt after transmutation.

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

Only the first category belongs in `Veritas`. Use `.ai-workflow/veritas/index.md` to decide what belongs in `Veritas` versus project rules.

### 3. Update Veritas first

Update the relevant canonical docs before writing any history.

Rules:

- prefer editing an existing doc over creating a new one
- use `.ai-workflow/veritas/index.md` for structure decisions
- use `.ai-workflow/veritas/template.md` for document format
- keep docs concise and current

### 4. Update project agent rules when behavior should change

If the run produced a reusable operating rule for future agents, update the adopted project's instruction files before writing history. Do not rely on `Veritas` alone for these cases.

### 5. Write the transmutation receipt

After `Veritas` is updated, write a compact transmutation receipt using the template in `.ai-workflow/vault/transmutations/template.md`. The template declares its own filename and the fields to fill in.

The transmutation receipt is for:

- provenance
- a concise audit trail of what changed in `Veritas`
- references to updated project rules
- references to the vault artifacts that were consumed

It is not the main knowledge base and it must not restate `Veritas` in full.

### 6. Confirm transmutation

A run is only complete when:

- `Veritas` has been updated
- project agent rules have been updated when the learning changes default future agent behavior
- the transmutation receipt has been written
- no future-important knowledge remains only in temporary artifacts

## Behavioral rules

- `Veritas` first.
- Prefer updating existing docs.
- Update project agent rules when a learning should become an always-on behavior.
- Keep transmutation receipts compact.
- Preserve durable knowledge as current truth, not as dated notes.
