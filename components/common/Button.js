"use client";
import { FaArrowRight } from "react-icons/fa6";
import { useContext } from "react";
import { ContactFormContext } from "./ContactFormContext";

const Button = ({ 
  children, 
  href, 
  onClick, 
  variant = "primary", 
  size = "md",
  className = "",
  disabled = false,
  ...props 
}) => {
  const { openContactForm } = useContext(ContactFormContext);
  const baseClasses = "group cursor-pointer inline-flex items-center justify-center font-medium transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-white text-black hover:text-white hover:bg-blue-700 focus:ring-gray-500 hover:shadow-lg hover:shadow-blue-700/50",
    secondary: "bg-transparent border border-white text-white hover:bg-white hover:text-black focus:ring-white hover:shadow-lg hover:shadow-white/50",
    gradient: "bg-gradient-to-r from-purple-400 to-blue-500 text-white hover:from-purple-500 hover:to-blue-600 focus:ring-purple-500 hover:shadow-lg hover:shadow-purple-500/50",
    dark: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500 hover:shadow-lg hover:shadow-gray-500/50"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-full",
    md: "px-6 py-3 text-base rounded-full",
    lg: "px-8 py-4 text-lg rounded-full",
    xl: "px-10 py-5 text-xl rounded-full"
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const handleClick = (e) => {
    // Open contact form modal
    openContactForm();

    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  const buttonContent = (
    <div className="relative flex items-center px-5 justify-center w-full">
      <span className="transition-transform font-extralight duration-500 ease-out group-hover:-translate-x-3">
        {children}
      </span>
      <FaArrowRight className="absolute right-1 font-extralight w-4 h-4 opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
    </div>
  );

  return (
    <button 
      className={buttonClasses} 
      onClick={handleClick} 
      disabled={disabled}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;



