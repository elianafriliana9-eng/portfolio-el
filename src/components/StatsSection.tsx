import { MotionConfig, motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import type { StatBlockProps } from '../data/site';
import { aeonEase } from './motion';

interface StatsSectionProps {
  stats: StatBlockProps[];
}

function StatBlock({ index, label, value }: StatBlockProps & { index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.78, delay: index * 0.12, ease: aeonEase }}
      className={index > 0 ? 'lg:border-l lg:border-white/5 lg:pl-10' : ''}
    >
      <div className="font-display text-[3.2rem] leading-none font-bold text-white sm:text-6xl">{value}</div>
      <div className="mt-5 font-display text-[11px] uppercase tracking-[0.26em] text-accent-blue">{label}</div>
    </motion.div>
  );
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section id="science" className="bg-page-bg py-18 sm:py-22">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatBlock key={stat.label} index={index} {...stat} />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
