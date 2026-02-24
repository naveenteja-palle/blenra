import { MetadataRoute } from 'next';
import { getAllPrompts } from '@/lib/dataFetcher';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blenra.com';

  // SECURE FETCH: Get all active prompts from the database
  const prompts = await getAllPrompts();

  // 1. Static Core Pages
  const staticRoutes = ['', '/explore', '/about', '/privacy', '/terms'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : (route === '/explore' ? 0.9 : 0.5),
  }));

  // 2. Dynamic Category Pages
  const categories = Array.from(new Set(prompts.map(p => p.categorySlug)));
  const categoryRoutes = categories.map((categorySlug) => ({
    url: `${baseUrl}/category/${categorySlug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // 3. Dynamic Tag Pages
  const tags = Array.from(
    new Set(
      prompts
        .filter(p => p.tag) 
        .map(p => p.tag.replace('#', '').toLowerCase())
    )
  );
  
  const tagRoutes = tags.map((tagSlug) => ({
    url: `${baseUrl}/tag/${tagSlug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // 4. Dynamic Prompt Pages
  const promptRoutes = prompts.map((prompt) => {
    const imagePath = prompt.imageUrl; 
    
    // SANITY CHECK: Ensure it's not a title/sentence. 
    // It should exist, be a string, and ideally not contain spaces.
    // We also check if it contains common image extensions or starts with a slash.
    const isValidImagePath = 
      imagePath && 
      typeof imagePath === 'string' && 
      !imagePath.includes(' ') && 
      (imagePath.startsWith('/') || imagePath.startsWith('http') || imagePath.match(/\.(jpg|jpeg|png|webp|gif)$/i));

    // Only format the URL if it passed the sanity check
    const formattedImageUrl = isValidImagePath 
      ? `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`
      : undefined;

    return {
      url: `${baseUrl}/prompts/${prompt.categorySlug}/${prompt.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9, 
      images: formattedImageUrl ? [formattedImageUrl] : undefined,
    };
  });

  // Return the combined array
  return [...staticRoutes, ...categoryRoutes, ...tagRoutes, ...promptRoutes];
}