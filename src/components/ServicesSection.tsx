import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { gsap, prefersReducedMotion } from '../utils/gsapSetup';

interface ServicesSectionProps {
  onEnquireService: (eventType: string) => void;
}

export function ServicesSection({ onEnquireService }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.service-row').forEach((row) => {
        gsap.from(row, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 82%',
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[#F5F0E5] text-[#171B19] py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-14 border-b border-[#D9CEB8]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C6A64D]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C6A64D]">
                WHAT WE CAPTURE
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.06] text-[#183A34]">
              Crafted around your moments.
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-[#171B19]/75">
            Below is our curated presentation of celebration categories. Every coverage plan is thoughtfully tailored in consultation with you.
          </p>
        </div>

        {/* Alternating Editorial Image & Text Rows */}
        <div className="divide-y divide-[#D9CEB8]">
          {siteConfig.services.map((service, index) => {
            const isEven = index % 2 === 1;
            return (
              <article
                key={service.id}
                className="service-row py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="group relative aspect-[16/10] overflow-hidden bg-[#D9CEB8]">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-3 border border-[#F5F0E5]/30 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Text Column */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-1 lg:pr-8' : 'lg:order-2 lg:pl-8'
                  }`}
                >
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-editorial text-3xl sm:text-4xl text-[#C6A64D]">
                      {service.number}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-[#183A34]/70">
                      {service.subtitle}
                    </span>
                  </div>

                  <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-[#183A34] mb-4">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed text-[#171B19]/80 max-w-xl mb-7">
                    {service.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => onEnquireService(service.eventOption)}
                    className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#183A34] transition-colors hover:text-[#C6A64D] cursor-pointer"
                  >
                    <span className="border-b border-[#C6A64D] pb-1">
                      Enquire for {service.title}
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5 text-[#C6A64D]" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
