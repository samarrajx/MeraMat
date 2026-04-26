import { GoogleGenerativeAI } from '@google/generative-ai'
import { sanitizeInput } from './sanitize'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

let lastCallTime = 0
const RATE_LIMIT_MS = 500

async function withRateLimit(fn) {
  const now = Date.now()
  const wait = RATE_LIMIT_MS - (now - lastCallTime)
  if (wait > 0) await new Promise(r => setTimeout(r, wait))
  lastCallTime = Date.now()
  return fn()
}

export async function generateVotingPlan(userProfile) {
  const prompt = `You are MeraMat, a non-partisan Indian election assistant.
Generate a personalized voting action plan.

User Profile:
- State: ${sanitizeInput(userProfile.state)}
- Language preference: ${sanitizeInput(userProfile.language)}
- Registered to vote: ${sanitizeInput(userProfile.registered)}
- Has voted before: ${sanitizeInput(userProfile.votedBefore)}
- Knows polling booth location: ${sanitizeInput(userProfile.knowsBooth)}
- Knows which documents to carry: ${sanitizeInput(userProfile.knowsDocs)}

Instructions:
1. Generate exactly 5 to 6 steps
2. Every step title MUST start with an action verb
3. Steps must address ONLY this user's specific gaps
4. Include a real ECI URL for each step:
   voters.eci.gov.in, electoralsearch.eci.gov.in,
   nvsp.in, or eci.gov.in
5. Calculate readinessScore 0-100:
   registered=yes: +30 points
   votedBefore=multiple: +20 points
   votedBefore=once: +10 points
   knowsBooth=true: +25 points
   knowsDocs=true: +25 points
6. readinessLabel:
   0-30: "Just Starting"
   31-60: "Getting Ready"
   61-85: "Almost Ready"
   86-100: "All Set"
7. If language is "hi": write ALL text in simple Hindi
8. NEVER mention any political party or candidate
9. NEVER give political opinions
10. Keep each action under 25 words

Respond with ONLY valid JSON. No markdown. No backticks.
No explanation before or after JSON.

{
  "greeting": "string — one sentence acknowledging their situation",
  "readinessScore": number,
  "readinessLabel": "string",
  "steps": [
    {
      "number": number,
      "title": "string — starts with verb",
      "action": "string — what exactly to do",
      "resource": "string — full https URL",
      "timeNeeded": "string — e.g. 5 minutes",
      "priority": "high" | "medium" | "low"
    }
  ],
  "encouragement": "string — one motivating sentence"
}`

  const result = await withRateLimit(() =>
    model.generateContent(prompt)
  )
  const raw = result.response.text()
  const cleaned = raw.replace(/```json|```/g, '').trim()

  try {
    return JSON.parse(cleaned)
  } catch (e) {
    throw new Error('PARSE_ERROR: ' + e.message)
  }
}

export async function explainStep(step, userProfile) {
  const lang = userProfile.language === 'hi' ? 'Hindi' : 'English'
  const prompt = `Explain this voting step in very simple ${lang}
for a person in ${sanitizeInput(userProfile.state)} who has voted
"${sanitizeInput(userProfile.votedBefore)}" times before.

Step: ${sanitizeInput(step.title)}
Action: ${sanitizeInput(step.action)}

Rules:
- Maximum 70 words
- Use very simple everyday language
- One short paragraph
- NEVER mention any political party
${userProfile.language === 'hi' ? '- Respond entirely in simple Hindi' : ''}`

  const result = await withRateLimit(() =>
    model.generateContent(prompt)
  )
  return result.response.text().trim()
}
