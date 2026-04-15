import { MotionConfig, motion, useInView } from 'framer-motion';
import { ArrowRight, Telescope } from 'lucide-react';
import { useRef } from 'react';

import type { DiscoveryContent, SpectrumBarProps } from '../data/site';
import { aeonEase, fadeUpTransition, inViewViewport } from './motion';

interface DiscoverySectionProps {
  bars: SpectrumBarProps[];
  content: DiscoveryContent;
}

function SpectrumBar({ index, value }: SpectrumBarProps & { index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });

  return (
    <div ref={ref} className="flex h-full items-end">
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.6, delay: index * 0.05, ease: aeonEase }}
        className="w-full origin-bottom bg-accent-blue/40 transition-colors duration-300 hover:bg-accent-blue"
        style={{ height: `${value}%` }}
      />
    </div>
  );
}

export default function DiscoverySection({ bars, content }: DiscoverySectionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section id="explore" className="relative isolate overflow-hidden bg-page-bg py-24 sm:py-28">
        <img
          src="/images/exoplanet.png"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#080d14,rgba(8,13,20,0.55),#080d14)]" />

        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,480px)] lg:items-end lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -56 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.26em] text-warm-gold">
              <Telescope size={16} strokeWidth={1.6} />
              <span>{content.label}</span>
            </div>
            <h2 className="mt-5 font-display text-[3rem] leading-[0.94] font-bold text-white sm:text-6xl lg:text-[5.2rem]">
              <span className="block">EXOPLANET /</span>
              <span className="block">K2-18B</span>
            </h2>
            <p className="mt-7 max-w-2xl text-[1.2rem] leading-9 text-white/75">{content.body}</p>
            <a
              href={content.cta.href}
              className="mt-12 inline-flex min-h-12 items-center justify-center gap-3 bg-white px-8 font-display text-[11px] uppercase tracking-[0.24em] text-page-bg transition-colors duration-300 hover:bg-accent-blue hover:text-white"
            >
              {content.cta.label} <ArrowRight size={14} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 56 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
            className="border border-white/20 bg-black/20 p-7 backdrop-blur-md sm:p-8"
          >
            <div className="font-display text-[11px] uppercase tracking-[0.28em] text-white/60">
              Spectral Analysis
            </div>
            <div className="mt-10 grid h-52 grid-cols-12 items-end gap-3">
              {bars.map((bar, index) => (
                <SpectrumBar key={`${bar.value}-${index}`} index={index} value={bar.value} />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between font-mono text-[0.92rem] text-white/55">
              <span>0.5μm</span>
              <span>5.0μm</span>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
