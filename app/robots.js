export default function robots() {
  const baseUrl = 'https://www.credflow.ai'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/blogs/create/',
          '/blogs/edit/',
          '/blogs/dashboard/',
          '/blogs/preview/',
          '/blogs/(auth)/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/blogs/create/',
          '/blogs/edit/',
          '/blogs/dashboard/',
          '/blogs/preview/',
          '/blogs/(auth)/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

