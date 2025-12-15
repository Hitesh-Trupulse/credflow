import { getAllBlogs } from '@/lib/getBlogs'

export default async function sitemap() {
  const baseUrl = 'https://www.credflow.ai'
  const now = new Date()
  const currentDate = now.toISOString()

  const baseRoutes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/get-started`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const normalizeDate = (value) => {
    if (!value) return now
    if (value.toDate) return value.toDate() // Firestore Timestamp
    if (value.seconds) return new Date(value.seconds * 1000)
    if (typeof value === 'number') return new Date(value)
    if (value instanceof Date) return value
    return now
  }

  let blogRoutes = []
  try {
    const blogs = await getAllBlogs()
    const currentYear = 2025

    blogRoutes = blogs
      .filter((blog) => blog.isPublished === true && blog.created_at)
      .filter((blog) => {
        const year = normalizeDate(blog.created_at).getFullYear()
        return year >= currentYear
      })
      .map((blog) => {
        const slug =
          blog.customURL ||
          blog.title
            ?.toLowerCase()
            .replace(/[^a-zA-Z ]/g, '')
            .split(' ')
            .join('-')

        if (!slug) return null

        const lastMod = normalizeDate(blog.updated_at || blog.created_at).toISOString()

        return {
          url: `${baseUrl}/resources/info/${slug}`,
          lastModified: lastMod,
          changeFrequency: 'monthly',
          priority: 0.7,
        }
      })
      .filter(Boolean)
  } catch (error) {
    console.error('Error building sitemap for resources', error)
  }

  return [...baseRoutes, ...blogRoutes]
}

