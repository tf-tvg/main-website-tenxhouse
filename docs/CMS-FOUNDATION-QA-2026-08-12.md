# CMS Foundation QA - 2026-08-12

## Scope

- Repository: `tf-tvg/main-website-tenxhouse`
- Local branch: `feat/tenxhouse-operating-model-v2`
- Project type: static HTML, CSS and JavaScript
- Package manager: none
- Dependency install: none
- Deployment, commit, push, merge and pull request: not performed

## Automated validation

The local commands used the Codex bundled Node.js 22 runtime; no global software or repository dependency was installed.

- `node scripts/validate-content.mjs`: passed, 18 records across six catalogues.
- `node scripts/validate-site.mjs`: passed, eight HTML files in preview mode.
- `node --check assets/js/cms-content.js`: passed.
- `node --check scripts/validate-site.mjs`: passed.
- `git diff --check`: passed.

The production validation command, `node scripts/validate-site.mjs --production`, correctly blocks deployment while preview `noindex` markers remain. Those markers must be removed deliberately only at the approved production release gate.

## Browser QA

Local base URL: `http://127.0.0.1:4173/`

| Route | Desktop 1440 x 1000 | Mobile 390 x 844 | Result |
|---|---|---|---|
| `index.html#pricing` | Three cards, correct prices, descriptions, inclusions and CTAs | Single-column cards with no clipping or horizontal overflow | Pass |
| `insights.html` | Three guides and three LinkedIn records | Six responsive records with no clipping or dead placeholder links | Pass |
| `events.html` | Approved empty state while the catalogue is empty | Empty state remains readable and contained | Pass |
| `faq.html` | Five questions and answers | Five readable responsive records | Pass |

Package values verified:

- Presence: `R795/month`
- Connect: `R1,595/month`
- Operate: `R3,950/month`

The first package CTA was exercised in the browser and opened:

`http://127.0.0.1:4173/forms.html?type=Business%20Support&package=Presence%20-%20R795%2Fmonth`

The enquiry page selected Business Support and Presence. The mobile navigation menu opened, exposed its expanded state, closed after selection and navigated from Insights to Events. No browser-console errors were recorded on the tested routes.

The publication guard was also exercised through `http://lvh.me:4173/`, which resolves to the same local server but is not an approved preview hostname. It rendered zero preview package cards and displayed the neutral commercial-review state. The enquiry form likewise omitted all preview package options and reset to `Not sure yet`, confirming that unknown and production hosts fail closed.

## Evidence

Evidence folder:

`C:\Users\shang\OneDrive\Documents\TenXHouse\03_Website\QA_Evidence\2026-08-12-cms-foundation`

Key screenshots:

- `packages-desktop-1440.png`
- `packages-mobile-390.png`
- `insights-desktop-1440.png`
- `insights-mobile-390.png`
- `events-desktop-1440.png`
- `events-mobile-390.png`
- `faq-desktop-1440.png`
- `faq-mobile-390.png`
- `mobile-menu-open-390.png`

## Remaining gates

- Review `.pages.yml` in the Pages CMS interface before granting editor access.
- Approve package commercial terms before changing package records to public.
- Add approved resource authors, reviewers, source ledgers and article bodies.
- Add approved event, hosted-company and member-benefit records.
- Replace local preview lead storage with an approved Creator or HubSpot route through a protected integration.
- Complete legal, contact, WhatsApp, analytics and production release approvals.
