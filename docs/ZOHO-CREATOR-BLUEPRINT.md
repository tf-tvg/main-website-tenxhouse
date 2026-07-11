# Zoho Creator Blueprint for TenXHouse

## Architectural role

Zoho Creator should be the operational application and secure member portal. It should not replace HubSpot as the marketing CRM, SharePoint as the governed document repository, ClickUp as the execution system, Figma as the design source or GitHub as the code repository.

## Recommended Creator app

App name: `TenXHouse Operations`

### Core forms and reports

| Module | Purpose | Key fields |
|---|---|---|
| Contacts | Operational identity linked to HubSpot | Creator Contact ID, HubSpot Contact ID, email, phone, consent-sync status |
| Organisations | Member or partner businesses | Legal name, trading name, registration number, HubSpot Company ID, status |
| Membership Packages | Approved catalogue | Package code, public name, fee, VAT flag, setup fee, term, inclusions, exclusions, active dates |
| Membership Applications | Qualification and onboarding | Application ID, applicant, organisation, package, source, status, reviewer, missing items |
| Members | Active membership record | Member ID, organisation, package, activation date, renewal date, status, portal user |
| Hosted Companies | Confirmed hosted-company registry | Name, legal entity, public summary, logo, website, public status, owner |
| Partners | Approved external partners | Company, agreement status, owner, start/end dates, data-sharing terms |
| Benefits | Public and member-only offers | Provider, offer, eligibility, public summary, terms, start/end, review date, status |
| Benefit Claims | Controlled redemptions | Member, benefit, claim reference, status, provider outcome, value |
| Events | Event catalogue | Title, organiser, type, dates, delivery format, capacity, pricing, member benefit, status |
| Event Registrations | RSVP and attendance | Event, contact, member, status, source, attendance, follow-up |
| Resource Registry | Editorial workflow and public metadata | Title, slug, category, format, sources, writer, reviewer, status, review date, public URL |
| Support Tickets | Member support | Member, category, priority, owner, status, SLA timestamps |
| Mail Log | Virtual-office operational record if confirmed | Member, received date, item type, notification date, collection/forwarding status |
| Documents | Metadata and links only | Record type, record ID, SharePoint URL, document type, verification status |
| Payments / Billing | Operational billing record if required | Member, invoice reference, amount, VAT, due date, status, provider reference |
| Sync Log | Integration audit | Source module, record ID, target system, operation, result, timestamp, error |
| Activity Log | Important changes | Record, action, old value, new value, actor, timestamp |

## Status models

### Membership application

`Started → Submitted → Validation Required → Under Review → More Information Required → Approved → Payment Pending → Activated`

Exit statuses:

`Declined`, `Withdrawn`, `Expired`

### Membership

`Pending Activation → Active → Renewal Due → Payment Overdue → Suspended → Cancelled → Archived`

### Benefit

`Draft → Commercial Review → Legal/Terms Review → Approved → Published → Paused → Expired → Archived`

### Benefit claim

`Requested → Eligibility Check → Approved → Sent to Provider → Redeemed → Closed`

Exception statuses:

`Declined`, `Cancelled`, `Expired`

### Event

`Idea → Draft → Review → Approved → Published → Registration Closed → Completed → Recap Published → Archived`

Exception status:

`Cancelled`

### Resource

`Idea → Briefed → Drafting → Source Review → Subject Review → Approved → Scheduled → Published → Review Due → Updated/Archived`

## Portal roles

### Member

May view and update only:

- own profile and organisation details allowed for self-service;
- membership status, package and renewal date;
- eligible benefits and own claims;
- registered events and attendance records;
- own support tickets;
- approved documents and notices;
- mail log if the service is confirmed and included.

### Hosted-company provider

May view only:

- claims assigned to its company;
- minimum member information required for fulfilment;
- fulfilment status and provider notes;
- aggregate redemption reporting.

Must not see:

- unrelated member records;
- other providers' claims;
- HubSpot marketing data;
- private membership documents.

### Operations user

May manage applications, members, support, events, benefits and sync exceptions according to role permissions.

### Content/editorial user

May manage resource and event metadata but not membership, billing or document records.

## Public website integration

### Public links

The website needs approved destinations for:

- member application;
- member portal;
- partner application;
- event updates and event registrations;
- newsletter/resource subscription;
- WhatsApp and approved contact routes.

### Public data feeds

The website can read public, sanitised data for:

- hosted companies;
- benefits;
- resources;
- events.

Each feed must return only fields approved for publication. Never expose internal IDs, private notes, personal information, provider contacts, claim codes or commercial margin fields.

### Endpoint options

1. Creator published report/page returning sanitised data.
2. Creator custom API exposed through a secured server-side adapter.
3. Scheduled export that commits approved JSON to GitHub.

For the current GitHub Pages architecture, option 1 or 3 is simplest. Protected API calls require a server-side layer.

