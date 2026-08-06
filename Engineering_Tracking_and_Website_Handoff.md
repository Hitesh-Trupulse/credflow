# Tracking Instrumentation – Engineering Handoff

## 1. Scope

| Task | Description | Type |
| :--- | :--- | :--- |
| **1** | Remove hardcoded GA4 and Microsoft Clarity from app code | Removal |
| **2** | Fix consent handler; region-scoped Consent Mode | Bug + feature |
| **3** | Contact form dataLayer events | Feature |
| **4** | Attribution capture into the lead record | Feature |
| **5** | CTA tracking attributes | Markup only |
| **6** | Calendly scheduling on form success | Feature |

> **Success State:** After this ships, application code has exactly three responsibilities: load GTM, declare consent state, and push dataLayer events. All measurement tags (GA4, Google Ads, Clarity, Apollo, LinkedIn) are configured in GTM and must never appear in application code again.
> 
> **Blockers:** Tasks 1 and 2 are blockers. Task 3 is the highest-value item—without it there is no conversion signal at all.

---

## 2. Current State (verified 2026-08-04)

Three tags are injected by a single client component in the root layout, compiled to `/_next/static/chunks/e5c49a01f6cde8dd.js`:

| Tag | ID | Method |
| :--- | :--- | :--- |
| **GA4** | `G-1MSBXJCHJ7` | Direct `gtag.js` via `next/script` |
| **Google Tag Manager** | `GTM-5WPJ7X2T` | Inline snippet, `afterInteractive` |
| **Microsoft Clarity** | `u8xqxiaos8` | Inline snippet |

All three are hard-blocked behind the cookie banner—nothing loads until a button is clicked.

---

## 3. Answers Needed from Engineering

These do not block starting work, but items A and B change the implementation of Tasks 2 and 4. Please answer before development begins.

* **A.** Does the app have a server runtime (Next.js middleware / API routes), or is it a static export? This determines whether geo detection and attribution capture run at the edge or in the browser.
* **B.** Is `CloudFront-Viewer-Country` enabled on the distribution, and can it be read by the app? Required for banner visibility in Task 2. If not enabled, please enable it or propose an alternative.
* **C.** Where does the contact form POST today, does the response return a unique lead identifier, and can columns be added to the lead record? Task 3 needs a `lead_id` in the response; Task 4 needs new columns.
* **D.** Staging URL for QA. Must be reachable by marketing in a normal browser. Provide credentials if it is protected.

---

## 4. Deploy Sequence

Do not deploy Task 1 ahead of a GTM publish, and do not ask marketing to publish ahead of the deploy. On release day:

1. Marketing builds the GA4 and Clarity tags in the GTM workspace, unpublished.
2. Engineering deploys to production.
3. Marketing publishes the container within minutes of the deploy.

*A few minutes of missing analytics is acceptable. Double-counted analytics is not.*

---

## Task 1: Remove Hardcoded GA4 and Microsoft Clarity

Both tags are being recreated inside GTM so they can be managed without a deploy. If they remain in code as well, every pageview and Clarity session is counted twice.

### Changes
In the root-layout consent component:
1. Delete the `next/script` block loading `https://www.googletagmanager.com/gtag/js?id=G-1MSBXJCHJ7` and its companion inline `gtag('config',...)` call.
2. Delete the constant holding `G-1MSBXJCHJ7`.
3. Delete the Microsoft Clarity inline snippet and the constant holding `u8xqxiaos8`.
4. Keep the GTM snippet. Task 2 changes when and how it loads.

### Verification
```bash
grep -rn "G-1MSBXJCHJ7\|gtag/js\|clarity\|u8xqxiaos8" src/app/components/
```
*Expect zero hits outside deleted code. Any surviving `gtag('event', ...)` call must be converted to a `dataLayer.push` (Task 3). Only the consent calls in Task 2 may use `gtag()`.*

---

## Task 2: Consent Handler and Region-Scoped Consent Mode v2

### The Bug
Both banner buttons run the identical handler. From the live compiled chunk:
```javascript
// "Accept necessary" onClick:  1(s.ACCEPTED), o(s.ACCEPTED), d(11)
// "Accept all"       onClick:  1(s.ACCEPTED), o(s.ACCEPTED), d(11)
```
`s.REJECTED` is defined but nothing ever writes it, so a visitor cannot decline. Separately, because the whole container is blocked until a click, every session's first pageview is lost.

### Target Behaviour
Two independent mechanisms—do not conflate them:
* **Consent signals:** Everywhere, no geo lookup required. Google resolves the visitor's region itself from the region array, so this is a static snippet with no server dependency.
* **Banner visibility:** Geo-dependent. The banner renders only in the regions listed below. In the US and Canada, no banner is shown; instead, a persistent "Your Privacy Choices" link in the footer lets a visitor withdraw consent at any time.

GTM loads on every page in every region, immediately, regardless of banner state. Tags run in a restricted, cookieless state where consent is denied.

| Region | Banner | Consent Default |
| :--- | :--- | :--- |
| **EEA 27 + UK + Switzerland** | Yes | Denied |
| **US, Canada, Rest of World** | No | Granted |
| **Country unknown / header missing** | Yes (fail safe) | Denied |

*Regions requiring the banner (ISO 3166-1 alpha-2):* `AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE, IS, LI, NO, GB, CH`.

### 2a. Consent Defaults – `<head>`, Before GTM
Use `strategy="beforeInteractive"` so this runs before hydration and before the GTM snippet. It must not depend on React state.

```tsx
<Script
  id="consent-default"
  strategy="beforeInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }

      gtag('consent', 'default', {
        region: [
          'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
          'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH'
        ],
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        wait_for_update: 500
      });

      gtag('consent', 'default', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });

      gtag('set', 'ads_data_redaction', true);
      gtag('set', 'url_passthrough', true);

      try {
        var c = document.cookie;
        if (c.indexOf('credflow_cookie_consent=accepted') !== -1) {
          gtag('consent', 'update', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            analytics_storage: 'granted'
          });
        } else if (c.indexOf('credflow_cookie_consent=rejected') !== -1) {
          gtag('consent', 'update', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied'
          });
        }
        if (navigator.globalPrivacyControl === true) {
          gtag('consent', 'update', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
        }
      } catch (e) {}
    `,
  }}
/>
```
*Order is significant:* Region-scoped default, then global default, then the stored decision, then Global Privacy Control last so it overrides a stale acceptance. `gtag` must push `arguments` rather than an array—Google's API reads the `arguments` object.

The Global Privacy Control check makes a banner-free US experience defensible; several state laws expect that browser signal to be honoured.

### 2b. GTM Loads Unconditionally
Remove the consent gate around the GTM snippet. It loads on every page in every region, with `strategy="afterInteractive"`, always after the block in 2a.

### 2c. Banner Visibility
Resolve the visitor country server-side or at the edge from `CloudFront-Viewer-Country` and expose it to the app (a non-HttpOnly cookie, a layout prop, or a `data-region` attribute on `<html>` are all acceptable). Render the banner only when:
* The country is in the banner-region list, OR the country could not be determined, AND
* No `credflow_cookie_consent` cookie exists yet.

*Never render the banner for a US or Canadian visitor. If the answer to prerequisite A is "static export", propose an alternative—a CloudFront Function setting a country cookie is preferred over a client-side geo-IP call.*

### 2d. Button Handlers

```javascript
const CONSENT_COOKIE = 'credflow_cookie_consent';
const SIGNALS = ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage'];

const state = (value) => Object.fromEntries(SIGNALS.map((k) => [k, value]));

