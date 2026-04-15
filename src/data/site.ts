export interface NavLink {
  href: string;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  paragraph: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  utilityLabel: string;
}

export interface MissionCardProps {
  description: string;
  href: string;
  icon: 'satellite' | 'rocket' | 'star';
  status: string;
  statusTone: 'green' | 'blue' | 'gold';
  title: string;
}

export interface SpectrumBarProps {
  value: number;
}

export interface StatBlockProps {
  label: string;
  value: string;
}

export interface LaunchRowProps {
  date: string;
  detail: string;
  title: string;
}

export interface DiscoveryContent {
  body: string;
  cta: NavLink;
  label: string;
  title: string;
}

export interface NextDepartureContent {
  countdown: string;
  label: string;
  title: string;
}

export interface FooterMeta {
  description: string;
  title: string;
}

export const heroLeftNav: NavLink[] = [
  { label: 'Missions', href: '#missions' },
  { label: 'Explore', href: '#explore' },
  { label: 'Science', href: '#science' },
];

export const heroRightNav: NavLink[] = [
  { label: 'Technology', href: '#technology' },
  { label: 'News', href: '#about' },
  { label: 'About', href: '#about' },
];

export const mobileNav: NavLink[] = [...heroLeftNav, ...heroRightNav];

export const heroContent: HeroContent = {
  eyebrow: 'THE BOUNDARY IS',
  paragraph:
    'We stand at the precipice of the infinite. AEON exists to push human ambition beyond the heliosphere, seeking answers in the dark, and bringing the light of understanding back home.',
  primaryCta: {
    href: '#missions',
    label: 'Explore Missions',
  },
  secondaryCta: {
    href: '#science',
    label: 'Our Science',
  },
  utilityLabel: 'EST. 2024',
};

export const missions: MissionCardProps[] = [
  {
    title: 'Artemis VII',
    description:
      'Lunar south pole permanent habitat establishment and ice extraction operations.',
    status: 'Nominal',
    statusTone: 'green',
    icon: 'satellite',
    href: '#technology',
  },
  {
    title: 'Europa Recon',
    description:
      "Sub-surface ocean mapping of Jupiter's moon via autonomous drone deployment.",
    status: 'En Route',
    statusTone: 'blue',
    icon: 'rocket',
    href: '#explore',
  },
  {
    title: 'Helios Deep Probe',
    description:
      'Close-proximity solar coronal mass ejection sampling and magnetic field analysis.',
    status: 'Critical',
    statusTone: 'gold',
    icon: 'star',
    href: '#science',
  },
];

export const discovery: DiscoveryContent = {
  label: 'Latest Discovery',
  title: 'EXOPLANET / K2-18B',
  body:
    'Our deep space array has confirmed the presence of carbon-bearing molecules in the atmosphere of K2-18b, a habitable-zone exoplanet 120 light-years from Earth.',
  cta: {
    href: '#technology',
    label: 'Read Report',
  },
};

export const spectrumBars: SpectrumBarProps[] = [
  { value: 40 },
  { value: 20 },
  { value: 60 },
  { value: 90 },
  { value: 45 },
  { value: 30 },
  { value: 80 },
  { value: 100 },
  { value: 50 },
  { value: 70 },
  { value: 30 },
  { value: 60 },
];

export const stats: StatBlockProps[] = [
  { value: '14', label: 'Active Missions' },
  { value: '4,200', label: 'Hours in Void' },
  { value: '8', label: 'Planets Surveyed' },
  { value: '2.4B', label: 'Miles Traveled' },
];

export const nextDeparture: NextDepartureContent = {
  title: 'Next Departure',
  label: 'T-Minus',
  countdown: '48:12:04:33',
};

export const launches: LaunchRowProps[] = [
  {
    date: 'OCT 24, 2024',
    title: 'Vanguard Heavy',
    detail: 'Orbital Array Module 4',
  },
  {
    date: 'NOV 12, 2024',
    title: 'Ares Interceptor',
    detail: 'Mars Surface Rover',
  },
  {
    date: 'DEC 05, 2024',
    title: 'Deep Space Courier',
    detail: 'Crew Resupply V',
  },
];

export const footerMeta: FooterMeta = {
  title: 'AEON',
  description:
    'Government-backed deep space exploration agency. Pushing the boundaries of human ambition and scientific discovery.',
};

export const footerDirectory: NavLink[] = [
  { label: 'Missions', href: '#missions' },
  { label: 'Discoveries', href: '#explore' },
  { label: 'Technology', href: '#technology' },
  { label: 'Science', href: '#science' },
];

export const footerPolicies: string[] = ['Privacy', 'Terms', 'Classified'];
