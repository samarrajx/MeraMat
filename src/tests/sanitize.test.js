import { sanitizeInput } from '../services/sanitize'

describe('sanitizeInput', () => {
  test('removes script tags', () => {
    expect(sanitizeInput('<script>alert(1)</script>'))
      .toBe('')
  })
  test('trims whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello')
  })
  test('limits to 500 chars', () => {
    expect(sanitizeInput('a'.repeat(600)).length).toBe(500)
  })
  test('returns empty for empty input', () => {
    expect(sanitizeInput('')).toBe('')
  })
  test('returns empty for non-string', () => {
    expect(sanitizeInput(42)).toBe('')
  })
  test('passes clean text unchanged', () => {
    expect(sanitizeInput('How do I vote?'))
      .toBe('How do I vote?')
  })
  test('removes HTML attributes', () => {
    expect(sanitizeInput('<img onerror="alert(1)" />'))
      .toBe('')
  })
})
