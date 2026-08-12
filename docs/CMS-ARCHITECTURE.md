# TenXHouse CMS Architecture

## Decision

The TenXHouse public website uses a Git-backed editorial CMS while remaining a static GitHub Pages site.

Pages CMS is the editing layer because it works directly with files in a GitHub repository and does not require a separate content database. Its repository configuration is `.pages.yml`.

This decision does not make Pages CMS the system of record for members, leads, payments or private operational activity.

## System boundaries

| Information | System of record | Public website role |
|---|---|---|
| Packages and public service summaries | Approved GitHub catalogue, later synchronised from Creator if required | Render approved public fields |
| Insights and public resources | GitHub CMS files; governed sources in SharePoint/OneDrive | Render approved editorial records |
| Public event listings | Zoho Creator, exported to the public catalogue | Render approved event fields and registration routes |
| FAQs | GitHub CMS files | Render approved answers |
| Hosted-company public profiles | Creator or approved GitHub catalogue | Render approved public descriptions |
| Member-benefit public summaries | Zoho Creator | Render safe summaries; claims remain in the portal |
| Membership applications and status | Zoho Creator | Explain the journey and link to the approved form |
| Leads, consent and attribution | HubSpot | Use approved forms or a protected server-side adapter |
| Agreements and supporting documents | SharePoint/OneDrive | Link only through authorised workflows |
| Internal tasks and exceptions | ClickUp | No direct public exposure |

## Repository structure

- `.pages.yml`: Pages CMS editor configuration.
- `content/packages.json`: package catalogue used by the website.
- `content/resources.json`: Insights and resource metadata.
- `content/events.json`: approved public event feed/export target.
- `content/faqs.json`: public FAQ records.
- `content/hosted-companies.json`: public-safe hosted-company catalogue.
- `content/benefits.json`: public-safe benefit summaries only.
- `assets/js/cms-content.js`: safe client-side renderer and publication guard.
- `scripts/validate-content.mjs`: local and CI validation.
- `.github/workflows/content-validation.yml`: pull-request and feature-branch validation.

## Publication controls

Every record has a `governance` object:

- `approval_status`: Draft, Approved for internal testing, Approved for public launch, Paused or Retired.
- `visibility`: hidden, preview or public.
- `approval_owner`: person accountable for approval.
- `review_date`: next content review date.

The renderer applies two gates:

1. Localhost, the approved RawGitHack preview host and `staging.tenxhouse.co.za` may display `preview` records approved for internal testing.
2. Every other host, including GitHub Pages and the main domain, displays only `public` records with `Approved for public launch` status.

The static HTML contains neutral empty states rather than unpublished catalogue copy. If the content request or renderer fails, the site therefore fails closed instead of exposing preview records.

Package enquiry options are generated from the same approved catalogue as the pricing cards. Preview-only package values are therefore omitted automatically on production hosts.

The validator blocks a `public` record without public-launch approval and a review date. Public resources and events have additional source, reviewer, date and registration checks.

These controls are a publishing safeguard, not a privacy boundary. The GitHub repository is public. Never place private, confidential or personal operational data in any CMS catalogue, including hidden records.

## Editorial workflow

1. Source evidence and working files are maintained in SharePoint/OneDrive.
2. A public-safe record is created or updated in Pages CMS on a feature branch.
3. Content validation runs in GitHub Actions.
4. The preview is reviewed on desktop and mobile.
5. Commercial, factual, legal and editorial owners approve the record.
6. The record is changed to `Approved for public launch` and `public` only after approval is recorded.
7. A reviewed pull request is merged to `main` at the production release gate.

Pages CMS must not be used to edit `main` directly while the website is in preview. Content changes should remain on a feature branch and follow the GitHub/OneDrive alignment rule.

## CMS activation

The repository configuration can be reviewed before granting any external access. When approved:

1. Open `https://app.pagescms.org/`.
2. Sign in with GitHub.
3. Install the Pages CMS GitHub App for `tf-tvg/main-website-tenxhouse` only.
4. Select `feat/tenxhouse-operating-model-v2` while the site remains in preview.
5. Confirm that Packages, Hosted Companies, Benefits, Insights and Resources, Events, and FAQs appear.
6. Make a harmless test change on the feature branch and confirm that content validation passes.

No Pages CMS access is required to develop or validate the site locally.

## Next build slices

1. Finish the shared design-system refactor and remove the Tailwind production CDN dependency.
2. Add article-detail templates once approved body copy and source ledgers exist.
3. Add event-detail states and a Creator public-feed import contract.
4. Wire hosted-company profiles and benefits after their public descriptions and terms are approved.
5. Configure the protected lead-submission adapter and HubSpot mapping.
6. Build and test the Zoho Creator application, portal and operational workflows.
7. Add analytics, approved legal content, accessibility automation and production release checks.

## Approval gaps

- The current package names and prices are approved for internal website testing but still require alignment with the commercial ledger before merge to `main`.
- Resource titles are preview records; author, reviewer, source ledgers and full article copy remain approval dependencies.
- No event or member benefit is public until a real approved record exists.
- Hosted-company descriptions and member offers remain hidden until approved.
