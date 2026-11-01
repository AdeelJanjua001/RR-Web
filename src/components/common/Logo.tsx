import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  onClick
}) => {
  const [imageError, setImageError] = useState(false);

  // Dimension scaling
  const sizeMap = {
    sm: { img: 'h-8 w-auto', text: 'text-lg', badge: 'text-[9px] tracking-widest' },
    md: { img: 'h-10 w-auto', text: 'text-xl', badge: 'text-[10px] tracking-widest' },
    lg: { img: 'h-14 w-auto', text: 'text-2xl', badge: 'text-xs tracking-widest' },
    xl: { img: 'h-20 w-auto', text: 'text-4xl', badge: 'text-sm tracking-widest' }
  };

  const { img, text, badge } = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${className}`}
      role="banner"
      aria-label="REDROOM Logo"
    >
      {/* Uploaded User Logo Container */}
      <div className="relative flex items-center justify-center overflow-hidden rounded-md bg-[#0A0A0A] border border-[#292929] p-1 transition-all duration-200 group-hover:border-[#C1121F]/60 shadow-sm">
        {!imageError ? (
          <img
            src="/assets/aistudio/RR_pt__2_e0b617f3.jfif"
            alt="REDROOM Official Logo"
            className={`${img} max-h-12 object-contain transition-transform duration-200 group-hover:scale-105`}
            onError={() => setImageError(true)}
            loading="eager"
            referrerPolicy="no-referrer"
          />
        ) : (
          /* High-fidelity CSS / SVG fallback if file not accessible */
          <div className="flex items-center justify-center h-10 w-10 bg-[#050505] font-display font-bold text-[#C1121F] text-xl tracking-tighter">
            RR
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-display font-bold tracking-wider text-white uppercase transition-colors group-hover:text-red-500 ${text}`}>
            REDROOM
          </span>
          <span className={`text-[#858585] uppercase font-mono font-medium ${badge}`}>
            Digital Marketplace
          </span>
        </div>
      )}
    </div>
  );
};
