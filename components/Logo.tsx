
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`${iconSizes[size]} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Document Shape */}
          <path d="M25 15 H65 L75 25 V85 H25 Z" fill="none" stroke="#00509d" strokeWidth="6" strokeLinejoin="round" />
          <path d="M65 15 V25 H75" fill="none" stroke="#00509d" strokeWidth="6" />
          <line x1="35" y1="40" x2="55" y2="40" stroke="#00509d" strokeWidth="4" />
          <line x1="35" y1="55" x2="65" y2="55" stroke="#00509d" strokeWidth="4" />
          <line x1="35" y1="70" x2="60" y2="70" stroke="#00509d" strokeWidth="4" />
          
          {/* Green Checkmark */}
          <path d="M40 55 L55 75 L95 25" fill="none" stroke="#7cb342" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm" />
          
          {/* Swooshes */}
          <path d="M10 70 Q 30 90 70 85" fill="none" stroke="#00509d" strokeWidth="4" strokeLinecap="round" />
          <path d="M15 75 Q 35 95 75 90" fill="none" stroke="#f57c00" strokeWidth="4" strokeLinecap="round" />
          <path d="M20 80 Q 40 100 80 95" fill="none" stroke="#ffb300" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      
      {showText && (
        <div className={`${textSizes[size]} font-black tracking-tighter flex`}>
          <span className="text-[#00509d]">Tender</span>
          <span className="text-[#7cb342]">Flow</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
