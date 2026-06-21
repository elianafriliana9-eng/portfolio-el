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
  href: string;
  time: string;
  title: string;
}

export interface DiscoveryContent {
  archiveHref: string;
  archiveLabel: string;
  body: string;
  cta: NavLink;
  image: string;
  label: string;
  rangeEnd: string;
  rangeStart: string;
  title: string;
}

export interface NextDepartureContent {
  allHref: string;
  image: string;
  label: string;
  launchDate: string;
  launchTime: string;
  title: string;
}

export interface FooterMeta {
  description: string;
  title: string;
}

export const siteNav: NavLink[] = [
  { label: 'Experience', href: '/missions/' },
  { label: 'Education', href: '/reports/' },
  { label: 'Skills', href: '/departures/' },
  { label: 'News', href: '/news/' },
  { label: 'About', href: '/about/' },
];

export const heroLeftNav: NavLink[] = [
  { label: 'Experience', href: '/missions/' },
  { label: 'Education', href: '/reports/' },
];

export const heroRightNav: NavLink[] = [
  { label: 'Skills', href: '/departures/' },
  { label: 'About', href: '/about/' },
];

export const mobileNav: NavLink[] = [...heroLeftNav, ...heroRightNav];

export const heroContent: HeroContent = {
  eyebrow: 'ELIAN AFRILIANA, SE',
  paragraph:
    'Dynamic and multi-skilled professional bridging the gap between technical infrastructure and visual storytelling by building robust full-stack applications while crafting high-impact visual assets.',
  primaryCta: {
    href: '/missions/',
    label: 'View Experience',
  },
  secondaryCta: {
    href: '/about/',
    label: 'More About Me',
  },
  utilityLabel: 'Tangerang, Banten',
};

export const stats: StatBlockProps[] = [
  { value: '3.30', label: 'GPA' },
  { value: '3+', label: 'Years Experience' },
  { value: '4', label: 'Systems Built' },
  { value: '10+', label: 'Design Tools' },
];

export const footerMeta: FooterMeta = {
  title: 'ELIAN AFRILIANA',
  description:
    'IT System Developer and Creative Design Professional based in Tangerang, Banten. (+6285175090448 | elianafriliana9@gmail.com)',
};

export const footerDirectory: NavLink[] = [...siteNav];

export const footerPolicies: string[] = ['Privacy', 'Terms', 'Classified'];
