import Footer from '../../components/Footer';

export const metadata = {
  title: 'Terms and Conditions',
  description: 'CredFlow AI Terms and Conditions - Read our terms of service for using our credentialing platform.',
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen pt-16 xl:pt-28 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
        <p className="text-gray-600 mb-8">Effective Date: December 29, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and CredFlow AI (&quot;CredFlow,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and use of the CredFlow medical credentialing software platform, including all related AI-powered services, features, and functionality (collectively, the &quot;Services&quot;).
            </p>
            <p className="mb-4">
              By accessing, registering for, or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access or use the Services.
            </p>
            <p className="mb-4">
              If you are entering into these Terms on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms, and all references to &quot;you&quot; shall refer to both you individually and the organization.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Services</h2>
            <p className="mb-4">
              CredFlow provides AI-powered medical credentialing software and services designed to streamline healthcare provider credentialing, payer enrollment, and compliance monitoring. Our Services include but are not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Automated credentialing workflows and Primary Source Verification (PSV)</li>
              <li>Payer enrollment and roster automation</li>
              <li>Continuous monitoring of licenses, certifications, and sanctions</li>
              <li>Real-time network intelligence and provider directory verification</li>
              <li>AI Communication Center and AI Telecaller functionality</li>
              <li>Dashboard and analytics tools for compliance and revenue management</li>
              <li>Directory audit and No Surprises Act compliance tools</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Eligibility and Account Registration</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Eligibility</h3>
            <p className="mb-4">
              You must be at least 18 years of age and have the legal capacity to enter into binding contracts to use our Services. Our Services are intended for use by healthcare organizations, credentialing professionals, and authorized individuals involved in medical credentialing and enrollment processes.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Account Registration</h3>
            <p className="mb-4">To access certain features of the Services, you must create an account. You agree to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security and confidentiality of your login credentials</li>
              <li>Notify us immediately of any unauthorized access or security breach</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Waitlist Registration</h3>
            <p className="mb-4">
              Registration for our waitlist does not guarantee access to the Services. We reserve the right to accept or decline any waitlist registration at our sole discretion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Acceptable Use</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Permitted Use</h3>
            <p className="mb-4">
              You may use the Services solely for lawful purposes related to healthcare credentialing, provider enrollment, and compliance management. You agree to use the Services in compliance with all applicable federal, state, and local laws and regulations, including but not limited to HIPAA, the No Surprises Act, and other healthcare privacy and security requirements.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Prohibited Conduct</h3>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Use the Services in any manner that violates applicable laws or regulations</li>
              <li>Access or attempt to access systems, data, or accounts not authorized for your use</li>
              <li>Reverse engineer, decompile, disassemble, or otherwise attempt to discover the source code or underlying algorithms of the Services</li>
              <li>Interfere with or disrupt the integrity or performance of the Services</li>
              <li>Introduce viruses, malware, or other harmful code</li>
              <li>Use automated systems (bots, scrapers) to access the Services without authorization</li>
              <li>Attempt to bypass security measures or access controls</li>
              <li>Misrepresent your identity or affiliation</li>
              <li>Use the Services to transmit false, misleading, or fraudulent information</li>
              <li>Share your account credentials with unauthorized third parties</li>
              <li>Resell, sublicense, or redistribute the Services without authorization</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property Rights</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">5.1 CredFlow Ownership</h3>
            <p className="mb-4">
              The Services, including all software, technology, content, trademarks, logos, and intellectual property, are owned by CredFlow or its licensors and are protected by United States and international copyright, trademark, patent, and other intellectual property laws. All rights not expressly granted herein are reserved.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Limited License</h3>
            <p className="mb-4">
              Subject to your compliance with these Terms, CredFlow grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Services solely for your internal business purposes related to credentialing and enrollment activities.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">5.3 User Content</h3>
            <p className="mb-4">
              You retain ownership of all data, information, and content you submit to the Services (&quot;User Content&quot;). By submitting User Content, you grant CredFlow a worldwide, royalty-free, non-exclusive license to use, process, store, and display such content solely to provide and improve the Services. You represent and warrant that you have all necessary rights to grant this license.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">5.4 Feedback</h3>
            <p className="mb-4">
              If you provide suggestions, ideas, or feedback about the Services, CredFlow may use such feedback without any obligation to you, including for product improvements and development.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Protection and HIPAA Compliance</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">6.1 Business Associate Relationship</h3>
            <p className="mb-4">
              To the extent that CredFlow creates, receives, maintains, or transmits Protected Health Information (PHI) on your behalf, CredFlow shall function as a Business Associate under HIPAA. The parties shall enter into a separate Business Associate Agreement (BAA) that governs the use and disclosure of PHI.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">6.2 Data Security</h3>
            <p className="mb-4">
              CredFlow implements administrative, physical, and technical safeguards designed to protect the confidentiality, integrity, and availability of your data in accordance with HIPAA Security Rule requirements. However, no security measures are completely impenetrable, and we cannot guarantee absolute security.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">6.3 Your Responsibilities</h3>
            <p className="mb-4">You are responsible for:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Ensuring you have appropriate authority to share information with CredFlow</li>
              <li>Obtaining necessary consents and authorizations for data collection and sharing</li>
              <li>Implementing appropriate security measures on your end</li>
              <li>Training your users on proper use of the Services and data protection</li>
              <li>Reporting any suspected security incidents or breaches</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Fees and Payment</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">7.1 Subscription Fees</h3>
            <p className="mb-4">
              Access to certain features of the Services may require payment of subscription fees. Fees are specified in your service agreement or order form and are subject to change with advance notice.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">7.2 Payment Terms</h3>
            <p className="mb-4">
              You agree to pay all applicable fees on the payment schedule specified in your agreement. Fees are non-refundable except as expressly stated in your service agreement. Late payments may result in service suspension and assessment of late fees.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">7.3 Taxes</h3>
            <p className="mb-4">
              All fees are exclusive of applicable taxes, duties, and governmental charges. You are responsible for paying all such charges except for taxes based on CredFlow&apos;s net income.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Service Level and Support</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">8.1 Service Availability</h3>
            <p className="mb-4">
              We strive to maintain high availability of the Services but do not guarantee uninterrupted or error-free operation. We may perform scheduled maintenance and experience unplanned downtime. We will provide reasonable notice of scheduled maintenance when possible.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">8.2 Support Services</h3>
            <p className="mb-4">
              Support services are provided according to the terms specified in your service agreement. Standard support includes email assistance at hello@credflow.ai. Additional support options may be available based on your subscription level.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">8.3 Service Modifications</h3>
            <p className="mb-4">
              We reserve the right to modify, update, or discontinue features of the Services at any time. We will provide reasonable notice of material changes that negatively impact functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. AI and Automation Disclaimer</h2>
            <p className="mb-4">
              The Services utilize artificial intelligence and machine learning technologies to automate credentialing workflows. While our AI is designed to improve efficiency and accuracy, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>AI-generated outputs may contain errors and should be reviewed by qualified personnel</li>
              <li>You maintain ultimate responsibility for credentialing decisions and compliance</li>
              <li>Human oversight and review remain essential components of the credentialing process</li>
              <li>The Services are tools to assist, not replace, professional judgment</li>
              <li>CredFlow is not responsible for decisions made based solely on AI recommendations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Third-Party Integrations</h2>
            <p className="mb-4">
              The Services may integrate with third-party systems, including payer portals, verification databases, and other healthcare technology platforms. We are not responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>The availability, accuracy, or functionality of third-party services</li>
              <li>Changes to third-party APIs or systems that affect integration</li>
              <li>Third-party terms of service or privacy policies</li>
              <li>Data accuracy or completeness from third-party sources</li>
            </ul>
            <p className="mb-4">
              Your use of third-party services through our platform is subject to the applicable third-party terms and conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Warranties and Disclaimers</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">11.1 Limited Warranty</h3>
            <p className="mb-4">
              We warrant that the Services will perform substantially in accordance with our documentation under normal use. This warranty does not cover issues caused by misuse, unauthorized modifications, or third-party systems.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">11.2 Disclaimers</h3>
            <p className="mb-4">
              EXCEPT AS EXPRESSLY PROVIDED IN SECTION 11.1, THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY LAW, CREDFLOW DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT</li>
              <li>WARRANTIES REGARDING ACCURACY, RELIABILITY, OR COMPLETENESS OF DATA OR INFORMATION</li>
              <li>WARRANTIES THAT THE SERVICES WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE</li>
              <li>WARRANTIES REGARDING RESULTS OR OUTCOMES FROM USE OF THE SERVICES</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">11.3 Professional Advice Disclaimer</h3>
            <p className="mb-4">
              The Services do not provide legal, medical, or professional advice. You should consult qualified professionals for advice specific to your circumstances. CredFlow is not responsible for decisions made based on information from the Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Limitation of Liability</h2>
            <p className="mb-4 font-semibold">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">12.1 Exclusion of Damages</h3>
            <p className="mb-4">
              CREDFLOW SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, REVENUE, BUSINESS OPPORTUNITIES, OR GOODWILL, ARISING FROM OR RELATED TO:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>YOUR USE OF OR INABILITY TO USE THE SERVICES</li>
              <li>UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR DATA</li>
              <li>ERRORS, INACCURACIES, OR OMISSIONS IN THE SERVICES</li>
              <li>DELAYS IN CREDENTIALING OR ENROLLMENT PROCESSES</li>
              <li>THIRD-PARTY SERVICES OR SYSTEMS</li>
              <li>DECISIONS MADE BASED ON AI-GENERATED OUTPUTS</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">12.2 Cap on Liability</h3>
            <p className="mb-4">
              CREDFLOW&apos;S TOTAL AGGREGATE LIABILITY ARISING FROM OR RELATED TO THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE TOTAL FEES PAID BY YOU TO CREDFLOW DURING THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">12.3 Essential Purpose</h3>
            <p className="mb-4">
              THE LIMITATIONS IN THIS SECTION APPLY EVEN IF ANY REMEDY FAILS ITS ESSENTIAL PURPOSE AND REGARDLESS OF THE THEORY OF LIABILITY (CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE).
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">12.4 State Law Variations</h3>
            <p className="mb-4">
              Some jurisdictions do not allow exclusion or limitation of certain damages. In such jurisdictions, our liability is limited to the maximum extent permitted by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">13. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify, defend, and hold harmless CredFlow, its affiliates, officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys&apos; fees) arising from or related to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Your use or misuse of the Services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any applicable laws or regulations</li>
              <li>Your violation of third-party rights</li>
              <li>User Content you submit to the Services</li>
              <li>Credentialing decisions made by you or your organization</li>
            </ul>
            <p className="mb-4">
              This indemnification obligation survives termination of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">14. Term and Termination</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">14.1 Term</h3>
            <p className="mb-4">
              These Terms commence when you first access the Services and continue until terminated as provided herein.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">14.2 Termination by You</h3>
            <p className="mb-4">
              You may terminate your account at any time by contacting us at hello@credflow.ai. Upon termination, you remain responsible for any fees incurred prior to termination.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">14.3 Termination by CredFlow</h3>
            <p className="mb-4">We may suspend or terminate your access to the Services immediately, without prior notice, if:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You breach these Terms or any applicable policies</li>
              <li>You fail to pay fees when due</li>
              <li>Your use poses a security risk or violates laws</li>
              <li>We are required to do so by law</li>
              <li>We discontinue the Services</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">14.4 Effect of Termination</h3>
            <p className="mb-4">Upon termination:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Your right to access and use the Services immediately ceases</li>
              <li>You remain obligated to pay any outstanding fees</li>
              <li>We may delete your account and User Content after a reasonable transition period</li>
              <li>Provisions that by their nature should survive termination shall survive, including intellectual property rights, disclaimers, limitations of liability, and dispute resolution</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">14.5 Data Retrieval</h3>
            <p className="mb-4">
              Upon request made within thirty (30) days of termination, we will provide reasonable assistance in retrieving your data, subject to technical feasibility and applicable fees. After this period, we may delete your data in accordance with our data retention policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">15. Dispute Resolution</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">15.1 Informal Resolution</h3>
            <p className="mb-4">
              Before initiating formal dispute resolution, you agree to contact us at hello@credflow.ai to attempt to resolve the dispute informally. We will work in good faith to resolve disputes through direct negotiation.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">15.2 Binding Arbitration</h3>
            <p className="mb-4">
              If informal resolution is unsuccessful, any dispute arising from or relating to these Terms or the Services shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. The arbitration shall be conducted by a single arbitrator and shall take place in the state where CredFlow&apos;s principal office is located, unless otherwise agreed.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">15.3 Class Action Waiver</h3>
            <p className="mb-4 font-semibold">
              YOU AND CREDFLOW AGREE THAT DISPUTES WILL BE RESOLVED ONLY ON AN INDIVIDUAL BASIS AND NOT AS A CLASS ACTION, CONSOLIDATED ACTION, OR REPRESENTATIVE ACTION. You and CredFlow waive the right to participate in any class action or class-wide arbitration.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">15.4 Exceptions</h3>
            <p className="mb-4">
              Either party may seek injunctive or equitable relief in court to prevent unauthorized use of intellectual property or confidential information. Small claims court proceedings are also exempt from the arbitration requirement if they meet jurisdictional requirements.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">15.5 Governing Law</h3>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the state in which CredFlow&apos;s principal office is located, without regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">16. General Provisions</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.1 Entire Agreement</h3>
            <p className="mb-4">
              These Terms, together with any service agreement, Business Associate Agreement, and our Privacy Policy, constitute the entire agreement between you and CredFlow regarding the Services and supersede all prior agreements and understandings.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.2 Modifications</h3>
            <p className="mb-4">
              We may modify these Terms at any time by posting the updated Terms on our website and notifying you via email or through the Services. Your continued use of the Services after the effective date of modifications constitutes acceptance of the updated Terms. Material changes will be communicated with at least thirty (30) days&apos; notice.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.3 Assignment</h3>
            <p className="mb-4">
              You may not assign or transfer these Terms or your rights under these Terms without our prior written consent. We may assign these Terms without restriction, including in connection with a merger, acquisition, or sale of assets.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.4 Severability</h3>
            <p className="mb-4">
              If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. Invalid provisions shall be modified to the minimum extent necessary to make them enforceable while preserving their intent.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.5 Waiver</h3>
            <p className="mb-4">
              No waiver of any provision of these Terms shall be deemed a further or continuing waiver of such provision or any other provision. Our failure to enforce any right or provision shall not constitute a waiver of that right or provision.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.6 Force Majeure</h3>
            <p className="mb-4">
              Neither party shall be liable for failure to perform obligations due to circumstances beyond reasonable control, including natural disasters, acts of war, terrorism, labor disputes, governmental actions, or failures of third-party services, provided reasonable efforts are made to minimize impact.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.7 Independent Contractors</h3>
            <p className="mb-4">
              The parties are independent contractors. These Terms do not create a partnership, joint venture, employment, or agency relationship.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.8 Export Control</h3>
            <p className="mb-4">
              The Services and underlying technology may be subject to U.S. export control laws. You agree to comply with all applicable export and import laws and regulations.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.9 U.S. Government Rights</h3>
            <p className="mb-4">
              If you are a U.S. government entity, the Services are provided as &quot;commercial computer software&quot; and &quot;commercial computer software documentation&quot; with restricted rights as defined in applicable federal acquisition regulations.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.10 Language</h3>
            <p className="mb-4">
              These Terms are drafted in English. Any translations are provided for convenience only. In the event of conflicts between versions, the English version controls.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">17. Contact Information</h2>
            <p className="mb-4">
              For questions, concerns, or notices regarding these Terms, please contact:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="font-semibold mb-2">CredFlow AI</p>
              <p>Email: hello@credflow.ai</p>
              <p>Legal Department: legal@credflow.ai</p>
              <p>Website: www.credflow.ai</p>
            </div>
            <p className="mb-4">
              For Business Associate Agreement requests or HIPAA-related matters, please contact: hipaa@credflow.ai
            </p>
            <p className="text-gray-600 italic mb-4">Last Updated: December 29, 2025</p>
            <p className="mb-4">
              By using the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

