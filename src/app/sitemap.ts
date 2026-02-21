import { MetadataRoute } from 'next';
import { getAllPrompts } from '@/lib/dataFetcher';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blenra.com';

  // SECURE FETCH: Get all active prompts from the database
  const prompts = await getAllPrompts();

  // 1. Static Core Pages
  const staticRoutes = ['', '/about', '/privacy', '/terms'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.5,
  }));

  // 2. Dynamic Category Pages (Extract unique categories from prompts)
  const categories = Array.from(new Set(prompts.map(p => p.categorySlug)));
  const categoryRoutes = categories.map((categorySlug) => ({
    url: `${baseUrl}/category/${categorySlug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // 3. Dynamic Prompt Pages (The pSEO Engine)
  const promptRoutes = prompts.map((prompt) => ({
    url: `${baseUrl}/prompts/${prompt.categorySlug}/${prompt.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // High priority because these are your long-tail traffic magnets
  }));

  return [...staticRoutes, ...categoryRoutes, ...promptRoutes];
}