## Key automations

### Membership submission

- Generate immutable application reference.
- Validate required fields and duplicate email/organisation.
- Upsert HubSpot contact and company.
- Record source, campaign and page.
- Notify the applicant through the approved mail channel.
- Create ClickUp review task only if manual review is required.
- Create SharePoint folder only after the agreed qualification stage.

### Approval

- Record reviewer and decision.
- Trigger the approved payment/onboarding step.
- Create or update Member record.
- Create portal user after activation rules are met.
- Set renewal date from package terms.
- Create standard onboarding tasks in ClickUp.

### Benefit publication

- Block publication if provider, eligibility, start/end date, terms or owner is blank.
- Require commercial approval and terms approval.
- Expose only public summary through the website feed.
- Schedule review reminder before expiry.

### Benefit claim

- Verify active membership.
- Verify package eligibility, expiry and usage limit.
- Generate claim reference.
- Notify provider using minimum required data.
- Track redemption and member-value amount.

### Event publication

- Block publication if organiser, date/time, delivery format, registration owner or cancellation terms are missing.
- Sync the public listing feed.
- Create ClickUp delivery template on approval, not on idea creation.
- Store Canva asset link and SharePoint event folder.

### Event registration

- De-duplicate by event and contact.
- Check capacity and wait-list rule.
- Apply member benefit if eligible.
- Update HubSpot campaign participation.
- Send calendar details through the approved channel.
- Record attendance and post-event follow-up.

### Resource review

- Require at least one source entry.
- Require reviewer for legal, finance, tax, funding or compliance topics.
- Store source date and last-reviewed date.
- Create review reminder.
- Unpublish or flag resources that pass the review deadline.

## HubSpot integration contract

### HubSpot owns

- primary contact and company record;
- marketing consent and subscription status;
- original source, campaign and lifecycle stage;
- sales opportunities and partner pipeline where applicable;
- email marketing and nurture workflows.

### Creator owns

- application and membership status;
- service eligibility;
- operational support;
- event registration and attendance;
- benefits and claims;
- renewal and operational billing status.

### Synchronised fields

Minimum contact fields:

- HubSpot Contact ID;
- Creator Contact ID;
- email;
- first and last name;
- phone where approved;
- associated organisation;
- membership lifecycle summary;
- last operational update timestamp.

Do not mirror every field.

## ClickUp integration contract

Create tasks for work, not for passive records.

Recommended task triggers:

- application requires manual review;
- missing or rejected document;
- member onboarding after approval;
- benefit-provider fulfilment exception;
- event delivery after approval;
- resource production after brief approval;
- failed system sync requiring intervention;
- renewal risk requiring human action.

Each task should contain:

- safe summary;
- due date and owner;
- priority;
- Creator record URL;
- no unnecessary sensitive information.

## SharePoint / OneDrive integration contract

Recommended folder pattern:

`TenXHouse / Members / {Member-ID} - {Approved Business Name} /`

Subfolders:

- `01 Application`
- `02 Agreements`
- `03 Compliance`
- `04 Billing`
- `05 Support`

Creator stores the folder/document URL and verification metadata. It should not duplicate every document unless there is a defined operational reason.

## Outlook and Microsoft 365 contract

- Outlook or the approved Creator mail connection sends transactional messages.
- Shared-mailbox replies are logged back to the relevant Creator record where operationally important.
- Calendar invitations identify the organiser and correct event owner.
- Sensitive documents are not moved through unstructured email attachments when a controlled upload route exists.

## Figma and Canva contract

- Figma owns page structure, responsive behaviour, components, interaction states and design tokens.
- Canva supplies approved event, campaign and editorial artwork.
- Canva is not the source of truth for the website UI.
- Creator records store links to approved assets, not uncontrolled duplicates.

## GitHub and Codex contract

- Code changes use feature branches and pull requests.
- No secret is committed to the repository.
- Public content feeds use an explicit allow-list.
- Release notes identify unresolved approvals, tests and migration steps.
- Merge to `main` is the production deployment gate under the current GitHub Pages workflow.

## Reporting dashboard

Creator operational dashboard:

- applications by status and source;
- approval conversion rate;
- active members and renewals due;
- failed or overdue operational actions;
- benefit claims and redemption value;
- event registrations, attendance and member participation;
- support-ticket volume and response time;
- sync failures.

HubSpot marketing dashboard:

- source-to-application conversion;
- resource and event influence;
- campaign performance;
- lifecycle movement;
- partner and sponsor pipeline.

## Security and QA

- Role-based access for every report and form.
- Portal data filtered by authenticated user and organisation.
- No OAuth secret or private token in browser code.
- Explicit field-level publication allow-list for all public feeds.
- Test duplicate contacts, failed sync, expired benefits, cancelled events and suspended members.
- Maintain audit logs for status, package, price and eligibility changes.
- Use a sandbox/test app or test records before production activation.
