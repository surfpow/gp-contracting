import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all crawlers full access by default
      {
        userAgent: '*',
        allow: '/',
      },
      // OpenAI
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      // Anthropic / Claude
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      // Google (AI training and Gemini)
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'GoogleOther',
        allow: '/',
      },
      // Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // Meta / Facebook
      {
        userAgent: 'FacebookBot',
        allow: '/',
      },
      {
        userAgent: 'meta-externalagent',
        allow: '/',
      },
      // Apple
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      // Amazon
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },
      // Bytedance / TikTok
      {
        userAgent: 'Bytespider',
        allow: '/',
      },
      // Diffbot
      {
        userAgent: 'Diffbot',
        allow: '/',
      },
      // Common Crawl (used by many AI training datasets)
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      // Microsoft / Bing
      {
        userAgent: 'bingbot',
        allow: '/',
      },
      {
        userAgent: 'msnbot',
        allow: '/',
      },
    ],
    sitemap: 'https://gp-contracting.vercel.app/sitemap.xml',
    host: 'https://gp-contracting.vercel.app',
  }
}
