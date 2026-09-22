'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import { isMarketingPath } from '@/lib/site/paths';

export default function ConditionalNavbar() {
  const pathname = usePathname();

  if (
    isMarketingPath(pathname) ||
    pathname === '/get-started' ||
    pathname === '/thank-you'
  ) {
    return null;
  }

  return <Navbar />;
}

