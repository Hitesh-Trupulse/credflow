"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import BlogHero from "./components/BlogHero";
import BlogContent from "./components/BlogContent";
import RelatedBlogs from "./components/RelatedBlogs";
import { getAllBlogs } from "@/lib/getBlogs";
import Loader from "@/components/common/Loader";
import Navbar from "@/components/Navbar";

export default function BlogDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const blogs = await getAllBlogs();

      // Match blog by customURL or slugified title
      const selected = blogs.find(
        (b) =>
          b.customURL === id ||
          b.title
            ?.toLowerCase()
            .replace(/[^a-zA-Z ]/g, "")
            .split(" ")
            .join("-") === id
      );

      setBlog(selected);
      // Only show published blogs as related content
      setRelated(blogs.filter((b) => b.id !== selected?.id && b.isPublished === true));
      setLoading(false);
    }
    if (id) load();
  }, [id]);

  // Update meta tags for SEO when blog data is loaded
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined' || !blog) return;

    try {
      // Helper function to truncate description to optimal SEO length (150-160 chars)
      const truncateDescription = (text, maxLength = 160) => {
        if (!text || typeof text !== 'string') return '';
        const cleaned = text.trim();
        if (cleaned.length <= maxLength) return cleaned;
        // Try to break at word boundary
        const truncated = cleaned.substring(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');
        return lastSpace > 120 
          ? truncated.substring(0, lastSpace) + '...'
          : truncated + '...';
      };

      // Get meta title and description from blog data, with fallbacks
      // Works with both new resources (with metaTitle/metaDes) and old resources (without)
      const metaTitle = (blog.metaTitle || blog.title || "CredFlow AI Resource").trim();
      
      // Generate description with proper fallback chain
      let metaDescription = '';
      if (blog.metaDes && blog.metaDes.trim()) {
        metaDescription = truncateDescription(blog.metaDes.trim());
      } else if (blog.metaDescription && blog.metaDescription.trim()) {
        metaDescription = truncateDescription(blog.metaDescription.trim());
      } else if (blog.content) {
        // Extract text from HTML content for old resources
        const textContent = blog.content
          .replace(/<[^>]+>/g, ' ') // Remove HTML tags
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
        metaDescription = truncateDescription(textContent);
      }
      
      // Final fallback
      if (!metaDescription) {
        metaDescription = "Read this resource on CredFlow AI - Healthcare Credentialing Management Software";
      }

      // Update or create meta title tag
      let titleTag = document.querySelector('title');
      if (!titleTag) {
        titleTag = document.createElement('title');
        document.head.appendChild(titleTag);
      }
      titleTag.textContent = `${metaTitle} | CredFlow AI`;

      // Update or create meta description tag
      let metaDescTag = document.querySelector('meta[name="description"]');
      if (!metaDescTag) {
        metaDescTag = document.createElement('meta');
        metaDescTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescTag);
      }
      metaDescTag.setAttribute('content', metaDescription);

      // Update Open Graph title
      let ogTitleTag = document.querySelector('meta[property="og:title"]');
      if (!ogTitleTag) {
        ogTitleTag = document.createElement('meta');
        ogTitleTag.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitleTag);
      }
      ogTitleTag.setAttribute('content', metaTitle);

      // Update Open Graph description
      let ogDescTag = document.querySelector('meta[property="og:description"]');
      if (!ogDescTag) {
        ogDescTag = document.createElement('meta');
        ogDescTag.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescTag);
      }
      ogDescTag.setAttribute('content', metaDescription);

      // Update Open Graph type
      let ogTypeTag = document.querySelector('meta[property="og:type"]');
      if (!ogTypeTag) {
        ogTypeTag = document.createElement('meta');
        ogTypeTag.setAttribute('property', 'og:type');
        document.head.appendChild(ogTypeTag);
      }
      ogTypeTag.setAttribute('content', 'article');

      // Update Open Graph URL
      const currentUrl = window.location.href;
      let ogUrlTag = document.querySelector('meta[property="og:url"]');
      if (!ogUrlTag) {
        ogUrlTag = document.createElement('meta');
        ogUrlTag.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrlTag);
      }
      ogUrlTag.setAttribute('content', currentUrl);

      // Update Open Graph site name
      let ogSiteNameTag = document.querySelector('meta[property="og:site_name"]');
      if (!ogSiteNameTag) {
        ogSiteNameTag = document.createElement('meta');
        ogSiteNameTag.setAttribute('property', 'og:site_name');
        document.head.appendChild(ogSiteNameTag);
      }
      ogSiteNameTag.setAttribute('content', 'CredFlow AI');

      // Update Open Graph image if cover image exists
      if (blog.cover_image && blog.cover_image.trim()) {
        let ogImageTag = document.querySelector('meta[property="og:image"]');
        if (!ogImageTag) {
          ogImageTag = document.createElement('meta');
          ogImageTag.setAttribute('property', 'og:image');
          document.head.appendChild(ogImageTag);
        }
        ogImageTag.setAttribute('content', blog.cover_image.trim());
        
        // Also add og:image:alt if altTag exists
        if (blog.altTag && blog.altTag.trim()) {
          let ogImageAltTag = document.querySelector('meta[property="og:image:alt"]');
          if (!ogImageAltTag) {
            ogImageAltTag = document.createElement('meta');
            ogImageAltTag.setAttribute('property', 'og:image:alt');
            document.head.appendChild(ogImageAltTag);
          }
          ogImageAltTag.setAttribute('content', blog.altTag.trim());
        }
      }

      // Update Twitter Card type
      let twitterCardTag = document.querySelector('meta[name="twitter:card"]');
      if (!twitterCardTag) {
        twitterCardTag = document.createElement('meta');
        twitterCardTag.setAttribute('name', 'twitter:card');
        document.head.appendChild(twitterCardTag);
      }
      twitterCardTag.setAttribute('content', 'summary_large_image');

      // Update Twitter Card title
      let twitterTitleTag = document.querySelector('meta[name="twitter:title"]');
      if (!twitterTitleTag) {
        twitterTitleTag = document.createElement('meta');
        twitterTitleTag.setAttribute('name', 'twitter:title');
        document.head.appendChild(twitterTitleTag);
      }
      twitterTitleTag.setAttribute('content', metaTitle);

      // Update Twitter Card description
      let twitterDescTag = document.querySelector('meta[name="twitter:description"]');
      if (!twitterDescTag) {
        twitterDescTag = document.createElement('meta');
        twitterDescTag.setAttribute('name', 'twitter:description');
        document.head.appendChild(twitterDescTag);
      }
      twitterDescTag.setAttribute('content', metaDescription);

      // Update Twitter Card image if cover image exists
      if (blog.cover_image && blog.cover_image.trim()) {
        let twitterImageTag = document.querySelector('meta[name="twitter:image"]');
        if (!twitterImageTag) {
          twitterImageTag = document.createElement('meta');
          twitterImageTag.setAttribute('name', 'twitter:image');
          document.head.appendChild(twitterImageTag);
        }
        twitterImageTag.setAttribute('content', blog.cover_image.trim());
      }

      // Add article metadata for better SEO
      if (blog.created_at) {
        let articlePublishedTag = document.querySelector('meta[property="article:published_time"]');
        if (!articlePublishedTag) {
          articlePublishedTag = document.createElement('meta');
          articlePublishedTag.setAttribute('property', 'article:published_time');
          document.head.appendChild(articlePublishedTag);
        }
        // Handle Firebase timestamp format
        const publishedDate = blog.created_at?.seconds 
          ? new Date(blog.created_at.seconds * 1000).toISOString()
          : new Date(blog.created_at).toISOString();
        articlePublishedTag.setAttribute('content', publishedDate);
      }

      if (blog.last_edit) {
        let articleModifiedTag = document.querySelector('meta[property="article:modified_time"]');
        if (!articleModifiedTag) {
          articleModifiedTag = document.createElement('meta');
          articleModifiedTag.setAttribute('property', 'article:modified_time');
          document.head.appendChild(articleModifiedTag);
        }
        // Handle Firebase timestamp format
        const modifiedDate = blog.last_edit?.seconds 
          ? new Date(blog.last_edit.seconds * 1000).toISOString()
          : new Date(blog.last_edit).toISOString();
        articleModifiedTag.setAttribute('content', modifiedDate);
      }

    } catch (error) {
      // Silently fail in production, but log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error updating meta tags:', error);
      }
    }

    // Cleanup function to restore original meta tags when component unmounts
    return () => {
      try {
        const defaultTitle = document.querySelector('title');
        if (defaultTitle) {
          defaultTitle.textContent = 'CredFlow AI - Healthcare Credentialing Management Software';
        }
      } catch (error) {
        // Silently handle cleanup errors
      }
    };
  }, [blog]);

  if (loading) return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Loader full text="Loading resource details..." />
    </div>
  );
  
  if (!blog || !blog.isPublished) return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center p-10">
          <h1 className="text-3xl font-bold text-white mb-4">Resource Not Found</h1>
          <p className="text-gray-400 mb-6">This resource may not be published or doesn&apos;t exist.</p>
          <Link href="/resources" className="inline-block bg-gradient-to-r from-[#5063C6] to-[#B71CD2] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
            View All Resources
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black">
      <BlogHero post={{ data: blog }} />
      <BlogContent post={{ data: blog }} /> 
      <RelatedBlogs posts={related} />
    </div>
  );
}
