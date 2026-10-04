# Implementation Rules

## Source of truth

Read these before making substantial changes:

- DESIGN_BRIEF.md
- CONTENT.md
- implementation-plan.md

## Technical rules

- Vanilla HTML, CSS and JavaScript.
- No React.
- No framework unless explicitly approved.
- No unnecessary dependencies.
- Keep design tokens centralized.
- Reuse existing CSS and JS systems.
- Do not modify backend/Python logic.
- Do not duplicate existing functionality.

## Design rules

- Editorial × Architectural × Technical × Refined.
- Preserve the existing dark green, cream, emerald and aged-brass identity.
- Fraunces for display.
- Jost for body/UI.
- Generous whitespace is intentional.
- Prefer asymmetrical editorial layouts.
- Avoid generic SaaS cards.
- Avoid excessive rounded corners.
- Avoid glassmorphism.
- Avoid neon cyberpunk.
- Avoid gaming UI.
- Avoid excessive gradients and shadows.
- Do not add decoration without conceptual purpose.

## Content rules

- Use only information supported by CONTENT.md.
- Never invent achievements, employers, responsibilities, metrics, clients, dates or outcomes.
- Do not emphasize the internship evaluation score.

## Phase discipline

- Work only on the requested phase.
- Do not redesign completed phases without explicit instruction.
- Do not automatically continue to the next phase.
- After finishing, stop and report:
  - files changed
  - files created
  - implementation summary
  - remaining issues
  - recommended next phase

## QA

After implementation check:

- broken assets
- broken links
- console errors
- responsive layout
- horizontal overflow
- accessibility basics
- animation behavior
- placeholder text