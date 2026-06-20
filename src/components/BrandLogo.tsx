type BrandLogoKind = 'symbol' | 'wordmark';
type BrandLogoTone = 'dark' | 'light' | 'theme';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  kind?: BrandLogoKind;
  label?: string;
  tone?: BrandLogoTone;
}

const logoSources: Record<BrandLogoKind, { dark: string; light: string }> = {
  symbol: {
    dark: '/brand/aeon-symbol-dark.png',
    light: '/brand/aeon-symbol-light.png',
  },
  wordmark: {
    dark: '/brand/aeon-logo-dark.png',
    light: '/brand/aeon-logo-light.png',
  },
};

export default function BrandLogo({
  className = '',
  kind = 'wordmark',
  label = "Elian's Portfolio",
  tone = 'theme',
}: BrandLogoProps) {
  return (
    <span
      aria-label={label}
      className={`font-display text-[1.2rem] font-bold tracking-[0.1em] uppercase leading-tight ${className}`.trim()}
    >
      {kind === 'symbol' ? 'EP' : label}
    </span>
  );
}
