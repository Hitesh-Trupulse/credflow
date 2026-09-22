export const MARKETING_SLUGS = [
  "software",
  "services",
  "innetwork",
  "payers",
  "modules",
  "customers",
  "case-study-telehealth-audit",
  "case-study-credentialing-consultancy",
  "demo",
  "resources",
  "credentialing-terms",
  "caqh-credentialing-enrollment",
  "choosing-credentialing-software",
  "delegated-vs-non-delegated",
  "payer-enrollment-roles",
  "provider-enrollment-guide",
  "medicaid-provider-enrollment",
  "specialty-credentialing-services",
  "credentialing-specialist-role",
  "terms-and-conditions",
  "privacy-policy"
];

export function isMarketingPath(pathname) {
  if (!pathname) return false;
  if (pathname === "/") return true;
  const slug = pathname.slice(1);
  return MARKETING_SLUGS.includes(slug);
}
