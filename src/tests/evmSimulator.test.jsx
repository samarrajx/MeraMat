import { render, screen, fireEvent } from '@testing-library/react'
import EVMSimulator from '../components/EVMSimulator'
import { STRINGS } from '../utils/strings'
import { vi } from 'vitest'

const mockProfile = {
  state: 'Bihar', language: 'en'
}
const S = STRINGS.en

describe('EVMSimulator', () => {
  test('renders title', () => {
    render(<EVMSimulator userProfile={mockProfile}
      strings={S} onClose={vi.fn()} />)
    expect(screen.getByText(S.evmTitle))
      .toBeInTheDocument()
  })
  test('renders step 1 title', () => {
    render(<EVMSimulator userProfile={mockProfile}
      strings={S} onClose={vi.fn()} />)
    expect(screen.getByText(
      S.evmSteps[0].title)).toBeInTheDocument()
  })
  test('Next button advances to step 2', () => {
    render(<EVMSimulator userProfile={mockProfile}
      strings={S} onClose={vi.fn()} />)
    fireEvent.click(screen.getByText('Next →'))
    expect(screen.getByText(
      S.evmSteps[1].title)).toBeInTheDocument()
  })
  test('close button calls onClose', () => {
    const onClose = vi.fn()
    render(<EVMSimulator userProfile={mockProfile}
      strings={S} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText(
      'Close simulator'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
  test('4 progress dots render', () => {
    const { container } = render(<EVMSimulator
      userProfile={mockProfile} strings={S}
      onClose={vi.fn()} />)
    const dots = container.querySelectorAll(
      '[style*="border-radius"]')
    expect(dots.length).toBeGreaterThanOrEqual(4)
  })
})
