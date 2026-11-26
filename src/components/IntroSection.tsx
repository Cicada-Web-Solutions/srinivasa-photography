import { useEffect, useRef } from 'react';
import { siteConfig } from '../config/siteConfig';
import { gsap, prefersReducedMotion } from '../utils/gsapSetup';

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.intro-reveal', {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      gsap.from('.intro-image-frame', {
        clipPath: 'inset(10% 0% 10% 0%)',
        scale: 1.06,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.intro-image-frame',
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#F5F0E5] text-[#171B19] py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Photograph */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Subtle Gold Offset Architectural Hairline */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -top-4 -left-4 right-8 bottom-8 border border-[#C6A64D]/55 pointer-events-none"
              />
              <div className="intro-image-frame relative aspect-[4/5] w-full overflow-hidden bg-[#D9CEB8] shadow-xl">
                <img
                  src={siteConfig.introduction.image}
                  alt={siteConfig.introduction.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#183A34]/75">
                <span>Sacred Traditions</span>
                <span className="h-px flex-1 mx-4 bg-[#D9CEB8]" />
                <span>Timeless Poise</span>
              </div>
            </div>
          </div>

          {/* Right Editorial Copy */}
          <div className="lg:col-span-6 lg:pl-8">
            <div className="intro-reveal flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#C6A64D]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C6A64D]">
                {siteConfig.introduction.label}
              </span>
            </div>

            <h2 className="intro-reveal font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.06] tracking-[0.01em] text-[#183A34]">
              {siteConfig.introduction.headline}
            </h2>

            <div className="intro-reveal my-8 h-px w-24 bg-[#C6A64D]/70" />

            <p className="intro-reveal text-lg sm:text-xl font-normal leading-relaxed text-[#171B19]/90">
              {siteConfig.introduction.description}
            </p>

            <p className="intro-reveal mt-6 text-sm sm:text-base leading-relaxed text-[#171B19]/70">
              {siteConfig.introduction.secondaryNote}
            </p>

            <div className="intro-reveal mt-10 flex items-center gap-6">
              <a
                href="#stories"
                className="inline-flex items-center gap-3 border border-[#183A34] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#183A34] transition-all duration-300 hover:bg-[#183A34] hover:text-[#F5F0E5]"
              >
                Explore Featured Stories
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
