# TenXHouse Website Release Gate

This release gate applies before any deployment to the main TenXHouse domain.

## Non-Negotiable Rule

Always build through GitHub and OneDrive before deploying to the main domain.

## Required Records

| Area | Required Evidence |
|---|---|
| GitHub | Branch name, pull request link, commit history, review notes and deployment status |
| OneDrive | Handoff file, source ledger, approval notes, source documents and test evidence |
| Preview | Preview URL, `noindex,nofollow` confirmation, responsive checks and link/form tests |
| Commercial | Approved services, packages, pricing, terms and benefits |
| Legal | Approved privacy, POPIA, membership terms, address-use and mail-handling rules |
| Operations | Approved Zoho Creator, HubSpot, ClickUp and SharePoint routing |

## Main Domain Release Checklist

- GitHub branch or pull request exists.
- OneDrive handoff is updated.
- No local-only change is being deployed.
- No secrets or private tokens are exposed.
- Preview remains `noindex,nofollow` until final approval.
- Public address, phone, WhatsApp, pricing, benefits and events are approved.
- Forms and CTAs route to approved Zoho Creator, HubSpot or safe server-side endpoints.
- Final approval is recorded before production deployment.

## Current Status

Production deployment is blocked until GitHub and OneDrive records are aligned and the production blockers in the website handoff are resolved.
