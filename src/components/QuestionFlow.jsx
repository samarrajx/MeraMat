import React, { useState } from 'react';

export default function QuestionFlow({ questions, onComplete, language, strings }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!questions || questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  // Calculate width based on completion (e.g. 0/5 = 0%, 1/5 = 20%)
  const progressPercent = (currentIndex / questions.length) * 100;

  const handleOptionClick = (optionValue) => {
    const newAnswers = { ...answers, [currentQuestion.id]: optionValue };
    
    if (currentIndex < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentIndex(currentIndex + 1);
    } else {
      // Last question reached
      onComplete(newAnswers);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
      <style>
        {`
          .question-text {
            font-family: var(--font-heading);
            font-weight: 600;
            color: var(--color-text-primary);
            text-align: center;
            line-height: 1.4;
            margin-bottom: 28px;
            padding: 0 8px;
            font-size: 19px;
          }
          @media (min-width: 600px) {
            .question-text {
              font-size: 22px;
            }
          }
          .option-btn {
            width: 100%;
            min-height: var(--touch-min);
            padding: 14px 16px;
            background: var(--color-surface);
            border: 1.5px solid var(--color-border);
            border-radius: var(--radius-md);
            font-family: var(--font-body);
            font-size: 15px;
            color: var(--color-text-primary);
            text-align: left;
            cursor: pointer;
            transition: all 0.15s ease;
            -webkit-tap-highlight-color: transparent;
          }
          .option-btn:hover, .option-btn:focus {
            background: var(--color-primary-light);
            border-color: var(--color-primary);
            outline: none;
          }
        `}
      </style>

      {/* Progress Bar */}
      <div style={{ 
        width: '100%', 
        height: '6px', 
        background: 'var(--color-border)', 
        borderRadius: 'var(--radius-full)', 
        marginBottom: '24px'
      }}>
        <div style={{ 
          height: '6px', 
          background: 'var(--color-primary)', 
          borderRadius: 'var(--radius-full)', 
          width: `${progressPercent}%`, 
          transition: 'width 0.35s ease' 
        }} />
      </div>

      {/* Counter */}
      <div style={{ 
        fontSize: '13px', 
        color: 'var(--color-text-secondary)', 
        textAlign: 'center', 
        marginBottom: '12px' 
      }}>
        {strings?.question || 'Question'} {currentIndex + 1} {strings?.of || 'of'} {questions.length}
      </div>

      {/* Question Text */}
      <div className="question-text">
        {currentQuestion.text}
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            className="option-btn"
            aria-label={option.label}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
