export default function sitemap() {
  const baseUrl = 'https://www.credflow.ai'
  const currentDate = new Date().toISOString()
  
  // Main pages
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Add more routes here as you create them
    // Example:
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/blogs`,
    //   lastModified: currentDate,
    //   changeFrequency: 'daily',
    //   priority: 0.9,
    // },
  ]

  return routes
}

