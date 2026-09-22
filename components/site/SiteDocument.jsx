import SiteRuntime from "./SiteRuntime";
import { footerHtml, headerHtml, pages, sheetHtml } from "@/lib/site/content";

export default function SiteDocument({ slug, children }) {
  const body = pages[slug];
  if (!children && !body) return null;

  return (
    <SiteRuntime slug={slug}>
      <div className="cf-site js">
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: headerHtml }} />
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: sheetHtml }} />
        <main id="app" className="shell">
          <div className="route" data-route={slug}>
            {children || <div dangerouslySetInnerHTML={{ __html: body }} />}
          </div>
        </main>
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: footerHtml }} />
      </div>
    </SiteRuntime>
  );
}
