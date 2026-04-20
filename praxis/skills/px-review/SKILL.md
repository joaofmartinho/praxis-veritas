---
name: px-review
description: "Runs automated code reviews using configurable reviewer agents. Use during or after implementation to check code quality, security, and best practices."
argument-hint: "file paths or directories to review, or 'staged' for staged git changes"
---

# Reviewing

Run automated code reviews by discovering and launching reviewer sub-agents in parallel. Each reviewer focuses on a specific concern and reports findings in a consistent format. **Findings are presented to the user — nothing is auto-fixed.**

## How a session works

### 1. Determine scope

If `$ARGUMENTS` is provided, use it as the scope:
- File paths or directories → review those files
- `staged` → review staged git changes (`git diff --cached`)
- A plan file path → review files mentioned in the plan's steps

If no arguments, ask the user what to review.

### 2. Discover reviewers

Scan `../agents/reviewers/` for all reviewer agent definitions. Each `.md` file in that directory is a reviewer to run.

If the directory is empty or doesn't exist, inform the user and stop.

By default, run only the **core reviewers**: `security`, `code-quality`, and `simplicity`. If the user specifies additional reviewers (or `all`), run those too.

### 3. Run reviewers in parallel

Launch all discovered reviewers as parallel sub-agents using `Task`. Each reviewer receives:
- The list of files to review
- **The diff only** — never send full file contents. Use `git diff` output so reviewers focus on what changed. Include enough surrounding context lines (`git diff -U8`) for reviewers to understand the change, but no more.

If a reviewer genuinely needs broader file context (e.g., to check an import at the top of a file), it can read the file itself — don't pre-load it.

### 4. Synthesize and present findings

Collect results from all reviewers and present a unified summary to the user, organized by severity:

1. **Critical** — must fix before merging (security vulnerabilities, data loss risks, broken functionality)
2. **Warning** — should fix (bugs, performance issues, missing edge cases)
3. **Suggestion** — consider improving (style, readability, minor optimizations)

For each finding, include:
- Which reviewer flagged it
- File and location
- What the issue is
- How to fix it

If no findings, report a clean review.

### 5. Write a review record only when it adds value

If the review produced meaningful findings, follow-up decisions, or risk notes worth preserving for provenance, write a **non-canonical review record** into `.ai-workflow/vault/reviews/` using the template in `.ai-workflow/vault/reviews/template.md`.

Use this filename format:
- `.ai-workflow/vault/reviews/YYYYMMDD-slug-review.md`

Review records are optional. Do **not** create one for a clean review with no substantive findings.

### 6. Fix on request

After presenting findings, ask the user which (if any) they want to fix. Only make changes the user explicitly approves.

## Reviewer agent conventions

Each reviewer in `../agents/reviewers/` must follow the output format defined in `../reviewer-output-format.md`.

## Behavioral rules

- Never auto-fix.
- Do not skip requested reviewers.
- Respect the current shape and acceptance criteria when relevant.
