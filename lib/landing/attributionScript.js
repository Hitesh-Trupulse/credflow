/** First-party attribution capture. Runs in <head> on every page, outside GTM. */
export const CF_GA4_ID = "G-1MSBXJCHJ7";

export const attributionHeadScript = `
(function () {
  window.CF_GA4_ID = window.CF_GA4_ID || ${JSON.stringify("G-1MSBXJCHJ7")};
  var CAPTURE = ['gclid', 'gbraid', 'wbraid', 'li_fat_id', 'fbclid',
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];
  var MAX_AGE = 7776000;
  var host = location.hostname;
  var onBrand = host === 'credflow.ai' || host.indexOf('.credflow.ai') !== -1;
  var SCOPE = onBrand
    ? '; domain=.credflow.ai; samesite=lax; secure'
    : ('; samesite=lax' + (location.protocol === 'https:' ? '; secure' : ''));

  function read(name) {
    var raw = document.cookie.split('; ').filter(function (c) { return c.indexOf(name + '=') === 0; })[0];
    if (!raw) return null;
    try { return JSON.parse(decodeURIComponent(raw.split('=').slice(1).join('='))); } catch (e) { return null; }
  }
  function write(name, obj) {
    document.cookie = name + '=' + encodeURIComponent(JSON.stringify(obj)) + '; path=/; max-age=' + MAX_AGE + SCOPE;
  }
  window.cfReadAttribution = function () {
    return { first_touch: read('cf_attr_first'), last_touch: read('cf_attr_last') };
  };

  var params = new URLSearchParams(window.location.search);
  var found = {};
  CAPTURE.forEach(function (k) { if (params.get(k)) found[k] = params.get(k); });
  if (!Object.keys(found).length) return;

  found.landing_page = window.location.pathname;
  found.referrer = document.referrer || null;
  found.ts = new Date().toISOString();

  write('cf_attr_last', found);
  if (!read('cf_attr_first')) write('cf_attr_first', found);
})();
`;
