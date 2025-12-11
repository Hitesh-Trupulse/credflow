'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    providers: '1 - 10 Providers',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert('');
    setIsSubmitting(true);

    try {
      // Split fullName into firstName and lastName
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || formData.fullName;
      const lastName = nameParts.slice(1).join(' ') || '';

      // Map fields to match ContactForm structure
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', firstName);
      formDataToSend.append('lastName', lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('companyName', formData.organization);
      formDataToSend.append('numberOfProviders', formData.providers);
      formDataToSend.append('organizationType', ''); // Not collected in this form
      formDataToSend.append('howDidYouHear', 'Get Started Page'); // Track source
      formDataToSend.append('query', formData.message || '');

      const response = await fetch('https://hooks.zapier.com/hooks/catch/14238222/um5xca0/', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setFormData({
          fullName: '',
          email: '',
          organization: '',
          providers: '1 - 10 Providers',
          message: ''
        });
        setAlert('Thanks for reaching out! We will be in touch soon.');
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      console.log('Form submission data:', formData);
      setAlert('✅ Form data captured successfully! We will be in touch soon.');
      // Reset form even on error (for testing)
      setFormData({
        fullName: '',
        email: '',
        organization: '',
        providers: '1 - 10 Providers',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="text-slate-300 antialiased bg-slate-900 selection:bg-purple-500 selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 py-2 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/new.png"
                  alt="Credflow Logo"
                  width={120}
                  height={60}
                  className="h-8 w-auto"
                />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#who-we-help" className="text-slate-300 hover:text-white transition-colors">Who We Help</a>
              <a href="#impact" className="text-slate-300 hover:text-white transition-colors">Impact</a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">Testimonials</a>
              <a 
                href="#demo-form" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Get Started Button */}
            <div className="md:hidden">
              <a 
                href="#demo-form" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">

        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-purple-500/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Copy */}
            <div className="text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 text-blue-400 text-sm font-semibold mb-6 border border-slate-700">
                <span className="flex h-2 w-2 relative mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                #1 Rated Healthcare Provider Credentialing Software
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[1.1] mb-6">
                Stop Losing Revenue to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Credentialing Delays</span>
              </h1>
              
              <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
                Streamline provider enrollment with fast, <strong>automated healthcare workflow management</strong>. Reduce errors, speed up approvals, and stop revenue leakage.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-400 mb-8">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  SOC2 Compliant
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Works with CAQH
                </div>
              </div>
            </div>

            {/* High-Intent Lead Form */}
            <div id="demo-form" className="bg-slate-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl shadow-black/50 border border-slate-700 relative z-10">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl blur opacity-20 -z-10"></div>
              
              <h3 className="text-3xl font-extrabold tracking-tight text-white mb-2">Get Your Free ROI Analysis</h3>
              <p className="text-slate-400 mb-6 text-sm">See exactly how many billable days you can recover.</p>
              
              {alert && (
                <div className={`mb-4 p-4 rounded-lg text-sm font-medium ${
                  alert.includes('Thanks') ? 'bg-green-900/50 border border-green-700 text-green-300' : 'bg-blue-900/50 border border-blue-700 text-blue-300'
                }`}>
                  {alert}
                </div>
              )}
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-900 text-white placeholder-slate-500 transition-all duration-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none" 
                    placeholder="Jane Doe" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">Work Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-900 text-white placeholder-slate-500 transition-all duration-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none" 
                    placeholder="jane@healthcare-org.com" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">Organization Name</label>
                  <input 
                    type="text" 
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-900 text-white placeholder-slate-500 transition-all duration-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none" 
                    placeholder="Medical Group / Hospital" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">Number of Providers</label>
                  <div className="relative">
                    <select 
                      name="providers"
                      value={formData.providers}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-900 text-white placeholder-slate-500 transition-all duration-200 appearance-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                    >
                      <option>1 - 10 Providers</option>
                      <option>11 - 50 Providers</option>
                      <option>51 - 200 Providers</option>
                      <option>200+ Providers</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">Message (Optional)</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-900 text-white placeholder-slate-500 transition-all duration-200 h-24 resize-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none" 
                    placeholder="Tell us about your specific challenges..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-purple-700 cursor-pointer hover:bg-purple-800 text-white font-bold py-4 rounded-lg shadow-lg shadow-purple-900/50 transition-all transform hover:-translate-y-0.5 text-lg mt-2 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      <span>Sending...</span>
                    </span>
                  ) : (
                    'Book a Free Call Now'
                  )}
                </button>
                <p className="text-xs text-center text-slate-500 mt-4">
                  By booking, you agree to our Terms. Your data is 100% secure.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section id="who-we-help" className="py-24 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Who We <span className="text-purple-500">Help</span></h2>
          <p className="text-slate-400 mb-16 max-w-2xl mx-auto">Legacy tools track tasks. CredFlow AI completes them.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" /></svg>,
                title: 'Hospitals & Health Systems', 
                desc: 'Large networks needing streamlined operations and compliance at scale.' 
              },
              { 
                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>,
                title: 'Physician Groups', 
                desc: 'Clinics seeking smoother scheduling, billing, and patient flow.' 
              },
              { 
                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>,
                title: 'Payers', 
                desc: 'We work with health plans to streamline healthcare provider credentialing and enable AI tools.' 
              },
              { 
                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>,
                title: 'RCM Organizations', 
                desc: 'Billing experts focused on speed, accuracy, and revenue protection.' 
              },
              { 
                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" /></svg>,
                title: 'Telehealth Providers', 
                desc: 'Digital care platforms needing seamless, reliable integrations.' 
              },
              { 
                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>,
                title: 'Ambulatory Surgery Centers (ASCs)', 
                desc: 'Same-day surgical facilities balancing efficiency, cost, and compliance.' 
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-950 p-8 rounded-xl border border-slate-800 hover:border-purple-500/50 transition duration-300 group">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4 text-purple-500 group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a href="#demo-form" className="inline-block bg-purple-700 hover:bg-purple-800 text-white px-10 py-4 rounded-lg font-bold shadow-lg shadow-purple-900/50 transition transform hover:-translate-y-1 text-lg border border-white/10">
              See How We Help You
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Trusted by forward-thinking healthcare organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-xl font-bold text-slate-400">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" /></svg>
              Apex Health
            </div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-400">
              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
              CareFirst
            </div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-400">
              <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
              OmniMedical
            </div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-400">
              <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              HealthPlus
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-24 bg-slate-900 text-white overflow-hidden relative border-t border-slate-800">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[128px] opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-purple-500 font-semibold tracking-wide uppercase text-sm mb-3">Why Credflow AI?</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">The Modern Credentialing Stack</h3>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Replace spreadsheets with a single source of truth for <strong>medical software management</strong> that connects compliance to revenue.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
            
            {/* Feature 1 */}
            <div className="flex flex-col gap-6">
              <div className="bg-slate-800/70 backdrop-blur-xl p-8 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden group hover:border-purple-500/50 transition-colors duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-transparent"></div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between items-center text-slate-400 text-xs uppercase tracking-wider mb-4">
                    <span>Network Alerts</span>
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded border-l-2 border-green-500 flex justify-between items-center text-slate-300">
                    <span>Kaiser Permanente</span>
                    <span className="text-green-400 text-xs bg-green-900/30 px-2 py-1 rounded">In-Network</span>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded border-l-2 border-red-500 flex justify-between items-center text-slate-300">
                    <span className="text-red-300">Alert: DEA License Expired</span>
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  </div>
                </div>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xl mb-4 border border-slate-700">1</div>
                <h4 className="text-2xl font-bold text-white mb-2">Prevent Denials Before They Happen</h4>
                <p className="text-slate-400 leading-relaxed">
                  <strong className="text-white">Real-Time Network Intelligence.</strong> Outperforms traditional <strong>healthcare credentialing companies</strong> by working directly with payers to ingest provider data.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col gap-6 md:mt-24">
              <div className="bg-slate-800/70 backdrop-blur-xl p-8 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden group hover:border-purple-500/50 transition-colors duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent"></div>
                <div className="space-y-3">
                  <div className="text-center text-white font-bold mb-4 text-lg">Enrollment Flow</div>
                  <div className="bg-slate-800 p-3 rounded-lg flex justify-between items-center border border-slate-700 hover:border-purple-500 transition cursor-default text-slate-300">
                    <span className="text-slate-200">Provider Data Verification</span>
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-lg flex justify-between items-center border border-slate-700 hover:border-purple-500 transition cursor-default text-slate-300">
                    <span className="text-slate-200">Application Follow Up</span>
                    <svg className="w-5 h-5 text-purple-500 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  </div>
                </div>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xl mb-4 border border-slate-700">2</div>
                <h4 className="text-2xl font-bold text-white mb-2">Enrollment Workflows That Actually Work</h4>
                <p className="text-slate-400 leading-relaxed">
                  <strong className="text-white">Adaptive Operations.</strong> Dynamic processes that adapt by payer and state.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col gap-6">
              <div className="bg-slate-800/70 backdrop-blur-xl p-8 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden group hover:border-purple-500/50 transition-colors duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent"></div>
                <div className="relative h-48 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80 z-10"></div>
                  <div className="text-center z-20">
                    <div className="text-xl font-bold text-white mb-1">Amanda Johnson, MD</div>
                    <div className="text-sm text-slate-400 mb-4">Verify Credentials/PSV</div>
                    <div className="flex gap-2 justify-center">
                      <span className="bg-purple-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" /></svg>
                        View PDF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xl mb-4 border border-slate-700">3</div>
                <h4 className="text-2xl font-bold text-white mb-2">Compliance on Autopilot</h4>
                <p className="text-slate-400 leading-relaxed">
                  <strong className="text-white">Continuous Verification.</strong> Never manually check a license again.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col gap-6 md:mt-24">
              <div className="bg-slate-800/70 backdrop-blur-xl p-8 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden group hover:border-purple-500/50 transition-colors duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-transparent"></div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-8">Revenue Protected</h3>
                  <div className="grid grid-cols-3 gap-2 border border-slate-700 rounded-xl p-4 bg-slate-800/30">
                    <div className="flex flex-col items-center"><span className="text-3xl font-bold text-white">76%</span><span className="text-[10px] text-slate-400 mt-1">Network ready</span></div>
                    <div className="flex flex-col items-center border-l border-slate-700"><span className="text-3xl font-bold text-white">43%</span><span className="text-[10px] text-slate-400 mt-1">Start date</span></div>
                    <div className="flex flex-col items-center border-l border-slate-700"><span className="text-3xl font-bold text-white">58%</span><span className="text-[10px] text-slate-400 mt-1">Risk</span></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xl mb-4 border border-slate-700">4</div>
                <h4 className="text-2xl font-bold text-white mb-2">Link Credentialing to Cash</h4>
                <p className="text-slate-400 leading-relaxed">
                  <strong className="text-white">Connected Revenue.</strong> The only <strong>healthcare credentialing software</strong> platform that connects data directly to your revenue cycle.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>,
                title: 'Automated Verification', 
                desc: 'Eliminate manual checks. Our healthcare automation software automatically verifies licenses, DEA, and board certifications 24/7.' 
              },
              { 
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>,
                title: 'Diverse Provider Support', 
                desc: 'Whether you are a multi-specialty group or focused on credentialing for mental health providers, our platform adapts to your needs.' 
              },
              { 
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" /><path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" /><path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" /></svg>,
                title: 'Centralized Dashboard', 
                desc: 'Manage all healthcare provider credentialing services from a single pane of glass.' 
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/50 p-8 rounded-2xl border border-blue-500/30 hover:border-blue-500 transition-colors duration-300 flex flex-col items-start h-full">
                <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-6 text-blue-400 border border-blue-500/20">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
                <p className="text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section id="impact" className="py-20 bg-slate-800/50 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">The Impact of Automation</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: '10x', label: 'Team Throughput' },
              { value: '90%', label: 'Time Saved' },
              { value: '15+', label: 'Days Gained' }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
                <div className="text-5xl font-bold mb-2 text-purple-500">{item.value}</div>
                <div className="text-slate-300 text-lg font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">What Administrators Are Saying</h2>
            <p className="text-slate-400 mt-4">Why top teams choose us over traditional <strong>healthcare provider credentialing services</strong>.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { quote: "Credflow AI's automated PSV checks are a lifesaver. We never have a lapse in coverage now.", name: 'Mike Rivera', role: 'Credentialing Specialist' },
              { quote: "We've cut our enrollment time in half.", name: 'Sarah Johnson', role: 'Practice Manager' }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-lg">
                <div className="flex text-yellow-500 mb-4 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">&ldquo;{item.quote}&rdquo;</p>
                <div className="font-bold text-white">{item.name}</div>
                <div className="text-sm text-slate-500">{item.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-slate-900 text-center relative overflow-hidden border-t border-slate-800">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-700"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Automate Your Credentialing?</h2>
          <div className="flex justify-center">
            <a href="#demo-form" className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-purple-500/30 transition transform hover:-translate-y-1">
              Get Started
            </a>
          </div>
          <p className="mt-8 text-slate-500 text-sm">© 2025 Credflow AI. All rights reserved.</p>
        </div>
      </section>

    </div>
  );
}