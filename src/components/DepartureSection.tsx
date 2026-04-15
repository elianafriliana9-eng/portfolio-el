import { MotionConfig, motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import type { LaunchRowProps, NextDepartureContent } from '../data/site';
import { aeonEase, fadeUpTransition, inViewViewport } from './motion';

interface DepartureSectionProps {
  content: NextDepartureContent;
  launches: LaunchRowProps[];
}

function LaunchRow({ date, detail, index, title }: LaunchRowProps & { index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.a
      ref={ref}
      href="#about"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.78, delay: index * 0.14, ease: aeonEase }}
      className="group grid gap-4 border-b border-white/10 py-6 md:grid-cols-[200px_minmax(0,1fr)] md:gap-6"
    >
      <div className="font-display text-[1.05rem] uppercase tracking-[0.18em] text-warm-gold">{date}</div>
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
                src="/images/rocket-launch.png"
                alt="Rocket launch in a dense deep-space field"
                className="h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.08),transparent_45%)]" />
              <div className="absolute bottom-4 left-4 border border-white/15 bg-black/25 px-6 py-5 backdrop-blur-md sm:bottom-6 sm:left-6">
                <div className="font-display text-[10px] uppercase tracking-[0.24em] text-white/70">{content.label}</div>
                <div className="mt-3 font-display text-3xl leading-none text-white sm:text-[3rem]">
                  {content.countdown}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
          >
            <h2 className="font-display text-5xl leading-none font-bold text-white sm:text-6xl">{content.title}</h2>
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
