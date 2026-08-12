# TenXHouse Website Phase 1 Validation Report

Date: 2026-07-19  
Scope: Local Astro prototype in `03_Website/tenxhouse-astro` and website handoff supplied from Downloads.  
Production status: Blocked. Preview only.

## Handoff Interpretation

The supplied handoff states that the next correct build gate is the approved service, package and benefit ledger. It also requires that the site remain draft, reviewable and `noindex,nofollow` until production blockers are resolved.

## Local Repository Finding

The local Astro folder is not currently a Git repository. GitHub alignment is therefore still required before any deployment path can be trusted.

GitHub source named in handoff:

- Repository: `tf-tvg/main-website-tenxhouse`
- Feature branch: `feat/tenxhouse-operating-model-v2`
- Draft PR: `https://github.com/tf-tvg/main-website-tenxhouse/pull/1`

## Safety Repairs Applied Locally

- Changed site-wide preview robots meta default to `noindex,nofollow`.
- Changed `robots.txt` to `Disallow: /`.
- Removed old draft package prices from visible package cards.
- Removed old R750, R1 500 and R3 000 package options from the enquiry form.
- Removed direct WhatsApp number links while the new SIM/WhatsApp number is pending.
- Removed public address and map claims from homepage, footer and contact page.
- Removed "book a tour" language.
- Reframed package section as membership paths under review.
- Replaced LocalBusiness schema with generic WebSite schema until address and phone details are approved.

## Scan Results

Local text scan found no remaining instances of:

- old R750 / R1 500 / R3 000 pricing;
- old WhatsApp number;
- public address wording;
- tour wording;
- coworking or venue-hire terms;
- obvious private token variable names in source.

## Build Check

Build validation is blocked by dependency installation failure.

Attempted command:

```text
pnpm install
```

Result:

```text
UNABLE_TO_VERIFY_LEAF_SIGNATURE
ERR_PNPM_META_FETCH_FAIL
```

This occurred when fetching packages from the npm registry, even after escalation. It appears to be a certificate/network trust issue rather than a code issue.

## Production Blockers

- GitHub branch/PR must be inspected and aligned with the OneDrive working copy.
- Approved service, package and benefit ledger must be completed.
- WhatsApp Business number is pending new SIM confirmation.
- Public address wording is pending approval.
- Package names, prices, setup fees, VAT and terms are pending approval.
- Privacy, POPIA, membership terms, address-use and mail-handling rules are pending approval.
- Zoho Creator application/portal URLs are pending.
- HubSpot forms and property mapping are pending.
- First approved events and first six reviewed resources are pending.
- Build validation is blocked by npm certificate failure.

## Recommended Next Action

1. Confirm GitHub access/path for `tf-tvg/main-website-tenxhouse`.
2. Compare the GitHub draft PR branch with this OneDrive local repair.
3. Apply the same preview-safety repairs to the GitHub branch.
4. Resolve dependency install certificate issue.
5. Run build, accessibility, link and responsive checks.
6. Keep the PR in draft and the preview `noindex,nofollow`.
