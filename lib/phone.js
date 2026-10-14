/**
 * Normalize a lead phone number for storage.
 * 10 digits, or 11 digits starting with 1, become +1XXXXXXXXXX.
 * Anything else is kept as entered so a non-US number stays visible.
 * Empty stays empty. A bad format is never a reason to reject the lead.
 */
export function cleanUsPhone(value) {
  if (value == null) return "";
  const raw = String(value).trim();
  if (!raw) return "";

  const withoutExtension = raw.replace(
    /\s*(?:ext\.?|extension|x)\s*\d+\s*$/i,
    ""
  );
  const digits = withoutExtension.replace(/\D/g, "");

  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;

  return raw;
}
