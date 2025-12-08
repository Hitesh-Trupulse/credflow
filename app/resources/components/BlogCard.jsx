"use client";

import Link from "next/link";
import moment from "moment";

export default function BlogCard({ blog }) {
  const data = blog?.data || blog;
  const content = data?.content || "";
  const title = data?.title || "Untitled";
  const createdAt = data?.created_at;
  const alt = data?.altTag || data?.title || "blog image";

  const formatDate = (value) => {
    if (!value) return "Unknown date";
    
    // Handle Firebase Timestamp objects
    if (typeof value === 'object' && value.seconds) {
      return moment(new Date(value.seconds * 1000)).format("dddd, MMMM Do YYYY");
    }
    
    // Handle converted milliseconds or other date formats
    return moment(value).format("dddd, MMMM Do YYYY");
  };

  const getSlug = () => {
    const title = blog?.title || blog?.data?.title;
    const customURL = blog?.customURL || blog?.data?.customURL;

    if (customURL?.length > 3) return customURL;

    return title
      ?.toLowerCase()
      .replace(/[^a-zA-Z ]/g, "")
      .split(" ")
      .join("-");
  };

  // Extract preview from HTML (server-safe)
  let preview = "";
  if (content) {
    try {
      // Simple regex-based text extraction for server-side compatibility
      const textContent = content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&[^;]+;/g, ' ') // Remove HTML entities
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
      
      preview = textContent.slice(0, 120) + "...";
    } catch (e) {
      preview = "";
    }
  }

  return (
    <Link href={`/resources/info/${getSlug()}`}>
      <article className="group flex flex-col gap-3 bg-black/70 border border-[#454545] hover:border-[#5063C6] rounded-2xl p-5 hover:-translate-y-1 hover:bg-black transition-all duration-300">
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-gray-200">
          <span className="px-2 py-1 rounded-full border border-gray-700 bg-gray-800/40 text-gray-200">
            Insight
          </span>
          <span>{formatDate(createdAt)}</span>
        </div>
        <div>
          <h3 className="text-lg 2xl:text-2xl font-semibold text-white line-clamp-2 leading-snug group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#5063C6] group-hover:to-[#B71CD2] group-hover:bg-clip-text transition-all">
            {title}
          </h3>
          {preview && (
            <p className="mt-2 sm:text-md 2xl:text-lg text-white leading-relaxed line-clamp-3">
              {preview}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between text-xs lg:text-sm text-white pt-1">
          <span>Read article</span>
          <span className="text-[#B71CD2] group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </article>
    </Link>
  );
}
