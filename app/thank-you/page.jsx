import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 antialiased selection:bg-purple-500 selection:text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-purple-500/20 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
        

        <main className="grid lg:grid-cols-[1.2fr,0.8fr] gap-10 items-center">
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-10 shadow-2xl shadow-black/40 relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/40 via-blue-500/30 to-purple-500/40 rounded-2xl blur opacity-20 -z-10"></div>
            <div className="flex items-center gap-3 mb-5 text-green-400 font-semibold">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-900/40 border border-green-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8.5 12.086l6.793-6.793a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Request received
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Thanks for reaching out!
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              We’re reviewing your details now. A member of the Credflow AI team will contact you soon to share your ROI analysis and next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/get-started#demo-form"
                className="inline-flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-purple-900/40 border border-white/10 transition"
              >
                Schedule another call
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold border border-slate-700 text-slate-200 hover:border-purple-500 hover:text-white transition"
              >
                Return home
              </Link>
            </div>
         
          </div>
        </main>
      </div>
    </div>
  );
}

