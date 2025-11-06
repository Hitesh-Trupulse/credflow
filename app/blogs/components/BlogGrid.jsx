"use client";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { getAllBlogs } from "@/lib/getBlogs";
import Loader from "@/components/common/Loader";

const BLOGS_PER_PAGE = 9;

export default function BlogGrid() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getAllBlogs();
      
      // Filter only published blogs and blogs from 2025 onwards
      const currentYear = 2025;
      const filteredBlogs = data.filter((blog) => {
        // Check if blog is published
        if (blog.isPublished !== true) return false;
        
        // Check if blog has a creation date
        if (!blog.created_at) return false;
        
        // Get the year from the blog's creation date
        let blogYear;
        if (blog.created_at.seconds) {
          // Handle Firebase Timestamp
          blogYear = new Date(blog.created_at.seconds * 1000).getFullYear();
        } else if (blog.created_at instanceof Date) {
          // Handle Date object
          blogYear = blog.created_at.getFullYear();
        } else if (typeof blog.created_at === 'number') {
          // Handle timestamp in milliseconds
          blogYear = new Date(blog.created_at).getFullYear();
        } else {
          // If we can't determine the year, exclude the blog
          return false;
        }
        
        // Only include blogs from 2025 onwards
        return blogYear >= currentYear;
      });
      
      setBlogs(filteredBlogs);
      setLoading(false);
    }
    load();
  }, []);

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

  const getPaginatedBlogs = () => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    return blogs.slice(start, start + BLOGS_PER_PAGE);
  };

  if (loading) {
    return <Loader text="Loading blogs..." full />;
  }

  return (
    <section className="bg-black min-h-screen max-w-7xl mx-auto px-4 md:px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">
          {blogs.length} Blogs found
        </h2>
      </div>

      {/* Show placeholder when no blogs */}
      {blogs.length === 0 && (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-[#5063C6]/20 to-[#B71CD2]/20 rounded-full mx-auto flex items-center justify-center mb-6 border border-[#454545]">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-semibold text-white mb-3">
              No blogs available yet
            </h3>
            
            <p className="text-gray-400 leading-relaxed">
              We're working on creating great content for you. Check back soon!
            </p>
          </div>
        </div>
      )}

      {/* Blog Cards */}
      {blogs.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {getPaginatedBlogs().map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mt-12">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 text-sm rounded-lg border cursor-pointer transition-all ${
                    currentPage === i + 1
                      ? "bg-gradient-to-r from-[#5063C6] to-[#B71CD2] text-white border-transparent"
                      : "bg-black border-[#454545] text-white hover:border-[#5063C6]/50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
