import { siteConfig } from '../config/siteConfig';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BrandLogo({ size = 'sm', className = '' }: BrandLogoProps) {
  const sizeClasses = {
    sm: 'h-11 w-11 sm:h-12 sm:w-12',
    md: 'h-20 w-20 sm:h-24 sm:w-24',
    lg: 'h-24 w-24 sm:h-28 sm:w-28',
  }[size];

  return (
    <div
      className={`relative shrink-0 overflow-hidden border border-[#C6A64D]/35 bg-[#192F2B] ${sizeClasses} ${className}`}
    >
      <img
        src={siteConfig.brand.logoPath}
        alt={`${siteConfig.brand.shortName} official logo`}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
