import React from 'react'
import BlogHeroSection from './components/BlogHeroSection'
import BlogGrid from './components/BlogGrid'
import Navbar from '@/components/Navbar'

export const metadata = {
  alternates: {
    canonical: 'https://www.credflow.ai/resources',
  },
};

const page = () => {
  return (
    <div className="min-h-screen">
        <BlogHeroSection/>
        <BlogGrid/>
    </div>
  )
}

export default page

