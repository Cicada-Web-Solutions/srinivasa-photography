import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem } from '../config/siteConfig';

interface LightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function Lightbox({ items, activeIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = activeIndex !== null && items[activeIndex] !== undefined;
  const activeItem = isOpen && activeIndex !== null ? items[activeIndex] : null;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNavigate((activeIndex + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        onNavigate((activeIndex - 1 + items.length) % items.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, items.length, onClose, onNavigate]);

  if (!isOpen || activeItem === null || activeIndex === null) return null;

  const handlePrev = () => onNavigate((activeIndex - 1 + items.length) % items.length);
  const handleNext = () => onNavigate((activeIndex + 1) % items.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing photograph: ${activeItem.title}`}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0B1B17]/95 backdrop-blur-md p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="flex items-center justify-between text-[#F5F0E5]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-[0.25em] text-[#C6A64D] uppercase">
            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <span className="hidden sm:inline-block h-px w-8 bg-[#C6A64D]/40" />
          <span className="hidden sm:inline-block text-xs tracking-[0.2em] text-[#D9CEB8] uppercase">
            {activeItem.category}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="flex h-10 w-10 items-center justify-center border border-[#C6A64D]/35 text-[#F5F0E5] transition-colors hover:border-[#C6A64D] hover:text-[#C6A64D] cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative mx-auto my-auto flex w-full max-w-6xl items-center justify-center gap-2 sm:gap-6 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous photograph"
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C6A64D]/30 bg-[#102923]/80 text-[#F5F0E5] transition-all hover:border-[#C6A64D] hover:text-[#C6A64D] cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="relative max-h-[72vh] w-full flex items-center justify-center overflow-hidden">
          <img
            src={activeItem.src}
            alt={activeItem.alt}
            className="max-h-[72vh] w-auto max-w-full object-contain shadow-2xl border border-[#C6A64D]/20"
          />
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next photograph"
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C6A64D]/30 bg-[#102923]/80 text-[#F5F0E5] transition-all hover:border-[#C6A64D] hover:text-[#C6A64D] cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom Caption */}
      <div
        className="mx-auto max-w-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-editorial text-2xl sm:text-3xl text-[#F5F0E5] tracking-wide">
          {activeItem.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-[#D9CEB8]/90 tracking-wide">
          {activeItem.caption}
        </p>
      </div>
    </div>
  );
}
