import React from 'react';
import LogoMark from './LogoMark';
import LanguageToggle from './LanguageToggle';

export default function HomeScreen({ 
  onStart, 
  language = 'en', 
  onLanguageChange, 
  strings = {} 
}) {
  const S = strings;

  const chipStyle = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-full)',
    padding: '6px 12px',
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '500',
    color: 'var(--color-text-secondary)'
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      position: 'relative',
      textAlign: 'center',
      background: 'var(--color-bg)'
    }}>
      <style>
        {`
          .lang-wrapper {
            align-self: flex-end;
            margin-bottom: 20px;
          }
          .title-text {
            font-family: var(--font-heading);
            font-size: 28px;
            font-weight: 700;
            color: var(--color-navy);
            letter-spacing: -0.5px;
          }
          .cta-btn {
            background: var(--color-primary);
            color: white;
            border: none;
            border-radius: var(--radius-full);
            padding: 16px 32px;
            font-family: var(--font-heading);
            font-size: 16px;
            font-weight: 600;
            width: 100%;
            max-width: 300px;
            min-height: 56px;
            box-shadow: 0 4px 16px rgba(255,107,0,0.3);
            transition: background 0.2s ease, transform 0.1s ease;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .cta-btn:hover {
            background: #E55A00;
          }
          .cta-btn:active {
            transform: scale(0.98);
          }
          @media (min-width: 600px) {
            .lang-wrapper {
              position: absolute;
              top: 20px;
              right: 20px;
              align-self: auto;
              margin-bottom: 0;
            }
            .title-text {
              font-size: 32px;
            }
          }
        `}
      </style>

      {/* Language Toggle */}
      <div className="lang-wrapper">
        <LanguageToggle language={language} onChange={onLanguageChange} />
      </div>

      {/* Logo */}
      <div style={{ marginBottom: '16px' }}>
        <LogoMark size={56} />
      </div>

      {/* Title */}
      <div className="title-text">
        MeraMat
      </div>
      <div style={{
        fontFamily: "'Noto Sans Devanagari', sans-serif",
        fontSize: '15px',
        color: 'var(--color-text-secondary)',
        marginTop: '2px',
        marginBottom: '6px'
      }}>
        मेरा मत
      </div>

      {/* Non-partisan badge */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        color: 'var(--color-text-secondary)',
        background: 'var(--color-primary-light)',
        borderRadius: 'var(--radius-full)',
        padding: '4px 12px',
        marginBottom: '20px',
        display: 'inline-block'
      }}>
        {S?.nonPartisan || '100% Non-Partisan & Independent'}
      </div>

      {/* Tagline */}
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '15px',
        fontWeight: 400,
        color: 'var(--color-text-secondary)',
        maxWidth: '280px',
        lineHeight: 1.6,
        marginBottom: '32px'
      }}>
        {S?.tagline || 'Your personalized guide to casting your vote in the Indian Elections.'}
      </div>

      {/* CTA Button */}
      <button className="cta-btn" onClick={onStart}>
        {S?.buildPlan || 'Build My Plan'}
      </button>

      {/* Stat chips */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        justifyContent: 'center',
        maxWidth: '360px',
        marginTop: '24px'
      }}>
        <div style={chipStyle}>{S?.stats?.voters || '968M+ Voters'}</div>
        <div style={chipStyle}>{S?.stats?.seats || '543 Lok Sabha Seats'}</div>
        <div style={chipStyle}>{S?.stats?.helpline || 'Helpline: 1950'}</div>
      </div>

      {/* Powered By */}
      <div style={{
        marginTop: '32px',
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        color: '#D1D5DB'
      }}>
        {S?.poweredBy || 'Powered by Gemini AI • ECI Open Data'}
      </div>
    </div>
  );
}
