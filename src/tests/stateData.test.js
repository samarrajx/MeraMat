import { INDIAN_STATES, STATE_HELPLINES }
  from '../utils/stateData'

describe('INDIAN_STATES', () => {
  test('has 36 entries', () =>
    expect(INDIAN_STATES.length).toBe(36))
  test('includes Bihar', () =>
    expect(INDIAN_STATES).toContain('Bihar'))
  test('includes Delhi', () =>
    expect(INDIAN_STATES).toContain('Delhi'))
  test('includes Ladakh', () =>
    expect(INDIAN_STATES).toContain('Ladakh'))
  test('is alphabetically sorted', () => {
    const sorted = [...INDIAN_STATES].sort()
    expect(INDIAN_STATES).toEqual(sorted)
  })
  test('has no duplicates', () => {
    const unique = new Set(INDIAN_STATES)
    expect(unique.size).toBe(INDIAN_STATES.length)
  })
})

describe('STATE_HELPLINES', () => {
  test('has Bihar entry', () =>
    expect(STATE_HELPLINES['Bihar']).toBeDefined())
  test('all values are 1950', () => {
    Object.values(STATE_HELPLINES).forEach(v =>
      expect(v).toBe('1950'))
  })
  test('has 36 entries matching states', () =>
    expect(Object.keys(STATE_HELPLINES).length).toBe(36))
})
