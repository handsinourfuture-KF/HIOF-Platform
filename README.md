# Hands In Our Future — Digital Platform

The official development home for **Aniyah's Adventures**, the **interactive Explorer Mission Journal**, the **Explorer Passport**, and **Explorer Lens**.

## Provenance and consolidation
The original planning repository is [Tee-360/Aniyah-s-Learning-Ecosystem](https://github.com/Tee-360/Aniyah-s-Learning-Ecosystem), preserved unchanged. Its README (commit `bc679de8aa28ccf4af8c152200d822f7c8da70ec`) describes a proposed monorepo layout, but the referenced files and application folders were **not present** when inspected on 2026-10-08. This repository starts from that documented architecture; it is **not** a migration of existing runnable code.

## Product surfaces
- `apps/child-web/` — child-facing, accessible interactive Colors/Space journal; designed for touch and mouse, with offline physical exploration.
- `apps/dashboards/` — parent and facilitator interfaces, with role-based access.
- `packages/core/` — consent-aware Explorer profiles, observations, events, passport history.
- `packages/content/` — versioned mission activities and media references.
- `docs/` — product requirements, learning-engineering evaluation plan, safeguarding and privacy design.

These are **planned paths**, not implemented applications yet.

## MVP: Colors/Space / Red Fuel
1. Aniyah invites the Explorer into the mission.
2. Child interacts with an approved digital Journal activity.
3. Optional adult observations and consented minimal interaction events are recorded.
4. Passport records an adventure without assigning a learning-style label or gatekeeping access.
5. Families and facilitators can review context-specific observations.

## Non-negotiables
- Children are invited to explore without passing an assessment.
- Do not classify children by fixed learning styles; observe engagement in context.
- Separate observed events from interpretations; avoid unsupported claims of mastery.
- Do not collect identifiable children's data until consent, access control, security, retention and deletion workflows are implemented and reviewed.
- The original physical Journal remains authoritative for approved mission sequence and artwork until its source files are reviewed.
- Technology supports physical play rather than replacing it.

## Milestone
Prepare an evidence-backed Explorer Lens prototype and documentation for the **November 24, 2026 Tools Competition Phase I decision**; Phase II proposal planning follows if invited.

## Next engineering step
Obtain the approved Journal assets, define interaction/event schemas, implement a fictional-profile prototype, and test accessibility and end-to-end flows.
