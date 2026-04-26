import React, { useState, useMemo } from 'react';
import QuestionFlow from '../components/QuestionFlow';
import LanguageToggle from '../components/LanguageToggle';
import LogoMark from '../components/LogoMark';
import { INDIAN_STATES } from '../utils/stateData';
import { STRINGS } from '../utils/strings';

export default function Diagnostic({ onComplete }) {
  const [language, setLanguage] = useState('en');
  const S = STRINGS[language];

  const questions = useMemo(() => [
    {
      id: 'state',
      text: language === 'en'
        ? 'Which state are you in?'
        : 'आप किस राज्य में हैं?',
      options: INDIAN_STATES.map(s => ({ value: s, label: s }))
    },
    {
      id: 'registered',
      text: language === 'en'
        ? 'Are you registered to vote?'
        : 'क्या आप मतदाता के रूप में पंजीकृत हैं?',
      options: language === 'en' ? [
        { value: 'yes', label: 'Yes, I am registered' },
        { value: 'no', label: 'No, not yet' },
        { value: 'not_sure', label: 'Not sure' }
      ] : [
        { value: 'yes', label: 'हाँ, मैं पंजीकृत हूँ' },
        { value: 'no', label: 'नहीं, अभी नहीं' },
        { value: 'not_sure', label: 'पक्का नहीं' }
      ]
    },
    {
      id: 'votedBefore',
      text: language === 'en'
        ? 'Have you voted before?'
        : 'क्या आपने पहले कभी मतदान किया है?',
      options: language === 'en' ? [
        { value: 'never', label: 'No, this will be my first time' },
        { value: 'once', label: 'Yes, once' },
        { value: 'multiple', label: 'Yes, multiple times' }
      ] : [
        { value: 'never', label: 'नहीं, यह पहली बार होगा' },
        { value: 'once', label: 'हाँ, एक बार' },
        { value: 'multiple', label: 'हाँ, कई बार' }
      ]
    },
    {
      id: 'knowsBooth',
      text: language === 'en'
        ? 'Do you know your polling booth location?'
        : 'क्या आप अपने मतदान केंद्र की जगह जानते हैं?',
      options: language === 'en' ? [
        { value: 'true', label: 'Yes, I know it' },
        { value: 'false', label: "No, I don't know" }
      ] : [
        { value: 'true', label: 'हाँ, मुझे पता है' },
        { value: 'false', label: 'नहीं, मुझे नहीं पता' }
      ]
    },
    {
      id: 'knowsDocs',
      text: language === 'en'
        ? 'Do you know which documents to carry on voting day?'
        : 'क्या आप जानते हैं कि कौन से दस्तावेज़ लाने हैं?',
      options: language === 'en' ? [
        { value: 'true', label: 'Yes, I know' },
        { value: 'false', label: 'Not sure' }
      ] : [
        { value: 'true', label: 'हाँ, मुझे पता है' },
        { value: 'false', label: 'पक्का नहीं' }
      ]
    }
  ], [language]);

  const handleComplete = (answers) => {
    const profile = {
      state: answers.state,
      language: language,
      registered: answers.registered,
      votedBefore: answers.votedBefore,
      knowsBooth: answers.knowsBooth === 'true',
      knowsDocs: answers.knowsDocs === 'true'
    };
    onComplete(profile);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '16px' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--color-border)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogoMark size={28} />
          <span style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: '18px', 
            fontWeight: 600, 
            color: 'var(--color-secondary)' 
          }}>
            MeraMat
          </span>
        </div>
        <LanguageToggle language={language} onChange={setLanguage} />
      </header>

      <QuestionFlow 
        questions={questions}
        onComplete={handleComplete}
        language={language}
        strings={S}
      />
    </div>
  );
}
