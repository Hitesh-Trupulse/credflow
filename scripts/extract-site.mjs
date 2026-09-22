import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "CredFlow-AI-website.html"), "utf8");

function matchingBrace(css, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < css.length; i++) {
    if (css.startsWith("/*", i)) {
      const end = css.indexOf("*/", i + 2);
      i = end === -1 ? css.length : end + 1;
      continue;
    }
    const c = css[i];
    if (c === '"' || c === "'") {
      i++;
      while (i < css.length && css[i] !== c) {
        if (css[i] === "\\") i++;
        i++;
      }
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return css.length - 1;
}

function prefixSelector(selector) {
  const trimmed = selector.trim();
  if (!trimmed || trimmed.startsWith("@")) return selector;
  return trimmed
    .split(",")
    .map((part) => {
      const s = part.trim();
      if (!s) return s;
      if (s === "from" || s === "to" || /^\d+(\.\d+)?%$/.test(s)) return s;
      if (s.startsWith(":root")) return s.replace(":root", ".cf-site");
      if (/^html\b/.test(s)) return s.replace(/^html/, ".cf-site");
      if (/^body\b/.test(s)) return s.replace(/^body/, ".cf-site");
      return `.cf-site ${s}`;
    })
    .join(",");
}

function scopeCss(css) {
  let i = 0;
  let result = "";
  const len = css.length;

  const skipComment = () => {
    if (!css.startsWith("/*", i)) return false;
    const end = css.indexOf("*/", i + 2);
    const stop = end === -1 ? len : end + 2;
    result += css.slice(i, stop);
    i = stop;
    return true;
  };

  while (i < len) {
    if (skipComment()) continue;
    if (/\s/.test(css[i])) {
      result += css[i];
      i++;
      continue;
    }
    if (css[i] === "@") {
      const rest = css.slice(i);
      if (/^@(keyframes|-webkit-keyframes|font-face)\b/.test(rest)) {
        const brace = css.indexOf("{", i);
        const end = matchingBrace(css, brace);
        result += css.slice(i, end + 1);
        i = end + 1;
        continue;
      }
      if (/^@(media|supports|container)\b/.test(rest)) {
        const brace = css.indexOf("{", i);
        const end = matchingBrace(css, brace);
        result += css.slice(i, brace + 1);
        result += scopeCss(css.slice(brace + 1, end));
        result += "}";
        i = end + 1;
        continue;
      }
    }
    const brace = css.indexOf("{", i);
    if (brace === -1) {
      result += css.slice(i);
      break;
    }
    const end = matchingBrace(css, brace);
    const selector = css.slice(i, brace);
    const body = css.slice(brace + 1, end);
    result += `${prefixSelector(selector)}{${body}}`;
    i = end + 1;
  }
  return result;
}

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error("style block not found");
let css = scopeCss(styleMatch[1]);
css = css.replace(
  "-webkit-font-smoothing:antialiased;overflow-x:hidden;",
  "-webkit-font-smoothing:antialiased;"
);
css += `
.cf-site .route [id]{scroll-margin-top:120px}
.cf-site .privacy-choices{font:inherit;color:inherit;padding:0}
html:has(.cf-site){scroll-behavior:smooth}
body:has(.cf-site){background:#000;overflow-x:hidden;margin:0}
`;

const FIELD_NAMES = {
  nm: "fullName",
  mnm: "fullName",
  sfn: "firstName",
  sln: "lastName",
  em: "email",
  sem: "email",
  mem: "email",
  co: "organization",
  sor: "organization",
  mco: "organization",
  pc: "providerCount",
  spc: "providerCount",
  mpc: "providerCount",
  ts: "targetPayers",
  shl: "targetPayers",
};

function rewriteLinks(source) {
  return source.replace(
    /href="#\/([a-z0-9\-]+)(?:\/([a-z0-9\-]+))?"/gi,
    (_, slug, anchor) => {
      const path = slug === "index" ? "/" : `/${slug}`;
      return `href="${path}${anchor ? `#${anchor}` : ""}"`;
    }
  );
}

function nameFields(source) {
  const ids = Object.keys(FIELD_NAMES).join("|");
  const re = new RegExp(
    `<(input|select|textarea)([^>]*?)\\sid="(${ids})"`,
    "g"
  );
  return source.replace(re, (full, tag, mid, id) => {
    if (/\sname=/.test(full)) return full;
    return `<${tag}${mid} id="${id}" name="${FIELD_NAMES[id]}"`;
  });
}

function prepare(source) {
  return nameFields(rewriteLinks(source));
}

const headerStart = html.indexOf('<header class="hdr"');
const headerEnd = html.indexOf("</header>", headerStart);
const headerHtml = prepare(html.slice(headerStart, headerEnd + "</header>".length));

const sheetStart = html.indexOf('<div class="sheet"', headerEnd);
const mainStart = html.indexOf('<main id="app"', sheetStart);
const sheetHtml = prepare(html.slice(sheetStart, mainStart).trim());

const footerStart = html.indexOf('<footer class="ftr">', mainStart);
const footerEnd = html.indexOf("</footer>", footerStart);
let footerHtml = prepare(html.slice(footerStart, footerEnd + "</footer>".length));
footerHtml = footerHtml.replace(
  '<div class="sub">',
  '<form class="nl-form" novalidate><div class="sub">'
);
footerHtml = footerHtml.replace(
  'type="button"><span class="wv"><i></i><i></i></span><span class="lbl">Join Us</span></button>',
  'type="submit"><span class="wv"><i></i><i></i></span><span class="lbl">Join Us</span></button>'
);
footerHtml = footerHtml.replace(
  "</div>\n    </div>\n    <div>\n      <h4>Products</h4>",
  "</div></form>\n    </div>\n    <div>\n      <h4>Products</h4>"
);
footerHtml = footerHtml.replace(
  /<label class="privacy-choices"[^>]*>[\s\S]*?<\/label>/,
  '<button type="button" class="privacy-choices" data-privacy-choices>Your Privacy Choices</button>'
);

const mainEnd = html.indexOf("</main>", mainStart);
const main = html.slice(mainStart, mainEnd);
const starts = [];
const routeRe = /<div class="route" id="([^"]+)" data-route="([^"]+)"/g;
let match;
while ((match = routeRe.exec(main))) {
  starts.push({ slug: match[2], index: match.index });
}

const pages = {};
for (let n = 0; n < starts.length; n++) {
  const from = starts[n].index;
  const to = n + 1 < starts.length ? starts[n + 1].index : main.length;
  let chunk = main.slice(from, to);
  chunk = chunk.replace(/^[\s\S]*?<div class="nojs-nav"[\s\S]*?<\/div>/, "");
  chunk = chunk.replace(/<\/div>\s*$/, "");
  pages[starts[n].slug] = prepare(chunk.trim());
}

const titles = {
  index: "CredFlow AI - Healthcare Credentialing Management Software",
  software: "AI Provider Credentialing Software & Enrollment Platform | CredFlow",
  services: "Credentialing Services | CredFlow AI",
  innetwork: "InNetwork.ai — Provider Network Lookup | CredFlow AI",
  payers: "Payer Directory Auditor | CredFlow AI",
  resources: "Resources | CredFlow AI",
  "terms-and-conditions": "Terms & Conditions | CredFlow AI",
  "privacy-policy": "Privacy Policy | CredFlow AI",
  demo: "Book a Demo | CredFlow AI",
  modules: "Modules | CredFlow AI",
  customers: "Who We Help | CredFlow AI",
};

const outDir = path.join(root, "lib", "site");
fs.mkdirSync(outDir, { recursive: true });

const content = `/* Generated from CredFlow-AI-website.html. Do not edit by hand. */
export const headerHtml = ${JSON.stringify(headerHtml)};
export const sheetHtml = ${JSON.stringify(sheetHtml)};
export const footerHtml = ${JSON.stringify(footerHtml)};
export const pages = ${JSON.stringify(pages)};
export const titles = ${JSON.stringify(titles, null, 2)};
`;

fs.writeFileSync(path.join(outDir, "content.js"), content);
fs.writeFileSync(path.join(root, "app", "site-ui.css"), css);

const slugs = Object.keys(pages).filter((slug) => slug !== "index");
const pathsFile = `export const MARKETING_SLUGS = ${JSON.stringify(slugs, null, 2)};

export function isMarketingPath(pathname) {
  if (!pathname) return false;
  if (pathname === "/") return true;
  const slug = pathname.slice(1);
  return MARKETING_SLUGS.includes(slug);
}
`;
fs.writeFileSync(path.join(outDir, "paths.js"), pathsFile);

console.log("pages", Object.keys(pages).join(", "));
for (const [slug, body] of Object.entries(pages)) {
  console.log(slug, body.length, body.slice(0, 60).replace(/\s+/g, " "), "...", body.slice(-40).replace(/\s+/g, " "));
}
console.log("css", css.length, "header", headerHtml.includes('href="/"'), "footer form", footerHtml.includes("nl-form"));
