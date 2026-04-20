# Praxis Veritas

![Praxis](assets/hero.png)

_From Greek, praxis: the work of putting ideas into practice. From Latin, veritas: the durable knowledge that remains._

A portable AI-assisted development workflow. Shape, execute, review, and transmute — each cycle turns work into durable repository knowledge and a compact repository history.

Praxis Veritas is built around knowledge compaction. Temporary workflow artifacts may still help agents think and execute, but they are not the final goal and they are not meant to become the repository's long-term memory. The goal is to end each cycle with `Veritas`: a canonical, curated, topic-oriented knowledge layer that future agents can trust first, plus compact non-canonical vault artifacts stored separately inside the repo.

Inspired by [Every's Compound Engineering guide](https://every.to/guides/compound-engineering) and its core principle: **every unit of engineering work should make subsequent units easier, not harder.**

### Why Praxis Veritas?

**Project and technology agnostic.** Praxis Veritas is not tied to any language, framework, or tech stack. It works with any codebase — drop it into an Elixir project, a React app, a Rust CLI, or a Rails monolith. The skills describe _how to work_, not _what to work on_.

**Knowledge compounding.** Workflow artifacts are temporary. `Transmute` merges durable conclusions into `Veritas`, and when a learning should become an always-on instruction, it also updates the adopted project's agent rules so future sessions follow it by default.

**Separate history without canonical drift.** Active non-canonical run documents and completed run receipts live in a dedicated in-repo vault. `vault/shapes/` is the implementation handoff, `vault/reviews/` stores meaningful review outputs when needed, and `vault/transmutations/` stores compact receipts of what was promoted into `Veritas`.

**Context window efficient.** Every design decision respects the limited context window of AI agents. Shared conventions live in one file, referenced by many. The goal: spend tokens on the real work, not on infrastructure.

**Tool agnostic.** No dependency on a specific AI coding tool. Skills and agents use standard markdown with YAML frontmatter, compatible with [Amp](https://ampcode.com), [Claude Code](https://code.claude.com), [Cursor](https://cursor.com), [OpenCode](https://opencode.ai), and similar tools.

## The Cycle

```
px-shape → px-implement → px-review → px-transmute
                        │                    │
                        └──── findings ─────┴──→ Veritas
```

1. **px-shape** — Clarify the problem, research the codebase and domain, and write a non-canonical shape document such as `.ai-workflow/vault/shapes/20260419-user-onboarding-shape.md`.
2. **px-implement** — Execute the shaped work step by step using that vault shape document as the implementation brief.
3. **px-review** — Run configurable reviewer agents in parallel against the changed code. Findings are presented, not auto-fixed. If review produces meaningful findings or risk notes worth preserving, write a compact review record into `.ai-workflow/vault/reviews/`.
4. **px-transmute** — Convert durable outcomes from shaping, implementation, and review into `Veritas`, update project agent rules when the learning should change future default behavior, then write a compact transmutation receipt into `.ai-workflow/vault/transmutations/`. Temporary artifacts remain non-canonical after transmutation.

## Components

### Skills

Core skills implement the full development cycle and are always installed.

| Skill           | Description                                                                          |
| --------------- | ------------------------------------------------------------------------------------ |
| `px-shape`      | Clarify the work and write the implementation brief into `vault/shapes/`             |
| `px-implement`  | Execute the shape document step by step, committing meaningful units of work         |
| `px-review`     | Run configurable reviewer agents; findings are presented, and meaningful ones may be written to `vault/reviews/` |
| `px-transmute`  | Update `Veritas` and write the mandatory compact receipt into `vault/transmutations/` |

Optional skills are project-specific. Select them during `praxis-veritas init` or change your selection anytime with `praxis-veritas components`.

| Skill           | Description                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- |
| `agent-browser` | Browser automation via CLI — navigate pages, fill forms, extract data, and test web apps |
| `figma-to-code` | Fetch Figma designs via MCP and implement them as React components                       |
| `mobile-mcp`    | Automate iOS simulators and Android emulators for mobile app testing                     |

### Reviewers

All reviewers are optional. They run in parallel during the px-review skill. Add project-specific ones or remove built-in ones by editing the `agents/reviewers/` directory inside your tool's config folder (e.g., `.agents/agents/reviewers/` for Amp Code, `.claude/agents/reviewers/` for Claude Code).

| Reviewer              | Description                                                                     |
| --------------------- | ------------------------------------------------------------------------------- |
| `agent-accessibility` | Ensures code stays readable and navigable for AI agents                         |
| `architecture`        | Checks for layer violations and design pattern consistency                      |
| `code-quality`        | Reviews for bugs, logic errors, and general correctness                         |
| `data-integrity`      | Flags unsafe migrations, missing constraints, and transaction risks             |
| `pattern-recognition` | Checks for deviations from established codebase patterns and naming conventions |
| `performance`         | Flags N+1 queries, unnecessary allocations, and performance anti-patterns       |
| `security`            | Reviews against OWASP Top 10 and other common vulnerabilities                   |
| `simplicity`          | Flags over-engineering and unnecessary complexity                               |

## Getting Started

### Prerequisites

- An AI coding agent that supports skills/agents (e.g., [Amp](https://ampcode.com), [Claude Code](https://code.claude.com), [Cursor](https://cursor.com), [OpenCode](https://opencode.ai))
- [Git](https://git-scm.com/)
- [ripgrep](https://github.com/BurntSushi/ripgrep) (`rg`) — fast text search
- [ast-grep](https://github.com/ast-grep/ast-grep) (`sg`) — structural/AST-aware code search (optional, recommended)
- [agent-browser](https://github.com/vercel-labs/agent-browser) — browser automation CLI (optional, required by `agent-browser` skill): `npm install -g agent-browser && agent-browser install`
- [mobile-mcp](https://github.com/mobile-next/mobile-mcp) prerequisites (optional, required by `mobile-mcp` skill): Node.js v22+, Xcode CLI tools (iOS), Android SDK Platform Tools (Android)

### Installation

The recommended way to install Praxis Veritas is via the CLI (requires Node.js 18+):

```bash
npx github:joaofmartinho/praxis-veritas init
```

The `init` command walks you through an interactive setup:
1. **Tool selection** — choose which AI coding tools you use (Amp Code, Claude Code, Cursor, OpenCode). Praxis installs files directly into each tool's expected directory (`.agents/`, `.claude/`, `.cursor/`, `.opencode/`).
2. **Component selection** — choose which optional skills and reviewers to install.

If the current project already has an older Praxis installation tracked by `.praxis-manifest.json`, `init` detects it and offers to migrate it to Praxis Veritas instead of starting from scratch.

It then copies all files, installs the `.ai-workflow/` starter files, generates MCP configs for selected tools, and writes a `.praxis-veritas-manifest.json` file to track installed files. Commit `.praxis-veritas-manifest.json` to version control so the CLI can detect changes on future updates.

To update to the latest version:

```bash
npx github:joaofmartinho/praxis-veritas update
```

The update command fetches the latest files from the Praxis repo's main branch, applies changes, and prompts you before overwriting any files you've locally modified.

To change which optional components (skills and reviewers) are installed:

```bash
npx github:joaofmartinho/praxis-veritas components
```

This opens an interactive multi-select where you can toggle optional skills (like `agent-browser`, `figma-to-code`, `mobile-mcp`) and reviewers. Core skills are always installed and cannot be removed. MCP configs are automatically regenerated for all enabled tools to reflect the new selection.

To check the status of managed files:

```bash
npx github:joaofmartinho/praxis-veritas status
```

All commands that fetch from GitHub support a `--ref` flag to target a specific branch, tag, or commit SHA instead of `main`:

```bash
npx github:joaofmartinho/praxis-veritas init --ref my-feature-branch
npx github:joaofmartinho/praxis-veritas update --ref v2.0.0
```

#### Manual installation

If you don't use Node.js, copy the contents of the `praxis/` directory from this repo into your tool's config directory (e.g., `.agents/` for Amp Code, `.claude/` for Claude Code, `.cursor/` for Cursor), and copy the `.ai-workflow/` starter files into the target project:

```bash
cp -r path/to/praxis/praxis/* your-project/.agents/
cp -r path/to/praxis/.ai-workflow your-project/.ai-workflow
```

Note that manual copies won't receive automatic updates or multi-tool support.

### Usage

Invoke skills by name through your AI agent:

```
/skill px-shape a better way to handle user onboarding
/skill px-implement .ai-workflow/vault/shapes/20260419-user-onboarding-shape.md
/skill px-review staged
/skill px-transmute current run
```

## Project Structure

```
praxis/
├── conventions.md                        # Shared conventions and authority rules
├── reviewer-output-format.md             # Shared output format for all reviewers
├── agents/
│   ├── codebase-explorer.md
│   ├── knowledge-reviewer.md
│   ├── external-researcher.md
│   └── reviewers/
└── skills/
    ├── px-shape/
    ├── px-implement/
    ├── px-review/
    ├── px-transmute/
    └── ...

.ai-workflow/
├── tags                                  # Shared tag registry
├── veritas/                              # Canonical knowledge
├── vault/                                # Non-canonical run documents and receipts
│   ├── shapes/                           # Required shape docs used by px-implement
│   ├── reviews/                          # Optional review records with meaningful findings
│   └── transmutations/                   # Required compact receipts of Veritas and rule updates
├── local/                                # Optional gitignored scratch space
```

## Customization

### Adding project-specific reviewers

Drop a `.md` file into the `agents/reviewers/` directory inside your tool's config folder (e.g., `.agents/agents/reviewers/` for Amp Code). The px-review skill discovers and runs all reviewers in that directory automatically. Follow the output format in `reviewer-output-format.md`.

Example: create `agents/reviewers/elixir-conventions.md` for Elixir-specific checks.

### Removing default reviewers

Delete any reviewer file you don't need. For example, remove `data-integrity.md` if your project doesn't use a database.

### Tags

All tracked artifacts share a single tag registry at `.ai-workflow/tags`. Tags are maintained automatically — the skills read existing tags before assigning new ones to keep vocabulary consistent.

### Environment variables

Some skills require environment variables to connect to external services:

| Variable        | Required by     | Description                                                                                                                                                                     |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FIGMA_API_KEY` | `figma-to-code` | [Figma personal access token](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens) with read permissions on _File content_ and _Dev resources_ |

### Tool Adapters

Tools are selected during `praxis-veritas init`. You can also add or remove tools later:

```bash
# Add tools (installs files + generates MCP config)
npx github:joaofmartinho/praxis-veritas tool add claude-code cursor

# Remove a tool (deletes its Praxis Veritas-managed files and config)
npx github:joaofmartinho/praxis-veritas tool remove cursor

# See available adapters and which are enabled
npx github:joaofmartinho/praxis-veritas tool list
```

Each adapter installs Praxis Veritas files to the tool's expected directory and generates tool-specific MCP configuration:

| Tool          | File directory | MCP config                                                                       |
| ------------- | -------------- | -------------------------------------------------------------------------------- |
| `amp-code`    | `.agents/`     | Reads per-skill `mcp.json` natively (no generation needed)                       |
| `claude-code` | `.claude/`     | `.mcp.json` at project root with `{ "mcpServers": { ... } }` format             |
| `cursor`      | `.cursor/`     | `.cursor/mcp.json` with `${env:VAR}` env var syntax                              |
| `opencode`    | `.opencode/`   | `opencode.json` with `{env:VAR}` syntax, merged `command` array, `type: "local"` |

Generated MCP configs contain env var _references_ (e.g., `${FIGMA_API_KEY}`), not secrets — they are safe to commit so the whole team benefits.

When you add or remove components with `praxis-veritas components`, or update with `praxis-veritas update`, the tool configs are automatically regenerated for all enabled tools.

### File templates

Templates live under each skill's `reference/` directory and support progressive disclosure when a written artifact is useful.

## Design Principles

- **Veritas is canonical** — future sessions should rely on `Veritas` first, not on temporary run artifacts or `vault/`.
- **Transmutation over accumulation** — work should end by updating durable knowledge, not by leaving a pile of dated files behind.
- **Vault is secondary** — `vault/shapes/`, `vault/reviews/`, and `vault/transmutations/` support implementation, provenance, and auditability, but `Veritas` must stand on its own after transmutation.
- **Traceability without dependence** — temporary run artifacts and transmutation receipts can support provenance, but `Veritas` must stand on its own after transmutation.
- **Configurability** — Reviewers are discoverable by convention. Add or remove them per project without changing any configuration.

## License

MIT
