import React from 'react';

export default function LanguageToggle({ language = 'en', onChange }) {
  const containerStyle = {
    display: 'inline-flex',
    background: 'var(--color-primary-light)',
    border: '1.5px solid var(--color-primary)',
    borderRadius: 'var(--radius-full)',
    padding: '3px',
    gap: '2px'
  };

  const getButtonStyle = (isActive) => ({
    minWidth: '44px',
    minHeight: '36px',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    WebkitTapHighlightColor: 'transparent',
    background: isActive ? 'var(--color-primary)' : 'transparent',
    color: isActive ? 'white' : 'var(--color-primary)'
  });

  return (
    <div style={containerStyle} aria-label="Toggle language">
      <button 
        style={getButtonStyle(language === 'en')}
        aria-pressed={language === 'en'}
        onClick={() => onChange?.('en')}
      >
        EN
      </button>
      <button 
        style={getButtonStyle(language === 'hi')}
        aria-pressed={language === 'hi'}
        onClick={() => onChange?.('hi')}
      >
        हि
      </button>
    </div>
  );
}
