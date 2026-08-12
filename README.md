# TenXHouse Website — Operating Model V2

This repository is being rebuilt around the corrected TenXHouse business model.

## Confirmed direction

- TenXHouse hosts TenOne Venture Group, Xcolab Africa, PrintaLa and KaMuntu.
- TenXHouse is not a coworking, meeting-room or venue-hire business.
- Membership connects the approved TenXHouse core proposition to selected hosted-company and partner benefits.
- The website must be a useful source of entrepreneur information and include a dedicated Events tab.
- Zoho Creator is the proposed operational app and secure member portal.
- HubSpot remains the CRM, lead-source and marketing-consent system.
- ClickUp manages execution; SharePoint/OneDrive governs documents; Outlook/Calendar supports communication; Figma and Canva support design; GitHub/Codex controls code and releases.

## Current feature branch

`feat/tenxhouse-operating-model-v2`

The branch currently contains:

- a responsive one-page implementation preview;
- corrected positioning and explicit market exclusions;
- sections for Membership, Member Benefits, Hosted Companies, Resources and Events;
- a Zoho Creator-led membership workflow;
- no unapproved pricing, discount or legal claims;
- disabled operational CTAs until approved Creator/HubSpot URLs are configured;
- `noindex,nofollow` so the preview is not treated as production content;
- an operating-model document, Creator blueprint, implementation backlog, release gate, service/package/benefit ledger and validation records.
- a Git-backed Pages CMS configuration and structured catalogues for packages, resources, events, FAQs, hosted companies and benefits;
- a publication guard that separates preview-approved content from production-approved content;
- automated structured-content validation for feature branches and pull requests.

## Preferred next direction

As of 2026-07-20, the preferred direction is the current OneDrive working-site style rather than the stripped-down one-page GitHub preview.

The next GitHub implementation should preserve the preferred OneDrive direction:

- practical landing-page flow;
- visible package-card section;
- business-address and support positioning;
- forms, insights, events, contact, FAQ, privacy and terms pages;
- stronger conversion routes.

This must still remain draft/preview-only until commercial, legal and contact details are approved. The WhatsApp number is pending a new SIM card and must not be treated as final.

## Documentation

- `docs/WEBSITE-OPERATING-MODEL.md`
- `docs/ZOHO-CREATOR-BLUEPRINT.md`
- `docs/IMPLEMENTATION-BACKLOG.md`
- `docs/WEBSITE-RELEASE-GATE.md`
- `docs/SERVICE-PACKAGE-BENEFIT-LEDGER.md`
- `docs/PHASE1-VALIDATION-REPORT.md`
- `docs/GITHUB-ONEDRIVE-ALIGNMENT-CHECKLIST.md`
- `docs/PREFERRED-WEBSITE-DIRECTION.md`
- `docs/CMS-ARCHITECTURE.md`
- `docs/CMS-FOUNDATION-QA-2026-08-12.md`

## Editorial CMS

Pages CMS provides the editing interface for public-safe website content stored in this repository. The CMS does not hold leads, member records, payments, benefit claims, agreements or private documents.

- Editor configuration: `.pages.yml`
- Structured content: `content/`
- Local validation: `node scripts/validate-content.mjs`
- Static-site validation: `node scripts/validate-site.mjs`
- Operating and activation guide: `docs/CMS-ARCHITECTURE.md`

Use the feature branch for CMS editing while the website remains in preview. A merge to `main` remains the production deployment gate.

## GitHub and OneDrive release rule

Always build through GitHub and OneDrive before deploying to the main domain.

- GitHub controls source code, branches, pull requests, deployment history and technical review evidence.
- OneDrive controls handoff files, source documents, business approvals, release records and test evidence exports.
- If GitHub and OneDrive disagree, production deployment is blocked.
- Do not deploy local-only changes to the main TenXHouse domain.
- Keep preview branches and previews `noindex,nofollow` until final business, commercial, legal and technical approval.

## Integration rule

Never commit Zoho Creator OAuth secrets, HubSpot private app tokens, Microsoft Graph credentials or other private keys to this repository.

The public site may:

1. link or embed approved published Zoho Creator forms/pages;
2. link or embed approved HubSpot forms;
3. read sanitised public data feeds;
4. call a secured server-side adapter when protected APIs are required.

## Production release gate

Do not merge the feature branch to `main` until:

- services, packages and Rand prices are approved;
- the four hosted-company profiles are approved;
- at least three member benefits have complete terms;
- useful launch resources are written, sourced and reviewed;
- events and registration routes are approved;
- all Creator and HubSpot destinations are working;
- POPIA/privacy and membership terms are approved;
- WhatsApp, phone, public address and email details are approved;
- accessibility, mobile, analytics and end-to-end workflow QA pass.

The existing GitHub Pages workflow deploys the repository root when changes are pushed to `main`.
