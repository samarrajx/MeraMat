import { vi, describe, test, expect, beforeEach } from 'vitest'

const mockFetch = vi.fn()
global.fetch = mockFetch

const { translateText } = await import('../services/translate.js')

describe('translateText', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  test('returns original text when target is English', async () => {
    const result = await translateText('Hello', 'en')
    expect(result).toBe('Hello')
    expect(mockFetch).not.toHaveBeenCalled()
  })

  test('calls Translation API when target is Hindi', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        data: { translations: [{ translatedText: 'नमस्ते' }] }
      })
    })
    const result = await translateText('Hello', 'hi')
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(result).toBe('नमस्ते')
  })

  test('calls correct Translation API endpoint', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        data: { translations: [{ translatedText: 'परीक्षण' }] }
      })
    })
    await translateText('Test', 'hi')
    const url = mockFetch.mock.calls[0][0]
    expect(url).toContain('translation.googleapis.com')
    expect(url).toContain('translate/v2')
  })

  test('sends correct target language in request body', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        data: { translations: [{ translatedText: 'मत' }] }
      })
    })
    await translateText('Vote', 'hi')
    const body = JSON.parse(mockFetch.mock.calls[0][1].body)
    expect(body.target).toBe('hi')
    expect(body.q).toBe('Vote')
  })

  test('sends POST request to Translation API', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        data: { translations: [{ translatedText: 'मतदान' }] }
      })
    })
    await translateText('Voting', 'hi')
    expect(mockFetch.mock.calls[0][1].method).toBe('POST')
  })

  test('sends correct Content-Type header', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        data: { translations: [{ translatedText: 'राज्य' }] }
      })
    })
    await translateText('State', 'hi')
    const headers = mockFetch.mock.calls[0][1].headers
    expect(headers['Content-Type']).toBe('application/json')
  })
})
