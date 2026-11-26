import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig, type GalleryItem } from '../config/siteConfig';
import { gsap, prefersReducedMotion } from '../utils/gsapSetup';

interface FeaturedStoriesSectionProps {
  onSelectStory: (item: GalleryItem) => void;
}

export function FeaturedStoriesSection({ onSelectStory }: FeaturedStoriesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.story-card', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stories-grid',
          start: 'top 78%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stories = siteConfig.featuredStories;

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="relative bg-[#183A34] text-[#F5F0E5] py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C6A64D]" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#C6A64D]">
                THE ART OF STORYTELLING
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.06] tracking-[0.01em] text-[#F5F0E5]">
              Love, captured in its finest moments.
            </h2>
          </div>

          <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-[#D9CEB8]/85">
            Select any chapter below to inspect the frame in full-screen exhibition mode.
          </p>
        </div>

        {/* Asymmetric Editorial Showcase Grid */}
        <div className="stories-grid grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {stories.map((story, index) => {
            // Craft intentional asymmetric editorial spans
            const spanClasses = [
              'md:col-span-7 aspect-[16/11]',
              'md:col-span-5 aspect-[4/5] md:aspect-auto',
              'md:col-span-5 aspect-[3/4]',
              'md:col-span-7 aspect-[4/3] md:aspect-[16/11]',
              'md:col-span-7 aspect-[16/10]',
              'md:col-span-5 aspect-[4/5] md:aspect-auto',
            ][index % 6];

            return (
              <button
                key={story.id}
                type="button"
                onClick={() => onSelectStory(story)}
                className={`story-card group relative overflow-hidden bg-[#102923] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A64D] cursor-pointer ${spanClasses}`}
              >
                <img
                  src={story.src}
                  alt={story.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Scrim */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0D211C]/90 via-[#102923]/25 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                />

                {/* Top Subtle Gold Hairline on Hover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-4 border border-[#C6A64D]/0 transition-all duration-500 group-hover:border-[#C6A64D]/45 pointer-events-none"
                />

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex items-end justify-between gap-4">
                  <div>
                    <span className="inline-block text-[10px] sm:text-xs font-medium uppercase tracking-[0.26em] text-[#C6A64D] mb-2">
                      {story.category}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#F5F0E5] leading-tight">
                      {story.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#D9CEB8]/80 max-w-md hidden sm:block">
                      {story.caption}
                    </p>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#C6A64D]/40 bg-[#102923]/70 text-[#C6A64D] transition-all duration-300 group-hover:bg-[#C6A64D] group-hover:text-[#102923]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-10 text-center text-[11px] tracking-[0.12em] text-[#D9CEB8]/65">
          {siteConfig.brand.portfolioDisclaimer}
        </p>
      </div>
    </section>
  );
}
