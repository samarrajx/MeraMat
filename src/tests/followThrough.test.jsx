import { render, screen, waitFor } from '@testing-library/react'
import { vi, describe, test, expect } from 'vitest'
import FollowThrough from '../phases/FollowThrough'

vi.mock('../services/gemini', () => ({
  explainStep: vi.fn(() => Promise.resolve('Explanation text')),
  generateFAQ: vi.fn(() => Promise.resolve({
    faqs: [
      { question: 'Q1?', answer: 'A1' },
      { question: 'Q2?', answer: 'A2' },
      { question: 'Q3?', answer: 'A3' }
    ]
  }))
}))

vi.mock('../utils/tts', () => ({
  speak: vi.fn()
}))

vi.mock('../utils/calendar', () => ({
  addToGoogleCalendar: vi.fn()
}))

vi.mock('../utils/share', () => ({
  shareOnLinkedIn: vi.fn()
}))

const mockPlan = {
  greeting: 'Hello Bihar voter!',
  readinessScore: 30,
  readinessLabel: 'Just Starting',
  steps: [
    {
      number: 1,
      title: 'Register to Vote',
      action: 'Visit voters.eci.gov.in',
      resource: 'https://voters.eci.gov.in',
      timeNeeded: '10 minutes',
      priority: 'high'
    }
  ],
  encouragement: 'You can do it!'
}

const mockProfile = {
  state: 'Bihar',
  language: 'en',
  registered: 'not_sure',
  votedBefore: 'never',
  knowsBooth: false,
  knowsDocs: false
}

describe('FollowThrough', () => {
  test('renders greeting text', () => {
    render(<FollowThrough
      plan={mockPlan}
      userProfile={mockProfile}
      onRestart={vi.fn()}
      onSimulate={vi.fn()}
    />)
    expect(screen.getByText('Hello Bihar voter!'))
      .toBeInTheDocument()
  })

  test('renders state badge', () => {
    render(<FollowThrough
      plan={mockPlan}
      userProfile={mockProfile}
      onRestart={vi.fn()}
      onSimulate={vi.fn()}
    />)
    expect(screen.getByText('Bihar')).toBeInTheDocument()
  })

  test('renders step card title', () => {
    render(<FollowThrough
      plan={mockPlan}
      userProfile={mockProfile}
      onRestart={vi.fn()}
      onSimulate={vi.fn()}
    />)
    expect(screen.getByText('Register to Vote'))
      .toBeInTheDocument()
  })

  test('renders encouragement text', () => {
    render(<FollowThrough
      plan={mockPlan}
      userProfile={mockProfile}
      onRestart={vi.fn()}
      onSimulate={vi.fn()}
    />)
    expect(screen.getByText('You can do it!'))
      .toBeInTheDocument()
  })

  test('renders FAQ section after loading', async () => {
    render(<FollowThrough
      plan={mockPlan}
      userProfile={mockProfile}
      onRestart={vi.fn()}
      onSimulate={vi.fn()}
    />)
    await waitFor(() => {
      expect(screen.getByText('Q1?')).toBeInTheDocument()
    })
  })

  test('renders Start Over button', () => {
    render(<FollowThrough
      plan={mockPlan}
      userProfile={mockProfile}
      onRestart={vi.fn()}
      onSimulate={vi.fn()}
    />)
    expect(screen.getByText('Start Over'))
      .toBeInTheDocument()
  })

  test('renders helpline number', () => {
    render(<FollowThrough
      plan={mockPlan}
      userProfile={mockProfile}
      onRestart={vi.fn()}
      onSimulate={vi.fn()}
    />)
    expect(screen.getByText(/1950/)).toBeInTheDocument()
  })
})
