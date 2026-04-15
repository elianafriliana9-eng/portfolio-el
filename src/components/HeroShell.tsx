import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Compass, Menu, X } from 'lucide-react';
import { useState } from 'react';

import type { HeroContent, NavLink } from '../data/site';
import { aeonEase } from './motion';

interface HeroShellProps {
  content: HeroContent;
  leftNav: NavLink[];
  mobileNav: NavLink[];
  rightNav: NavLink[];
}

interface HeroStar {
  delay: string;
  duration: string;
  left: string;
  size: number;
  top: string;
}

const heroStars = createHeroStars();

function createHeroStars(count = 60): HeroStar[] {
  return Array.from({ length: count }, (_, index) => {
    const seed = (index + 1) * 19.37;
    const left = ((Math.sin(seed) + 1) / 2) * 100;
    const top = 2 + (((Math.cos(seed * 0.73) + 1) / 2) * 21);
    const size = 1 + (((Math.sin(seed * 1.7) + 1) / 2) > 0.55 ? 1 : 0);
    const duration = 2 + (((Math.cos(seed * 1.31) + 1) / 2) * 3);
    const delay = ((Math.sin(seed * 2.1) + 1) / 2) * 3.2;

    return {
      left: `${left.toFixed(2)}%`,
      top: `${top.toFixed(2)}%`,
      size,
      duration: `${duration.toFixed(2)}s`,
      delay: `${delay.toFixed(2)}s`,
    };
  });
}

