import { MotionConfig, motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

import type { LaunchRowProps, NextDepartureContent } from '../data/site';
import LaunchCountdown from './LaunchCountdown';
import { aeonEase, fadeUpTransition, inViewViewport } from './motion';

interface DepartureSectionProps {
  content: NextDepartureContent;
  launches: LaunchRowProps[];
}

function LaunchRow({ date, detail, href, index, time, title }: LaunchRowProps & { index: number }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.a
      ref={ref}
      href={href}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.78, delay: index * 0.14, ease: aeonEase }}
      className="group grid gap-4 border-b border-white/10 py-6 md:grid-cols-[200px_minmax(0,1fr)] md:gap-6"
    >
      <div>
        <div className="font-display text-[1.05rem] uppercase tracking-[0.18em] text-warm-gold">{date}</div>
        <div className="mt-2 text-sm uppercase tracking-[0.22em] text-white/45">{time}</div>
      </div>
      <div>
        <h3 className="font-display text-[2rem] leading-none text-white transition-colors duration-300 group-hover:text-accent-blue sm:text-[2.2rem]">
          {title}
        </h3>
        <p className="mt-3 text-[1.05rem] text-white/62">{detail}</p>
      </div>
    </motion.a>
  );
}

export default function DepartureSection({ content, launches }: DepartureSectionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section id="technology" className="bg-dark-space py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(320px,1.05fr)_minmax(0,1fr)] lg:items-center lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
            className="group relative overflow-hidden"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={content.image}
                alt="Featured launch window"
                className="h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.08),transparent_45%)]" />
              <div className="absolute bottom-4 left-4 border border-white/15 bg-black/25 px-6 py-5 backdrop-blur-md sm:bottom-6 sm:left-6">
                <div className="font-display text-[10px] uppercase tracking-[0.24em] text-white/70">{content.label}</div>
                <LaunchCountdown
                  launchDate={content.launchDate}
                  launchTime={content.launchTime}
                  className="mt-3 block font-display text-3xl leading-none text-white sm:text-[3rem]"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
          >
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-5xl leading-none font-bold text-white sm:text-6xl">{content.title}</h2>
              <a
                href={content.allHref}
                className="hidden items-center gap-2 font-display text-[12px] uppercase tracking-[0.24em] text-white/55 transition-colors duration-300 hover:text-white md:inline-flex"
              >
                View Schedule <ArrowRight size={16} />
              </a>
            </div>
            <div className="mt-8">
              {launches.map((launch, index) => (
                <LaunchRow key={`${launch.date}-${launch.title}`} index={index} {...launch} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
