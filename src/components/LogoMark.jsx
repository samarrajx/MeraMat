export default function LogoMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="logoClip">
          <circle cx="20" cy="20" r="20" />
        </clipPath>
      </defs>
      
      <g clipPath="url(#logoClip)">
        {/* Top Band */}
        <rect x="0" y="0" width="40" height="14" fill="#FF6B00" />
        {/* Middle Band */}
        <rect x="0" y="13" width="40" height="14" fill="#FFFFFF" />
        {/* Bottom Band */}
        <rect x="0" y="26" width="40" height="14" fill="#138808" />
        
        {/* Chakra dots */}
        <circle cx="14" cy="20" r="2" fill="#000080" />
        <circle cx="20" cy="20" r="2" fill="#000080" />
        <circle cx="26" cy="20" r="2" fill="#000080" />
      </g>
      
      <text
        x="20"
        y="21"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Noto Sans Devanagari, sans-serif"
        fontSize="13"
        fontWeight="600"
        fill="white"
      >
        मत
      </text>
    </svg>
  );
}
