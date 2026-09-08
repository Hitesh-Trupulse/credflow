/**
 * Lead POST for /services and /software.
 * Resolves only when the response is ok. Do not flatten attribution.
 */

export const LEAD_ENDPOINT = "/api/leads";

export function payloadFrom(form) {
  const out = {};
  new FormData(form).forEach((v, k) => {
    out[k] = v;
  });
  const parse = (raw) => {
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  out.attribution = {
    first_touch: parse(out.attribution_first_touch),
    last_touch: parse(out.attribution_last_touch),
  };
  delete out.attribution_first_touch;
  delete out.attribution_last_touch;
  out.submitted_at = new Date().toISOString();
  return out;
}

export function submitLead(form) {
  return fetch(LEAD_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payloadFrom(form)),
  }).then((res) => {
    if (!res.ok) throw new Error("HTTP " + res.status);
  });
}
