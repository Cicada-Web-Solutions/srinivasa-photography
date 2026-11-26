import { useMemo, useState } from 'react';
import { Expand, Plus } from 'lucide-react';
import { siteConfig, type GalleryItem } from '../config/siteConfig';

interface PhotoGallerySectionProps {
  onSelectPhoto: (item: GalleryItem, visibleList: GalleryItem[]) => void;
}

const FILTER_OPTIONS = [
  'All',
  'Traditional Rituals',
  'Bridal & Groom',
  'Couple Stories',
  'Candid & Family',
  'Details & Celebrations',
  'Monochrome',
] as const;

type FilterOption = (typeof FILTER_OPTIONS)[number];

export function PhotoGallerySection({ onSelectPhoto }: PhotoGallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [showAll, setShowAll] = useState(false);

  const filteredItems = useMemo(() => {
    const items = [...siteConfig.galleryItems];
    if (activeFilter === 'All') return items;
    return items.filter((item) => item.galleryFilter === activeFilter);
  }, [activeFilter]);

  const visibleItems = useMemo(() => {
    if (activeFilter !== 'All' || showAll) {
      return filteredItems;
    }
    return filteredItems.slice(0, 8);
  }, [filteredItems, activeFilter, showAll]);

  const aspectClassMap: Record<GalleryItem['aspect'], string> = {
    portrait: 'aspect-[3/4]',
    tall: 'aspect-[4/5]',
    landscape: 'aspect-[4/3]',
  };

  return (
    <section
      id="gallery"
      className="relative bg-[#171B19] text-[#F5F0E5] py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C6A64D]" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#C6A64D]">
                CURATED EXHIBITION
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.06] text-[#F5F0E5]">
              A visual archive of emotion &amp; grace.
            </h2>
          </div>

          <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-[#D9CEB8]/80">
            Filter by narrative chapter or open any photograph for full-resolution viewing.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Gallery category filters"
          className="mb-12 flex flex-wrap items-center gap-2 sm:gap-3 border-b border-[#C6A64D]/15 pb-6"
        >
          {FILTER_OPTIONS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => {
                  setActiveFilter(filter);
                }}
                className={`px-4 py-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'border-[#C6A64D] bg-[#C6A64D] text-[#102923] font-semibold'
                    : 'border-[#C6A64D]/25 bg-transparent text-[#D9CEB8] hover:border-[#C6A64D]/70 hover:text-[#F5F0E5]'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Asymmetric Masonry Exhibition Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {visibleItems.map((item) => (
            <figure
              key={item.id}
              className="break-inside-avoid group relative overflow-hidden bg-[#102923]"
            >
              <button
                type="button"
                onClick={() => onSelectPhoto(item, visibleItems)}
                className={`relative block w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A64D] cursor-pointer ${aspectClassMap[item.aspect]}`}
                aria-label={`Open ${item.title} in lightbox`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0D1A17]/90 via-[#102923]/15 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-90"
                />

                <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center border border-[#F5F0E5]/30 bg-[#102923]/70 text-[#F5F0E5] opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <Expand className="h-4 w-4 text-[#C6A64D]" />
                </div>

                <figcaption className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-[#C6A64D] mb-1">
                    {item.galleryFilter}
                  </span>
                  <span className="block font-editorial text-2xl text-[#F5F0E5]">
                    {item.title}
                  </span>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>

        {/* View More Stories Toggle */}
        {activeFilter === 'All' && filteredItems.length > 8 && (
          <div className="mt-14 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-3 border border-[#C6A64D] px-9 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#C6A64D] transition-all duration-300 hover:bg-[#C6A64D] hover:text-[#102923] cursor-pointer"
            >
              <Plus
                className={`h-4 w-4 transition-transform duration-300 ${
                  showAll ? 'rotate-45' : ''
                }`}
              />
              <span>{showAll ? 'SHOW CURATED HIGHLIGHTS' : 'VIEW MORE STORIES'}</span>
            </button>

            <span className="text-[11px] tracking-[0.12em] text-[#D9CEB8]/60">
              Showing {visibleItems.length} of {filteredItems.length} curated exhibition frames
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
