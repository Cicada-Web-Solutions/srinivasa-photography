import { Instagram } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1E1A] text-[#F5F0E5] border-t border-[#C6A64D]/20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#C6A64D]/15">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-4 mb-5">
              <BrandLogo size="md" />
              <div>
                <p className="font-editorial text-2xl tracking-[0.18em] text-[#F5F0E5]">
                  SRINIVASA
                </p>
                <p className="text-[10px] tracking-[0.36em] text-[#C6A64D] uppercase mt-1">
                  PHOTOGRAPHY
                </p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#D9CEB8]/80">
              {siteConfig.brand.shortDescription}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h3 className="text-[11px] uppercase tracking-[0.28em] text-[#C6A64D] mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-[#D9CEB8]/85 transition-colors hover:text-[#C6A64D]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#services"
                  className="text-sm text-[#D9CEB8]/85 transition-colors hover:text-[#C6A64D]"
                >
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Configurable Contact */}
          <div className="md:col-span-4">
            <h3 className="text-[11px] uppercase tracking-[0.28em] text-[#C6A64D] mb-5">
              Connect
            </h3>
            <div className="space-y-3 text-sm text-[#D9CEB8]/85">
              <p>{siteConfig.contact.phone || siteConfig.contact.phoneDisplay}</p>
              <p>{siteConfig.contact.email || siteConfig.contact.emailDisplay}</p>
              <p>{siteConfig.contact.locationDisplay}</p>
            </div>

            <a
              href={siteConfig.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 border border-[#C6A64D]/40 px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-[#C6A64D] transition-colors hover:bg-[#C6A64D] hover:text-[#102923]"
            >
              <Instagram className="h-4 w-4" />
              <span>{siteConfig.social.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* Bottom Closing Statement & Copyright */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left">
          <p className="font-editorial italic text-xl text-[#C6A64D]">
            {siteConfig.brand.closingStatement}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 text-xs text-[#D9CEB8]/65">
            <span>
              &copy; {currentYear} {siteConfig.brand.shortName}. All rights reserved.
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-[#D9CEB8]/45">
          {siteConfig.brand.portfolioDisclaimer}
        </p>
      </div>
    </footer>
  );
}
