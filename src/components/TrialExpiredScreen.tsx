import { Instagram } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';

export function TrialExpiredScreen() {
  return (
    <main className="min-h-screen w-full bg-[#102923] text-[#F5F0E5] flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Subtle architectural frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 sm:inset-8 border border-[#C6A64D]/20"
      />

      <div className="relative z-10 mx-auto max-w-xl text-center flex flex-col items-center">
        <BrandLogo size="lg" className="mb-8 shadow-2xl" />

        <p className="text-[11px] uppercase tracking-[0.32em] text-[#C6A64D] mb-4">
          {siteConfig.brand.name}
        </p>

        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal tracking-[0.06em] text-[#F5F0E5] mb-6">
          {siteConfig.trial.expiredTitle}
        </h1>

        <div className="h-px w-20 bg-[#C6A64D]/60 mb-6" />

        <p className="text-base sm:text-lg text-[#D9CEB8] leading-relaxed mb-3">
          {siteConfig.trial.expiredSubtitle}
        </p>

        <p className="text-sm sm:text-base text-[#F5F0E5]/80 leading-relaxed mb-10">
          {siteConfig.trial.expiredInstruction}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href={siteConfig.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 border border-[#C6A64D] px-6 py-3 text-xs uppercase tracking-[0.22em] text-[#C6A64D] transition-colors duration-300 hover:bg-[#C6A64D] hover:text-[#102923]"
          >
            <Instagram className="h-4 w-4" />
            <span>{siteConfig.social.instagramHandle}</span>
          </a>

          {siteConfig.contact.email && (
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center border border-[#F5F0E5]/30 px-6 py-3 text-xs uppercase tracking-[0.22em] text-[#F5F0E5] transition-colors duration-300 hover:border-[#C6A64D] hover:text-[#C6A64D]"
            >
              {siteConfig.contact.email}
            </a>
          )}
        </div>

        <p className="mt-14 font-editorial italic text-lg text-[#D9CEB8]/70">
          {siteConfig.brand.closingStatement}
        </p>
      </div>
    </main>
  );
}
