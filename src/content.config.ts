import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const missions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/missions' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.string(),
    statusTone: z.enum(['green', 'blue', 'gold']),
    icon: z.enum(['satellite', 'rocket', 'star']),
    order: z.number(),
    vehicle: z.string(),
    missionWindow: z.string(),
    destination: z.string(),
    coverImage: z.string().default('/images/rocket-launch.png'),
  }),
});

const reports = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reports' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    label: z.string(),
    publishedAt: z.coerce.date(),
    image: z.string().default('/images/exoplanet.png'),
    spectrumBars: z.array(z.number().int().min(0).max(100)).length(12),
    rangeStart: z.string(),
    rangeEnd: z.string(),
    highlight: z.string(),
  }),
});

const departures = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/departures' }),
  schema: z.object({
    title: z.string(),
    detail: z.string(),
    launchDate: z.coerce.date(),
    launchTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/),
    image: z.string().default('/images/rocket-launch.png'),
    launchSite: z.string(),
    missionWindow: z.string(),
    order: z.number(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    author: z.string(),
    desk: z.string(),
    image: z.string().default('/images/space-hero-bg.png'),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    eyebrow: z.string(),
    image: z.string().default('/images/space-hero-bg.png'),
    highlights: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ).default([]),
  }),
});

export const collections = {
  missions,
  reports,
  departures,
  news,
  pages,
};