const setConsentCookie = (value) => {
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; domain=.credflow.ai; max-age=31536000; samesite=lax; secure;`;
};

const onAcceptAll = () => {
  setConsentCookie('accepted');
  window.gtag?.('consent', 'update', state('granted'));
  closeBanner();
};

const onRejectAll = () => {
  setConsentCookie('rejected');
  window.gtag?.('consent', 'update', state('denied'));
  closeBanner();
};
```

**Requirements:**
* The two handlers must be different functions. Code review should confirm they are not identical.
* Rename the second button from "Accept necessary" to "Reject all". In banner regions, the reject option must be as prominent and as easy to use as accept.
* Cookie domain is `.credflow.ai`, not `www.credflow.ai`—the site 302s non-www to www and the cookie must survive that redirect.
* Keep the cookie name `credflow_cookie_consent` so existing visitors' decisions carry over.
* Cookie must be readable by JavaScript (not HttpOnly), 365-day lifetime, SameSite Lax, Secure.

### 2e. "Your Privacy Choices" Footer Link
* Required in all regions, including the US and Canada, since no banner is shown there.
* Persistent link in the global footer, labelled "Your Privacy Choices".
* Clicking it reopens the consent panel with Accept all / Reject all, regardless of region and regardless of any stored decision.
* Expose the opener so it can be called from anywhere, e.g., `window.credflowOpenPrivacyChoices()`.

---

## Task 3: Contact Form dataLayer Events

The form currently emits no signal, so Google Ads has no record that a lead occurred. These events are the conversion.

Applies to the React contact form at `/services#contact-form`. The separate newsletter email field on the same page is not a lead and must never fire these events.

| Event | Fires When | Notes |
| :--- | :--- | :--- |
| `contact_form_start` | First interaction with any field, once per page view | Top of funnel signal |
| `contact_form_submit` | Only after the submit API returns success | **This is the conversion** |
| `contact_form_error` | Submit API returns an error | Diagnostics |
| `newsletter_signup` | Newsletter form submits successfully | Separate event, separate form |

*(The consolidated submit handler covering Tasks 3, 4, and 6 is in Task 6. Implement it once, there.)*

### Form Start Snippet
```javascript
const startedRef = useRef(false);

const trackFormStart = () => {
  if (startedRef.current) return;
  startedRef.current = true;

  window.dataLayer?.push({
    event: 'contact_form_start',
    form_id: 'contact_form',
    form_location: window.location.pathname,
  });
};
// Attach trackFormStart to onFocus, or first onChange, of any field
```

### Rules
* `contact_form_submit` fires after the API confirms success. Never on button click, never on validation failure, never optimistically.
* Exactly one push per successful submission. Disable the submit button while the request is in flight so a double-click cannot produce two conversions.
* `user_email` is the raw email address. GTM hashes it for Enhanced Conversions—do not hash, trim, or lowercase it in application code.
* `lead_id` is the server-generated identifier for the created lead and is used as the conversion dedupe key. If the API does not return one today, add it (prerequisite C).
* Keep the `#contact-form` anchor and the field names `firstName`, `lastName`, `email`, `organization`, `providerCount`, `targetPayers`. GTM variables are keyed to them. Tell marketing before changing any of them.
* Push to `window.dataLayer` only. Do not call `gtag('event')` anywhere in application code.

---

## Task 4: Attribution Capture into the Lead Record

Google Ads appends a click identifier to the landing URL on paid clicks. Storing it on the lead row is what later allows a closed deal to be credited back to the campaign that produced it. This data cannot be recovered retroactively.

### 4a. Capture on Landing
Capture into two cookies: `cf_attr_first` (written once, never overwritten) and `cf_attr_last` (overwritten whenever tracking parameters are present). The click identifier used downstream is the last-touch value.

```typescript
'use client';

import { useEffect } from 'react';

const CAPTURE = [
  'gclid', 'gbraid', 'wbraid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
];

const NINETY_DAYS = 7776000;

const write = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; domain=.credflow.ai; max-age=${NINETY_DAYS}; samesite=lax; secure`;
};

