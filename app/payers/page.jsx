"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, 
  CheckCircle, 
  Phone, 
  MapPin, 
  AlertCircle,
  FileText,
  Zap,
  Shield,
  Link as LinkIcon,
  Search,
  PhoneCall,
  CheckSquare,
  ArrowRight
} from "lucide-react";

const Payers = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [modalType, setModalType] = useState("demo");
  const [selectedState, setSelectedState] = useState("");

  const openModal = (type) => {
    setModalType(type);
    setDemoModalOpen(true);
  };

  const states = ["CA", "NY", "TX", "FL", "IL", "PA"];

  return (
    <>
      <div className="min-h-screen bg-black">
        <Header />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-screen flex items-center">
          {/* Main Background */}
          <div className="absolute inset-0">
            <Image
              src="/images/mainbg.png"
              alt="Main Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Secondary overlay background (stars, gradient, etc) */}
          <div className="absolute inset-0">
            <Image
              src="/images/noisebg.png"
              alt="Stars Overlay"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 data-aos="fade-down" className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                  Provider directory accuracy{" "}
                  <span className="bg-gradient-to-r from-[#5063C6] from-20% to-[#B71CD2] bg-clip-text text-transparent">you can prove.</span>
                </h1>
                <p data-aos="fade-down" className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  CredFlow continuously audits your provider directory, flags what's wrong, and helps you stay audit-ready—so members aren't misled and regulators aren't surprised.
                </p>
                
                <div data-aos="fade-up" className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <button 
                    onClick={() => openModal("demo")}
                    className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Request a demo
                  </button>
                  <button 
                    onClick={() => openModal("audit")}
                    className="px-8 py-3 text-white font-medium underline underline-offset-4 hover:text-gray-300 transition-colors"
                  >
                    Request a free audit report
                  </button>
                </div>
                
                <div data-aos="fade-up" className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm border border-[#454545] text-white">CredFlow Advantage</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm border border-[#454545] text-white">Marketplace CHP</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm border border-[#454545] text-white">Medicaid</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm border border-[#454545] text-white">Commercial</span>
                </div>
              </div>
              
              {/* Audit Snapshot Card */}
              <div data-aos="zoom-in">
                <div className="bg-black/90 backdrop-blur-sm border border-[#454545] rounded-2xl p-6 max-w-md mx-auto lg:ml-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-medium text-white">Directory Audit Snapshot</h3>
                    <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full font-medium border border-[#454545]">Live</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-900/20 backdrop-blur-sm border border-[#454545] rounded-xl">
                      <div className="text-2xl font-bold text-white">847</div>
                      <div className="text-xs text-gray-500">In-network verified</div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/20 backdrop-blur-sm border border-[#454545] rounded-xl">
                      <div className="text-2xl font-bold text-red-400">124</div>
                      <div className="text-xs text-gray-500">High-risk</div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/20 backdrop-blur-sm border border-[#454545] rounded-xl">
                      <div className="text-2xl font-bold text-purple-400">89</div>
                      <div className="text-xs text-gray-500">Verified</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-red-400" />
                      <span className="text-gray-400">Wrong phone number</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-red-400" />
                      <span className="text-gray-400">Outdated location</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span className="text-gray-400">Network mismatch</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FileText className="w-4 h-4 text-red-400" />
                      <span className="text-gray-400">Missing required fields</span>
                    </div>
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-[#5063C6] to-[#B71CD2] rounded-lg border border-transparent hover:opacity-90 transition-opacity">
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span className="text-sm text-white font-medium">Attestation ready report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Now Section */}
        <section className="py-20 md:py-32 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 data-aos="fade-down" className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                Directory accuracy is a compliance requirement—
                <span className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">and a financial risk.</span>
              </h2>
              <p data-aos="fade-down" className="text-lg text-gray-400 leading-relaxed">
                Under the No Surprises Act, inaccurate directory/network information creates direct financial exposure, including situations where members must be treated as in-network cost-sharing. Regulators are actively enforcing directory accuracy.
              </p>
            </div>
            
            <div data-aos="fade-up" className="flex flex-wrap gap-3 justify-center mb-12">
              <span className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900/20 backdrop-blur-sm border border-[#454545] text-red-400 flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1.5" />
                Regulatory scrutiny
              </span>
              <span className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900/20 backdrop-blur-sm border border-[#454545] text-red-400 flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1.5" />
                Member abrasion
              </span>
              <span className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900/20 backdrop-blur-sm border border-[#454545] text-red-400 flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1.5" />
                In-network cost-sharing exposure
              </span>
            </div>
            
            {/* Compliance Meter */}
            <div data-aos="fade-up" className="max-w-md mx-auto">
              <div className="text-center mb-3">
                <span className="text-sm font-medium text-gray-500">Compliance Posture</span>
              </div>
              <div className="relative h-2 bg-gray-900/50 border border-[#454545] rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full" />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Unknown</span>
                <span className="text-white font-medium">Defensible</span>
              </div>
            </div>
          </div>
        </section>

        {/* What CredFlow Does */}
        <section className="py-20 md:py-32 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 data-aos="fade-down" className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                CredFlow is your <span className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">Payer Directory Auditor.</span>
              </h2>
              <p data-aos="fade-down" className="text-lg text-gray-400 leading-relaxed">
                CredFlow's Payer Directory Auditor identifies directory inaccuracies, prioritizes them by regulatory and member impact, and gives your team a clean path to resolution—with reporting designed for compliance and oversight.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div data-aos="fade-up" className="bg-black backdrop-blur-sm border border-[#454545] rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-white/20 flex items-center justify-center bg-gradient-to-b from-white/5 to-black backdrop-blur-sm">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Accuracy</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Find wrong locations, phones, specialties, network participation mismatches, duplicate listings, and missing required fields.
                </p>
              </div>
              
              <div data-aos="fade-up" className="bg-black backdrop-blur-sm border border-[#454545] rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-white/20 flex items-center justify-center bg-gradient-to-b from-white/5 to-black backdrop-blur-sm">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Speed</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Move from discovery to directory accuracy resolution faster, with a focused resolution list.
                </p>
              </div>
              
              <div data-aos="fade-up" className="bg-black backdrop-blur-sm border border-[#454545] rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-white/20 flex items-center justify-center bg-gradient-to-b from-white/5 to-black backdrop-blur-sm">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Defensibility</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Turn a public directory into evidence you can stand behind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 md:py-32 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 data-aos="fade-down" className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight">
                From directory data → <span className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">defensible directory.</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                { icon: LinkIcon, title: "Connect", desc: "We bring your directory data into CredFlow." },
                { icon: Search, title: "Audit", desc: "Ongoing audits for accuracy, completeness, and network-status alignment." },
                { icon: PhoneCall, title: "Confirm", desc: "CredFlow confirms high-risk inaccuracies by calling offices directly." },
                { icon: CheckSquare, title: "Resolve", desc: "Track fixes to completion and export audit-ready reporting." },
              ].map((step, index) => (
                <div key={step.title} className="relative">
                  <div data-aos="fade-up" className="bg-black backdrop-blur-sm border border-[#454545] rounded-2xl p-6 text-center h-full">
                    <div className="w-10 h-10 mx-auto mb-4 rounded-full border border-white/20 flex items-center justify-center bg-gradient-to-b from-white/5 to-black backdrop-blur-sm text-white font-bold">
                      {index + 1}
                    </div>
                    <step.icon className="w-8 h-8 mx-auto mb-4 text-white" />
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                  {index < 3 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 text-[#454545] -translate-y-1/2" />
                  )}
                </div>
              ))}
            </div>
            
            <p data-aos="fade-up" className="text-center text-sm text-gray-500">
              Details, security, and methodology shared in demo.
            </p>
          </div>
        </section>

        {/* Regulations Section */}
        <section className="py-20 md:py-32 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 data-aos="fade-down" className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight">
                Built for <span className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">the rules you're held to.</span>
              </h2>
              <p data-aos="fade-down" className="text-lg text-gray-400 leading-relaxed">
                Flip between federal and state requirements—then see how CredFlow supports audit readiness.
              </p>
            </div>
            
            <Tabs defaultValue="nsa" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-900/50 backdrop-blur-sm border border-[#454545] p-1 rounded-xl">
                <TabsTrigger value="nsa" className="rounded-lg">No Surprises Act</TabsTrigger>
                <TabsTrigger value="cms" className="rounded-lg">Medicare Advantage</TabsTrigger>
                <TabsTrigger value="state" className="rounded-lg">State Rules</TabsTrigger>
              </TabsList>
              
              <TabsContent value="nsa" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div data-aos="fade-up" className="bg-black backdrop-blur-sm border border-[#454545] rounded-2xl p-6">
                    <h4 className="font-semibold text-white mb-4">What regulators expect</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-white mt-0.5 shrink-0" />
                        Accurate, up-to-date directory/network information
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-white mt-0.5 shrink-0" />
                        Reduced member burden from inaccurate listings
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-white mt-0.5 shrink-0" />
                        Demonstrable ongoing maintenance efforts
                      </li>
                    </ul>
                  </div>
                  <div data-aos="fade-up" className="bg-black backdrop-blur-sm border border-[#454545] rounded-2xl p-6">
                    <h4 className="font-semibold text-white mb-4">How CredFlow helps</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <Zap className="w-4 h-4 text-white mt-0.5 shrink-0" />
                        Continuous audits & proactive issue resolution
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <Zap className="w-4 h-4 text-white mt-0.5 shrink-0" />
                        High-risk verification via office calls
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <Zap className="w-4 h-4 text-white mt-0.5 shrink-0" />
                        Comprehensive reporting for oversight
                      </li>
                    </ul>
                  </div>
                </div>
                <div data-aos="fade-up" className="bg-black backdrop-blur-sm border border-[#454545] rounded-2xl p-6">
                  <h4 className="font-semibold text-white mb-4">Artifacts you can export</h4>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900/20 backdrop-blur-sm border border-[#454545] text-white hover:bg-gray-900/40 transition-colors">Reporting with timestamps</button>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900/20 backdrop-blur-sm border border-[#454545] text-white hover:bg-gray-900/40 transition-colors">Verification per provider (NPI)</button>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900/20 backdrop-blur-sm border border-[#454545] text-white hover:bg-gray-900/40 transition-colors">Compliance attestation (annual)</button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="cms" className="space-y-6">
                <div data-aos="fade-up" className="bg-black backdrop-blur-sm border border-[#454545] rounded-2xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-4">Medicare Advantage directory rules are tightening.</h4>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Under{" "}
                    <a href="#" className="text-white hover:underline">CMS-4208-F2</a>
                    , MA organizations must update provider directory information within 30 days of becoming aware of a change and attest at least annually that submitted directory information is accurate.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-white mt-0.5 shrink-0" />
                      Protect your organization from inaccurate directory risk before it becomes a regulatory issue
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-white mt-0.5 shrink-0" />
                      Show regulators you have a defensible directory accuracy program
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-white mt-0.5 shrink-0" />
                      Attestation-ready reporting that Provider Data Management teams can rely on
                    </li>
                  </ul>
                  <p className="text-sm text-gray-500 border-t border-[#454545] pt-4 leading-relaxed">
                    CMS is requiring Medicare Advantage networks to publish provider directory information through Medicare Plan Finder initiatives—this raises the stakes for accuracy.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="state" className="space-y-6">
                <div data-aos="fade-up" className="bg-black backdrop-blur-sm border border-[#454545] rounded-2xl p-6 mb-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
                    <div>
                      <h4 className="font-semibold text-white mb-1">Select a state</h4>
                      <p className="text-sm text-gray-400">State rules vary. CredFlow helps you operationalize ongoing accuracy programs.</p>
                    </div>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger className="w-40 bg-gray-900 border-[#454545]">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {states.map((state) => (
                      <button
                        key={state}
                        onClick={() => setSelectedState(state)}
                        className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border transition-colors cursor-pointer ${
                          selectedState === state 
                            ? "bg-white/10 border-white/40 text-white" 
                            : "bg-gray-900/20 border-[#454545] text-white"
                        }`}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div data-aos="fade-up" className="bg-black backdrop-blur-sm border border-[#454545] rounded-2xl p-6">
                    <h4 className="font-semibold text-white mb-4">Common state enforcement patterns</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                        Accuracy timeliness requirements
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                        Secret shopper validation
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                        Penalties / fines
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                        Corrective action plans
                      </li>
                    </ul>
                  </div>
                  <div data-aos="fade-up" className="bg-black backdrop-blur-sm border border-[#454545] rounded-2xl p-6">
                    <h4 className="font-semibold text-white mb-4">How CredFlow supports multi-state readiness</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-white mt-0.5 shrink-0" />
                        State tagging for jurisdiction-specific tracking
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-white mt-0.5 shrink-0" />
                        Prioritized queues by state requirement
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-white mt-0.5 shrink-0" />
                        Audit artifacts per jurisdiction
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Outcomes Section */}
        <section className="py-20 md:py-32 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 data-aos="fade-down" className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight">
                Reduce regulatory risk. <span className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">Reduce financial exposure.</span>
              </h2>
            </div>
            
            <div className="max-w-2xl mx-auto mb-12">
              <ul className="space-y-4">
                {[
                  "Improved NSA compliance readiness",
                  "Improved CMS-4208-F2 readiness for MA directory updates and annual accuracy attestation",
                  "Reduced financial exposure tied to inaccurate network-status information",
                  "Faster remediation cycle for inaccurate directory listings",
                  "Stronger audit readiness with compliance-focused reporting",
                ].map((item, index) => (
                  <li key={item} data-aos="fade-up" className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white mt-0.5 shrink-0" />
                    <span className="text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div data-aos="fade-up" className="bg-black backdrop-blur-sm border border-[#454545] rounded-2xl p-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <button className="text-left hover:opacity-80 transition-opacity">
                    <div className="text-2xl font-bold text-white mb-1">____</div>
                    <div className="text-sm text-gray-400 hover:text-white transition-colors">Time to identify issues</div>
                  </button>
                  <button className="text-left hover:opacity-80 transition-opacity">
                    <div className="text-2xl font-bold text-white mb-1">____</div>
                    <div className="text-sm text-gray-400 hover:text-white transition-colors">Time to remediate</div>
                  </button>
                  <button className="text-left hover:opacity-80 transition-opacity">
                    <div className="text-2xl font-bold text-white mb-1">____</div>
                    <div className="text-sm text-gray-400 hover:text-white transition-colors">View the highest risk findings</div>
                  </button>
                </div>
                <p className="text-center text-xs text-gray-500 mt-4 pt-4 border-t border-[#454545]">
                  Benchmarks available in pilot.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-32 relative overflow-hidden bg-black">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 data-aos="fade-down" className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight">
                Stop guessing and <span className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">start proving.</span>
              </h2>
              <p data-aos="fade-down" className="text-lg text-gray-400 mb-8 leading-relaxed">
                Your directory is public. It must be defensible.
              </p>
              <div data-aos="fade-up">
                <button 
                  onClick={() => openModal("demo")}
                  className="px-10 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors text-lg"
                >
                  Request a demo
                </button>
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => openModal("audit")}
                  className="text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-4"
                >
                  Or request a free audit report
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      
      <DemoModal 
        open={demoModalOpen} 
        onOpenChange={setDemoModalOpen}
        type={modalType}
      />
    </>
  );
};

export default Payers;

