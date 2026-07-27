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

## Current Static HTML Preview

The static HTML version can pre-fill enquiry type and package from URL parameters. Because it is a static file preview, it cannot reliably submit to a live CRM by itself.

For production, use the Astro version in `03_Website/tenxhouse-astro`, which includes a server-side `/api/leads` endpoint.

## Production Lead Workflow

The Astro form keeps the same CSV-compatible fields:

```csv
submitted_at,enquiry_type,package_interest,full_name,business_name,email,mobile_number,preferred_contact_method,message,consent,lead_source,page_url,utm_source,utm_medium,utm_campaign
```

Recommended production route:

1. Visitor submits the clean public enquiry form.
2. `/api/leads` validates the submission.
3. The lead is forwarded through `LEAD_WEBHOOK_URL` to Zoho Creator, Zoho Forms, HubSpot, Zoho Flow, Make, Zapier, or a secure backend.
4. CRM/app automation handles internal CSV export, routing, tagging, notifications, and follow-up.

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

The current links can remain `#` until the CMS and article detail pages are built. When the CMS is added, keep fields for title, category, publish date, excerpt, read time, featured status and source.
