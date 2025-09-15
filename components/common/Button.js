import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

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
  const baseClasses = "group  inline-flex items-center justify-center font-medium transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-white  text-black hover:text-white  hover:bg-blue-700 focus:ring-gray-500",
    secondary: "bg-transparent border border-white text-white hover:bg-white hover:text-black focus:ring-white",
    gradient: "bg-gradient-to-r from-purple-400 to-blue-500 text-white hover:from-purple-500 hover:to-blue-600 focus:ring-purple-500",
    dark: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-full",
    md: "px-6 py-3 text-base rounded-full",
    lg: "px-8 py-4 text-lg rounded-full",
    xl: "px-10 py-5 text-xl rounded-full"
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const buttonContent = (
    <>
      <span className="group-hover:-translate-x-1 transition-transform  duration-500 ease-out">
        {children}
      </span>
      <FaArrowRight className="w-4 h-4 ml-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button 
      className={buttonClasses} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
