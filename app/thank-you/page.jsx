import SiteRuntime from "@/components/site/SiteRuntime";
import { footerHtml, headerHtml, sheetHtml } from "@/lib/site/content";
import Link from "next/link";

export const metadata = {
  title: { absolute: "Thanks for reaching out | CredFlow AI" },
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <SiteRuntime slug="demo">
      <div className="cf-site js">
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: headerHtml }} />
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: sheetHtml }} />
        <main id="app" className="shell">
          <div className="route" data-route="demo">
            <section className="phero">
              <span className="aura aura-a" />
              <span className="mesh" />
              <div className="inner">
                <span className="eyebrow">Request received</span>
                <h1>Thanks for reaching out.</h1>
                <p className="lede">
                  We&apos;re reviewing your details now. A member of the CredFlow AI team will contact you soon to share next steps.
                </p>
                <div className="hero-cta">
                  <Link className="btn btn-primary btn-lg" href="/demo">
                    <span className="wv"><i /><i /></span>
                    <span className="lbl">Schedule another call</span>
                  </Link>
                  <Link className="btn btn-ghost btn-lg" href="/">
                    <span className="wv"><i /><i /></span>
                    <span className="lbl">Return home</span>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: footerHtml }} />
      </div>
    </SiteRuntime>
  );
}
