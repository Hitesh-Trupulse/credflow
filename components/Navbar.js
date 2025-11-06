// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import { FaArrowRight, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
// import Button from "./common/Button";

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const productButtonRef = useRef(null);
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleProductDropdown = () => {
//     if (productButtonRef.current) {
//       const rect = productButtonRef.current.getBoundingClientRect();
//       setDropdownPosition({
//         top: rect.bottom + window.scrollY,
//         left: rect.left + window.scrollX
//       });
//     }
//     setIsProductDropdownOpen(!isProductDropdownOpen);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsProductDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <nav className="relative w-full m-auto flex justify-center">
//         <div className="w-full max-w-[90vw] xl:max-w-[90vw] m-auto backdrop-blur-xl flex fixed top-4 xl:top-10 z-30 items-center justify-between bg-black/20 border border-[#454545] text-white px-4 py-3 rounded-full shadow-md">
//         {/* Logo Section */}
//         <div className="flex items-center space-x-3">
//           <Link href="/" className="flex items-center cursor-pointer space-x-3 relative z-10">
//             <Image
//               src="/images/new.png"
//               alt="Credflow Logo"
//               width={120}
//               height={60}
//               className="w-24 sm:w-32 lg:w-40 xl:w-[200px] h-auto"
//             />
//           </Link>
//         </div>

//         {/* Desktop Navigation Links */}
//         <div className="hidden xl:flex space-x-10 text-sm">
//           <Link
//             href="/#home"
//             className="nav-link group flex items-center space-x-2 hover:text-blue-700 transition-all duration-500 ease-out"
//           >
//             <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">Home</span>
//             <FaArrowRight className="w-4 h-4 text-blue-700 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
//           </Link>

//           {/* Product Dropdown */}
//           <div className="relative" ref={dropdownRef}>
//             <button
//               ref={productButtonRef}
//               onClick={toggleProductDropdown}
//               className={`nav-link group flex items-center  space-x-2 transition-all duration-500 ease-out ${
//                 isProductDropdownOpen ? 'text-blue-700' : 'hover:text-blue-700'
//               }`}
//             >
//               <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">Product</span>
//               <FaChevronDown
//                 className={`w-3 h-3 transition-all duration-300 ease-out ${
//                   isProductDropdownOpen ? 'rotate-180' : 'rotate-0'
//                 }`}
//               />
//             </button>
//           </div>

//           <Link
//             href="/#who-we-help"
//             className="nav-link group flex items-center space-x-2 hover:text-blue-700 transition-all duration-500 ease-out"
//           >
//             <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">Who We Help</span>
//             <FaArrowRight className="w-4 h-4 text-blue-700 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
//           </Link>
//           {/* <Link
//             href="/about"
//             className="nav-link group flex items-center space-x-2 hover:text-blue-700 transition-all duration-500 ease-out"
//           >
//             <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">About Us</span>
//             <FaArrowRight className="w-4 h-4 text-blue-700 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
//           </Link>
//           <Link
//             href="/resources"
//             className="nav-link group flex items-center space-x-2 hover:text-blue-700 transition-all duration-500 ease-out"
//           >
//             <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">Resources</span>
//             <FaArrowRight className="w-4 h-4 text-blue-700 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
//           </Link> */}
//         </div>

//         {/* Desktop CTA Button */}
//         <div className="hidden xl:block ml-6">
//           <Button variant="primary" size="md" className="rounded-full">
//             Join The Waitlist
//           </Button>
//         </div>

//         {/* Mobile Hamburger Button */}
//         <button
//           onClick={toggleMenu}
//           className="xl:hidden flex items-center justify-center w-10 h-10 rounded-full bg-black/20 border border-gray-600 hover:bg-black/30 transition-colors duration-300"
//         >
//           {isMenuOpen ? (
//             <FaTimes className="w-5 h-5 text-white" />
//           ) : (
//             <FaBars className="w-5 h-5 text-white" />
//           )}
//         </button>

//         {/* Mobile Menu Overlay */}
//         {isMenuOpen && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 xl:hidden" onClick={toggleMenu}>
//             <div className="absolute top-20 left-4 right-4 bg-black/90 border-[#454545] rounded-2xl p-6 shadow-xl">
//               {/* Mobile Navigation Links */}
//               <div className="space-y-4 mb-6">
//                 <Link
//                   href="/"
//                   className="block text-white hover:text-blue-700 transition-colors duration-300 py-2"
//                   onClick={toggleMenu}
//                 >
//                   Home
//                 </Link>

//                 {/* Mobile Product Section */}
//                 <div className="space-y-2">
//                   <button
//                     onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
//                     className="flex items-center justify-between w-full text-white hover:text-blue-700 transition-colors duration-300 py-2"
//                   >
//                     <span>Product</span>
//                     <FaChevronDown
//                       className={`w-3 h-3 transition-all duration-300 ease-out ${
//                         isProductDropdownOpen ? 'rotate-180' : 'rotate-0'
//                       }`}
//                     />
//                   </button>

//                   {/* Mobile Product Dropdown */}
//                   <div
//                     className={`overflow-hidden transition-all duration-300 ease-out ${
//                       isProductDropdownOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
//                     }`}
//                   >
//                     <div className="pl-4 space-y-2 border-l border-gray-600">
//                       <Link
//                         href="/#product"
//                         className="block text-white hover:text-blue-700 transition-colors duration-300 py-2 text-sm"
//                         onClick={toggleMenu}
//                       >
//                         Product
//                       </Link>
//                       <Link
//                         href="/#why-credflow"
//                         className="block text-white hover:text-blue-700 transition-colors duration-300 py-2 text-sm"
//                         onClick={toggleMenu}
//                       >
//                         Why Credflow AI
//                       </Link>
//                       <Link
//                         href="/#features"
//                         className="block text-white hover:text-blue-700 transition-colors duration-300 py-2 text-sm"
//                         onClick={toggleMenu}
//                       >
//                         Features
//                       </Link>
//                     </div>
//                   </div>
//                 </div>

//                 <Link
//                   href="/#who-we-help"
//                   className="block text-white hover:text-blue-700 transition-colors duration-300 py-2"
//                   onClick={toggleMenu}
//                 >
//                   Who We Help
//                 </Link>
//                 {/* <Link
//                   href="/about"
//                   className="block text-white hover:text-blue-700 transition-colors duration-300 py-2"
//                   onClick={toggleMenu}
//                 >
//                   About Us
//                 </Link>
//                 <Link
//                   href="/resources"
//                   className="block text-white hover:text-blue-700 transition-colors duration-300 py-2"
//                   onClick={toggleMenu}
//                 >
//                   Resources
//                 </Link> */}
//               </div>

//               {/* Mobile CTA Button */}
//               <Button variant="primary" size="md" className="rounded-full w-full">
//                 Join The Waitlist
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>

//     {/* Dropdown Menu - Outside navbar to control z-index properly */}
//     {isProductDropdownOpen && (
//       <div
//         className="fixed w-64 bg-black border border-[#454545] shadow-xl transition-all duration-300 ease-out"
//         style={{
//           zIndex: 20,
//           top: dropdownPosition.top,
//           left: dropdownPosition.left
//         }}
//       >
//         <div className="py-0">
//           <Link
//             href="/#product"
//             className="block px-6 py-5 pt-12 text-white font-bold text-lg hover:bg-gray-800/30 transition-colors duration-200"
//             onClick={() => setIsProductDropdownOpen(false)}
//           >
//             Product
//           </Link>
//           <div className="border-t border-[#454545] mx-6"></div>
//           <Link
//             href="/#why-credflow"
//             className="block px-6 py-5 text-white font-bold text-lg hover:bg-gray-800/30 transition-colors duration-200"
//             onClick={() => setIsProductDropdownOpen(false)}
//           >
//             Why Credflow AI
//           </Link>
//           <div className="border-t border-[#454545] mx-6"></div>
//           <Link
//             href="/#features"
//             className="block px-6 py-5 text-white font-bold text-lg hover:bg-gray-800/30 transition-colors duration-200"
//             onClick={() => setIsProductDropdownOpen(false)}
//           >
//             Features
//           </Link>
//         </div>
//       </div>
//     )}
//     </>
//   );
// }

"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaArrowRight, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import Button from "./common/Button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const productButtonRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        productButtonRef.current &&
        !productButtonRef.current.contains(event.target)
      ) {
        setIsProductDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleMobileMenuClose = (event) => {
      // Only close if clicking on the overlay background, not the menu content
      if (
        isMenuOpen &&
        event.target.classList.contains("mobile-menu-overlay")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleMobileMenuClose);
    return () => {
      document.removeEventListener("click", handleMobileMenuClose);
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="relative w-full m-auto flex justify-center">
        <div className="w-full max-w-[90vw] xl:max-w-[90vw] m-auto backdrop-blur-xl flex fixed top-4 xl:top-10 z-30 items-center justify-between bg-black/20 border border-[#454545] text-white px-4 py-3 rounded-full shadow-md">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center cursor-pointer space-x-3 relative z-10"
            >
              <Image
                src="/images/new.png"
                alt="Credflow Logo"
                width={120}
                height={60}
                className="w-24 sm:w-32 lg:w-40 xl:w-[200px] h-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex space-x-10 text-sm">
            <Link
              href="/#home"
              className="nav-link group flex items-center space-x-2 hover:text-blue-700 transition-all duration-500 ease-out"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">
                Home
              </span>
              <FaArrowRight className="w-4 h-4 text-blue-700 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
            </Link>

            {/* Product Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                ref={productButtonRef}
                onClick={toggleProductDropdown}
                className={`nav-link cursor-pointer group flex items-center space-x-2 transition-all duration-500 ease-out ${
                  isProductDropdownOpen
                    ? "text-blue-700"
                    : "hover:text-blue-700"
                }`}
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">
                  Product
                </span>
                <FaArrowRight className="w-4 h-4 text-blue-700 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
              </button>

              {/* Desktop Dropdown Menu */}
              {isProductDropdownOpen && (
                <div className="absolute top-full left-0 mt-7 w-64 bg-black/95 backdrop-blur-lg border border-[#454545] border-t-0 shadow-xl z-[-1] animate-in fade-in-0 zoom-in-95 duration-200">
                  <div className="py-2">
                    <Link
                      href="/#product"
                      className="flex items-center px-2 py-4 text-white mx-4 duration-200 group"
                    >
                      <span data-aos="fade-right" className="font-medium">Product</span>
                      <FaArrowRight className="w-3 h-3 ml-auto opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                    <div data-aos="fade-left" className="border-t border-[#454545] mx-4"></div>
                    <Link
                      href="/#why-credflow"
                      className="flex items-center px-2 py-4 text-white mx-4 duration-200 group"
                    >
                      <span data-aos="fade-right" className="font-medium">Why Credflow AI</span>
                      <FaArrowRight className="w-3 h-3 ml-auto opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                    <div data-aos="fade-left" className="border-t border-[#454545] mx-4"></div>
                    <Link
                      href="/#features"
                      className="flex items-center px-2 py-4 text-white mx-4 duration-200 group"
                    >
                      <span data-aos="fade-right" className="font-medium">Features</span>
                      <FaArrowRight className="w-3 h-3 ml-auto opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#who-we-help"
              className="nav-link group flex items-center space-x-2 hover:text-blue-700 transition-all duration-500 ease-out"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">
                Who We Help
              </span>
              <FaArrowRight className="w-4 h-4 text-blue-700 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
            </Link>

            <Link
              href="/blogs"
              className="nav-link group flex items-center space-x-2 hover:text-blue-700 transition-all duration-500 ease-out"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">
                Blogs
              </span>
              <FaArrowRight className="w-4 h-4 text-blue-700 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
            </Link>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden xl:block ml-6">
            <Button variant="primary" size="md" className="rounded-full">
              Join The Waitlist
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="xl:hidden flex items-center justify-center w-10 h-10 rounded-full bg-black/20 border border-[#454545] hover:bg-black/30 transition-colors duration-300"
          >
            {isMenuOpen ? (
              <FaTimes className="w-5 h-5 text-white" />
            ) : (
              <FaBars className="w-5 h-5 text-white" />
            )}
          </button>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 xl:hidden mobile-menu-overlay">
              <div className="absolute top-20 left-4 right-4 bg-black/95 backdrop-blur-lg border border-[#454545] rounded-2xl p-6 shadow-xl">
                {/* Mobile Navigation Links */}
                <div className="space-y-4 mb-6">
                  <Link
                    href="/"
                    className="block text-white hover:text-blue-700 transition-colors duration-300 py-2"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>

                  {/* Mobile Product Section */}
                  <div className="space-y-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsProductDropdownOpen(!isProductDropdownOpen);
                      }}
                      className="flex items-center justify-between w-full text-left text-white hover:text-blue-700 transition-colors duration-300 py-2"
                    >
                      <span>Product</span>
                      <FaChevronDown
                        className={`w-3 h-3 transition-all duration-300 ease-out ${
                          isProductDropdownOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {/* Mobile Product Dropdown */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isProductDropdownOpen
                          ? "max-h-48 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-4 space-y-2 border-l border-[#454545]">
                        <Link
                          href="/#product"
                          onClick={toggleMenu}
                          className="block text-white hover:text-blue-700 transition-colors duration-300 py-2 text-sm"
                        >
                          Product
                        </Link>
                        <Link
                          onClick={toggleMenu}
                          href="/#why-credflow"
                          className="block text-white hover:text-blue-700 transition-colors duration-300 py-2 text-sm"
                        >
                          Why Credflow AI
                        </Link>
                        <Link
                          onClick={toggleMenu}
                          href="/#features"
                          className="block text-white hover:text-blue-700 transition-colors duration-300 py-2 text-sm"
                        >
                          Features
                        </Link>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/#who-we-help"
                    className="block text-white hover:text-blue-700 transition-colors duration-300 py-2"
                    onClick={toggleMenu}
                  >
                    Who We Help
                  </Link>

                  <Link
                    href="/blogs"
                    className="block text-white hover:text-blue-700 transition-colors duration-300 py-2"
                    onClick={toggleMenu}
                  >
                    Blogs
                  </Link>
                </div>

                {/* Mobile CTA Button */}
                <Button
                  variant="primary"
                  size="md"
                  className="rounded-full w-full"
                >
                  Join The Waitlist
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
