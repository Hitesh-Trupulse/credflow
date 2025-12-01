"use client";
import Image from "next/image";
import moment from "moment";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

export default function BlogHero({ post }) {
  const formatDate = (value) => {
    if (!value) return "";
    // Handle both Firebase Timestamp objects and converted milliseconds
    if (typeof value === 'object' && value.seconds) {
      return moment(new Date(value.seconds * 1000)).format("dddd, MMMM Do YYYY");
    }
    // Handle converted milliseconds
    return moment(value).format("dddd, MMMM Do YYYY");
  };

  const description =
    post?.data?.description ||
    post?.data?.excerpt ||
    (post?.data?.content
      ? (() => {
          // Clean HTML tags and normalize whitespace
          let cleanContent = post.data.content
            .replace(/<[^>]+>/g, " ") // Replace HTML tags with spaces
            .replace(/\s+/g, " ") // Normalize multiple spaces to single space
            .trim();
          
          // Find the first paragraph break (look for common heading patterns or paragraph breaks)
          const firstBreakIndex = cleanContent.search(/\s+(?:Introduction|Chapter|Section|Part|#|\d+\.|[A-Z][a-z]+:)/);
          
          if (firstBreakIndex !== -1 && firstBreakIndex <= 200) {
            // Stop at the first break if it's within 200 characters
            return cleanContent.slice(0, firstBreakIndex).trim();
          }
          
          // If no break found or break is beyond 200 chars, limit to 200 chars with smart break
          if (cleanContent.length <= 200) {
            return cleanContent;
          }
          
          // Find the best break point within 200 characters
          const truncated = cleanContent.slice(0, 200);
          
          // Look for natural break points (periods, commas, spaces) near the end
          let bestBreakPoint = 200;
          
          // Try to find a period within the last 50 characters
          const lastPeriodIndex = truncated.lastIndexOf('.', 200);
          if (lastPeriodIndex > 150) {
            bestBreakPoint = lastPeriodIndex + 1;
          } else {
            // Try to find a comma within the last 30 characters
            const lastCommaIndex = truncated.lastIndexOf(',', 200);
            if (lastCommaIndex > 170) {
              bestBreakPoint = lastCommaIndex + 1;
            } else {
              // Try to find a space within the last 20 characters
              const lastSpaceIndex = truncated.lastIndexOf(' ', 200);
              if (lastSpaceIndex > 180) {
                bestBreakPoint = lastSpaceIndex;
              }
            }
          }
          
          return cleanContent.slice(0, bestBreakPoint) + "...";
        })()
      : "");

  const link =
    post?.data?.customURL?.length > 3
      ? `https://www.credflow.ai/resources/info/${post.data.customURL}`
      : `https://www.credflow.ai/resources/info/${post.data.title
          ?.toLowerCase()
          .replace(/[^a-zA-Z ]/g, "")
          .split(" ")
          .join("-")}`;

  const mailtoHref = `mailto:?subject=${encodeURIComponent(
    post?.data?.title || ""
  )}&body=${encodeURIComponent(link)}`;

  const shareOptions = [
    {
      icon: <FaFacebookF size={20} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
      label: "Share on Facebook",
      color: "text-blue-600",
    },
    {
      icon: <FaTwitter size={20} />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(post?.data?.title || "")}`,
      label: "Share on Twitter",
      color: "text-blue-400",
    },
    {
      icon: <FaLinkedinIn size={20} />,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(link)}&title=${encodeURIComponent(post?.data?.title || "")}`,
      label: "Share on LinkedIn",
      color: "text-blue-700",
    },
    {
      icon: <FaWhatsapp size={20} />,
      href: `https://wa.me/?text=${encodeURIComponent(link)}`,
      label: "Share on WhatsApp",
      color: "text-green-600",
    },
    {
      icon: <FaEnvelope size={20} />,
      href: mailtoHref,
      label: "Share by Email",
      color: "text-pink-500",
    },
  ];

  return (
    <section className="bg-black relative overflow-hidden py-24 pt-32 sm:py-28 sm:pt-36 lg:pt-44 lg:py-32 px-4 text-center border-b border-[#454545]">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/mainbg.png"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-start flex flex-col">
          {/* Date */}
          <p className="text-sm font-medium bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent mb-2 tracking-wide">
            {formatDate(post?.data?.created_at)}
          </p>
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2 mb-6 leading-tight">
            {post?.data?.title}
          </h1>
          {/* Description/Subtitle */}
          {/* {description && (
            <p className="mb-6 text-base sm:text-lg text-gray-300 leading-relaxed">{description}</p>
          )} */}
          {/* Share buttons */}
          <div className="flex gap-3 mt-2">
            {shareOptions.map((option) => (
              <a
                key={option.label}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={option.label}
                className="hover:scale-125 duration-300 rounded-full p-3 bg-white/10 backdrop-blur-sm border border-[#454545] hover:border-[#5063C6] transition-all text-white hover:bg-gradient-to-r hover:from-[#5063C6] hover:to-[#B71CD2]"
              >
                {option.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
