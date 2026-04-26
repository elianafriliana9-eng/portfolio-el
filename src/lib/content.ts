import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

import type {
  DiscoveryContent,
  LaunchRowProps,
  MissionCardProps,
  NextDepartureContent,
  SpectrumBarProps,
} from '../data/site';
import { formatLaunchTime, formatReadingTime, formatShortDate, toUtcDateInput } from './format';

export type MissionEntry = CollectionEntry<'missions'>;
export type ReportEntry = CollectionEntry<'reports'>;
export type DepartureEntry = CollectionEntry<'departures'>;
export type NewsEntry = CollectionEntry<'news'>;
export type PageEntry = CollectionEntry<'pages'>;
export type SingletonPageId = 'about' | 'science' | 'technology';

function buildLaunchTimestamp(launchDate: Date, launchTime: string) {
  const normalizedTime = launchTime.length === 5 ? `${launchTime}:00` : launchTime;
  return new Date(`${toUtcDateInput(launchDate)}T${normalizedTime}Z`).getTime();
}

export function estimateReadingTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getReadingTimeLabel(body: string) {
  return formatReadingTime(estimateReadingTime(body));
}

export async function getMissionEntries() {
  const entries = await getCollection('missions');
  return entries.sort((left, right) => left.data.order - right.data.order);
}

export async function getReportEntries() {
  const entries = await getCollection('reports');
  return entries.sort((left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime());
}

export async function getDepartureEntries() {
  const entries = await getCollection('departures');
  return entries.sort(
    (left, right) =>
      buildLaunchTimestamp(left.data.launchDate, left.data.launchTime) -
      buildLaunchTimestamp(right.data.launchDate, right.data.launchTime),
  );
}

export async function getNewsEntries() {
  const entries = await getCollection('news');
  return entries.sort((left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime());
}

export async function getPageEntry(id: SingletonPageId) {
  const entry = await getEntry('pages', id);
  if (!entry) {
    throw new Error(`Missing singleton page content for ${id}`);
  }
  return entry;
}

export function toMissionCard(entry: MissionEntry): MissionCardProps {
  return {
    title: entry.data.title,
    description: entry.data.summary,
    status: entry.data.status,
    statusTone: entry.data.statusTone,
    icon: entry.data.icon,
    href: `/missions/${entry.id}/`,
  };
}

export function toDiscoveryContent(entry: ReportEntry): DiscoveryContent {
  return {
    label: entry.data.label,
    title: entry.data.title,
    body: entry.data.summary,
    cta: {
      href: `/reports/${entry.id}/`,
      label: 'Read Report',
    },
    archiveHref: '/reports/',
    archiveLabel: 'View All Reports',
    image: entry.data.image,
    rangeStart: entry.data.rangeStart,
    rangeEnd: entry.data.rangeEnd,
  };
}

export function toSpectrumBars(entry: ReportEntry): SpectrumBarProps[] {
  return entry.data.spectrumBars.map((value) => ({ value }));
}

export function toNextDepartureContent(entry: DepartureEntry): NextDepartureContent {
  return {
    title: 'Next Departure',
    label: 'T-Minus',
    launchDate: toUtcDateInput(entry.data.launchDate),
    launchTime: entry.data.launchTime,
    image: entry.data.image,
    allHref: '/departures/',
  };
}

export function toLaunchRow(entry: DepartureEntry): LaunchRowProps {
  return {
    date: formatShortDate(entry.data.launchDate),
    time: formatLaunchTime(entry.data.launchTime),
    title: entry.data.title,
    detail: entry.data.detail,
    href: `/departures/${entry.id}/`,
  };
}
