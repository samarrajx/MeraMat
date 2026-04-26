import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import Diagnostic from './phases/Diagnostic';
import FollowThrough from './phases/FollowThrough';
import LoadingScreen from './components/LoadingScreen';
import EVMSimulator from './components/EVMSimulator';
import { generateVotingPlan } from './services/gemini';
import { STRINGS } from './utils/strings';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [userProfile, setUserProfile] = useState(null);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en');

  const S = STRINGS[language];

  const handleDiagnosticComplete = async (profile) => {
    setUserProfile(profile);
    setError(null);
    setScreen('loading');
    try {
      const result = await generateVotingPlan(profile);
      setPlan(result);
      setScreen('plan');
    } catch (err) {
      setError(err.message);
      setScreen('plan');
    }
  };

  const handleRestart = () => {
    setPlan(null);
    setUserProfile(null);
    setError(null);
    setScreen('home');
  };

  return (
    <div id="main-content">
      {screen === 'home' && (
        <HomeScreen
          onStart={() => setScreen('diagnostic')}
          language={language}
          onLanguageChange={setLanguage}
          strings={S}
        />
      )}

      {screen === 'diagnostic' && (
        <Diagnostic onComplete={handleDiagnosticComplete} />
      )}

      {screen === 'loading' && (
        <LoadingScreen strings={S} />
      )}

      {screen === 'plan' && (
        <>
          {error ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              padding: '24px'
            }}>
              <div style={{
                color: 'var(--color-error, #DC2626)',
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                {S.errorMsg || error}
              </div>
              <button
                onClick={() => {
                  setScreen('diagnostic');
                  setError(null);
                }}
                style={{
                  border: '1.5px solid var(--color-primary)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-primary)',
                  borderRadius: 'var(--radius-full)',
                  padding: '14px 24px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '15px',
                  fontWeight: 600,
                  width: '100%',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>
            </div>
          ) : plan ? (
            <FollowThrough
              plan={plan}
              userProfile={userProfile}
              onRestart={handleRestart}
              onSimulate={() => setScreen('simulator')}
            />
          ) : null}
        </>
      )}

      {screen === 'simulator' && (
        <EVMSimulator
          userProfile={userProfile}
          strings={S}
          onClose={() => setScreen('plan')}
        />
      )}
    </div>
  );
}
