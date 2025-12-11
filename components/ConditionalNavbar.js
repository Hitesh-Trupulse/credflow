'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on get-started page
  if (pathname === '/get-started') {
    return null;
  }
  
  return <Navbar />;
}

