import Footer from '../../components/Footer';

export const metadata = {
  title: 'Privacy Policy',
  description: 'CredFlow AI Privacy Policy - Learn how we collect, use, and protect your information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Effective Date: December 29, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">
              CredFlow AI (&quot;CredFlow,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy and maintaining the security of your personal and protected health information. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our medical credentialing software platform and AI-powered services (collectively, the &quot;Services&quot;).
            </p>
            <p className="mb-4">
              By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use the Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Healthcare Provider Information</h3>
            <p className="mb-4">
              In the course of providing credentialing and enrollment services, we collect and process:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provider demographic information including name, National Provider Identifier (NPI), addresses, and contact details</li>
              <li>Professional credentials including medical licenses, DEA registrations, board certifications, and malpractice insurance information</li>
              <li>Educational background, training history, and work experience</li>
              <li>Practice location information and organizational affiliations</li>
              <li>Tax identification numbers (TIN) and billing information</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Payer Network Data</h3>
            <p className="mb-4">
              We collect and maintain information about healthcare payer networks, including enrollment status, network participation, and directory information necessary to verify provider credentials and maintain accurate provider directories.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Account and User Information</h3>
            <p className="mb-4">
              When you create an account or use our Services, we collect:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Name, email address, phone number, and job title</li>
              <li>Organization name and business information</li>
              <li>Login credentials and authentication information</li>
              <li>User preferences and system settings</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.4 Usage and Technical Data</h3>
            <p className="mb-4">
              We automatically collect certain information about your device and how you interact with our Services:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>IP address, browser type, operating system, and device information</li>
              <li>Log data including access times, pages viewed, and actions taken within the platform</li>
              <li>Cookies and similar tracking technologies to enhance user experience and platform functionality</li>
              <li>Performance metrics and error reports to improve service quality</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.5 Communications</h3>
            <p className="mb-4">
              We collect information you provide when you contact our support team, participate in surveys, or communicate with us through our AI Communication Center or AI Telecaller features.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect for the following purposes:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Service Delivery</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Processing credentialing applications and Primary Source Verification (PSV) requirements</li>
              <li>Managing payer enrollment and roster automation workflows</li>
              <li>Conducting continuous monitoring of licenses, certifications, and sanctions</li>
              <li>Providing real-time network intelligence and provider directory verification</li>
              <li>Generating compliance reports and revenue-at-risk dashboards</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Platform Improvement and AI Training</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Training and improving our AI agents to enhance automation accuracy</li>
              <li>Analyzing usage patterns to optimize workflows and user experience</li>
              <li>Developing new features and functionality</li>
              <li>Identifying and resolving technical issues</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Communication and Support</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Responding to inquiries and providing customer support</li>
              <li>Sending service updates, security alerts, and administrative messages</li>
              <li>Providing training and onboarding assistance</li>
              <li>Sending marketing communications about our Services (with your consent where required)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.4 Compliance and Legal Obligations</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Complying with applicable healthcare regulations including HIPAA, the No Surprises Act, and state-specific requirements</li>
              <li>Maintaining audit trails and evidence artifacts for regulatory compliance</li>
              <li>Detecting and preventing fraud, security incidents, and unauthorized access</li>
              <li>Responding to legal requests and enforcing our terms of service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Information Sharing and Disclosure</h2>
            <p className="mb-4">We do not sell your personal information. We may share your information in the following circumstances:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.1 With Healthcare Payers</h3>
            <p className="mb-4">
              We share provider credentialing information with healthcare payers as necessary to facilitate enrollment, maintain provider directories, and ensure compliance with payer network requirements. This sharing is essential to the credentialing process and is conducted pursuant to Business Associate Agreements where applicable.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.2 With Primary Source Verification Entities</h3>
            <p className="mb-4">
              We transmit provider information to authoritative sources such as state medical boards, DEA, and certification bodies to verify credentials and conduct ongoing monitoring.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.3 With Your Organization</h3>
            <p className="mb-4">
              If you use our Services as part of a healthcare organization, we share information with authorized users within your organization as necessary to provide the Services and fulfill credentialing requirements.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.4 Service Providers</h3>
            <p className="mb-4">
              We engage trusted third-party service providers who perform services on our behalf, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Cloud infrastructure and hosting providers</li>
              <li>Data analytics and business intelligence services</li>
              <li>Communication and customer support platforms</li>
              <li>Security and fraud prevention services</li>
            </ul>
            <p className="mb-4">
              These service providers are contractually obligated to protect your information and may only use it to provide services to us.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.5 Legal Requirements</h3>
            <p className="mb-4">
              We may disclose information if required by law, regulation, legal process, or governmental request, or when we believe disclosure is necessary to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Comply with applicable laws and regulations</li>
              <li>Respond to lawful requests from public authorities</li>
              <li>Protect the rights, property, or safety of CredFlow, our users, or the public</li>
              <li>Detect, prevent, or address fraud, security, or technical issues</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.6 Business Transfers</h3>
            <p className="mb-4">
              In the event of a merger, acquisition, reorganization, bankruptcy, or sale of assets, your information may be transferred as part of that transaction. We will provide notice before your information is transferred and becomes subject to a different privacy policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p className="mb-4">
              We implement comprehensive security measures to protect your information from unauthorized access, alteration, disclosure, or destruction:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>End-to-end encryption for data in transit and at rest</li>
              <li>Multi-factor authentication and role-based access controls</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Comprehensive audit logging and monitoring systems</li>
              <li>Employee training on data protection and security best practices</li>
              <li>Incident response procedures and breach notification protocols</li>
              <li>HIPAA-compliant infrastructure and business processes</li>
            </ul>
            <p className="mb-4">
              While we strive to protect your information using industry-standard security measures, no method of transmission over the Internet or electronic storage is completely secure. We cannot guarantee absolute security but maintain commercially reasonable safeguards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. HIPAA Compliance</h2>
            <p className="mb-4">
              As a provider of healthcare credentialing services, CredFlow operates as a Business Associate under the Health Insurance Portability and Accountability Act (HIPAA). We:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Enter into Business Associate Agreements (BAAs) with covered entities and other business associates</li>
              <li>Implement administrative, physical, and technical safeguards as required by the HIPAA Security Rule</li>
              <li>Use and disclose Protected Health Information (PHI) only as permitted by applicable BAAs and HIPAA regulations</li>
              <li>Maintain breach notification procedures in accordance with HIPAA requirements</li>
              <li>Provide individuals with rights regarding their PHI as required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Retention</h2>
            <p className="mb-4">
              We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Retention periods vary based on:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>The nature of the information and purpose for collection</li>
              <li>Healthcare regulatory requirements and credentialing standards</li>
              <li>Legal and contractual obligations</li>
              <li>Audit and compliance documentation requirements</li>
            </ul>
            <p className="mb-4">
              When information is no longer needed, we securely delete or anonymize it in accordance with our data retention policies and applicable regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Your Rights and Choices</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">8.1 Access and Correction</h3>
            <p className="mb-4">
              You have the right to access and update your personal information. You may review and modify your account information through the platform or by contacting us at hello@credflow.ai.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">8.2 Data Portability</h3>
            <p className="mb-4">
              Where technically feasible and legally required, you may request a copy of your information in a portable format.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">8.3 Deletion Requests</h3>
            <p className="mb-4">
              You may request deletion of your personal information, subject to certain limitations. We may retain information as required by law, for legitimate business purposes, or to fulfill regulatory obligations in the healthcare credentialing context.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">8.4 Marketing Communications</h3>
            <p className="mb-4">
              You may opt out of receiving marketing communications by following the unsubscribe instructions in our emails or contacting us directly. Note that you will continue to receive transactional and service-related communications.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">8.5 Cookies and Tracking</h3>
            <p className="mb-4">
              Most web browsers allow you to control cookies through their settings. However, disabling cookies may limit your ability to use certain features of our Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. State-Specific Privacy Rights</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">9.1 California Residents</h3>
            <p className="mb-4">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Right to know what personal information we collect, use, disclose, and sell</li>
              <li>Right to request deletion of personal information</li>
              <li>Right to opt out of the sale or sharing of personal information (we do not sell personal information)</li>
              <li>Right to correct inaccurate personal information</li>
              <li>Right to limit use and disclosure of sensitive personal information</li>
              <li>Right to non-discrimination for exercising your privacy rights</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, contact us at hello@credflow.ai. We will verify your identity before responding to your request.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">9.2 Other State Privacy Laws</h3>
            <p className="mb-4">
              If you reside in Virginia, Colorado, Connecticut, Utah, or other states with comprehensive privacy laws, you may have similar rights. Please contact us to exercise your rights under applicable state law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. International Data Transfers</h2>
            <p className="mb-4">
              Our Services are primarily intended for users in the United States. If you access our Services from outside the United States, your information may be transferred to, stored, and processed in the United States and other countries where our service providers operate. By using our Services, you consent to such transfers.
            </p>
            <p className="mb-4">
              We implement appropriate safeguards for international data transfers in accordance with applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Children&apos;s Privacy</h2>
            <p className="mb-4">
              Our Services are not directed to individuals under the age of 18, and we do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete such information promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Third-Party Links and Services</h2>
            <p className="mb-4">
              Our Services may contain links to third-party websites, applications, or services that are not operated by CredFlow. This Privacy Policy does not apply to third-party sites or services. We encourage you to review the privacy policies of any third-party services you access.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">13. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Posting the updated Privacy Policy on our website with a new effective date</li>
              <li>Sending an email notification to the address associated with your account</li>
              <li>Displaying a prominent notice within our Services</li>
            </ul>
            <p className="mb-4">
              Your continued use of the Services after the effective date of the updated Privacy Policy constitutes acceptance of the changes. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-8 mb-4">14. Contact Information</h2>
            <p className="mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="font-semibold mb-2">CredFlow AI</p>
              <p>Email: hello@credflow.ai</p>
              <p>Privacy Officer: privacy@credflow.ai</p>
              <p>Website: www.credflow.ai</p>
            </div>
            <p className="mb-4">
              For HIPAA-related inquiries or to exercise rights regarding Protected Health Information, please contact our Privacy Officer at the email address above.
            </p>
            <p className="text-gray-600 italic">Last Updated: December 29, 2025</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

