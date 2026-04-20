---
name: px-implement
description: "Executes shaped work by writing code. Use when a piece of work has already been shaped and is ready for implementation."
argument-hint: "a vault shape document path, current shape, or a short description of the work to implement"
---

# Implementing

Execute shaped work by writing code. Follow the implementation shape precisely. **This is the only skill that produces code.**

## How a session works

### 1. Load canonical knowledge and the implementation shape

Read the relevant documents in `.ai-workflow/veritas/` first. Then load the current shape document from `.ai-workflow/vault/shapes/`. Do not read any other vault artifacts unless the user explicitly asks for vault history or provenance.

If `$ARGUMENTS` is provided, treat it as the shaping context:

- a path to a shape document under `.ai-workflow/vault/shapes/`
- a short description of the already-shaped work
- or "current shape" when the shaping context is already clear in the thread

Otherwise, ask the user what shaped work to implement.

Prefer using the vault shape document whenever one exists. That document is the default implementation brief produced by `px-shape`. Do not ignore it and re-plan from scratch in the implementation step.

If `Veritas` and the shape document seem inconsistent:

- trust `Veritas` as the canonical source
- use the shape document as the current run handoff
- stop and resolve the mismatch instead of guessing

Before writing code, make sure you understand the goal, chosen direction, affected areas, constraints, and acceptance criteria.

### 2. Set up a branch

Before doing anything with Git, ask the user what they want to do with branches and follow their choice exactly.

### 3. Implement step by step

Work through the shaped implementation in small, verifiable units. For each unit:

1. Confirm what you're about to do
2. Write the code
3. Verify it works (run tests, type checks, or whatever validation is appropriate)
4. Commit the work (see Git conventions below)
5. Move to the next step

If something in the shape is ambiguous or doesn't work as expected, stop and ask the user rather than guessing. If execution materially changes the shape, update the vault shape document.

### 4. Verify acceptance criteria

After implementation is complete, go through each acceptance criterion from the shaping context and verify it is met.

- [ ] Criterion — ✅ met / ❌ not met (explain why)

### 5. Hand off to automated review

Once implementation is complete and acceptance criteria are verified, do **not** run `px-review` in the same thread. Tell the user to run it in a fresh thread.

### 6. Prepare for transmutation

After implementation and review are complete:

- keep the vault shape document accurate if implementation materially changed the plan
- mention any meaningful implementation deviations so `px-review` and `px-transmute` inherit the right context
- make sure the work can be transmuted cleanly into `Veritas`
- hand off to `px-transmute` once the work and review are settled

## Git conventions

Follow the Git conventions in @../../conventions.md.

Commits should tell a story to reviewers (AI or human). It is fine to have multiple commits per step if they make logical sense — prefer meaningful, reviewable units over one giant commit.

## Behavioral rules

- Follow the shape. Do not deviate without the user's explicit agreement.
- Work incrementally and verify as you go.
- Stop on ambiguity.
- Do not over-engineer.
- Start from `Veritas` and the current shape document only.
