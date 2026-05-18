import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all standard crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/wp-admin/', '/wp-login.php', '/go/'],
      },
      // Explicitly allow AI crawlers — critical for AI citations
      { userAgent: 'GPTBot',         allow: '/' },  // ChatGPT
      { userAgent: 'PerplexityBot',  allow: '/' },  // Perplexity
      { userAgent: 'ClaudeBot',      allow: '/' },  // Claude / Anthropic
      { userAgent: 'anthropic-ai',   allow: '/' },  // Anthropic research
      { userAgent: 'CCBot',          allow: '/' },  // Common Crawl (feeds many AIs)
      { userAgent: 'Google-Extended', allow: '/' }, // Google Gemini training
      { userAgent: 'cohere-ai',      allow: '/' },  // Cohere AI
      { userAgent: 'YouBot',         allow: '/' },  // You.com
    ],
    sitemap: 'https://moissanitebyaurelia.com/sitemap.xml',
    host: 'https://moissanitebyaurelia.com',
  }
}
