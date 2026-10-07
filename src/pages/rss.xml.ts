import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, '') || '';
  const siteName = 'Portfolio Rossy';
  const siteDescription = 'Notes, tutorials, and experiences on IT and web development.';

  // Ambil artikel hanya dari folder en/
  const posts = (await getCollection('blog'))
    .filter(p => !p.data.draft && p.id.startsWith('en/'))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  const items = posts
    .map(post => {
      const slug = post.id.replace(/^en\//, '');
      const url = `${siteUrl}/blog/${slug}`;
      return `    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${post.data.publishedAt.toUTCString()}</pubDate>
      <description><![CDATA[${post.data.description}]]></description>
${post.data.category ? `      <category><![CDATA[${post.data.category}]]></category>` : ''}
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteName}</title>
    <link>${siteUrl}</link>
    <description>${siteDescription}</description>
    <language>en-US</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};