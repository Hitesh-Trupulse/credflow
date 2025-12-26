"use client";

import { useState } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export default function DemoModal({ open, onOpenChange, type = "demo" }) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    organization: "",
    planType: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // Create a hidden iframe to submit the form (bypasses CORS without opening new tab)
    let iframe = document.getElementById('zapier-submit-iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'zapier-submit-iframe';
      iframe.name = 'zapier-submit-iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    // Create a form to submit data
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://hooks.zapier.com/hooks/catch/14238222/ua74545/';
    form.target = 'zapier-submit-iframe';
    form.style.display = 'none';

    // Add all form fields
    const fields = {
      ...formData,
      type: type,
      submittedAt: new Date().toISOString(),
    };

    Object.keys(fields).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = fields[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    // Show success immediately since we can't track the response with CORS
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        email: "",
        name: "",
        organization: "",
        planType: "",
        message: "",
      });
    }, 1000);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      setError("");
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md mx-4 bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800/50 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all hover:rotate-90 duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 ring-4 ring-emerald-500/10">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
            <p className="text-gray-300 mb-1">
              We'll reach out within 1–2 business days.
            </p>
            <p className="text-sm text-gray-400">
              Check your inbox for confirmation.
            </p>
            <Button
              onClick={handleClose}
              className="mt-6 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {type === "demo" ? "Request a Demo" : "Request a Free Audit Report"}
              </h2>
              <p className="text-sm text-gray-400">
                {type === "demo"
                  ? "Fill out the form below and we'll get back to you soon."
                  : "Get a free audit report of your provider directory."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">
                  Work Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@organization.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1.5">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-white mb-1.5">
                  Organization *
                </label>
                <input
                  id="organization"
                  type="text"
                  required
                  placeholder="Your organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="planType" className="block text-sm font-medium text-white mb-1.5">
                  Plan Type *
                </label>
                <select
                  id="planType"
                  required
                  value={formData.planType}
                  onChange={(e) => setFormData({ ...formData, planType: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-700 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.25rem",
                  }}
                >
                  <option value="" disabled>Select plan type</option>
                  <option value="medicare-advantage">Medicare Advantage</option>
                  <option value="marketplace-qhp">Marketplace / QHP</option>
                  <option value="medicaid">Medicaid</option>
                  <option value="commercial">Commercial</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-1.5">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  placeholder="Tell us about your needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={handleClose}
                  disabled={submitting}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 transition-all"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    type === "demo" ? "Request Demo" : "Request Audit Report"
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}