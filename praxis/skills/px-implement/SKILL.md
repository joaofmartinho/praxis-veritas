---
name: px-implement
description: "Executes shaped work by writing code. Use when a piece of work has already been shaped and is ready for implementation."
argument-hint: "a vault shape document path, current shape, or a short description of the work to implement"
---

# Implementing

Execute shaped work by writing code. Follow the implementation shape precisely. **This is the only skill that produces code.**

## How a session works

### 1. Load canonical knowledge and the implementation shape

Before doing implementation work:

- read the relevant documents in `.ai-workflow/veritas/`
- treat `Veritas` as the canonical source of repository knowledge
- only then load the current shape document from `.ai-workflow/vault/shapes/`
- do **not** treat the vault as a substitute for canonical understanding
- do **not** read any other vault artifacts unless the user explicitly asks for vault history or provenance

If `$ARGUMENTS` is provided, treat it as the shaping context:

- a path to a shape document under `.ai-workflow/vault/shapes/`
- a short description of the already-shaped work
- or "current shape" when the shaping context is already clear in the thread

Otherwise, ask the user what shaped work to implement.

Prefer using the vault shape document whenever one exists. That document is the default implementation brief produced by `px-shape`, but it complements `Veritas` rather than replacing it.

If a vault shape document exists for this run, use it. Do not ignore it and re-plan from scratch in the implementation step.

If `Veritas` and the shape document seem inconsistent:

- trust `Veritas` as the canonical source
- use the shape document as the current run handoff
- stop and resolve the mismatch instead of guessing

Before writing code, make sure you understand:

- the goal and desired outcome
- the chosen direction
- the main affected areas
- the constraints and rollout notes
- the acceptance criteria

If the shaping context is unclear or incomplete, stop and clarify rather than improvising.

### 2. Set up a branch

Before doing anything with Git, **always ask the user** what they'd like to do. Present these options:

1. **Stay on the current branch** — continue working on whatever branch is currently checked out.
2. **Create a new branch from the current branch** — use a descriptive name based on the plan slug (e.g., `implement/offline-first-sync-phase-1`).
3. **Something else** — let the user specify (e.g., branch from `main`, use a custom name, create a Git worktree, etc.).

Wait for the user's answer before proceeding. Follow their choice exactly.

### 3. Implement step by step

Work through the shaped implementation in small, verifiable units. For each unit:

1. Confirm what you're about to do
2. Write the code
3. Verify it works (run tests, type checks, or whatever validation is appropriate)
4. Commit the work (see Git conventions below)
5. Move to the next step

If something in the shape is ambiguous or doesn't work as expected, stop and ask the user rather than guessing. If execution materially changes the shape, update the vault shape document so it stays accurate for the remainder of the run.

### 4. Verify acceptance criteria

After implementation is complete, go through each acceptance criterion from the shaping context and verify it is met. Report the results to the user:

- [ ] Criterion — ✅ met / ❌ not met (explain why)

If any criteria are not met, discuss with the user whether to address them now or defer.

### 5. Hand off to automated review

Once implementation is complete and acceptance criteria are verified, **do not run px-review in this thread**. The implementation thread already has a large context — running reviewers here would duplicate all file contents into sub-agents unnecessarily.

Instead, tell the user to run px-review in a fresh thread (or use `handoff` to start one). For example:

> "Implementation is complete. To run the automated review with a clean context, start a new thread and invoke **px-review** against the changed files."

### 6. Prepare for transmutation

After implementation and review are complete:

- keep the vault shape document accurate if implementation materially changed the plan
- mention any meaningful implementation deviations so `px-review` and `px-transmute` inherit the right context
- make sure the work can be transmuted cleanly into `Veritas`
- do not treat vault shape documents as canonical knowledge
- hand off to `px-transmute` once the work and review are settled

## Git conventions

Follow the Git conventions in @../../conventions.md.

Commits should tell a story to reviewers (AI or human). It is fine to have multiple commits per step if they make logical sense — prefer meaningful, reviewable units over one giant commit.

## Behavioral rules

- **Follow the shape.** The work was shaped for a reason. Don't deviate without the user's explicit agreement.
- **Work incrementally.** Small changes, verified as you go. Don't write all the code at once and hope it works.
- **Stop on ambiguity.** If something is unclear, ask. Don't interpret creatively.
- **Don't over-engineer.** Implement exactly what the shaped scope calls for. No extra features, no "while we're here" improvements.
- **Test as you go.** Run relevant tests after each step, not just at the end.
- **Don't skip the review.** Always hand off to px-review after implementation.
- **Start from Veritas and the current shape document.** Do not read any other vault artifacts unless the user explicitly asks for vault history or provenance.
- **Batch related edits.** When a step requires multiple changes to the same file, make them all in sequence after a single read, then run tests once. Don't interleave reads and edits on the same file.
