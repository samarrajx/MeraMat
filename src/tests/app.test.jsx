import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, test, expect } from 'vitest'
import App from '../App'

vi.mock('./services/gemini', () => ({
  generateVotingPlan: vi.fn()
}))

describe('App', () => {
  test('renders home screen by default', () => {
    render(<App />)
    expect(screen.getByText('MeraMat')).toBeInTheDocument()
  })

  test('renders Build My Plan button', () => {
    render(<App />)
    expect(screen.getByText(/Build My Plan/i))
      .toBeInTheDocument()
  })

  test('renders language toggle', () => {
    render(<App />)
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  test('renders tagline', () => {
    render(<App />)
    expect(screen.getByText(/Your vote/i))
      .toBeInTheDocument()
  })

  test('navigates to diagnostic on CTA click', () => {
    render(<App />)
    fireEvent.click(screen.getByText(/Build My Plan/i))
    expect(screen.getByText(/Which state/i))
      .toBeInTheDocument()
  })
})
