import { useEffect, useRef } from 'react';
import { siteConfig } from '../config/siteConfig';
import { gsap, prefersReducedMotion } from '../utils/gsapSetup';

export function CinematicFeatureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -8, scale: 1.08 },
          {
            yPercent: 8,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      gsap.from('.cinematic-copy', {
        y: 34,
        opacity: 0,
        duration: 1.05,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 68%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[78vh] w-full overflow-hidden bg-[#102923] flex items-center"
    >
      <img
        ref={imageRef}
        src={siteConfig.cinematicFeature.image}
        alt={siteConfig.cinematicFeature.imageAlt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#0C1E1A]/90 via-[#102923]/60 to-[#0C1E1A]/70"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 py-24">
        <div className="max-w-2xl">
          <div className="cinematic-copy flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-[#C6A64D]" />
            <span className="text-[11px] uppercase tracking-[0.32em] text-[#C6A64D]">
              CINEMATIC VISION
            </span>
          </div>

          <h2 className="cinematic-copy font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.03] text-[#F5F0E5]">
            <span className="block">{siteConfig.cinematicFeature.headlineLine1}</span>
            <span className="block italic text-[#C6A64D] mt-1">
              {siteConfig.cinematicFeature.headlineLine2}
            </span>
          </h2>

          <p className="cinematic-copy mt-6 max-w-lg text-sm sm:text-base md:text-lg font-light leading-relaxed text-[#D9CEB8]">
            {siteConfig.cinematicFeature.supportingText}
          </p>

          <div className="cinematic-copy mt-9">
            <a
              href="#gallery"
              className="inline-flex items-center border border-[#C6A64D] px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#F5F0E5] transition-all duration-300 hover:bg-[#C6A64D] hover:text-[#102923]"
            >
              {siteConfig.cinematicFeature.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
