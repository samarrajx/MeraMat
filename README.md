# MeraMat — मेरा मत
> Your vote. Your plan. Your steps.
> Non-Partisan · ECI-Sourced · Personalized

## What Makes MeraMat Different
Every other election app explains elections in general. MeraMat tells each user exactly what THEY personally need to do next — based on their state, registration status, and voting experience. No two users get the same plan.

## Problem Statement Alignment

| PS Keyword | Feature | How Implemented |
|---|---|---|
| "assistant" | Gemini Plan Generator | Structured JSON action plan unique to each user |
| "understand" | On-demand step explainer | Tap any step → Gemini explains in simple language |
| "timelines" | Readiness journey + score | Shows where user is and exactly what comes next |
| "interactive" | 6-question diagnostic, EVM simulator, TTS | User-driven throughout, not passive reading |
| "easy-to-follow" | Prioritized steps + readiness score | Tells user what to do first, in their language |

## Google Services Used

| Service | Purpose | File | Why Chosen |
|---|---|---|---|
| Gemini 2.5 Flash | Plan generation + step explanations | src/services/gemini.js | Structured JSON output, Hindi/English, personalization |
| Cloud Run | Production deployment (asia-south1) | cloudbuild.yaml | Mandatory tool, closest region to Indian users |
| Google Antigravity | Development + Stitch UI generation | Entire app | Mandatory tool, Stitch for all components |
| Web Speech API | Text-to-speech for all steps | src/utils/tts.js | Accessibility, works in Indian languages |
| Google Calendar | Add voting reminders | src/utils/calendar.js | Real utility for actual users |

## Architecture

User completes 6-question diagnostic
→ userProfile object created
→ generateVotingPlan(userProfile) sends structured prompt to Gemini
→ Gemini returns personalized JSON plan
→ Rendered as step cards with readiness score
→ Each step: Explain (Gemini) + Listen (TTS) on demand
→ EVM Simulator: 4-step voting day walkthrough
→ Calendar + LinkedIn share buttons

## How Prompts Evolved

Early: "Answer questions about Indian elections"
Problem: Generic, no structure, unpredictable output

Mid: "Generate a voting plan for someone in ${state}"
Problem: Same plan for everyone, no JSON structure

Final: Full user profile + scoring formula + JSON schema
Why: Forces Gemini to generate structured, parseable, genuinely differentiated plans per user

## What GenAI Did vs What I Designed

Gemini handled:
- Generating personalized action plans as JSON
- Explaining individual steps on demand in EN/HI

I designed:
- Diagnostic question flow and scoring logic
- JSON prompt architecture and schema
- All UI components via Stitch + custom CSS
- Bilingual string system (EN/HI)
- EVM simulator content
- Security layer (DOMPurify + CSP + rate limiting)

## Accessibility

- Skip to main content link (visible on focus)
- All buttons have aria-label
- prefers-reduced-motion respected globally
- Text-to-speech for all step content
- Min touch targets: 48px throughout
- Tested at 375px (iPhone SE)

## Security

- DOMPurify: all user inputs sanitized before Gemini call
- API key: environment variable only (VITE_GEMINI_API_KEY)
- CSP headers: via Express middleware
- Rate limiting: 500ms between Gemini API calls
- .env excluded from git

## Testing

npm test               — run all tests
npm run test:coverage  — with coverage

Files:
- sanitize.test.js       7 tests — input security
- stateData.test.js      9 tests — data integrity
- stepCard.test.jsx      8 tests — UI component
- questionFlow.test.jsx  6 tests — user flow
- evmSimulator.test.jsx  5 tests — simulator

## Local Setup

1. git clone https://github.com/samarrajx/MeraMat
2. cd meramat-india && npm install
3. cp .env.example .env
4. Add your Gemini API key to .env
5. npm run dev → http://localhost:5173

## Deploy to Cloud Run

gcloud builds submit --config cloudbuild.yaml --substitutions=_VITE_GEMINI_API_KEY=your_api_key

App available at:
https://meramat-india-865928307359.asia-south1.run.app

## Non-Partisan Statement

MeraMat is a non-partisan educational tool. All content is based on Election Commission of India official sources. No political party or candidate is mentioned anywhere in the application.

Sources: eci.gov.in · Representation of the People Act, 1951 · Conduct of Election Rules, 1961
