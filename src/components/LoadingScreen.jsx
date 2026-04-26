import React from 'react';

export default function LoadingScreen({ strings = {} }) {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center'
    }}>
      <style>
        {`
          @keyframes spin-loader {
            to { transform: rotate(360deg); }
          }
          @keyframes bounce-dot {
            0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
            40% { opacity: 1; transform: scale(1); }
          }
          .svg-spinner {
            animation: spin-loader 1s linear infinite;
            transform-origin: 24px 24px;
          }
          .bounce-dot {
            width: 8px;
            height: 8px;
            background-color: var(--color-primary);
            border-radius: 50%;
            animation: bounce-dot 1.2s ease-in-out infinite;
          }
          .dot-1 { animation-delay: 0s; }
          .dot-2 { animation-delay: 0.2s; }
          .dot-3 { animation-delay: 0.4s; }
        `}
      </style>

      {/* 1. SVG spinner */}
      <svg 
        className="svg-spinner" 
        width="48" height="48" 
        viewBox="0 0 48 48" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle 
          cx="24" cy="24" r="20" 
          fill="none" 
          stroke="#FF6B00" 
          strokeWidth="3" 
          strokeDasharray="100" 
          strokeDashoffset="30" 
          strokeLinecap="round" 
        />
      </svg>

      {/* 2. MeraMat name */}
      <div style={{ marginTop: '20px' }}>
        <span style={{ 
          display: 'block', 
          fontFamily: 'var(--font-heading), Poppins, sans-serif', 
          fontSize: '22px', 
          fontWeight: '600', 
          color: 'var(--color-navy)' 
        }}>
          MeraMat
        </span>
        <span style={{ 
          display: 'block', 
          fontFamily: "'Noto Sans Devanagari', sans-serif", 
          fontSize: '13px', 
          color: 'var(--color-text-secondary)' 
        }}>
          मेरा मत
        </span>
      </div>

      {/* 3. Loading text */}
      <div style={{ 
        marginTop: '12px', 
        fontFamily: 'var(--font-body), Inter, sans-serif', 
        fontSize: '14px', 
        color: 'var(--color-text-secondary)', 
        maxWidth: '240px', 
        lineHeight: 1.5 
      }}>
        {strings?.buildingPlan || 'Building your personalized voting plan...'}
      </div>

      {/* 4. Three dots */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        gap: '6px', 
        justifyContent: 'center', 
        marginTop: '16px' 
      }}>
        <div className="bounce-dot dot-1" />
        <div className="bounce-dot dot-2" />
        <div className="bounce-dot dot-3" />
      </div>
    </div>
  );
}
