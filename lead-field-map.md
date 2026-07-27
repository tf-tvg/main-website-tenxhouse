# TenXHouse Lead CSV Field Map

Use this map when building the Zoho Creator app or importing to HubSpot CRM.

| CSV field | Purpose | Suggested CRM/creative type |
|---|---|---|
| submitted_at | Submission timestamp | Date/time |
| enquiry_type | Main routing category | Picklist |
| package_interest | Tier or route selected | Picklist |
| full_name | Lead name | Text |
| business_name | Business or organisation name | Text |
| email | Email address | Email |
| mobile_number | Mobile or WhatsApp number | Phone |
| preferred_contact_method | WhatsApp, phone or email | Picklist |
| message | Free-text enquiry detail | Multi-line text |
| consent | POPIA consent captured | Boolean / picklist |
| lead_source | Default source label | Text |
| page_url | Page or link that produced the lead | URL |
| utm_source | UTM source | Text |
| utm_medium | UTM medium | Text |
| utm_campaign | UTM campaign | Text |

Recommended enquiry_type values:

- Virtual Office
- Business Support
- Bookkeeping Support
- Partnership
- Sponsorship
- Event RSVP
- Community / Mailing List
- General Enquiry

Recommended package_interest values:

- Tier 1 - Starter Presence - R750/month
- Tier 2 - Growth Support - R1,500/month
- Tier 3 - Premium Support - R3,000/month
- Partner / Sponsor / Event
- Community / Mailing List

Implementation note: the current static form stores leads in browser localStorage and exports CSV. For production, connect the same fields to Zoho Creator, Zoho Forms, HubSpot Forms or a secure server-side endpoint.
