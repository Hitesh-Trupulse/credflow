import { NextResponse } from "next/server";

const ZAPIER_HOOK = "https://hooks.zapier.com/hooks/catch/27515226/4ytw9iy/";

function asText(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

function appendAttribution(body, payload) {
  const attribution = payload.attribution || {};
  body.append("attribution", JSON.stringify(attribution));

  const lastTouch = attribution.last_touch || {};
  const firstTouch = attribution.first_touch || {};
  [
    "gclid",
    "gbraid",
    "wbraid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "landing_page",
    "referrer",
  ].forEach((key) => {
    if (lastTouch[key]) body.append(key, asText(lastTouch[key]));
  });
  if (firstTouch.utm_source) {
    body.append("first_touch_source", asText(firstTouch.utm_source));
  }
  if (firstTouch.utm_campaign) {
    body.append("first_touch_campaign", asText(firstTouch.utm_campaign));
  }
  if (firstTouch.landing_page) {
    body.append("first_touch_landing_page", asText(firstTouch.landing_page));
  }
}

/** Same keys the old /get-started form posted straight to Zapier. */
function toGetStartedFormData(payload) {
  const body = new FormData();
  body.append("firstName", asText(payload.firstName));
  body.append("lastName", asText(payload.lastName));
  body.append("email", asText(payload.email));
  body.append("companyName", asText(payload.organization));
  body.append("numberOfProviders", asText(payload.providerCount));
  body.append("organizationType", "");
  body.append("howDidYouHear", "Get Started Page");
  body.append("query", asText(payload.targetPayers));
  return body;
}

/** Same keys the old software/services contact form posted straight to Zapier. */
function toContactFormData(payload) {
  const body = new FormData();
  const targetPayers = asText(payload.targetPayers);
  body.append("firstName", asText(payload.firstName));
  body.append("lastName", asText(payload.lastName));
  body.append("email", asText(payload.email));
  body.append("companyName", asText(payload.organization));
  body.append("numberOfProviders", asText(payload.providerCount));
  body.append("organizationType", "Credentialing services");
  body.append("howDidYouHear", asText(payload.howDidYouHear));
  body.append("formType", "Talk to a specialist");
  body.append(
    "smsOptIn",
    payload.smsOptIn === true || payload.smsOptIn === "true" ? "true" : "false"
  );
  body.append("query", `Target payers / specialty: ${targetPayers || "N/A"}`);
  appendAttribution(body, payload);
  return body;
}

/**
 * Zapier Catch Hook already maps the old FormData names from other site forms.
 * Forward both the new names and those aliases so the existing Zap can see a
 * normal sample (and so “Find new records” matches what you already have).
 */
function toZapierFormData(payload) {
  if (payload.leadProfile === "get-started") return toGetStartedFormData(payload);
  if (payload.leadProfile === "contact") return toContactFormData(payload);

  const body = new FormData();
  const firstName = asText(payload.firstName);
  const lastName = asText(payload.lastName);
  const fullName =
    asText(payload.fullName) || [firstName, lastName].filter(Boolean).join(" ");
  const organization = asText(payload.organization);
  const providerCount = asText(payload.providerCount);
  const targetPayers = asText(payload.targetPayers);
  const isQuickLead = Boolean(payload.fullName) && !payload.firstName;

  body.append("firstName", firstName || fullName.split(" ")[0] || "");
  body.append("lastName", lastName || fullName.split(" ").slice(1).join(" "));
  body.append("email", asText(payload.email));
  body.append("fullName", fullName);
  body.append("organization", organization);
  body.append("companyName", organization);
  body.append("providerCount", providerCount);
  body.append("numberOfProviders", providerCount);
  body.append("targetPayers", targetPayers);
  const isContactForm = Boolean(firstName);
  body.append(
    "query",
    targetPayers
      ? `Target payers / specialty: ${targetPayers}`
      : isContactForm
        ? "Target payers / specialty: N/A"
        : ""
  );
  body.append("formType", isQuickLead ? "Quick Chat" : "Talk to a specialist");
  if (isContactForm) {
    body.append(
      "smsOptIn",
      payload.smsOptIn === true || payload.smsOptIn === "true" ? "true" : "false"
    );
    body.append(
      "organizationType",
      asText(payload.organizationType) || "Credentialing services"
    );
  }
  body.append("source_cta", asText(payload.source_cta));
  body.append("ga_client_id", asText(payload.ga_client_id));
  body.append("ga_session_id", asText(payload.ga_session_id));
  body.append("submitted_at", asText(payload.submitted_at));

  const attribution = payload.attribution || {};
  body.append("attribution", JSON.stringify(attribution));

  const lastTouch = attribution.last_touch || {};
  const firstTouch = attribution.first_touch || {};
  [
    "gclid",
    "gbraid",
    "wbraid",
    "li_fat_id",
    "fbclid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "utm_id",
    "landing_page",
    "referrer",
  ].forEach((key) => {
    if (lastTouch[key]) body.append(key, asText(lastTouch[key]));
  });
  if (firstTouch.utm_source) {
    body.append("first_touch_source", asText(firstTouch.utm_source));
  }
  if (firstTouch.utm_campaign) {
    body.append("first_touch_campaign", asText(firstTouch.utm_campaign));
  }
  if (firstTouch.landing_page) {
    body.append("first_touch_landing_page", asText(firstTouch.landing_page));
  }

  return body;
}

/**
 * Server-side lead POST. The browser calls this so a failed upstream
 * response can reject the promise (JSON POST to Zapier is a CORS preflight).
 */
export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const res = await fetch(ZAPIER_HOOK, {
      method: "POST",
      body: toZapierFormData(payload),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream rejected the lead" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Upstream request failed" },
      { status: 502 }
    );
  }
}
