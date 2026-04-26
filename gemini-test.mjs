import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = process.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' })

const profile = {
  state: 'Bihar',
  language: 'en',
  registered: 'not_sure',
  votedBefore: 'never',
  knowsBooth: false,
  knowsDocs: false
}

const prompt = `You are MeraMat, a non-partisan Indian election assistant.
Generate a personalized voting action plan.

User Profile:
- State: ${profile.state}
- Language preference: ${profile.language}
- Registered to vote: ${profile.registered}
- Has voted before: ${profile.votedBefore}
- Knows polling booth location: ${profile.knowsBooth}
- Knows which documents to carry: ${profile.knowsDocs}

Instructions:
1. Generate exactly 5 to 6 steps
2. Every step title MUST start with an action verb
3. Steps must address ONLY this user's specific gaps
4. Include a real ECI URL for each step
5. Calculate readinessScore 0-100:
   registered=yes: +30, votedBefore=multiple: +20,
   votedBefore=once: +10, knowsBooth=true: +25,
   knowsDocs=true: +25
6. readinessLabel: 0-30=Just Starting, 31-60=Getting Ready,
   61-85=Almost Ready, 86-100=All Set
7. NEVER mention any political party
8. Keep each action under 25 words

Respond with ONLY valid JSON. No markdown. No backticks.

{
  "greeting": "string",
  "readinessScore": number,
  "readinessLabel": "string",
  "steps": [
    {
      "number": number,
      "title": "string",
      "action": "string",
      "resource": "string",
      "timeNeeded": "string",
      "priority": "high" | "medium" | "low"
    }
  ],
  "encouragement": "string"
}`

const result = await model.generateContent(prompt)
const raw = result.response.text()
console.log('RAW RESPONSE:')
console.log(raw)
console.log('\nPARSED:')
const cleaned = raw.replace(/```json|```/g, '').trim()
const parsed = JSON.parse(cleaned)
console.log(JSON.stringify(parsed, null, 2))
