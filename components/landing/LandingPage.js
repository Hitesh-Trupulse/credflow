import LandingRuntime from "@/components/landing/LandingRuntime";

function withoutLandingHeader(html) {
  return html.replace(/<header class="site">[\s\S]*?<\/header>/, "");
}

export default function LandingPage({ html, jsonLd }) {
  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: block }}
        />
      ))}
      <noscript>
        <style>{`.lp-root .reveal{opacity:1;transform:none}`}</style>
      </noscript>
      <div className="lp-root">
        <div
          dangerouslySetInnerHTML={{ __html: withoutLandingHeader(html) }}
        />
        <LandingRuntime />
      </div>
    </>
  );
}
