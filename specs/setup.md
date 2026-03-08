# Feature: README Implementation

**Status:** Ready for task breakdown
**Effort:** S
**Date:** 2026-03-08

## Problem Statement

**Who:** Contributors, potential users, anyone landing on the GitHub repo
**What:** The current README is a Dutch-language product design doc — it explains the game mechanic well but fails as a project README. It lacks: English accessibility, setup instructions, tech stack info, contribution guidance, and project status.
**Why it matters:** The README is the front door. Without a proper one, no one can evaluate, install, contribute to, or understand the project at a glance.
**Evidence:** Repo has zero setup/install instructions, no status badges, no English content, and a local file path reference (`/home/kjanat/projects/stat-kr`) that's meaningless to anyone else.

## Proposed Solution

Replace the current README with a proper bilingual (English-primary) project README that:

1. Preserves the excellent Dutch game description as the project's identity/flavor
2. Adds all standard README sections expected of an open-source project
3. Marks the project as pre-implementation (no misleading "install X" when there's nothing to install yet)

The existing Dutch content moves into an collapsible "Concept (Nederlands)" section so it's preserved but doesn't block English readers.

## Scope & Deliverables

| #  | Deliverable           | Effort | Depends On |
| -- | --------------------- | ------ | ---------- |
| D1 | Write new `README.md` | S      | -          |

## Non-Goals (Explicit Exclusions)

- Choosing a tech stack (that's a separate decision)
- Writing CONTRIBUTING.md, CODE_OF_CONDUCT.md, or other ancillary docs
- Translating the Dutch content to English (we summarize in English, keep Dutch original)
- Creating mockups or screenshots (nothing to screenshot yet)

## README Structure

```markdown
# DD Ranker

One-line English description + status badge (pre-alpha / concept)

## What is DD Ranker?

2-3 sentence English summary:

- Medical differential diagnosis training tool
- Drag-and-drop ranking of diagnoses by probability
- Red flag identification for dangerous diagnoses
- Iterative refinement with new clinical info

## How It Works

English version of the game flow (numbered list):

1. Case presented: patient age, sex, chief complaint
2. Shuffle of ~8-10 possible diagnoses appears
3. Drag & drop into probability order
4. Flag dangerous diagnoses
5. Submit → instant feedback (correct/overestimated/underestimated/missed alarm)
6. New anamnesis info revealed → re-rank

## Scoring

- Ranking accuracy: Kendall tau distance
- Red flag detection score
- Speed × correctness combo

## Why This Helps

Brief English version of the pedagogical rationale:
learning relative probability, not just diagnosis lists

## Project Status

Clear status indicator:

- [x] Concept & design
- [ ] Tech stack selection
- [ ] MVP implementation
- [ ] Case data integration
- [ ] Testing & feedback
- [ ] Release

## Data Source

Reference to companion clinical reasoning materials (stat-kr repo)
— as a relative or GitHub link, NOT a local filesystem path

## Development

Placeholder sections (to be filled when stack is chosen):

- Prerequisites
- Installation
- Running locally
- Testing

## <details> Concept (Nederlands)

Collapsible section containing the original Dutch README content verbatim
(preserves the design doc for Dutch-speaking stakeholders)

## License

MIT — Kaj Kowalski 2026
```

## Data Model

N/A — this is a documentation-only change.

## API/Interface Contract

N/A.

## Acceptance Criteria

- [ ] README is valid Markdown, renders correctly on GitHub
- [ ] English-language summary explains what DD Ranker is in ≤3 sentences
- [ ] Game flow is described step-by-step in English
- [ ] Scoring system explained (Kendall tau, red flags, speed)
- [ ] Project status checklist shows current progress
- [ ] Original Dutch content preserved in collapsible `<details>` block
- [ ] No local filesystem paths (replace `/home/kjanat/projects/stat-kr` with repo link or relative reference)
- [ ] License section present
- [ ] No broken links

## Test Strategy

| Layer  | What                            | How                          |
| ------ | ------------------------------- | ---------------------------- |
| Manual | Markdown rendering              | Preview on GitHub after push |
| Manual | All links work                  | Click each link              |
| Manual | `<details>` collapses correctly | View on GitHub               |

## Risks & Mitigations

| Risk                                         | Likelihood | Impact | Mitigation                                                   |
| -------------------------------------------- | ---------- | ------ | ------------------------------------------------------------ |
| Dutch stakeholders miss the original content | Low        | Medium | Preserved verbatim in collapsible section                    |
| README becomes stale as project evolves      | Medium     | Low    | Development sections are explicit placeholders, easy to fill |

## Trade-offs Made

| Chose                                | Over                           | Because                                                        |
| ------------------------------------ | ------------------------------ | -------------------------------------------------------------- |
| English-primary with Dutch preserved | Fully bilingual side-by-side   | Wider audience; Dutch readers already have the content         |
| Placeholder dev sections             | Omitting dev sections entirely | Signals intent and provides structure for when stack is chosen |
| Collapsible Dutch section            | Separate `docs/concept-nl.md`  | Lower friction; everything in one file; discoverable           |

## Open Questions

None — this is a straightforward documentation task.

## Key Technical Decisions

- **English primary**: wider GitHub audience, Dutch preserved in collapsible block
- **Placeholder dev sections**: honest about pre-implementation status, ready to fill
- **No local paths**: replace with GitHub links or relative references

---

*Spec approved for task decomposition.*
