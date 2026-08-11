"use client";

import { createContext, useContext, useState } from "react";
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("./ContactForm"), { ssr: false });

const ContactFormContext = createContext();

export const useContactForm = () => {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error("useContactForm must be used within a ContactFormProvider");
  }
  return context;
};

export const ContactFormProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const openContactForm = () => {
    setHasOpened(true);
    setIsOpen(true);
  };
  const closeContactForm = () => setIsOpen(false);

  return (
    <ContactFormContext.Provider
      value={{ openContactForm, closeContactForm, isOpen }}
    >
      {children}
      {hasOpened ? (
        <ContactForm isOpen={isOpen} onClose={closeContactForm} />
      ) : null}
    </ContactFormContext.Provider>
  );
};

export { ContactFormContext };
