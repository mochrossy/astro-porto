import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, '') || '';

  // Definisikan semua yang dibutuhkan
  const posts = await getCollection('blog');
  const projects = await getCollection('projects');

  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.9', changefreq: 'weekly' },
    { url: '/portfolio', priority: '0.9', changefreq: 'weekly' },
    { url: '/contact', priority: '0.7', changefreq: 'yearly' },
    { url: '/id/blog', priority: '0.7', changefreq: 'weekly' },
    { url: '/id/portfolio', priority: '0.7', changefreq: 'weekly' },
  ];

  // Blog posts (EN + ID)
  const postUrls = posts
    .filter(p => !p.data.draft)
    .map(post => {
      const isId = post.id.startsWith('id/');
      const slug = post.id.replace(/^(en|id)\//, '');
      return {
        url: isId ? `/id/blog/${slug}` : `/blog/${slug}`,
        priority: '0.7',
        changefreq: 'monthly',
        lastmod: (post.data.updatedAt ?? post.data.publishedAt).toISOString(),
      };
    });

  // Projects (EN + ID)
  const projectUrls = projects
    .filter(p => !p.data.draft)
    .map(project => {
      const isId = project.id.startsWith('id/');
      const slug = project.id.replace(/^(en|id)\//, '');
      return {
        url: isId ? `/id/portfolio/${slug}` : `/portfolio/${slug}`,
        priority: '0.7',
        changefreq: 'monthly',
        lastmod: project.data.completedAt?.toISOString(),
      };
    });

  const allUrls = [...staticPages, ...postUrls, ...projectUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    ({ url, priority, changefreq, lastmod }) => `  <url>
    <loc>${siteUrl}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${lastmod ? `    <lastmod>${lastmod}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};