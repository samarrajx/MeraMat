# Google Services Used in MeraMat

## 1. Google Gemini API (Core AI Engine)
- **SDK:** @google/generative-ai
- **Model:** gemini-2.5-flash
- **File:** src/services/gemini.js
- **API calls:**
  - generateVotingPlan(userProfile) — POST to generativelanguage.googleapis.com
  - explainStep(step, userProfile) — POST to generativelanguage.googleapis.com
- **Why Gemini:** Only service capable of generating structured JSON plans from a user profile with a custom scoring formula. Supports Hindi/English in a single prompt.
- **Prompt architecture:** User profile injected + JSON schema enforced + scoring formula (registered=30pts, knowsBooth=25pts, knowsDocs=25pts, votedBefore=20pts) + party-neutrality rules.

## 2. Google Cloud Translation API
- **Endpoint:** https://translation.googleapis.com/language/translate/v2
- **File:** src/services/translate.js
- **Method:** POST fetch with JSON body { q, target, format }
- **Used in:** gemini.js — called after plan generation when user selects Hindi
- **What it translates:** greeting, readinessLabel, encouragement, step titles, step actions, step timeNeeded, step explanations
- **Why:** Real-time machine translation. Every Gemini-generated plan is dynamically translated per user. Not hardcoded strings.

## 3. Google Cloud Run
- **Config:** cloudbuild.yaml
- **Region:** asia-south1 (Mumbai — lowest latency for India)
- **Server:** server.js (Express with CSP, XSS, Referrer security headers)
- **Live URL:** https://meramat-india-865928307359.asia-south1.run.app
- **Why:** Mandatory tool. Serverless auto-scaling, build-time env var injection for all API keys.

## 4. Google Maps Embed API
- **Endpoint:** https://www.google.com/maps/embed/v1/search
- **File:** src/phases/FollowThrough.jsx
- **Query:** Election Commission office + ${userProfile.state} — personalised per user
- **Why:** After seeing their plan, voters can locate their nearest ECI office for registration help.

## 5. Google Antigravity
- **Used for:** Entire application built inside Antigravity
- **Stitch MCP:** Generated all 8 UI components — LogoMark, LanguageToggle, QuestionFlow, StepCard, ReadinessScore, LoadingScreen, EVMSimulator, HomeScreen
- **Why:** Mandatory tool. Stitch enabled consistent brand token usage across components.

## 6. Web Speech API
- **File:** src/utils/tts.js
- **Languages:** en-IN, hi-IN
- **Where:** Every StepCard has a Listen button
- **Why:** Accessibility — voters hear their plan in their own language.

## 7. Google Calendar
- **File:** src/utils/calendar.js
- **Method:** calendar.google.com/calendar/render deep link
- **Pre-filled:** title, readiness score, user's state as location
- **Why:** Voters set a real election-day reminder with plan details already filled.

---

## Active API Calls in Production

| API | Method | Triggered When |
|---|---|---|
| Gemini 2.5 Flash | POST | User completes 6-question diagnostic |
| Gemini 2.5 Flash | POST | User taps Explain on any step |
| Cloud Translation API | POST | User selects Hindi language |
| Maps Embed API | GET iframe | Plan screen loads |
| Web Speech API | Browser | User taps Listen on any step |
| Google Calendar | Deep link | User taps Add to Calendar |
