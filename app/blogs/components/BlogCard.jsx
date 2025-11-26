"use client";

import Image from "next/image";
import Link from "next/link";
import moment from "moment";

export default function BlogCard({ blog }) {
  const data = blog?.data || blog;
  const content = data?.content || "";
  const title = data?.title || "Untitled";
  const cover = data?.cover_image || "/fallback-image.jpg";
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
    <Link href={`/blogs/blog/${getSlug()}`}>
      <div className="group space-y-3 hover:scale-105 duration-300 cursor-pointer bg-black/50 backdrop-blur-sm border border-[#454545] p-4 rounded-xl hover:border-[#5063C6]/50 transition-all">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={cover}
            alt={alt}
            width={400}
            height={225}
            className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <h3 className="font-bold text-sm sm:text-lg text-white line-clamp-2 leading-snug group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#5063C6] group-hover:to-[#B71CD2] group-hover:bg-clip-text transition-all">
          {title}
        </h3>
        {preview && (
          <p className="font-light text-xs sm:text-sm text-gray-400 leading-snug line-clamp-3">
            {preview}
          </p>
        )}
        <p className="text-xs text-gray-500">
         {formatDate(createdAt)}
        </p>
      </div>
    </Link>
  );
}
