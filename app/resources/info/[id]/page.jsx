"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import BlogHero from "./components/BlogHero";
import BlogContent from "./components/BlogContent";
import RelatedBlogs from "./components/RelatedBlogs";
import { getAllBlogs } from "@/lib/getBlogs";
import Loader from "@/components/common/Loader";

export default function BlogDetailPage() {
  const { id } = useParams();
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

  if (loading) return <Loader full text="Loading blog details..." />;
  if (!blog || !blog.isPublished) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold text-white mb-4">Blog Not Found</h1>
        <p className="text-gray-400 mb-6">This blog post may not be published or doesn&apos;t exist.</p>
        <Link href="/resources" className="inline-block bg-gradient-to-r from-[#5063C6] to-[#B71CD2] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
          View All Blogs
        </Link>
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
