import React, { useState } from 'react';
import StepCard from '../components/StepCard';
import ReadinessScore from '../components/ReadinessScore';
import LogoMark from '../components/LogoMark';
import { STRINGS } from '../utils/strings';
import { explainStep } from '../services/gemini';
import { speak } from '../utils/tts';
import { addToGoogleCalendar } from '../utils/calendar';
import { shareOnLinkedIn } from '../utils/share';

export default function FollowThrough({ plan, userProfile, onRestart, onSimulate }) {
  const [explanations, setExplanations] = useState({});
  const [loadingStep, setLoadingStep] = useState(null);

  const S = STRINGS[userProfile.language];

  const handleExplain = async (step) => {
    setLoadingStep(step.number);
    try {
      const text = await explainStep(step, userProfile);
      setExplanations(prev => ({ ...prev, [step.number]: text }));
    } catch {
      setExplanations(prev => ({
        ...prev,
        [step.number]: S.errorMsg || 'An error occurred while generating the explanation.'
      }));
    } finally {
      setLoadingStep(null);
    }
  };

  const handleListen = (step) => {
    speak(step.title + '. ' + step.action, userProfile.language);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '16px' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '14px',
        borderBottom: '1px solid var(--color-border)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogoMark size={24} />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 600, color: 'var(--color-secondary)' }}>
            MeraMat
          </span>
        </div>
        <div style={{
          backgroundColor: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          borderRadius: 'var(--radius-full)',
          padding: '4px 12px',
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 500,
          maxWidth: '130px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {userProfile.state}
        </div>
      </header>

      <div style={{
        backgroundColor: 'var(--color-primary-light)',
        borderLeft: '4px solid var(--color-primary)',
        borderRadius: '0 var(--radius-md) var(--radius-md) 0',
        padding: '14px 16px',
        marginBottom: '20px',
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        color: 'var(--color-secondary)',
        lineHeight: 1.6
      }}>
        {plan.greeting}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <ReadinessScore 
          score={plan.readinessScore}
          label={plan.readinessLabel}
          strings={S}
        />
      </div>

      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '16px',
        fontWeight: 600,
        color: 'var(--color-secondary)',
        marginBottom: '12px',
        marginTop: 0
      }}>
        {S.actionSteps}
      </h2>

      <div>
        {plan.steps.map(step => (
          <StepCard
            key={step.number}
            step={step}
            strings={S}
            language={userProfile.language}
            onExplain={() => handleExplain(step)}
            onListen={() => handleListen(step)}
            explanation={explanations[step.number] || null}
            isLoadingExplain={loadingStep === step.number}
          />
        ))}
      </div>

      <div style={{
        marginTop: '8px',
        padding: '16px',
        textAlign: 'center',
        fontStyle: 'italic',
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        color: 'var(--color-text-secondary)'
      }}>
        {plan.encouragement}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
        <button 
          onClick={onSimulate}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            padding: '16px 24px',
            fontFamily: 'var(--font-heading)',
            fontSize: '16px',
            fontWeight: 700,
            width: '100%',
            minHeight: '56px',
            boxShadow: '0 4px 12px rgba(255, 107, 0, 0.3)',
            cursor: 'pointer',
            transition: 'transform 0.1s ease'
          }}
        >
          {S.practiceVoting}
        </button>

        <button 
          onClick={() => addToGoogleCalendar(userProfile, plan)}
          style={{
            backgroundColor: '#E8F5E9',
            color: '#138808',
            border: '1.5px solid #138808',
            borderRadius: 'var(--radius-full)',
            padding: '12px 24px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 500,
            width: '100%',
            minHeight: '48px',
            cursor: 'pointer'
          }}
        >
          {S.addCalendar}
        </button>

        <button 
          onClick={() => shareOnLinkedIn(userProfile, plan)}
          style={{
            backgroundColor: '#E8F0FE',
            color: '#1a73e8',
            border: '1.5px solid #1a73e8',
            borderRadius: 'var(--radius-full)',
            padding: '12px 24px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 500,
            width: '100%',
            minHeight: '48px',
            cursor: 'pointer'
          }}
        >
          {S.shareLinkedIn}
        </button>
      </div>

      <div style={{
        backgroundColor: '#E8F5E9',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        marginTop: '16px',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: 600,
        color: '#138808'
      }}>
        {S.helpline}
      </div>

      <iframe
        title="Nearest Election Commission office"
        src={`https://www.google.com/maps/embed/v1/search?key=${import.meta.env.VITE_MAPS_KEY}&q=Election+Commission+office+${userProfile.state}`}
        width="100%"
        height="180"
        style={{borderRadius:'10px', border:'none', marginTop:'12px'}}
        loading="lazy"
        aria-label="Map showing nearest Election Commission office"
      />

      <div style={{
        marginTop: '12px',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        color: 'var(--color-text-secondary)',
        opacity: 0.7,
        lineHeight: 1.5
      }}>
        {S.legalCitation}
      </div>

      <button 
        onClick={onRestart}
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '200px',
          margin: '16px auto 0',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-secondary)',
          backgroundColor: 'transparent',
          borderRadius: 'var(--radius-full)',
          padding: '10px 24px',
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          minHeight: '44px',
          cursor: 'pointer'
        }}
      >
        {S.startOver}
      </button>
    </div>
  );
}
