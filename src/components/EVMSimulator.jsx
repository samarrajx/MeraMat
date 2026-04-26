import React, { useState } from 'react';

export default function EVMSimulator({ userProfile = {}, strings = {}, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  // Fallback default steps if strings.evmSteps is missing
  const defaultSteps = [
    { number: 1, icon: '🛑', title: 'Wait for the Green Light', description: 'Before voting, ensure the green ready light is glowing on the EVM.', tip: 'If it’s red, wait for the polling officer to authorize the machine.' },
    { number: 2, icon: '👆', title: 'Find your Candidate', description: 'Look for the name and symbol of your preferred candidate on the ballot unit.', tip: 'Symbols are universally recognizable, even if you cannot read the name.' },
    { number: 3, icon: '🔘', title: 'Press the Blue Button', description: 'Press the blue button directly next to your chosen candidate’s symbol.', tip: 'Press it firmly once. Do not hold it down.' },
    { number: 4, icon: '🖨️', title: 'Check the VVPAT Slip', description: 'Look at the glass window on the printer next to the EVM to verify your vote.', tip: 'The slip displays for 7 seconds before dropping into the sealed box.' }
  ];

  const steps = strings?.evmSteps || defaultSteps;
  const step = steps[currentStep];

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'var(--color-bg)',
      zIndex: 100,
      overflowY: 'auto',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '600', color: 'var(--color-navy)' }}>
            {strings?.evmTitle || 'EVM Simulator'}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            {strings?.evmSubtitle || 'Learn how to cast your vote'}
          </div>
        </div>
        <button 
          onClick={onClose}
          aria-label="Close simulator"
          style={{
            width: 'var(--touch-min)', 
            height: 'var(--touch-min)',
            minWidth: 'var(--touch-min)',
            minHeight: 'var(--touch-min)',
            borderRadius: '50%',
            border: '1px solid var(--color-border)',
            fontSize: '18px',
            color: 'var(--color-text-secondary)',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          ✕
        </button>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
        {steps.map((_, idx) => {
          const isActive = idx === currentStep;
          return (
            <div 
              key={idx} 
              style={{
                width: isActive ? '24px' : '8px',
                height: '8px',
                background: isActive ? 'var(--color-primary)' : 'var(--color-border)',
                borderRadius: 'var(--radius-full)',
                transition: 'all 0.3s ease'
              }} 
            />
          );
        })}
      </div>

      {/* Step Card */}
      {step && (
        <div style={{
          flex: 1,
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 20px',
          boxShadow: 'var(--shadow-elevated)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Icon */}
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>
            {step.icon}
          </div>

          {/* Step Number */}
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
            Step {step.number} of {steps.length}
          </div>

          {/* Title */}
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '600', color: 'var(--color-navy)', marginBottom: '12px', lineHeight: 1.3 }}>
            {step.title}
          </div>

          {/* Description */}
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '300px', marginBottom: '20px' }}>
            {step.description}
          </div>

          {/* Tip Box */}
          {step.tip && (
            <div style={{
              width: '100%',
              background: 'var(--color-primary-light)',
              borderLeft: '3px solid var(--color-primary)',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              padding: '12px 14px',
              textAlign: 'left',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--color-navy)',
              lineHeight: 1.6
            }}>
              💡 {step.tip}
            </div>
          )}
        </div>
      )}

      {/* CTA Button */}
      <button 
        onClick={() => {
          if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
          } else {
            onClose?.();
          }
        }}
        style={{
          marginTop: '24px',
          width: '100%',
          background: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-full)',
          padding: '16px 32px',
          fontFamily: 'var(--font-heading)',
          fontSize: '16px',
          fontWeight: '600',
          minHeight: '56px',
          boxShadow: '0 4px 16px rgba(255,107,0,0.3)',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {currentStep < steps.length - 1 ? 'Next →' : (strings?.evmReady || 'I am ready to vote!')}
      </button>

      {/* Below Button Text */}
      {currentStep < steps.length - 1 && (
        <button 
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            marginTop: '12px',
            cursor: 'pointer',
            minHeight: 'var(--touch-min)',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          {strings?.evmBack || 'Exit Simulator'}
        </button>
      )}
    </div>
  );
}
