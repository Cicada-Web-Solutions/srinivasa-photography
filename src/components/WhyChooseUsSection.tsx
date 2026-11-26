import { useEffect, useRef } from 'react';
import { siteConfig } from '../config/siteConfig';
import { gsap, prefersReducedMotion } from '../utils/gsapSetup';

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.pillar-item', {
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pillars-grid',
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5F0E5] text-[#171B19] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#C6A64D]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C6A64D]">
              OUR ETHOS
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.06] text-[#183A34]">
            Because every moment matters.
          </h2>
        </div>

        <div className="pillars-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {siteConfig.whyChooseUs.map((pillar) => (
            <div
              key={pillar.title}
              className="pillar-item border-t border-[#C6A64D] pt-7 flex flex-col"
            >
              <span className="font-editorial italic text-2xl text-[#C6A64D] mb-4">
                {pillar.number}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#183A34] mb-4">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#171B19]/78">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
