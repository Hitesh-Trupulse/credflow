import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

let cachedOptions;

/** Country choices for the lead-form selector. United States is first. */
export function phoneCountryOptions() {
  if (cachedOptions) return cachedOptions;
  const names = new Intl.DisplayNames(["en"], { type: "region" });
  const options = getCountries()
    .map((iso) => ({
      iso,
      name: names.of(iso) || iso,
      dial: getCountryCallingCode(iso),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
  const usIndex = options.findIndex((option) => option.iso === "US");
  if (usIndex > 0) {
    options.unshift(options.splice(usIndex, 1)[0]);
  }
  cachedOptions = options;
  return options;
}

function countryIso(value) {
  const iso = String(value || "").toUpperCase();
  return /^[A-Z]{2}$/.test(iso) ? iso : "US";
}

/**
 * Optional phone check for lead forms.
 * Blank is valid. Letters are rejected. A non-empty number must be valid
 * for the selected country, then stored as +[country code][national number].
 */
export function normalizeLeadPhone(national, countryValue) {
  const raw = national == null ? "" : String(national).trim();
  if (!raw) return { ok: true, phone: "" };

  if (/[a-z]/i.test(raw)) {
    return { ok: false, message: "Use digits only." };
  }

  const country = countryIso(countryValue);
  let parsed;
  let selectedDial;
  try {
    selectedDial = getCountryCallingCode(country);
    parsed = parsePhoneNumberFromString(raw, country);
  } catch {
    parsed = null;
  }
  if (!parsed || !parsed.isValid() || parsed.countryCallingCode !== selectedDial) {
    return { ok: false, message: "Enter a valid phone number." };
  }

  return { ok: true, phone: `+${parsed.countryCallingCode}${parsed.nationalNumber}` };
}
