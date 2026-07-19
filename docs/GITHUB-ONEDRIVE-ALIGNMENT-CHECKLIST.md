# TenXHouse GitHub and OneDrive Alignment Checklist

Purpose: make sure website changes are reviewed in GitHub and evidenced in OneDrive before the main domain is touched.

## Required Before Any Production Deployment

| Check | Status | Evidence |
|---|---|---|
| GitHub repository confirmed | Pending | `tf-tvg/main-website-tenxhouse` |
| Feature branch confirmed | Pending | `feat/tenxhouse-operating-model-v2` |
| Draft PR confirmed | Pending | `https://github.com/tf-tvg/main-website-tenxhouse/pull/1` |
| OneDrive handoff exists | Complete | Supplied handoff file and this workspace |
| Service/package/benefit ledger exists | Complete draft | `09_Finance_and_Pricing/2026-07-19_TenXHouse_Service_Package_Benefit_Ledger_v01.md` |
| Local preview safety repairs documented | Complete draft | Phase 1 validation report |
| GitHub branch contains same repairs | Pending | Needs repository access or local clone |
| Preview remains `noindex,nofollow` | Complete locally / Pending on GitHub | Needs PR preview inspection |
| Production blockers documented | Complete draft | Phase 1 validation report |
| Final approvals recorded | Pending | Business, commercial, legal, technical |

## Alignment Rule

If GitHub and OneDrive disagree, production deployment is blocked.

GitHub controls:

- source code;
- branches;
- pull requests;
- deployment history;
- technical review evidence.

OneDrive controls:

- source documents;
- business approvals;
- service/package/benefit ledgers;
- handoff files;
- test evidence exports;
- release decision records.

## Immediate GitHub Tasks

1. Open or clone `tf-tvg/main-website-tenxhouse`.
2. Check out `feat/tenxhouse-operating-model-v2`.
3. Compare against `03_Website/tenxhouse-astro`.
4. Apply preview-safety repairs to the GitHub branch.
5. Commit with a focused message.
6. Push to draft PR #1.
7. Add validation notes from the OneDrive report to the PR.

## Do Not Deploy If

- a WhatsApp number has not been approved;
- address wording has not been approved;
- package pricing is still draft;
- Zoho Creator and HubSpot URLs are placeholders;
- privacy, POPIA, membership terms or address-use rules are unapproved;
- the PR preview is not tested;
- the main domain release gate is not signed off.
