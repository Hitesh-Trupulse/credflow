import { getAllBlogs } from "@/lib/getBlogs";

const BASE_URL = "https://www.credflow.ai";

export default async function sitemap() {
  const now = new Date();

  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/software`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/payers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/innetwork`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const normalizeDate = (value) => {
    if (!value) return now;
    if (value.toDate) return value.toDate();
    if (value.seconds) return new Date(value.seconds * 1000);
    if (typeof value === "number") return new Date(value);
    if (value instanceof Date) return value;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? now : parsed;
  };

  const toSlug = (blog) => {
    if (blog.customURL) return blog.customURL;
    if (!blog.title) return null;
    return blog.title
      .toLowerCase()
      .replace(/[^a-zA-Z ]/g, "")
      .split(" ")
      .join("-");
  };

  let blogRoutes = [];
  try {
    const blogs = await getAllBlogs();
    const seen = new Set();

    blogRoutes = blogs
      .filter((blog) => blog.isPublished === true)
      .map((blog) => {
        const slug = toSlug(blog);
        if (!slug || seen.has(slug)) return null;
        seen.add(slug);

        return {
          url: `${BASE_URL}/resources/info/${slug}`,
          lastModified: normalizeDate(blog.updated_at || blog.created_at),
          changeFrequency: "monthly",
          priority: 0.7,
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.error("Error building sitemap for resources", error);
  }

  return [...staticRoutes, ...blogRoutes];
}
