import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'

export const metadata = {
  title: 'Delegated vs. Non-Delegated Credentialing and Enrollment | CredFlow AI',
  description: 'Learn the key differences between delegated and non-delegated credentialing models for medical groups. Understand which approach works best for your organization.',
  alternates: {
    canonical: "https://www.credflow.ai/delegated-vs-non-delegated-credentialing",
  },
}

export default function DelegatedVsNonDelegatedPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-black relative overflow-hidden py-24 lg:pt-48 sm:py-32 px-4 text-center border-b border-[#454545]">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/mainbg.png"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-start flex flex-col">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2 mb-6 leading-tight">
              Delegated vs. Non-Delegated Credentialing and Enrollment: What Medical Groups Need to Know
            </h1>
            <p className="mb-6 text-base sm:text-lg text-gray-300 leading-relaxed">
              Enrolling your providers with a payer? Are you Delegated or Non-Delegated? And what is the difference?
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-black max-w-[90vw] mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="blog-richtext prose prose-lg prose-invert max-w-none 
            prose-headings:text-white 
            prose-p:text-gray-300 
            prose-a:text-[#5063C6] 
            prose-strong:text-white 
            prose-code:text-[#B71CD2] 
            prose-pre:bg-black prose-pre:border prose-pre:border-[#454545] prose-pre:text-gray-300
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:text-gray-300
            prose-blockquote:text-gray-300 prose-blockquote:border-gray-600
            prose-h1:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white prose-h5:text-white prose-h6:text-white
            prose-em:text-gray-300
            prose-hr:border-gray-600
            [&_*]:text-gray-300 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white
            [&_p]:text-gray-300 [&_span]:text-gray-300 [&_div]:text-gray-300
            [&_strong]:text-white [&_b]:text-white
            [&_a]:text-[#5063C6] [&_a:hover]:text-[#B71CD2]
            [&_code]:text-[#B71CD2] [&_pre]:text-gray-300
            [&_ul]:text-gray-300 [&_ol]:text-gray-300 [&_li]:text-gray-300
            [&_blockquote]:text-gray-300">
            
            <p className="text-lg text-gray-200 font-medium">
              Here&apos;s the easy way to remember the distinction:
            </p>

            <p>
              It all comes down to <strong>who&apos;s doing the credentialing and primary source verification</strong>.
            </p>

            <ul>
              <li>If credentialing and verification are handled by the payer, you&apos;re in a <strong>non-delegated model</strong>.</li>
              <li>If they&apos;re handled in-house by the medical group or through a credentials verification organization (CVO) — with payer approval — that&apos;s <strong>delegated credentialing</strong>.</li>
            </ul>

            <p>
              This one distinction shapes how quickly new providers can get in-network, how soon you can bill, how much control you have over data accuracy, and how efficiently your team can scale.
            </p>

            <p>
              Let&apos;s break it down. If you are already confused with all of the credentialing and enrollment terms being used — check out our article <a href="/info/blog/demystifying-credentialing" className="text-[#5063C6] hover:text-[#B71CD2] transition-colors">Demystifying Credentialing</a>.
            </p>

            <h2 id="what-is-non-delegated-credentialing">What is Non-Delegated Credentialing?</h2>

            <p>
              In a non-delegated credentialing model, the payer controls the entire process.
            </p>

            <p>
              When you submit a provider to join a network, that payer performs:
            </p>

            <ul>
              <li><strong>Primary Source Verification (PSV)</strong> — verifying licenses, education, board certifications, and malpractice history directly with original sources.</li>
              <li><strong>Credentialing Committee review</strong> — the payer&apos;s internal review process before approval.</li>
              <li><strong>Network enrollment</strong> — once approved, the provider is added to the payer&apos;s systems.</li>
            </ul>

            <p>
              That means each payer performs its own full review, even if the provider has already been credentialed elsewhere.
            </p>

            <p>
              This model works fine for smaller practices or those contracting with only a few payers, but it comes with longer timelines, less visibility, and more administrative overhead. You don&apos;t control the overall timeline — the payer does. The process can take <strong>90–120 days</strong> for the payer to credential your provider and for them to be fully enrolled and &quot;in-network.&quot;
            </p>

            <p>
              Your team has to submit the same information to multiple payers, track credentialing statuses across several portals, and hope nothing falls through the cracks during the payer&apos;s credentialing process.
            </p>

            <h2 id="what-is-delegated-credentialing">What is Delegated Credentialing?</h2>

            <p>
              In a delegated provider credentialing model, the payer gives the medical group or a CVO the authority to handle credentialing tasks on their behalf.
            </p>

            <h3 id="what-is-a-cvo">What is a CVO?</h3>

            <p>
              A CVO (Credentials Verification Organization) is a third-party or internal unit that performs credentialing work for a provider network. They verify licenses, board certifications, education, malpractice coverage, and sanctions, and then issue credentialing decisions under defined standards.
            </p>

            <p>
              In a delegated model, the payer and the organization (medical group or CVO) sign a <strong>delegation agreement</strong> — a formal contract that spells out exactly:
            </p>

            <ul>
              <li>What credentialing and re-credentialing work the organization will perform.</li>
              <li>How often provider rosters and credentialing reports must be submitted.</li>
              <li>What performance metrics and audit standards the payer will use to monitor compliance.</li>
            </ul>

            <p>
              Essentially, the payer trusts the organization to credential providers correctly. The payer audits periodically to ensure compliance with NCQA, CMS, and their own internal standards.
            </p>

            <h2 id="typical-payer-requirements">Typical Payer Requirements for Delegated Credentialing</h2>

            <p>
              Payers don&apos;t delegate credentialing lightly. Before agreeing, they usually expect the organization or CVO to demonstrate <strong>six to twelve months</strong> of proven credentialing performance. Requirements often include:
            </p>

            <h3 id="documented-policies">1. Documented Policies and Procedures</h3>

            <ul>
              <li>Credentialing policies aligned with NCQA or CMS standards.</li>
              <li>A defined credentialing committee structure.</li>
              <li>A written re-credentialing process (typically every 2–3 years).</li>
            </ul>

            <h3 id="primary-source-verification">2. Primary Source Verification (PSV) Process</h3>

            <ul>
              <li>The organization must verify key elements — license, education, board certification, malpractice, and sanctions — directly from the source.</li>
              <li>The PSV process must be documented and auditable.</li>
            </ul>

            <h3 id="data-accuracy">3. Data Accuracy and Audit Readiness</h3>

            <ul>
              <li>Clean, verifiable provider data (CAQH profiles, licenses, DEA, NPI, etc.).</li>
              <li>On-site or virtual audits to confirm systems and recordkeeping.</li>
            </ul>

            <h3 id="technology-and-data-controls">4. Technology and Data Controls</h3>

            <ul>
              <li>Secure systems with role-based access and change tracking.</li>
              <li>Reporting capabilities such as rosters, PSV summaries, and credentialing logs.</li>
            </ul>

            <h3 id="quality-metrics">5. Quality Metrics and Oversight</h3>

            <ul>
              <li>Payer retains audit rights and may revoke delegation if standards aren&apos;t met.</li>
              <li>The delegated entity must respond to audit findings and maintain compliance.</li>
            </ul>

            <p>
              Some payers also look for NCQA or URAC certification, though it is not always required — especially if the payer conducts its own audit.
            </p>

            <h2 id="why-organizations-choose-delegation">Why Organizations Choose Delegation</h2>

            <p>
              Delegated credentialing gives medical groups and MSOs a major speed advantage. When you control credentialing internally:
            </p>

            <ul>
              <li>You can onboard new providers faster.</li>
              <li>You control the accuracy of data feeding into payer directories.</li>
              <li>Your internal team or CVO controls the credentialing timeline.</li>
              <li>You eliminate redundant work across payers.</li>
              <li>You can submit updated rosters or re-credentialing files without waiting for the payer&apos;s schedule.</li>
            </ul>

            <p>
              For organizations managing hundreds or thousands of providers, delegated credentialing transforms credentialing from a bottleneck into a scalable, repeatable workflow.
            </p>

            <h2 id="where-caqh-fits-in">Where CAQH and Primary Source Verification Fit In</h2>

            <p>
              <strong>CAQH ProView</strong> remains the central repository for provider data. Both delegated and non-delegated models may rely on it — but delegated organizations often use CAQH as one data source among many (licenses, NPPES, OIG, DEA, etc.).
            </p>

            <p>
              A completed CAQH profile is critical for non-delegated credentialing and enrollment.
            </p>

            <p>
              Meanwhile, <strong>Primary Source Verification (PSV)</strong> is non-negotiable in both models. Whether the payer performs PSV or the organization does, it ensures that provider credentials are validated at the issuing source.
            </p>

            <p>
              In delegated models, your PSV process becomes the backbone of your credentialing program and the focus of payer audits.
            </p>

            <h2 id="the-bottom-line">The Bottom Line</h2>

            <p>
              At its core, the difference between delegated and non-delegated credentialing comes down to one question:
            </p>

            <p className="text-xl font-semibold text-white my-6">
              Who&apos;s doing the credentialing and verification work — you or the payer?
            </p>

            <ul>
              <li>If it&apos;s the payer, expect longer timelines and less control, but fewer internal responsibilities.</li>
              <li>If it&apos;s you (through delegation), expect faster onboarding and more control — along with higher compliance and documentation requirements.</li>
            </ul>

            <p>
              Both models have their place. But for large, multi-payer organizations, delegation is increasingly becoming the standard for speed, control, and data integrity.
            </p>

            <p>
              With a modern credentialing platform like <strong>CredFlow AI</strong>, both delegated and non-delegated organizations can automate payer follow-ups, roster ingestion, network accuracy monitoring, and real-time tracking of credentialing requirements.
            </p>

            <div className="bg-gradient-to-tr from-[#5063C6]/10 to-[#B71CD2]/10 border border-[#454545] p-8 rounded-xl shadow-lg my-12">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to find out if your organization is delegation-ready?
              </h3>
              <p className="text-gray-300 mb-6">
                CredFlow AI helps medical groups, MSOs, and CVOs build automated, compliant, and auditable credentialing workflows.
              </p>
              <p className="text-white font-medium">
                Let&apos;s map your path toward faster enrollment and fewer delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

