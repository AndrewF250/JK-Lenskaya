import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lenskaya.ru';

  const staticPages = [
    '',
    '/about',
    '/catalog',
    '/architecture',
    '/improvement',
    '/location',
    '/infrastructure',
    '/gallery',
    '/progress',
    '/news',
    '/contacts',
    '/favorites',
    '/privacy',
    '/documents',
  ];

  return staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1 : 0.8,
  }));
}
