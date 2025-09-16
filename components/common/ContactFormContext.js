"use client";
import { createContext, useContext, useState } from "react";
import ContactForm from "./ContactForm";

const ContactFormContext = createContext();

export const useContactForm = () => {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error('useContactForm must be used within a ContactFormProvider');
  }
  return context;
};

export const ContactFormProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openContactForm = () => setIsOpen(true);
  const closeContactForm = () => setIsOpen(false);

  return (
    <ContactFormContext.Provider value={{ openContactForm, closeContactForm, isOpen }}>
      {children}
      <ContactForm 
        isOpen={isOpen}
        onClose={closeContactForm}
      />
    </ContactFormContext.Provider>
  );
};

export { ContactFormContext };
