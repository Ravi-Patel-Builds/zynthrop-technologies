import React, { useId } from 'react';

interface LogoMarkProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  pixelSize?: number;
  showText?: boolean;
  animated?: boolean;
  variant?: 'mark' | 'badge' | 'full-svg';
}

export const LogoMark: React.FC<LogoMarkProps> = ({
  className = '',
  size = 'md',
  pixelSize,
  showText = true,
  animated = false,
  variant = 'mark',
}) => {
  const uid = useId().replace(/:/g, '');

  const sizeMap = {
    xs: { icon: 28, textClass: 'text-sm leading-none' },
    sm: { icon: 34, textClass: 'text-base leading-tight' },
    md: { icon: 44, textClass: 'text-lg leading-tight' },
    lg: { icon: 56, textClass: 'text-xl leading-tight' },
    xl: { icon: 76, textClass: 'text-2xl leading-tight' },
    hero: { icon: 190, textClass: 'text-3xl leading-tight' },
  };

  const pxSize = pixelSize || sizeMap[size].icon;
  const textClass = sizeMap[size].textClass;

  // If user requests the full badge matching the uploaded 1:1 image exactly
  if (variant === 'badge') {
    return (
      <div 
        className={`relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[rgba(138,148,166,0.2)] bg-[#121418] flex flex-col items-center justify-center p-6 group transition-all duration-300 ${className}`}
        style={{ width: pxSize * 2.5, maxWidth: '100%', aspectRatio: '1/1' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,89,0.12),transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div style={{ width: pxSize * 1.5, height: pxSize * 1.5 }}>
            <LogoMark size="hero" pixelSize={pxSize * 1.5} showText={false} animated={animated} />
          </div>
          {showText && (
            <div className="flex flex-col items-center tracking-tight mt-3 text-center">
              <span className="font-extrabold text-white tracking-[0.16em] uppercase font-sans text-base">
                ZYNTHROP
              </span>
              <span className="text-[10px] font-bold tracking-[0.24em] text-[#CBD5E1] uppercase">
                TECHNOLOGIES
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // If user requests the full-svg with integrated vector text
  if (variant === 'full-svg') {
    return (
      <div className={`inline-block ${className}`}>
        <LogoMark size={size} pixelSize={pxSize} showText={true} animated={animated} />
      </div>
    );
  }

  // Standard Mark + Typography (default for navigation and footers)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Exact Vector Emblem Icon */}
      <div 
        className="relative flex-shrink-0 flex items-center justify-center overflow-visible"
        style={{ width: pxSize, height: pxSize }}
      >
        <svg
          viewBox="170 120 570 680"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] ${
            animated ? 'group-hover:scale-105 transition-transform duration-300' : ''
          }`}
        >
          <defs>
            {/* Drop Shadow */}
            <filter id={`shadow-${uid}`} x="-20%" y="-20%" width="150%" height="150%">
              <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#000000" floodOpacity="0.8" />
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.5" />
            </filter>

            {/* Ambient Coral Glow */}
            <filter id={`glow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="16" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Metallic Gradients for Z Bevels */}
            <linearGradient id={`metalLightTop-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B6BFCB" />
              <stop offset="50%" stopColor="#8793A3" />
              <stop offset="100%" stopColor="#586374" />
            </linearGradient>

            <linearGradient id={`metalDarkBot-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#434B59" />
              <stop offset="60%" stopColor="#2B323D" />
              <stop offset="100%" stopColor="#1D222A" />
            </linearGradient>

            <linearGradient id={`metalLeft-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9AA5B5" />
              <stop offset="50%" stopColor="#6C7787" />
              <stop offset="100%" stopColor="#4A5361" />
            </linearGradient>

            <linearGradient id={`metalRight-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#434B59" />
              <stop offset="100%" stopColor="#252B35" />
            </linearGradient>

            <linearGradient id={`metalDiag-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8A96A7" />
              <stop offset="35%" stopColor="#636E7E" />
              <stop offset="65%" stopColor="#82665B" />
              <stop offset="100%" stopColor="#454D5A" />
            </linearGradient>

            {/* Vibrant Coral Gradient for Rising Arrow */}
            <linearGradient id={`arrowGrad-${uid}`} x1="330" y1="620" x2="720" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF5533" />
              <stop offset="40%" stopColor="#FF7A59" />
              <stop offset="75%" stopColor="#FF9371" />
              <stop offset="100%" stopColor="#FFB191" />
            </linearGradient>

            {/* Circuit Traces */}
            <linearGradient id={`trace1Grad-${uid}`} x1="280" y1="685" x2="365" y2="770" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6C7788" />
              <stop offset="100%" stopColor="#555E6D" />
            </linearGradient>

            <linearGradient id={`trace2Grad-${uid}`} x1="385" y1="685" x2="470" y2="770" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A46E60" />
              <stop offset="100%" stopColor="#7A564D" />
            </linearGradient>

            <linearGradient id={`trace3Grad-${uid}`} x1="490" y1="685" x2="575" y2="770" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF7A59" />
              <stop offset="100%" stopColor="#B8553C" />
            </linearGradient>
          </defs>

          {/* Central Ambient Coral Glow */}
          <circle cx="480" cy="420" r="220" fill="#FF7A59" opacity="0.14" filter={`url(#glow-${uid})`} />

          {/* MAIN EMBLEM WITH 3D DROP SHADOW */}
          <g filter={`url(#shadow-${uid})`}>

            {/* 3 CIRCUIT TRACES & PADS */}
            {/* Trace 1 (Left, Slate) */}
            <g>
              <line x1="280" y1="675" x2="365" y2="760" stroke="#12151B" strokeWidth="24" strokeLinecap="round" />
              <line x1="280" y1="675" x2="365" y2="760" stroke={`url(#trace1Grad-${uid})`} strokeWidth="18" strokeLinecap="round" />
              <line x1="280" y1="675" x2="365" y2="760" stroke="#8D9BB0" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              <circle cx="365" cy="760" r="32" fill="#151820" stroke={`url(#trace1Grad-${uid})`} strokeWidth="14" />
              <circle cx="365" cy="760" r="32" fill="none" stroke="#8D9BB0" strokeWidth="3" opacity="0.5" />
              <circle cx="365" cy="760" r="14" fill="#13151A" />
            </g>

            {/* Trace 2 (Middle, Copper) */}
            <g>
              <line x1="385" y1="675" x2="470" y2="760" stroke="#12151B" strokeWidth="24" strokeLinecap="round" />
              <line x1="385" y1="675" x2="470" y2="760" stroke={`url(#trace2Grad-${uid})`} strokeWidth="18" strokeLinecap="round" />
              <line x1="385" y1="675" x2="470" y2="760" stroke="#D39788" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              <circle cx="470" cy="760" r="32" fill="#151820" stroke={`url(#trace2Grad-${uid})`} strokeWidth="14" />
              <circle cx="470" cy="760" r="32" fill="none" stroke="#D39788" strokeWidth="3" opacity="0.5" />
              <circle cx="470" cy="760" r="14" fill="#13151A" />
            </g>

            {/* Trace 3 (Right, Glowing Coral) */}
            <g>
              <line x1="490" y1="675" x2="575" y2="760" stroke="#12151B" strokeWidth="24" strokeLinecap="round" />
              <line x1="490" y1="675" x2="575" y2="760" stroke={`url(#trace3Grad-${uid})`} strokeWidth="18" strokeLinecap="round" />
              <line x1="490" y1="675" x2="575" y2="760" stroke="#FFA07A" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
              <circle cx="575" cy="760" r="32" fill="#151820" stroke={`url(#trace3Grad-${uid})`} strokeWidth="14" />
              <circle cx="575" cy="760" r="32" fill="none" stroke="#FFA07A" strokeWidth="3" opacity="0.6" />
              <circle cx="575" cy="760" r="14" fill="#13151A" />
            </g>

            {/* Base Underlay of 'Z' */}
            <path
              d="M 198 150 H 558 V 204 H 248 V 294 H 558 L 190 718 H 708 V 632 H 526 V 576 H 708 V 718 H 190 V 632 L 508 248 H 198 Z"
              fill="#1A1E26"
            />

            {/* TOP ARM */}
            <polygon points="198,150 558,150 538,174 218,174" fill={`url(#metalLightTop-${uid})`} />
            <polygon points="198,150 218,174 218,274 198,294" fill={`url(#metalLeft-${uid})`} />
            <polygon points="558,150 558,204 538,188 538,174" fill={`url(#metalRight-${uid})`} />
            <polygon points="218,174 538,174 538,188 218,188" fill={`url(#metalDarkBot-${uid})`} />
            
            <polygon points="248,204 508,204 492,218 264,218" fill={`url(#metalLightTop-${uid})`} />
            <polygon points="248,248 508,248 492,234 264,234" fill={`url(#metalDarkBot-${uid})`} />
            <polygon points="248,204 264,218 264,234 248,248" fill={`url(#metalLeft-${uid})`} />
            <polygon points="198,294 558,294 538,274 218,274" fill={`url(#metalDarkBot-${uid})`} />

            {/* METALLIC DIAGONAL STRUT */}
            <polygon 
              points="528,248 376,432 190,632 238,632 422,432 558,248" 
              fill={`url(#metalDiag-${uid})`} 
            />
            <line x1="538" y1="248" x2="208" y2="632" stroke="#BAC5D4" strokeWidth="3" opacity="0.6" />
            <line x1="520" y1="248" x2="190" y2="632" stroke="#181B22" strokeWidth="3" opacity="0.8" />

            {/* BOTTOM ARM */}
            <polygon points="190,718 708,718 688,698 210,698" fill={`url(#metalDarkBot-${uid})`} />
            <polygon points="190,632 190,718 210,698 210,652" fill={`url(#metalLeft-${uid})`} />
            <polygon points="708,632 708,718 688,698 688,652" fill={`url(#metalRight-${uid})`} />
            <polygon points="210,698 688,698 688,674 210,674" fill={`url(#metalLightTop-${uid})`} />

            <polygon points="526,632 708,632 688,648 542,648" fill={`url(#metalLightTop-${uid})`} />
            <polygon points="526,672 708,672 688,656 542,656" fill={`url(#metalDarkBot-${uid})`} />
            <polygon points="526,632 542,648 542,656 526,672" fill={`url(#metalLeft-${uid})`} />

            {/* GLOWING CORAL-TO-PEACH RISING ARROW */}
            <g>
              <path
                d="M 335 624 L 626 238 L 658 260 L 372 648 Z"
                fill="#FF7A59"
                opacity="0.25"
                filter={`url(#glow-${uid})`}
              />

              <polygon
                points="335,622 628,236 662,260 372,648"
                fill={`url(#arrowGrad-${uid})`}
              />

              <line x1="335" y1="622" x2="628" y2="236" stroke="#FFEAE2" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
              <line x1="372" y1="648" x2="662" y2="260" stroke="#C83B19" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
              <line x1="353" y1="635" x2="645" y2="248" stroke="#FFA07A" strokeWidth="2" opacity="0.6" />

              {/* Arrowhead */}
              <g>
                <polygon points="582,194 722,138 704,288 632,240" fill="#B32D0D" opacity="0.4" />
                <polygon
                  points="586,192 720,138 702,286 632,238"
                  fill={`url(#arrowGrad-${uid})`}
                />
                <polygon
                  points="586,192 720,138 650,188"
                  fill="#FFFFFF"
                  opacity="0.32"
                />
                <polygon
                  points="702,286 720,138 676,242"
                  fill="#8A1E07"
                  opacity="0.38"
                />
                <line x1="632" y1="238" x2="720" y2="138" stroke="#FFF0EA" strokeWidth="4" strokeLinecap="round" />
                <polyline
                  points="586,192 720,138 702,286"
                  stroke="#FFA07A"
                  strokeWidth="2.5"
                  fill="none"
                />
              </g>
            </g>

            {/* Warm Bounce Reflections */}
            <polygon points="528,248 558,248 422,432 396,432" fill="#FF7A59" opacity="0.28" />
            <polygon points="376,432 402,432 248,600 226,600" fill="#FFA07A" opacity="0.22" />

          </g>
        </svg>
      </div>

      {/* Brand Text (Matching Exact Logo Typography) */}
      {showText && (
        <div className="flex flex-col tracking-tight">
          <span className={`font-extrabold text-white tracking-[0.14em] uppercase font-sans ${textClass}`}>
            ZYNTHROP
          </span>
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.24em] text-[#CBD5E1] uppercase -mt-0.5">
            TECHNOLOGIES
          </span>
        </div>
      )}
    </div>
  );
};
