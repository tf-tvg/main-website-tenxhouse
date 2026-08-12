# TenXHouse Website Notes

## Public Form Experience

The public-facing enquiry form should only show visitor-relevant fields:

- Enquiry type
- Package interest
- Full name
- Business name
- Email address
- Mobile number
- Preferred contact method
- Message / enquiry details
- Consent

Do not show internal controls such as:

- Export CSV
- Clear saved leads
- Saved lead counts
- Lead source
- CRM notes
- Launch/backend notes

Those are operational details and should stay out of the customer journey.

## Current GitHub-Backed Static Site

The GitHub-backed static site is the canonical website implementation. It can pre-fill enquiry type and package from URL parameters. Because browser-only code must not contain private CRM or Creator credentials, live lead submission still requires an approved published form or a protected server-side adapter.

Do not switch production work to the separate Astro folder unless a later architecture decision explicitly approves that migration.

## Production Lead Workflow

The Astro form keeps the same CSV-compatible fields:

```csv
submitted_at,enquiry_type,package_interest,full_name,business_name,email,mobile_number,preferred_contact_method,message,consent,lead_source,page_url,utm_source,utm_medium,utm_campaign
```

Recommended production route:

1. Visitor submits the clean public enquiry form or an approved embedded form.
2. The approved form provider or protected server-side adapter validates the submission.
3. The lead is forwarded to Zoho Creator and/or HubSpot using credentials that never enter browser code.
4. CRM/app automation handles routing, tagging, notifications and follow-up.

## Form Page SEO

The enquiry route should remain hidden from primary SEO navigation:

- Do not place Forms in the public menu.
- Keep the form route `noindex,follow`.
- Exclude the form route from the sitemap.

## Insights / Blog Notes

Insights should read like a professional editorial/blog page, not a generic company news section. Article cards should be clickable, dated and grouped by usefulness:

- Featured TenXHouse guide
- Supporting practical reads
- Latest LinkedIn articles

The CMS catalogue keeps title, category, publication date, excerpt, read time, featured status, source, author, reviewer, source ledger and publication controls. Links remain non-interactive until an approved article or external source URL exists.
