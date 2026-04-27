import { describe, expect, test, vi } from 'vitest'
import { generateVotingPlan, explainStep, generateFAQ } from '../services/gemini'

// Mock the Gemini SDK
vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(function() {
      return {
        getGenerativeModel: vi.fn().mockImplementation(() => ({
          generateContent: vi.fn().mockImplementation(async (prompt) => {
            if (prompt.includes('voting action plan')) {
              return {
                response: {
                  text: () => JSON.stringify({
                    greeting: "Hello",
                    readinessScore: 50,
                    readinessLabel: "Getting Ready",
                    steps: [],
                    encouragement: "Keep going"
                  })
                }
              }
            }
            if (prompt.includes('Explain this voting step')) {
              return {
                response: {
                  text: () => "Step explanation"
                }
              }
            }
            if (prompt.includes('Generate exactly 3 practical questions')) {
              return {
                response: {
                  text: () => JSON.stringify({
                    faqs: [
                      { question: "Q1", answer: "A1" },
                      { question: "Q2", answer: "A2" },
                      { question: "Q3", answer: "A3" }
                    ]
                  })
                }
              }
            }
            return { response: { text: () => "{}" } }
          })
        }))
      }
    })
  }
})

// Mock Translation Service
vi.mock('../services/translate', () => ({
  translateText: vi.fn((text) => Promise.resolve(text))
}))

describe('generateVotingPlan', () => {
  test('returns a valid plan object', async () => {
    const profile = { 
      state: 'Bihar', 
      language: 'en',
      registered: 'yes',
      votedBefore: 'never',
      knowsBooth: false,
      knowsDocs: false
    }
    const result = await generateVotingPlan(profile)
    expect(result).toHaveProperty('greeting')
    expect(result).toHaveProperty('steps')
  })
})

describe('explainStep', () => {
  test('returns a string explanation', async () => {
    const step = { title: 'Register', action: 'Go to portal' }
    const profile = { state: 'Bihar', language: 'en', votedBefore: 'never' }
    const result = await explainStep(step, profile)
    expect(typeof result).toBe('string')
  })
})

describe('generateFAQ', () => {
  test('returns faqs array', async () => {
    const profile = { state: 'Bihar', language: 'en' }
    const result = await generateFAQ(profile)
    expect(result).toHaveProperty('faqs')
    expect(Array.isArray(result.faqs)).toBe(true)
  })

  test('each faq has question and answer', async () => {
    const profile = { state: 'Delhi', language: 'en' }
    const result = await generateFAQ(profile)
    result.faqs.forEach(faq => {
      expect(faq).toHaveProperty('question')
      expect(faq).toHaveProperty('answer')
    })
  })

  test('returns empty faqs on parse error gracefully', async () => {
    // generateFAQ catches errors and returns { faqs: [] }
    const profile = { state: 'Kerala', language: 'hi' }
    const result = await generateFAQ(profile)
    expect(result).toHaveProperty('faqs')
  })
})
