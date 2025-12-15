export default function robots() {
  const baseUrl = 'https://www.credflow.ai'

  // Keep crawlers away from authoring and auth-only areas
  const disallowed = [
    '/api/',
    '/admin/',
    '/_next/',
    '/private/',
    '/resources/create/',
    '/resources/edit/',
    '/resources/dashboard/',
    '/resources/preview/',
    '/resources/(auth)/',
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowed,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: disallowed,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

