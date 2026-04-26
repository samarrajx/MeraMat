import { render, screen, fireEvent } from '@testing-library/react'
import QuestionFlow from '../components/QuestionFlow'
import { vi } from 'vitest'

const mockQuestions = [
  { id: 'q1', text: 'Question 1', options: [{label: 'Opt 1', value: 'opt1'}, {label: 'Opt 2', value: 'opt2'}] },
  { id: 'q2', text: 'Question 2', options: [{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}] }
]

const S = {
  question: 'Question',
  of: 'of'
}

describe('QuestionFlow', () => {
  test('renders first question', () => {
    render(<QuestionFlow questions={mockQuestions} strings={S} language="en" onComplete={vi.fn()} />)
    expect(screen.getByText('Question 1')).toBeInTheDocument()
  })
  test('renders all options for current question', () => {
    render(<QuestionFlow questions={mockQuestions} strings={S} language="en" onComplete={vi.fn()} />)
    expect(screen.getByText('Opt 1')).toBeInTheDocument()
    expect(screen.getByText('Opt 2')).toBeInTheDocument()
  })
  test('clicking option advances to next question', () => {
    render(<QuestionFlow questions={mockQuestions} strings={S} language="en" onComplete={vi.fn()} />)
    fireEvent.click(screen.getByText('Opt 1'))
    expect(screen.getByText('Question 2')).toBeInTheDocument()
  })
  test('renders correct counter text', () => {
    render(<QuestionFlow questions={mockQuestions} strings={S} language="en" onComplete={vi.fn()} />)
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Opt 1'))
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument()
  })
  test('calls onComplete on last question', () => {
    const onComplete = vi.fn()
    render(<QuestionFlow questions={mockQuestions} strings={S} language="en" onComplete={onComplete} />)
    fireEvent.click(screen.getByText('Opt 1'))
    fireEvent.click(screen.getByText('Yes'))
    expect(onComplete).toHaveBeenCalledWith({ q1: 'opt1', q2: 'yes' })
  })
  test('progress bar updates correctly', () => {
    const { container } = render(<QuestionFlow questions={mockQuestions} strings={S} language="en" onComplete={vi.fn()} />)
    const progressBar = container.querySelector('[style*="width: 0%"]')
    expect(progressBar).toBeInTheDocument()
  })
})
