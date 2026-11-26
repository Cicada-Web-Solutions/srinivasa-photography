import { Instagram, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export function InstagramSection() {
  return (
    <section className="relative bg-[#EAE2D1] text-[#171B19] py-24 sm:py-28 border-t border-[#D9CEB8]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C6A64D]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#183A34]">
                {siteConfig.social.instagramHandle}
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-[#183A34]">
              Stories beyond the frame.
            </h2>
          </div>

          <a
            href={siteConfig.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border border-[#183A34] bg-[#183A34] px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#F5F0E5] transition-all duration-300 hover:bg-[#102923] hover:border-[#C6A64D] hover:text-[#C6A64D] self-start md:self-auto"
          >
            <Instagram className="h-4 w-4 text-[#C6A64D]" />
            <span>FOLLOW OUR JOURNEY</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* 6-frame visual journal grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {siteConfig.instagramPreviews.map((item) => (
            <a
              key={item.id}
              href={siteConfig.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit Srinivasa Photography on Instagram — ${item.label}`}
              className="group relative aspect-[3/4] overflow-hidden bg-[#D9CEB8]"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#102923]/65 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col items-center justify-center p-3 text-center">
                <Instagram className="h-5 w-5 text-[#C6A64D] mb-2" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#F5F0E5]">
                  {item.label}
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] tracking-[0.12em] text-[#171B19]/60">
          Visual journal preview placeholders — visit{' '}
          <a
            href={siteConfig.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#C6A64D] underline-offset-4 hover:text-[#183A34]"
          >
            {siteConfig.social.instagramHandle}
          </a>{' '}
          for live studio updates.
        </p>
      </div>
    </section>
  );
}
