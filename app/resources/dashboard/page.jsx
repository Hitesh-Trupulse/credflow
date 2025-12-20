"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db , logout} from "@/firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Loader from "@/components/common/Loader";
import { Pencil, Eye, Trash2 } from "lucide-react";

const POSTS_PER_PAGE =10;

export default function AdminDashboard() {
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/resources/login");
    }
  }, [user, loading]);

  console.log("posts",posts)

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      const sorted = docs.sort(
        (a, b) => b.data.created_at?.seconds - a.data.created_at?.seconds
      );
      setPosts(sorted);
      setLoadingPosts(false);
    });
    return () => unsubscribe();
  }, []);

  // Filter and sort posts
  const filteredAndSortedPosts = posts
    .filter((post) => {
      // Search filter
      const matchesSearch = post.data.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = 
        statusFilter === "all" || 
        (statusFilter === "published" && post.data?.isPublished) ||
        (statusFilter === "unpublished" && !post.data?.isPublished);
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = a.data.created_at?.seconds || 0;
      const dateB = b.data.created_at?.seconds || 0;
      
      switch (sortBy) {
        case "oldest":
          return dateA - dateB;
        case "newest":
          return dateB - dateA;
        default:
          return dateB - dateA;
      }
    });

  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", id));
    }
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, statusFilter]);

  if (loading || loadingPosts) {
    return <Loader text="Loading admin dashboard..." full />;
  }

  return (
    <section className="min-h-screen bg-black max-w-7xl mx-auto px-4 py-14 pt-28 xl:pt-40">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-4">
        <Link
          href="/resources/create"
          className="bg-gradient-to-r from-[#5063C6] to-[#B71CD2] text-white text-sm px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          + Add New resource
        </Link>
        <button onClick={logout} className="bg-red-600/80 backdrop-blur-sm border border-red-500 cursor-pointer text-white text-sm px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">Logout</button>
      </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search resources by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 backdrop-blur-sm border border-[#454545] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5063C6] focus:border-transparent"
            />
          </div>
          
          {/* Sort Dropdown */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 cursor-pointer bg-black/50 backdrop-blur-sm border border-[#454545] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5063C6] focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 cursor-pointer py-3 bg-black/50 backdrop-blur-sm border border-[#454545] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5063C6] focus:border-transparent"
            >
              <option value="all">All Resources</option>
              <option value="published">Published Only</option>
              <option value="unpublished">Unpublished Only</option>
            </select>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="text-sm text-gray-400">
          Showing {filteredAndSortedPosts.length} of {posts.length} Resources
        </div>
      </div>

      {/* Desktop Table */}
      {paginatedPosts.length > 0 ? (
        <div className="hidden md:block overflow-x-auto rounded-xl shadow-2xl border border-[#454545]">
        <table className="min-w-full bg-black/50 backdrop-blur-sm text-sm text-left">
          <thead className="bg-gradient-to-r from-[#5063C6]/10 to-[#B71CD2]/10 text-white border-b border-[#454545]">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Date Posted</th>
              <th className="px-6 py-4 font-semibold">Published</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.map((post) => {
              const isPublished = post.data?.isPublished ?? false;

              return (
                <tr
                  key={post.id}
                  className="border-t border-[#454545] hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-white">{post.data.title}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {post.data.created_at?.seconds 
                      ? new Date(post.data.created_at.seconds * 1000).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      : 'N/A'
                    }
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${isPublished ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-gray-500/20 text-gray-400 border border-gray-500/30"}`}>
                      {isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 items-center">
                      <Link href={`/resources/edit/${post.id}`}>
                        <button
                          title="Edit"
                          className="p-2 bg-[#5063C6]/20 cursor-pointer text-[#5063C6] border border-[#5063C6]/30 rounded-lg hover:bg-[#5063C6]/30 transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                      </Link>
                      <Link
                        href={
                          post.data.customURL?.length > 3
                            ? `/resources/preview/${post.data.customURL}`
                            : `/resources/preview/${post.data.title
                                .toLowerCase()
                                .replace(/[^a-zA-Z ]/g, "")
                                .split(" ")
                                .join("-")}`
                        }
                      >
                        <button
                          title="Preview"
                          className="p-2 bg-gray-500/20 cursor-pointer text-gray-300 border border-gray-500/30 rounded-lg hover:bg-gray-500/30 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                      </Link>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(post.id)}
                        className="p-2 bg-red-500/20 cursor-pointer text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      ) : (
        <div className="hidden md:flex items-center justify-center py-12 text-gray-400">
          <div className="text-center">
            <p className="text-lg font-medium text-white">No resources found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        </div>
      )}

      {/* Mobile Cards */}
      {paginatedPosts.length > 0 ? (
        <div className="md:hidden space-y-4">
        {paginatedPosts.map((post) => {
              const isPublished = post.data?.isPublished ?? false;

          return (
            <div
              key={post.id}
              className="bg-black/50 backdrop-blur-sm border border-[#454545] rounded-xl shadow-lg p-4 space-y-3"
            >
              <div className="font-semibold text-base text-white">{post.data.title}</div>
              <div className="text-sm text-gray-400">
                Date: {post.data.created_at?.seconds 
                  ? new Date(post.data.created_at.seconds * 1000).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })
                  : 'N/A'
                }
              </div>
              <div className="text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${isPublished ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-gray-500/20 text-gray-400 border border-gray-500/30"}`}>
                  {isPublished ? "Published" : "Draft"}
                </span>
              </div>
              <div className="flex justify-start gap-3 pt-2">
                <Link href={`/resources/edit/${post.id}`}>
                  <button
                    title="Edit"
                    className="p-2 bg-[#5063C6]/20 cursor-pointer text-[#5063C6] border border-[#5063C6]/30 rounded-lg hover:bg-[#5063C6]/30"
                  >
                    <Pencil size={16} />
                  </button>
                </Link>
                <Link
                  href={
                    post.data.customURL?.length > 3
                      ? `/resources/preview/${post.data.customURL}`
                      : `/resources/preview/${post.data.title
                          .toLowerCase()
                          .replace(/[^a-zA-Z ]/g, "")
                          .split(" ")
                          .join("-")}`
                  }
                >
                  <button
                    title="Preview"
                    className="p-2 bg-gray-500/20 cursor-pointer text-gray-300 border border-gray-500/30 rounded-lg hover:bg-gray-500/30"
                  >
                    <Eye size={16} />
                  </button>
                </Link>
                <button
                  title="Delete"
                  onClick={() => handleDelete(post.id)}
                  className="p-2 bg-red-500/20 cursor-pointer text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
        </div>
      ) : (
        <div className="md:hidden flex items-center justify-center py-12 text-gray-400">
          <div className="text-center">
            <p className="text-lg font-medium text-white">No resources found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-center gap-2 mt-10 flex-wrap">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg border text-sm cursor-pointer transition-all ${
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
    </section>
  );
}
