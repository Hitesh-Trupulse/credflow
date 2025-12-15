'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on get-started and thank-you pages
  if (pathname === '/get-started' || pathname === '/thank-you') {
    return null;
  }
  
  return <Navbar />;
}

