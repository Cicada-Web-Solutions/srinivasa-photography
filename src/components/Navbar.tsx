import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { type TrialCountdownState } from '../utils/trialTimer';
import { BrandLogo } from './BrandLogo';
import { TrialBanner } from './TrialBanner';

interface NavbarProps {
  countdown: TrialCountdownState;
}

export function Navbar({ countdown }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="relative z-50">
        <TrialBanner countdown={countdown} />
      </div>

      <nav
        aria-label="Main navigation"
        className={`relative z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#102923]/92 backdrop-blur-md border-b border-[#C6A64D]/20 py-3 shadow-lg shadow-black/20'
            : 'bg-gradient-to-b from-[#102923]/75 via-[#102923]/35 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Brand Logo */}
          <a
            href="#home"
            className="group flex items-center gap-3.5 focus:outline-none"
            aria-label={`${siteConfig.brand.shortName} Home`}
          >
            <BrandLogo
              size="sm"
              className="transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-editorial text-lg tracking-[0.2em] text-[#F5F0E5] leading-none">
                SRINIVASA
              </span>
              <span className="mt-1 text-[9px] tracking-[0.38em] text-[#C6A64D] uppercase leading-none">
                PHOTOGRAPHY
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-9">
            <ul className="flex items-center gap-8">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="editorial-link text-xs uppercase tracking-[0.2em] text-[#F5F0E5]/90 transition-colors hover:text-[#C6A64D]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="border border-[#C6A64D] bg-[#C6A64D]/10 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-[#C6A64D] transition-all duration-300 hover:bg-[#C6A64D] hover:text-[#102923]"
            >
              Book a Shoot
            </a>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="flex lg:hidden h-11 w-11 items-center justify-center border border-[#C6A64D]/35 bg-[#102923]/60 text-[#F5F0E5] transition-colors hover:border-[#C6A64D] hover:text-[#C6A64D] cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Editorial Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-[#102923]/98 backdrop-blur-xl transition-all duration-500 flex flex-col justify-between px-8 pt-32 pb-10 overflow-y-auto ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col items-start gap-6 mt-6">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C6A64D]">
            Navigation
          </span>
          <ul className="flex flex-col gap-5 w-full">
            {siteConfig.navigation.map((item, idx) => (
              <li
                key={item.href}
                className="border-b border-[#C6A64D]/15 pb-3 w-full"
              >
                <a
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex items-baseline justify-between font-editorial text-3xl tracking-wide text-[#F5F0E5] transition-colors hover:text-[#C6A64D]"
                >
                  <span>{item.label}</span>
                  <span className="font-sans text-xs tracking-[0.2em] text-[#C6A64D]/70">
                    0{idx + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={handleLinkClick}
            className="mt-4 w-full text-center border border-[#C6A64D] bg-[#C6A64D] px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#102923] transition-colors hover:bg-[#F5F0E5]"
          >
            Book a Shoot
          </a>
        </div>

        <div className="border-t border-[#C6A64D]/20 pt-6 flex items-center justify-between text-xs text-[#D9CEB8]">
          <span>{siteConfig.social.instagramHandle}</span>
          <span className="font-editorial italic text-sm text-[#C6A64D]">
            {siteConfig.brand.closingStatement}
          </span>
        </div>
      </div>
    </header>
  );
}
