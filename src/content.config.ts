import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    cover: z.string().optional(),
    category: z.string().default('Umum'),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Moch. Rossy Avian I.'),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string().optional(),
    techStack: z.array(z.string()).default([]),
    category: z.string().default('Web'),
    client: z.string().optional(),
    duration: z.string().optional(),
    completedAt: z.date().optional(),
    projectUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };