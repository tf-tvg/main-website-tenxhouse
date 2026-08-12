# TenXHouse Website Implementation Backlog

## Current execution status

| Build area | Status | Evidence / next gate |
|---|---|---|
| Repository and responsive baseline | Complete for current feature preview | Local desktop/mobile QA and commit `bfc9afe` |
| Design-system refactor | Pending | Extract shared CSS/JS and remove Tailwind production CDN |
| Structured content models | Complete locally; review pending | `.pages.yml`, six catalogues, safe renderer, preview/production gates and validation |
| CMS-backed public routes | Complete locally; approval pending | Packages, Insights, Events and FAQs pass desktop/mobile QA; see `CMS-FOUNDATION-QA-2026-08-12.md` |
| CMS activation | Pending owner approval | Install Pages CMS GitHub App for this repository only and test on the feature branch |
| Zoho Creator preparation | Blueprint complete; implementation pending | Confirm fields, roles, packages, terms and public-feed contract |
| Membership, benefits, resources and events | Approval-dependent | Complete approved service/package/benefit ledger and source records |
| HubSpot and lead submission | Pending | Approve form/adapter route and property mapping |
| Legal, analytics and production release | Blocked | Complete approval and release gates |

## P0 — factual and risk corrections

| Task | Acceptance criteria | Primary tool |
|---|---|---|
| Remove wrong category language | No coworking, meeting-room, venue-hire, tour or workspace claims remain | GitHub/Codex |
| Confirm legal/contact details | Real entity, registration, email, phone, address and information officer approved | SharePoint + legal source |
| Approve core service schedule | Direct TenXHouse services, exclusions and service levels signed off | SharePoint / Creator |
| Approve packages and pricing | Rand price, VAT, setup fee, term, renewal and cancellation approved | Creator + finance source |
| Approve hosted-company profiles | Four profiles include correct descriptions and links | Creator |
| Configure working CTAs | Every public CTA reaches a tested Creator or HubSpot destination | Creator + HubSpot + GitHub |
| Replace legal placeholders | POPIA notice and terms approved | SharePoint + GitHub |
| Remove noindex at production gate | Only after every launch blocker is passed | GitHub |

## P1 — operating foundation

| Task | Acceptance criteria | Primary tool |
|---|---|---|
| Build Creator app | Core modules, roles, statuses and audit logs exist | Zoho Creator |
| Build membership application | Validation, duplicate check, reference and status work | Zoho Creator |
| Build member portal | Member sees only own records and eligible content | Zoho Creator |
| Connect HubSpot | Tested upsert and consent/lifecycle mapping; no duplicates | HubSpot + Creator |
| Configure SharePoint records | Folder convention and document links work | SharePoint |
| Configure ClickUp triggers | Tasks created only for actionable exceptions/work | ClickUp + Creator |
| Build benefit ledger | At least three approved offers with full terms | Creator |
| Build Events workflow | Event approval, public feed, RSVP and attendance tested | Creator |
| Build Resources workflow | Source ledger, reviewer, publish and review-date fields tested | Creator + SharePoint |
| Implement analytics | Page, CTA, form, event and resource tracking verified | GitHub + HubSpot |

## P2 — public content and conversion

| Task | Acceptance criteria | Primary tool |
|---|---|---|
| Final Figma design | Desktop/mobile components and states approved | Figma |
| Produce brand assets | Approved company, benefit, resource and event assets | Canva |
| Publish resource launch set | Six reviewed guides and three tools/templates live | SharePoint + GitHub/CMS |
| Publish event launch set | Approved upcoming events and useful past recaps live | Creator + GitHub |
| Publish FAQs | Address, membership, support, billing and benefits answers approved | Creator + GitHub |
| Add structured data | Organisation, Article, Event and FAQ markup validated | GitHub/Codex |
| Accessibility QA | Keyboard, contrast, headings, labels and reduced motion pass | GitHub/Codex |
| Mobile QA | All journeys work on common mobile widths | GitHub/Codex |
| Conversion QA | HubSpot attribution and Creator operational records reconcile | HubSpot + Creator |

## Open approval dependencies

- exact TenXHouse direct services;
- approved membership packages and price points;
- whether and how the business address may be used;
- mail handling and call-answering scope;
- payment provider and payment workflow;
- legal entity and contact details;
- TenOne member offer;
- Xcolab Africa member offer;
- PrintaLa member offer;
- KaMuntu company description and member offer;
- partner list and benefits;
- approved upcoming event calendar;
- resource authors and reviewers;
- privacy and membership terms.

## Definition of done for production

- No unsupported factual claim.
- No placeholder contact or registration detail.
- No dead form or CTA.
- No private secret in the repository.
- All critical workflows tested from mobile.
- Creator, HubSpot, SharePoint and ClickUp records reconcile for test journeys.
- Legal and commercial approvals are linked in the release record.
- Pull request is reviewed and merged to `main`.
