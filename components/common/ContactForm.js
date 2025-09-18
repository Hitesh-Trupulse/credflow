"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaX } from "react-icons/fa6";

const ContactForm = ({ 
  isOpen = false, 
  onClose = () => {},
  title = "Get In Touch",
  subtitle = "We'd love to hear from you. Send us a message and we'll respond as soon as possible."
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    query: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert("");

    const { firstName, lastName, email, query } = formData;

    try {
      // Try with FormData instead of JSON to avoid CORS issues
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', firstName);
      formDataToSend.append('lastName', lastName);
      formDataToSend.append('email', email);
      formDataToSend.append('query', query);

      const response = await fetch('https://hooks.zapier.com/hooks/catch/14238222/um5xca0/', {
        method: 'POST',
        body: formDataToSend, // Use FormData instead of JSON
        // No Content-Type header - let browser set it automatically
      });

      if (response.ok) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          query: ''
        });
        setAlert('Thanks for reaching out! We will be in touch soon.');
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      
      // Fallback: Show development message and log form data
      console.log('Form submission data:', { firstName, lastName, email, query });
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        query: ''
      });
      setAlert('✅ Form data captured successfully! Check browser console for details. (Testing mode - Zapier connection failed)');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    onClose();
    setAlert("");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      query: ""
    });
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-2 sm:p-4"
      onClick={closeModal}
    >
      <div 
        className="bg-black border border-[#454545] rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md lg:max-w-lg w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 text-gray-400 hover:text-white transition-colors z-10"
        >
          <FaX className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
        </button>

        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent mb-2 sm:mb-3">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-gray-300">{subtitle}</p>
        </div>

        {alert && (
          <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium ${
            alert.includes('Thanks') ? 'bg-green-900/50 border border-green-700 text-green-300' : 'bg-red-900/50 border border-red-700 text-red-300'
          }`}>
            {alert}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            <div>
              <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                autoComplete="given-name"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800/50 border border-[#454545] rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#5063C6] focus:border-transparent outline-none transition-all text-sm sm:text-base text-white placeholder-gray-400"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                autoComplete="family-name"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800/50 border border-[#454545] rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#5063C6] focus:border-transparent outline-none transition-all text-sm sm:text-base text-white placeholder-gray-400"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800/50 border border-[#454545] rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#5063C6] focus:border-transparent outline-none transition-all text-sm sm:text-base text-white placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="query" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
              Message
            </label>
            <textarea
              id="query"
              name="query"
              value={formData.query}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800/50 border border-[#454545] rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#5063C6] focus:border-transparent outline-none transition-all resize-none text-sm sm:text-base text-white placeholder-gray-400"
              placeholder="Tell us about your requirements..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-gradient-to-r from-[#5063C6] to-[#B71CD2] text-white py-3 px-4 sm:py-4 sm:px-6 rounded-lg sm:rounded-xl hover:from-[#5a6fd6] hover:to-[#c528e2] transition-all duration-300 text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                <span className="text-xs sm:text-sm">Sending...</span>
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </div>
  );

  // Use createPortal to render the modal at the root level
  return createPortal(modalContent, document.body);
};

export default ContactForm;
