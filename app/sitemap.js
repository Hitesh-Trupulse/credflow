export default function sitemap() {
  const baseUrl = 'https://www.credflow.ai'
  const currentDate = new Date().toISOString()
  
  // Main pages - ordered by priority
  const routes = [
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
  ]

  return routes
}