export const readAttribution = (name: string) => {
  const raw = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${name}=`))
    ?.split('=')[1];

  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
};

export const AttributionCapture = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const found = Object.fromEntries(
      CAPTURE.filter((k) => params.get(k)).map((k) => [k, params.get(k)])
    );

    if (!Object.keys(found).length) return;

    const payload = JSON.stringify({
      ...found,
      landing_page: window.location.pathname,
      referrer: document.referrer || null,
    });

    write('cf_attr_last', payload);
    if (!readAttribution('cf_attr_first')) {
      write('cf_attr_first', payload);
    }
  }, []);

  return null;
};
```
*Mount once in the root layout. It must run before any code that strips query parameters via `router.replace`.*

*If a server runtime exists (prerequisite A), setting these cookies from middleware via `Set-Cookie` is preferred—Safari caps JavaScript-written cookies at 7 days, which would lose attribution for any lead who converts more than a week after their first visit.*

### 4b. Send with the Form
The submit body includes both cookies. See the consolidated handler in Task 6.

### 4c. Lead Record Columns

| Column | Type | Source |
| :--- | :--- | :--- |
| `gclid` | text, nullable, indexed | `cf_attr_last.gclid` |
| `gbraid`, `wbraid` | text, nullable | `cf_attr_last` |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` | text, nullable | `cf_attr_last` |
| `first_touch_source`, `first_touch_campaign`, `first_touch_landing_page` | text, nullable | `cf_attr_first` |
| `landing_page`, `referrer` | text, nullable | `cf_attr_last` |
| `submitted_at` | timestamp with timezone | Server clock at insert |

*`submitted_at` must carry a timezone offset. Uploads to Google Ads are rejected without one, and it must reflect the moment of submission, not the moment of upload.*

### 4d. Rules
* Never overwrite last-touch with empty values. A visitor returning via direct or organic traffic keeps their previous paid click identifier. The early return in the snippet handles this.
* Cookie domain `.credflow.ai` for the same redirect reason as Task 2.
* Do not log click identifiers to the console or to any client-visible surface.

---

## Task 5: CTA Tracking Attributes

Markup only—no JavaScript required. The click listener lives in GTM as a Custom HTML tag, so marketing can change what is captured without a deploy.

### 5a. Attributes
Every call-to-action carries two attributes:

```html
<a href="/services#contact-form" data-cta-id="nav-talk-to-specialist" data-cta-location="global-nav">
  Talk to a specialist
</a>
```
* `data-cta-id`: `{placement}-{action}`, kebab-case, unique per distinct button.
* `data-cta-location`: `{page-or-region}-{section}`, kebab-case.

The GTM listener resolves the attributes from the nearest ancestor, so inner `<span>` and `<svg>` elements are handled automatically. Attributes may go on the `<a>` or `<button>` element itself.

### 5b. Known Inventory
Taken from the rendered markup of `/` and `/services` on 2026-08-04. Client-rendered sections may contain more.

| CTA Text | Element | `data-cta-id` | `data-cta-location` |
| :--- | :--- | :--- | :--- |
| **Talk to a specialist** | `<a>` | `nav-talk-to-specialist` | `global-nav` |
| **Book a demo** | `<button>` | `nav-book-demo` | `global-nav` |
| **Talk to an enrollment specialist** | `<a>` | `home-talk-to-specialist` | `home-body` |
| **Talk to an enrollment specialist** | `<a>` | `services-talk-to-specialist` | `services-body` |
| **See how it works** | `<a>` | `services-see-how-it-works` | `services-body` |
| **Get started** | `<button>` | `services-get-started` | `services-body` |
| **Join Us** | `<button>` | `footer-join-us` | `global-footer` |

*Apply the convention to every CTA, not only these—include hero CTAs, mobile-menu duplicates, dropdown CTAs, `/software` CTAs, and CTAs inside `/resources` articles. Mobile duplicates get their own IDs (for example `mobile-nav-book-demo`); do not reuse a desktop ID.*

**Please return the final list of IDs applied so marketing can build reporting against it.**

### 5c. Behaviour Change
`nav-book-demo` currently opens nothing useful. It must now route to the contact form (`/services#contact-form`, or `#contact-form` when already on a page that has the form) rather than open a scheduler directly. Scheduling happens after the form, per Task 6.

---

## Task 6: Calendly Scheduling on Form Success

Replaces the current "we'll be in touch" outcome. The visitor submits the form and immediately picks a slot, with their answers already filled in.

**Sequence:**
1. Visitor completes the form on `/services` or `/software`.
2. Submit button, labelled "Pick your time", POSTs to the backend.
3. On success, `contact_form_submit` fires. The lead is saved and the conversion is recorded at this point—before any scheduling.
4. The Calendly popup opens, prefilled.
5. Visitor selects a slot and confirms.

*If the visitor abandons at step 4, the lead and the conversion are already captured. That is intended.*

*Use the popup embed, not a redirect to `calendly.com`. Calendly's booking events only reach the page through `postMessage` from an embedded widget; on a redirect, the booking is invisible to analytics.*

### 6a. Load the Calendly Widget
Load Calendly's widget script and stylesheet in the pages that contain the form. The widget is product functionality and belongs in application code—this is the one exception to the "no third-party scripts in code" rule in Task 1.

### 6b. Consolidated Submit Handler – Tasks 3, 4 and 6

```javascript
const onSubmit = async (values) => {
  setPending(true);
  setError(null);

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        attribution: {
          first_touch: readAttribution('cf_attr_first'),
          last_touch: readAttribution('cf_attr_last'),
        },
      }),
    });

    if (!res.ok) throw new Error('submit_failed');

    const { leadId } = await res.json();

    window.dataLayer?.push({
      event: 'contact_form_submit',
      form_id: 'contact_form',
      form_location: window.location.pathname,
      lead_id: leadId,
      user_email: values.email,
      provider_count: values.providerCount,
      target_payers: [].concat(values.targetPayers ?? []).join(','),
    });

    window.Calendly?.initPopupWidget({
      url: CALENDLY_URL,
      prefill: {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        customAnswers: {
          a1: values.organization,
          a2: values.providerCount,
        },
      },
    });
  } catch (err) {
    setError('Something went wrong. Please try again.');
    window.dataLayer?.push({
      event: 'contact_form_error',
      error_type: 'submit_failed',
    });
  } finally {
    setPending(false);
  }
};
```
*On failure, the scheduler does not open, so the visitor can retry and the lead is still captured.*

### 6c. Calendly Configuration
* `CALENDLY_URL` is Brendan's 30-minute event type. Marketing will supply the exact link—see Open items. Append `?hide_gdpr_banner=1`.
* Prefilled custom questions map by position, so the event type must define them in this order: `a1` = Organization name, `a2` = Number of providers. Reordering them silently breaks prefill.
* Prefilled fields remain visible and editable to the invitee. That is acceptable.

### 6d. Button and Microcopy
* **Submit button label:** "Pick your time".
* **Microcopy directly beneath it:** "Next: choose a time. Takes about 20 seconds." Setting the expectation of a second step reduces drop-off at the handoff.
* The button carries `data-cta-id="services-pick-time"` and `data-cta-location="services-contact-form"` (and the software-equivalents on `/software`).

### 6e. `/software`
`/software` gets its own copy of the contact form with the same fields, the same anchor (`#contact-form`), and `form_location` resolving to `/software` so the two pages can be compared. Its CTAs point at its own form rather than at `/services`.

---

## QA and Acceptance

Marketing verifies in GTM Preview against the staging URL, testing as a US visitor and as an EEA visitor (VPN), and with both banner buttons.

### Task 1
- [ ] `grep` for `G-1MSBXJCHJ7`, `gtag/js`, `clarity`, `u8xqxiaos8` returns zero hits in app code
- [ ] No request to `clarity.ms` originates from application code
- [ ] Exactly one GA4 pageview per page view after the GTM publish

### Task 2
- [ ] GTM loads on the first page view in every region, before any banner interaction
- [ ] US visitor: no banner, consent defaults granted, "Your Privacy Choices" link present in footer
- [ ] EEA visitor: banner shown, consent defaults denied for all four signals
- [ ] "Reject all" writes `credflow_cookie_consent=rejected`; consent stays denied on reload
- [ ] "Accept all" writes `accepted`; granted consent is re-applied on reload before GTM loads
- [ ] With Global Privacy Control enabled in the browser, ad signals are denied
- [ ] "Your Privacy Choices" reopens the panel in every region, including after a stored decision
- [ ] Unknown/missing country falls back to showing the banner with denied defaults

### Task 3
- [ ] `contact_form_start` fires once per page view, not once per field
- [ ] `contact_form_submit` fires once per successful submission with `lead_id`, `user_email`, `provider_count`, `target_payers`, `form_location`
- [ ] A failed submission fires `contact_form_error` and not `contact_form_submit`
- [ ] Double-clicking submit produces exactly one `contact_form_submit`
- [ ] Newsletter submission fires `newsletter_signup` and not `contact_form_submit`

### Task 4
- [ ] Landing on `?gclid=TEST_1&utm_source=google&utm_medium=cpc&utm_campaign=acceptance` then submitting produces a lead row with `gclid=TEST_1`, `utm_campaign=acceptance`, and a timezone-bearing `submitted_at`
- [ ] A fresh organic visit produces a lead row with `gclid` null, not the earlier test value
- [ ] Returning via organic after a paid visit retains the paid `gclid`

### Task 5
- [ ] Every CTA carries both `data-cta-id` and `data-cta-location`
- [ ] `nav-book-demo` routes to the contact form
- [ ] Final list of applied IDs returned to marketing

### Task 6
- [ ] Calendly popup opens only after a successful POST
- [ ] Name, email, organization, and provider count arrive prefilled in Calendly
- [ ] Abandoning the scheduler still leaves a lead row and a fired `contact_form_submit`
- [ ] `/software` form submits with `form_location` resolving to `/software`

---

## Do Not

* **Do not** add GA4, Clarity, or any other measurement tag back into application code. All tags live in GTM.
* **Do not** send analytics events with `gtag('event')`. Push to `dataLayer`; GTM owns the mapping.
* **Do not** rename or remove `data-cta-*` attributes, the `#contact-form` anchor, or the form field names without telling marketing. GTM breaks silently, with no error surfaced anywhere.
* **Do not** make the two consent buttons share a handler.
* **Do not** show the cookie banner to US or Canadian visitors.
* **Do not** fire `contact_form_submit` before the backend confirms the lead was saved.

---

## Open Items

| Item | Owner | Status |
| :--- | :--- | :--- |
| Calendly event-type URL (Brendan's 30-minute) | Marketing | To be supplied |
| Calendly custom questions created in order `a1`, `a2` | Marketing | To be done before QA |
| `lead_id` returned by the submit API | Engineering | Prerequisite C |
| `CloudFront-Viewer-Country` availability | Engineering | Prerequisite B |
| Privacy counsel sign-off on the banner region list | Marketing | In progress |
| Apollo and Clarity tags gated on consent inside GTM | Marketing | Must land in the same publish |

*Out of scope for this ticket: `/`, `/services` and `/software` are missing from `sitemap.xml`. Raised separately.*
