import React from 'react';

export default function StepCard({
  step,
  strings = {},
  language = 'en',
  onExplain,
  onListen,
  explanation = null,
  isLoadingExplain = false
}) {
  if (!step) return null;

  const priorityColors = {
    high: { border: '#DC2626', bg: '#FEE2E2', text: '#DC2626' },
    medium: { border: '#FF6B00', bg: '#FFF0E6', text: '#FF6B00' },
    low: { border: '#138808', bg: '#E8F5E9', text: '#138808' }
  };

  const pKey = step.priority ? step.priority.toLowerCase() : 'medium';
  const colors = priorityColors[pKey] || priorityColors.medium;
  const pTextKey = pKey.charAt(0).toUpperCase() + pKey.slice(1);
  const priorityText = strings?.[`priority${pTextKey}`] || pTextKey;

  const hasLink = step.resource && step.resource.startsWith('https');

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderLeft: `4px solid ${colors.border}`,
      borderRadius: 'var(--radius-md)',
      padding: '14px',
      marginBottom: '12px',
      boxShadow: 'var(--shadow-card)'
    }}>
      <style>
        {`
          .bottom-row {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 10px;
          }
          .action-row {
            display: flex;
            gap: 6px;
            width: 100%;
          }
          .explain-btn {
            flex: 1;
            border: 1.5px solid var(--color-primary);
            color: var(--color-primary);
            background: transparent;
            border-radius: var(--radius-full);
            padding: 8px 14px;
            font-family: var(--font-body);
            font-size: 13px;
            font-weight: 500;
            min-height: var(--touch-min);
            cursor: pointer;
            transition: all 0.2s ease;
            -webkit-tap-highlight-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          @media (min-width: 400px) {
            .bottom-row {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }
            .action-row {
              width: auto;
            }
            .explain-btn {
              flex: none;
              width: auto;
            }
          }
        `}
      </style>

      {/* Row 1: Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{
          width: '28px', height: '28px',
          background: 'var(--color-primary)',
          color: 'white',
          fontFamily: 'var(--font-heading)',
          fontSize: '13px',
          fontWeight: '600',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%'
        }}>
          {step.number}
        </div>
        <div style={{
          background: colors.bg,
          color: colors.text,
          fontFamily: 'var(--font-heading)',
          fontSize: '11px',
          fontWeight: '500',
          padding: '2px 10px',
          borderRadius: 'var(--radius-full)'
        }}>
          {priorityText}
        </div>
      </div>

      {/* Content */}
      <div style={{ 
        fontFamily: 'var(--font-heading)', 
        fontSize: '15px', 
        fontWeight: '600', 
        color: 'var(--color-navy)', 
        marginBottom: '6px', 
        lineHeight: 1.4 
      }}>
        {step.title}
      </div>
      <div style={{ 
        fontFamily: 'var(--font-body)', 
        fontSize: '13px', 
        color: 'var(--color-text-secondary)', 
        lineHeight: 1.6, 
        marginBottom: '10px' 
      }}>
        {step.action}
      </div>

      {/* Resource Link */}
      {hasLink && (
        <a 
          href={step.resource}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            color: 'var(--color-primary)',
            fontSize: '12px',
            marginBottom: '10px',
            fontFamily: 'var(--font-body)',
            fontWeight: '500',
            textDecoration: 'none'
          }}
        >
          {strings?.officialLink || 'Official Link ↗'}
        </a>
      )}

      {/* Bottom Row */}
      <div className="bottom-row">
        {/* Time Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: '#F3F4F6',
          borderRadius: 'var(--radius-full)',
          padding: '4px 10px',
          fontSize: '11px',
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text-secondary)',
          whiteSpace: 'nowrap'
        }}>
          ⏱ {step.timeNeeded}
        </div>

        {/* Actions */}
        <div className="action-row">
          <button
            onClick={() => onListen?.(step)}
            aria-label={`Listen to step ${step.number}`}
            title="Listen"
            style={{
              width: 'var(--touch-min)',
              height: 'var(--touch-min)',
              minWidth: 'var(--touch-min)',
              minHeight: 'var(--touch-min)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              background: 'transparent',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            🔊
          </button>
          <button
            className="explain-btn"
            onClick={() => onExplain?.(step)}
            disabled={isLoadingExplain}
            aria-label={`Explain step ${step.number}`}
            style={{ opacity: isLoadingExplain ? 0.5 : 1 }}
          >
            {isLoadingExplain ? (strings?.explaining || 'Loading...') : (strings?.explainThis || 'Explain ↗')}
          </button>
        </div>
      </div>

      {/* Explanation Panel */}
      {explanation && (
        <div style={{
          marginTop: '12px',
          background: 'var(--color-success-light)',
          borderLeft: '3px solid var(--color-success)',
          borderRadius: '0 var(--radius-md) var(--radius-md) 0',
          padding: '12px',
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--color-navy)',
          lineHeight: 1.7
        }}>
          {explanation}
        </div>
      )}
    </div>
  );
}