export default function HeroShell({
  content,
  leftNav,
  mobileNav,
  rightNav,
}: HeroShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative h-[100svh] min-h-[760px] overflow-hidden bg-page-cream">
        <div
          className="absolute inset-0 z-0 overflow-hidden bg-dark-space"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 10%, 50% 26%, 0 10%)',
          }}
        >
          <img
            src="/images/space-hero-bg.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-top opacity-45 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(74,158,255,0.25),transparent_45%),radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.08),transparent_42%)]" />

          {heroStars.map((star, index) => (
            <span
              key={`${star.left}-${star.top}-${index}`}
              className="hero-star absolute rounded-full bg-white"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDuration: star.duration,
                animationDelay: star.delay,
              }}
            />
          ))}

          {[
            {
              size: 'min(55vw, 500px)',
              borderColor: 'rgba(255, 255, 255, 0.05)',
            },
            {
              size: 'min(38vw, 360px)',
              borderColor: 'rgba(255, 255, 255, 0.10)',
            },
            {
              size: 'min(24vw, 220px)',
              borderColor: 'rgba(74, 158, 255, 0.25)',
            },
          ].map((ring) => (
            <div
              key={ring.size}
              className="absolute rounded-full border"
              style={{
                left: '50%',
                top: '8%',
                width: ring.size,
                height: ring.size,
                transform: 'translate(-50%, -50%)',
                borderColor: ring.borderColor,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 z-10">
          <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 sm:px-8 lg:px-8">
            <span className="font-display text-[10px] uppercase tracking-[0.25em] text-white/60">
              AEON / SPACE
            </span>
            <span className="hidden font-display text-[10px] uppercase tracking-[0.25em] text-white/60 lg:block">
              {content.utilityLabel}
            </span>
            <button
              type="button"
              className="rounded-full border border-navy-text/15 bg-page-cream/78 p-2 text-navy-text backdrop-blur-sm transition-colors duration-300 hover:bg-white lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen ? (
              <motion.nav
                id="mobile-navigation"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: aeonEase }}
                className="absolute inset-x-5 top-18 z-30 rounded-[1.5rem] border border-navy-text/10 bg-[rgba(232,223,200,0.96)] px-5 py-4 shadow-[0_22px_52px_rgba(6,10,18,0.18)] backdrop-blur-sm lg:hidden"
              >
                <ul className="flex flex-col gap-3">
                  {mobileNav.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="block font-display text-[11px] uppercase tracking-[0.24em] text-navy-text transition-colors duration-300 hover:text-accent-blue"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            ) : null}
          </AnimatePresence>

          <div
            className="absolute hidden lg:block"
            style={{
              left: '25%',
              top: '21%',
              transform: 'translate(-50%, -50%) rotate(12.7deg)',
            }}
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.8, ease: aeonEase }}
            >
              <ul className="flex items-center gap-7 font-display text-[11px] uppercase tracking-[0.24em] text-navy-text">
                {leftNav.map((item, index) => (
                  <li key={item.label} className="flex items-center gap-7">
                    <a className="transition-colors duration-300 hover:text-accent-blue" href={item.href}>
                      {item.label}
                    </a>
                    {index < leftNav.length - 1 ? <span className="text-navy-text/35">|</span> : null}
                  </li>
                ))}
              </ul>
            </motion.nav>
          </div>

          <div
            className="absolute hidden lg:block"
            style={{
              left: '75%',
              top: '21%',
              transform: 'translate(-50%, -50%) rotate(-12.7deg)',
            }}
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.8, ease: aeonEase }}
            >
              <ul className="flex items-center gap-7 font-display text-[11px] uppercase tracking-[0.24em] text-navy-text">
                {rightNav.map((item, index) => (
                  <li key={item.label} className="flex items-center gap-7">
                    <a className="transition-colors duration-300 hover:text-accent-blue" href={item.href}>
                      {item.label}
                    </a>
                    {index < rightNav.length - 1 ? <span className="text-navy-text/35">|</span> : null}
                  </li>
                ))}
              </ul>
            </motion.nav>
          </div>

          <div
            className="absolute z-20"
            style={{
              left: '50%',
              top: '26%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.85, ease: aeonEase }}
              className="relative flex h-[90px] w-[90px] items-center justify-center rounded-full bg-white shadow-[0_16px_48px_rgba(0,0,0,0.35)] sm:h-[110px] sm:w-[110px] lg:h-[136px] lg:w-[136px]"
            >
              <span
                className="absolute rounded-[20%] border border-navy-text/30"
                style={{
                  width: '58%',
                  height: '58%',
                  transform: 'rotate(45deg)',
                }}
              />
              <span
                className="absolute rounded-[20%] border border-navy-text/15"
                style={{
                  width: '76%',
                  height: '76%',
                  transform: 'rotate(-45deg)',
                }}
              />
              <Compass className="text-dark-space" size={44} strokeWidth={1} />
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 top-[34%] flex flex-col items-center justify-center px-6 pb-16 text-center sm:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: aeonEase }}
              className="font-display text-[2.2rem] leading-[0.92] font-bold uppercase tracking-[0.03em] text-navy-text sm:text-5xl md:text-6xl lg:text-[5.5rem]"
            >
              <span className="block">{content.eyebrow}</span>
              <span className="mt-3 block bg-[linear-gradient(to_right,#1a5fa0,#8b6532)] bg-clip-text text-transparent">
                AN ILLUSION
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.9, ease: aeonEase }}
              className="text-balance mt-7 max-w-4xl text-[1rem] font-light leading-8 text-muted-navy/75 sm:text-[1.08rem]"
            >
              {content.paragraph}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.85, ease: aeonEase }}
              className="mt-9 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <a
                href={content.primaryCta.href}
                className="inline-flex min-h-12 items-center justify-center bg-navy-text px-8 font-display text-[10px] uppercase tracking-[0.22em] text-page-cream transition-colors duration-300 hover:bg-accent-blue"
              >
                {content.primaryCta.label}
              </a>
              <a
                href={content.secondaryCta.href}
                className="inline-flex min-h-12 items-center justify-center border border-navy-text/35 px-8 font-display text-[10px] uppercase tracking-[0.22em] text-navy-text transition-colors duration-300 hover:border-accent-blue hover:text-accent-blue"
              >
                {content.secondaryCta.label}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 1.1, duration: 0.8, ease: aeonEase }}
              className="mt-12 hidden h-10 w-px origin-top bg-[linear-gradient(to_bottom,rgba(26,46,66,0.4),rgba(26,46,66,0))] sm:block"
            />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
