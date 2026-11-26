import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { gsap, prefersReducedMotion } from '../utils/gsapSetup';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 34,
        opacity: 0,
        duration: 1.15,
        stagger: 0.14,
        ease: 'power3.out',
        delay: 0.15,
      });

      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 2.2,
            ease: 'power2.out',
          }
        );

        gsap.to(bgRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#102923] flex items-end"
    >
      {/* Full-bleed Hero Photography */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img
          src={siteConfig.hero.image}
          alt={siteConfig.hero.imageAlt}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Multi-layered Dark Editorial Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#0D211C]/92 via-[#102923]/40 to-[#102923]/65"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#0D211C]/78 via-[#102923]/25 to-transparent"
      />

      {/* Asymmetric Editorial Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 pt-36 pb-20 sm:pb-24 lg:pb-28">
        <div className="max-w-3xl">
          <div className="hero-stagger mb-5 flex items-center gap-3.5">
            <span className="h-px w-10 bg-[#C6A64D]" />
            <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.34em] text-[#C6A64D]">
              {siteConfig.hero.label}
            </p>
          </div>

          <h1 className="hero-stagger font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal leading-[0.98] tracking-[0.02em] text-[#F5F0E5]">
            <span className="block">{siteConfig.hero.headlineLine1}</span>
            <span className="block italic text-[#F5F0E5]/95 mt-1">
              {siteConfig.hero.headlineLine2}
            </span>
          </h1>

          <p className="hero-stagger mt-6 max-w-xl text-sm sm:text-base md:text-lg font-light leading-relaxed text-[#D9CEB8]">
            {siteConfig.hero.supportingText}
          </p>

          <div className="hero-stagger mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#stories"
              className="inline-flex items-center justify-center border border-[#C6A64D] bg-[#C6A64D] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#102923] transition-all duration-300 hover:bg-[#F5F0E5] hover:border-[#F5F0E5]"
            >
              {siteConfig.hero.primaryCta}
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center border border-[#F5F0E5]/45 bg-[#102923]/35 backdrop-blur-sm px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] text-[#F5F0E5] transition-all duration-300 hover:border-[#C6A64D] hover:text-[#C6A64D]"
            >
              {siteConfig.hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        aria-label="Scroll down to introduction"
        className="hero-stagger absolute bottom-7 right-6 sm:right-12 z-10 hidden sm:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#D9CEB8]/80 hover:text-[#C6A64D] transition-colors"
      >
        <span>Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-[#C6A64D] to-transparent" />
        <ArrowDown className="h-3.5 w-3.5 text-[#C6A64D] animate-bounce" />
      </a>
    </section>
  );
}
