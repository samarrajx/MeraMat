import { render, screen, fireEvent } from '@testing-library/react'
import StepCard from '../components/StepCard'
import { vi } from 'vitest'

const mockStep = {
  number: 1,
  title: 'Register on voters.eci.gov.in',
  action: 'Visit ECI portal and submit Form 6 online',
  resource: 'https://voters.eci.gov.in',
  timeNeeded: '10 minutes',
  priority: 'high'
}

const S = {
  explainThis: 'Explain ↗',
  explaining: 'Loading...',
  officialLink: 'Official Link ↗',
  priorityHigh: 'High',
  priorityMedium: 'Medium',
  priorityLow: 'Low',
  listenStep: '🔊'
}

describe('StepCard', () => {
  const setup = (overrides={}) =>
    render(<StepCard step={mockStep} strings={S}
      language="en" onExplain={vi.fn()}
      onListen={vi.fn()} explanation={null}
      isLoadingExplain={false} {...overrides} />)

  test('renders title', () => {
    setup()
    expect(screen.getByText(mockStep.title))
      .toBeInTheDocument()
  })
  test('renders action text', () => {
    setup()
    expect(screen.getByText(mockStep.action))
      .toBeInTheDocument()
  })
  test('renders explain button', () => {
    setup()
    expect(screen.getByText('Explain ↗'))
      .toBeInTheDocument()
  })
  test('calls onExplain on click', () => {
    const onExplain = vi.fn()
    setup({ onExplain })
    fireEvent.click(screen.getByText('Explain ↗'))
    expect(onExplain).toHaveBeenCalledTimes(1)
  })
  test('calls onListen on click', () => {
    const onListen = vi.fn()
    setup({ onListen })
    fireEvent.click(screen.getByLabelText(
      'Listen to step 1'))
    expect(onListen).toHaveBeenCalledTimes(1)
  })
  test('resource is a link with correct href', () => {
    setup()
    expect(screen.getByRole('link'))
      .toHaveAttribute('href',
        'https://voters.eci.gov.in')
  })
  test('shows explanation when provided', () => {
    setup({ explanation: 'This means you need to...' })
    expect(screen.getByText(
      'This means you need to...')).toBeInTheDocument()
  })
  test('explain disabled when loading', () => {
    setup({ isLoadingExplain: true })
    expect(screen.getByText('Loading...'))
      .toBeInTheDocument()
  })
})
