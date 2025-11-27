"use client";
import BlogCard from "@/app/resources/components/BlogCard";

export default function RelatedBlogs({ posts }) {
  // Filter only published blogs and blogs from 2025 onwards
  const currentYear = 2025;
  const filteredPosts = posts?.filter((post) => {
    // Check if blog is published
    if (post.isPublished !== true) return false;
    
    // Check if blog has a creation date
    if (!post.created_at) return false;
    
    // Get the year from the blog's creation date
    let postYear;
    if (post.created_at.seconds) {
      // Handle Firebase Timestamp
      postYear = new Date(post.created_at.seconds * 1000).getFullYear();
    } else if (post.created_at instanceof Date) {
      // Handle Date object
      postYear = post.created_at.getFullYear();
    } else if (typeof post.created_at === 'number') {
      // Handle timestamp in milliseconds
      postYear = new Date(post.created_at).getFullYear();
    } else {
      // If we can't determine the year, exclude the blog
      return false;
    }
    
    // Only include blogs from 2025 onwards
    return postYear >= currentYear;
  }) || [];

  const related = filteredPosts.slice(0, 3);

  if (!related.length) return null;

  return (
    <section className="bg-black border-t border-[#454545] max-w-7xl mx-auto px-4 md:px-6 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Recent resources</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {related.map((post) => (
          <BlogCard key={post.id} blog={post} />
        ))}
      </div>
    </section>
  );
}
