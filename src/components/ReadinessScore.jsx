import React, { useState, useEffect } from 'react';

export default function ReadinessScore({ score = 0, label = '', strings = {} }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Trigger the animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 50);
    return () => clearTimeout(timer);
  }, [score]);

  const circumference = 282.7;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  let strokeColor = '#DC2626'; // 0-40
  if (animatedScore > 70) {
    strokeColor = '#138808'; // 71-100
  } else if (animatedScore > 40) {
    strokeColor = '#FF6B00'; // 41-70
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle 
          cx="60" cy="60" r="45" 
          fill="none" 
          stroke="var(--color-border)" 
          strokeWidth="8" 
        />
        
        {/* Progress arc */}
        <circle 
          cx="60" cy="60" r="45" 
          fill="none" 
          strokeWidth="8" 
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 60 60)"
          stroke={strokeColor}
          style={{ transition: 'stroke-dashoffset 1.2s ease, stroke 1.2s ease' }}
        />
        
        {/* Score text */}
        <text 
          x="60" y="56" 
          textAnchor="middle" 
          fontFamily="var(--font-heading)" 
          fontSize="24" 
          fontWeight="700" 
          fill="var(--color-text-primary)"
          dominantBaseline="middle"
        >
          {score}
        </text>
        
        {/* Label text */}
        <text 
          x="60" y="74" 
          textAnchor="middle" 
          fontFamily="var(--font-body)" 
          fontSize="11" 
          fill="var(--color-text-secondary)"
          dominantBaseline="middle"
        >
          {label}
        </text>
      </svg>

      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '6px' }}>
        {strings?.readinessScore || 'Your voting readiness score'}
      </div>
    </div>
  );
}
